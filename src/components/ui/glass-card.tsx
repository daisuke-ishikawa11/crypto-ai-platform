"use client"

// 🎨 Ultra-Modern Glassmorphism Card Component
// 2025年最新トレンド: フロスト・グラス効果でCoinbase/Binanceスタイル

"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import * as React from "react"

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "dark" | "colored" | "minimal";
  hover?: boolean;
  interactive?: boolean;
  glow?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  variant = "default", 
  hover = false,
  interactive = false,
  glow = false
}: GlassCardProps) {
  const baseClasses = "backdrop-blur-xl border border-white/20 rounded-2xl transition-all duration-500";
  
  const variants = {
    default: "bg-white/10 hover:bg-white/20",
    dark: "bg-black/30 hover:bg-black/40 border-white/10",
    colored: "bg-gradient-to-br from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30",
    minimal: "bg-white/5 hover:bg-white/10 border-white/5"
  };

  const Component = interactive ? motion.div : "div";
  
  const interactiveProps = interactive ? {
    whileHover: { 
      scale: 1.02, 
      y: -2,
      transition: { type: "spring", stiffness: 400 }
    },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 300 }
  } : {};

  return (
    <Component
      className={cn(
        baseClasses,
        variants[variant],
        hover && "hover:shadow-2xl hover:shadow-blue-500/10",
        glow && "shadow-2xl shadow-blue-500/20",
        interactive && "cursor-pointer",
        className
      )}
      {...interactiveProps}
    >
      {glow && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl -z-10" />
      )}
      {children}
    </Component>
  );
}

// 特化型Glassmorphismカード
export function DataCard({ children, className, ...props }: Omit<GlassCardProps, 'variant'>) {
  return (
    <GlassCard
      variant="dark"
      hover
      interactive
      className={cn("p-6", className)}
      {...props}
    >
      {children}
    </GlassCard>
  );
}

export function FeatureCard({ children, className, ...props }: Omit<GlassCardProps, 'variant'>) {
  return (
    <GlassCard
      variant="colored"
      hover
      interactive
      glow
      className={cn("p-8", className)}
      {...props}
    >
      {children}
    </GlassCard>
  );
}

export function HeroCard({ children, className, ...props }: Omit<GlassCardProps, 'variant'>) {
  return (
    <GlassCard
      variant="default"
      glow
      className={cn("p-12", className)}
      {...props}
    >
      {children}
    </GlassCard>
  );
}
