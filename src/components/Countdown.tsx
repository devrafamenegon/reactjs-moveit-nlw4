import { useState, useEffect } from 'react'; //o useEffect nos permite disparar efeitos colaterais
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false)

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  //o PadStart verifica se a string tem 2 caracteres, caso não tenha, ele adiciona um zero à esquerda, exemplo: 5 → 05
  //o Split vai separar nossa string em arrays, dando a posição de cada um, exemplo: 05 → [(0,0), (1,5)]
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setActive(true);
  }

  //eu quero executar uma função sempre que o valor de active mudar
  useEffect(() => {
    if (active && time > 0) {
      //quero que algo, no caso uma função, aconteça depois de um tempo, no caso um segundo
      setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    }
  }, [active, time])

  return(
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
          <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>  
      </div>

      <button 
        type="button" 
        className={styles.countdownButton} 
        onClick={startCountdown}>
        Iniciar um clico
      </button>
    </div>
    
  );
}