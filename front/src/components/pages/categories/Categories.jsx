import { Link } from "react-router-dom";

const Categories = ({ categories }) => {
  return (
    <>
      <div className=" flex p-4">
        <div className=" w-3/6 mx-4">
          <div className="border bg-green-500 rounded p-4 mt-4">
            <h1 className="my-4">Бизнес-книги</h1>
            <p className="text-sm text-justify w-auto">
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
          <div className="grid grid-cols-3 gap-3 gap-y-0 justify-center items-center">
            {categories.map((category) => {
              return (
                <div
                  key={category.id}
                  className=" bg-fuchsia-400  px-2 h-24 text-center flex flex-col justify-center rounded"
                >
                  <Link to={`/${category.href}`}>
                    <p className=" hover:text-amber-400">{category.def}</p>
                  </Link>
                </div>
              );
            })}{" "}
          </div>
        </div>
      </div>
    </>
  );
};
export default Categories;
