import { Navbar } from "flowbite-react";
import "../header/header.css";
import FontAwesomeIcon from "react-fontawesome";
import { faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavbarBrand } from "flowbite-react/lib/esm/components/Navbar/NavbarBrand";
import { Link } from "react-router-dom";
import { BsStar } from "react-icons/bs";
import { useEffect, useState } from "react";

const NavbarMenu = ({ search, setSearch, favorite}) => {
  const [searchBooks, setSearchBooks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3003/books", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => setSearchBooks(json));
  }, []);

  const filterSearch = (searchText, searchBooks) => {
    if (!searchText) {
      return searchBooks;
    }
    const copyBooks = searchBooks.filter(({ name }) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );
    return copyBooks;
  };

  useEffect(() => {
    const copybook = searchBooks;
    const filteredName = filterSearch(search, copybook);

    setSearchBooks(filteredName);
  }, [search]);

  return (
    <Navbar fluid={true} rounded={true} className="navbar">
      <NavbarBrand className="flex flex-wrap mx-4  max-w-screen-xl">
        <div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search..."
            className="rounded text-sm p-1 text-black w-80"
          />
        </div>
        <div className="relative">
          {search
            ? searchBooks.map((sBook) => {
                return (
                  <div
                    key={sBook.id}
                    className="absolute right-0 top-5 rounded bg-slate-400 text-lime-50 p-4 w-60 text-center"
                  >
                    <Link
                      className="scroll-py-80"
                      to={`${sBook.href}/${sBook.id}/${sBook.name}`}
                    >
                      {sBook.name}
                    </Link>
                  </div>
                );
              })
            : ""}
        </div>
        {search && (
          <FontAwesomeIcon
            onClick={() => setSearch("")}
            className="clearIcon"
            icon={faXmark}
          />
        )}
        <button className="btnSearch me-2 mt-1" type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>

        <div></div>
      </NavbarBrand>{" "}
      <div className="flex ">
        <button
          type="button"
          className="rounded-full icons mx-4 p-2 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <div className="flex flex-col relative">
            <span className="absolute right-0  text-white">
              {/* {favorite.length} */}
            </span>
            <Link to="/favorite">
              <BsStar fontSize={25} />
            </Link>
          </div>
        </button>
        <div className="icons rounded-full"></div>
        {/* <img src="/img/book.png" alt="logo" width={50} className="rounded-full mx-4" />{" "}
      <img src="/img/book.png" alt="logo" width={50} className="rounded-full " />{" "} */}
      </div>
    </Navbar>
  );
};

export default NavbarMenu;
