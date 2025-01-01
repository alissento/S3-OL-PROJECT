import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

const firebaseConfig = {
    apiKey: "AIzaSyCDVLpCzDVNuDgjaQ3GMbjcwYtSZprxNdI",
    authDomain: "fb4u-2e88b.firebaseapp.com",
    projectId: "fb4u-2e88b",
    storageBucket: "fb4u-2e88b.firebasestorage.app",
    messagingSenderId: "969831689978",
    appId: "1:969831689978:web:1d68182bc558765be86343"
  };

const apiURL = 'https://api.nknez.tech';
const api = axios.create({
    baseURL: apiURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { apiURL, api };

export default app;