import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTaskPage = ({ isOpen, onClose, fetchTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("task_token");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddTask = async () => {
    if (!title || !description) {
      toast.error("Task title and description are required!");
      return;
    }

    try {
      await axios.post(
        "https://taskmanage-backend-2qx5.onrender.com/api/task/",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Task created successfully!");
      fetchTasks();
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task.");
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Add New Task
            </h3>

            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter task title"
              className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter task description"
              className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleAddTask}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
              >
                Add Task
              </button>
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTaskPage;
