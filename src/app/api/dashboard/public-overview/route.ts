// 📊 公開ダッシュボード概要データAPI
// 認証不要で基本的な統計データを提供

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 公開統計データ（デモ用）
    const publicOverview = {
      activeUsers: 47328,
      totalAssets: 2340000000, // 23.4億円
      aiAccuracy: 99.97,
      avgReturn: 245, // 245%
      userGrowth: [1200, 1450, 1800, 2100, 2650, 3200, 3800, 4200],
      marketData: {
        btcPrice: 50100,
        ethPrice: 3200,
        fearGreedIndex: 73
      },
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(publicOverview, {
      headers: {
        'Cache-Control': 'public, max-age=300', // 5分キャッシュ
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });

  } catch (error) {
    console.error('Failed to get public overview:', error);
    
    // フォールバック値を返す
    return NextResponse.json({
      activeUsers: 47000,
      totalAssets: 2300000000,
      aiAccuracy: 99.9,
      avgReturn: 240,
      userGrowth: [1200, 1450, 1800, 2100, 2650, 3200, 3800, 4200],
      marketData: {
        btcPrice: 50000,
        ethPrice: 3000,
        fearGreedIndex: 70
      },
      timestamp: new Date().toISOString(),
      error: 'Using fallback data'
    }, {
      headers: {
        'Cache-Control': 'public, max-age=60',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}