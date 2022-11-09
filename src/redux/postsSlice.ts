import {AnyAction, createSlice, PayloadAction, ThunkAction} from '@reduxjs/toolkit'
import {RootState} from "./store";
import {postsApi} from "../api";

export interface PostType {
  by: string,
  id: number,
  score: number,
  time: number,
  title: string,
  comments: number,
  kids: number[],
  url?: string
}

export interface CommentType {
  by: string,
  id: number,
  kids?: number[],
  text: string,
}

interface Comments {
  ids: number[],
  comments: CommentType[]
}

interface PostsState {
  posts: PostType[],
  comments: Comments
  newPostsId: number[],
  isFetching: boolean
}

const initialState: PostsState = {
  posts: [],
  comments: {
    ids: [],
    comments: []
  },
  newPostsId: [],
  isFetching: false,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<PostType>) => {
      state.posts = [...state.posts, action.payload]
    },
    setNewPostsId: (state, action: PayloadAction<number[]>) => {
      state.newPostsId = action.payload
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload
    },
    addComment: (state, action) => {
      state.comments.comments = action.payload
    },
  }
})

export const getNewPosts = (): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch, getState) => {
  dispatch(setIsFetching(true))
  postsApi.getNewPostsId().then((res: number[]) => {
    dispatch(setNewPostsId(res))
    if (!getState().postsSlice.posts.length) {
      const ids = getState().postsSlice.newPostsId
      for (let i = 0; i < ids.length; i++) {
        postsApi.getItem(ids[i]).then((res) => {
          const post: PostType = {
            by: res.by,
            id: res.id,
            score: res.score,
            time: res.time,
            title: res.title,
            comments: res.descendants,
            kids: []
          }
          dispatch(addPost(post))
        })
      }
    }
      dispatch(setIsFetching(false))
  })
}

export const getComments = (ids: Array<number>): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch) => {
  if (ids) {
    const arrOfPromise = ids.map(id => {
      return postsApi.getItem(id).then(res => {
        return res
      })
    })
    Promise.all(arrOfPromise).then(res => {
      dispatch(addComment(res))
    })
  }
}


export const {addPost, setNewPostsId, setIsFetching, addComment} = postsSlice.actions