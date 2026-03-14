import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../../store/hooks';

interface Props {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: Props) => {
  const { pathname } = useLocation();
  const user = useAppSelector(state => state.user.user);

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: pathname }} replace />;
  }

  return children;
};
