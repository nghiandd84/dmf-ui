import React from 'react';
type Props = {
  children: React.ReactNode,
  className?: string,
};

export default function PopoverBody({ children, className }: Props) {
  return (
    <div tw="text-gray-700 font-normal px-4 pb-4" className={className}>
      {children}
    </div>
  );
}

