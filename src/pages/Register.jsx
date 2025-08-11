import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import Card from '../components/Card';
import Shell from '../components/Shell';

export default function Register(){
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null); // null | 'ok' | 'dup' | 'bad'
  const [snStatus, setSnStatus] = useState(null);
  const [err, setErr] = useState('');
  const [PhoneNumber,setPhoneNumber]=useState('');


  //이메일 중복확인
  useEffect(() => {
    if(!email){ setEmailStatus(null); return; }
    const id = setTimeout(async () => {
      const emailRegex = /.+@.+\..+/;
      if(!emailRegex.test(email)) { setEmailStatus('bad'); return; }
      try { await api('GET', `/auth/check-email?email=${encodeURIComponent(email)}`); setEmailStatus('ok'); }
      catch { setEmailStatus('dup'); }
    }, 400);
    return () => clearTimeout(id);
  }, [email]);

  //학번중복 확인
  useEffect(() => {
    if(!studentNumber){ setSnStatus(null); return; }
    const id = setTimeout(async () => {
      try { await api('GET', `/auth/check-student-number?studentNumber=${encodeURIComponent(studentNumber)}`); setSnStatus('ok'); }
      catch { setSnStatus('dup'); }
    }, 400);
    return () => clearTimeout(id);
  }, [studentNumber]);

  const canSubmit = name && emailStatus==='ok' && snStatus==='ok' && password.length>=6 && !busy;

  const submit = async (e) => {
    e.preventDefault();
    if(!canSubmit) return;
    setBusy(true); setErr('');
    try {
      await api('POST', '/auth/register', { studentNumber,password, name, email,PhoneNumber });
      alert('회원가입이 완료되었습니다. 로그인 해주세요.');
      nav('/login');
    } catch(e){ setErr(e.message); }
    finally { setBusy(false); }
  };

  return (
    <Shell>
      <Card title="회원가입">
        <form onSubmit={submit}>
        <div className="row">
            <label className="label">학번</label>
            <input className="input" value={studentNumber} onChange={e=>setStudentNumber(e.target.value)} required />
            {snStatus==='ok' && <p className="help" style={{color:'#16a34a'}}>사용 가능한 학번입니다.</p>}
            {snStatus==='dup' && <p className="help help--err">이미 가입된 학번입니다.</p>}
          </div>
          <div className="row">
            <label className="label">비밀번호 (6자 이상)</label>
            <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <div className="row">
            <label className="label">이름</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} required />
          </div>
          <div className="row">
            <label className="label">이메일</label>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} required />
            {emailStatus==='ok' && <p className="help" style={{color:'#16a34a'}}>사용 가능한 이메일입니다.</p>}
            {emailStatus==='dup' && <p className="help help--err">이미 사용 중인 이메일입니다.</p>}
            {emailStatus==='bad' && <p className="help" style={{color:'#ea580c'}}>이메일 형식을 확인하세요.</p>}
          </div>
          <div className='row'>
            <label classname="label">전화번호</label>
            <input classname="label" value={PhoneNumber} onchange={e => setPhoneNumber(e.target.value)} required ></input>
          </div>
          {err && <p className="help help--err">{err}</p>}
          <button disabled={!canSubmit} className="btn" type="submit">{busy? '처리 중…':'회원가입'}</button>
        </form>
        <div className="center small muted" style={{marginTop:12}}>
          이미 계정이 있나요? <Link to="/login">로그인</Link>
        </div>
      </Card>
    </Shell>
  );
}