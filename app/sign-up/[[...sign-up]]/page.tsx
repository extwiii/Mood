import { SignUp } from '@clerk/nextjs'

export default function SignupPage() {
  return <SignUp redirectUrl="/new-user" afterSignUpUrl="/new-user" />
}
