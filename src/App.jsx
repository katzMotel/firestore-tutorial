import ParentComponent from './components/ParentComponent';

import './App.css'
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut , onAuthStateChanged} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
//initialize firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);




function App() {
  const [email, setEmail] =useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  
useEffect(()=>{
  const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
    if(currentUser){
      //user is signed in
      setUser(currentUser);
    } else{
      //user is signed out
      setUser(null);
    }
  })
  return () => unsubscribe();
})

//Sign up
const signUp =()=>{
  createUserWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    setUser(userCredential.user);
    console.log('User signed up!', userCredential.user);
  })
  .catch(error =>{
    console.error('Error signing up:', error);
  });
}
//Sign in
const signIn = () =>{
  signInWithEmailAndPassword(auth, email, password)
  .then(userCredential =>{
    setUser(userCredential.user);
    console.log('User signed in!', userCredential.user);
  })
  .catch(error =>{
    console.log('Error signing in:', error);
  });
}
//Sign out
const logOut = ()=>{
  signOut(auth)
  .then(()=>{
    setUser(null);
    console.log('User signed out');
  })
  .catch(error =>{
    console.log('Error signing out:',error);
  });
}
  return(
    <>
    <p>Firestore Authentication </p>
    <div>
      
      {
        !user && (
          <>
          <input type = "text" placeholder = "Email" value={email} onChange = {()=> setEmail(event.target.value)}/>
          <input type ="password" placeholder= 'Password' value = {password} onChange ={(event)=> setPassword(event.target.value)}/>
            <button onClick={signUp}> Sign Up </button>
            <button onClick={signIn}>Sign In</button>
          </>
        )
      }
     
    </div>
    {
      user && (
        <div>
          <p>Logged in as: {user.email}</p>
          <button onClick={logOut}>Sign Out</button>
        </div>
      )
    }
    </>
  )
  
}

export default App;
