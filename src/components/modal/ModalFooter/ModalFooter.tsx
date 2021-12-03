import React from 'react';
type Props = {
  children?: React.ReactNode;
};

export default function ModalFooter({ children }: Props) {
  return <div tw="flex items-center justify-end gap-4">{children}</div>;
}

