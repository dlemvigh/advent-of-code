import { useEffect, useRef } from "react";

export function useRenderCount(): number {
  const count = useRef(1);
  useEffect(() => {
    count.current++;
  });
  return count.current;
}
