import { EyeIcon } from "../../../icons";

export function Accounts() {
  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 lg:p-10">
      <div>
        <span className="tracking-[-0.5px] text-white block">Total balance</span>

        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">R$ 10.340,00</strong>
          <button className="w-8 h-8 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>
    </div>
  )
}
