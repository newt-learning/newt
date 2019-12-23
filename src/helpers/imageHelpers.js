// Function to check if a thumbnail url or the image links object from Google Books API exists
export const checkThumbnailExistence = volumeInfo => {
  if (volumeInfo.imageLinks) {
    if (volumeInfo.imageLinks.thumbnail) {
      return volumeInfo.imageLinks.thumbnail;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
