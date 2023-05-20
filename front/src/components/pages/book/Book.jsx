import { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import "./book.css"
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";

const Book = ({ category }) => {
  let { id } = useParams();
  const [book, setBook] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3003/book/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setBook((book) => result);
      });
  }, []);
  return (
    <>
      <div className="flex w-full justify-center space-x-4 spcace-y-5">
        <div className="grid grid-cols-1  gap-4 relative justify-center items-center">
          {book.map((cat) => {
            return (
              <div
              key={cat.id}
              className="flex flex-wrap bg-white w-full border-0 border-transparent p-1 rounded-xl container mx-4 my-6"
            >
              <div className="flex flex-row">
                <img
                  src={cat.img}
                  alt={cat.name}
                  height={150}
                  width={180}
                  className=""
                />
                <div className=" flex flex-col pl-12 gap-3 mt-4">
                  <span className=" text-sm">Название книги</span>

                  <h5 className="text-2xl name font-bold tracking-tight text-gray-900 dark:text-white">
                    {cat.name}
                  </h5>
                  <div>
                    <span className="title">Автор</span>
                    <p className="font-normal authors text-gray-700 dark:text-gray-400">
                      {cat.author}
                    </p>
                  </div>
                <div className="buttons">
                  <button className="w-60 py-2 mt-10 text-white rounded border-fuchsia-600 bg-fuchsia-600">
                    Забрать
                  </button>

                </div>
                </div>
                
              </div>

              <Card className="mt-6 p-6 rounded-md shadow-md shadow-slate-700">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Описание книги
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {cat.descr}
                </p>
              </Card>
            </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Book;
