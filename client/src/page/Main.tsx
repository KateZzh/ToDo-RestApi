import style from './Main.style.module.scss';
import detectiveImg from '../assets/detective.png';
import checkMarkImg from '../assets/checkMark.svg';
import checkMarkEmptyImg from '../assets/checkMarkEmpty.svg';
import pencilImg from '../assets/pencil.svg';
import garbageCanImg from '../assets/garbageCan.svg';
import { useState } from 'react';
import useRequestData from '../hooks/useRequestData';

export default function Main() {
  const [inp, setInp] = useState({ title: '', description: '', completedTask: false });
  const { responseData, createData, deleteData, updateData, getByIdData, responseDataById, setResponseDataById } =
    useRequestData('http://localhost:3000/task/');

  function fillInputs(e) {
    setInp({ ...inp, [e.target.name]: e.target.value });
  }

  function doCreateData() {
    createData(inp);
    setInp({ title: '', description: '' });
  }

  function doUpdateData(e) {
    setResponseDataById({ ...responseDataById, [e.target.name]: e.target.value });
  }

  function doCompleteTask(_id, flag) {
    updateData(_id, { completedTask: !flag });
  }

  return (
    <div className={style.container}>
      <div className={style.createWrapper}>
        <h1>TODO LIST</h1>

        <div className={style.createNoteWrapper}>
          <input type='text' placeholder='Create note...' name='title' value={inp.title} onChange={fillInputs} />
          <input type='text' placeholder='Create description note...' name='description' value={inp.description} onChange={fillInputs} />
          <button onClick={doCreateData}>create</button>
        </div>
      </div>

      {responseData.length !== 0 ? (
        responseData.map((el) => (
          <div className={style.existingNotesWrapper} key={el._id}>
            <div className={style.generalNoteWrapper}>
              <div className={style.noteWrapper}>
                <img
                  className={style.checkMarkImg}
                  src={!el.completedTask ? checkMarkEmptyImg : checkMarkImg}
                  alt='checkMarkImg'
                  onClick={() => doCompleteTask(el._id, el.completedTask)}
                />
                <p className={!el.completedTask ? style.noteTitle : style.noteCompleteTitle}>{el.title}</p>
                <p className={style.noteDescription}>{el.description}</p>
              </div>

              <div className={style.iconsNoteWrapper}>
                <img className={style.pencilImg} src={pencilImg} alt='pencilImg' onClick={() => getByIdData(el._id)} />
                <img className={style.garbageCanImg} src={garbageCanImg} alt='garbageCanImg' onClick={() => deleteData(el._id)} />
              </div>
            </div>

            <div className={style.line}></div>
          </div>
        ))
      ) : (
        <div className={style.emptyWrapper}>
          <img src={detectiveImg} alt='detectiveImg' />
          <p>Empty...</p>
        </div>
      )}

      <div className={style.updateWrapper}>
        <h1>Update Note</h1>

        <div className={style.updateNoteWrapper}>
          <input type='text' placeholder='Input your note...' name='title' value={responseDataById?.title || ''} onChange={doUpdateData} />
          <input
            type='text'
            placeholder='Input your description note...'
            name='description'
            value={responseDataById?.description || ''}
            onChange={doUpdateData}
          />
          <button>cancel</button>
          <button onClick={() => updateData(responseDataById._id, responseDataById)}>apply</button>
        </div>
      </div>
    </div>
  );
}
