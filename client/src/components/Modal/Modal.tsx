import style from './Modal.style.module.scss';

export default function Modal({ setOpenModal, responseDataById, setResponseDataById, updateData }) {
  function doUpdateData(e: React.ChangeEvent<HTMLInputElement>) {
    setResponseDataById({ ...responseDataById, [e.target.name]: e.target.value });
  }

  async function doUpdateAndClose() {
    await updateData(responseDataById._id, responseDataById);
    setOpenModal(false);
  }

  return (
    <div className={style.container}>
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
