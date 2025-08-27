import { useRef, useEffect } from "react";

export default function useMounted() {
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
    
        return () => {
          mountedRef.current = false;
        };
      }, []);

      return mountedRef
}