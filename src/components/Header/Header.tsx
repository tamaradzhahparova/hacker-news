import * as React from "react";
import s from "./header.module.css";
import {useAppDispatch} from "../../redux/reduxHooks";
import {getNewPosts} from "../../redux/postsSlice";

const Header = () => {
  const dispatch = useAppDispatch()
  return (
    <header className={s.header}>
      <div className={s.headerLeft}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
             width="80" height="80"
             viewBox="0 0 48 48"><path fill="#FF6D00" d="M42,42H6V6h36V42z">
        </path>
          <path fill="#FFF" d="M8,8v32h32V8H8z M38,38H10V10h28V38z">
          </path>
          <path fill="#FFF" d="M23 32L25 32 25 26 30.5 16 28.4 16 24 24.1 19.6 16 17.5 16 23 26z">
          </path>
        </svg>
        <a className={s.textLogo} href='https://news.ycombinator.com/news'>Hacker News</a>
        <button onClick={() => dispatch(getNewPosts())} className={s.button}>Обновить новости</button>
      </div>
      <span className={s.login}>Login</span>

    </header>
  );
}

export default Header
