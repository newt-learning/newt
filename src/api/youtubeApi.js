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
    // Get playlist information from Youtube (title, description, etc.)
    const playlistRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlists",
      {
        params: {
          id: playlistId,
          part: "snippet",
          key: keys.youtubeApiKey,
        },
      }
    );

    // If there's a result, move on to next steps, otherwise return null
    if (playlistRes.data.pageInfo.totalResults === 1) {
      const {
        data: { items },
      } = playlistRes;
      const youtubePlaylist = items[0];

      // Reorganize data closer to the model schema
      let seriesInfo = {
        name: youtubePlaylist.snippet.title,
        description: youtubePlaylist.snippet.description,
        authors: [youtubePlaylist.snippet.channelTitle],
        contentType: "video",
        seriesInfo: {
          source: "youtube",
          playlistId: youtubePlaylist.id,
          title: youtubePlaylist.snippet.title,
          description: youtubePlaylist.snippet.description,
          channelId: youtubePlaylist.snippet.channelId,
          datePublished: youtubePlaylist.snippet.publishedAt,
          thumbnails: youtubePlaylist.snippet.thumbnails,
        },
      };

      // Get information about the videos in the playlist (playlist items)
      const playlistItemsRes = await axios.get(
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

      // Add the videos to the seriesInfo object
      seriesInfo.videos = playlistItemsRes.data.items;

      return seriesInfo;
    }

    return null;
  } catch (error) {
    throw new Error(error);
  }
}
