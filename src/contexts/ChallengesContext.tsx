import { createContext, useState, ReactNode } from 'react';
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
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(30);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  
  const [activeChallenge, setActiveChallenge] = useState(null);

  //4 é o fator de experiencia, posso aumentar ou diminuir
  //2 é a potência
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
  
  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge)
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