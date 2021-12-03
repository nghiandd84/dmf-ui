import React from 'react';
import tw from 'twin.macro';

type Props = {
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  className?: string;
  children?: React.ReactNode;
};

export default function Alert({
  children,
  color = 'danger',
  className,
  ...rest
}: Props) {
  return (
    <>
      <div
        {...rest}
        css={[
          tw`relative flex items-center gap-3 p-3 pr-12 mb-4 text-white transition-all duration-300 border-0 rounded-lg bg-gradient-to-r`,
          color === 'primary' && tw`from-primary-500 to-primary-400`,
          color === 'secondary' && tw`from-secondary-500 to-secondary-400`,
          color === 'success' && tw`from-success-500 to-success-400`,
          color === 'danger' && tw`from-danger-500 to-danger-400`,
          color === 'warning' && tw`from-warning-500 to-warning-400`,
          color === 'info' && tw`from-info-500 to-info-400`
        ]}
      >
        {children}
      </div>
    </>
  );
}

