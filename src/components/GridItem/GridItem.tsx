import { PropsWithChildren } from "react";
import GridItemContainer, { GridItemContainerProps } from './GridItemContainer';

const  GridItem = ({
  xs,
  md,
  lg,
  xl,
  xxl,
  colSpan,
  rowSpan,
  colStart,
  colEnd,
  rowStart,
  rowEnd,
  children,
}: PropsWithChildren<GridItemContainerProps>) =>  {
  return (
    <GridItemContainer
      xs={xs}
      md={md}
      lg={lg}
      xl={xl}
      xxl={xxl}
      colSpan={colSpan}
      rowSpan={rowSpan}
      colStart={colStart}
      colEnd={colEnd}
      rowStart={rowStart}
      rowEnd={rowEnd}
    >
      {children}
    </GridItemContainer>
  );
}

export default GridItem;