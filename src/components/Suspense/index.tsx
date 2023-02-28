import { memo } from 'react';

interface ISuspenseProps {
  isLoading: boolean;
  fallback?: React.ReactNode | string;
  children: React.ReactNode;
}

const Suspense: React.FC<ISuspenseProps> = ({
  isLoading,
  fallback = null,
  children,
  // eslint-disable-next-line react/jsx-no-useless-fragment
}) => <>{isLoading ? fallback : children}</>;

export default memo(Suspense);
