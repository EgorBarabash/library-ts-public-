import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import lib_vparser_fb2 from "viva-parser-fb2";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";
import firebaseConfig from "./config.js";
import 'firebase/firestore';
import fs from 'fs'
// import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, update, set} from "firebase/database";
import {EpubParser} from "@ridi/epub-parser";
import JSZip from "jszip";
import { DOMParser } from "@xmldom/xmldom";
import iconv from 'iconv-lite';
import { log } from "console";


const appFirebase = initializeApp(firebaseConfig);
// const firestore = firebase.firestore()


const app = express();
const port = 3000;
const dirPath = "D:/workspace/webdev/projects/books";
// const files = fs.readdirSync(dirPath).map(fileName => `${dirPath}\\${fileName}`);
let booksContent = [];

const jsonParser = bodyParser.json();

let parserFb2 = new lib_vparser_fb2();

// fs.watch(dirPath, (eventType, filename) => {
//   console.log(eventType);
//   console.log(filename);
//   setTimeout(() => {
//     getBooks(filename)
//   }, 5000)

// })

// function getBooks(filename) {
//   const files = fs.readdirSync(dirPath).map(fileName => `${dirPath}\\${fileName}`);

//   files.filter((x) => x.lastIndexOf('.fb2.zip') !== -1).filter((x) =>  x === `${dirPath}\\${filename}`).forEach((x) => {
//     console.log('123', x);
//     fs.readFile(`${x}`, function(err, data) {
//       if (err) throw err
//       JSZip.loadAsync(data).then(async function (zip) {
//           // ('x', path.basename(x))

//           const text = await zip.files[`${Object.keys(zip.files)}`].async('text')

//           parserFb2.parse(text)

//           const content = {
//             name: parserFb2.book.title,
//             author: parserFb2.book.origin_author,
//             img: parserFb2.get_cover_image(),
//             id: path.basename(x),
//             genres: parserFb2.book.genre_list,
//             addDate: getDateAddBook(x),
//           }
//           // booksContent.push(content)
//           // console.log('booksContent', parserFb2.book.genre_list);
//           sendData(content)

//       });
//     });
//   })
// files.filter((x) => x.lastIndexOf('.epub') !== -1).forEach((x) => {
//   const epubParser = new EpubParser(x)
//   epubParser.parse().then(async (book) => {
//       let cover = null
//       if(book.cover) {
//        cover = await epubParser.readItem(book.cover)
//       }

//     const content = {
//       name: book.titles.join(' '),
//       author: book.creators.map((x) => x.name).join(' '),
//       img: cover?.toString('base64'),
//       id: path.basename(x),
//  addDate: getDateAddBook(x),
//     }
//     booksContent.push(content)
//     sendData(content)
//   })
// })
// }

// getBooks()

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


// async function convertWin1251ToUtf8(zipFile) {
//   const zipData = fs.readFileSync(zipFile);
//   const zip = new JSZip();
//   const zipContent = await zip.loadAsync(zipData);
//   const fileContent = await zipContent.file(zip.files[`${Object.keys(zip.files)}`].name).async('nodebuffer');
//   const decodedContent = iconv.decode(fileContent, 'win1251');

//   return decodedContent;
// }

// function updateBooksAtFirebase() {
//   let dataToDataBase = []
//   const files = fs.readdirSync(dirPath).map(fileName => `${dirPath}\\${fileName}`);
//   files.filter((x) => x.lastIndexOf('.fb2.zip') !== -1).forEach((x) => {
  
//     fs.readFile(`${x}`, function(err, data) {
//       // console.log('data', typeof x);
//       if (err) throw err
//       JSZip.loadAsync(data).then(async function (zip) {
//           // ('x', path.basename(x))
        
//           const text = await zip.files[`${Object.keys(zip.files)}`].async('text')
//           const xmlDoc = new DOMParser().parseFromString(text, 'text/xml')
//           let codePage = xmlDoc.childNodes[0].data.split(' ').find((x) => x.indexOf('encoding=') >= 0)
//           if(codePage != undefined) {
//             codePage = codePage.split('"')[1]
//           }

//           if(codePage === 'windows-1251') {
//             parserFb2.parse(await convertWin1251ToUtf8(x))
//           } else {
//             parserFb2.parse(text)
//           }
//           // console.log(correctText);
         
//             // console.log('parserFb2', parserFb2.book);
  
//           const content = {
//             name: parserFb2.book.title,
//             author: parserFb2.book.origin_author,
//             img: parserFb2.get_cover_image(),
//             id: path.basename(x),
//             genres: parserFb2.book.genre_list,
//             addDate:  fs.statSync(x).birthtime || 0,
//             format: 'fb2',
//             description: parserFb2.get_formatted_annotation(),
//           }
//           // sendData(replaceUndefined(content))
//           dataToDataBase.push(replaceUndefined(content))
//           if(dataToDataBase.length === files.length) {
//             const updatedDataToDataBase= dataToDataBase.map((x) => {
//               // console.log(x.addDate);
//               return {[x.id.replace(/[.#$\/\[\]_-]/g, '')]: x}
//              })
             
//             // sendData(updatedDataToDataBase)
//           }
//       });
//     });
//   })
  
//   files.filter((x) => x.lastIndexOf('.epub') !== -1).forEach((x) => {
//     const epubParser = new EpubParser(x)
//     epubParser.parse().then(async (book) => {
//         let cover = null
//         if(book.cover) {
//          cover = await epubParser.readItem(book.cover)
//         }
  
//       const content = {
//         name: book.titles.join(' '),
//         author: book.creators.map((x) => x.name).join(' '),
//         img: cover?.toString('base64'),
//         id: path.basename(x),
//         addDate: fs.statSync(x).birthtime || 0,
//         format: 'epub',
//         // description:
//       }
//       // console.log('epub', content.name);
//       dataToDataBase.push(replaceUndefined(content))

//       if(dataToDataBase.length === files.length) {
//        const updatedDataToDataBase= dataToDataBase.map((x) => {
//         // console.log(x.addDate);
//         return {[x.id.replace(/[.#$\/\[\]_-]/g, '')]: x}
//        })
        
//         // sendData(updatedDataToDataBase)
//       }
      
//     })
//   })
  
  
// }
// async function sendData(c) {
//   // const resp = await fetch(
//   //   "https://library-repo-default-rtdb.europe-west1.firebasedatabase.app/books.json",
//   //   {
//   //     method: "POST",
//   //     body: JSON.stringify({ value: c }),
//   //   }
//   // );

// const db = getDatabase();


// const dataToUpdate = {};

// c.forEach(obj => {
//   const key = Object.keys(obj)[0]; 
//   const value = obj[key]; 
//   dataToUpdate[key] = value; 
// });

// const dataRef = ref(db, "books");

// update(dataRef, dataToUpdate)
    
// }



// updateBooksAtFirebase()

// function replaceUndefined(obj) {
//   for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       if (typeof obj[key] === 'object') {
//         replaceUndefined(obj[key]);
//       } else if (obj[key] === undefined) {
//         obj[key] = '';
//       }
//     }
//   }
//   return obj;
// }


// async function getData() {
//   const resp = await fetch(
//     "https://library-repo-default-rtdb.europe-west1.firebasedatabase.app/books.json"
//   );
//   Object.entries(await resp.json()).forEach((x) => {
//     booksContent.push(x);
//   });
//   filterBooksByCategories(["child_sf"]);

  async function getData() {
    const auth = getAuth();
    const user = auth.currentUser;
    // console.log('ab');
    if (user) {
      // console.log('a');
      const db = getDatabase();
      const booksRef = ref(db, "books");
  
      try {
        
        const snapshot = await get(booksRef);
        if (snapshot.exists()) {
          // console.log('b');
          const booksData = snapshot.val();
          Object.entries(booksData).forEach((x) => {
              booksContent.push(x);
          });

        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error getting data:", error);
      }
    } else {
      console.log("User is not authenticated.");
    }
  }
// }


function filterBooksByCategories(genres) {
  const filteredBooks = booksContent.filter(book => {
    if (!book[1].genres) return false; 
    return genres.every(genre => book[1].genres.includes(genre));
  });

  const genreList = [...new Set(booksContent.flatMap(book => book[1].genres || []))];

  return { books: filteredBooks, genreList };
}

function filterBooksByDate() {
  const books = booksContent.map((x) => x);
  return books
    .sort((a, b) => {
      return new Date(a[1].addDate) - new Date(b[1].addDate);
    })
    .reverse();
}


function getBookById(id) {
  return booksContent.find((x) => x[0] == id);
}

function getBookByName(value = "") {
  let t = false
  const r = []
  booksContent.forEach((x) => {
    for(let i = 0; i < value.length; i++) {
      if(!value) return
      if(value.replace(/\s/g, "")[i].toLowerCase() != x[1].name.replace(/\s/g, "")[i].toLowerCase()) {
        return
      } else {
        t = true
      }
    } 
    if(t) {
      r.push(x)
      t = false
    }
  })
  return r 
}


async function addFavouriteBook(bookId, uid) {
  let cont = true
  const favouritebook = await fetch(
    `https://library-repo-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/favourites.json`
  )
  
  const data = await favouritebook.json()

  if(data) {
    Object.entries(data).forEach((x) => {
    
      if(x[1] == bookId) {
        cont = false
      }
    })
  }

  if(cont) {
    const resp = await fetch(
      `https://library-repo-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/favourites.json`,
      {
        method: "POST",
        body: JSON.stringify(bookId),
      })  
    }
}

async function addBookmark(bookId, uid) {
  let cont = true
  const bookList = await fetch(
    `https://library-repo-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/bookList.json`
  )
  
  const data = await  bookList.json()
  if(data) {
    Object.entries(data).forEach((x) => {
    
      if(x[1] == bookId) {
        cont = false
      }
    })
  }

  

  if(cont) {
    const resp = await fetch(
      `https://library-repo-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/bookList.json`,
      {
        method: "POST",
        body: JSON.stringify(bookId),
      })  
  }
}

async function getFavouritesBooks(uid) {
  const resp = await fetch(
    `https://library-repo-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/favourites.json`
  )
  const data = await resp.json()

  const books = []

  Object.values(data).forEach((x) => books.push(getBookById(x)))

  return books
}

async function getBookList(uid) {
  const resp = await fetch(
    `https://library-repo-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/bookList.json`
  )
  const data = await resp.json()

  const books = []

  Object.values(data).forEach((x) => books.push(getBookById(x)))

  return books
}


async function getUserData(uid) {
  const resp = await fetch(
    `https://library-repo-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`
  )
  const data = await resp.json()
  return data
}
async function getUserImg(uid) {
  const resp = await fetch(
    `https://library-repo-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/userInfo.json`
  )
  const data = await resp.json()
  console.log(data);
  return data
}
async function changeUserData(uid, data, field) {
  // const resp = await fetch(
  //   `https://library-repo-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/userInfo.json`,
  //   {
  //     method: "PATCH",
  //     body: JSON.stringify({[field]:data}),
  //   }
  // )
  const db = getDatabase();
  const userRef = ref(db, `users/${uid}/userInfo`);
  update(userRef,  {[field]: data})
}

// async function convertFb2ToEpub(book) {
//   try {
//     const zipContent = fs.readFileSync(`${path.normalize(dirPath)}/${book}`);

//     const zip = new JSZip();

//     const archive = await zip.loadAsync(zipContent);

//     const fb2File = Object.values(archive.files).find((file) =>
//       file.name.endsWith(".fb2")
//     );

//     const fb2Content = await fb2File.async("text");

//     const parseXml = async (xmlBuffer) => {
//       const parser = new XMLParser();
//       const xmlString = xmlBuffer.toString('utf-8');
//       const options = {
//           attributeNamePrefix: '',
//           ignoreAttributes: false,
//           parseNodeValue: true,
//           parseAttributeValue: true,
//       };
  
//       return await parser.parse(xmlString, options); 
//   };
  
  
//   const result = await parseXml(fb2Content);

//     // console.log('body', result.FictionBook.body[0])
//     // console.log('image', result.FictionBook.body[0].section[1].image)

//     const epubContent = result.FictionBook.body[0].section.map((section) => {
      
//       const { title, ...content } = section

//       // const data = Object.keys(content).map((key) => {
//       //   if(key === 'empty-line') {
//       //     return '<br>'
//       //   }
//       //   if(key === 'image') {
//       //     // TODO: add img
//       //     return ''
//       //   }
//       //   if(key === 'cite') {
//       //     // TODO: add cite
//       //     return ''
//       //   }
//       //   return Array.isArray(content[key]) ? content[key].map((p) => {
//       //     return `<${key}>${JSON.stringify(p)}</${key}>`
//       //   }).join('') : ''
//       // }).join('')
    
//       const sectionTitle =  objectToHTML(title, true)
//       console.log('content', JSON.stringify(content));
//       // console.log('result', objectToHTML(content))

//       // title ? Object.keys(title).map((key) => Array.isArray(title[key]) ? title[key]?.join('. ') : JSON.stringify(title[key])).join(' ') : ''
//       return {title: sectionTitle, data: objectToHTML(content)}
//     })

//     // console.log('epubContent', epubContent);

//     const epubOptions = {
//         title: result.FictionBook.description['title-info']['book-title'],
//         author: result.FictionBook.description['title-info'].author,
//         content: epubContent
//     };

//     // console.log(epubOptions)

//     return new Epub(epubOptions, "output.epub").promise
//       .then(() => {
//         console.log("Книга успешно преобразована в EPUB");
        
//       })
//       .catch((error) => {
//         console.error("Ошибка при создании EPUB:", error);
//         throw error;
//       });
//   } catch (error) {
//     console.error("Ошибка:", error);
//     throw error;
//   }
// }
// // convertFb2ToEpub()

// function objectToHTML(obj, isText = false) {
//   const toStr = (tag, content) => {
//     return isText ? content : `<${tag}>${content}</${tag}>`;
//   }
//   if(!isObject(obj)) {
//     return ''
//   }
//   return Object.keys(obj).map((key) => {
//     if(isObject(obj[key])) {
//       return toStr(key, objectToHTML(obj[key], isText));
//     }
//     if(Array.isArray(obj[key])) {
//       return obj[key].map((x) => isObject(x) ? objectToHTML(x, isText) : toStr(key, x)).join('')
//     }
//     return toStr(key, obj[key])
//   }).join('')
// }
// // function objectToText(obj) {}

// function isObject(value) {
//   return value !== null && typeof value === 'object';
// }

// convertFb2ToEpub("Tolkin_Vlastelin-kolec_3_Vozvrashchenie-Korolya.n3pgDQ.500972.fb2.zip").then(epubPath => {
//   console.log(epubPath);
// })



app.get("/api/books", (req, res) => {
  res.send(booksContent)
});
app.post("/api/categories", jsonParser, (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const genre = JSON.parse(body);
    const data = await filterBooksByCategories(genre);
    res.send(data);
  });
});

app.post("/api/book-page", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const id = JSON.parse(body);
    const data = await getBookById(id)
    res.send(data);
  });
})

app.post("/api/change-rating", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const data = JSON.parse(body);
    console.log('body', data);
    // const resp = await fetch(
    //   `https://library-repo-default-rtdb.europe-west1.firebasedatabase.app/books/${data.id}/value.json`,
    //   {
    //     method: "PATCH",
    //     body: JSON.stringify({ rating: data.rating }),
    //   }
    // );
    const db = getDatabase();
    const bookRef = ref(db, `books/${data.id}`);
    update(bookRef,  {rating: data.rating})
  });
})

app.post("/api/books-search", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const value = JSON.parse(body);
    const data = getBookByName(value.searchValue)
    res.send(data)
  });
})

app.get("/api/last-books", (req, res) => {
  res.send(filterBooksByDate());
});

app.get("/api/book/:id", (req, res) => {
  res.sendFile(`${path.normalize(dirPath)}/${req.params.id}`);
});

app.post("/api/favourite-books", jsonParser, (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const {uid} = JSON.parse(body);
    const data = await getFavouritesBooks(uid)
    res.send(data)
  });
});
app.post("/api/book-list", jsonParser, (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const {uid} = JSON.parse(body);
    const data = await getBookList(uid)
    res.send(data)
  });
});
app.post("/api/user-data", jsonParser, (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const {uid} = JSON.parse(body);
    const data = await getUserData(uid)
    res.send(data)
    
  });
});
app.post("/api/user-img", jsonParser, (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const {uid} = JSON.parse(body);
    const data = await getUserImg(uid)
    res.send(data)
    
  });
});
app.post("/api/change-userData", jsonParser, (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const {uid, data, field} = JSON.parse(body);
    const resp = await changeUserData(uid, data, field)

  });
});
// app.get('/api/user', (req, res) => {
//   res.send()
// })

function loginUser(email, password) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      booksContent = []
      
      // updateBooksAtFirebase()
      return {
        isAuth: true,
        email: user.email,
        id: user.uid,
        token: user.accessToken,
      };
    })
    
    .catch(console.error);
}

app.post("/api/login", jsonParser, (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const login = JSON.parse(body);
    const data = await loginUser(login.username.trim(), login.password.trim());
    await getData();
    res.send(data);
  });
});
app.post("/api/add-favouritebook", jsonParser, (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const {bookId, uid} = JSON.parse(body);
    addFavouriteBook(bookId, uid)

  });
});
app.post("/api/add-bookmark", jsonParser, (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const {bookId, uid} = JSON.parse(body);
    addBookmark(bookId, uid)
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
