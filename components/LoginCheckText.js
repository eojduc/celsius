import { Text, Button } from "react-native";
import { useAuth } from "../lib/hooks";

const LoginCheckText = () => {
  const auth = useAuth();
  console.log(auth.user);

  return (
    <>
      <Button title="login" onPress={() => auth.signinWithGoogle()} />
      {auth.user ? (
        <>
          <Text>logged in</Text>
          <Button title="log out" onPress={() => auth.signout()} />
        </>
      ) : (
        <>
          <Text>not logged in</Text>
        </>
      )}
    </>
  );
};

export default LoginCheckText;
