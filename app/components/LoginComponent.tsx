import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

interface LoginComponentProps {
  //   clientId: string;
  onSuccess: (response: any) => void;
  onError: () => void;
}

//
// https://www.npmjs.com/package/@react-oauth/google
function LoginComponent({ onSuccess, onError }: LoginComponentProps): any {
  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log("OAuth success: ", response);
      onSuccess(response);
    },
    onError: (error) => console.log(error),
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/gmail.readonly",
  });

  return (
    <div>
      <button onClick={() => login()}>Google Login</button>
    </div>
  );
}

export default LoginComponent;
