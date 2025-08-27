// import { useButton } from "./useButton.js";
// import { useRef } from "react";

// interface IProps<T> {
//   isDisabled: boolean;
//   onClick: (event: MouseEvent) => {};
//   className: string;
//   children: T
// }

// export default function Button<T extends IProps<T>>(props: T) {
//   let ref = useRef();
//   let buttonProps = useButton(props);

//   return (
//     <button {...buttonProps} ref={ref}>
//       {props.children}
//     </button>
//   );
// }
