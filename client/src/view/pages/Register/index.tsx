import { Link } from 'react-router-dom';
import { Button, Input } from 'view/components';
import { useRegister } from './hooks/useRegister';

export function Register() {
  const { errors, handleSubmit, register, isLoading } = useRegister()

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

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Name"
          error={errors.name?.message}
          {...register('name')}
        />
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
        <Input
          type="password"
          placeholder="Password confirmation"
          error={errors.passwordConfirmation?.message}
          {...register('passwordConfirmation')}
        />

        <Button type="submit" className="mt-2" isLoading={isLoading}>
          Sign up
        </Button>
      </form>
    </>
  )
}
