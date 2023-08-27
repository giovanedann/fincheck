import { Link } from "react-router-dom";
import { Button, Input } from "../components";

export function Login() {
  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Sign in
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Don't have an account?
          </span>
          <Link to="/register" className="tracking-[-0.5px] font-medium text-teal-900">
            Sign up now
          </Link>
        </p>
      </header>

      <form className="mt-[60px] flex flex-col gap-4">
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Password" />

        <Button type="submit" className="mt-2">
          Sign in
        </Button>
      </form>
    </>
  )
}
