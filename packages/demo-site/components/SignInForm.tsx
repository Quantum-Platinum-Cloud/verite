import { signIn } from "next-auth/client"
import { FC, useState } from "react"
import { LoadingButton } from "./LoadingButton"

type Props = {
  redirectTo?: string
}

const sampleUsers = [
  { email: "alice@test.com", password: "testing" },
  { email: "bob@test.com", password: "testing" },
  { email: "sean@test.com", password: "testing" },
  { email: "kim@test.com", password: "testing" },
  { email: "brice@test.com", password: "testing" },
  { email: "matt@test.com", password: "testing" }
]

type SampleUser = typeof sampleUsers[0]

const SignInForm: FC<Props> = ({ redirectTo }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [currentLoadingUser, setCurrentLoadingUser] = useState<SampleUser>(null)
  const [isFormLoading, setIsFormLoading] = useState(false)

  const emailSignin = (e) => {
    e.preventDefault()
    setIsFormLoading(true)
    signIn("credentials", { email, password, callbackUrl: redirectTo })
  }

  const signInAs = (sampleUser: SampleUser) => {
    setCurrentLoadingUser(sampleUser)
    signIn("credentials", {
      email: sampleUser.email,
      password: sampleUser.password,
      callbackUrl: redirectTo
    })
  }

  return (
    <form
      className="max-w-sm mx-auto mt-6 space-y-6"
      method="POST"
      onSubmit={emailSignin}
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            type="email"
            autoComplete="email"
            required
            autoFocus={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none dark:placeholder-gray-200 dark:border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            type="password"
            autoComplete="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none dark:placeholder-gray-200 dark:border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <LoadingButton
          loading={isFormLoading}
          type="submit"
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign in
        </LoadingButton>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-gray-500 bg-white">
            or use a sample user:
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {sampleUsers.map((sampleUser) => (
          <LoadingButton
            key={sampleUser.email}
            loading={currentLoadingUser === sampleUser}
            onClick={() => {
              signInAs(sampleUser)
            }}
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            {sampleUser.email}
          </LoadingButton>
        ))}
      </div>
    </form>
  )
}

export default SignInForm
