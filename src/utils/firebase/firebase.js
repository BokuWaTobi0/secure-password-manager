import { initializeApp } from "firebase/app";
import { getAuth,
        GoogleAuthProvider,
        signInWithPopup,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        deleteUser
        } from "firebase/auth";
import { getFirestore,doc,getDoc,setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB06-sthGzrzbU1pibOndfED0gCe_zAULU",
  authDomain: "password-manager-c43f1.firebaseapp.com",
  projectId: "password-manager-c43f1",
  storageBucket: "password-manager-c43f1.firebasestorage.app",
  messagingSenderId: "809579922118",
  appId: "1:809579922118:web:26728ff1ffd02718648dc7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const firestoreDatabase = getFirestore(app);

export const signInWithGooglePopup =async()=>{
    try{
        await signInWithPopup(auth,provider);
    }catch(e){
        console.error('error authenticating with google popup',e);
    }
}

export const createUserFromEmailAndPassword =async(email,password,name)=>{
  try{
      const result = await createUserWithEmailAndPassword(auth,email,password);
      const usersRef = doc(firestoreDatabase,'users',result.user.uid);
      const userDoc = await getDoc(usersRef);
      if(userDoc.exists()){
          throw new Error("User already exists in Firestore");
      }
      await setDoc(usersRef,{
          email:email,
          name:name,
          password:password,
      })
  }catch(e){
      if (e.code === 'auth/email-already-in-use') {
          alert("Email already in use. Please use a different email.");
        }
        if(e.message !== "User already exists in Firestore"){
          console.error("Error while creating user or setting data",e);
          const user = auth.currentUser;
          if(user){
              await deleteUser(user)
              console.log("User deleted from Auth due to Firestore error");
          }
        }
      console.error('error while creating user with email and password',e)
      return 3;
  }
}

export const signInUserWithEmailAndPassword =async(email,password)=>{
  try{
      await signInWithEmailAndPassword(auth,email,password);
  }catch(e){
      if(e.code ==='auth/invalid-credential'){
          alert('invalid credential')
      }
      console.error('error while signing user with email and password',e)
  }
}