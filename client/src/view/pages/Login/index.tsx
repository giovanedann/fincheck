import { Link } from "react-router-dom";
import { Button, Input } from "../../components";
import { useLogin } from "./hooks/useLogin";

export function Login() {
  const { handleSubmit, register, errors } = useLogin()

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
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

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input
          type="email"
          placeholder="E-mail"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          type="password"
          placeholder="Password"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" className="mt-2">
          Sign in
        </Button>
      </form>
    </>
  )
}
