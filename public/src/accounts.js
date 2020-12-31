/* eslint-disable strict */
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((account1, account2) =>
    account1.name.last > account2.name.last ? 1 : -1
  );
}

function numberOfBorrows(account, books) {
  return books.reduce((count, book) => {
    const borrowIDs = book.borrows.map((borrow) => borrow.id);
    return borrowIDs.includes(account.id) ? count + 1 : count;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  let possessedBooks = [];

  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    const { id, title, genre, borrows } = book;
    for (let j = 0; j < borrows.length; j++) {
      if (borrows[j].id === account.id && borrows[j].returned === false) {
        for (let num in authors) {
          let author = authors[num];
          if (author.id == book.authorId) {
            let tempBook = { id, title, genre, author, borrows };
            possessedBooks.push(tempBook);
          }
        }
      }
    }
  }
  return possessedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
