import React from 'react';
import { createImage } from '@gluestack-ui/core/image/creator';
import { Platform, Image as RNImage } from 'react-native';
import { tva } from '@gluestack-ui/utils/nativewind-utils';
import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils';

const imageStyle = tva({
  base: 'max-w-full',
  variants: {
    size: {
      '2xs': 'h-6 w-6',
      'xs': 'h-10 w-10',
      'sm': 'h-16 w-16',
      'md': 'h-20 w-20',
      'lg': 'h-24 w-24',
      'xl': 'h-32 w-32',
      '2xl': 'h-64 w-64',
      'full': 'h-full w-full',
      'none': '',
    },
  },
});

/** Pixel sizes aligned with Tailwind classes (native needs explicit dimensions). */
export const NATIVE_IMAGE_SIZE_PX = {
  '2xs': 24,
  xs: 40,
  sm: 64,
  md: 80,
  lg: 96,
  xl: 128,
  '2xl': 256,
} as const;

type ImageSizeKey = keyof typeof NATIVE_IMAGE_SIZE_PX;

type ImageSize = VariantProps<typeof imageStyle>['size'];

function getNativeImageStyle(
  size: ImageSize,
  className?: string
): React.ComponentProps<typeof RNImage>['style'] | undefined {
  if (Platform.OS === 'web') {
    // @ts-expect-error web-only CSS value
    return { height: 'revert-layer', width: 'revert-layer' };
  }

  if (!size || size === 'full' || size === 'none') {
    return undefined;
  }

  const px = NATIVE_IMAGE_SIZE_PX[size as ImageSizeKey];
  if (!px) {
    return undefined;
  }

  const isCircle = className?.includes('rounded-full');

  return {
    width: px,
    height: px,
    maxWidth: px,
    maxHeight: px,
    resizeMode: 'cover',
    ...(isCircle ? { borderRadius: px / 2, overflow: 'hidden' as const } : {}),
  };
}

const UIImage = createImage({ Root: RNImage });

type ImageProps = VariantProps<typeof imageStyle> &
  React.ComponentProps<typeof UIImage>;
const Image = React.forwardRef<
  React.ComponentRef<typeof UIImage>,
  ImageProps & { className?: string }
>(function Image({ size = 'md', className, style, ...props }, ref) {
  return (
    <UIImage
      className={imageStyle({ size, class: className })}
      {...props}
      ref={ref}
      style={[getNativeImageStyle(size, className), style]}
    />
  );
});

Image.displayName = 'Image';
export { Image };
