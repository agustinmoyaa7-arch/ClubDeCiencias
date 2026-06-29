'use client'

import { useEffect, useRef, useCallback } from 'react'

// --- Constants ---
const W = 680
const H = 500
const COLS = 9
const ROWS = 5
const B_W = 62
const B_H = 26
const B_GAP = 4
const BASE_PAD_W = 96
const PAD_H = 14
const BALL_R = 8
const BASE_SPEED = 5
const PAD_Y = H - 58
const PARTICLE_LIFE = 50

const EMOJIS = ['🍎','⚗️','🔭','📚','🧲','🌍','🔬','💡','🧪','⚡','🌿','🏆']
const COLORS = ['#ef4444','#22c55e','#eab308','#3b82f6','#a855f7','#f97316','#14b8a6','#ec4899','#6366f1','#84cc16']
const STARS: [number, number][] = [
  [50,80],[120,30],[200,60],[340,20],[450,90],[550,40],[600,70],
  [80,200],[650,150],[300,300],[160,400],[500,380],[30,350],[620,310],[400,460],
]

type Difficulty = 'easy' | 'normal' | 'hard'
type Phase = 'select' | 'idle' | 'playing' | 'gameover' | 'win'

const DIFF_DEFS: Record<Difficulty, { label: string; emoji: string; speed: number; color: string }> = {
  easy:   { label: 'Fácil',  emoji: '🐢', speed: BASE_SPEED * 0.65, color: '#22c55e' },
  normal: { label: 'Normal', emoji: '🍎', speed: BASE_SPEED * 1.0,  color: '#3b82f6' },
  hard:   { label: 'Difícil',emoji: '🔥', speed: BASE_SPEED * 1.6,  color: '#ef4444' },
}
const DIFF_KEYS: Difficulty[] = ['easy', 'normal', 'hard']
type PowerUpType = 'multi2x' | 'multi3x' | 'wide' | 'slow' | 'life' | 'fireball'

const POWERUP_DEFS: Record<PowerUpType, { label: string; color: string; duration: number }> = {
  multi2x:  { label: '×2',  color: '#eab308', duration: 300 },
  multi3x:  { label: '×3',  color: '#f97316', duration: 200 },
  wide:     { label: '↔',   color: '#3b82f6', duration: 400 },
  slow:     { label: '🐢',  color: '#22c55e', duration: 300 },
  life:     { label: '❤️',  color: '#ef4444', duration: 0   },
  fireball: { label: '🔥',  color: '#f97316', duration: 250 },
}
const ALL_TYPES = Object.keys(POWERUP_DEFS) as PowerUpType[]

type Brick     = { x: number; y: number; alive: boolean; emoji: string; color: string }
type Particle  = { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number; emoji: string | null }
type PowerUpItem = { x: number; y: number; vy: number; type: PowerUpType; alive: boolean }

function makeBricks(): Brick[] {
  const totalW = COLS * B_W + (COLS - 1) * B_GAP
  const startX = (W - totalW) / 2
  return Array.from({ length: ROWS * COLS }, (_, i) => {
    const r = Math.floor(i / COLS)
    const c = i % COLS
    return {
      x: startX + c * (B_W + B_GAP),
      y: 40 + r * (B_H + B_GAP),
      alive: true,
      emoji: EMOJIS[i % EMOJIS.length],
      color: COLORS[r % COLORS.length],
    }
  })
}

function burstParticles(bx: number, by: number, color: string, emoji: string): Particle[] {
  const cx = bx + B_W / 2
  const cy = by + B_H / 2
  const out: Particle[] = []
  // 10 directional debris dots
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.6
    const spd = 1.5 + Math.random() * 3.5
    out.push({ x: cx, y: cy, vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd - 1,
               life: 1, color, size: 2 + Math.random() * 3.5, emoji: null })
  }
  // 3 sparks (faster, smaller)
  for (let i = 0; i < 3; i++) {
    const angle = Math.random() * Math.PI * 2
    out.push({ x: cx, y: cy, vx: Math.cos(angle) * 5, vy: Math.sin(angle) * 5 - 1,
               life: 1, color: '#fff', size: 1.5, emoji: null })
  }
  // floating emoji ghost
  out.push({ x: cx, y: cy,
             vx: (Math.random() - 0.5) * 2, vy: -2.5 - Math.random(),
             life: 1, color, size: 18, emoji })
  return out
}

export function ArkaNeitonGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const gameRef = useRef({
    padX:      W / 2 - BASE_PAD_W / 2,
    ballX:     W / 2,
    ballY:     PAD_Y - BALL_R - 2,
    ballDX:    BASE_SPEED * 0.8,
    ballDY:    -BASE_SPEED,
    score:     0,
    lives:     3,
    bricks:    makeBricks(),
    phase:     'select' as Phase,
    difficulty: 'normal' as Difficulty,
    diffSpeed:  BASE_SPEED,
    raf:       0,
    particles: [] as Particle[],
    powerUps:  [] as PowerUpItem[],
    effects:   {} as Partial<Record<PowerUpType, number>>,
  })

  const reset = useCallback((backToSelect = false) => {
    const g = gameRef.current
    const spd = g.diffSpeed
    Object.assign(g, {
      padX: W / 2 - BASE_PAD_W / 2,
      ballX: W / 2, ballY: PAD_Y - BALL_R - 2,
      ballDX: spd * 0.8, ballDY: -spd,
      score: 0, lives: 3,
      bricks: makeBricks(), phase: backToSelect ? 'select' : 'idle',
      particles: [], powerUps: [], effects: {},
    })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const g = gameRef.current

    // --- derived helpers (read g.effects / g.score live) ---
    const padW      = () => g.effects.wide ? 144 : BASE_PAD_W
    const scoreMult = () => g.effects.multi3x ? 3 : g.effects.multi2x ? 2 : 1
    const targetSpd = () => {
      const score = Math.min(1 + Math.floor(g.score / 10) * 0.04, 2)
      const slow  = g.effects.slow     ? 0.6  : 1
      const fire  = g.effects.fireball ? 1.25 : 1
      return g.diffSpeed * score * slow * fire
    }
    const normalizeSpd = () => {
      const s = Math.sqrt(g.ballDX ** 2 + g.ballDY ** 2)
      if (s < 0.01) return
      const t = targetSpd()
      g.ballDX = (g.ballDX / s) * t
      g.ballDY = (g.ballDY / s) * t
    }

    // --- input ---
    const scaleX = () => W / canvas.getBoundingClientRect().width
    const clampPad = () => { g.padX = Math.max(0, Math.min(W - padW(), g.padX)) }

    function onMouseMove(e: MouseEvent) {
      const r = canvas.getBoundingClientRect()
      g.padX = (e.clientX - r.left) * scaleX() - padW() / 2
      clampPad()
    }
    function onTouchMove(e: TouchEvent) {
      e.preventDefault()
      const r = canvas.getBoundingClientRect()
      g.padX = (e.touches[0].clientX - r.left) * scaleX() - padW() / 2
      clampPad()
    }
    // button rects for difficulty screen (computed each draw, stored for click detection)
    const diffBtns: { diff: Difficulty; x: number; y: number; w: number; h: number }[] = []

    function onClick(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect()
      const mx = (e.clientX - rect.left) * scaleX()
      const my = (e.clientY - rect.top)  * (H / rect.height)

      if (g.phase === 'select') {
        for (const btn of diffBtns) {
          if (mx >= btn.x && mx <= btn.x + btn.w && my >= btn.y && my <= btn.y + btn.h) {
            g.difficulty = btn.diff
            g.diffSpeed  = DIFF_DEFS[btn.diff].speed
            g.ballDX     = g.diffSpeed * 0.8
            g.ballDY     = -g.diffSpeed
            g.phase      = 'idle'
          }
        }
        return
      }
      if (g.phase === 'idle') g.phase = 'playing'
      else if (g.phase === 'gameover' || g.phase === 'win') { reset(true) }
    }

    // --- draw ---
    function draw() {
      // Background
      const bg = ctx.createLinearGradient(0, 0, 0, H)
      bg.addColorStop(0, '#0f0c29')
      bg.addColorStop(1, '#1a1a3e')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      // Stars
      ctx.fillStyle = 'rgba(255,255,255,0.35)'
      STARS.forEach(([sx, sy]) => {
        ctx.beginPath()
        ctx.arc(sx, sy, 1.5, 0, Math.PI * 2)
        ctx.fill()
      })

      // Bricks
      g.bricks.forEach(b => {
        if (!b.alive) return
        ctx.beginPath()
        ctx.roundRect(b.x, b.y, B_W, B_H, 5)
        ctx.fillStyle = b.color + '28'
        ctx.fill()
        ctx.strokeStyle = b.color
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.font = `${Math.round(B_H * 0.65)}px serif`
        ctx.textAlign = 'center'
        ctx.fillStyle = '#fff'
        ctx.fillText(b.emoji, b.x + B_W / 2, b.y + B_H * 0.73)
      })

      // Particles
      g.particles.forEach(p => {
        ctx.globalAlpha = Math.max(0, p.life)
        if (p.emoji) {
          ctx.font = `${p.size}px serif`
          ctx.textAlign = 'center'
          ctx.fillText(p.emoji, p.x, p.y)
        } else {
          ctx.shadowColor = p.color
          ctx.shadowBlur  = 6
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })
      ctx.globalAlpha = 1

      // Falling power-ups
      g.powerUps.forEach(pu => {
        if (!pu.alive) return
        const def = POWERUP_DEFS[pu.type]
        const pw2 = 38, ph2 = 22
        ctx.shadowColor = def.color
        ctx.shadowBlur  = 10
        ctx.beginPath()
        ctx.roundRect(pu.x - pw2 / 2, pu.y - ph2 / 2, pw2, ph2, 6)
        ctx.fillStyle = def.color + '40'
        ctx.fill()
        ctx.strokeStyle = def.color
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.shadowBlur = 0
        ctx.fillStyle = '#fff'
        ctx.font = 'bold 12px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(def.label, pu.x, pu.y + 4)
      })

      // Paddle
      const pw = padW()
      const padCX = g.padX + pw / 2
      const fire = !!g.effects.fireball
      const barGrad = ctx.createLinearGradient(g.padX, PAD_Y, g.padX + pw, PAD_Y)
      barGrad.addColorStop(0,   fire ? '#c2410c' : '#7c3aed')
      barGrad.addColorStop(0.5, fire ? '#fb923c' : '#a78bfa')
      barGrad.addColorStop(1,   fire ? '#c2410c' : '#7c3aed')
      ctx.shadowColor = fire ? '#fb923c' : '#a78bfa'
      ctx.shadowBlur  = 12
      ctx.beginPath()
      ctx.roundRect(g.padX, PAD_Y, pw, PAD_H, 7)
      ctx.fillStyle = barGrad
      ctx.fill()
      ctx.strokeStyle = fire ? '#fed7aa' : '#c4b5fd'
      ctx.lineWidth   = 1.5
      ctx.stroke()
      ctx.shadowBlur  = 0

      // Newton
      ctx.font = '28px serif'
      ctx.textAlign = 'center'
      ctx.fillText('🧑‍🦳', padCX, PAD_Y + PAD_H + 26)

      // Ball
      if (g.phase !== 'gameover' && g.phase !== 'win') {
        if (fire) {
          ctx.shadowColor = '#fb923c'
          ctx.shadowBlur  = 14
        }
        ctx.font = `${BALL_R * 2.4}px serif`
        ctx.textAlign = 'center'
        ctx.fillText(fire ? '🔥' : '🍎', g.ballX, g.ballY + BALL_R * 0.8)
        ctx.shadowBlur = 0
      }

      // HUD (bottom bar)
      ctx.fillStyle = '#e2e8f0'
      ctx.font = 'bold 13px sans-serif'
      ctx.textAlign = 'left'
      const multTag = scoreMult() > 1 ? ` ×${scoreMult()}` : ''
      ctx.fillText(`Puntaje: ${g.score}${multTag}`, 10, H - 8)
      ctx.textAlign = 'right'
      ctx.font = '14px serif'
      ctx.fillText('🍎'.repeat(Math.max(0, g.lives)), W - 8, H - 8)

      // Active effects bar (top)
      let ex = 10
      for (const [type, frames] of Object.entries(g.effects) as [PowerUpType, number][]) {
        if (!frames) continue
        const def = POWERUP_DEFS[type]
        const ratio = frames / def.duration
        const pw2 = 42, ph2 = 20
        // background pill
        ctx.beginPath()
        ctx.roundRect(ex, 6, pw2, ph2, 5)
        ctx.fillStyle = '#1e1b4b'
        ctx.fill()
        // fill bar
        ctx.beginPath()
        ctx.roundRect(ex, 6, pw2 * ratio, ph2, 5)
        ctx.fillStyle = def.color + '66'
        ctx.fill()
        // border
        ctx.strokeStyle = def.color
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.roundRect(ex, 6, pw2, ph2, 5)
        ctx.stroke()
        // label
        ctx.fillStyle = '#fff'
        ctx.font = 'bold 11px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(def.label, ex + pw2 / 2, 19)
        ex += pw2 + 6
      }

      // Difficulty select screen
      if (g.phase === 'select') {
        ctx.fillStyle = 'rgba(0,0,0,0.72)'
        ctx.fillRect(0, 0, W, H)
        ctx.textAlign = 'center'
        ctx.font = 'bold 38px cursive, sans-serif'
        ctx.fillStyle = '#818cf8'
        ctx.fillText('ARKA-NEWTON', W / 2, H / 2 - 110)
        ctx.font = '15px sans-serif'
        ctx.fillStyle = '#94a3b8'
        ctx.fillText('Seleccioná la dificultad', W / 2, H / 2 - 72)

        // Clear old rects and rebuild
        diffBtns.length = 0
        const btnW = 150, btnH = 72, gap = 20
        const totalBW = DIFF_KEYS.length * btnW + (DIFF_KEYS.length - 1) * gap
        const startBX = (W - totalBW) / 2
        const bY = H / 2 - 40

        DIFF_KEYS.forEach((diff, i) => {
          const def = DIFF_DEFS[diff]
          const bx = startBX + i * (btnW + gap)
          diffBtns.push({ diff, x: bx, y: bY, w: btnW, h: btnH })

          const isSelected = g.difficulty === diff
          ctx.shadowColor = def.color
          ctx.shadowBlur  = isSelected ? 18 : 0
          ctx.beginPath()
          ctx.roundRect(bx, bY, btnW, btnH, 12)
          ctx.fillStyle = isSelected ? def.color + '44' : def.color + '18'
          ctx.fill()
          ctx.strokeStyle = def.color
          ctx.lineWidth   = isSelected ? 2.5 : 1.5
          ctx.stroke()
          ctx.shadowBlur  = 0

          ctx.font = '28px serif'
          ctx.fillText(def.emoji, bx + btnW / 2, bY + 34)
          ctx.font = `bold 14px sans-serif`
          ctx.fillStyle = '#f1f5f9'
          ctx.fillText(def.label, bx + btnW / 2, bY + 57)
        })

        ctx.font = 'bold 14px sans-serif'
        ctx.fillStyle = '#a5b4fc'
        ctx.fillText('→ Clic en una opción para empezar ←', W / 2, H / 2 + 70)
      }

      // Overlays
      if (g.phase === 'idle') {
        ctx.fillStyle = 'rgba(0,0,0,0.55)'
        ctx.fillRect(0, 0, W, H)
        ctx.textAlign = 'center'
        ctx.font = 'bold 40px cursive, sans-serif'
        ctx.fillStyle = '#818cf8'
        ctx.fillText('ARKA-NEWTON', W / 2, H / 2 - 30)
        ctx.font = '16px sans-serif'
        ctx.fillStyle = '#cbd5e1'
        ctx.fillText('Mové el mouse (o el dedo) para controlar a Newton', W / 2, H / 2 + 10)
        ctx.font = 'bold 16px sans-serif'
        ctx.fillStyle = '#a5b4fc'
        ctx.fillText('→ Clic para empezar ←', W / 2, H / 2 + 44)
      }
      if (g.phase === 'gameover') {
        ctx.fillStyle = 'rgba(0,0,0,0.7)'
        ctx.fillRect(0, 0, W, H)
        ctx.textAlign = 'center'
        ctx.font = 'bold 44px cursive, sans-serif'
        ctx.fillStyle = '#f87171'
        ctx.fillText('GAME OVER', W / 2, H / 2 - 25)
        ctx.font = '20px sans-serif'
        ctx.fillStyle = '#e2e8f0'
        ctx.fillText(`Puntaje final: ${g.score}`, W / 2, H / 2 + 18)
        ctx.font = 'bold 15px sans-serif'
        ctx.fillStyle = '#a5b4fc'
        ctx.fillText('→ Clic para elegir dificultad ←', W / 2, H / 2 + 54)
      }
      if (g.phase === 'win') {
        ctx.fillStyle = 'rgba(0,0,0,0.7)'
        ctx.fillRect(0, 0, W, H)
        ctx.textAlign = 'center'
        ctx.font = 'bold 44px cursive, sans-serif'
        ctx.fillStyle = '#4ade80'
        ctx.fillText('¡GANASTE! 🎉', W / 2, H / 2 - 25)
        ctx.font = '20px sans-serif'
        ctx.fillStyle = '#e2e8f0'
        ctx.fillText(`Puntaje: ${g.score}`, W / 2, H / 2 + 18)
        ctx.font = 'bold 15px sans-serif'
        ctx.fillStyle = '#a5b4fc'
        ctx.fillText('→ Clic para elegir dificultad ←', W / 2, H / 2 + 54)
      }
    }

    // --- update ---
    function update() {
      // Tick particles
      g.particles = g.particles.filter(p => p.life > 0)
      g.particles.forEach(p => {
        p.x  += p.vx;  p.y  += p.vy
        p.vy += 0.12   // gravity
        p.vx *= 0.97   // drag
        p.life -= 1 / PARTICLE_LIFE
      })

      // Tick effect timers
      for (const t of ALL_TYPES) {
        if (g.effects[t] !== undefined) {
          g.effects[t]! -= 1
          if (g.effects[t]! <= 0) delete g.effects[t]
        }
      }

      // Tick + catch power-ups
      const pw = padW()
      g.powerUps = g.powerUps.filter(pu => pu.alive && pu.y < H + 30)
      g.powerUps.forEach(pu => {
        if (!pu.alive) return
        pu.y += pu.vy
        if (
          pu.y + 11 >= PAD_Y && pu.y - 11 <= PAD_Y + PAD_H &&
          pu.x >= g.padX && pu.x <= g.padX + pw
        ) {
          pu.alive = false
          if (pu.type === 'life') {
            g.lives = Math.min(g.lives + 1, 5)
          } else {
            g.effects[pu.type] = POWERUP_DEFS[pu.type].duration
          }
          normalizeSpd()
        }
      })

      if (g.phase !== 'playing') return

      normalizeSpd()

      g.ballX += g.ballDX
      g.ballY += g.ballDY

      // Wall collisions
      if (g.ballX - BALL_R <= 0)  { g.ballX = BALL_R;     g.ballDX =  Math.abs(g.ballDX) }
      if (g.ballX + BALL_R >= W)  { g.ballX = W - BALL_R; g.ballDX = -Math.abs(g.ballDX) }
      if (g.ballY - BALL_R <= 0)  { g.ballY = BALL_R;     g.ballDY =  Math.abs(g.ballDY) }

      // Paddle collision
      if (
        g.ballDY > 0 &&
        g.ballY + BALL_R >= PAD_Y && g.ballY + BALL_R <= PAD_Y + PAD_H + 6 &&
        g.ballX >= g.padX - 2     && g.ballX <= g.padX + pw + 2
      ) {
        const rel = (g.ballX - g.padX) / pw - 0.5
        const spd = Math.sqrt(g.ballDX ** 2 + g.ballDY ** 2)
        g.ballDX = Math.sin(rel * 2.2) * spd
        g.ballDY = -Math.abs(Math.cos(rel * 2.2) * spd * 0.95)
        g.ballY  = PAD_Y - BALL_R - 1
      }

      // Ball fell
      if (g.ballY - BALL_R > H) {
        g.lives--
        if (g.lives <= 0) {
          g.phase = 'gameover'
        } else {
          g.ballX  = W / 2
          g.ballY  = PAD_Y - BALL_R - 2
          g.ballDX = BASE_SPEED * (Math.random() > 0.5 ? 0.8 : -0.8)
          g.ballDY = -BASE_SPEED
          g.phase  = 'idle'
        }
        return
      }

      // Brick collision
      const fireb = !!g.effects.fireball
      for (const b of g.bricks) {
        if (!b.alive) continue
        const nearX = Math.max(b.x, Math.min(b.x + B_W, g.ballX))
        const nearY = Math.max(b.y, Math.min(b.y + B_H, g.ballY))
        const dx = g.ballX - nearX
        const dy = g.ballY - nearY
        if (dx * dx + dy * dy > BALL_R * BALL_R) continue

        b.alive = false
        g.score += 10 * scoreMult()

        // Burst particles
        g.particles.push(...burstParticles(b.x, b.y, b.color, b.emoji))

        // Power-up drop (30% chance)
        if (Math.random() < 0.3) {
          const type = ALL_TYPES[Math.floor(Math.random() * ALL_TYPES.length)]
          g.powerUps.push({ x: b.x + B_W / 2, y: b.y + B_H / 2, vy: 2, type, alive: true })
        }

        if (!fireb) {
          const bCX = b.x + B_W / 2
          const bCY = b.y + B_H / 2
          const ox = B_W / 2 - Math.abs(g.ballX - bCX)
          const oy = B_H / 2 - Math.abs(g.ballY - bCY)
          if (ox < oy) g.ballDX = -g.ballDX
          else         g.ballDY = -g.ballDY
          break
        }
        // fireball: keep going through bricks
      }

      if (g.bricks.every(b => !b.alive)) g.phase = 'win'
    }

    function loop() {
      update()
      draw()
      g.raf = requestAnimationFrame(loop)
    }

    g.raf = requestAnimationFrame(loop)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('touchmove', onTouchMove, { passive: false })
    canvas.addEventListener('click', onClick as EventListener)

    return () => {
      cancelAnimationFrame(g.raf)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('click', onClick as EventListener)
    }
  }, [reset])

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      className="w-full max-w-[680px] rounded-3xl border-2 border-foreground/15 shadow-[6px_6px_0_oklch(0.26_0.02_60_/_20%)] cursor-none select-none"
      style={{ touchAction: 'none' }}
    />
  )
}
