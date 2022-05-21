import { Button } from "react-native";
import { useAuth } from "../lib/hooks";

export function SignInScreen() {
  const auth = useAuth();
  return <Button title="signin" onPress={() => auth.signinWithGoogle()} />;
}
