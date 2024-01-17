import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAwXQDYoYWnbBM2uSh8jNIDENYZ3ivzi9w",
	authDomain: "busybuy11.firebaseapp.com",
	projectId: "busybuy11",
	storageBucket: "busybuy11.appspot.com",
	messagingSenderId: "689507633895",
	appId: "1:689507633895:web:a862d0592031d54debb042",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
