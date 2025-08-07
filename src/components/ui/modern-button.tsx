// 🚀 Ultra-Modern Button Component with Advanced Micro-interactions
// 2025年最新トレンド: 3D効果、発光、マイクロインタラクション

"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { Loader2 } from "lucide-react";

interface ModernButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "glow" | "gradient" | "glass" | "neon";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  ripple?: boolean;
}

export function ModernButton({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  type = "button",
  ripple = true,
  ...props
}: ModernButtonProps) {
  const [rippleAnimation, setRippleAnimation] = useState<{ x: number; y: number; show: boolean }>({
    x: 0,
    y: 0,
    show: false
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setRippleAnimation({ x, y, show: true });
      setTimeout(() => setRippleAnimation(prev => ({ ...prev, show: false })), 600);
    }
    
    if (onClick && !disabled && !isLoading) {
      onClick();
    }
  };

  const baseClasses = "relative overflow-hidden font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-12 py-6 text-xl"
  };

  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl focus:ring-blue-500/50",
    secondary: "bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 focus:ring-gray-500/50",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500/50",
    glow: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/75 focus:ring-purple-500/50",
    gradient: "bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 text-white hover:scale-105 shadow-2xl hover:shadow-emerald-500/50 focus:ring-emerald-500/50",
    glass: "backdrop-blur-xl bg-white/20 border border-white/20 text-white hover:bg-white/30 focus:ring-white/50",
    neon: "bg-black border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/75 focus:ring-cyan-400/50"
  };

  return (
    <motion.button
      type={type}
      className={cn(
        baseClasses,
        sizeClasses[size],
        variants[variant],
        fullWidth && "w-full",
        className
      )}
      onClick={handleClick}
      disabled={disabled || isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {/* Ripple Effect */}
      {ripple && rippleAnimation.show && (
        <motion.span
          className="absolute bg-white/30 rounded-full pointer-events-none"
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            left: rippleAnimation.x - 150,
            top: rippleAnimation.y - 150,
          }}
        />
      )}

      {/* Content */}
      <span className="relative flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          <>
            {leftIcon && <span className="flex items-center">{leftIcon}</span>}
            {children}
            {rightIcon && (
              <motion.span 
                className="flex items-center"
                animate={{ x: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                {rightIcon}
              </motion.span>
            )}
          </>
        )}
      </span>

      {/* Gradient Overlay for Extra Glow */}
      {(variant === "glow" || variant === "gradient") && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
    </motion.button>
  );
}

// 特化型ボタン
export function CTAButton({ children, className, ...props }: Omit<ModernButtonProps, 'variant'>) {
  return (
    <ModernButton
      variant="gradient"
      size="lg"
      className={cn("font-bold", className)}
      {...props}
    >
      {children}
    </ModernButton>
  );
}

export function GhostButton({ children, className, ...props }: Omit<ModernButtonProps, 'variant'>) {
  return (
    <ModernButton
      variant="ghost"
      className={cn("", className)}
      {...props}
    >
      {children}
    </ModernButton>
  );
}

export function GlowButton({ children, className, ...props }: Omit<ModernButtonProps, 'variant'>) {
  return (
    <ModernButton
      variant="glow"
      className={cn("", className)}
      {...props}
    >
      {children}
    </ModernButton>
  );
}

export function NeonButton({ children, className, ...props }: Omit<ModernButtonProps, 'variant'>) {
  return (
    <ModernButton
      variant="neon"
      className={cn("font-mono uppercase tracking-wider", className)}
      {...props}
    >
      {children}
    </ModernButton>
  );
}