import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * InteractiveCard3D provides smooth GPU-accelerated 3D perspective tilt,
 * spring return physics, subtle elevation, movable drag-feel, dynamic sheen,
 * and automatic fallback on mobile touch devices.
 */
export function InteractiveCard3D({
  children,
  className = '',
  maxTilt = 10,
  scale = 1.02,
  elevation = -6,
  enableDragFeel = true,
  glare = true,
  onClick,
  ...props
}) {
  const cardRef = useRef(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(max-width: 768px)').matches
      )
    }
    checkTouch()
    window.addEventListener('resize', checkTouch, { passive: true })
    return () => window.removeEventListener('resize', checkTouch)
  }, [])

  // Raw cursor position values normalized (-0.5 to 0.5)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics config for smooth natural movement
  const springConfig = { damping: 20, stiffness: 260, mass: 0.6 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  // Rotations derived from mouse position
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [maxTilt, -maxTilt])
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-maxTilt, maxTilt])
  
  // Subtle translation / drag feel
  const moveX = useTransform(smoothMouseX, [-0.5, 0.5], enableDragFeel ? [-8, 8] : [0, 0])
  const moveY = useTransform(smoothMouseY, [-0.5, 0.5], enableDragFeel ? [-8, 8] : [0, 0])

  // Dynamic glare coordinates
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], ['0%', '100%'])

  const handlePointerMove = (e) => {
    if (isTouchDevice || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handlePointerEnter = () => {
    if (!isTouchDevice) setIsHovered(true)
  }

  const handlePointerLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  if (isTouchDevice) {
    return (
      <motion.div
        className={`interactive-card-3d touch-mode ${className}`}
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className={`interactive-card-3d ${isHovered ? 'is-card-hovered' : ''} ${className}`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      style={{
        perspective: 1100,
        transformStyle: 'preserve-3d',
        rotateX: rotateX,
        rotateY: rotateY,
        x: moveX,
        y: moveY,
      }}
      animate={{
        y: isHovered ? elevation : 0,
        scale: isHovered ? scale : 1,
      }}
      transition={{
        y: { duration: 0.25, ease: 'easeOut' },
        scale: { duration: 0.25, ease: 'easeOut' },
      }}
      {...props}
    >
      <div className="interactive-card-inner" style={{ transformStyle: 'preserve-3d' }}>
        {children}
        {glare && (
          <motion.div
            className="interactive-card-glare"
            style={{
              opacity: isHovered ? 0.65 : 0,
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(12, 105, 232, 0.18) 0%, rgba(255, 255, 255, 0.12) 30%, transparent 70%)`,
              transition: 'opacity 0.3s ease',
            }}
          />
        )}
      </div>
    </motion.div>
  )
}

/**
 * AnimatedCounter component performs a smooth numeric count-up animation
 * when scrolled into the viewport.
 */
export function AnimatedCounter({ value, duration = 1.8 }) {
  const [displayValue, setDisplayValue] = useState(value)
  const countRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = countRef.current
    if (!el) return

    // Extract prefix, target number, and suffix (e.g., "5+" -> { num: 5, suffix: "+" }, "95%" -> { num: 95, suffix: "%" })
    const match = String(value).match(/^([^\d]*)(\d+)([^\d]*)$/)
    if (!match) {
      setDisplayValue(value)
      return
    }

    const prefix = match[1] || ''
    const target = parseInt(match[2], 10)
    const suffix = match[3] || ''

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let startTimestamp = null
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
            // Ease out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3)
            const current = Math.floor(easeOutProgress * target)
            setDisplayValue(`${prefix}${current}${suffix}`)
            if (progress < 1) {
              window.requestAnimationFrame(step)
            } else {
              setDisplayValue(value)
            }
          }
          window.requestAnimationFrame(step)
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  return <strong ref={countRef} className="animated-counter-value">{displayValue}</strong>
}

/**
 * ScrollProgressBar component - sleek top scroll indicator
 */
export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const currentScroll = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight > 0) {
        setScrollProgress((currentScroll / scrollHeight) * 100)
      }
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div
      className="scroll-progress-container"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3.5px',
        zIndex: 99999,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    >
      <div
        className="scroll-progress-fill"
        style={{
          height: '100%',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #0c69e8 0%, #2f8af5 50%, #f97316 100%)',
          boxShadow: '0 0 10px rgba(12, 105, 232, 0.7), 0 0 5px rgba(249, 115, 22, 0.5)',
          transition: 'width 0.08s ease-out',
        }}
      />
    </div>
  )
}
