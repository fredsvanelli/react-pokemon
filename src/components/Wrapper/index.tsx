import { memo } from 'react';

interface IWrapperProps {
  children?: React.ReactNode;
}

const Wrapper: React.FC<IWrapperProps> = ({ children }) => {
  return <div className="d-flex flex-column min-vh-100">{children}</div>;
};

export default memo(Wrapper);
