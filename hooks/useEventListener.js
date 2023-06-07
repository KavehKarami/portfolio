import { useRef, useEffect } from "react";

function useEventListener(eventName, handler, el) {
  const savedHandler = useRef();
  const element = useRef();

  useEffect(() => {
    element.current = el || document;
  }, [el]);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element.current && element.current.addEventListener;
    if (!isSupported) return;

    const eventListener = ($event) => savedHandler.current($event);

    element.current.addEventListener(eventName, eventListener);

    return () => {
      element.current.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

export default useEventListener;
