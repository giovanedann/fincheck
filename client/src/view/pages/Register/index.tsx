import { Link } from "react-router-dom";
import { Button, Input } from "../../components";

export function Register() {
  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Sign up
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Already have an account?
          </span>
          <Link to="/login" className="tracking-[-0.5px] font-medium text-teal-900">
            Sign in
          </Link>
        </p>
      </header>

      <form className="mt-[60px] flex flex-col gap-4">
        <Input name="name" type="text" placeholder="Name" />
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Password" />
        <Input name="password-confirmation" type="password" placeholder="Password confirmation" />

        <Button type="submit" className="mt-2">
          Sign up
        </Button>
      </form>
    </>
  )
}
