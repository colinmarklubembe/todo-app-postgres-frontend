import React, { useEffect, useState } from "react";
import { Table, DropdownButton, Dropdown } from "react-bootstrap";
import EditTodo from "./EditTodo";
import ViewTodo from "./ViewTodo";
import SearchBar from "./SearchBar";
import Spinner from "./Spinner";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const [doneStatus, setDoneStatus] = useState(todos.done);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);


  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(
        `https://todo-app-postgres-backend.onrender.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );

      setTodos(todos.filter((todo) => todo.todo_id !== id));
      console.log(deleteTodo);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleToggle = async (e, todo) => {
    e.preventDefault();
    try {
      const newDoneStatus = !todo.done;
      console.log(newDoneStatus);
      const response = await fetch(
        `https://todo-app-postgres-backend.onrender.com/todos/toggle/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ doneStatus: newDoneStatus }),
        }
      );
      console.log(response);
      if (response.ok) {
        setDoneStatus(newDoneStatus);
        getTodos();
        // window.location = "/";
      } else {
        console.log("Failed to toggle done status!");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://todo-app-postgres-backend.onrender.com/todos"
      );
      const jsonData = await response.json();

      setTodos(jsonData);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  // useEffect(() => {
  //   const filterTodos = (eventKey) => {
  //     if (eventKey === "All") {
  //       setFilteredTodos(todos);
  //     } else {
  //       const filtered = todos.filter((todo) =>
  //         eventKey === "Incomplete" ? !todo.done : todo.done
  //       );
  //       setFilteredTodos(filtered);
  //     }
  //   };

  //   filterTodos(filterStatus);
  // }, [filterStatus, todos]);

  useEffect(() => {
    getTodos();
  }, []);

  // const handleSearch = (query) => {
  //   setSearchQuery(query);
  // }

  // useEffect(() => {
  //   const filteredQuery = todos.filter((todo) => {
  //     return todo.description.toLowerCase().includes(searchQuery.toLowerCase());
  //   });
  //   setFilteredTodos(filteredQuery);
  // }, [searchQuery, todos]);

  // useEffect(() => {
  //   setFilteredTodos(searchResults);
  // }, [searchResults]);

  useEffect(() => {
    const filterTodos = () => {
      let filtered = todos;
      if (filterStatus !== "All") {
        filtered = filtered.filter((todo) =>
          filterStatus === "Incomplete" ? !todo.done : todo.done
        );
      }
      if (searchQuery.trim() !== "") {
        filtered = filtered.filter((todo) =>
          todo.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setFilteredTodos(filtered);
    };

    filterTodos();
  }, [filterStatus, searchQuery, todos]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="list-todo">
      <div className="dropdown mt-2 ml-3">
        <span>Filter by status:</span>
        <DropdownButton
          className="mt-2"
          id="dropdown-basic-button"
          variant="outline-info"
          title={filterStatus}
          onSelect={(eventKey) => setFilterStatus(eventKey)}
        >
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
          <Dropdown.Item eventKey="Incomplete">Incomplete</Dropdown.Item>
          <Dropdown.Item eventKey="Complete">Complete</Dropdown.Item>
        </DropdownButton>
        <div className="mt-3">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <Table responsive hover className="mt-4 text-center">
          <thead>
            <tr>
              <td>Status</td>
              <td>Description</td>
              <td>View Todo</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo) => (
              <tr key={todo.todo_id} className="table-row">
                <td>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        onChange={(e) => handleToggle(e, todo)}
                        checked={todo.done}
                      />
                    </label>
                  </div>
                </td>
                <td
                  className={
                    filterStatus === "Complete"
                      ? ""
                      : todo.done
                      ? "text-crossed"
                      : ""
                  }
                >
                  {todo.description}
                </td>
                <td>
                  <ViewTodo todo={todo} />
                </td>
                <td>
                  <EditTodo todo={todo} />
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ListTodo;
