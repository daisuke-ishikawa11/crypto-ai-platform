#!/bin/bash

# 🚀 DevOps監視エージェント - Claude Code統合版
# ImratアプローチをCrypto AI Platformに最適化

set -euo pipefail

# 設定
CLAUDE_SESSION="crypto-devops"
CHECK_INTERVAL=${CHECK_INTERVAL:-300}  # 5分間隔
LOG_FILES=(
    "/var/log/nginx/access.log"
    "/var/log/nginx/error.log"
    "logs/application.log"
    "logs/api.log"
    "logs/error.log"
)

# カラー設定
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ログ関数
log_info() {
    echo -e "${BLUE}[$(date '+%H:%M:%S')] INFO: $1${NC}"
}

log_warn() {
    echo -e "${YELLOW}[$(date '+%H:%M:%S')] WARN: $1${NC}"
}

log_error() {
    echo -e "${RED}[$(date '+%H:%M:%S')] ERROR: $1${NC}"
}

log_success() {
    echo -e "${GREEN}[$(date '+%H:%M:%S')] SUCCESS: $1${NC}"
}

# tmuxセッション確認
check_tmux_session() {
    if ! tmux has-session -t "$CLAUDE_SESSION" 2>/dev/null; then
        log_error "Claude Code tmuxセッション '$CLAUDE_SESSION' が見つかりません"
        log_info "セッションを作成してください: tmux new-session -d -s $CLAUDE_SESSION claude"
        exit 1
    fi
    log_info "tmuxセッション '$CLAUDE_SESSION' を確認"
}

# ログ監視用バックグラウンドプロセス開始
start_log_monitoring() {
    log_info "ログ監視バックグラウンドプロセスを開始中..."
    
    # Imratの手法: 分割コマンド実行
    tmux send-keys -t "$CLAUDE_SESSION" "# DevOps監視エージェント開始"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    
    # バックグラウンドでログ要約プロセス開始
    tmux send-keys -t "$CLAUDE_SESSION" "echo 'Starting log monitoring for Crypto AI Platform...'"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    
    log_success "ログ監視プロセス開始完了"
}

# 定期チェック実行
send_check_command() {
    log_info "ログチェックコマンドを送信中..."
    
    # Imratの解決法: tmux コマンドを分割
    tmux send-keys -t "$CLAUDE_SESSION" "check crypto platform logs"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    
    log_success "チェックコマンド送信完了"
}

# 高度なログ解析コマンド送信
send_advanced_analysis() {
    local analysis_type="$1"
    
    case "$analysis_type" in
        "performance")
            tmux send-keys -t "$CLAUDE_SESSION" "analyze api response times and identify bottlenecks"
            ;;
        "errors")
            tmux send-keys -t "$CLAUDE_SESSION" "summarize errors from last 15 minutes, ignore bot scanning"
            ;;
        "webhooks")
            tmux send-keys -t "$CLAUDE_SESSION" "report processed webhooks and any failures"
            ;;
        "security")
            tmux send-keys -t "$CLAUDE_SESSION" "check for suspicious authentication attempts"
            ;;
        *)
            tmux send-keys -t "$CLAUDE_SESSION" "general system health check"
            ;;
    esac
    
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    log_info "高度な解析コマンド送信: $analysis_type"
}

# システムメトリクス収集
collect_system_metrics() {
    local metrics_file="/tmp/crypto-platform-metrics.json"
    
    cat > "$metrics_file" << EOF
{
    "timestamp": "$(date -Iseconds)",
    "system": {
        "cpu_usage": "$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1 || echo "N/A")",
        "memory_usage": "$(free | grep Mem | awk '{printf "%.1f", $3/$2 * 100.0}' || echo "N/A")",
        "disk_usage": "$(df -h / | tail -1 | awk '{print $5}' | cut -d'%' -f1 || echo "N/A")",
        "load_average": "$(uptime | awk -F'load average:' '{print $2}' || echo "N/A")"
    },
    "application": {
        "node_processes": $(pgrep -f node | wc -l),
        "active_connections": $(netstat -an | grep :3000 | grep ESTABLISHED | wc -l || echo "0"),
        "log_errors_last_5min": $(find logs/ -name "*.log" -mmin -5 -exec grep -i error {} + | wc -l 2>/dev/null || echo "0")
    },
    "services": {
        "nginx_status": "$(systemctl is-active nginx 2>/dev/null || echo "unknown")",
        "docker_containers": $(docker ps --format "table" 2>/dev/null | wc -l || echo "0")
    }
}
EOF
    
    # メトリクスをClaudeに送信
    tmux send-keys -t "$CLAUDE_SESSION" "System metrics collected: $(cat $metrics_file)"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    
    log_info "システムメトリクス収集完了"
}

# アラート処理
handle_alert() {
    local alert_type="$1"
    local message="$2"
    
    log_warn "アラート検出: $alert_type - $message"
    
    # 緊急度に応じた処理
    case "$alert_type" in
        "critical")
            tmux send-keys -t "$CLAUDE_SESSION" "CRITICAL ALERT: $message - immediate action required"
            tmux send-keys -t "$CLAUDE_SESSION" C-m
            # 通知システムと連携
            echo "$(date): CRITICAL - $message" >> alerts.log
            ;;
        "warning")
            tmux send-keys -t "$CLAUDE_SESSION" "WARNING: $message - monitoring required"
            tmux send-keys -t "$CLAUDE_SESSION" C-m
            ;;
    esac
}

# 自動ログローテーション
rotate_logs() {
    log_info "ログローテーションを実行中..."
    
    for log_file in "${LOG_FILES[@]}"; do
        if [[ -f "$log_file" ]] && [[ $(stat -f%z "$log_file" 2>/dev/null || stat -c%s "$log_file" 2>/dev/null || echo "0") -gt 104857600 ]]; then # 100MB
            mv "$log_file" "${log_file}.$(date +%Y%m%d_%H%M%S)"
            touch "$log_file"
            log_info "ローテーション完了: $log_file"
        fi
    done
}

# メイン監視ループ
main_monitoring_loop() {
    log_info "DevOps監視ループを開始します (間隔: ${CHECK_INTERVAL}秒)"
    
    local iteration=0
    
    while true; do
        iteration=$((iteration + 1))
        log_info "監視イテレーション #$iteration 開始"
        
        # 基本チェック
        send_check_command
        
        # システムメトリクス収集（5回に1回）
        if (( iteration % 5 == 0 )); then
            collect_system_metrics
        fi
        
        # ログローテーション（12回に1回 = 1時間に1回）
        if (( iteration % 12 == 0 )); then
            rotate_logs
        fi
        
        # 高度な解析（10回に1回）
        if (( iteration % 10 == 0 )); then
            case $((iteration % 40)) in
                10) send_advanced_analysis "performance" ;;
                20) send_advanced_analysis "errors" ;;
                30) send_advanced_analysis "webhooks" ;;
                0)  send_advanced_analysis "security" ;;
            esac
        fi
        
        log_info "イテレーション #$iteration 完了 - ${CHECK_INTERVAL}秒待機"
        sleep "$CHECK_INTERVAL"
    done
}

# スラッシュコマンドサポート関数
setup_claude_commands() {
    log_info "Claude Code用のカスタムコマンドを設定中..."
    
    # メモリに保存するルール
    tmux send-keys -t "$CLAUDE_SESSION" "Remember these monitoring rules for Crypto AI Platform:"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    tmux send-keys -t "$CLAUDE_SESSION" "1. Ignore bot scanning attempts (user-agents: bot, spider, crawler)"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    tmux send-keys -t "$CLAUDE_SESSION" "2. Focus on API endpoints: /api/ai/, /api/learning/, /api/market/"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    tmux send-keys -t "$CLAUDE_SESSION" "3. Alert on response times > 5 seconds"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    tmux send-keys -t "$CLAUDE_SESSION" "4. Track Supabase connection errors"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    tmux send-keys -t "$CLAUDE_SESSION" "5. Monitor OpenAI/Anthropic API rate limits"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
}

# シグナルハンドリング
cleanup() {
    log_info "監視プロセスをクリーンアップ中..."
    tmux send-keys -t "$CLAUDE_SESSION" "DevOps monitoring stopped"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    exit 0
}

trap cleanup SIGINT SIGTERM

# 使用方法表示
usage() {
    cat << EOF
🚀 Crypto AI Platform - DevOps監視エージェント

使用方法:
    $0 [オプション]

オプション:
    -i, --interval SECONDS  チェック間隔（デフォルト: 300秒）
    -s, --session NAME      tmuxセッション名（デフォルト: crypto-devops）
    -h, --help              このヘルプを表示

例:
    $0                      # デフォルト設定で開始
    $0 -i 60               # 1分間隔でチェック
    $0 -s my-session       # カスタムセッション名を使用

セットアップ:
    1. tmux new-session -d -s crypto-devops claude
    2. $0

機能:
    ✓ リアルタイムログ監視
    ✓ システムメトリクス収集
    ✓ 自動アラート
    ✓ Imrat式tmuxコマンド分割
    ✓ Claude Code統合
EOF
}

# コマンドライン引数処理
while [[ $# -gt 0 ]]; do
    case $1 in
        -i|--interval)
            CHECK_INTERVAL="$2"
            shift 2
            ;;
        -s|--session)
            CLAUDE_SESSION="$2"
            shift 2
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            log_error "不明なオプション: $1"
            usage
            exit 1
            ;;
    esac
done

# メイン実行
main() {
    log_info "🚀 Crypto AI Platform DevOps監視エージェント開始"
    log_info "設定: セッション=$CLAUDE_SESSION, 間隔=${CHECK_INTERVAL}秒"
    
    check_tmux_session
    setup_claude_commands
    start_log_monitoring
    
    log_success "監視エージェント準備完了"
    main_monitoring_loop
}

# スクリプトが直接実行された場合
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi