import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompleteTaskPage = ({ isOpen, onClose, taskId, fetchTasks }) => {
  const token = localStorage.getItem("task_token");

  const handleDeleteTask = async () => {
    try {
      await axios.delete(
        `https://taskmanage-backend-2qx5.onrender.com/api/task/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Task deleted successfully!");
      fetchTasks();
      onClose();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4">
            <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
              Are you sure you want to delete this task?
            </h3>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteTask}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                Yes, Delete
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

export default CompleteTaskPage;
