import React from 'react';

type Props = {
  open: boolean;
  className?: string;
  children: React.ReactNode;
};
export default function NavbarCollapse({
  children,
  className = '',
  open = false,
}: Props) {
  return (
    <div
      tw="lg:flex flex-grow items-center"
      className={`${open ? 'block' : 'hidden'} ${className}`}
    >
      {children}
    </div>
  );
}
