import React, { ImgHTMLAttributes } from 'react';
import tw from 'twin.macro';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  raised?: boolean;
  rounded?: boolean;
}
export default function Image({
  src,
  raised,
  rounded,
  className,
  ...rest
}: Props) {
  const roundFullTw = tw`rounded-full`;
  const roundXlTw = tw`rounded-xl`;
  const raiseTw = tw`shadow-lg`;
  return (
    <>
      <img
        {...rest}
        src={src}
        css={[
          tw`h-auto max-w-full align-middle border-none`,
          rounded ? roundFullTw : roundXlTw,
          raised && raiseTw,
        ]}
        className={className}
      />
    </>
  );
}
