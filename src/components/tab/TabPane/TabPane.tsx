import React from 'react';
type Props = {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
};
export default function TabPane({
  children,
  active = false,
  className = '',
}: Props) {
  return (
    <div className={`${active ? 'block' : 'hidden'} ${className}`}>
      {children}
    </div>
  );
}
