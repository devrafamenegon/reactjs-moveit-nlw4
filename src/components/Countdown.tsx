import { useState, useEffect, useContext } from 'react'; //o useEffect nos permite disparar efeitos colaterais
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

//variável global com o tipo timeOut
let countdownTimeOut: NodeJS.Timeout;

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  //o PadStart verifica se a string tem 2 caracteres, caso não tenha, ele adiciona um zero à esquerda, exemplo: 5 → 05
  //o Split vai separar nossa string em arrays, dando a posição de cada um, exemplo: 05 → [(0,0), (1,5)]
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeOut); //utilizamos esta variavel para cancelar a contagem do timer, pois antes, ao finalizarmos o ciclo, o setTimeOut ainda contava 1 segundo a mais
    setIsActive(false);
    setTime(0.1 * 60);
  }

  //eu quero executar uma função sempre que o valor de active mudar
  useEffect(() => {
    if (isActive && time > 0) {
      //quero que algo, no caso uma função, aconteça depois de um tempo, no caso um segundo
      countdownTimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]) //sempre que estas variáveis mudarem de valor, o useEffect executa sua função

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

      {/* os && permitem termos um if com apenas o then, oq teriamos q usar ?? e dps null, não é mais necessario */}
      { hasFinished ? (

        <button
          disabled
          type="button" 
          className={`${styles.countdownButton}`}
        >
          Ciclo encerrado
        </button>

      ) : (

        <>
          { isActive ? (
        
            <button 
              type="button" 
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>

          ) : (

            <button 
              type="button" 
              className={styles.countdownButton} 
              onClick={startCountdown}
            >
              Iniciar um clico
            </button>

          )}
        </>

      )}

    </div>
    
  );
}