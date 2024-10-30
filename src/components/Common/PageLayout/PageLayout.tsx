import * as React from 'react';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { down } from '../../../utils/brekpoints';
import './PageLayout.css';

interface IPageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FunctionComponent<IPageLayoutProps> = ({ children }) => {
  const screenWidthLgOrSmaller = useMediaQuery(down('lg'));
  return <div className={`${screenWidthLgOrSmaller ? 'page-layout-sm' : 'page-layout-lg'} container`}>{children}</div>;
};

export default PageLayout;
