import { FC, PropsWithChildren } from "react";

type Props = {
  textColor: string;
};

// Named export with 'export' keyword
export const Button: FC<PropsWithChildren<Props>> = ({
  textColor,
  children,
}) => {
  return <button style={{ color: textColor }}>{children}</button>;
};
