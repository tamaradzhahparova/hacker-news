import React, {FC, useEffect, useState} from 'react';
import styles from './Post.module.css';
import {Link, useLocation} from "react-router-dom";
import {postsApi} from "../../api";
import PostCard from "../PostsList/Post/PostCard";
import {useAppDispatch, useAppSelector} from "../../redux/reduxHooks";
import CommentsList from "./CommentsList/CommentsList";
import {getComments, PostType} from "../../redux/postsSlice";

const REFETCH_TIME = 60000

const Post: FC = () => {
  const [post, setPost] = useState<PostType>()
  const location = useLocation();
  const postId = Number(location.pathname.split('/').reverse()[0])
  
  const dispatch = useAppDispatch()
  const comments = useAppSelector(state => state.postsSlice.comments.comments)

  console.log('rerender post component')

  useEffect(() => {
    postsApi.getItem(postId).then(res => {
      setPost({...res, comments: res.descendants})
      dispatch(getComments(res.kids))
    })
  }, [dispatch, postId])
  
  useEffect(() => {
    if (post) {
      const updateComment = setInterval(() => {
        dispatch(getComments(post.kids))
      }, REFETCH_TIME)
  
      return () => {
        clearInterval(updateComment)
      }
    }
  }, [dispatch, post])

  return  <div className={styles.Post}>
    {post ? <div>
      <PostCard by={post.by} score={post.score} title={post.title} time={post.time} id={post.id} comments={post.comments} />
        <div className={styles.buttons}>
          <Link to={'/posts'} className={styles.button}>Вернуться к списку новостей</Link>
          <button className={styles.button} onClick={() => dispatch(getComments(post.kids))}>Обновить комментарии</button>
          <a href={post.url} className={styles.button}>Перейти к новости</a>
        </div>
    </div>
      :
      <div> Загрузка поста...</div>}
    {post && <CommentsList comments={comments} />}
  </div>
}


export default Post;
