import { MONTHS } from 'app/config/constants';
import { cn } from 'app/utils';
import { useSwiper } from 'swiper/react';

type MonthSliderOptionsProps = {
  isActive: boolean;
  month: typeof MONTHS[number];
  index: number;
}

export function MonthSliderOption({ isActive, month, index }: MonthSliderOptionsProps) {
  const swiper = useSwiper()

  return (
    <button
      className={
        cn(
          'w-full rounded-full h-12 text-sm text-gray-800 tracking-[-0.5px] font-medium',
          isActive && 'bg-white'
        )
      }
      onClick={() => swiper.slideTo(index)}
    >
      {month}
    </button>
  )
}
