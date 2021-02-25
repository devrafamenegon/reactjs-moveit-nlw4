import { useContext } from 'react'; //o useEffect nos permite disparar efeitos colaterais
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const { minutes, seconds, hasFinished, isActive, startCountdown, resetCountdown  } = useContext(CountdownContext);

  //o PadStart verifica se a string tem 2 caracteres, caso não tenha, ele adiciona um zero à esquerda, exemplo: 5 → 05
  //o Split vai separar nossa string em arrays, dando a posição de cada um, exemplo: 05 → [(0,0), (1,5)]
  //isso não faz parte da regra de negócio, faz parte do layout, algo exclusivo do componente, por isso não mandamos para o context do countdown
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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