import React, { RefObject, useEffect } from "react";
export  default function useClickOutSide (ref:RefObject<HTMLElement>, handler:Function) {
  useEffect(() => {
    const listener = (event:MouseEvent) => {
      if(!ref || ref.current?.contains(event.target as HTMLElement)) {
        return;
      }
      handler(event)
    }
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handler])
} 
