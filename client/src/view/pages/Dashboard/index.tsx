import { Logo, UserMenu } from 'view/components';
import { Accounts, Fab, Transactions } from './components';
import { useAuth } from 'app/hooks/useAuth';
import { DashboardProvider } from './context';
import { NewAccountModal } from './modals';

export function Dashboard() {
  const { loggedUserData } = useAuth()

  return (
    <DashboardProvider>
      <div className="w-full h-full p-4 lg:px-8 lg:pb-8 lg:pt-6 flex flex-col gap-4">
        <header className="h-12 flex items-center justify-between">
          <Logo className="h-6 text-teal-900" />
          <UserMenu name={loggedUserData!.name} />
        </header>

        <main className="flex-1 flex flex-col lg:flex-row gap-4 max-h-[90%] lg:max-h-[95%]">
          <div className="w-full lg:w-1/2 h-full">
            <Accounts />
          </div>

          <div className="w-full lg:w-1/2 h-full">
            <Transactions />
          </div>
        </main>

        <Fab />

        <NewAccountModal />
      </div>
    </DashboardProvider>
  )
}
