import { Link } from "react-router-dom";

export function Login() {
  return (
    <div>
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
    </div>
  )
}
