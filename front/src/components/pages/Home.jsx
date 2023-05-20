import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3003/books", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => setBooks(json));
  }, []);
  return (
    <>
      <div className="flex mt-4">
        <div className=" w-3/6 mx-4">
          <div className="border column1 rounded p-4 main">
            <h1 className="title-bis my-4">Бизнес-книги</h1>
            <p className="text-sm p text-justify w-auto">
              Бизнес-книги открывают доступ к знаниям и опыту успешных
              предпринимателей, психологов, лидеров и специалистов самых разных
              областей, не только бизнеса. Чтобы быть на шаг впереди своих
              конкурентов, получить желаемую должность, важно стать успешным
              бизнесменом, менеджером и даже психологом, ведущим за собой
              партнеров. Поэтому для современного человека чтение
              бизнес-литературы необходимо. Благо, данный жанр сейчас получил
              очень большое распространение и охватывает множество тем: основы
              предпринимательства, организационной деятельности и эффективной
              рекламы, секреты мотивации, генерации новых идей, психология
              управления. Книги таких мэтров, как Роберт Кийосаки, Ричард
              Брэнсон, Дейл Карнеги по- прежнему актуальны и востребованы.
              Лучшие бизнес-книги от профессионалов, бизнес-тренеров, гуру
              маркетинга и менеджмента, а также из других деловых сфер вы можете
              прочитать, взяв книгу в библиотеке MegaBook.
            </p>
          </div>
        </div>
        <div className="flex w-full justify-center space-x-4 spcace-y-5">
        <div className="grid grid-cols-3 gap-2 justify-center items-center">
          {books.map((book) => {
            return (
                <Link key={book.id} to={`${book.id}/${book.name}`}> 
                <div className="px-2 text-center flex flex-col justify-center rounded">
                  <img src={book.img} alt="img" className="w-32" />
                </div>
                <h3>{book.name}</h3>                
                </Link>

            );
          })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
