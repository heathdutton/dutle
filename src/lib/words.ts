import { WRONG_SPOT_MESSAGE, NOT_CONTAINED_MESSAGE } from '../constants/strings'
import { getGuessStatuses } from './statuses'
import { default as GraphemeSplitter } from 'grapheme-splitter'
import { MAX_WORD_LENGTH } from '../constants/settings'


const isRepeatingNumber = (guess: string) => {
  const arr = guess.split("")
  return new Set(arr).size !== arr.length
}

const isValidNumber = (num: string) => {
 
  return num.length === MAX_WORD_LENGTH && /^\d+$/.test(num) && !isRepeatingNumber(num)
}

export const isWordInWordList = (word: string) => {
  return isValidNumber(word)
  // return (
  //   WORDS.includes(localeAwareLowerCase(word)) ||
  //   VALID_GUESSES.includes(localeAwareLowerCase(word))
  // )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  if (guesses.length === 0) {
    return false
  }

  const lettersLeftArray = new Array<string>()
  const guess = guesses[guesses.length - 1]
  const statuses = getGuessStatuses(guess)
  const splitWord = unicodeSplit(word)
  const splitGuess = unicodeSplit(guess)

  for (let i = 0; i < splitGuess.length; i++) {
    if (statuses[i] === 'correct' || statuses[i] === 'present') {
      lettersLeftArray.push(splitGuess[i])
    }
    if (statuses[i] === 'correct' && splitWord[i] !== splitGuess[i]) {
      return WRONG_SPOT_MESSAGE(splitGuess[i], i + 1)
    }
  }

  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n
  for (const letter of splitWord) {
    n = lettersLeftArray.indexOf(letter)
    if (n !== -1) {
      lettersLeftArray.splice(n, 1)
    }
  }

  if (lettersLeftArray.length > 0) {
    return NOT_CONTAINED_MESSAGE(lettersLeftArray[0])
  }
  return false
}

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase()
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date(2022, 0).valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  return {
    solution: getRandomNumber(MAX_WORD_LENGTH), //getWord(), //WORDS[index % WORDS.length],
    solutionIndex: index,
    tomorrow: nextday,
  }
}

function getRandomNumber(size: number){
  var newNums = new Set();
  var num = [];

  while(num.length < size){

    const randomNum = Math.floor(Math.random() * 10);

    
    if(!newNums.has(randomNum)){

      num.push(randomNum)
      newNums.add(randomNum)
      
    }   

  }

  return num.join('');
}

function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getWord(){
  const words = [];
  for(var i=0; i < Math.pow(10, MAX_WORD_LENGTH); i++){
    const num = i.toString().padStart(MAX_WORD_LENGTH, '0');
    if(!isRepeatingNumber(num)){
      words.push(num)
    }

  }

  shuffleArray(words)

  return words[0]
}
export let { solution, solutionIndex, tomorrow}  = getWordOfDay();

export function setNewSolution() {
  const newSolution = getWordOfDay()
  
  solution = newSolution.solution
  solutionIndex = newSolution.solutionIndex
  tomorrow = newSolution.tomorrow
  
} 
