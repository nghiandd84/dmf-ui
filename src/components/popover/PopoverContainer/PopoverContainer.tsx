import React from 'react';
type Props = {
  children: React.ReactNode;
  className?: string;
};
export default function PopoverContainer({ children, className }: Props) {
  return (
    <div
      tw="bg-white border-0 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg shadow-xl"
      className={className}
    >
      {children}
    </div>
  );
}
