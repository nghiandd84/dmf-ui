import React, { FunctionComponent } from 'react';
import tw from 'twin.macro';
import {  Color } from '../../core/Core';

 const Bg = {
  primary: tw`bg-primary-100`,
  secondary: tw`bg-secondary-100`,
  success: tw`bg-success-100`,
  danger: tw`bg-danger-100`,
  warning: tw`bg-warning-100`,
  info: tw`bg-info-100`,
};

export const TextColor = {
  primary: tw`text-primary-700`,
  secondary: tw`text-secondary-700`,
  success: tw`text-success-700`,
  danger: tw`text-danger-700`,
  warning: tw`text-warning-700`,
  info: tw`text-info-700`,
};

type Props = {
  color?: Color;
  className?: string;
  children: React.ReactNode;
};

const Label: FunctionComponent<Props> = ({
  children,
  color = 'primary',
  className,
}: Props) => {
  return (
    <>
      <div
        css={[
          tw`flex items-center justify-between px-3 py-1 mr-1 transition-all duration-300 rounded-full max-w-max last:mr-0`,
          Bg[color],
        ]}
        className={className}
      >
        <span css={[tw`text-xs font-semibold uppercase`, TextColor[color]]}>
          {children}
        </span>
      </div>
    </>
  );
};

export default Label;
