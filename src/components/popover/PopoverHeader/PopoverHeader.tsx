import React from 'react';
type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function PopoverHeader({ children, className }: Props) {
  return (
    <div tw="text-gray-900 p-4 pb-2 uppercase font-bold" className={className}>
      {children}
    </div>
  );
}
