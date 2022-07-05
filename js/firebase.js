// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-analytics.js";
import { getFirestore,collection, addDoc, getDocs, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"
import { GoogleAuthProvider, getAuth, signOut, signInWithPopup} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEdUUy5s6rKG-cfVXT4bpUL5BuFBobLy8",
  authDomain: "actgame-2c9cd.firebaseapp.com",
  projectId: "actgame-2c9cd",
  storageBucket: "actgame-2c9cd.appspot.com",
  messagingSenderId: "484033090061",
  appId: "1:484033090061:web:b7eba1d2ca9e8ddb95fb44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ---------------------- BASE DE DATOS ---------------------- 
const db = getFirestore()

export const saveWin = async (obj) =>{
  let id = obj.email
  const oneDoc = await doc(db, 'winners', `${id}`)
  const docSnap = await getDoc(oneDoc)

  if(docSnap.exists()){
    console.log("existe:  ", docSnap.data())
    if(docSnap.data().totalTime > obj.totalTime){
      await updateDoc(oneDoc, {
        totalTime: obj.totalTime,
        intento: obj.intento
      })
    }
  }else{
    await setDoc(doc(db, 'winners', `${id}`), obj)
  }

}

export const getWinners = async() =>{
  const querysnapshot = await getDocs(collection(db, 'winners'));
  let array = []
  let i=0
  querysnapshot.forEach((doc) => {
    array[i] = doc.data()
    i++
  });
  return array
}

// ---------------------- AUTENTICACION ---------------------- 

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const login = async function login(){
  //let provider = new GoogleAuthProvider()
  const response = await signInWithPopup(getAuth(), provider)
  return response.user
}

export const logout = () => {
  //signOut(auth)
  signOut(getAuth())
} 