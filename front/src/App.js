import './index.css';
import Layout from "./components/layouts/Layout.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import Categories from "./components/pages/categories/Categories";
import NoPage from "./components/pages/NoPage";
import React, { useEffect, useState, useCallback } from "react";
import Books from './components/pages/books/Books';
import Book from './components/pages/book/Book';
import AdminPage from './components/admin/AdminPage';


function App() {

  //categories
  const [categories, setCategories] = useState([]);
  //books
  const [books, setBooks] = useState([]);
const [filtBooks, setFiltBooks] = useState([])
const [search,setSearch] = useState("")


  let location = useLocation();

  let href = location.pathname?.split('/')[1];
  let category = categories.find(c => c.href.trim() === href);
console.log("app",category);

  localStorage.setItem('categoryID', category?.id);

  const getBooks = useCallback(async () => {
    await fetch(`http://localhost:3003/books/${localStorage.getItem('categoryID')}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setBooks((books) => result)
      })
  }, [books])

  useEffect(() => {

    fetch("http://localhost:3003/categories", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setCategories(result)

      });

  }, []);


  const filterSearch = (searchText, books) => {
    if (!searchText) {
      return books;
    }
    const copyBooks = books.filter(({ name }) =>
    name.toLowerCase().includes(searchText.toLowerCase())
  );
    return copyBooks
  };
  
  useEffect(() => {
  const copybook = books
  const filteredName = filterSearch(search, copybook);
  
  setFiltBooks(filteredName)
     
  
  }, [search]);
  return (
    <div className="App">

      <Routes>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path="/" element={<Layout books={filtBooks} search={search} setSearch={setSearch} categories={categories} test={category}/>}>
          <Route path='/' >
            <Route index element={<Categories categories={categories} />} />
            {
              categories.map((cat, index) => {
                return (
                  <Route key={cat.id} path={`:${cat.href}`}>
                    <Route index element={<Books key={index} getBooks={getBooks} category={category ? category   : {} } books={search ? filtBooks: books} />} />
                    <Route path={`:id/:name`} element={<Book category={category ? category : {} }/>} />
                  </Route>
                )
              })
            }
          </Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>

    </div >
  );
}

export default App;
