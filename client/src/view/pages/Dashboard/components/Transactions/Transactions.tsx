import { Swiper, SwiperSlide } from 'swiper/react';

import { MONTHS } from 'app/config/constants';
import { formatCurrency, formatDate } from 'app/utils';
import { cn } from 'app/utils';

import { CategoryIcon, FilterIcon } from 'view/icons';
import { MonthSliderOption, MonthSliderNavigation, TransactionTypeDropdown, FiltersModal } from '.';
import { Spinner } from 'view/components';
import emptyStateImage from 'assets/images/empty-state.svg'

import { useDashboardTransactions } from './hooks/useDashboardTransactions';

export function Transactions() {
  const {
    areValuesVisible,
    isInitialLoading,
    transactions,
    isLoading,
    filters,
    isFiltersModalOpen,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    handleChangeFilters,
    handleApplyFiltersModal
  } = useDashboardTransactions()

  const hasTransactions = transactions.length > 0

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
      {isInitialLoading && (
        <div className="w-full h-full grid place-items-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFiltersModal}
          />

          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters('transactionType')}
                selectedType={filters['transactionType']}
              />

              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                initialSlide={filters.month}
                centeredSlides
                onSlideChange={(swiper) => {
                  handleChangeFilters('month')(swiper.realIndex)
                }}
              >
                <MonthSliderNavigation />

                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <MonthSliderOption isActive={isActive} month={month} index={index} />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <Spinner className="h-10 w-10" />
              </div>
            )}

            {(!hasTransactions && !isLoading) && (
              <div className="flex flex-col items-center justify-center h-full">
                <>
                  <img src={emptyStateImage} alt="Girl searching for money in empty bags with a bloom in her eyes" />
                  <p className="text-gray-700">No transactions found!</p>
                </>
              </div>
            )}

            {(hasTransactions && !isLoading) && (
              transactions.map((transaction) => (
                <div key={transaction.id} className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon
                      type={transaction.type === 'EXPENSE' ? 'expense' : 'income'}
                      category={transaction.category?.icon}
                    />

                    <div>
                      <strong className="font-bold tracking-[-0.5px]">
                        {transaction.name}
                      </strong>

                      <span className="text-sm text-gray-600 block">
                        {formatDate(new Date(transaction.date))}
                      </span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'tracking-[-0.5px] transition-all duration-300 ease-in-out',
                      !areValuesVisible && 'blur-sm',
                      transaction.type === 'EXPENSE' ? 'text-red-800' : 'text-green-800'

                    )}
                  >
                    {transaction.type === 'EXPENSE' ? '- ' : '+ '}
                    {formatCurrency(transaction.value)}
                  </span>
                </div>
              ))
            )}
          </div>
        </>
      )}

    </div>
  )
}
