// ✨ Ultra-Modern Hero Section Effects
// 2025年最新トレンド: 3D効果、パーティクル、フローティング要素

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// 浮遊パーティクル背景
interface ParticleBackgroundProps {
  particleCount?: number;
  className?: string;
}

export function ParticleBackground({ particleCount = 50, className }: ParticleBackgroundProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      }));
    };

    setParticles(generateParticles());
  }, [particleCount]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// グラデーション blob 背景
export function GradientBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}

// 3Dフローティングカード
interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  rotationIntensity?: number;
  floatIntensity?: number;
  delay?: number;
}

export function FloatingCard({ 
  children, 
  className, 
  rotationIntensity = 5,
  floatIntensity = 20,
  delay = 0 
}: FloatingCardProps) {
  return (
    <motion.div
      className={cn("transform-gpu", className)}
      animate={{
        y: [0, -floatIntensity, 0],
        rotateX: [0, rotationIntensity, 0],
        rotateY: [0, -rotationIntensity/2, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      whileHover={{
        scale: 1.05,
        rotateY: 10,
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
}

// ネオン グリッド背景
export function NeonGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

// ホログラム効果
interface HologramEffectProps {
  children: React.ReactNode;
  className?: string;
}

export function HologramEffect({ children, className }: HologramEffectProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 3,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 via-transparent to-cyan-400/5" />
    </div>
  );
}

// デジタル雨効果（Matrix風）
export function DigitalRain() {
  const [drops, setDrops] = useState<Array<{
    id: number;
    x: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    const generateDrops = () => {
      return Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      }));
    };

    setDrops(generateDrops());
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute w-px bg-gradient-to-b from-green-400 via-green-300 to-transparent"
          style={{
            left: `${drop.x}%`,
            height: '100px',
          }}
          animate={{
            y: ['-100px', '100vh'],
          }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            delay: drop.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

// CPU/チップセット パーティクル
export function CPUParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* 接続線 */}
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.line
            key={i}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// 全体的なヒーロー背景コンテナ
interface HeroBackgroundProps {
  variant?: "particles" | "blobs" | "grid" | "matrix" | "cpu";
  children: React.ReactNode;
  className?: string;
}

export function HeroBackground({ variant = "blobs", children, className }: HeroBackgroundProps) {
  const BackgroundComponent = {
    particles: ParticleBackground,
    blobs: GradientBlobs,
    grid: NeonGrid,
    matrix: DigitalRain,
    cpu: CPUParticles,
  }[variant];

  return (
    <div className={cn("relative min-h-screen overflow-hidden", className)}>
      <BackgroundComponent />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}