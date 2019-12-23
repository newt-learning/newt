// Reduces the text to a smaller size, while still making sure that it ends with
// a full word.
export function shortenText(text, maxCharacters) {
  // If there's no text, return nothing.
  if (!text) return;

  // If the text is smaller than the maximum size, return the text
  if (text.length < maxCharacters) {
    return text;
  }

  const punctuation = [" ", ".", ",", ";", "?", "/", "-"];

  // If the next character after the max character is part of punctuation, then
  // that means the word ends on the last character. If it does not, keep
  // reducing the character count until you hit a blank space/punctuation, which
  // marks the end of the word.
  if (punctuation.includes(text[maxCharacters + 1])) {
    return text.substr(0, maxCharacters) + "...";
  } else {
    let characterCount = maxCharacters;
    while (!punctuation.includes(text[characterCount])) {
      characterCount -= 1;
    }

    return text.substr(0, characterCount) + "...";
  }
}
