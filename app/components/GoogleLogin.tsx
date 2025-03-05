import { useGoogleLogin } from "@react-oauth/google";
import { JSX } from "react";

interface AuthCodeResponse {
  code: string;
}

interface LoginComponentProps {
  //   clientId: string;
  onSuccess: (response: AuthCodeResponse) => void;
  onError: () => void;
}

//
// https://www.npmjs.com/package/@react-oauth/google
function GoogleLogin({ onSuccess }: LoginComponentProps): JSX.Element {
  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log("OAuth success: ");
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

export default GoogleLogin;
