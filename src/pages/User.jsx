import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';
import { api } from '../api/client';
import Shell from '../components/Shell';
import Card from '../components/Card';

export default function User(){
  const { token, logout } = useAuth();
  const [me, setMe] = useState(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api('GET', '/users/user-page', null, token);
        if(mounted) setMe(data?.data || data);
      } catch(e){ setErr(e.message); }
      finally { setBusy(false); }
    })();
    return () => { mounted = false; };
  }, [token]);

  return (
    <Shell>
      <Card title="내 페이지">
        {busy && <p>불러오는 중…</p>}
        {err && <p className="help help--err">{err}</p>}
        {me && (
          <div className="row">
            <div>
              <div className="muted small">이름</div>
              <div>{me.name ?? '-'}</div>
            </div>
            <div>
              <div className="muted small">이메일</div>
              <div>{me.email ?? '-'}</div>
            </div>
            <div>
              <div className="muted small">학번</div>
              <div>{me.studentNumber ?? '-'}</div>
            </div>
          </div>
        )}
        <div className="row gap" style={{marginTop:16}}>
          <a href="/" className="btn btn--outline">홈으로</a>
          <button onClick={logout} className="btn btn--outline">로그아웃</button>
        </div>
      </Card>
    </Shell>
  );
}