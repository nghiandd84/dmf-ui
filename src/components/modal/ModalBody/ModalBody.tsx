import React from 'react';
import tw from 'twin.macro';
type Props = {
  children: React.ReactNode;
};

export default function ModalBody({ children }: Props) {
  return <div tw="relative flex-auto mb-6">{children}</div>;
}
