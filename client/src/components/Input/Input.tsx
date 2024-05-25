import { iInp, iArrayInp } from '../../interfaces/index';

interface iProps {
  inp: iInp;
  setInp: (value: iInp | ((prevVar: iInp) => iInp)) => void;
  arrayInp: iArrayInp[];
}

export default function Input({ inp, setInp, arrayInp }: iProps) {
  function fillInputs(e: React.ChangeEvent<HTMLInputElement>) {
    setInp({ ...inp, [e.target.name]: e.target.value });
  }

  return (
    <>
      {arrayInp.map((el, index) => (
        <input key={index} type='text' placeholder={el.placeholder} name={el.name} value={inp[el.name] as string} onChange={fillInputs} />
      ))}
    </>
  );
}
