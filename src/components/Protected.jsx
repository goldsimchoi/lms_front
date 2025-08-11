import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

export default function Protected({ children }){
  const { token } = useAuth();
  if(!token) return <Navigate to="/login" replace />;
  return children;
}