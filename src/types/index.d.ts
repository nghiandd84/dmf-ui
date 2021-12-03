import { TwStyle } from 'twin.macro';
import 'twin.macro';
import { css as cssImport } from '@emotion/react';
import styledImport from '@emotion/styled';

declare module 'react' {
  // interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    // Extend Emotion Core type
    css?: TwStyle[];
  }
}

declare module 'twin.macro' {
  // The styled and css imports
  const styled: typeof styledImport;
  const css: typeof cssImport;
}
