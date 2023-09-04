import { NumericFormat } from 'react-number-format';

export function CurrencyInput() {
  return (
    <NumericFormat
      className="text-gray-900 text-[2rem] font-bold tracking-[-1px] outline-none"
      thousandSeparator="."
      decimalSeparator=","
    />
  )
}
