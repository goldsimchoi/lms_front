import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';

export default function Shell({ children }){
  const { token, logout } = useAuth();
  return (
    <div className="app">
      <header className="header">
        <div className="header__inner">
          <Link to="/" className="brand">Mjsec</Link>
          <nav className="nav">
            <Link to="/login">로그인</Link>
            <Link to="/register">회원가입</Link>
            {token && (<>
              <Link to="/me">내 페이지</Link>
              <button onClick={logout} className="btn btn--outline">로그아웃</button>
            </>)}
          </nav>
        </div>
      </header>
      <main className="container">{children}</main>
    </div>
  );
}