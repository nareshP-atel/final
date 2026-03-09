import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Home from './components/Home/Home';
import AdminDashboard from './components/Admin/AdminDashboard';
import Journal from './components/Journal/Journal';
import Productivity from './components/Productivity/Productivity';
import Insights from './components/Insights/Insights';
import Community from './components/Community/Community';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './components/Auth/PrivateRoute';
import { ProgressProvider } from './context/ProgressContext';
import Profile from './components/Profile/Profile';
import Dashboard from './components/Dashboard/Dashboard';
import Analytics from './components/Analytics/Analytics';

function App() {
    return (
        <AuthProvider>
            <Router>
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute>
                                <AdminDashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route 
                        path="/journal" 
                        element={
                            <PrivateRoute>
                                <Journal />
                            </PrivateRoute>
                        } 
                    />
                    <Route
                        path="/productivity"
                        element={
                            <PrivateRoute>
                                <Productivity />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/insights"
                        element={
                            <PrivateRoute>
                                <Insights />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/community"
                        element={
                            <PrivateRoute>
                                <Community />
                            </PrivateRoute>
                        }
                    />
                    <Route 
                        path="/profile" 
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/dashboard" 
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } 
                    />
                    <Route
                        path="/analytics"
                        element={
                            <PrivateRoute>
                                <Analytics />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;