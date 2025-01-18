import React, { FC, PropsWithChildren } from "react";

type Props = {
  textColor: string;
};

const Button: FC<PropsWithChildren<Props>> = (props) => {
  return <button style={{ color: props.textColor }}>{props.children}</button>;
};

export default Button;
