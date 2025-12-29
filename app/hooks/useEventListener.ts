import { useEffect, useRef } from 'react'

type PossibleTarget = Window | Document | HTMLElement | EventTarget | null | undefined

function useEventListener<E>(eventName: string, handler: (event: E) => void, el?: PossibleTarget): void {
  const savedHandler = useRef<typeof handler | null>(null)
  const targetRef = useRef<PossibleTarget>(undefined)

  useEffect(() => {
    targetRef.current = el ?? document
  }, [el])

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const target = targetRef.current
    if (!target || !('addEventListener' in target)) return

    const eventListener = (event: Event) => {
      // savedHandler is kept up-to-date by the other effect
      savedHandler.current?.(event as E)
    }

    target.addEventListener(eventName, eventListener)

    return () => {
      target.removeEventListener(eventName, eventListener)
    }
  }, [eventName])
}

export default useEventListener
