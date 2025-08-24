const express = require('express');
let books = require("./booksdb.js");
const axios = require("axios");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});

//Get the book list available in the shop using Promise callbacks

// public_users.get('/', function (req, res) {
//     axios.get("http://localhost:5000/booksdb") // or directly fetch from books object if local
//         .then(response => {
//             return res.status(200).json(response.data);
//         })
//         .catch(err => {
//             return res.status(500).json({ message: "Error fetching books", error: err.message });
//         });
// });

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;   // retrieve isbn from request parameters
    const book = books[isbn];       // look up in the books object
  
    if (book) {
      return res.status(200).json(book);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
 });

 // Get book details based on ISBN using Promise callbacks
// public_users.get('/isbn/:isbn', function (req, res) {
//   const isbn = req.params.isbn;

//   axios.get(`http://localhost:5000/booksdb/${isbn}`)
//     .then(response => {
//       return res.status(200).json(response.data);
//     })
//     .catch(err => {
//       return res.status(404).json({ message: "Book not found", error: err.message });
//     });
// });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let requestedAuther = req.params.author;

  // Filter books by matching author (case-insensitive)
  let result = Object.values(books).filter(
    (book) => book.author.toLowerCase() === requestedAuther.toLowerCase()
  );

  if (result.length > 0) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ message: "No books found for this author" });
  }
});

// Get book details based on author using Promise callbacks
// public_users.get('/author/:author', function (req, res) {
//     const requestedAuthor = req.params.author;
  
//     axios.get(`http://localhost:5000/books`) // assuming you have a GET /books route
//       .then(response => {
//         let booksData = response.data;
//         let result = Object.values(booksData).filter(
//           (book) => book.author.toLowerCase() === requestedAuthor.toLowerCase()
//         );
  
//         if (result.length > 0) {
//           return res.status(200).json(result);
//         } else {
//           return res.status(404).json({ message: "No books found for this author" });
//         }
//       })
//       .catch(err => {
//         return res.status(500).json({ message: "Error fetching books", error: err.message });
//       });
//   });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let requestedTitle = req.params.title;

    // Filter books by matching title (case-insensitive)
    let result = Object.values(books).filter(
      (book) => book.title.toLowerCase() === requestedTitle.toLowerCase()
    );
  
    if (result.length > 0) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "No books found for this title" });
    }
});

// Get book details based on title using Promise callbacks
// public_users.get('/title/:title', function (req, res) {
//     const requestedTitle = req.params.title;
  
//     axios.get(`http://localhost:5000/books`) // your existing /books route
//       .then(response => {
//         let booksData = response.data;
  
//         let result = Object.values(booksData).filter(
//           (book) => book.title.toLowerCase() === requestedTitle.toLowerCase()
//         );
  
//         if (result.length > 0) {
//           return res.status(200).json(result);
//         } else {
//           return res.status(404).json({ message: "No books found with this title" });
//         }
//       })
//       .catch(err => {
//         return res.status(500).json({ message: "Error fetching books", error: err.message });
//       });
//   });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;   // retrieve isbn from request parameters
  const book = books[isbn];
  
  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
