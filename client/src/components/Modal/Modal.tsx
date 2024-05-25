import style from './Modal.style.module.scss';
import { iTasks, iArrayInp } from '../../interfaces/index';
import { useState } from 'react';
import useRequestData from '../../hooks/useRequestData';
import Input from '../Input/Input';

interface iProps {
  setOpenModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  responseDataById: iTasks;
  getData: () => Promise<void>;
}

export default function Modal({ responseDataById, setOpenModal, getData }: iProps) {
  const [inp, setInp] = useState({ title: responseDataById.title || '', description: responseDataById.description || '', completedTask: false });

  const { updateData } = useRequestData('http://localhost:3000/task/');

  const arrayInp: iArrayInp[] = [
    { name: 'title', placeholder: 'Input your note...' },
    { name: 'description', placeholder: 'Input your description note...' },
  ];

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
          <Input inp={inp} setInp={setInp} arrayInp={arrayInp} />

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
