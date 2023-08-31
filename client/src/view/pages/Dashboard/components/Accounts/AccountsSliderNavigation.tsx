import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useSwiper } from 'swiper/react';

type AccountsSliderNavigation = {
  isBeginning: boolean
  isEnd: boolean
}

export function AccountsSliderNavigation({ isBeginning, isEnd }: AccountsSliderNavigation) {
  const swiper = useSwiper()

  return (
    <div>
      <button
        className="hover:enabled:bg-black/10 py-3 pl-2.5 pr-3.5 rounded-full transition-colors duration-300 ease-in-out disabled:opacity-40"
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
      >
        <ChevronLeftIcon className="text-white w-6 h-6" />
      </button>

      <button
        className="hover:enabled:bg-black/10 py-3 pl-2.5 pr-3.5 rounded-full transition-colors duration-300 ease-in-out disabled:opacity-40"
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
      >
        <ChevronRightIcon className="text-white w-6 h-6" />
      </button>
    </div>
  )
}
