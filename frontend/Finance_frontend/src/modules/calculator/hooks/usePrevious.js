// <<<<<<< HEAD
import { useEffect, useRef } from "react"

export function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
// =======
// import { useEffect, useRef } from "react";

// export function usePrevious(value) {
//     const ref = useRef();
//     useEffect(() => {
//       ref.current = value;
//     });
//     return ref.current;
//   }
// >>>>>>> develop
