

import { useNavigate } from 'react-router-dom';
import style from'./Home.module.css';

export default function Home() {
  const navigate= useNavigate();

  
  return (
    <>
    <h1 className={style.head}>Random Chat</h1>
    <div className={style.Home}>
      
      <div className={style.Homecontent}>
        <div onClick={() => navigate("/CreateGroup")} className={style.circle}>
          <img src="/new.png" alt="New" />
          <h2>New</h2>
        </div>
        <div onClick={() => navigate("/JoinGroup")} className={style.circle}>
          <img src="/join.png" alt="Join" />
          <h2>Join</h2>
        </div>
      </div>
    </div>

    </>
  );
}
