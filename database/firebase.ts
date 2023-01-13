import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB5lckAztuz-Qr45VP0SRieSrnJn4RPnnw",
    authDomain: "foodapp-fd372.firebaseapp.com",
    projectId: "foodapp-fd372",
    storageBucket: "foodapp-fd372.appspot.com",
    messagingSenderId: "347080945238",
    appId: "1:347080945238:web:cba25a29d80ab77ab495f7"
}
  
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
