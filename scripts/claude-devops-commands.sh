#!/bin/bash

# 🎯 Claude Code DevOps コマンドライブラリ
# カスタムスラッシュコマンド実装

# 設定
CLAUDE_SESSION="${CLAUDE_SESSION:-crypto-devops}"
PLATFORM_LOGS_DIR="${PLATFORM_LOGS_DIR:-logs}"

# カラー設定
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

# ログ関数
log_cmd() {
    echo -e "${PURPLE}[CMD] $1${NC}"
}

# 1. 基本的なログチェックコマンド
cmd_check_logs() {
    log_cmd "実行中: check logs"
    
    # Imrat式分割コマンド
    tmux send-keys -t "$CLAUDE_SESSION" "check crypto platform logs for errors and performance issues"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
}

# 2. 定期チェック設定
cmd_repeat_check() {
    local interval="${1:-15}"  # デフォルト15分
    log_cmd "実行中: repeat check every $interval minutes"
    
    tmux send-keys -t "$CLAUDE_SESSION" "Set up automatic log checking every $interval minutes for Crypto AI Platform"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    
    # バックグラウンドで定期実行スクリプトを開始
    nohup bash -c "
        while true; do
            sleep $((interval * 60))
            tmux send-keys -t '$CLAUDE_SESSION' 'check logs'
            tmux send-keys -t '$CLAUDE_SESSION' C-m
        done
    " > /tmp/claude-repeat-check.log 2>&1 &
    
    echo $! > /tmp/claude-repeat-check.pid
    log_cmd "バックグラウンド定期チェック開始 (PID: $(cat /tmp/claude-repeat-check.pid))"
}

# 3. 特定サーバー監視
cmd_check_servers() {
    local servers=("api" "database" "redis" "nginx")
    log_cmd "実行中: check additional servers"
    
    for server in "${servers[@]}"; do
        tmux send-keys -t "$CLAUDE_SESSION" "check $server service status and logs for Crypto AI Platform"
        tmux send-keys -t "$CLAUDE_SESSION" C-m
        sleep 2  # コマンド間隔
    done
}

# 4. ノイズフィルタリング
cmd_ignore_noise() {
    log_cmd "実行中: configure noise filtering"
    
    tmux send-keys -t "$CLAUDE_SESSION" "ignore bot scanning, crawlers, and routine health checks in log analysis"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    tmux send-keys -t "$CLAUDE_SESSION" "focus on actual user errors and application issues"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
}

# 5. Webhook処理監視
cmd_check_webhooks() {
    log_cmd "実行中: check webhook processing"
    
    tmux send-keys -t "$CLAUDE_SESSION" "report on processed webhooks from Stripe, Supabase, and external APIs"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    tmux send-keys -t "$CLAUDE_SESSION" "identify any webhook failures or delays"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
}

# 6. パフォーマンス分析
cmd_performance_analysis() {
    log_cmd "実行中: performance analysis"
    
    tmux send-keys -t "$CLAUDE_SESSION" "analyze API response times, identify slow endpoints"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    tmux send-keys -t "$CLAUDE_SESSION" "check for memory leaks and resource bottlenecks"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
}

# 7. エラーサマリー
cmd_error_summary() {
    local timeframe="${1:-1h}"
    log_cmd "実行中: error summary for last $timeframe"
    
    tmux send-keys -t "$CLAUDE_SESSION" "summarize all errors from last $timeframe"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    tmux send-keys -t "$CLAUDE_SESSION" "categorize by severity and provide actionable insights"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
}

# 8. セキュリティ監視
cmd_security_check() {
    log_cmd "実行中: security monitoring"
    
    tmux send-keys -t "$CLAUDE_SESSION" "check for suspicious authentication attempts"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    tmux send-keys -t "$CLAUDE_SESSION" "identify potential security threats or unusual access patterns"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
}

# 9. AI API監視
cmd_check_ai_apis() {
    log_cmd "実行中: AI API monitoring"
    
    tmux send-keys -t "$CLAUDE_SESSION" "check OpenAI and Anthropic API usage, rate limits, and errors"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    tmux send-keys -t "$CLAUDE_SESSION" "report on AI response quality and performance"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
}

# 10. 学習システム監視
cmd_check_learning() {
    log_cmd "実行中: learning system monitoring"
    
    tmux send-keys -t "$CLAUDE_SESSION" "monitor lesson completion rates and user progress"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    tmux send-keys -t "$CLAUDE_SESSION" "check for issues with quiz submissions and achievements"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
}

# 11. 市場データ監視
cmd_check_market_data() {
    log_cmd "実行中: market data monitoring"
    
    tmux send-keys -t "$CLAUDE_SESSION" "check Binance and CoinMarketCap API connections"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    tmux send-keys -t "$CLAUDE_SESSION" "report on real-time data accuracy and latency"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
}

# 12. 通知システム監視
cmd_check_notifications() {
    log_cmd "実行中: notification system monitoring"
    
    tmux send-keys -t "$CLAUDE_SESSION" "check email, SMS, and push notification delivery"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    tmux send-keys -t "$CLAUDE_SESSION" "identify any failed or delayed notifications"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
}

# 13. データベース監視
cmd_check_database() {
    log_cmd "実行中: database monitoring"
    
    tmux send-keys -t "$CLAUDE_SESSION" "check Supabase connection health and query performance"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    tmux send-keys -t "$CLAUDE_SESSION" "identify slow queries and connection issues"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
}

# 14. 支払いシステム監視
cmd_check_payments() {
    log_cmd "実行中: payment system monitoring"
    
    tmux send-keys -t "$CLAUDE_SESSION" "check Stripe webhooks and payment processing"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    tmux send-keys -t "$CLAUDE_SESSION" "report on subscription renewals and payment failures"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
}

# 15. システムヘルス総合チェック
cmd_health_check() {
    log_cmd "実行中: comprehensive health check"
    
    tmux send-keys -t "$CLAUDE_SESSION" "perform complete system health check for Crypto AI Platform"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
    tmux send-keys -t "$CLAUDE_SESSION" "provide overall health score and recommendations"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
}

# 16. カスタムクエリ実行
cmd_custom_query() {
    local query="$1"
    log_cmd "実行中: custom query - $query"
    
    tmux send-keys -t "$CLAUDE_SESSION" "$query"
    tmux send-keys -t "$CLAUDE_SESSION" C-m
}

# 17. 定期チェック停止
cmd_stop_repeat() {
    log_cmd "実行中: stop repeat checks"
    
    if [[ -f /tmp/claude-repeat-check.pid ]]; then
        local pid=$(cat /tmp/claude-repeat-check.pid)
        kill "$pid" 2>/dev/null || true
        rm -f /tmp/claude-repeat-check.pid /tmp/claude-repeat-check.log
        log_cmd "定期チェック停止 (PID: $pid)"
    else
        log_cmd "実行中の定期チェックが見つかりません"
    fi
}

# 18. コマンドヘルプ
cmd_help() {
    cat << 'EOF'
🎯 Claude Code DevOps コマンドライブラリ

利用可能なコマンド:

基本監視:
  check_logs              - ログをチェック
  repeat_check [分]       - 定期チェック開始（デフォルト15分）
  stop_repeat            - 定期チェック停止
  health_check           - 総合ヘルスチェック

特定システム:
  check_servers          - 追加サーバー監視
  check_webhooks         - Webhook処理監視
  check_ai_apis          - AI API監視
  check_learning         - 学習システム監視
  check_market_data      - 市場データ監視
  check_notifications    - 通知システム監視
  check_database         - データベース監視
  check_payments         - 支払いシステム監視

分析・フィルタリング:
  ignore_noise           - ノイズフィルタリング設定
  performance_analysis   - パフォーマンス分析
  error_summary [期間]   - エラーサマリー（デフォルト1h）
  security_check         - セキュリティチェック

カスタム:
  custom_query "クエリ"   - カスタムクエリ実行
  help                   - このヘルプを表示

使用例:
  ./claude-devops-commands.sh check_logs
  ./claude-devops-commands.sh repeat_check 10
  ./claude-devops-commands.sh error_summary 30m
  ./claude-devops-commands.sh custom_query "check last 5 API errors"
EOF
}

# メイン関数
main() {
    local command="$1"
    shift || true
    
    case "$command" in
        "check_logs")           cmd_check_logs ;;
        "repeat_check")         cmd_repeat_check "$@" ;;
        "stop_repeat")          cmd_stop_repeat ;;
        "check_servers")        cmd_check_servers ;;
        "ignore_noise")         cmd_ignore_noise ;;
        "check_webhooks")       cmd_check_webhooks ;;
        "performance_analysis") cmd_performance_analysis ;;
        "error_summary")        cmd_error_summary "$@" ;;
        "security_check")       cmd_security_check ;;
        "check_ai_apis")        cmd_check_ai_apis ;;
        "check_learning")       cmd_check_learning ;;
        "check_market_data")    cmd_check_market_data ;;
        "check_notifications")  cmd_check_notifications ;;
        "check_database")       cmd_check_database ;;
        "check_payments")       cmd_check_payments ;;
        "health_check")         cmd_health_check ;;
        "custom_query")         cmd_custom_query "$@" ;;
        "help"|"")              cmd_help ;;
        *)
            echo "❌ 不明なコマンド: $command"
            cmd_help
            exit 1
            ;;
    esac
}

# スクリプトが直接実行された場合
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi