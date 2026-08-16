import type { ElementType, ReactNode } from "react";

interface ContainerProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export function Container({ as: Tag = "div", children, className = "" }: ContainerProps) {
  return <Tag className={`container-edge ${className}`}>{children}</Tag>;
}
