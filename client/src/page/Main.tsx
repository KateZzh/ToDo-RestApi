import style from './Main.style.module.scss';
import detectiveImg from '../assets/detective.png';
import checkMarkImg from '../assets/checkMark.svg';
import checkMarkEmptyImg from '../assets/checkMarkEmpty.svg';
import pencilImg from '../assets/pencil.svg';
import garbageCanImg from '../assets/garbageCan.svg';
import { useState } from 'react';
import useRequestData from '../hooks/useRequestData';
import { iTasks } from '../interfaces';
import Modal from '../components/Modal/Modal';
import useGetDate from '../hooks/useGetDate';

export default function Main() {
  const [inp, setInp] = useState({ title: '', description: '', completedTask: false });
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { getData, responseGetData } = useGetDate('http://localhost:3000/task/');

  const { createData, deleteData, updateData, getByIdData, responseDataById } = useRequestData('http://localhost:3000/task/');

  function fillInputs(e: React.ChangeEvent<HTMLInputElement>) {
    setInp({ ...inp, [e.target.name]: e.target.value });
  }

  async function doCreateData() {
    await createData(inp);
    await getData();

    setInp({ title: '', description: '', completedTask: false });
  }

  async function doCompleteTask(_id: string, flag: boolean) {
    await updateData(_id, { completedTask: !flag });
    await getData();
  }

  async function doDeleteTask(_id: string) {
    await deleteData(_id);
    await getData();
  }

  async function openModalWindow(_id: string) {
    await getByIdData(_id);
    setOpenModal(true);
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

      {responseGetData.responseData.length ? (
        responseGetData.responseData.map((el: iTasks) => (
          <div className={style.existingNotesWrapper} key={el._id}>
            <div className={style.generalNoteWrapper}>
              <div className={style.noteWrapper}>
                <img
                  className={style.checkMarkImg}
                  src={!el.completedTask ? checkMarkEmptyImg : checkMarkImg}
                  alt='checkMarkImg'
                  onClick={() => doCompleteTask(el._id, el.completedTask)}
                />
                <p className={!el.completedTask ? style.noteTitle : style.noteTitleComplete}>{el.title}</p>
                <p className={!el.completedTask ? style.noteDescription : style.noteDescriptionComplete}>{el.description}</p>
              </div>

              <div className={style.iconsNoteWrapper}>
                <img className={style.pencilImg} src={pencilImg} alt='pencilImg' onClick={() => openModalWindow(el._id)} />
                <img className={style.garbageCanImg} src={garbageCanImg} alt='garbageCanImg' onClick={() => doDeleteTask(el._id)} />
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

      {openModal && <Modal setOpenModal={setOpenModal} getData={getData} responseDataById={responseDataById} />}
    </div>
  );
}
