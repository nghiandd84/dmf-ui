import React from 'react';
import tw from 'twin.macro';

type Props = {
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  footer: string;
  cite: string;
  className?: string;
  children: React.ReactNode;
  onclick?: (event: Event) => void;
};

export default function Quote({
  children,
  color = 'info',
  footer,
  cite,
  ...rest
}: Props) {
  return (
    <div {...rest} tw="mb-2">
      <p
        css={[
          tw`mt-0 mb-2 text-base font-light leading-relaxed`,
          color === 'primary' && tw`text-primary-700`,
          color === 'secondary' && tw`text-secondary-700`,
          color === 'success' && tw`text-success-700`,
          color === 'danger' && tw`text-danger-700`,
          color === 'warning' && tw`text-warning-700`,
          color === 'info' && tw`text-info-700`,
        ]}
      >
        {children}
      </p>
      <footer
        css={[
          color === 'primary' && tw`text-primary-800`,
          color === 'secondary' && tw`text-secondary-800`,
          color === 'success' && tw`text-success-800`,
          color === 'danger' && tw`text-danger-800`,
          color === 'warning' && tw`text-warning-800`,
          color === 'info' && tw`text-info-800`,
        ]}
      >
        - {footer} <cite>{cite}</cite>
      </footer>
    </div>
  );
}
