import auth from '@react-native-firebase/auth';

export const registerWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    return userCredential.user; // Returns the created user object
  } catch (error) {
    throw error;
  }
};

// Login User
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return userCredential.user; // Returns the signed-in user object
  } catch (error) {
    throw error;
  }
};
