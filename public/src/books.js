function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let borrowedBooks = books.filter((book) => {
    return book.borrows[0].returned == false;
  });
  let returnedBooks = books.filter((book) => {
    return book.borrows[0].returned == true;
  });
  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  let transactions = [];
  let borrows = book.borrows.map((borrow) => ({
    id: borrow.id,
    returned: borrow.returned,
  }));

  for (let i in borrows) {
    const borrow = borrows[i];
    const account = accounts.find((account) => borrow.id === account.id);
    transactions.push({
      ...borrow,
      ...account,
    });
  }

  return transactions.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
