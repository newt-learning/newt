import axios from "axios";
import keys from "../config/keys";

export async function getYoutubeVideoInfo(videoId) {
  try {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          id: videoId,
          part: "snippet",
          key: keys.youtubeApiKey,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getYoutubePlaylistInfo(playlistId) {
  try {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          playlistId,
          part: "snippet",
          maxResults: 50,
          key: keys.youtubeApiKey,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}
