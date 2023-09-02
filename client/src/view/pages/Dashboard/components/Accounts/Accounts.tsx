import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css'

import { useWindowWidth } from 'app/hooks/useWindowWidth';
import { formatCurrency } from 'app/utils/formatCurrency';

import { EyeIcon } from 'view/icons';
import { useAccounts } from './hooks/useAccounts';
import { AccountCard, AccountsSliderNavigation } from '.';
import { cn } from 'app/utils/cn';
import { Spinner } from 'view/components';
import { PlusIcon } from '@radix-ui/react-icons';

export function Accounts() {
  const windowWidth = useWindowWidth()

  const {
    setSliderState,
    sliderState,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading,
    accounts
  } = useAccounts()

  return (
    <div className="bg-teal-900 flex flex-col rounded-2xl w-full h-full px-4 py-8 lg:p-10">
      {isLoading && (
        <div className="w-full h-full grid place-items-center">
          <Spinner className="text-teal-950/50 fill-white w-10 h-10" />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="tracking-[-0.5px] text-white block">
              Total balance
            </span>

            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  'text-2xl tracking-[-1px] text-white transition-all duration-300 ease-in-out',
                  !areValuesVisible && 'blur-md'
                )}
              >
                {formatCurrency(10345.95)}
              </strong>

              <button className="w-8 h-8 flex items-center justify-center" onClick={toggleValuesVisibility}>
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            {accounts.length === 0 && (
              <>
                <div className="mb-4" slot="container-start">
                  <strong className="text-white tracking-[-1px] text-lg font-bold">
                    My bank accounts
                  </strong>
                </div>

                <button className="mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col items-center justify-center gap-4 text-white">
                  <div className="h-11 w-11 rounded-full border-2 border-dashed border-white grid place-items-center">
                    <PlusIcon className="w-6 h-6" />
                  </div>

                  <span className="tracking-[-0.5px] font-medium block w-32 text-center">
                    Add new bank account
                  </span>
                </button>
              </>
            )}

            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={windowWidth > 550 ? 2.1 : 1.1}
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
            )}
          </div>
        </>
      )}
    </div>
  )
}
