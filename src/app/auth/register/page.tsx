"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { signUp } from "@/lib/auth/session-management"
import { setUser as setSentryUser } from "@/app/instrumentation-client"
import { useAnalytics } from "@/lib/analytics/use-analytics"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { HomeButton } from "@/components/ui/home-button"
import { 
  Sparkles, 
  Shield, 
  Users, 
  Star, 
  TrendingUp, 
  Brain,
  CheckCircle,
  Eye,
  EyeOff,
  ArrowRight,
  Zap,
  Award,
  Lock,
  Home
} from "lucide-react"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { track, identify } = useAnalytics()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!agreedToTerms) {
      setError("利用規約とプライバシーポリシーに同意してください")
      return
    }

    if (password !== confirmPassword) {
      setError("パスワードが一致しません")
      return
    }

    if (password.length < 8) {
      setError("パスワードは8文字以上で設定してください")
      return
    }

    setLoading(true)

    try {
      const result = await signUp(email, password, name)

      if (!result.success) {
        track('error_occurred', {
          type: 'auth_error',
          message: result.error || '登録に失敗しました'
        })
        setError(result.error || '登録に失敗しました')
        return
      }

      if (result.data?.user) {
        const user = result.data.user
        
        setSentryUser({
          id: user.id,
          email: user.email || undefined,
          username: name,
        })
        
        identify(user.id, {
          email: user.email || undefined,
          name: name,
          plan: 'free',
          created_at: new Date().toISOString()
        })
        
        track('user_signed_up', {
          method: 'email',
          plan: 'free'
        })

        router.push("/dashboard")
      }
    } catch (err) {
      track('error_occurred', {
        type: 'unexpected_error',
        message: '登録に失敗しました'
      })
      setError("登録に失敗しました。もう一度お試しください。")
    } finally {
      setLoading(false)
    }
  }

  const benefits = [
    {
      icon: <Brain className="w-5 h-5" />,
      text: "AIチャット学習",
      description: "24時間質問可能"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: "リアルタイム分析",
      description: "市場データ即座に取得"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "安全な学習環境",
      description: "SSL暗号化完備"
    },
    {
      icon: <Award className="w-5 h-5" />,
      text: "85レッスン",
      description: "体系的な学習コンテンツ"
    }
  ]

  const testimonials = [
    {
      name: "投資初心者 A様",
      role: "会社員",
      comment: "AIのサポートで安心して投資学習ができました",
      rating: 5
    },
    {
      name: "経験者 B様", 
      role: "個人投資家",
      comment: "DeFi監視機能が非常に便利です",
      rating: 5
    }
  ]

  return (
    <>
      {/* SEO Metadata */}
      <title>無料会員登録 | 投資総合プラットフォーム - AIと始める投資学習</title>
      <meta name="description" content="無料で始める投資学習プラットフォーム。AI技術で安全に投資の基礎から応用まで学習。85レッスン、DeFi監視、スマートアラート機能を無料体験。" />
      <meta name="keywords" content="投資学習,暗号資産教育,AI投資,DeFi,無料登録,投資初心者" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
        <HomeButton />
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative z-10 min-h-screen flex">
          {/* Left Panel - Marketing Content */}
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">CryptoAI Platform</h1>
                  <p className="text-sm text-white/60">投資総合プラットフォーム</p>
                </div>
              </Link>

              {/* Main Headline */}
              <div className="mb-8">
                <h2 className="text-4xl xl:text-5xl font-bold leading-tight mb-4">
                  <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    今すぐ始める
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    投資の未来
                  </span>
                </h2>
                <p className="text-xl text-white/80">
                  AI技術で安全に学ぶ投資の世界。
                  <span className="text-emerald-400 font-semibold"> 完全無料 </span>
                  で始められます。
                </p>
              </div>

              {/* Limited Time Offer */}
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 mb-8"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Zap className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-100">
                  🎁 今なら登録特典：プレミアム機能1ヶ月無料
                </span>
              </motion.div>

              {/* Benefits */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <div className="text-emerald-400">{benefit.icon}</div>
                    <div>
                      <p className="font-semibold text-white">{benefit.text}</p>
                      <p className="text-sm text-white/60">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Proof */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div 
                        key={i} 
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 border-2 border-white/20" 
                      />
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-white">47,000+ 学習者が参加中</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-white/60 ml-2">4.9/5.0</span>
                    </div>
                  </div>
                </div>

                {/* Testimonials */}
                <div className="space-y-3">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 + 0.5 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-white/80 mb-2">"{testimonial.comment}"</p>
                      <p className="text-xs text-white/60">{testimonial.name} - {testimonial.role}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Registration Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-12">
            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Form Container */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                {/* Form Header */}
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                      無料アカウント作成
                    </span>
                  </h3>
                  <p className="text-white/70">
                    30秒で完了。今すぐ投資学習を始めましょう
                  </p>
                </div>

                {/* OAuth Buttons */}
                <div className="space-y-3 mb-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
                    disabled={loading}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Googleで続行
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
                    disabled={loading}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHubで続行
                  </Button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/5 text-white/60">または</span>
                  </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleRegister} className="space-y-4">
                  {error && (
                    <motion.div
                      className="p-3 text-sm text-red-200 bg-red-500/20 rounded-lg border border-red-500/30"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {error}
                    </motion.div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white/80">お名前</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="山田 太郎"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={loading}
                      className="bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-emerald-400 focus:ring-emerald-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/80">メールアドレス</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="user@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                      className="bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-emerald-400 focus:ring-emerald-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white/80">パスワード</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="8文字以上で入力"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        minLength={8}
                        className="bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-emerald-400 focus:ring-emerald-400 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white/80">パスワード（確認）</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="パスワードを再入力"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={loading}
                        minLength={8}
                        className="bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-emerald-400 focus:ring-emerald-400 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm text-white/70 leading-relaxed cursor-pointer">
                      <Link href="/terms" className="text-emerald-400 hover:underline">利用規約</Link>
                      および
                      <Link href="/privacy" className="text-emerald-400 hover:underline">プライバシーポリシー</Link>
                      に同意します
                    </Label>
                  </div>

                  <motion.div className="pt-4">
                    <Button
                      type="submit"
                      disabled={loading || !agreedToTerms}
                      className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          アカウント作成中...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          無料でアカウント作成
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      )}
                    </Button>
                  </motion.div>

                  <div className="text-center pt-4">
                    <p className="text-sm text-white/60">
                      すでにアカウントをお持ちの方は{" "}
                      <Link href="/auth/login" className="text-emerald-400 hover:underline font-semibold">
                        ログイン
                      </Link>
                    </p>
                  </div>
                </form>

                {/* Security Features */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-center gap-6 text-xs text-white/50">
                    <div className="flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>SSL暗号化</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>個人情報保護</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>無料で始める</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Social Proof */}
              <div className="lg:hidden mt-6 text-center">
                <p className="text-white/60 text-sm mb-2">47,000+ 学習者が参加中</p>
                <div className="flex justify-center items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-white/60 ml-2 text-sm">4.9/5.0</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}