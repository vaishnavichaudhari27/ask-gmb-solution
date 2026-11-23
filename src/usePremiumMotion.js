import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HERO_COPY_SELECTOR = [
  '.reference-home-hero-copy',
  '.reference-services-hero-copy',
  '.reference-industries-hero-copy',
  '.reference-process-page-copy',
  '.reference-about-page-copy',
  '.reference-contact-hero-copy',
  '.page-hero-copy',
  '.article-hero-inner',
  '.policy-hero-inner',
  '.not-found-page .page-container',
].join(', ')

const SECTION_REVEAL_SELECTOR = [
  '.reference-section-heading',
  '.reference-process-copy',
  '.reference-home-industries-copy',
  '.reference-home-contact-copy',
  '.reference-about-story-copy',
  '.service-detail-copy',
  '.faq-home-intro',
  '.article-content-main > .article-section-block',
  '.policy-content-card',
  '.reference-form-card',
  '.reference-contact-map',
  '.article-cta-box',
  '.article-sidebar',
  '.final-cta-section .page-container > *',
].join(', ')

const CARD_REVEAL_SELECTOR = [
  '.reference-stat',
  '.reference-category-card',
  '.reference-mini-stat',
  '.reference-service-card',
  '.reference-industry-focus-card',
  '.reference-why-card',
  '.reference-process-item',
  '.reference-process-flow-card',
  '.reference-about-pillars > article',
  '.reference-about-stat',
  '.reference-contact-method',
  '.reference-contact-quick-links > a',
  '.reference-services-promise > div',
  '.reference-industries-promise > div',
  '.faq-accordion-group > .faq-item',
  '.articles-grid > .article-card',
  '.why-choose-grid > *',
  '.process-grid > *',
].join(', ')

const IMAGE_REVEAL_SELECTOR = [
  '.reference-home-about-visual img',
  '.reference-home-industries-intro > img',
  '.reference-services-hero-visual img',
  '.reference-industries-hero-grid > img',
  '.reference-process-page-hero-grid > img',
  '.reference-contact-hero-grid > img',
  '.reference-about-page-hero-inner > img',
  '.reference-about-team-image',
].join(', ')

const COUNTER_SELECTOR = [
  '.reference-stat-copy strong',
  '.reference-mini-stat strong',
  '.reference-about-stat strong',
].join(', ')

const MAGNETIC_SELECTOR = [
  '.reference-home-hero-actions .reference-button',
  '.reference-section-action .reference-button',
  '.final-cta-section a.button',
  '.page-hero-actions .button',
  '.nav-cta-wrapper button',
  '.reference-form-submit',
  '.not-found-actions .button',
].join(', ')

const FLOAT_SELECTOR = '.reference-hero-laptop, .reference-process-plant'

function splitHeadingCharacters(heading) {
  const previousLabel = heading.getAttribute('aria-label')
  const accessibleText = heading.innerText.replace(/\s+/g, ' ').trim()
  const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT)
  const textNodes = []
  const characters = []
  const replacements = []

  while (walker.nextNode()) textNodes.push(walker.currentNode)

  textNodes.forEach((textNode) => {
    const tokens = textNode.textContent.match(/\s+|[^\s]+/gu)
    if (!tokens || !tokens.some((token) => /\S/.test(token))) return

    const fragment = document.createDocumentFragment()
    tokens.forEach((token) => {
      if (/^\s+$/.test(token)) {
        fragment.append(document.createTextNode(token))
        return
      }

      const word = document.createElement('span')
      word.className = 'cinematic-heading-word'
      word.setAttribute('aria-hidden', 'true')

      Array.from(token).forEach((character) => {
        const span = document.createElement('span')
        span.className = 'cinematic-heading-char'
        span.textContent = character
        characters.push(span)
        word.append(span)
      })

      fragment.append(word)
    })

    const insertedNodes = Array.from(fragment.childNodes)
    const parent = textNode.parentNode
    parent.replaceChild(fragment, textNode)
    replacements.push({ parent, textNode, insertedNodes })
  })

  heading.setAttribute('aria-label', accessibleText)

  return {
    characters,
    restore() {
      replacements.reverse().forEach(({ parent, textNode, insertedNodes }) => {
        const firstInsertedNode = insertedNodes[0]
        if (!firstInsertedNode?.parentNode) return
        parent.insertBefore(textNode, firstInsertedNode)
        insertedNodes.forEach((node) => node.remove())
      })

      if (previousLabel === null) heading.removeAttribute('aria-label')
      else heading.setAttribute('aria-label', previousLabel)
    },
  }
}

function animateCounter(element, duration) {
  const original = element.textContent.trim()
  const match = original.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return

  const [, prefix, digits, suffix] = match
  const target = Number(digits)
  const decimals = digits.includes('.') ? digits.split('.')[1].length : 0
  const count = { value: 0 }
  let started = false
  const startCount = () => {
    if (started) return
    started = true
    gsap.to(count, {
      value: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        const current = decimals
          ? count.value.toFixed(decimals)
          : String(Math.round(count.value))
        element.textContent = `${prefix}${current}${suffix}`
      },
      onComplete: () => {
        element.textContent = original
      },
    })
  }

  const trigger = ScrollTrigger.create({
    trigger: element,
    start: 'top 88%',
    once: true,
    onEnter: startCount,
    onRefresh: (self) => {
      if (self.progress > 0) startCount()
    },
  })

  if (trigger.progress > 0) startCount()
}

export function usePremiumMotion(routeKey) {
  useEffect(() => {
    const root = document.querySelector('.design-refresh')
    if (!root) return undefined

    const media = gsap.matchMedia()
    let refreshFrame = 0

    media.add({
      reducedMotion: '(prefers-reduced-motion: reduce)',
      desktop: '(min-width: 1440px)',
      laptop: '(min-width: 1024px) and (max-width: 1439px)',
      tablet: '(min-width: 768px) and (max-width: 1023px)',
      mobile: '(max-width: 767px)',
      finePointer: '(hover: hover) and (pointer: fine)',
    }, ({ conditions }) => {
      if (conditions.reducedMotion) return undefined

      const { desktop, laptop, tablet, mobile, finePointer } = conditions
      const desktopTier = Boolean(desktop)
      const laptopTier = Boolean(laptop)
      const mobileTier = Boolean(mobile)
      const pointerMotion = (desktopTier || laptopTier) && Boolean(finePointer)
      const revealDuration = desktopTier ? 0.9 : laptopTier ? 0.75 : tablet ? 0.62 : 0.48
      const selectAll = (selector) => gsap.utils.toArray(selector, root)
      const cleanups = []

      selectAll(HERO_COPY_SELECTOR).forEach((group) => {
        const items = Array.from(group.children)
        if (!items.length) return
        const heading = group.querySelector('h1')
        const splitHeading = heading ? splitHeadingCharacters(heading) : null
        if (splitHeading) cleanups.push(splitHeading.restore)

        gsap.fromTo(items, {
          autoAlpha: 0,
          y: mobileTier ? 18 : desktopTier ? 34 : 26,
          ...(desktopTier ? {
            rotationX: -8,
            transformPerspective: 1000,
            transformOrigin: 'left center',
          } : {}),
        }, {
          autoAlpha: 1,
          y: 0,
          ...(desktopTier ? { rotationX: 0 } : {}),
          duration: revealDuration,
          stagger: desktopTier ? 0.11 : mobileTier ? 0.055 : 0.08,
          delay: 0.08,
          ease: 'power3.out',
          clearProps: 'opacity,visibility,transform',
        })

        if (splitHeading?.characters.length) {
          gsap.fromTo(splitHeading.characters, {
            autoAlpha: 0,
            yPercent: desktopTier ? 105 : mobileTier ? 62 : 82,
            ...(desktopTier ? {
              rotationX: -78,
              z: -45,
              transformPerspective: 1050,
              transformOrigin: '50% 100%',
            } : {}),
          }, {
            autoAlpha: 1,
            yPercent: 0,
            ...(desktopTier ? { rotationX: 0, z: 0 } : {}),
            duration: desktopTier ? 0.72 : mobileTier ? 0.48 : 0.62,
            delay: 0.12,
            stagger: desktopTier ? 0.022 : mobileTier ? 0.012 : 0.017,
            ease: 'power4.out',
            clearProps: 'opacity,visibility,transform',
          })
        }
      })

      const homeHeroVisual = root.querySelector('.reference-home-hero .reference-hero-visual')
      if (homeHeroVisual) {
        gsap.fromTo(homeHeroVisual, mobileTier ? {
          autoAlpha: 0,
          y: 18,
          scale: 0.98,
        } : {
          autoAlpha: 0.7,
          clipPath: 'inset(9% 12% 9% 12%)',
          scale: desktopTier ? 0.9 : 0.95,
          rotationY: desktopTier ? 14 : 7,
          rotationX: -4,
          transformPerspective: 1200,
        }, mobileTier ? {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.72,
          ease: 'power3.out',
          clearProps: 'opacity,visibility,transform',
        } : {
          autoAlpha: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          duration: desktopTier ? 1.35 : 1.05,
          delay: 0.16,
          ease: 'power4.out',
          clearProps: 'opacity,visibility,clipPath',
        })
      }

      const homeHero = root.querySelector('.reference-home-hero')
      const homeHeroCopy = root.querySelector('.reference-home-hero-copy')
      if (!mobileTier && homeHero && homeHeroCopy) {
        gsap.to(homeHeroCopy, {
          yPercent: -14,
          autoAlpha: 0.32,
          ease: 'none',
          scrollTrigger: {
            trigger: homeHero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
          },
        })
      }

      selectAll(IMAGE_REVEAL_SELECTOR).forEach((image) => {
        const fromVars = mobileTier
          ? { autoAlpha: 0, y: 14 }
          : {
              autoAlpha: 0.72,
              clipPath: desktopTier
                ? 'inset(0 100% 0 0)'
                : 'inset(0 38% 0 0)',
            }
        const toVars = mobileTier
          ? {
              autoAlpha: 1,
              y: 0,
              duration: revealDuration,
              ease: 'power3.out',
              clearProps: 'opacity,visibility,transform',
            }
          : {
              autoAlpha: 1,
              clipPath: 'inset(0 0 0 0)',
              duration: desktopTier ? 1.15 : 0.9,
              ease: 'power3.inOut',
              clearProps: 'opacity,visibility,clipPath',
            }

        gsap.fromTo(image, fromVars, {
          ...toVars,
          scrollTrigger: {
            trigger: image,
            start: 'top 86%',
            once: true,
          },
        })
      })

      selectAll(SECTION_REVEAL_SELECTOR).forEach((element) => {
        gsap.fromTo(element, {
          autoAlpha: 0,
          y: mobileTier ? 16 : desktopTier ? 34 : 25,
          ...(desktopTier ? { rotationX: 4, transformPerspective: 1000 } : {}),
        }, {
          autoAlpha: 1,
          y: 0,
          ...(desktopTier ? { rotationX: 0 } : {}),
          duration: revealDuration,
          ease: 'power3.out',
          clearProps: 'opacity,visibility,transform',
          scrollTrigger: {
            trigger: element,
            start: 'top 89%',
            once: true,
          },
        })
      })

      selectAll(CARD_REVEAL_SELECTOR).forEach((card) => {
        const siblingIndex = Array.from(card.parentElement.children).indexOf(card)
        gsap.fromTo(card, {
          autoAlpha: 0,
          y: mobileTier ? 14 : desktopTier ? 38 : 28,
          ...(desktopTier ? { rotationX: 7, transformPerspective: 1100 } : {}),
        }, {
          autoAlpha: 1,
          y: 0,
          ...(desktopTier ? { rotationX: 0 } : {}),
          duration: revealDuration,
          delay: Math.min(siblingIndex, 4) * (mobileTier ? 0.035 : 0.065),
          ease: 'power3.out',
          clearProps: 'opacity,visibility,transform',
          scrollTrigger: {
            trigger: card,
            start: 'top 91%',
            once: true,
          },
        })
      })

      selectAll(COUNTER_SELECTOR).forEach((counter) => {
        animateCounter(counter, mobileTier ? 1 : desktopTier ? 1.7 : 1.35)
      })

      selectAll('.reference-stat-icon, .reference-mini-stat > svg, .reference-about-stat > svg').forEach((icon) => {
        gsap.fromTo(icon, {
          autoAlpha: 0,
          scale: mobileTier ? 0.82 : 0.62,
          rotationY: desktopTier ? -80 : 0,
        }, {
          autoAlpha: 1,
          scale: 1,
          rotationY: 0,
          duration: mobileTier ? 0.48 : 0.72,
          ease: 'back.out(1.6)',
          clearProps: 'opacity,visibility,transform',
          scrollTrigger: {
            trigger: icon.parentElement,
            start: 'top 89%',
            once: true,
          },
        })
      })

      const footer = root.querySelector('.site-footer')
      if (footer) {
        selectAll('.footer-top-grid > *, .footer-bottom-inner > *').forEach((column, index) => {
          gsap.fromTo(column, {
            autoAlpha: 0,
            y: mobileTier ? 12 : 24,
          }, {
            autoAlpha: 1,
            y: 0,
            duration: revealDuration,
            delay: Math.min(index, 4) * 0.075,
            ease: 'power3.out',
            clearProps: 'opacity,visibility,transform',
            scrollTrigger: {
              trigger: footer,
              start: 'top 88%',
              once: true,
            },
          })
        })
      }

      const processPath = root.querySelector('.reference-process-flow-path path')
      if (!mobileTier && processPath && getComputedStyle(processPath.closest('svg')).display !== 'none') {
        gsap.fromTo(processPath, {
          strokeDashoffset: 72,
        }, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: processPath.closest('.reference-process-flow'),
            start: 'top 84%',
            end: 'bottom 38%',
            scrub: 0.7,
          },
        })
      }

      if (desktopTier || laptopTier || tablet) {
        selectAll(IMAGE_REVEAL_SELECTOR).forEach((image) => {
          const section = image.closest('section') || image
          gsap.to(image, {
            yPercent: desktopTier ? 7 : laptopTier ? 4 : 2,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          })
        })
      }

      if (!mobileTier) {
        selectAll(FLOAT_SELECTOR).forEach((illustration) => {
          gsap.to(illustration, {
            y: desktopTier ? -8 : -4,
            duration: desktopTier ? 4.8 : 6,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            scrollTrigger: {
              trigger: illustration,
              start: 'top bottom',
              end: 'bottom top',
              toggleActions: 'play pause resume pause',
            },
          })
        })
      }

      if (pointerMotion) {
        const tiltStrength = desktopTier ? 8 : 4.5
        selectAll('.reference-service-card, .reference-process-item, .reference-about-pillars > article, .reference-contact-method').forEach((card) => {
          gsap.set(card, {
            transformPerspective: desktopTier ? 1100 : 900,
            transformOrigin: 'center center',
          })
          const tiltX = gsap.quickTo(card, 'rotationX', { duration: 0.42, ease: 'power3.out' })
          const tiltY = gsap.quickTo(card, 'rotationY', { duration: 0.42, ease: 'power3.out' })
          const handleMove = (event) => {
            if (event.pointerType === 'touch') return
            const bounds = card.getBoundingClientRect()
            if (!bounds.width || !bounds.height) return
            const x = (event.clientX - bounds.left) / bounds.width - 0.5
            const y = (event.clientY - bounds.top) / bounds.height - 0.5
            tiltX(-y * tiltStrength)
            tiltY(x * tiltStrength)
          }
          const resetTilt = () => {
            tiltX(0)
            tiltY(0)
          }

          card.addEventListener('pointermove', handleMove, { passive: true })
          card.addEventListener('pointerleave', resetTilt, { passive: true })
          cleanups.push(() => {
            card.removeEventListener('pointermove', handleMove)
            card.removeEventListener('pointerleave', resetTilt)
          })
        })

        const homeHero = root.querySelector('.reference-home-hero')
        const heroVisual = root.querySelector('.reference-home-hero .reference-hero-visual')
        if (homeHero && heroVisual) {
          const xTo = gsap.quickTo(heroVisual, 'x', { duration: 0.72, ease: 'power3.out' })
          const yTo = gsap.quickTo(heroVisual, 'y', { duration: 0.72, ease: 'power3.out' })
          const rotateXTo = gsap.quickTo(heroVisual, 'rotationX', { duration: 0.72, ease: 'power3.out' })
          const rotateYTo = gsap.quickTo(heroVisual, 'rotationY', { duration: 0.72, ease: 'power3.out' })
          const handleHeroMove = (event) => {
            if (event.pointerType === 'touch') return
            const bounds = homeHero.getBoundingClientRect()
            const x = (event.clientX - bounds.left) / bounds.width - 0.5
            const y = (event.clientY - bounds.top) / bounds.height - 0.5
            const strength = desktopTier ? 1 : 0.55
            xTo(x * 12 * strength)
            yTo(y * 8 * strength)
            rotateXTo(-y * 3 * strength)
            rotateYTo(x * 4 * strength)
          }
          const resetHero = () => {
            xTo(0)
            yTo(0)
            rotateXTo(0)
            rotateYTo(0)
          }

          homeHero.addEventListener('pointermove', handleHeroMove, { passive: true })
          homeHero.addEventListener('pointerleave', resetHero, { passive: true })
          cleanups.push(() => {
            homeHero.removeEventListener('pointermove', handleHeroMove)
            homeHero.removeEventListener('pointerleave', resetHero)
          })
        }

        selectAll(MAGNETIC_SELECTOR).forEach((button) => {
          button.classList.add('cinematic-magnetic')
          button.style.setProperty('--cinematic-magnetic-x', '0px')
          button.style.setProperty('--cinematic-magnetic-y', '0px')
          const xTo = gsap.quickTo(button, '--cinematic-magnetic-x', { duration: 0.38, ease: 'power3.out' })
          const yTo = gsap.quickTo(button, '--cinematic-magnetic-y', { duration: 0.38, ease: 'power3.out' })
          const strength = desktopTier ? 0.12 : 0.08
          const handleMove = (event) => {
            if (event.pointerType === 'touch') return
            const bounds = button.getBoundingClientRect()
            xTo(`${(event.clientX - bounds.left - bounds.width / 2) * strength}px`)
            yTo(`${(event.clientY - bounds.top - bounds.height / 2) * strength}px`)
          }
          const resetButton = () => {
            xTo('0px')
            yTo('0px')
          }

          button.addEventListener('pointermove', handleMove, { passive: true })
          button.addEventListener('pointerleave', resetButton, { passive: true })
          cleanups.push(() => {
            button.removeEventListener('pointermove', handleMove)
            button.removeEventListener('pointerleave', resetButton)
            button.classList.remove('cinematic-magnetic')
            button.style.removeProperty('--cinematic-magnetic-x')
            button.style.removeProperty('--cinematic-magnetic-y')
          })
        })
      }

      const footerIcons = selectAll('.footer-social-box .social-links a svg')
      if (pointerMotion) {
        footerIcons.forEach((icon) => {
          const link = icon.closest('a')
          const enter = () => gsap.to(icon, {
            scale: 1.14,
            rotation: 8,
            duration: 0.28,
            ease: 'power2.out',
          })
          const leave = () => gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.34,
            ease: 'power2.out',
          })
          link.addEventListener('pointerenter', enter)
          link.addEventListener('pointerleave', leave)
          cleanups.push(() => {
            link.removeEventListener('pointerenter', enter)
            link.removeEventListener('pointerleave', leave)
          })
        })
      }

      refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh())

      return () => {
        cleanups.forEach((cleanup) => cleanup())
      }
    })

    return () => {
      window.cancelAnimationFrame(refreshFrame)
      media.revert()
    }
  }, [routeKey])
}
