import style from './Main.style.module.scss';
// import detectiveImg from '../assets/detective.png';
// import checkMarkImg from '../assets/checkMark.svg';
import checkMarkEmptyImg from '../assets/checkMarkEmpty.svg';
import pencilImg from '../assets/pencil.svg';
import garbageCanImg from '../assets/garbageCan.svg';
import { useState } from 'react';
import useRequestData from '../hooks/useRequestData';

export default function Main() {
  const [inp, setInp] = useState({ title: '', description: '' });
  // const [inpUpdate, setInpUpdate] = useState({ title: '', description: '' });
  const { responseData, createData, deleteData } = useRequestData('http://localhost:3000/task/');

  function fillInputs(e) {
    setInp({ ...inp, [e.target.name]: e.target.value });
  }

  return (
    <div className={style.container}>
      <div className={style.createWrapper}>
        <h1>TODO LIST</h1>

        <div className={style.createNoteWrapper}>
          <input type='text' placeholder='Create note...' name='title' value={inp.title} onChange={fillInputs} />
          <input type='text' placeholder='Create description note...' name='description' value={inp.description} onChange={fillInputs} />
          <button onClick={() => createData(inp)}>create</button>
        </div>
      </div>

      {/* <div className={style.emptyWrapper}>
        <img src={detectiveImg} alt='detectiveImg' />
        <p>Empty...</p>
      </div> */}

      {responseData.map((el) => (
        <div className={style.existingNotesWrapper} key={el._id}>
          <div className={style.generalNoteWrapper}>
            <div className={style.noteWrapper}>
              <img className={style.checkMarkImg} src={checkMarkEmptyImg} alt='checkMarkImg' />
              <p className={style.noteTitle}>{el.title}</p>
              <p className={style.noteDescription}>{el.description}</p>
            </div>

            <div className={style.iconsNoteWrapper}>
              <img className={style.pencilImg} src={pencilImg} alt='pencilImg' />
              <img className={style.garbageCanImg} src={garbageCanImg} alt='garbageCanImg' onClick={() => deleteData(el._id)}/>
            </div>
          </div>

          <div className={style.line}></div>
        </div>
      ))}
    </div>
  );
}
