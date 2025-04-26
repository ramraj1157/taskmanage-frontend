import React, { useState, useEffect } from "react";
import axios from "axios";
import CompleteTaskPage from "./CompleteTaskPage";
import AddTaskPage from "./AddTaskPage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ToggleSwitch from "../components/ToggleSwitch";
import { motion } from "framer-motion"; // Import Framer Motion

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const token = localStorage.getItem("task_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchTasks();
    }
  }, [token, navigate]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://taskmanage-backend-2qx5.onrender.com/api/task/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks.");
    }
  };

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskToDelete(null);
  };

  const handleAddTaskClick = () => {
    setIsAddTaskModalOpen(true);
  };

  const handleCloseAddTaskModal = () => {
    setIsAddTaskModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("task_token");
    localStorage.removeItem("task_name");
    navigate("/login");
  };

  const handleToggleStatus = async (taskId, currentStatus) => {
    try {
      await axios.put(
        `https://taskmanage-backend-2qx5.onrender.com/api/task/${taskId}/toggle`,
        { isCompleted: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
      toast.success("Task status updated successfully!");
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="w-full max-w-6xl px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.h2
            className="text-3xl font-bold text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Welcome Back, {localStorage.getItem("task_name")} 👋
          </motion.h2>
          <motion.button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </div>

        {/* Add Task Modal */}
        <AddTaskPage
          isOpen={isAddTaskModalOpen}
          onClose={handleCloseAddTaskModal}
          fetchTasks={fetchTasks}
        />

        {/* Complete Task Modal */}
        <CompleteTaskPage
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          taskId={taskToDelete}
          fetchTasks={fetchTasks}
        />

        {/* Add Task Button */}
        <div className="flex justify-end mb-4">
          <motion.button
            onClick={handleAddTaskClick}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Add Task
          </motion.button>
        </div>

        {/* Task Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Created At</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {tasks.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-gray-400 font-medium"
                  >
                    No tasks available. Create your first one!
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <motion.tr
                    key={task._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Title */}
                    <td className="py-4 px-6 text-left whitespace-nowrap font-semibold">
                      {task.title}
                    </td>

                    {/* Description */}
                    <td className="py-4 px-6 font-mono text-left">
                      {task.description || "-"}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <ToggleSwitch
                          isOn={task.isCompleted}
                          handleToggle={() =>
                            handleToggleStatus(task._id, task.isCompleted)
                          }
                        />
                        {task.isCompleted ? (
                          <span className="text-green-500 font-semibold text-sm">
                            Completed
                          </span>
                        ) : (
                          <span className="text-yellow-500 font-semibold text-sm">
                            Pending
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Created At */}
                    <td className="py-4 px-6 font-mono text-center">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-center">
                      <motion.button
                        onClick={() => handleDeleteClick(task._id)}
                        className="px-4 py-2 bg-black hover:bg-red-500 text-white rounded-md transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Delete
                      </motion.button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
