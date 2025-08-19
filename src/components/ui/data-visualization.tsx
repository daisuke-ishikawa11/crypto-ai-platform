"use client"

// 📊 Ultra-Modern Data Visualization Components
// 2025年最新トレンド: リアルタイムデータ、アニメーション、3D効果

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react"
import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

// アニメーション数字カウンター
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export function AnimatedCounter({ 
  value, 
  duration = 1.5, 
  prefix = "", 
  suffix = "", 
  className,
  decimals = 0
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = React.useState(0);
  
  React.useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const currentValue = progress * value;
      setDisplayValue(Number(currentValue.toFixed(decimals)));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, decimals]);
  
  return (
    <motion.span 
      className={cn("font-mono font-bold", className)}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {prefix}{displayValue.toLocaleString()}{suffix}
    </motion.span>
  );
}

// プライス変更インジケーター
interface PriceChangeProps {
  change: number;
  percentage: number;
  className?: string;
  showIcon?: boolean;
  animated?: boolean;
}

export function PriceChange({ 
  change, 
  percentage, 
  className, 
  showIcon = true, 
  animated = true 
}: PriceChangeProps) {
  const isPositive = change >= 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;
  
  const Component = animated ? motion.div : "div";
  const animationProps = animated ? {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 300 }
  } : {};
  
  return (
    <Component
      className={cn(
        "flex items-center gap-1 font-semibold rounded-lg px-2 py-1",
        isPositive 
          ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50" 
          : "text-red-600 bg-red-50 dark:bg-red-950/50",
        className
      )}
      {...animationProps}
    >
      {showIcon && <Icon className="h-4 w-4" />}
      <span className="text-sm">
        {isPositive ? "+" : ""}{percentage.toFixed(2)}%
      </span>
    </Component>
  );
}

// ミニチャート（スパークライン）
interface SparklineProps {
  data: number[];
  className?: string;
  color?: "green" | "red" | "blue" | "purple";
  height?: number;
  animated?: boolean;
}

export function Sparkline({ 
  data, 
  className, 
  color = "blue", 
  height = 40, 
  animated = true 
}: SparklineProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const colorClasses = {
    green: "stroke-emerald-500",
    red: "stroke-red-500", 
    blue: "stroke-blue-500",
    purple: "stroke-purple-500"
  };
  
  const pathData = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
  
  return (
    <div className={cn("relative", className)}>
      <svg 
        width="100%" 
        height={height} 
        viewBox={`0 0 100 ${height}`} 
        className="overflow-visible"
      >
        <motion.path
          d={pathData}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={colorClasses[color]}
          initial={animated ? { pathLength: 0 } : undefined}
          animate={animated ? { pathLength: 1 } : undefined}
          transition={animated ? { duration: 1.5, ease: "easeInOut" } : undefined}
        />
      </svg>
    </div>
  );
}

// 進捗リング
interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  animated?: boolean;
}

export function ProgressRing({ 
  percentage, 
  size = 120, 
  strokeWidth = 8, 
  className, 
  children,
  color = "#3b82f6",
  animated = true 
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* 背景リング */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        {/* 進捗リング */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={animated ? strokeDashoffset : 0}
          initial={animated ? { strokeDashoffset: circumference } : undefined}
          animate={animated ? { strokeDashoffset } : undefined}
          transition={animated ? { duration: 1.5, ease: "easeInOut" } : undefined}
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}

// リアルタイムメトリクスカード
interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changePercentage?: number;
  icon?: React.ReactNode;
  className?: string;
  trend?: "up" | "down" | "neutral";
  sparklineData?: number[];
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changePercentage, 
  icon, 
  className, 
  trend,
  sparklineData 
}: MetricCardProps) {
  return (
    <motion.div
      className={cn(
        "p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300",
        className
      )}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
              {icon}
            </div>
          )}
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {title}
          </h3>
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
            trend === "up" && "text-emerald-600 bg-emerald-100 dark:bg-emerald-950/50",
            trend === "down" && "text-red-600 bg-red-100 dark:bg-red-950/50",
            trend === "neutral" && "text-gray-600 bg-gray-100 dark:bg-gray-800"
          )}>
            {trend === "up" && <TrendingUp className="h-3 w-3" />}
            {trend === "down" && <TrendingDown className="h-3 w-3" />}
            {trend === "neutral" && <Activity className="h-3 w-3" />}
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {typeof value === "number" ? (
            <AnimatedCounter value={value} />
          ) : (
            value
          )}
        </div>
        
        {(change !== undefined || changePercentage !== undefined) && (
          <PriceChange 
            change={change || 0} 
            percentage={changePercentage || 0} 
          />
        )}
        
        {sparklineData && (
          <div className="mt-4">
            <Sparkline 
              data={sparklineData} 
              color={trend === "up" ? "green" : trend === "down" ? "red" : "blue"}
              height={30}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ライブデータストリーム効果
export function LiveDataStream({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
        animate={{ x: [-100, 300] }}
        transition={{ 
          repeat: Infinity, 
          duration: 2, 
          ease: "easeInOut",
          repeatDelay: 3
        }}
      />
    </div>
  );
}
