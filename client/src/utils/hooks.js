import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}

export const useKeyPress = (targetKeyCode, targetNode = window, preventDefault = false, defaultPress = undefined) => {
  const [keyPressed, setKeyPressed] = useState(false)

  if (defaultPress) {
    setKeyPressed(defaultPress)
  }

  function downHandler(e) {
    if (preventDefault) {
      e.preventDefault()
    }
    if (e.keyCode === targetKeyCode) {
      setKeyPressed(true)
    }
  }

  const upHandler = (e) => {
    if (preventDefault) {
      e.preventDefault()
    }
    if (e.keyCode === targetKeyCode) {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    targetNode.addEventListener('keydown', downHandler)
    targetNode.addEventListener('keyup', upHandler)

    return () => {
      targetNode.removeEventListener('keydown', downHandler)
      targetNode.removeEventListener('keyup', upHandler)
    }
  })

  return keyPressed
}

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export const useWhyDidYouUpdate = (name, props) => {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef()

  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      // @ts-ignore
      const allKeys = Object.keys({ ...previousProps.current, ...props })
      // Use this object to keep track of changed props
      const changesObj = {}
      // Iterate through keys
      allKeys.forEach((key) => {
        // If previous is different from current
        // @ts-ignore
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            // @ts-ignore
            from: previousProps.current[key],
            to: props[key]
          }
        }
      })

      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj)
      }
    }

    // Finally update previousProps with current props for next hook call
    previousProps.current = props
  })
}
