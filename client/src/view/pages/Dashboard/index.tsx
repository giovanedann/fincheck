import { useAuth } from "../../../app/hooks/useAuth";
import { Button } from "../../components";

export function Dashboard() {
  const { signOut } = useAuth()

  return (
    <>
      <h1>Dashboard</h1>
      <Button onClick={signOut}>
        Sign out
      </Button>
    </>
  )
}
