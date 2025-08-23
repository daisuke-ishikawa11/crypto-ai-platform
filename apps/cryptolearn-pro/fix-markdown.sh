#!/bin/bash

# マークダウン形式をHTMLに変換するスクリプト

echo "マークダウン形式の修正を開始します..."

# レッスンファイルのディレクトリ
LESSONS_DIR="/mnt/d/crypto-ai-platform/apps/cryptolearn-pro/src/data/lessons"

# 修正対象ファイルの検索と修正
find "$LESSONS_DIR" -name "*.ts" | while read -r file; do
    echo "修正中: $file"
    
    # バックアップファイル作成
    cp "$file" "${file}.backup"
    
    # ## 見出しを <h2> タグに変換
    sed -i 's/^## \(.*\)$/<h2 style="color: #1e40af; margin: 2rem 0 1rem 0;">\1<\/h2>/g' "$file"
    
    # ### 見出しを <h3> タグに変換  
    sed -i 's/^### \(.*\)$/<h3 style="color: #374151; margin: 1.5rem 0 0.75rem 0;">\1<\/h3>/g' "$file"
    
    # #### 見出しを <h4> タグに変換
    sed -i 's/^#### \(.*\)$/<h4 style="color: #4b5563; margin: 1rem 0 0.5rem 0;">\1<\/h4>/g' "$file"
    
    # **太字** を <strong> タグに変換
    sed -i 's/\*\*\([^*]*\)\*\*/<strong>\1<\/strong>/g' "$file"
    
    # - リスト項目を <li> タグに変換（先頭の-のみ）
    sed -i 's/^- \(.*\)$/<li>\1<\/li>/g' "$file"
done

echo "## 見出しと基本的なマークダウンの修正が完了しました"

# ```コードブロック```の修正は別途手動で行う必要があります
echo "```コードブロックは手動での修正が必要です"

# バックアップファイルが作成されたことを通知
echo "バックアップファイル（.backup）が作成されました"