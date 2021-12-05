import React from 'react';
import PropTypes from 'prop-types';
type Props = {
  children: React.ReactNode;
};
export default function TabContent({ children }: Props) {
  return (
    <div tw="relative flex flex-col min-w-0 break-words w-full px-4 pb-4">
      <div tw="flex-auto text-center font-light leading-normal">{children}</div>
    </div>
  );
}
