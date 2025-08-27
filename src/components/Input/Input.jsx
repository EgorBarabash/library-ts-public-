import { useRef } from "react";
import { useInput } from "./useInput.js";

export default function Button(props) {
  let ref = useRef();
  let inputProps = useInput(props, ref);

  return <input {...inputProps} ref={ref} />;
}
