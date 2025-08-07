import Link from "next/link"
import { Home } from "lucide-react"
import { Button } from "./button"

interface HomeButtonProps {
  className?: string
  variant?: "default" | "outline" | "ghost"
  buttonClassName?: string
}

export function HomeButton({ className = "", variant = "outline", buttonClassName }: HomeButtonProps) {
  const defaultButtonClass = "bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
  
  return (
    <div className={`fixed top-6 left-6 z-50 ${className}`}>
      <Link href="/">
        <Button
          variant={variant}
          size="sm"
          className={buttonClassName || defaultButtonClass}
        >
          <Home className="w-4 h-4 mr-2" />
          ホームに戻る
        </Button>
      </Link>
    </div>
  )
}