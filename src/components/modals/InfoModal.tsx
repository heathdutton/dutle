import { CAN_HAVE_DUPLICATE_DIGITS } from '../../constants/settings'
import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the number in 6 tries. After each guess, the color of the tiles will
        change to show how close your guess was to the number.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="1"
          status="correct"
        />
        <Cell value="2" />
        <Cell value="3" />
        <Cell value="4" />
        <Cell value="5" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The digit 1 is in the number and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="6" />
        <Cell value="5" />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="4"
          status="present"
        />
        <Cell value="3" />
        <Cell value="2" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The digit 4 is in the number but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="5" />
        <Cell value="4" />
        <Cell value="3" />
        <Cell isRevealing={true} isCompleted={true} value="2" status="absent" />
        <Cell value="1" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The digit 2 is not in the number in any spot.
      </p>

      {!CAN_HAVE_DUPLICATE_DIGITS && (
        <>
          <div className="flex justify-center mb-1 mt-4">
            <Cell value="7" />
            <Cell value="7" />
            <Cell value="7" />
            <Cell value="7" />
            <Cell value="7" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Numbers CANNOT have a digit more than one time. No duplicate digits.
          </p>
        </>
      )}

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        This is fork of an open source version of the word guessing game we all know and
        love -{' '}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="underline font-bold"
        >
          check out the code here
        </a>{' '}
      </p>
    </BaseModal>
  )
}
