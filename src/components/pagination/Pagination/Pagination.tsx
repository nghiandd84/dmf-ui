import React from 'react';

type Props = {
  children: React.ReactNode;
};
export default function Pagination({ children }: Props) {
  return (
    <div tw="py-2">
      <div tw="block">
        <ul tw="flex pl-0 rounded list-none">{children}</ul>
      </div>
    </div>
  );
}
