import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

const ViewTodo = ({ todo }) => {
  //   const { taskId } = useParams();
  const [, setTask] = useState(null);
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(
          `https://todo-app-postgres-backend.onrender.com/todos/${todo.todo_id}`
        );
        if (response.ok) {
          const taskData = await response.json();
          // console.log(taskData);
          setTask(taskData);
        } else {
          console.log("Failed to fetch task");
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [todo.todo_id]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-success"
        data-toggle="modal"
        data-target={`#view-${todo.todo_id}`}
      >
        View
      </button>

      <div
        className="modal fade"
        id={`view-${todo.todo_id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Task Details
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {todo ? (
                <div>
                  <p>
                    <strong>Description:</strong> {todo.description}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {todo.done ? "Completed" : "Pending"}
                  </p>
                  <p>
                    <strong>Due Date:</strong>{" "}
                    {todo.due_date
                      ? new Date(todo.due_date).toLocaleDateString()
                      : "Not specified"}
                  </p>

                  <p>
                    <strong>Priority:</strong>{" "}
                    {todo.priority ? todo.priority : "Not specified"}
                  </p>
                </div>
              ) : (
                <p>Loading task...</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTodo;
