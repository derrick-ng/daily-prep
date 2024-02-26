import React from 'react'
import RegisterForm from '../../components/RegisterForm'
import Link from 'next/link'

const SignUpPage = () => {
  return (
    <div>
        <RegisterForm />
        <div>
          <Link href="/login">Login</Link>
        </div>
    </div>
  )
}

export default SignUpPage