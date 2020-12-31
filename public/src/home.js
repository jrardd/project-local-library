/* eslint-disable strict */
function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  let count = books.reduce(
    (acc, book) => (book.borrows[0].returned === false ? acc + 1 : acc),
    0
  );
  return count;
}

function getMostCommonGenres(books) {
  let genre = {};
  const returnArr = [];
  for (const book of books) {
    genre[book.genre] ? (genre[book.genre] += 1) : (genre[book.genre] = 1);
  }

  for (let i = 0; i < Object.keys(genre).length; i++) {
    returnArr.push({
      name: Object.keys(genre)[i],
      count: Object.values(genre)[i],
    });
  }
  return sortArray(returnArr).slice(0, 5);
}

function getMostPopularBooks(books) {
  const bookCounts = books.map((book) => {
    return { name: book.title, count: book.borrows.length };
  });
  return sortArray(bookCounts).splice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorObjects = authors.map((author) => {
    return {
      name: `${author.name.first} ${author.name.last}`,
      id: author.id,
      count: 0,
    };
  });

  for (let i = 0; i < books.length; i++) {
    let currentAuthorId = books[i].authorId;
    let currentAuthorObject = authorObjects.find(
      (author) => author.id === currentAuthorId
    );
    currentAuthorObject.count += books[i].borrows.length;
  }
  let result = sortArray(authorObjects).splice(0, 5);
  return result.map((author) => {
    return { name: author.name, count: author.count };
  });
}

//helper function
function sortArray(array) {
  let sorted = array.sort((one, two) => (one.count < two.count ? 1 : -1));
  return sorted;
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
