import _ from "lodash";

// Extract only relevant book information from result of Google Books API
export function extractRelevantBookInfo(bookObj) {
  const {
    title,
    authors,
    description,
    imageLinks,
    pageCount,
    industryIdentifiers,
    publisher,
    publishedDate
  } = bookObj.volumeInfo;

  return {
    title: _.isString(title) ? title : null,
    authors: _.isArray(authors) ? authors : null,
    description: _.isString(description) ? description : null,
    imageLinks: !_.isUndefined(imageLinks) ? imageLinks : null,
    pageCount: _.isNumber(pageCount) ? pageCount : null,
    industryIdentifiers: _.isArray(industryIdentifiers)
      ? industryIdentifiers
      : null,
    publisher: _.isString(publisher) ? publisher : null,
    publishedDate: _.isString(publishedDate) ? publishedDate : null
  };
}
