import style from './Main.style.module.scss';
import detectiveImg from '../assets/detective.png';

export default function Main() {
  return (
    <div className={style.container}>
      <div className={style.createWrapper}>
        <h1>TODO LIST</h1>

        <div className={style.createNoteWrapper}>
          <input type='text' placeholder='Create note...' />
          <input type='text' placeholder='Create description note...' />
          <button>create</button>
        </div>
      </div>

      <div className={style.emptyWrapper}>
        <img src={detectiveImg} alt='detectiveImg' />
        <p>Empty...</p>
      </div>
    </div>
  );
}
