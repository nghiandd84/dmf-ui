import React from 'react';
import tw from 'twin.macro';
type Props = {
  src: string;
  className?: string;
  alt?: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
};

export default function CardImage({ src, className, ...rest }: Props) {
  return (
    <img
      {...rest}
      tw="w-full rounded-lg -mt-9 shadow-lg"
      className={className}
      src={src}
    />
  );
}
