import React from 'react';
import { Color } from '../../core/Core';
import tw from 'twin.macro';

type Props = {
  color?: Color;
  className?: string;
  children: React.ReactNode;
};

const divBgColors = {
  primary: tw`bg-primary-100`,
  secondary: tw`bg-secondary-100`,
  success: tw`bg-success-100`,
  danger: tw`bg-danger-100`,
  warning: tw`bg-warning-100`,
  info: tw`bg-info-100`,
};

const spanBgColors = {
  primary: tw`bg-primary-900`,
  secondary: tw`bg-secondary-900`,
  success: tw`bg-success-900`,
  danger: tw`bg-danger-900`,
  warning: tw`bg-warning-900`,
  info: tw`bg-info-900`,
};

const TextColor = {
  primary: tw`text-primary-700`,
  secondary: tw`text-secondary-700`,
  success: tw`text-success-700`,
  danger: tw`text-danger-700`,
  warning: tw`text-warning-700`,
  info: tw`text-info-700`,
};

export default function ClosingLabel({
  children,
  color = 'primary',
  className,
}: Props) {
  const [showLabel, setShowLabel] = React.useState(true);

  function closeLabel(e) {
    let delay;

    const parentClassName = e.target.parentNode;

    parentClassName.classList.add('opacity-0');

    Array.from(parentClassName.classList).map((el: any) =>
      el.includes('duration') ? (delay = el.split('-')[1]) : null
    );

    setTimeout(
      () => setShowLabel(false),
      delay ? parseInt(delay, 10) + 100 : 250
    );
  }

  return (
    <>
      {showLabel ? (
        <div
          className={className}
          css={[
            tw`flex items-center justify-between py-1 pl-3 pr-1 mr-1 transition-all duration-300 rounded-full max-w-max last:mr-0`,
            divBgColors[color],
          ]}
        >
          <span
            css={[tw`mr-2 text-xs font-semibold uppercase`, TextColor[color]]}
          >
            {children}
          </span>
          <span
            css={[
              tw`grid w-4 h-4 p-0 text-sm leading-none text-white rounded-full cursor-pointer place-items-center`,
              spanBgColors[color],
            ]}
            onClick={closeLabel}
          >
            &times;
          </span>
        </div>
      ) : null}
    </>
  );
}
