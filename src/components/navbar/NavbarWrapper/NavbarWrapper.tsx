import React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function NavbarWrapper({ children, className }: Props) {
  return (
    <div
      tw="w-full flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      className={className}
    >
      {children}
    </div>
  );
}
