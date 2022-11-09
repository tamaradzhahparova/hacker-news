import React, {FC, useEffect, useState} from 'react';
import styles from './CommentsList.module.css';
import {postsApi} from "../../../api";
import {CommentType} from "../../../redux/postsSlice";

interface CommentsListType {
  comments: CommentType[]
}

const CommentsList: FC<CommentsListType> = ({comments}) => {

  return  <div className={styles.CommentsList}>
    {comments.length ? comments.map(item => <Comment key={item.id} by={item.by} text={item.text} kids={item.kids} /> )
      : <div style={{textAlign: 'center', paddingTop: '50px', color: '#504d4d'}}>Здесь пока нет комментариев</div>}
  </div>
}


interface CommentProps {
  by: string,
  text: string,
  children?: React.ReactNode,
  kids?: Array<number>,
}

const Comment: FC<CommentProps> = ({by, text, kids}) => {

  const [showReply, setShowReply] = useState(false)
  const [subComments, setSubComments] = useState<CommentType[]>([])


  useEffect(() => {
    if (kids) {
      const subComm: CommentType[] = []
      for (let i = 0; i < kids.length; i++) {
        postsApi.getItem(kids[i]).then(res => {
          subComm.push(res)
        })
      }
      setSubComments(subComm)
    }
  }, [kids])

  
  
  return  <div>
     {text && <div className={styles.comment}>
        <div className={styles.metaData}>
            <svg
                width="16"
                height="7"
                viewBox="0 0 19 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M9.5 0L0 10H19L9.5 0Z" fill="#D9D9D9"/>
            </svg>
          {by}
        </div>
        <p className={styles.text}>{text}</p>
         <button onClick={() => setShowReply(!showReply)}  className={styles.button}>{showReply ? 'hide reply' : 'show reply' }</button>
       {!!subComments.length && showReply && subComments.map(comm => <Comment key={comm.id} by={comm.by} text={comm.text} kids={comm.kids} />)}
       {showReply && !subComments.length && <span>нет вложенных комментариев</span>}
    </div>}
  </div>
}


export default CommentsList;
