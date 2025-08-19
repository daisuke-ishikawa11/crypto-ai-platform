#!/bin/bash

# Serena MCP 永続接続セットアップスクリプト

set -euo pipefail

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# 色付きメッセージ
print_info() { echo -e "\033[32m[INFO]\033[0m $*"; }
print_warn() { echo -e "\033[33m[WARN]\033[0m $*"; }
print_error() { echo -e "\033[31m[ERROR]\033[0m $*"; }

# 前提条件チェック
check_prerequisites() {
    print_info "Checking prerequisites..."
    
    # uvxの存在確認
    if ! command -v uvx &> /dev/null; then
        print_error "uvx is not installed. Please install it first:"
        echo "curl -LsSf https://astral.sh/uv/install.sh | sh"
        exit 1
    fi
    
    # bcの存在確認（ヘルスチェックで使用）
    if ! command -v bc &> /dev/null; then
        print_warn "bc is not installed. Installing..."
        sudo apt-get update && sudo apt-get install -y bc || {
            print_error "Failed to install bc"
            exit 1
        }
    fi
    
    print_info "Prerequisites check passed"
}

# ディレクトリ作成
create_directories() {
    print_info "Creating necessary directories..."
    
    mkdir -p "$PROJECT_ROOT/logs"
    mkdir -p "$PROJECT_ROOT/scripts"
    
    print_info "Directories created"
}

# Systemdサービス設定
setup_systemd_service() {
    print_info "Setting up systemd service..."
    
    # サービスファイルのコピー
    sudo cp "$SCRIPT_DIR/serena-mcp.service" /etc/systemd/system/
    sudo systemctl daemon-reload
    
    print_info "Systemd service configured"
}

# ログローテーション設定
setup_logrotate() {
    print_info "Setting up log rotation..."
    
    sudo cp "$SCRIPT_DIR/mcp-logrotate.conf" /etc/logrotate.d/mcp-serena
    
    print_info "Log rotation configured"
}

# 初期テスト
test_setup() {
    print_info "Testing MCP connection..."
    
    # 監視スクリプトの直接テスト
    "$SCRIPT_DIR/mcp-persistent-connection.sh" start
    sleep 5
    
    if "$SCRIPT_DIR/mcp-persistent-connection.sh" status; then
        print_info "✅ MCP connection test passed"
        "$SCRIPT_DIR/mcp-persistent-connection.sh" stop
    else
        print_error "❌ MCP connection test failed"
        exit 1
    fi
}

# サービス開始
start_service() {
    print_info "Starting and enabling MCP service..."
    
    sudo systemctl enable serena-mcp.service
    sudo systemctl start serena-mcp.service
    
    # 起動確認
    sleep 3
    if sudo systemctl is-active --quiet serena-mcp.service; then
        print_info "✅ Serena MCP service is running"
    else
        print_error "❌ Failed to start Serena MCP service"
        sudo systemctl status serena-mcp.service
        exit 1
    fi
}

# 使用方法表示
show_usage() {
    cat << EOF

📋 セットアップ完了！

🎯 管理コマンド:
  $(basename "$0") status          - サービス状態確認
  $(basename "$0") logs           - ログ確認
  $(basename "$0") restart        - サービス再起動
  $(basename "$0") stop           - サービス停止
  $(basename "$0") uninstall      - サービス削除

🔧 手動制御:
  $SCRIPT_DIR/mcp-persistent-connection.sh {start|stop|restart|status|monitor}

📊 ログファイル:
  - メインログ: $PROJECT_ROOT/logs/mcp-serena.log
  - サービスログ: $PROJECT_ROOT/logs/serena-service.log
  - エラーログ: $PROJECT_ROOT/logs/serena-service-error.log

🚀 自動機能:
  ✅ 自動起動（システム起動時）
  ✅ 自動再起動（プロセス異常終了時）
  ✅ ヘルスチェック（30秒間隔）
  ✅ ログローテーション（日次）
  ✅ エラー監視・通知

EOF
}

# サービス管理関数
manage_service() {
    case "${1:-}" in
        status)
            echo "=== Service Status ==="
            sudo systemctl status serena-mcp.service --no-pager
            echo
            echo "=== Process Status ==="
            "$SCRIPT_DIR/mcp-persistent-connection.sh" status
            ;;
        logs)
            echo "=== Recent Service Logs ==="
            sudo journalctl -u serena-mcp.service --no-pager -n 50
            echo
            echo "=== Application Logs ==="
            tail -n 20 "$PROJECT_ROOT/logs/mcp-serena.log" 2>/dev/null || echo "No application logs found"
            ;;
        restart)
            sudo systemctl restart serena-mcp.service
            print_info "Service restarted"
            ;;
        stop)
            sudo systemctl stop serena-mcp.service
            print_info "Service stopped"
            ;;
        uninstall)
            print_warn "Uninstalling Serena MCP service..."
            sudo systemctl stop serena-mcp.service || true
            sudo systemctl disable serena-mcp.service || true
            sudo rm -f /etc/systemd/system/serena-mcp.service
            sudo rm -f /etc/logrotate.d/mcp-serena
            sudo systemctl daemon-reload
            print_info "Service uninstalled"
            ;;
        *)
            echo "Usage: $0 {install|status|logs|restart|stop|uninstall}"
            exit 1
            ;;
    esac
}

# メイン処理
main() {
    case "${1:-install}" in
        install)
            print_info "🚀 Starting Serena MCP persistent connection setup..."
            check_prerequisites
            create_directories
            setup_systemd_service
            setup_logrotate
            test_setup
            start_service
            show_usage
            print_info "✅ Setup completed successfully!"
            ;;
        *)
            manage_service "$1"
            ;;
    esac
}

main "$@"