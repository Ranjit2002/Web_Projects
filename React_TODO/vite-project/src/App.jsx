import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import darkIcon from "./img/dark.png";
import lightIcon from "./img/light.png";
import addIcon from "./img/add.png";
import searchIcon from "./img/search.png";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos && savedTodos.length > 0) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    if (todo.trim() === "") return;
    setTodos([{ id: Date.now(), todo: todo, iscompleted: false }, ...todos]);
    setTodo("");
  };

  const handleEdit = (id) => {
    const taskToEdit = todos.find((item) => item.id === id);
    setTodo(taskToEdit.todo);
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, iscompleted: !item.iscompleted };
      }
      return item;
    });
    setTodos(updatedTodos);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-[#121212]" : "bg-white"}`}
    >
      {/* Global wrapper changes background based on dark mode */}
      <Navbar />

      <div className="container mx-auto flex justify-center items-center relative mt-10 px-4 lg:px-0">
        {/* === FRONT CARD (FUNCTIONAL) === */}
        <div
          className={`container1 h-[70vh] w-full lg:w-[50vw] relative lg:absolute lg:mt-[10%] lg:mr-44 z-10 rounded-xl shadow-2xl flex flex-col py-6 transition-colors duration-300 ${isDarkMode ? "bg-[#242424] text-white" : "bg-[#f7f7f7] text-black"}`}
        >
          <span className="flex items-center justify-center font-bold text-2xl mb-6">
            TODO LIST
          </span>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 sm:px-10">
            <div
              className={`flex items-center border-2 border-indigo-500 rounded-md px-2 w-full sm:w-max mt-1 transition-colors duration-300 ${isDarkMode ? "bg-[#333]" : "bg-white"}`}
            >
              <img
                src={searchIcon}
                alt="search icon"
                className="w-6 h-5 object-contain"
              />
              <input
                onChange={handleChange}
                value={todo}
                type="text"
                placeholder="Enter TODO here"
                className={`outline-none pl-2 py-2 sm:py-1 bg-transparent w-full sm:w-[30vw] text-lg ${isDarkMode ? "text-white" : "text-black"}`}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
            </div>

            <div className="all flex justify-center items-center bg-indigo-500 hover:bg-indigo-400 text-white w-full sm:w-[8vw] px-2 py-2 rounded-md transition-transform active:-translate-y-2 duration-200">
              <button onClick={handleAdd} className="font-semibold w-full">
                ADD
              </button>
            </div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="absolute top-5 right-7 w-8 h-8 hidden lg:block"
            >
              <img
                src={isDarkMode ? lightIcon : darkIcon}
                alt="theme toggle"
                className="w-full h-full object-contain bg-indigo-500 p-2 rounded-lg transition-transform active:scale-95 duration-150 cursor-pointer"
              />
            </button>
          </div>

          <div className="todos-list overflow-y-auto mt-8 px-4 sm:px-10 flex-1">
            {todos.map((item) => {
              return (
                <div
                  key={item.id}
                  className={`todo flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-lg shadow-sm mb-3 transition-colors duration-300 ${isDarkMode ? "bg-[#333]" : "bg-white"}`}
                >
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <input
                      type="checkbox"
                      checked={item.iscompleted}
                      onChange={() => toggleComplete(item.id)}
                      className="w-5 h-5 cursor-pointer accent-indigo-500 flex-shrink-0"
                    />
                    <div
                      className={`text-lg break-all ${item.iscompleted ? "line-through text-gray-500" : "font-medium"}`}
                    >
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex gap-2 mt-3 sm:mt-0 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="p-[3px] relative flex-1 sm:flex-none"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                      <div className="px-3 py-[6px] bg-[#242424] hover:bg-indigo-500 rounded-[6px] transition-transform active:-translate-y-2 duration-150 relative group text-white font-semibold text-center">
                        Edit
                      </div>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-[3px] relative flex-1 sm:flex-none"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                      <div className="px-4 py-[6px] bg-red-600 hover:bg-red-400 rounded-[6px] transition-transform active:-translate-y-2 duration-150 relative group text-white font-semibold text-center">
                        Delete
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleAdd}
            className="absolute bottom-5 right-7 w-10 h-10 hidden lg:block"
          >
            <img
              src={addIcon}
              alt="add item"
              className="w-full h-full object-contain bg-indigo-500 p-2 rounded-full transition-transform active:scale-95 duration-150"
            />
          </button>
        </div>

        {/* === BACK CARD (DECORATIVE) === */}
        <div
          className={`container2 hidden lg:block relative h-[70vh] w-[50vw] rounded-xl shadow-xl transition-colors duration-300 ${isDarkMode ? "bg-[#f7f7f7] text-black" : "bg-[#242424] text-white"}`}
        >
          <span className="flex justify-center items-center font-bold text-2xl mt-9">
            TODO LIST
          </span>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="absolute top-20 right-12 w-8 h-8"
          >
            <img
              src={isDarkMode ? darkIcon : lightIcon}
              alt="theme toggle"
              className="w-full h-full object-contain bg-indigo-500 p-2 rounded-lg transition-transform active:scale-95 duration-150 cursor-pointer"
            />
          </button>

          <button
            onClick={handleAdd}
            className="absolute bottom-3 right-10 w-10 h-10"
          >
            <img
              src={addIcon}
              alt="add item"
              className="w-full h-full object-contain bg-indigo-500 p-2 rounded-full transition-transform active:scale-95 duration-150"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
