import { useState } from "react";
import {
  getAuth,
  signInWithCredential,
  PhoneAuthProvider,
} from "firebase/auth";

export function useProvideAuth() {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const sendVerificationCode = async (phoneNumber, recaptchaVerifier) => {
    try {
      const auth = getAuth();
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      return verificationId;
    } catch (err) {
      console.log(err);
    }
  };

  const signinWithPhone = async (verificationId, verificationCode) => {
    try {
      const auth = getAuth();
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await signInWithCredential(auth, credential).then((response) => {
        console.log(response);
        handleUser(response.user);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const signout = () => {
    const auth = getAuth();
    auth.signOut().then(() => handleUser(false));
  };

  return {
    user,
    loading,
    sendVerificationCode,
    signinWithPhone,
    signout,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
  };
};
