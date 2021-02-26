import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json'

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  levelUp: () => void;

  currentExperience: number;
  experienceToNextLevel: number;
  
  challengesCompleted: number;
  startNewChallenge: () => void;

  activeChallenge: Challenge;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface ChallengesProviderProps {
  // O ReactNode aceita qualquer elemento como filho, tag, componente, etc...
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

//as outras propriedades que não são a children serão armazenadas na rest
export function ChallengesProvider({ 
  children, 
  ...rest 
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  
  const [activeChallenge, setActiveChallenge] = useState(null);

  //4 é o fator de experiencia, posso aumentar ou diminuir
  //2 é a potência
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
  
  //quando se passa um array vazio no segundo parâmetro, quer dizer que a função será executada uma vez quando o componente aparecer em tela
  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge () {
    if(!activeChallenge){
      return;
    }
    const { amount } = activeChallenge;
    
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      levelUp();
      finalExperience = finalExperience - experienceToNextLevel;
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    // Todos os elementos que est~]ao dentro do provider, possuem acesso aos seus dados passados no value, no caso o level e a função para incrementarmos o level
    <ChallengesContext.Provider value={
      { 
        level, 
        levelUp, 
        currentExperience, 
        challengesCompleted, 
        startNewChallenge, 
        activeChallenge, 
        resetChallenge, 
        experienceToNextLevel,
        completeChallenge,
      }
    }>
      {children}
    </ChallengesContext.Provider>
  );
}