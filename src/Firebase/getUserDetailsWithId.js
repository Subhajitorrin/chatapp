import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

async function getUserDetailsWithId(uid) {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (err) {
        console.log(err);
    }
}
export default getUserDetailsWithId