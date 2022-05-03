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
        Guess Momma Dutton's top 5 in 6 tries!
        <br /> After each guess, the color of the tiles will change to show how
        close your guess was.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="1"
          status="correct"
        />
        <Cell value="e" />
        <Cell value="a" />
        <Cell value="l" />
        <Cell value="p" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Chaz is in the top 5 and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="c" />
        <Cell value="h" />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="r"
          status="present"
        />
        <Cell value="b" />
        <Cell value="e" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Riley is in the top 5 but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="0" />
        <Cell value="m" />
        <Cell value="j" />
        <Cell isRevealing={true} isCompleted={true} value="b" status="absent" />
        <Cell value="c" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Bethany is not in the top 5 in any spot.
      </p>

      {!CAN_HAVE_DUPLICATE_DIGITS && (
        <>
          <div className="flex justify-center mb-1 mt-4">
            <Cell value="l" />
            <Cell value="l" />
            <Cell value="l" />
            <Cell value="l" />
            <Cell value="l" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Names CANNOT have more than one place... Lilli.
          </p>
        </>
      )}

      <p className="mt-6 italic text-gray-500 dark:text-gray-300 text-xs">
        This is fork by Heath Dutton of a fork by Logan Butler of an open source
        version of the word guessing game we all know and love -{' '}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="underline font-bold"
        >
          github
        </a>{' '}
      </p>
    </BaseModal>
  )
}
