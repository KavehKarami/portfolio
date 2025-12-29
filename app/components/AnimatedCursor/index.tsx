'use client'

import { Fragment, useRef, useState, useCallback, useEffect } from 'react'
import useEventListener from '@/app/hooks/useEventListener'
import styles from './index.module.css'

export function AnimatedCursor({ outerScale = 5, innerScale = 0.7 }) {
  const cursorOuterRef = useRef<HTMLDivElement | null>(null)
  const cursorInnerRef = useRef<HTMLDivElement | null>(null)
  const requestRef = useRef(0)
  const previousTimeRef = useRef<number | undefined>(undefined)
  const endX = useRef(0)
  const endY = useRef(0)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(true)
  const [isActive, setIsActive] = useState(false)
  const [isActiveClickable, setIsActiveClickable] = useState(false)

  const onMouseMove = useCallback(({ clientX, clientY }: { clientX: number; clientY: number }) => {
    setCoords({ x: clientX, y: clientY })
    if (cursorInnerRef.current) {
      cursorInnerRef.current.style.top = clientY + 'px'
      cursorInnerRef.current.style.left = clientX + 'px'
    }
    endX.current = clientX
    endY.current = clientY
  }, [])

  const onMouseDown = useCallback(() => setIsActive(true), [])
  const onMouseUp = useCallback(() => setIsActive(false), [])
  const onMouseEnter = useCallback(() => setIsVisible(true), [])
  const onMouseLeave = useCallback(() => setIsVisible(false), [])
  const animateOuterCursor = useCallback(
    function step(time: number) {
      if (previousTimeRef.current !== undefined) {
        const newCoords = {
          x: coords.x + (endX.current - coords.x) / 8,
          y: coords.y + (endY.current - coords.y) / 8,
        }
        setCoords(newCoords)
        if (cursorOuterRef.current) {
          cursorOuterRef.current.style.top = `${newCoords.y}px`
          cursorOuterRef.current.style.left = `${newCoords.x}px`
        }
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(step)
    },
    [coords.x, coords.y],
  )

  useEventListener('mousemove', onMouseMove)
  useEventListener('mousedown', onMouseDown)
  useEventListener('mouseup', onMouseUp)
  useEventListener('mouseenter', onMouseEnter)
  useEventListener('mouseleave', onMouseLeave)

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateOuterCursor)

    return () => cancelAnimationFrame(requestRef.current)
  }, [animateOuterCursor])

  useEffect(() => {
    if (!cursorInnerRef.current || !cursorOuterRef.current) return
    if (isActive) {
      cursorInnerRef.current.style.transform = `scale(${innerScale})`
      cursorOuterRef.current.style.transform = `scale(${outerScale})`
    } else {
      cursorInnerRef.current.style.transform = 'scale(1)'
      cursorOuterRef.current.style.transform = 'scale(1)'
    }
  }, [innerScale, outerScale, isActive])

  useEffect(() => {
    if (!cursorInnerRef.current || !cursorOuterRef.current) return
    if (isActiveClickable) {
      cursorInnerRef.current.style.transform = `scale(${innerScale * 1.3})`
      cursorOuterRef.current.style.transform = `scale(${outerScale * 1.4})`
    }
  }, [innerScale, outerScale, isActiveClickable])

  useEffect(() => {
    if (!cursorInnerRef.current || !cursorOuterRef.current) return
    if (isVisible) {
      cursorInnerRef.current.style.opacity = '1'
      cursorOuterRef.current.style.opacity = '1'
    } else {
      cursorInnerRef.current.style.opacity = '0'
      cursorOuterRef.current.style.opacity = '0'
    }
  }, [isVisible])

  useEffect(() => {
    const clickables = document.querySelectorAll(
      'a, input[type="submit"], input[type="image"], label[for], select, button, .link',
    )
    clickables.forEach((element) => {
      const el = element as HTMLElement
      el.style.cursor = 'none'

      el.addEventListener('mouseover', () => {
        setIsActive(true)
      })
      el.addEventListener('click', () => {
        setIsActive(true)
        setIsActiveClickable(false)
      })
      el.addEventListener('mousedown', () => {
        setIsActiveClickable(true)
      })
      el.addEventListener('mouseup', () => {
        setIsActive(true)
      })
      el.addEventListener('mouseout', () => {
        setIsActive(false)
        setIsActiveClickable(false)
      })
    })

    return () => {
      clickables.forEach((el) => {
        el.removeEventListener('mouseover', () => {
          setIsActive(true)
        })
        el.removeEventListener('click', () => {
          setIsActive(true)
          setIsActiveClickable(false)
        })
        el.removeEventListener('mousedown', () => {
          setIsActiveClickable(true)
        })
        el.removeEventListener('mouseup', () => {
          setIsActive(true)
        })
        el.removeEventListener('mouseout', () => {
          setIsActive(false)
          setIsActiveClickable(false)
        })
      })
    }
  }, [isActive])

  return (
    <Fragment>
      <div ref={cursorOuterRef} className={`${styles.cursorOuter} bg-yellow-500/40`} data-testid="cursorOuter" />
      <div ref={cursorInnerRef} className={`${styles.cursorInner} bg-yellow-500`} data-testid="cursorInner" />
    </Fragment>
  )
}
