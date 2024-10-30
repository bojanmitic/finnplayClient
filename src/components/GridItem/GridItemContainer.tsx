import styled from "@emotion/styled";

interface GridItemSettings {
  colSpan?: number;
  rowSpan?: number;
  colStart?: number;
  colEnd?: number;
  rowStart?: number;
  rowEnd?: number;
}

export interface GridItemContainerProps {
  xs?: GridItemSettings;
  md?: GridItemSettings;
  lg?: GridItemSettings;
  xl?: GridItemSettings;
  xxl?: GridItemSettings;
  colSpan?: number;
  rowSpan?: number;
  colStart?: number;
  colEnd?: number;
  rowStart?: number;
  rowEnd?: number;
}

const GridItemContainer = styled.div<GridItemContainerProps>`
  // Smartphones
  @media (max-width: 428px) {
    ${({ xs }) => xs?.colSpan && `grid-column: span ${xs.colSpan}`};
    ${({ xs }) => xs?.rowSpan && `grid-row: span ${xs.rowSpan}`};
    ${({ xs }) => xs?.colStart && `grid-column-start: ${xs.colStart}`};
    ${({ xs }) => xs?.colEnd && `grid-column-end: ${xs.colEnd}`};
    ${({ xs }) => xs?.rowStart && `grid-row-start: ${xs.rowStart}`};
    ${({ xs }) => xs?.rowEnd && `grid-row-end: ${xs.rowEnd}`};
  }

  // Portrait Tablets
  @media (min-width: 600px) {
    ${({ md }) => md?.colSpan && `grid-column: span ${md.colSpan}`};
    ${({ md }) => md?.rowSpan && `grid-row: span ${md.rowSpan}`};
    ${({ md }) => md?.colStart && `grid-column-start: ${md.colStart}`};
    ${({ md }) => md?.colEnd && `grid-column-end: ${md.colEnd}`};
    ${({ md }) => md?.rowStart && `grid-row-start: ${md.rowStart}`};
    ${({ md }) => md?.rowEnd && `grid-row-end: ${md.rowEnd}`};
  }

  // Landscape Tablets
  @media (min-width: 768px) {
    ${({ lg }) => lg?.colSpan && `grid-column: span ${lg.colSpan}`};
    ${({ lg }) => lg?.rowSpan && `grid-row: span ${lg.rowSpan}`};
    ${({ lg }) => lg?.colStart && `grid-column-start: ${lg.colStart}`};
    ${({ lg }) => lg?.colEnd && `grid-column-end: ${lg.colEnd}`};
    ${({ lg }) => lg?.rowStart && `grid-row-start: ${lg.rowStart}`};
    ${({ lg }) => lg?.rowEnd && `grid-row-end: ${lg.rowEnd}`};
  }

  // Laptops & Desktops
  @media (min-width: 992px) {
    ${({ xl }) => xl?.colSpan && `grid-column: span ${xl.colSpan}`};
    ${({ xl }) => xl?.rowSpan && `grid-row: span ${xl.rowSpan}`};
    ${({ xl }) => xl?.colStart && `grid-column-start: ${xl.colStart}`};
    ${({ xl }) => xl?.colEnd && `grid-column-end: ${xl.colEnd}`};
    ${({ xl }) => xl?.rowStart && `grid-row-start: ${xl.rowStart}`};
    ${({ xl }) => xl?.rowEnd && `grid-row-end: ${xl.rowEnd}`};
  }

  // Large Desktops
  @media (min-width: 1200px) {
    ${({ xxl }) => xxl?.colSpan && `grid-column: span ${xxl.colSpan}`};
    ${({ xxl }) => xxl?.rowSpan && `grid-row: span ${xxl.rowSpan}`};
    ${({ xxl }) => xxl?.colStart && `grid-column-start: ${xxl.colStart}`};
    ${({ xxl }) => xxl?.colEnd && `grid-column-end: ${xxl.colEnd}`};
    ${({ xxl }) => xxl?.rowStart && `grid-row-start: ${xxl.rowStart}`};
    ${({ xxl }) => xxl?.rowEnd && `grid-row-end: ${xxl.rowEnd}`};
  }

`;

export default GridItemContainer