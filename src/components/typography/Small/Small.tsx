import React from 'react';
import tw from 'twin.macro';

type Props = {
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  children: React.ReactNode;
  onclick?: (event: Event) => void;
};

export default function Small({ children, color = 'info', ...rest }: Props) {
  return (
    <small
      {...rest}
      css={[
        tw`mt-0 mb-4 font-normal leading-normal`,
        color === 'primary' && tw`text-primary-700`,
        color === 'secondary' && tw`text-secondary-700`,
        color === 'success' && tw`text-success-700`,
        color === 'danger' && tw`text-danger-700`,
        color === 'warning' && tw`text-warning-700`,
        color === 'info' && tw`text-info-700`,
      ]}
    >
      {children}
    </small>
  );
}
