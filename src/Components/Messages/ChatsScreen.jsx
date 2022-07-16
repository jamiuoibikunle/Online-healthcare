import { collection, getDocs, setDoc, doc, getDoc, addDoc, serverTimestamp, onSnapshot, query, orderBy, limit, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import styles from './ChatsScreen.module.css'
import avatar from './avatar.png'
import { ArrowBack, Telegram } from '@material-ui/icons'

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CircularProgress } from "@material-ui/core";

const ChatsScreen = () => {

    const navigate = useNavigate()

    const [ texts, setTexts ] = useState([])
    const [ messageToSend, setMessageToSend ] = useState('')
    const [ remoteuser, setRemoteuser ] = useState()
    const [ mydetails, setmydetails ] = useState()

    const params = useParams()
    const chatId = params.chatId

    const scrollRef = useRef()
    
    const myUser = localStorage.getItem('user')

    useEffect(() => {

        const q = query(collection(db, "conversations", chatId, "messages"), orderBy('timestamp', 'asc'), limit(200));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
            list.push({ id: doc.id, text: doc.data().message.text, sender: doc.data().message.sender, timeStamp: doc.data().message.timestamp.seconds })
        }, (error) => console.log(error))

        setTexts(list)
        });

        return () => {
            unsubscribe()
          }
        
        }, [])

        useEffect(() => {

            const fetchMyData = async () => {
              
                const fetchRef = doc(db, "users", localStorage.getItem('user'));
                const docSnap = await getDoc(fetchRef);
                
                if (docSnap.exists()) {
                      setmydetails(docSnap.data())
                  } else {
                      // doc.data() will be undefined in this case
                      console.log("No such document!");
                  }
              }
    
          fetchMyData()

        }, [])

        console.log(mydetails);

    useEffect(() => {

        const getName = async () => {

            let userId = JSON.parse(chatId)
            userId = userId.find( e => e !== localStorage.getItem('user') )
            console.log(userId);

            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              setRemoteuser({
                user: docSnap.data()
            })
        } else {
            console.log("Not found in users. Searching inside doctors.");
            
            const docRef = doc(db, "doctors", userId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setRemoteuser({
                  user: docSnap.data()
              })
            } else {
                console.log("User not found anywhere");
                    }
                }

        }

        getName()

    }, [])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: 'smooth'})
    }, [texts])

    const handleSend = async () => {

        const docRef = await addDoc(collection(db, "conversations", chatId, "messages"), {
            message: {
                text: messageToSend,
                sender: myUser,
                timestamp: serverTimestamp()
            },
            timestamp: serverTimestamp()
          })

        //   let myData

          const viewRef = doc(db, "conversations", chatId);

          let userId = JSON.parse(chatId)
          userId = userId.find( e => e !== localStorage.getItem('user') )

          let updatedData = {}
          updatedData['last_message'] = {
              sender: myUser,
              text: messageToSend
          }
          updatedData[userId] = {
              name: remoteuser.user.name,
              profilepic: remoteuser.user.profilepic || ''
            }
            updatedData[myUser] = {
                name: mydetails.name,
                profilepic: mydetails.profilepic || ''
            }

          await setDoc(viewRef, updatedData
          );

          setMessageToSend('')
    }

    
    return remoteuser ? (
        <main className={styles.chatswrapper}>
            <header className={styles.header}>
                <ArrowBack onClick={() => navigate(-1)} />
                <img src={remoteuser.user.profilepic || avatar} className={styles.avatar} />
                {remoteuser.user.name || 'Fetching'}
            </header>
            <section className={styles.messages}>
                {
                    texts.map((text) => {

                        const time = new Date(text.timeStamp * 1000)
                        const hour = String(time.getHours())
                        const minute = time.getMinutes()
                        // console.log(text);

                    return (

                    <div ref={scrollRef} className={text.sender === myUser ? styles.messagebox + ' ' + styles.me : styles.messagebox} key={text.id}>
                        {text.text}
                    <div>
                        { hour.padStart(2, '0') + ' ' + minute }
                    </div>
                    <div className={text.sender === myUser ? styles.bubble + ' ' + styles.alt : styles.bubble} />
                </div>

                )})
                }
            </section>
            <section className={styles.inputfield}>
                <textarea onChange={(e) => setMessageToSend(e.target.value) } value={messageToSend} />
                <button disabled={messageToSend.length < 1} onClick={handleSend}>
                    <Telegram />
                </button>
            </section>
        </main>
    ) : (
        <CircularProgress className={styles.progress} />
    )
}

export default ChatsScreen