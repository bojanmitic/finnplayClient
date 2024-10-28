export const breakpoints: Record<string, number> = {
  xs: 428,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1800
};

export type Breakpoint = keyof typeof breakpoints;

export const up = (breakpoint: Breakpoint): string => `screen and (min-width: ${pxToRem(breakpoints[breakpoint])})`;

export const down = (breakpoint: Breakpoint): string =>
  `screen and (max-width: ${pxToRem(breakpoints[breakpoint] - 0.1)})`;

export const pxToRem = (px: number): string => `${px * 0.0625}rem`;
