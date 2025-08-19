#!/bin/bash

# Serena MCP サーバー永続接続管理スクリプト
# 自動再接続、ヘルスチェック、エラー監視機能付き

set -euo pipefail

# 設定値
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
readonly LOG_FILE="$PROJECT_ROOT/logs/mcp-serena.log"
readonly PID_FILE="$PROJECT_ROOT/logs/mcp-serena.pid"
readonly HEALTH_CHECK_INTERVAL=30
readonly MAX_RESTART_ATTEMPTS=10
readonly RESTART_DELAY=5

# ログディレクトリ作成
mkdir -p "$(dirname "$LOG_FILE")"

# ログ機能
log() {
    local level="$1"
    shift
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$level] $*" | tee -a "$LOG_FILE"
}

log_info() { log "INFO" "$@"; }
log_warn() { log "WARN" "$@"; }
log_error() { log "ERROR" "$@"; }

# プロセス存在確認
is_serena_running() {
    # PIDファイルベースのチェック
    if [[ -f "$PID_FILE" ]]; then
        local pid
        pid=$(cat "$PID_FILE")
        if ps -p "$pid" > /dev/null 2>&1; then
            return 0
        else
            rm -f "$PID_FILE"
        fi
    fi
    
    # プロセス名ベースのチェック（フォールバック）
    if pgrep -f "serena start-mcp-server" > /dev/null 2>&1; then
        # 実行中のプロセスのPIDを取得してPIDファイルに保存
        local running_pid
        running_pid=$(pgrep -f "serena start-mcp-server" | head -1)
        echo "$running_pid" > "$PID_FILE"
        return 0
    fi
    
    return 1
}

# Serenaプロセス起動
start_serena() {
    log_info "Starting Serena MCP server..."
    
    cd "$PROJECT_ROOT"
    
    # 環境変数設定
    export NODE_ENV=production
    export PROJECT_PATH="$PROJECT_ROOT"
    export PYTHONUNBUFFERED=1
    export FORCE_COLOR=1
    
    # バックグラウンドで起動
    nohup uvx --from git+https://github.com/oraios/serena serena start-mcp-server --transport stdio \
        >> "$LOG_FILE" 2>&1 &
    
    local pid=$!
    echo "$pid" > "$PID_FILE"
    
    # 起動確認
    sleep 3
    if is_serena_running; then
        log_info "Serena MCP server started successfully (PID: $pid)"
        return 0
    else
        log_error "Failed to start Serena MCP server"
        return 1
    fi
}

# Serenaプロセス停止
stop_serena() {
    if is_serena_running; then
        local pid
        pid=$(cat "$PID_FILE")
        log_info "Stopping Serena MCP server (PID: $pid)..."
        
        kill "$pid" 2>/dev/null || true
        sleep 2
        
        # 強制終了が必要な場合
        if ps -p "$pid" > /dev/null 2>&1; then
            log_warn "Force killing Serena MCP server..."
            kill -9 "$pid" 2>/dev/null || true
        fi
        
        rm -f "$PID_FILE"
        log_info "Serena MCP server stopped"
    else
        log_info "Serena MCP server is not running"
    fi
}

# ヘルスチェック
health_check() {
    if ! is_serena_running; then
        log_warn "Serena MCP server is not running"
        return 1
    fi
    
    # プロセスの応答性をチェック
    local pid
    pid=$(cat "$PID_FILE")
    
    # CPU使用率チェック（異常に高い場合は問題あり）
    local cpu_usage
    cpu_usage=$(ps -p "$pid" -o %cpu --no-headers 2>/dev/null | tr -d ' ' || echo "0")
    
    if (( $(echo "$cpu_usage > 90" | bc -l) )); then
        log_warn "High CPU usage detected: ${cpu_usage}%"
        return 1
    fi
    
    log_info "Health check passed (CPU: ${cpu_usage}%)"
    return 0
}

# 再起動処理
restart_serena() {
    local attempt_count=${1:-1}
    
    if [[ $attempt_count -gt $MAX_RESTART_ATTEMPTS ]]; then
        log_error "Max restart attempts ($MAX_RESTART_ATTEMPTS) reached. Giving up."
        exit 1
    fi
    
    log_info "Restart attempt $attempt_count/$MAX_RESTART_ATTEMPTS"
    
    stop_serena
    sleep "$RESTART_DELAY"
    
    if start_serena; then
        log_info "Restart successful"
        return 0
    else
        log_error "Restart failed"
        sleep $((RESTART_DELAY * attempt_count))
        restart_serena $((attempt_count + 1))
    fi
}

# メイン監視ループ
monitor_loop() {
    log_info "Starting MCP persistent connection monitor..."
    local restart_count=0
    
    while true; do
        if ! health_check; then
            ((restart_count++))
            log_warn "Health check failed. Restarting... (restart #$restart_count)"
            restart_serena
        fi
        
        sleep "$HEALTH_CHECK_INTERVAL"
    done
}

# シグナルハンドラー
cleanup() {
    log_info "Received shutdown signal. Cleaning up..."
    stop_serena
    exit 0
}

trap cleanup SIGTERM SIGINT SIGQUIT

# メイン処理
main() {
    case "${1:-}" in
        start)
            if is_serena_running; then
                log_info "Serena MCP server is already running"
            else
                start_serena
            fi
            ;;
        stop)
            stop_serena
            ;;
        restart)
            restart_serena
            ;;
        status)
            if is_serena_running; then
                local pid
                pid=$(cat "$PID_FILE")
                log_info "Serena MCP server is running (PID: $pid)"
            else
                log_info "Serena MCP server is not running"
            fi
            ;;
        monitor)
            # 既存プロセスがない場合は起動
            if ! is_serena_running; then
                start_serena
            fi
            monitor_loop
            ;;
        *)
            echo "Usage: $0 {start|stop|restart|status|monitor}"
            echo ""
            echo "Commands:"
            echo "  start   - Start Serena MCP server"
            echo "  stop    - Stop Serena MCP server"
            echo "  restart - Restart Serena MCP server"
            echo "  status  - Show status"
            echo "  monitor - Start persistent monitoring (recommended)"
            exit 1
            ;;
    esac
}

main "$@"