import { Logo, UserMenu } from "../../components";
import { Accounts, Transactions } from "./components";

export function Dashboard() {
  return (
    <div className="w-full h-full p-4 lg:px-8 lg:pb-8 lg:pt-6 flex flex-col gap-4">
      <header className="h-12 flex items-center justify-between">
        <Logo className="h-6 text-teal-900" />
        <UserMenu name="Benimaru" />
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/2 h-full">
          <Accounts />
        </div>

        <div className="w-full lg:w-1/2 h-full">
          <Transactions />
        </div>
      </main>
    </div>
  )
}
