import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
export default function AdminPage() {
  const [allCategory, setAllCategory] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3003/categories", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => setAllCategory(json));
  }, []);
  const [addBooks, setAddBooks] = useState({
    name: "",
    descr: "",
    category_id: "",
    img: "",
    autors: "",
  });

  const handleImageUpload = (event) => {
    const selectedfile = event.target.files;
    if (selectedfile.length > 0) {
      const [imageFile] = selectedfile;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const srcData = fileReader.result;
        setAddBooks({ ...addBooks, img: srcData });
      };
      fileReader.readAsDataURL(imageFile);
    }
  };

  //   const navigate = useNavigate();

  const addNewBook = (book) => {
    const newBook = [...allCategory, book];
    setAllCategory(newBook);
  };

  const onAddBookChange = (e) => {
    e.preventDefault();
    setAddBooks({
      ...addBooks,
      [e.target.name]: e.target.value,
    });
  };

  const onAddClick = (e) => {
    e.preventDefault();
    if (
      addBooks.name === "" ||
      addBooks.descr === "" ||
      addBooks.img === "" ||
      addBooks.category_id === "" ||
      addBooks.autors === ""
    ) {
      toast.error("Запольните все поля!!!");
    } else {
      const book = {
        ...addBooks,
      };
      fetch("http://localhost:3003/add_books", {
        method: "POST",
        body: JSON.stringify(book),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
      toast.success("Книга добавлено!");
      addNewBook(book);
      setAddBooks("");
      // navigate("/");
    }
  };
  const onChangeCategory = (e) => {
    e.preventDefault();
    setAddBooks({
      ...addBooks,
      category_id: e.target.value,
    });
  };

  return (
    <div className=" bg-black py-24 px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className=" text-lg mt-4 font-extrabold tracking-tight text-white md:text-4xl">
          Добавить новые книги
        </h2>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
          <div>
            <div>
              <label
                htmlFor="last-name"
                className=" text-sm font-semibold leading-6 text-white"
              >
                Автор
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  onChange={(e) => onAddBookChange(e)}
                  name="autors"
                  placeholder="Написать..."
                  id="last-name"
                  autoComplete="family-name"
                  className="p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>{" "}
            <label
              htmlFor="first-name"
              className=" text-sm font-semibold leading-6 text-white"
            >
              Название
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="name"
                onChange={(e) => onAddBookChange(e)}
                id="first-name"
                placeholder="Написать..."
                autoComplete="given-name"
                className="p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="last-name"
              className=" text-sm font-semibold leading-6 text-white"
            >
              Описание
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                onChange={(e) => onAddBookChange(e)}
                name="descr"
                placeholder="Написать..."
                id="last-name"
                autoComplete="family-name"
                className="p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mt-1.5 ">
            <label
              htmlFor="last-name"
              className=" text-sm font-semibold leading-6 text-white"
            >
              Категории
            </label>
            <select
              className="p-1 w-full rounded-md placeholder:p-2 border-0 py-1.5 text-gray-400 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={allCategory.def}
              onChange={(e) => onChangeCategory(e)}
            >
              <option className="">Категории...</option>
              {allCategory.map((category) => {
                return <option value={category.id}>{category.def}</option>;
              })}
            </select>
          </div>
          <div className="text-gray-400 ">
            <div className="my-4">
              <label
                htmlFor="last-name"
                className=" text-sm font-semibold leading-6 text-white"
              >
                Фотография
              </label>
              <input
                type="file"
                accept="image/*"
                name="img"
                placeholder=""
                onChange={(e) => handleImageUpload(e)}
                id="company"
                autoComplete="organization"
                className=" py-0.5 w-full rounded-md border-0  text-gray-400 bg-white mt-2 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:p-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className=" my-6">
          <button
            onClick={onAddClick}
            type="submit"
            className=" w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-md my-4 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Добавить
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
