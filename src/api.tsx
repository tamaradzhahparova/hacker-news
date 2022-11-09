import axios from "axios";

export const instance = axios.create({
  baseURL: "https://hacker-news.firebaseio.com/v0/",
});

export const postsApi = {
  async getNewPostsId() {
    const response = await instance.get('newstories.json?print=pretty')
    return response.data.slice(0, 99)
  },
  async getItem(id: number) {
    const response = await instance.get(`item/${id}.json`)
    return response.data
  }

}
