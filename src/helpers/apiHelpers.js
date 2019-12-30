import _ from "lodash";
import moment from "moment";

// Extract only relevant book information from result of Google Books API
export function extractRelevantBookInfo(bookObj) {
  const { id } = bookObj;
  const {
    title,
    subtitle,
    authors,
    description,
    imageLinks,
    pageCount,
    industryIdentifiers,
    publisher,
    publishedDate
  } = bookObj.volumeInfo;

  let isbns = {};
  let formattedDate = "";

  // Convert industry identifiers (ISBNS) from array of objects to object
  if (!_.isEmpty(industryIdentifiers)) {
    industryIdentifiers.forEach(
      ({ type, identifier }) => (isbns[type] = identifier)
    );
  }

  // Check if the date passed is a string (some books had 101-01-01 as a date
  // for some reason, like what is this Google Books API?)
  if (_.isString(publishedDate) && publishedDate !== "101-01-01") {
    // If it's just the year, return that, otherwise format it
    formattedDate =
      publishedDate.length === 4
        ? publishedDate
        : moment(publishedDate).format("DD MMM, YYYY");
  }
  return {
    bookId: id,
    title: _.isString(title) ? title : null,
    subtitle: _.isString(subtitle) ? subtitle : null,
    authors: _.isArray(authors) ? authors : null,
    description: _.isString(description) ? description : null,
    imageLinks: !_.isEmpty(imageLinks) ? imageLinks : null,
    pageCount: _.isNumber(pageCount) ? pageCount : null,
    industryIdentifiers: !_.isEmpty(isbns) ? isbns : null,
    publisher: _.isString(publisher) ? publisher : null,
    datePublished: _.isString(formattedDate) ? formattedDate : null
  };
}

// Combine data to match format of Content database schema
export function convertBookToDbContent(bookInfo, shelf, type) {
  return {
    name: bookInfo.title,
    description: bookInfo.description,
    authors: bookInfo.authors,
    thumbnailUrl: !_.isEmpty(bookInfo.imageLinks)
      ? bookInfo.imageLinks.thumbnail
      : null,
    type,
    shelf,
    bookInfo
  };
}
