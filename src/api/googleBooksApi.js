import axios from "axios";
import keys from "../config/keys";

export async function getBookInfo(searchTerm) {
  const term = searchTerm.split(" ").join("+");

  try {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=10&key=${keys.googleBooksApiKey}`
    );
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}
