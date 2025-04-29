import classNames from "classnames";
import { ElementType, HTMLAttributes, ReactNode } from "react";

interface FlexProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  justifyContent?: string;
  alignItems?: string;
  alignContent?: string;
  inline?: boolean;
  wrap?: string;
  className?: string;
  tag?: ElementType;
  breakpoint?: string;
  direction?: string;
}

const Flex = ({
  justifyContent,
  alignItems,
  alignContent,
  inline,
  wrap,
  className,
  tag: Tag = "div",
  children,
  breakpoint,
  direction,
  ...rest
}: FlexProps) => {
  return (
    <Tag
      className={classNames(
        {
          [`d-${breakpoint ? `${breakpoint}-` : ""}flex`]: !inline,
          [`d-${breakpoint ? `${breakpoint}-` : ""}inline-flex`]: inline,
          [`flex-${direction}`]: direction,
          [`justify-content-${justifyContent}`]: justifyContent,
          [`align-items-${alignItems}`]: alignItems,
          [`align-content-${alignContent}`]: alignContent,
          [`flex-${wrap}`]: wrap,
        },
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Flex;
