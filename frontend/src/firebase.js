// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCmb6_1Gn6eHy4-2_2eIEOQuSNaUrSWeVg',
	authDomain: 'whatsapp-clone-450b1.firebaseapp.com',
	databaseURL: 'https://whatsapp-clone-450b1.firebaseio.com',
	projectId: 'whatsapp-clone-450b1',
	storageBucket: 'whatsapp-clone-450b1.appspot.com',
	messagingSenderId: '400568560041',
	appId: '1:400568560041:web:062f131463978d2e35fcb8',
	measurementId: 'G-07GB6HFD4L',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
