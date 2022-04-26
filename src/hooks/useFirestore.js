import { collection, doc, getDocs, getDoc, query, setDoc, deleteDoc, updateDoc, where } from "firebase/firestore/lite";
import { useEffect, useState } from "react"
import { db, auth } from "../firebase"
import { nanoid } from "nanoid"


export const useFirestore = () => {

    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState({});

    const getData = async () => {
        try {
            setLoading(prev => ({ ...prev, getData: true }));
            const myQuery = query(
                collection(db, "urls"),
                where("uid", "==", auth.currentUser.uid)
            );
            const querySnapshot = await getDocs(myQuery);
            const datadb = querySnapshot.docs.map(doc => doc.data());
            setData(datadb);
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, getData: false }));
        }
    }

    const addData = async (url) => {
        try {
            setLoading(prev => ({ ...prev, addData: true }));

            const newDoc = {
                enabled: true,
                nanoid: nanoid(6),
                origin: url,
                uid: auth.currentUser.uid
            }

            const docRef = doc(db, "urls", newDoc.nanoid)
            await setDoc(docRef, newDoc);

            setData([...data, newDoc])

        } catch (error) {
            console.log(error)
            setError(error.message);
        } finally {
            setLoading(prev => ({ ...prev, addData: false }));
        }
    }

    const delData = async (nanoid) => {
        try {
            setLoading(prev => ({ ...prev, [nanoid]: true }));
            const docRef = doc(db, "urls", nanoid)
            await deleteDoc(docRef);          
            setData(data.filter((item) => item.nanoid !== nanoid))

        } catch (error) {
            console.log(error.message)
            setError(error.message);
        } finally {
            setLoading(prev => ({ ...prev, [nanoid]: false }));
        }
    }

    const updateData = async (nanoid, newURL) => {
        try {
            setLoading(prev => ({ ...prev, [nanoid]: true }));
            const docRef = doc(db, "urls", nanoid)
            await updateDoc(docRef, {origin:newURL});
            setData(data.map(item => 
                item.nanoid == nanoid 
                ? ({...item,origin: newURL})
                : item))

        } catch (error) {
            console.log(error.message)
            setError(error.message);
        } finally {
            setLoading(prev => ({ ...prev, [nanoid]: false }));
        }
    }

    const searchData = async (nanoid) => {
        try {
            console.log(nanoid)
            const docRef = doc(db, "urls", nanoid);
            const docSnap = await getDoc(docRef);
            return docSnap;
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };
    
    


    return {
        data,
        error,
        loading,       
        getData,
        addData,
        delData,
        updateData,
        searchData
    }

}