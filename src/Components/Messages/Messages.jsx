import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase'
import styles from './Messages.module.css'
import avatar from './avatar.png'
import { SearchRounded } from '@material-ui/icons'
import { CircularProgress } from "@material-ui/core";

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Messages = () => {

    const [ messages, setMessages ] = useState([])
    
    const navigate = useNavigate()

    useEffect(() => {

        const getMessages = async () => {
            
        const querySnapshot = await getDocs(collection(db, "conversations"));
        querySnapshot.forEach((doc) => {

          const user = localStorage.getItem('user')
          const data = JSON.parse(doc.id)
          console.log(data);
          console.log(data.length)
          if (data.includes(user)) {
            if (messages.find( e => e.id === doc.id )) return
              const remoteuser = data.filter( each => each !== user )
                setMessages(messages => [ ...messages, { id: doc.id, lastMessage: doc.data().last_message, user: doc.data()[remoteuser] } ])
            }
        });
        
    }
    
    getMessages()
    
    }, [])

    console.log(messages);

    return messages.length !== 0 ? (
	    <div className={styles.wrapper}>
        <div className={styles.search}>
            {/* <input placeholder='Search message' />
            <SearchRounded className={styles.searchicon} /> */}
        </div>
        <section className={styles.messages}>
            
            {
                messages.map((message) => (
                    <div className={styles.individual} key={message.id} onClick={() => navigate('/chats/' + message.id )}>
                        <img src={message.user.profilepic || avatar} />
                        <div className={styles.center}>
                        <div className={styles.name}>
                            {message.user.name}
                        </div>
                        <div className={styles.lastmessage}>
                            { message.lastMessage.sender === localStorage.getItem('user') ? <b>Me:</b> : '' } {message.lastMessage.text}
                        </div>
                        </div>
                        <div className={styles.time}>
                            09:25 PM
                        </div>
                    </div>

            ))
            }

        </section>
        </div>
  ) : (
    <CircularProgress className={styles.progress} />
  )
}

export default Messages