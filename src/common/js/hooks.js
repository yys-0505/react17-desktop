import { useState, useEffect, useRef } from "react";

export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, [])
}

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debouncedValue
}

export const useDocumentTitle = (title, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;
  
  useEffect(() => {
    document.title = title;
  }, [title])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    }
  }, [keepOnUnmount, oldTitle])
}

/**
 * 返回组件的挂载状态, 如果还没挂载或者已经卸载, 返回false; 反之返回true
 */
 export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false
    }
  })
  return mountedRef;
}