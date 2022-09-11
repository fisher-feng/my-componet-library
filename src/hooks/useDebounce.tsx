import React, {useState, useEffect} from "react"
function useDebounce(value:any, delay = 300) {
  const [debounceValue, setdebounceValue] = useState<any>(value);
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setdebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    }
  }, [value, delay])
  return debounceValue;
}

export default useDebounce;