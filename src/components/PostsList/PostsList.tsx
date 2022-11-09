import React, {FC, useEffect} from 'react';
import styles from './PostsList.module.css';
import PostCard from "./Post/PostCard";
import {getNewPosts} from "../../redux/postsSlice";
import {useAppDispatch, useAppSelector} from "../../redux/reduxHooks";

const PostsList: FC = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(state  => state.postsSlice.posts)
  const postsIsFetching = useAppSelector(state => state.postsSlice.isFetching)

  useEffect(() => {
      dispatch(getNewPosts())
    const updatePosts = setInterval(() => {
      dispatch(getNewPosts())
    }, 60000)
    
    return () => {
        clearInterval(updatePosts)
    }
  }, [dispatch])

  return  <div className={styles.CardsList}>
    {postsIsFetching ? <div className={styles.preloader}>загрузка....</div> : posts.map(post => <PostCard key={post.id}
                                                                                                          by={post.by}
                                                                                                          score={post.score}
                                                                                                          title={post.title}
                                                                                                          time={post.time}
                                                                                                          id={post.id}
                                                                                                          comments={post.comments}
    />)}
  </div>
}
export default PostsList;
