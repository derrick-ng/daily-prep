import RegisterForm from "@/app/components/auth/RegisterForm";
import Link from "next/link";

// https://nextjs.org/docs/pages/building-your-application/data-fetching/forms-and-mutations
const Register = () => {
  return (
    <div>
      <Link href="./login">
        <button>Login</button>
      </Link>
      <RegisterForm />
    </div>
  );
};

export default Register;
