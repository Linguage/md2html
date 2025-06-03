import type { IConfigOption } from '../types.ts'

// 主题特效类型定义
export interface ThemeEffect {
  name: string
  description: string
  cssClass: string
  animations: Record<string, string>
  transitions: Record<string, string>
  filters: Record<string, string>
  transforms: Record<string, string>
}

// 动画特效配置
export const animationEffects = {
  // 标题动画
  fadeInUp: {
    name: `fadeInUp`,
    keyframes: `
      @keyframes fadeInUp {
        0% {
          opacity: 0;
          transform: translateY(30px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
    animation: `fadeInUp 0.6s ease-out forwards`,
  },

  slideInLeft: {
    name: `slideInLeft`,
    keyframes: `
      @keyframes slideInLeft {
        0% {
          opacity: 0;
          transform: translateX(-50px);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `,
    animation: `slideInLeft 0.5s ease-out forwards`,
  },

  bounceIn: {
    name: `bounceIn`,
    keyframes: `
      @keyframes bounceIn {
        0% {
          opacity: 0;
          transform: scale(0.3);
        }
        50% {
          opacity: 1;
          transform: scale(1.05);
        }
        70% {
          transform: scale(0.9);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    `,
    animation: `bounceIn 0.6s ease-out forwards`,
  },

  // 文字特效
  typeWriter: {
    name: `typeWriter`,
    keyframes: `
      @keyframes typeWriter {
        0% {
          width: 0;
        }
        100% {
          width: 100%;
        }
      }
      @keyframes blinkCursor {
        0%, 50% {
          border-right-color: transparent;
        }
        51%, 100% {
          border-right-color: var(--md-primary-color);
        }
      }
    `,
    animation: `typeWriter 2s steps(40) 1s forwards, blinkCursor 1s infinite`,
  },

  // 代码块特效
  codeGlow: {
    name: `codeGlow`,
    keyframes: `
      @keyframes codeGlow {
        0%, 100% {
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
        }
        50% {
          box-shadow: 0 0 20px rgba(0, 123, 255, 0.6), 0 0 30px rgba(0, 123, 255, 0.4);
        }
      }
    `,
    animation: `codeGlow 2s ease-in-out infinite`,
  },

  // 引用块特效
  quoteSlide: {
    name: `quoteSlide`,
    keyframes: `
      @keyframes quoteSlide {
        0% {
          opacity: 0;
          transform: translateX(-20px);
          border-left-width: 0;
        }
        100% {
          opacity: 1;
          transform: translateX(0);
          border-left-width: 4px;
        }
      }
    `,
    animation: `quoteSlide 0.8s ease-out forwards`,
  },

  // 粒子背景相关动画
  particleFloat: {
    name: `particleFloat`,
    keyframes: `
      @keyframes particleFloat {
        0%, 100% { 
          transform: translateY(0px) rotate(0deg); 
          opacity: 0.7; 
        }
        50% { 
          transform: translateY(-20px) rotate(180deg); 
          opacity: 1; 
        }
      }
    `,
    animation: `particleFloat 6s ease-in-out infinite`,
  },

  // 发光效果
  glow: {
    name: `glow`,
    keyframes: `
      @keyframes glow {
        from { 
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); 
        }
        to { 
          text-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 107, 107, 0.3); 
        }
      }
    `,
    animation: `glow 2s ease-in-out infinite alternate`,
  },

  // 时间线滑入动画
  timelineSlideIn: {
    name: `timelineSlideIn`,
    keyframes: `
      @keyframes timelineSlideIn {
        from { 
          opacity: 0; 
          transform: translateY(50px); 
        }
        to { 
          opacity: 1; 
          transform: translateY(0); 
        }
      }
    `,
    animation: `timelineSlideIn 0.8s ease-out forwards`,
  },

  // 数学公式漂浮动画
  mathFloat: {
    name: `mathFloat`,
    keyframes: `
      @keyframes mathFloat {
        0%, 100% { 
          transform: translateY(0) rotate(0deg); 
          opacity: 0.1; 
        }
        50% { 
          transform: translateY(-30px) rotate(10deg); 
          opacity: 0.3; 
        }
      }
    `,
    animation: `mathFloat 8s ease-in-out infinite`,
  },

  // 玻璃拟态效果
  glassmorphism: {
    name: `glassmorphism`,
    keyframes: `
      @keyframes glassmorphism {
        0% {
          opacity: 0;
          backdrop-filter: blur(0px);
          background: rgba(255, 255, 255, 0);
        }
        100% {
          opacity: 1;
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.05);
        }
      }
    `,
    animation: `glassmorphism 1s ease-out forwards`,
  },

  // 淡入动画
  fadeIn: {
    name: `fadeIn`,
    keyframes: `
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    `,
    animation: `fadeIn 1s ease-out forwards`,
  },

  // 脉冲动画
  pulse: {
    name: `pulse`,
    keyframes: `
      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          transform: scale(1);
        }
      }
    `,
    animation: `pulse 2s ease-in-out infinite`,
  },

  // 震动动画
  shake: {
    name: `shake`,
    keyframes: `
      @keyframes shake {
        0%, 100% {
          transform: translateX(0);
        }
        10%, 30%, 50%, 70%, 90% {
          transform: translateX(-5px);
        }
        20%, 40%, 60%, 80% {
          transform: translateX(5px);
        }
      }
    `,
    animation: `shake 0.6s ease-in-out`,
  },

  // 缩放入场
  zoomIn: {
    name: `zoomIn`,
    keyframes: `
      @keyframes zoomIn {
        0% {
          opacity: 0;
          transform: scale(0.3);
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    `,
    animation: `zoomIn 0.5s ease-out forwards`,
  },
}

// 视觉特效配置
export const visualEffects = {
  // 阴影效果
  shadows: {
    subtle: `0 2px 4px rgba(0, 0, 0, 0.1)`,
    moderate: `0 4px 8px rgba(0, 0, 0, 0.15)`,
    strong: `0 8px 16px rgba(0, 0, 0, 0.2)`,
    glow: `0 0 20px rgba(var(--md-primary-color-rgb), 0.3)`,
    inset: `inset 0 2px 4px rgba(0, 0, 0, 0.1)`,
  },

  // 渐变效果
  gradients: {
    headerGradient: `linear-gradient(135deg, var(--md-primary-color) 0%, color-mix(in srgb, var(--md-primary-color) 80%, white) 100%)`,
    backgroundGradient: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.05) 100%)`,
    borderGradient: `linear-gradient(90deg, var(--md-primary-color) 0%, transparent 100%)`,
    textGradient: `linear-gradient(135deg, var(--md-primary-color) 0%, color-mix(in srgb, var(--md-primary-color) 70%, black) 100%)`,
  },

  // 边框效果
  borders: {
    solid: `1px solid var(--md-primary-color)`,
    dashed: `2px dashed var(--md-primary-color)`,
    dotted: `2px dotted var(--md-primary-color)`,
    gradient: `2px solid transparent`,
    animated: `2px solid var(--md-primary-color)`,
  },

  // 滤镜效果
  filters: {
    blur: `blur(2px)`,
    brightness: `brightness(1.1)`,
    contrast: `contrast(1.2)`,
    saturate: `saturate(1.3)`,
    sepia: `sepia(0.2)`,
    vintage: `sepia(0.3) contrast(1.2) brightness(1.1)`,
  },
}

// 过渡效果配置
export const transitionEffects = {
  smooth: `all 0.3s ease`,
  bouncy: `all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
  elastic: `all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  swift: `all 0.2s ease-out`,
  slow: `all 0.6s ease-in-out`,
}

// 主题特效预设
export const themeEffects: Record<string, ThemeEffect> = {
  none: {
    name: `无特效`,
    description: `不应用任何特效`,
    cssClass: `theme-effect-none`,
    animations: {},
    transitions: {},
    filters: {},
    transforms: {},
  },

  modern: {
    name: `现代`,
    description: `简洁现代的视觉效果`,
    cssClass: `theme-effect-modern`,
    animations: {
      h1: animationEffects.fadeInUp.animation,
      h2: animationEffects.slideInLeft.animation,
      blockquote: animationEffects.quoteSlide.animation,
    },
    transitions: {
      all: transitionEffects.smooth,
      hover: transitionEffects.swift,
    },
    filters: {
      image: visualEffects.filters.brightness,
    },
    transforms: {
      hover: `translateY(-2px) scale(1.02)`,
    },
  },

  playful: {
    name: `活泼`,
    description: `活泼有趣的动画效果`,
    cssClass: `theme-effect-playful`,
    animations: {
      h1: animationEffects.bounceIn.animation,
      h2: animationEffects.bounceIn.animation,
      code_pre: animationEffects.codeGlow.animation,
    },
    transitions: {
      all: transitionEffects.bouncy,
      hover: transitionEffects.elastic,
    },
    filters: {
      image: visualEffects.filters.saturate,
    },
    transforms: {
      hover: `scale(1.05) rotate(1deg)`,
    },
  },

  elegant: {
    name: `优雅`,
    description: `优雅精致的视觉体验`,
    cssClass: `theme-effect-elegant`,
    animations: {
      h1: animationEffects.typeWriter.animation,
      blockquote: animationEffects.fadeInUp.animation,
    },
    transitions: {
      all: transitionEffects.slow,
      hover: transitionEffects.elastic,
    },
    filters: {
      image: visualEffects.filters.vintage,
      blockquote: visualEffects.filters.sepia,
    },
    transforms: {
      hover: `translateY(-3px)`,
    },
  },

  minimalist: {
    name: `极简`,
    description: `极简主义风格`,
    cssClass: `theme-effect-minimalist`,
    animations: {},
    transitions: {
      all: transitionEffects.swift,
    },
    filters: {},
    transforms: {
      hover: `translateY(-1px)`,
    },
  },

  retro: {
    name: `复古`,
    description: `复古怀旧风格`,
    cssClass: `theme-effect-retro`,
    animations: {
      h1: animationEffects.slideInLeft.animation,
      h2: animationEffects.fadeInUp.animation,
    },
    transitions: {
      all: transitionEffects.elastic,
    },
    filters: {
      image: visualEffects.filters.sepia,
      all: visualEffects.filters.vintage,
    },
    transforms: {
      hover: `scale(1.02)`,
    },
  },

  // 新增高级主题特效
  particles: {
    name: `粒子背景`,
    description: `动态粒子背景效果，科技感十足`,
    cssClass: `theme-effect-particles`,
    animations: {
      h1: animationEffects.glow.animation,
      h2: animationEffects.slideInLeft.animation,
      h3: animationEffects.fadeInUp.animation,
      p: animationEffects.fadeIn.animation,
      blockquote: animationEffects.glassmorphism.animation,
    },
    transitions: {
      all: transitionEffects.smooth,
      hover: transitionEffects.swift,
    },
    filters: {
      container: `backdrop-filter: blur(10px)`,
    },
    transforms: {
      hover: `translateY(-5px) scale(1.02)`,
    },
  },

  'deep-space': {
    name: `深空主题`,
    description: `深邃的太空背景配合星光效果`,
    cssClass: `theme-effect-deep-space`,
    animations: {
      h1: animationEffects.glow.animation,
      h2: animationEffects.slideInLeft.animation,
      h3: animationEffects.fadeInUp.animation,
      p: animationEffects.fadeIn.animation,
      code: animationEffects.codeGlow.animation,
      blockquote: animationEffects.glassmorphism.animation,
    },
    transitions: {
      all: transitionEffects.slow,
      hover: transitionEffects.elastic,
    },
    filters: {
      container: `drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))`,
    },
    transforms: {
      hover: `translateY(-10px) scale(1.05)`,
    },
  },

  mathematical: {
    name: `数学之美`,
    description: `数学符号装饰和公式动画效果`,
    cssClass: `theme-effect-mathematical`,
    animations: {
      h1: animationEffects.glow.animation,
      h2: animationEffects.slideInLeft.animation,
      h3: animationEffects.fadeInUp.animation,
      p: animationEffects.typeWriter.animation,
      code: animationEffects.codeGlow.animation,
      blockquote: animationEffects.glassmorphism.animation,
    },
    transitions: {
      all: transitionEffects.smooth,
      hover: transitionEffects.swift,
    },
    filters: {
      container: `drop-shadow(0 5px 15px rgba(255, 215, 0, 0.2))`,
    },
    transforms: {
      hover: `translateY(-5px)`,
    },
  },

  timeline: {
    name: `时间线`,
    description: `适合历史和时间轴内容的特效`,
    cssClass: `theme-effect-timeline`,
    animations: {
      h1: animationEffects.glow.animation,
      h2: animationEffects.timelineSlideIn.animation,
      h3: animationEffects.fadeInUp.animation,
      p: animationEffects.fadeIn.animation,
      blockquote: animationEffects.glassmorphism.animation,
    },
    transitions: {
      all: transitionEffects.elastic,
      hover: transitionEffects.bouncy,
    },
    filters: {
      container: `drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15))`,
    },
    transforms: {
      hover: `translateY(-10px) scale(1.03)`,
    },
  },
}

// 特效选项配置
export const themeEffectOptions: IConfigOption[] = [
  {
    label: `无特效`,
    value: `none`,
    desc: `不应用特效`,
  },
  {
    label: `现代`,
    value: `modern`,
    desc: `简洁现代`,
  },
  {
    label: `活泼`,
    value: `playful`,
    desc: `活泼有趣`,
  },
  {
    label: `优雅`,
    value: `elegant`,
    desc: `优雅精致`,
  },
  {
    label: `极简`,
    value: `minimalist`,
    desc: `极简主义`,
  },
  {
    label: `复古`,
    value: `retro`,
    desc: `复古怀旧`,
  },
  {
    label: `粒子背景`,
    value: `particles`,
    desc: `科技粒子`,
  },
  {
    label: `深空主题`,
    value: `deep-space`,
    desc: `太空星光`,
  },
  {
    label: `数学之美`,
    value: `mathematical`,
    desc: `数学装饰`,
  },
  {
    label: `时间线`,
    value: `timeline`,
    desc: `历史时轴`,
  },
]

// 生成特效 CSS
export function generateEffectCSS(effectName: keyof typeof themeEffects): string {
  const effect = themeEffects[effectName]
  if (!effect || effectName === 'none')
    return ``

  let css = `
/* ${effect.name} 主题特效 */
`

  // 添加动画关键帧
  for (const [_, animationConfig] of Object.entries(animationEffects)) {
    css += `${animationConfig.keyframes}\n`
  }

  // 添加基础样式
  css += `
.${effect.cssClass} {
  /* 基础过渡效果 */
  position: relative;
}

.${effect.cssClass} * {
  transition: ${effect.transitions.all || transitionEffects.smooth};
}

.${effect.cssClass} *:hover {
  transition: ${effect.transitions.hover || transitionEffects.swift};
}
`

  // 特定主题的特殊样式
  if (effectName === 'particles') {
    css += generateParticleCSS()
  }

  if (effectName === 'deep-space') {
    css += generateDeepSpaceCSS()
  }

  if (effectName === 'mathematical') {
    css += generateMathematicalCSS()
  }

  if (effectName === 'timeline') {
    css += generateTimelineCSS()
  }

  // 添加元素特效
  const animations = effect.animations || {}
  const filters = effect.filters || {}
  const transforms = effect.transforms || {}

  // 标题动画
  if (animations.h1) {
    css += `
.${effect.cssClass} h1 {
  animation: ${animations.h1};
}
`
  }

  if (animations.h2) {
    css += `
.${effect.cssClass} h2 {
  animation: ${animations.h2};
}
`
  }

  if (animations.h3) {
    css += `
.${effect.cssClass} h3 {
  animation: ${animations.h3};
}
`
  }

  if (animations.p) {
    css += `
.${effect.cssClass} p {
  animation: ${animations.p};
}
`
  }

  // 引用块特效
  if (animations.blockquote) {
    css += `
.${effect.cssClass} blockquote {
  animation: ${animations.blockquote};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
}
`
  }

  // 代码块特效
  if (animations.code) {
    css += `
.${effect.cssClass} pre, 
.${effect.cssClass} code {
  animation: ${animations.code};
}
`
  }

  // 图片特效
  if (animations.img) {
    css += `
.${effect.cssClass} img {
  animation: ${animations.img};
}
`
  }

  // 滤镜效果
  if (filters.image) {
    css += `
.${effect.cssClass} img {
  filter: ${filters.image};
}
`
  }

  if (filters.container) {
    css += `
.${effect.cssClass} {
  ${filters.container};
}
`
  }

  // 悬停变换
  if (transforms.hover) {
    css += `
.${effect.cssClass} h1:hover,
.${effect.cssClass} h2:hover,
.${effect.cssClass} h3:hover {
  transform: ${transforms.hover};
}

.${effect.cssClass} blockquote:hover {
  transform: ${transforms.hover};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 215, 0, 0.3);
}
`
  }

  return css
}

// 粒子背景 CSS
function generateParticleCSS(): string {
  return `
/* 粒子背景效果 */
.theme-effect-particles::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
}

.theme-effect-particles::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.05) 2px, transparent 2px);
  background-size: 100px 100px, 150px 150px, 200px 200px;
  animation: particleFloat 20s linear infinite;
}
`
}

// 深空主题 CSS
function generateDeepSpaceCSS(): string {
  return `
/* 深空主题效果 */
.theme-effect-deep-space {
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
  color: #fff;
  position: relative;
}

.theme-effect-deep-space::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  background: radial-gradient(circle at center, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
}

.theme-effect-deep-space h1 {
  background: linear-gradient(45deg, #ffd700, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
`
}

// 数学主题 CSS
function generateMathematicalCSS(): string {
  return `
/* 数学装饰效果 */
.theme-effect-mathematical::before {
  content: '∫ ∑ π ∞ ∂ ∇ α β γ δ';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  font-size: 1.5rem;
  color: rgba(255, 215, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  animation: mathFloat 8s ease-in-out infinite;
}

.theme-effect-mathematical h1,
.theme-effect-mathematical h2 {
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
}
`
}

// 时间线主题 CSS
function generateTimelineCSS(): string {
  return `
/* 时间线效果 */
.theme-effect-timeline {
  position: relative;
}

.theme-effect-timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #ffd700, #ff6b6b, #4ecdc4);
  transform: translateX(-50%);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  z-index: -1;
}

.theme-effect-timeline .timeline-item {
  position: relative;
  margin: 60px 0;
  animation-delay: 0.2s;
}

.theme-effect-timeline .timeline-item:nth-child(even) {
  animation-delay: 0.4s;
}

.theme-effect-timeline .timeline-content {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px;
}
`
}

// 应用特效到主题
export function applyEffectToTheme(_themeName: string, effectName: keyof typeof themeEffects) {
  const effectCSS = generateEffectCSS(effectName)

  // 创建或更新样式标签
  let styleElement = document.getElementById(`theme-effects-style`) as HTMLStyleElement
  if (!styleElement) {
    styleElement = document.createElement(`style`)
    styleElement.id = `theme-effects-style`
    document.head.appendChild(styleElement)
  }

  styleElement.textContent = effectCSS

  // 添加特效类到 body
  document.body.className = document.body.className
    .replace(/theme-effect-\w+/g, ``)
    .trim()
  document.body.classList.add(themeEffects[effectName].cssClass)
}

// 移除所有特效
export function removeAllEffects() {
  const styleElement = document.getElementById(`theme-effects-style`)
  if (styleElement) {
    styleElement.remove()
  }

  // 移除特效类
  document.body.className = document.body.className
    .replace(/theme-effect-\w+/g, ``)
    .trim()
}

// JavaScript 动态特效处理函数
export class ThemeEffectManager {
  private particleContainer: HTMLElement | null = null
  private mathDecorations: HTMLElement[] = []
  private scrollAnimationElements: HTMLElement[] = []
  private isInitialized = false
  private performanceConfig: any
  private performanceMonitor: any

  constructor() {
    this.init = this.init.bind(this)
    this.createParticles = this.createParticles.bind(this)
    this.handleScrollAnimation = this.handleScrollAnimation.bind(this)
    this.handleMouseParallax = this.handleMouseParallax.bind(this)
    
    // 导入性能配置（动态导入以避免循环依赖）
    this.loadPerformanceConfig()
  }

  private async loadPerformanceConfig() {
    try {
      const performanceModule = await import('./theme-effects-performance')
      this.performanceConfig = performanceModule.detectDevicePerformance()
      this.performanceMonitor = new performanceModule.PerformanceMonitor()
    } catch (error) {
      // 使用默认配置
      this.performanceConfig = {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isLowPerformance: false,
        effectLevel: 'high',
        animationDuration: 1.0,
        particleCount: 50,
        enableParallax: true,
        enableParticles: true
      }
    }
  }

  // 初始化特效管理器
  init(effectName: keyof typeof themeEffects) {
    this.cleanup()
    
    if (effectName === 'none') return

    this.isInitialized = true
    
    // 根据特效类型初始化对应的动态效果
    switch (effectName) {
      case 'particles':
        this.initParticleEffect()
        break
      case 'deep-space':
        this.initDeepSpaceEffect()
        break
      case 'mathematical':
        this.initMathematicalEffect()
        break
      case 'timeline':
        this.initTimelineEffect()
        break
    }

    // 初始化通用滚动动画
    this.initScrollAnimations()
  }

  // 粒子效果初始化
  private initParticleEffect() {
    this.createParticleContainer()
    this.createParticles()
  }

  // 深空效果初始化
  private initDeepSpaceEffect() {
    this.createParticleContainer()
    this.createStarField()
  }

  // 数学主题效果初始化
  private initMathematicalEffect() {
    this.createMathDecorations()
    this.initMouseParallax()
  }

  // 时间线效果初始化
  private initTimelineEffect() {
    this.initTimelineAnimations()
  }

  // 创建粒子容器
  private createParticleContainer() {
    if (this.particleContainer) return

    this.particleContainer = document.createElement('div')
    this.particleContainer.className = 'theme-particles-container'
    this.particleContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    `
    document.body.appendChild(this.particleContainer)
  }

  // 创建粒子
  private createParticles() {
    if (!this.particleContainer) return

    // 根据性能配置调整粒子数量
    const particleCount = this.performanceConfig?.particleCount || 50
    this.particleContainer.innerHTML = ''

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'theme-particle'
      
      const size = Math.random() * 4 + 1
      const duration = this.performanceConfig?.animationDuration || 1
      
      particle.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${(Math.random() * 4 + 4) * duration}s ease-in-out infinite;
        animation-delay: ${Math.random() * 6}s;
      `
      
      this.particleContainer.appendChild(particle)
    }

    // 启动性能监控
    if (this.performanceMonitor && this.performanceConfig?.effectLevel === 'high') {
      this.performanceMonitor.start()
    }
  }

  // 创建星空效果
  private createStarField() {
    if (!this.particleContainer) return

    const starCount = 100
    this.particleContainer.innerHTML = ''

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div')
      star.className = 'theme-star'
      
      const size = Math.random() * 2 + 0.5
      const brightness = Math.random() * 0.8 + 0.2
      
      star.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, ${brightness});
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: glow ${Math.random() * 3 + 2}s ease-in-out infinite alternate;
        animation-delay: ${Math.random() * 5}s;
        box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, ${brightness});
      `
      
      this.particleContainer.appendChild(star)
    }
  }

  // 创建数学装饰
  private createMathDecorations() {
    const symbols = ['∫', '∑', 'π', '∞', '∂', '∇', 'α', 'β', 'γ', 'δ', 'θ', 'λ', 'μ', 'σ', 'φ', 'ψ', 'ω']
    const positions = [
      { top: '10%', left: '5%' },
      { top: '20%', right: '8%' },
      { top: '30%', left: '2%' },
      { top: '50%', right: '5%' },
      { top: '70%', left: '3%' },
      { top: '80%', right: '7%' },
      { top: '60%', left: '8%' },
      { top: '40%', right: '3%' },
    ]

    this.mathDecorations = []

    positions.forEach((pos, index) => {
      const decoration = document.createElement('div')
      decoration.className = 'theme-math-decoration'
      decoration.textContent = symbols[index % symbols.length]
      
      decoration.style.cssText = `
        position: fixed;
        color: rgba(255, 215, 0, 0.1);
        font-size: 1.5rem;
        pointer-events: none;
        z-index: -1;
        animation: mathFloat 8s ease-in-out infinite;
        animation-delay: ${index * 0.5}s;
        ${pos.top ? `top: ${pos.top};` : ''}
        ${pos.left ? `left: ${pos.left};` : ''}
        ${pos.right ? `right: ${pos.right};` : ''}
      `
      
      document.body.appendChild(decoration)
      this.mathDecorations.push(decoration)
    })
  }

  // 初始化鼠标视差效果
  private initMouseParallax() {
    // 只在支持视差效果且非移动设备时启用
    if (this.performanceConfig?.enableParallax && !this.performanceConfig?.isMobile) {
      document.addEventListener('mousemove', this.handleMouseParallax)
    }
  }

  // 处理鼠标视差
  private handleMouseParallax(e: MouseEvent) {
    if (this.mathDecorations.length === 0) return

    const mouseX = e.clientX / window.innerWidth
    const mouseY = e.clientY / window.innerHeight
    
    this.mathDecorations.forEach((decoration, index) => {
      const speed = (index + 1) * 0.5
      const x = (mouseX - 0.5) * speed
      const y = (mouseY - 0.5) * speed
      decoration.style.transform = `translate(${x}px, ${y}px)`
    })
  }

  // 初始化滚动动画
  private initScrollAnimations() {
    this.scrollAnimationElements = Array.from(
      document.querySelectorAll('h1, h2, h3, p, blockquote, pre, img')
    ) as HTMLElement[]

    // 添加滚动监听
    window.addEventListener('scroll', this.handleScrollAnimation)
    
    // 初始检查
    this.handleScrollAnimation()
  }

  // 处理滚动动画
  private handleScrollAnimation() {
    this.scrollAnimationElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('fade-in-visible')
      }
    })
  }

  // 初始化时间线动画
  private initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item, h2, h3') as NodeListOf<HTMLElement>
    
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.animationDelay = (index * 0.2) + 's'
        item.classList.add('timeline-animated')
      }, index * 100)
    })
  }

  // 清理所有特效
  cleanup() {
    this.isInitialized = false

    // 移除粒子容器
    if (this.particleContainer) {
      this.particleContainer.remove()
      this.particleContainer = null
    }

    // 移除数学装饰
    this.mathDecorations.forEach(decoration => decoration.remove())
    this.mathDecorations = []

    // 移除事件监听器
    window.removeEventListener('scroll', this.handleScrollAnimation)
    document.removeEventListener('mousemove', this.handleMouseParallax)

    // 清理CSS类
    document.querySelectorAll('.fade-in-visible, .timeline-animated').forEach(el => {
      el.classList.remove('fade-in-visible', 'timeline-animated')
    })
  }

  // 重新初始化
  reinit(effectName: keyof typeof themeEffects) {
    this.cleanup()
    setTimeout(() => this.init(effectName), 100)
  }

  // 检查是否已初始化
  isReady(): boolean {
    return this.isInitialized
  }
}

// 全局特效管理器实例
export const themeEffectManager = new ThemeEffectManager()
