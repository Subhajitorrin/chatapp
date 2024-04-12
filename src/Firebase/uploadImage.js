import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

async function uploadImageToFirebaseAndGetURL(file) {
    const storageRef = ref(storage, `images/${v4()}`);
    await uploadBytesResumable(storageRef, file);
    return getDownloadURL(storageRef);
}

export default uploadImageToFirebaseAndGetURL;