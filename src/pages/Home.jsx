import { Link } from 'react-router-dom';
import Shell from '../components/Shell';

export default function Home(){
  return (
    <Shell>
      <div className="center">
        <h1 className="h1">대충 MJSEC LMS 라는 뜻</h1>
        <p className="muted">하단 버튼으로 이동하세요.</p>
        <div className="row gap">
          <Link className="btn" to="/login">로그인</Link>
          <Link className="btn btn--outline" to="/register">회원가입</Link>
        </div>
      </div>
    </Shell>
  );
}