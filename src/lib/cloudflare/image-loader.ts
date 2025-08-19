// 🖼️ Cloudflare Images最適化ローダー
// 画像変換・リサイズ・フォーマット最適化

import { ImageLoaderProps } from 'next/image';

/**
 * Cloudflare Images用カスタムローダー
 */
export default function cloudflareImageLoader({ src, width, quality }: ImageLoaderProps): string {
  // Cloudflare Images Account Hash
  const accountHash = process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH;
  
  // ローカル画像またはCloudflare Imagesでない場合はそのまま返す
  if (!accountHash || src.startsWith('data:') || src.startsWith('/')) {
    return src;
  }
  
  // Cloudflare Images URLを構築
  const baseUrl = `https://imagedelivery.net/${accountHash}`;
  
  // 画像ID（ファイル名から取得）
  const imageId = extractImageId(src);
  
  // バリアント（サイズとクオリティ）
  const variant = generateVariant(width, quality);
  
  return `${baseUrl}/${imageId}/${variant}`;
}

/**
 * 画像IDを抽出
 */
function extractImageId(src: string): string {
  // URLから画像IDを抽出
  if (src.includes('imagedelivery.net')) {
    const parts = src.split('/');
    return parts[parts.length - 2] || '';
  }
  
  // ファイル名ベースの画像ID
  const filename = src.split('/').pop() || '';
  return filename.replace(/\.[^/.]+$/, ''); // 拡張子を除去
}

/**
 * バリアント名を生成
 */
function generateVariant(width: number, quality?: number): string {
  const q = quality || 75;
  
  // 幅に基づくプリセットバリアント
  if (width <= 100) return `thumbnail-${q}`;
  if (width <= 200) return `small-${q}`;
  if (width <= 400) return `medium-${q}`;
  if (width <= 800) return `large-${q}`;
  if (width <= 1200) return `xlarge-${q}`;
  
  return `custom-w${width}-q${q}`;
}

/**
 * 画像アップロード用ヘルパー
 */
export async function uploadImageToCloudflare(
  file: File,
  imageId?: string
): Promise<{ success: boolean; result?: unknown; errors?: unknown[] }> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  
  if (!accountId || !apiToken) {
    throw new Error('Cloudflare credentials not configured');
  }
  
  const formData = new FormData();
  formData.append('file', file);
  
  if (imageId) {
    formData.append('id', imageId);
  }
  
  // メタデータを追加
  formData.append('metadata', JSON.stringify({
    originalName: file.name,
    uploadedAt: new Date().toISOString(),
    fileSize: file.size,
    mimeType: file.type
  }));
  
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`
        },
        body: formData
      }
    );
    
    return await response.json();
  } catch (error) {
    console.error('Failed to upload image to Cloudflare:', error);
    throw error;
  }
}

/**
 * 画像削除用ヘルパー
 */
export async function deleteImageFromCloudflare(
  imageId: string
): Promise<{ success: boolean }> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  
  if (!accountId || !apiToken) {
    throw new Error('Cloudflare credentials not configured');
  }
  
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1/${imageId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${apiToken}`
        }
      }
    );
    
    const result = await response.json();
    return { success: result.success };
  } catch (error) {
    console.error('Failed to delete image from Cloudflare:', error);
    throw error;
  }
}

/**
 * 画像情報取得用ヘルパー
 */
export async function getImageFromCloudflare(
  imageId: string
): Promise<unknown> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  
  if (!accountId || !apiToken) {
    throw new Error('Cloudflare credentials not configured');
  }
  
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1/${imageId}`,
      {
        headers: {
          'Authorization': `Bearer ${apiToken}`
        }
      }
    );
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get image from Cloudflare:', error);
    throw error;
  }
}

/**
 * バリアント設定用ヘルパー
 */
export const CLOUDFLARE_IMAGE_VARIANTS = {
  thumbnail: {
    width: 100,
    height: 100,
    fit: 'crop' as const,
    quality: 80
  },
  small: {
    width: 200,
    height: 200,
    fit: 'scale-down' as const,
    quality: 80
  },
  medium: {
    width: 400,
    height: 400,
    fit: 'scale-down' as const,
    quality: 80
  },
  large: {
    width: 800,
    height: 800,
    fit: 'scale-down' as const,
    quality: 75
  },
  xlarge: {
    width: 1200,
    height: 1200,
    fit: 'scale-down' as const,
    quality: 75
  },
  
  // 特殊用途
  avatar: {
    width: 128,
    height: 128,
    fit: 'crop' as const,
    quality: 90
  },
  banner: {
    width: 1200,
    height: 300,
    fit: 'crop' as const,
    quality: 80
  },
  card: {
    width: 400,
    height: 250,
    fit: 'crop' as const,
    quality: 80
  }
} as const;

/**
 * 応答性画像生成用ヘルパー
 */
export function generateResponsiveImageProps(
  src: string,
  alt: string,
  priority = false
) {
  const accountHash = process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH;
  
  if (!accountHash) {
    return { src, alt, priority };
  }
  
  const imageId = extractImageId(src);
  const baseUrl = `https://imagedelivery.net/${accountHash}/${imageId}`;
  
  return {
    src: `${baseUrl}/medium-80`,
    alt,
    priority,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    placeholder: 'blur' as const,
    blurDataURL: `${baseUrl}/thumbnail-20`
  };
}