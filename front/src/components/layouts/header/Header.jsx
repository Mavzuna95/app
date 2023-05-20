import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./header.css";
import NavbarMenu from "./NavbarMenu";
const Header = ({ search, setSearch, test }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  const handleScroll = () => {
    if (window.scrollY > 100 && !isScrolled) {
      setIsScrolled(true);
    } else if (window.scrollY <= 100 && isScrolled) {
      setIsScrolled(false);
    }
  };

  // const [searchBooks, setSearchBooks] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:3003/books", {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((json) => setSearchBooks(json));
  // }, []);

  // const filterSearch = (searchText, searchBooks) => {
  //   if (!searchText) {
  //     return searchBooks;
  //   }
  //   const copyBooks = searchBooks.filter(({ name }) =>
  //     name.toLowerCase().includes(searchText.toLowerCase())
  //   );
  //   return copyBooks;
  // };

  // useEffect(() => {
  //   const copybook = searchBooks;
  //   const filteredName = filterSearch(search, copybook);

  //   setSearchBooks(filteredName);
  // }, [search]);

  const location = useLocation();

  return (
    <>
      <header className={`header ${isScrolled ? "bottom-shadow" : ""}`}>
        <nav className=" h-20 relative text-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                MegaBook
              </span>
            </a>

            <div
              className="justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <div className="flex items-center lg:order-2">
                    <div className="max-w-md text-sm">
                      {location.pathname !== "/"
                        ? test?.quotes
                        : "«То, что вы читаете, изменит вас!» (Дипак Чопра)"}{" "}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <NavbarMenu  setSearch={setSearch} search={search}/>
      <Outlet />
    </>
  );
};

export default Header;
