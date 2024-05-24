import style from './Modal.style.module.scss';
import { iTasks } from '../../interfaces/index';
import useRequestData from '../../hooks/useRequestData';
import { useState } from 'react';

interface iProps {
  setOpenModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  responseDataById: iTasks;
  getData: () => Promise<void>;
}

export default function Modal({ responseDataById, setOpenModal, getData }: iProps) {
  const [inp, setInp] = useState({ title: responseDataById.title || '', description: responseDataById.description || '', completedTask: false });

  const { updateData } = useRequestData('http://localhost:3000/task/');

  function fillInputs(e: React.ChangeEvent<HTMLInputElement>) {
    setInp({ ...inp, [e.target.name]: e.target.value });
  }

  async function doUpdateAndClose() {
    await updateData(responseDataById._id, inp);
    await getData();

    setOpenModal(false);
  }

  return (
    <div className={style.container}>
      <div className={style.updateWrapper}>
        <h1>Update Note</h1>

        <div className={style.updateNoteWrapper}>
          <input type='text' placeholder='Input your note...' name='title' value={inp.title} onChange={fillInputs} />
          <input type='text' placeholder='Input your description note...' name='description' value={inp.description} onChange={fillInputs} />
          <div className={style.buttonsWrapper}>
            <button className={style.cancelButton} onClick={() => setOpenModal(false)}>
              cancel
            </button>
            <button onClick={doUpdateAndClose}>apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}
