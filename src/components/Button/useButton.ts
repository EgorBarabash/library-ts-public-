interface IProps {
  isDisabled: boolean;
  onClick: (event: MouseEvent) => {};
  className: string;
}

export function useButton<T extends IProps>(props: T) {
  let { isDisabled, onClick, className } = props;

  return { disabled: isDisabled, onClick, className };
}
