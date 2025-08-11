import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/auth';
import Shell from '../components/Shell';
import Card from '../components/Card';

export default function Login(){
  const { setToken } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const canSubmit = email && password && !busy;

  const submit = async (e) => {
    e.preventDefault();
    if(!canSubmit) return;
    setBusy(true); setErr('');
    try {
      const data = await api('POST', '/auth/login', { email, password });
      const token = data?.token || data?.data?.token;
      if(!token) throw new Error('토큰을 받지 못했습니다.');
      setToken(token);
      nav('/me');
    } catch(e){ setErr(e.message); }
    finally { setBusy(false); }
  };

  return (
    <Shell>
      <Card title="로그인">
        <form onSubmit={submit}>
          <div className="row">
            <label className="label">학번</label>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className="row">
            <label className="label">비밀번호</label>
            <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          {err && <p className="help help--err">{err}</p>}
          <button disabled={!canSubmit} className="btn" type="submit">{busy? '로그인 중…':'로그인'}</button>
        </form>
        <div className="muted center small">아직 계정이 없나요? <Link to="/register">회원가입</Link></div>
      </Card>
    </Shell>
  );
}