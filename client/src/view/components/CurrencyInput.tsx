import { CrossCircledIcon } from '@radix-ui/react-icons';
import { cn } from 'app/utils';
import { NumericFormat } from 'react-number-format';

type CurrencyInputProps = {
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function CurrencyInput({ error, onChange, value }: CurrencyInputProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator=","
        decimalSeparator="."
        value={value}
        onChange={event => onChange?.(event.target.value)}
        className={
          cn(
            'w-full text-gray-800 text-[2rem] font-bold tracking-[-1px] outline-none',
            error && 'text-red-900'
          )
        }
      />

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
