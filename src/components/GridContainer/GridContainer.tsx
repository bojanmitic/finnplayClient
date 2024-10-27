import styled from "@emotion/styled";

interface ContainerSettings {
  cols?: number;
  gapX?: string;
  gapY?: string;
}

export interface GridContainerProps {
  xs?: ContainerSettings;
  md?: ContainerSettings;
  lg?: ContainerSettings;
  xl?: ContainerSettings;
  xxl?: ContainerSettings;
  cols?: number;
  gap?: string;
  gapX?: string;
  gapY?: string;
}


const GridContainer = styled.div<GridContainerProps>`
  display: grid;
  height: 100%;

  // Fallback if no breakpoint-specific values have been set
  ${({ cols }) => cols && `grid-template-columns: repeat(${cols}, 1fr);`}
  ${({ gap }) => gap && `gap: ${gap};`}
  ${({ gapX }) => gapX && `column-gap: ${gapX};`}
  ${({ gapY }) => gapY && `row-gap: ${gapY};`}

  // Smartphones
  @media (max-width: 428px) {
    ${({ xs }) =>
      xs?.cols && `grid-template-columns: repeat(${xs.cols}, 1fr);`};
    ${({ xs }) => xs?.gapX && `column-gap: ${xs.gapX};`};
  }

  // Portrait Tablets
  @media (min-width: 600px) {
    ${({ md }) =>
      md?.cols && `grid-template-columns: repeat(${md.cols}, 1fr);`};
    ${({ md }) => md?.gapX && `column-gap: ${md.gapX};`};
  }

  // Landscape Tablets
  @media (min-width: 768px) {
    ${({ lg }) =>
      lg?.cols && `grid-template-columns: repeat(${lg.cols}, 1fr);`};
    ${({ lg }) => lg?.gapX && `column-gap: ${lg.gapX};`};
  }

  // Laptops & Desktops
  @media (min-width: 992px) {
    ${({ xl }) =>
      xl?.cols && `grid-template-columns: repeat(${xl.cols}, 1fr);`};
    ${({ xl }) => xl?.gapX && `column-gap: ${xl.gapX};`};
  }

  // Large Desktops
  @media (min-width: 1200px) {
    ${({ xxl }) =>
      xxl?.cols && `grid-template-columns: repeat(${xxl.cols}, 1fr);`};
    ${({ xxl }) => xxl?.gapX && `column-gap: ${xxl.gapX};`};
  }
`;

export default GridContainer