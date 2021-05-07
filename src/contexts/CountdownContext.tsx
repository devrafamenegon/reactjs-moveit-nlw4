import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  // O ReactNode aceita qualquer elemento como filho, tag, componente, etc...
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

//variável global com o tipo timeOut
let countdownTimeOut: NodeJS.Timeout;

//retornar todos os valores que nós armazenamos no contexto
export function CountdownProvider({ children }) {
  const { startNewChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeOut); //utilizamos esta variavel para cancelar a contagem do timer, pois antes, ao finalizarmos o ciclo, o setTimeOut ainda contava 1 segundo a mais
    setIsActive(false);
    setHasFinished(false);
    setTime(0.1 * 15000);
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

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown,
    }}>
      {children}
    </CountdownContext.Provider>
  );
}