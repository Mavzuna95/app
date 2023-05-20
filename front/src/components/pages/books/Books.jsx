import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";

const Books = ({ books, getBooks, category }) => {
  useEffect(() => {

  console.log("cat",category);
    getBooks();
  }, []);
  return (
    <>
      <Breadcrumb
        aria-label="Default breadcrumb example"
        className="flex justify-center my-6"
      >
        <Breadcrumb.Item href="/">
          <span className="">Бизнес-книги</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">
          <span>{category.def}</span>
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex flex-col w-full justify-center space-x-2 spcace-y-2">
        {/* <h1 className=" absolute top-4 right-4 w-1/2">{category.quotes}</h1> */}
        <div className=" grid grid-cols-4 gap-2 relative container mx-auto">
          {books?.map((book) => {
            return (
              <Link key={book.id} to={`${book.id}/${book.name}`} className="">
                <img alt="" className="w-32" src={book.img} />
                {book.name}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Books;
