import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithCredential,
  PhoneAuthProvider,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useProvideAuth() {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  const loadStorageData = async () => {
    try {
      const userDataSerialized = await AsyncStorage.getItem("@AuthData");
      if (userDataSerialized) {
        const _userData = JSON.parse(userDataSerialized);
        setUser(_userData);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

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
        handleUser(response.user);
        AsyncStorage.setItem('@AuthData', JSON.stringify(response.user));
      });
    } catch (err) {
      console.log(err);
    }
  };

  const signout = async () => {
    const auth = getAuth();
    auth.signOut().then(() => handleUser(false));
    await AsyncStorage.removeItem('@AuthData');
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
