import {
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline'
import { MAX_WORD_LENGTH } from '../../constants/settings'
import { GAME_TITLE } from '../../constants/strings'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,
}: Props) => {
  return (
    <div className="navbar">
      <div className="navbar-content px-5">
        <div className="left-icons">
          <InformationCircleIcon
            className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
            onClick={() => setIsInfoModalOpen(true)}
          />
        </div>
        <p className="text-xl ml-2.5 font-bold dark:text-white">
          {GAME_TITLE} • top {MAX_WORD_LENGTH} of the day
        </p>
        <div className="right-icons">
          <ChartBarIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
          />
          <CogIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsSettingsModalOpen(true)}
          />
        </div>
      </div>
      <hr></hr>
    </div>
  )
}
