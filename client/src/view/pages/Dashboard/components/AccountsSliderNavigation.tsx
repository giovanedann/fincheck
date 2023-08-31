import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

export function AccountsSliderNavigation() {
  const swiper = useSwiper()

  return (
    <div>
      <button
        className="hover:enabled:bg-black/10 py-3 pl-2.5 pr-3.5 rounded-full transition-colors duration-300 ease-in-out disabled:opacity-40"
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeftIcon className="text-white w-6 h-6" />
      </button>

      <button
        className="hover:enabled:bg-black/10 py-3 pl-2.5 pr-3.5 rounded-full transition-colors duration-300 ease-in-out disabled:opacity-40"
        onClick={() => swiper.slideNext()}
      >
        <ChevronRightIcon className="text-white w-6 h-6" />
      </button>
    </div>
  )
}
