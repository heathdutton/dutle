export const GAME_TITLE = process.env.REACT_APP_GAME_NAME!

export const WIN_MESSAGES = ['Great Job!', 'Awesome', 'Well done!']
export const GAME_COPIED_MESSAGE = 'Game copied to clipboard'
export const NOT_ENOUGH_LETTERS_MESSAGE = 'Not enough digits'
export const INVALID_GUESS_MESSAGE = 'Check your guesses'
export const HARD_MODE_ALERT_MESSAGE =
  'Hard Mode can only be enabled at the start!'
export const HARD_MODE_DESCRIPTION =
  'Any revealed hints must be used in subsequent guesses'
export const HIGH_CONTRAST_MODE_DESCRIPTION = 'For improved color vision'
export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `The number was ${solution}`
export const WRONG_SPOT_MESSAGE = (guess: string, position: number) =>
  `Must use ${guess} in position ${position}`
export const NOT_CONTAINED_MESSAGE = (letter: string) =>
  `Guess must contain ${letter}`
export const ENTER_TEXT = 'Enter'
export const DELETE_TEXT = 'Delete'
export const STATISTICS_TITLE = 'Statistics'
export const GUESS_DISTRIBUTION_TEXT = 'Guess Distribution'
export const NEW_WORD_TEXT = 'New number in'
export const SHARE_TEXT = 'Share'
export const TOTAL_TRIES_TEXT = 'Total tries'
export const SUCCESS_RATE_TEXT = 'Success rate'
export const CURRENT_STREAK_TEXT = 'Current streak'
export const BEST_STREAK_TEXT = 'Best streak'
export const START_NEW_GAME = 'Start New Game'

interface ButlerNamesInterface {
  [key: string]: string | undefined
}
export const BUTLER_NAME_ENUM: ButlerNamesInterface = {
  '1': 'Logan',
  '2': 'Sammantha',
  '3': 'Gerrit',
  '4': 'Holly',
  '5': 'Margo',
  '6': 'Cameron',
  '7': 'Cami',
}
