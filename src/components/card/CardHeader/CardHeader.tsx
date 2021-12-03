import React from 'react';
import tw from 'twin.macro';
import PropTypes from 'prop-types';

type Props = {
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  iconOnly?: boolean;
  size?: 'md' | 'sm' | 'lg';
  position?: 'left' | 'right' | 'center';
  className?: string;
  children?: React.ReactNode;
};

export default function CardHeader({
  children,
  color = 'primary',
  size = 'md',
  position = 'center',
  iconOnly = false,
  className,
}: Props) {
  let headerSize = [];

  return (
    <div
      css={[
        tw`grid items-center mb-4 -mt-10 text-white shadow-lg bg-gradient-to-tr rounded-xl`,
        color === 'primary' && tw`from-primary-500 to-primary-700`,
        color === 'secondary' && tw`from-secondary-500 to-secondary-700`,
        color === 'success' && tw`from-success-500 to-success-700`,
        color === 'danger' && tw`from-danger-500 to-danger-700`,
        color === 'warning' && tw`from-warning-500 to-warning-700`,
        color === 'info' && tw`from-info-500 to-info-700`,
        color === 'primary' && tw`from-primary-500 to-primary-700`,
        position === 'left' && tw`justify-start`,
        position === 'center' && tw`justify-center`,
        position === 'right' && tw`justify-end`,
        size === 'md' && iconOnly && tw`w-24 h-24 px-4 py-4`,
        size === 'md' && !iconOnly && tw`w-full h-24 px-8 py-4`,
        size === 'sm' && iconOnly && tw`w-20 h-20 px-4 py-4`,
        size === 'sm' && !iconOnly && tw`w-full h-20 px-4 py-4`,
        size === 'lg' && iconOnly && tw`px-4 py-4 w-28 h-28`,
        size === 'lg' && !iconOnly && tw`w-full px-8 py-4 h-28`,
      ]}
      className={`${headerSize} ${className}`}
    >
      {children}
    </div>
  );
}
