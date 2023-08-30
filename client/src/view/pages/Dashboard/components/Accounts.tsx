import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { EyeIcon } from "../../../icons";
import { AccountCard } from ".";

export function Accounts() {
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
        <div className="flex items-center justify-between">
          <strong className="text-white tracking-[-1px] text-lg font-bold">
            My bank accounts
          </strong>

          <div>
            <button
              className="hover:enabled:bg-black/10 py-3 pl-2.5 pr-3.5 rounded-full transition-colors duration-300 ease-in-out disabled:opacity-40"
            >
              <ChevronLeftIcon className="text-white w-6 h-6" />
            </button>

            <button
              className="hover:enabled:bg-black/10 py-3 pl-2.5 pr-3.5 rounded-full transition-colors duration-300 ease-in-out disabled:opacity-40"
            >
              <ChevronRightIcon className="text-white w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <AccountCard color="#7950f2" balance={1202.56} name="Nubank" />
        </div>
      </div>
    </div>
  )
}
