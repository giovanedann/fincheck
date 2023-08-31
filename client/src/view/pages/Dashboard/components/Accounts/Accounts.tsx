import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css'
import { EyeIcon } from '../../../../icons';
import { AccountsSliderNavigation } from './AccountsSliderNavigation';
import { AccountCard } from '.';
import { useAccounts } from './hooks/useAccounts';

export function Accounts() {
  const { setSliderState, sliderState } = useAccounts()

  return (
    <div className="bg-teal-900 flex flex-col rounded-2xl w-full h-full px-4 py-8 lg:p-10">
      <div>
        <span className="tracking-[-0.5px] text-white block">
          Total balance
        </span>

        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">
            R$ 10.340,00
          </strong>

          <button className="w-8 h-8 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={2.1}
            onSlideChange={({ isBeginning, isEnd }) => {
              setSliderState({
                isBeginning,
                isEnd
              })
            }}
          >
            <div className="flex items-center justify-between mb-4" slot="container-start">
              <strong className="text-white tracking-[-1px] text-lg font-bold">
                My bank accounts
              </strong>

              <AccountsSliderNavigation
                isBeginning={sliderState.isBeginning}
                isEnd={sliderState.isEnd}
              />
            </div>

            <SwiperSlide>
              <AccountCard color="#7950f2" balance={1202.56} name="Nubank" type="CHECKING" />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard color="#000" balance={1440.56} name="XP Investimentos" type="CASH" />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard color="#f81b13" balance={2503.56} name="Santander" type="INVESTMENT" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  )
}
