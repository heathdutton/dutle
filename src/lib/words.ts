import {
  WRONG_SPOT_MESSAGE,
  NOT_CONTAINED_MESSAGE,
  NAME_ENUM,
} from '../constants/strings'
import { getGuessStatuses } from './statuses'
import { default as GraphemeSplitter } from 'grapheme-splitter'
import { MAX_WORD_LENGTH } from '../constants/settings'

const isRepeating = (guess: string) => {
  const arr = guess.split('')
  return new Set(arr).size !== arr.length
}

export const isWordInWordList = (word: string) => {
  for (let i = 0; i < word.length; i++) {
    if (typeof NAME_ENUM[word[i]] == 'undefined') {
      return false
    }
  }
  return word.length === MAX_WORD_LENGTH && !isRepeating(word)
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
  const epochMs = new Date(2022, 5, 3).valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  return {
    solution: getTodaysTopFive(index),
    solutionIndex: index,
    tomorrow: nextday,
  }
}

function getTodaysTopFive(gameIndex: number) {
  const unshuffled = [
    'h',
    'a',
    'p',
    'b',
    '1',
    'c',
    'l',
    'j',
    'e',
    'r',
    'm',
    '0',
  ]
  let shuffled = shuffle(unshuffled, gameIndex)

  const weigtedTopFive: string[] = selectWeightedFive(shuffled)

  return weigtedTopFive.join('')
}

function selectWeightedFive(shuffled: string[]) {
  let potentialTopFive = shuffled.slice(0, 5)
  const alternates: string[] = shuffled.slice(5, shuffled.length - 1)

  const weigtedTopFive: string[] = []
  potentialTopFive.forEach((person) => {
    if (person === '0' && weigtedTopFive.length < 5) {
      weigtedTopFive.push(alternates.pop() as string)
    } else {
      weigtedTopFive.push(person)
    }
  })
  return weigtedTopFive
}

function shuffle(array: string[], seed: number) {
  // <-- ADDED ARGUMENT
  var m = array.length,
    t,
    i

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(random(seed) * m--) // <-- MODIFIED LINE

    // And swap it with the current element.
    t = array[m]
    array[m] = array[i]
    array[i] = t
    ++seed // <-- ADDED LINE
  }

  return array
}

function random(seed: number) {
  var x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export let { solution, solutionIndex, tomorrow } = getWordOfDay()

export function setNewSolution() {
  const newSolution = getWordOfDay()

  solution = newSolution.solution
  solutionIndex = newSolution.solutionIndex
  tomorrow = newSolution.tomorrow
}
