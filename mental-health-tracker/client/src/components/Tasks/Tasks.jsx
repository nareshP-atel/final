import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import apiService from '../../services/apiService';
import './Tasks.css';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: ''
    });

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            setLoading(true);
            const response = await apiService.getTasks();
            if (response.success) {
                setTasks(response.tasks);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            toast.error('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiService.createTask(newTask);
            if (response.success) {
                setTasks([response.task, ...tasks]);
                setNewTask({
                    title: '',
                    description: '',
                    priority: 'medium',
                    dueDate: ''
                });
                toast.success('Task created successfully!');
            }
        } catch (error) {
            toast.error('Failed to create task');
        }
    };

    const handleDelete = async (taskId) => {
        try {
            const response = await apiService.deleteTask(taskId);
            if (response.success) {
                setTasks(tasks.filter(task => task._id !== taskId));
                toast.success('Task deleted successfully!');
            }
        } catch (error) {
            toast.error('Failed to delete task');
        }
    };

    if (loading) {
        return <div className="tasks-loading">Loading tasks...</div>;
    }

    return (
        <div className="tasks-container">
            <h2>My Tasks</h2>
            
            <form onSubmit={handleSubmit} className="task-form">
                <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    placeholder="Task title"
                    required
                />
                <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    placeholder="Task description (optional)"
                />
                <div className="form-row">
                    <select
                        value={newTask.priority}
                        onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                    <input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    />
                </div>
                <button type="submit">Add Task</button>
            </form>

            <div className="tasks-list">
                {tasks.length === 0 ? (
                    <div className="no-tasks">No tasks yet. Add your first task!</div>
                ) : (
                    tasks.map(task => (
                        <div key={task._id} className={`task-card priority-${task.priority}`}>
                            <h3>{task.title}</h3>
                            {task.description && <p>{task.description}</p>}
                            <div className="task-footer">
                                <div className="task-info">
                                    <span className={`priority-tag ${task.priority}`}>
                                        {task.priority}
                                    </span>
                                    {task.dueDate && (
                                        <span className="due-date">
                                            Due: {new Date(task.dueDate).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                                <button 
                                    onClick={() => handleDelete(task._id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Tasks;