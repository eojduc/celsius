import { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

export function useProvideAuth() {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "1077510880187-aqodq91gb59lo0lt2l8phg80c2u3sm6d.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then((response) =>
        handleUser(response.user)
      );
    }
  }, [response]);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      setLoading(false);
      setUser(user);
      return user;
    } else {
      setLoading(false);
      setUser(false);
      return false;
    }
  };

  const signinWithGoogle = () => {
    setLoading(true);
    promptAsync();
  };

  const signout = () => {
    const auth = getAuth();
    auth.signOut().then(() => handleUser(false));
  };

  return {
    user,
    loading,
    signinWithGoogle,
    signout,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  };
};
