import React, { FC } from 'react';
import styles from './Post.module.css';
import PostMetaData from "./PostMetaData/PostMetaData";
import {Link} from 'react-router-dom'

interface PostCardProps {
  by: string,
  score: number,
  title: string,
  time: number,
  id: number,
  comments: number
}

const PostCard: FC<PostCardProps> = ({by, score, title, time, id, comments}) => {
  return <div className={styles.Card}>
    <div className={styles.cardTop}>
      <Link to={`/posts/${id}`} className={styles.title}>
        {title}
      </Link>
      
      <span>|</span>
      <div className={styles.rating}>
        <svg
          width="19"
          height="10"
          viewBox="0 0 19 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.5 0L0 10H19L9.5 0Z" fill="#D9D9D9"/>
        </svg>
        <span>{score}</span>
      </div>
    </div>
    <PostMetaData by={by} time={time} comments={comments}/>
  </div>
}

export default PostCard;
