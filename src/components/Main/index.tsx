import { memo } from 'react';

interface IMainProps {
  children?: React.ReactNode;
  className?: string;
}

const Main: React.FC<IMainProps> = ({ children, className = '' }) => {
  return <div className={`flex-grow-1 ${className}`}>{children}</div>;
};

export default memo(Main);
