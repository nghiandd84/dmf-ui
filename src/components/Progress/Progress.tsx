import React from 'react';
import { Bg, Color } from '../core/Core';
import tw from 'twin.macro';

type Props = {
  value: number;
  percentage?: boolean;
  color?: Color;
};

const wrapperBgColors = {
  primary: tw`bg-primary-200`,
  secondary: tw`bg-secondary-200`,
  success: tw`bg-success-200`,
  danger: tw`bg-danger-200`,
  warning: tw`bg-warning-200`,
  info: tw`bg-info-200`,
};

export default function Progress({
  color = 'primary',
  value,
  percentage = false,
}: Props) {
  return (
    <>
      <div
        css={[
          tw`flex overflow-hidden rounded`,
          percentage && tw`h-6`,
          !percentage && tw`h-2`,
          wrapperBgColors[color],
        ]}
      >
        <div
          style={{ width: `${value.toFixed(0)}%` }}
          css={[
            tw`flex items-center justify-center text-xs font-medium text-white rounded`,
            Bg[color],
          ]}
        >
          {percentage ? `${value.toFixed(0)}% Completed` : ''}
        </div>
      </div>
    </>
  );
}
