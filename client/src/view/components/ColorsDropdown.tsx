import { ChevronDownIcon, CrossCircledIcon } from '@radix-ui/react-icons';

import { Dropdown } from '.';

import { cn } from 'app/utils';
import { ColorIcon } from 'view/icons';
import { useState } from 'react';

type Color = {
  color: string;
  bg: string;
};

const colors: Color[] = [
  { color: '#868E96', bg: '#F8F9FA' },
  { color: '#FA5252', bg: '#FFF5F5' },
  { color: '#E64980', bg: '#FFF0F6' },
  { color: '#BE4BDB', bg: '#F8F0FC' },
  { color: '#7950F2', bg: '#F3F0FF' },
  { color: '#4C6EF5', bg: '#EDF2FF' },
  { color: '#228BE6', bg: '#E7F5FF' },
  { color: '#15AABF', bg: '#E3FAFC' },
  { color: '#12B886', bg: '#E6FCF5' },
  { color: '#40C057', bg: '#EBFBEE' },
  { color: '#82C91E', bg: '#F4FCE3' },
  { color: '#FAB005', bg: '#FFF9DB' },
  { color: '#FD7E14', bg: '#FFF4E6' },
  { color: '#212529', bg: '#F8F9FA' },
];

type ColorsDropdownProps = {
  error?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function ColorsDropdown({ className, error, onChange, value }: ColorsDropdownProps) {
  const [selectedColor, setSelectedColor] = useState<Color | null>(() => {
    if (!value) return null

    return colors.find(({ color }) => color === value) ?? null
  })

  function handleSelect(color: Color) {
    setSelectedColor(color)
    onChange?.(color.color)
  }

  return (
    <div>
      <Dropdown.Root>
        <Dropdown.Trigger>
          <button
            className={
              cn(
                'bg-white w-full rounded-lg border border-gray-500 focus:border-gray-800 px-3 h-[52px] text-gray-700 transition-all ease-in-out duration-300 outline-none text-left relative',
                error && '!border-red-900',
                className
              )
            }
          >
            Color

            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {!selectedColor && (
                <ChevronDownIcon className="h-6 w-6 text-gray-800" />
              )}

              {selectedColor && (
                <ColorIcon color={selectedColor.color} bg={selectedColor.bg} />
              )}
            </div>
          </button>
        </Dropdown.Trigger>

        <Dropdown.Content className="grid grid-cols-4">
          {colors.map((color) => (
            <Dropdown.Item
              key={color.color}
              className="px-4"
              onSelect={() => handleSelect(color)}
            >
              <ColorIcon bg={color.bg} color={color.color} />
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown.Root>

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
