import style from './Main.style.module.scss';
import detectiveImg from '../assets/detective.png';
// import checkMarkImg from '../assets/checkMark.svg';
import checkMarkEmptyImg from '../assets/checkMarkEmpty.svg';
import pencilImg from '../assets/pencil.svg';
import garbageCanImg from '../assets/garbageCan.svg';

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

      <div className={style.existingNotesWrapper}>
        <div className={style.generalNoteWrapper}>
          <div className={style.noteWrapper}>
            <img className={style.checkMarkImg} src={checkMarkEmptyImg} alt='checkMarkImg' />
            <p className={style.noteTitle}>Note #1</p>
            <p className={style.noteDescription}>Description</p>
          </div>

          <div className={style.iconsNoteWrapper}>
            <img className={style.pencilImg} src={pencilImg} alt='pencilImg' />
            <img className={style.garbageCanImg} src={garbageCanImg} alt='garbageCanImg' />
          </div>
        </div>

        <div className={style.line}></div>
      </div>
    </div>
  );
}
