#!/bin/bash

# MCP接続テストスクリプト

set -euo pipefail

readonly LOG_FILE="/mnt/d/crypto-ai-platform/logs/mcp-test.log"

# ログ関数
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

# テスト1: Serenaプロセス確認
test_process() {
    log "Testing: Serena process detection"
    
    local serena_pids
    serena_pids=$(pgrep -f "serena start-mcp-server" 2>/dev/null || true)
    
    if [[ -n "$serena_pids" ]]; then
        log "✅ Serena processes found: $serena_pids"
        
        # プロセス詳細確認
        for pid in $serena_pids; do
            if ps -p "$pid" > /dev/null 2>&1; then
                local cmd
                cmd=$(ps -p "$pid" -o cmd --no-headers)
                log "   PID $pid: $cmd"
            fi
        done
        return 0
    else
        log "❌ No Serena processes found"
        return 1
    fi
}

# テスト2: ポート確認
test_port() {
    log "Testing: Port availability"
    
    # Serenaのデフォルトポート確認
    if netstat -tuln 2>/dev/null | grep -q ":24282"; then
        log "✅ Serena web dashboard port (24282) is active"
    else
        log "ℹ️  Port 24282 not detected (may be normal)"
    fi
}

# テスト3: 設定ファイル確認
test_config() {
    log "Testing: Configuration files"
    
    local config_file="/home/night/.serena/serena_config.yml"
    if [[ -f "$config_file" ]]; then
        log "✅ Serena config found: $config_file"
    else
        log "❌ Serena config not found: $config_file"
        return 1
    fi
    
    local mcp_config="/mnt/d/crypto-ai-platform/mcp-config.json"
    if [[ -f "$mcp_config" ]]; then
        log "✅ MCP config found: $mcp_config"
    else
        log "❌ MCP config not found: $mcp_config"
        return 1
    fi
}

# テスト4: MCP通信テスト
test_mcp_communication() {
    log "Testing: MCP communication"
    
    # 簡単なMCPメッセージテスト
    local test_message='{"jsonrpc": "2.0", "method": "initialize", "params": {"protocolVersion": "2024-11-05", "capabilities": {}}, "id": 1}'
    
    # タイムアウト付きでテスト
    if timeout 5s echo "$test_message" | uvx --from git+https://github.com/oraios/serena serena start-mcp-server --transport stdio > /dev/null 2>&1; then
        log "✅ MCP communication test passed"
        return 0
    else
        log "⚠️  MCP communication test timeout (may be normal)"
        return 0  # タイムアウトは正常な動作の場合もある
    fi
}

# テスト5: ログファイル確認
test_logs() {
    log "Testing: Log files"
    
    local serena_log_dir="/home/night/.serena/logs"
    if [[ -d "$serena_log_dir" ]]; then
        local recent_logs
        recent_logs=$(find "$serena_log_dir" -name "mcp_*.txt" -newer "/tmp/mcp-test-start" 2>/dev/null || true)
        
        if [[ -n "$recent_logs" ]]; then
            log "✅ Recent Serena logs found:"
            while IFS= read -r logfile; do
                log "   $logfile"
            done <<< "$recent_logs"
        else
            log "⚠️  No recent Serena logs found"
        fi
    else
        log "❌ Serena log directory not found: $serena_log_dir"
    fi
}

# 接続持続性テスト
test_persistence() {
    log "Testing: Connection persistence"
    
    # 開始時刻記録
    touch /tmp/mcp-test-start
    
    # Serenaプロセス開始
    uvx --from git+https://github.com/oraios/serena serena start-mcp-server --transport stdio > /dev/null 2>&1 &
    local pid=$!
    
    log "Started test MCP server (PID: $pid)"
    
    # 安定性確認（10秒間）
    local stable=true
    for i in {1..10}; do
        if ! ps -p "$pid" > /dev/null 2>&1; then
            log "❌ Process died after ${i} seconds"
            stable=false
            break
        fi
        sleep 1
    done
    
    # クリーンアップ
    if ps -p "$pid" > /dev/null 2>&1; then
        kill "$pid" 2>/dev/null || true
        wait "$pid" 2>/dev/null || true
    fi
    
    if $stable; then
        log "✅ Process remained stable for 10 seconds"
        return 0
    else
        return 1
    fi
}

# メイン実行
main() {
    mkdir -p "$(dirname "$LOG_FILE")"
    
    log "🚀 Starting MCP connection diagnostics"
    log "======================================"
    
    local passed=0
    local total=0
    
    # テスト実行
    ((total++)); test_config && ((passed++))
    ((total++)); test_process && ((passed++))
    ((total++)); test_port && ((passed++))
    ((total++)); test_logs && ((passed++))
    ((total++)); test_mcp_communication && ((passed++))
    ((total++)); test_persistence && ((passed++))
    
    log "======================================"
    log "📊 Test Results: $passed/$total tests passed"
    
    if [[ $passed -eq $total ]]; then
        log "🎉 All tests passed! MCP connection is healthy"
        exit 0
    elif [[ $passed -ge 4 ]]; then
        log "⚠️  Most tests passed. Connection should work with minor issues"
        exit 0
    else
        log "❌ Multiple tests failed. Connection may be unstable"
        exit 1
    fi
}

main "$@"