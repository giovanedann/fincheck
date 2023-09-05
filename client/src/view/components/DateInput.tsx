import { CrossCircledIcon } from '@radix-ui/react-icons';
import { useCallback, useState } from 'react';

import { cn } from 'app/utils/cn';
import { formatDate } from 'app/utils/formatDate';
import { DatePicker, Popover } from '.';

type DateInputProps = {
  error?: string;
  className?: string;
}

export function DateInput({ className, error }: DateInputProps) {
  const [date, setDate] = useState<Date>(new Date())

  const handleDateChange = useCallback((date: Date) => {
    setDate(date)
  }, [])

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={
              cn(
                'bg-white w-full rounded-lg border border-gray-500 focus:border-gray-800 px-3 h-[52px] text-gray-700 transition-all ease-in-out duration-300 outline-none text-left relative pt-4',
                error && '!border-red-900',
                className
              )
            }
          >
            <span className="absolute text-gray-700 text-xs left-[13px] top-2 pointer-events-none block">
              Date
            </span>

            <span className="mt-1 block">
              {formatDate(date)}
            </span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker value={date} onChange={handleDateChange} />
        </Popover.Content>
      </Popover.Root>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-sm">
            {error}
          </span>
        </div>
      )}
    </div>
  )
}
