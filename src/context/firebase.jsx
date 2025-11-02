import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyAvRErxGQGg0xO1VZbO21mxqQoP1weRb6g",
  authDomain: "gusetform.firebaseapp.com",
  projectId: "gusetform",
  storageBucket: "gusetform.firebasestorage.app",
  messagingSenderId: "838619611037",
  appId: "1:838619611037:web:0329f7648bb8e41067f974"
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ firestore }}>
      {children}
    </FirebaseContext.Provider>
  );
};
