import React from 'react'
import LoginForm from '../../components/LoginForm'
import Link from 'next/link'

const UsersPage = () => {
  return (
    <div className='justify-center'>
      <LoginForm />
      <Link href="/register">Sign Up</Link>
    </div>
  )
}

export default UsersPage