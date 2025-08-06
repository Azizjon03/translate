import axios from "axios";

export const api = axios.create({
  baseURL: "https://deep-translate1.p.rapidapi.com",
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
    "x-rapidapi-key": "8d917c418emsh95e09f019f1251fp117e2bjsn41349f22c714",
  },
});
