// 主题特效性能优化和移动端适配配置
// filepath: /src/config/theme-effects-performance.ts

export interface PerformanceConfig {
  // 设备检测
  isMobile: boolean
  isLowPerformance: boolean
  
  // 特效级别
  effectLevel: 'high' | 'medium' | 'low' | 'minimal'
  
  // 动画配置
  animationDuration: number
  particleCount: number
  enableParallax: boolean
  enableParticles: boolean
}

// 设备性能检测
export function detectDevicePerformance(): PerformanceConfig {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const isLowEndDevice = navigator.hardwareConcurrency <= 2
  const isSlowConnection = (navigator as any).connection?.effectiveType === 'slow-2g' || 
                          (navigator as any).connection?.effectiveType === '2g'
  
  const isLowPerformance = isMobile || isLowEndDevice || isSlowConnection
  
  let effectLevel: 'high' | 'medium' | 'low' | 'minimal' = 'high'
  
  if (isLowPerformance) {
    effectLevel = isMobile ? 'low' : 'medium'
  }
  
  if (isSlowConnection) {
    effectLevel = 'minimal'
  }
  
  return {
    isMobile,
    isLowPerformance,
    effectLevel,
    animationDuration: effectLevel === 'minimal' ? 0.3 : 
                      effectLevel === 'low' ? 0.5 : 
                      effectLevel === 'medium' ? 0.8 : 1.0,
    particleCount: effectLevel === 'minimal' ? 10 : 
                  effectLevel === 'low' ? 20 : 
                  effectLevel === 'medium' ? 35 : 50,
    enableParallax: effectLevel !== 'minimal' && effectLevel !== 'low',
    enableParticles: effectLevel !== 'minimal'
  }
}

// 响应式特效配置
export const responsiveEffectConfig = {
  mobile: {
    particleCount: 15,
    animationDuration: 0.5,
    enableParallax: false,
    reducedMotion: true
  },
  tablet: {
    particleCount: 25,
    animationDuration: 0.7,
    enableParallax: true,
    reducedMotion: false
  },
  desktop: {
    particleCount: 50,
    animationDuration: 1.0,
    enableParallax: true,
    reducedMotion: false
  }
}

// 媒体查询断点
export const breakpoints = {
  mobile: '(max-width: 768px)',
  tablet: '(min-width: 769px) and (max-width: 1024px)',
  desktop: '(min-width: 1025px)'
}

// CSS优化工具
export function generateResponsiveCSS(): string {
  return `
/* 移动端优化 */
@media ${breakpoints.mobile} {
  .theme-particles-container {
    display: none; /* 在小屏设备上禁用粒子效果 */
  }
  
  .theme-effect-particles,
  .theme-effect-deep-space {
    background-attachment: scroll; /* 移动端不支持fixed背景 */
  }
  
  .theme-math-decoration {
    font-size: 1rem; /* 减小数学装饰字体 */
    opacity: 0.08; /* 降低透明度 */
  }
  
  /* 简化动画 */
  .theme-effect-mathematical *,
  .theme-effect-timeline * {
    animation-duration: 0.3s !important;
  }
  
  /* 禁用视差效果 */
  .theme-effect-mathematical .theme-math-decoration {
    transform: none !important;
  }
}

/* 平板优化 */
@media ${breakpoints.tablet} {
  .theme-particles-container .theme-particle {
    animation-duration: 4s; /* 减少动画时长 */
  }
  
  .theme-math-decoration {
    font-size: 1.5rem;
  }
}

/* 高DPI屏幕优化 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .theme-effect-deep-space .theme-star {
    box-shadow: 0 0 2px rgba(255, 255, 255, 0.8); /* 减少模糊半径 */
  }
}

/* 减少动画偏好设置 */
@media (prefers-reduced-motion: reduce) {
  .theme-effect-particles *,
  .theme-effect-deep-space *,
  .theme-effect-mathematical *,
  .theme-effect-timeline * {
    animation: none !important;
    transition: none !important;
  }
  
  .theme-particles-container {
    display: none;
  }
  
  .theme-math-decoration {
    transform: none !important;
  }
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
  .theme-effect-deep-space {
    background-color: #000;
    color: #fff;
  }
  
  .theme-effect-mathematical .theme-math-decoration {
    color: rgba(255, 215, 0, 0.5);
  }
}

/* 暗色主题适配 */
@media (prefers-color-scheme: dark) {
  .theme-effect-mathematical {
    background-color: #1a1a1a;
  }
  
  .theme-effect-timeline::before {
    background: linear-gradient(to bottom, #ffd700, #ff6b6b, #4ecdc4);
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
  }
}
`
}

// 性能监控
export class PerformanceMonitor {
  private frameCount = 0
  private lastTime = 0
  private fps = 0
  
  constructor() {
    this.measureFPS = this.measureFPS.bind(this)
  }
  
  measureFPS() {
    const now = performance.now()
    this.frameCount++
    
    if (now - this.lastTime >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime))
      this.frameCount = 0
      this.lastTime = now
      
      // 如果FPS过低，自动降级特效
      if (this.fps < 30) {
        this.degradeEffects()
      }
    }
    
    requestAnimationFrame(this.measureFPS)
  }
  
  private degradeEffects() {
    console.warn('检测到性能问题，正在降级特效...')
    
    // 减少粒子数量
    const particles = document.querySelectorAll('.theme-particle, .theme-star')
    particles.forEach((particle, index) => {
      if (index % 2 === 0) {
        (particle as HTMLElement).style.display = 'none'
      }
    })
    
    // 禁用视差效果
    const mathDecorations = document.querySelectorAll('.theme-math-decoration')
    mathDecorations.forEach((decoration) => {
      (decoration as HTMLElement).style.transform = 'none'
    })
  }
  
  start() {
    this.lastTime = performance.now()
    this.measureFPS()
  }
  
  getFPS(): number {
    return this.fps
  }
}

// 导出默认性能配置
export const defaultPerformanceConfig = detectDevicePerformance()
