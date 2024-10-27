import { PropsWithChildren } from "react";
import GridContainer, { GridContainerProps } from './GridContainer';

const Grid = ({
  xs,
  md,
  lg,
  xl,
  xxl,
  cols,
  gap,
  gapX,
  gapY,
  children,
}: PropsWithChildren<GridContainerProps>) => {
  return (
    <GridContainer
      xs={xs}
      md={md}
      lg={lg}
      xl={xl}
      xxl={xxl}
      cols={cols}
      gap={gap}
      gapX={gapX}
      gapY={gapY}
    >
      {children}
    </GridContainer>
  );
}

export default Grid;