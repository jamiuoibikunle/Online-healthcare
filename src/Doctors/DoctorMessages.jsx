import { collection, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';

const DoctorMessages = () => {

    const [ chats, setChats ] = useState([])

    useEffect(() => {

        const getUsers = async () => {
            const querySnapshot = await getDocs(collection(db, "conversations"));
            querySnapshot.forEach((doc) => {
                console.log(doc.id);
                setChats(chats => [ ...chats, doc.id ])

                // setUsers(users => [ ...users, { id: doc.id, name: doc.data().name, address: doc.data().address } ])
            })}
            
            getUsers()
            
    }, [])

    useEffect(() => {

        

    }, [ chats ])

  return (
    <div>DoctorMessages</div>
  )
}

export default DoctorMessages