import react from "react";
import ChatNavBar from "./ChatNavBar";
import Search from "./Search";
import Chats from "./Chats";
import GoogleAuth from "../components/GoogleAuth";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { logOutUserSuccess, logOutUserStart, logOutUserFailure } from '../redux/user/userSlice';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserSuccess, deleteUserSuccess, deleteUserFailure, deleteUserStart, updateUserStart } from '../redux/user/userSlice.js';

const Sidebar = () =>{
    return(
        <div className='sidebar'>
            <ChatNavBar/>
            <Search/>
            <Chats/>
        </div>
    )
}
export default Sidebar