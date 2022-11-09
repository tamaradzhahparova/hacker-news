import React, { FC } from 'react';
import styles from './PostMetaData.module.css';

interface CardMetaDataProps {
  by: string,
  time: number,
  comments: number
}

const PostMetaData: FC<CardMetaDataProps> = ({by, time, comments}) => {
  
  const date = new Date(time*1000).toString().split('GMT')[0]
  
  return   <div className={styles.CardMetaData}>
    <p>{`опубликовано ${date}`}</p>
    <p>{by}</p>
    <p>{comments} comments</p>
  </div>
}



export default PostMetaData;
