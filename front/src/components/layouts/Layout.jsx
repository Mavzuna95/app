import React from "react";
import Header from "./header/Header";
const Layout = ({ children, books, search, setSearch,categories,test }) => {

  return (
    <>
      <div>
        <Header books={books} search={search} setSearch={setSearch} categories={categories} test={test}/>
      </div>
      <div>
        <main>
          {" "}
          <div className="max-w-7xl bg-gray-200 mx-auto px-4">{children} </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
