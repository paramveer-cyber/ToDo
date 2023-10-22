import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import '../App.css';
import { useAuthFunctions } from '../server/auth';
import TaskCard from './task_card';
import io from 'socket.io-client';

const socket = io("https://charm-numerous-farmhouse.glitch.me/", { transports: ["websocket"] });


export default function ToDo() {
    const {isAuthenticated, user} = useAuthFunctions()
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [Token, setToken] = useState("");
    const date = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    useEffect(() => {
        socket.emit('givetoken');
        if (!isAuthenticated){
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks && storedTasks.length > 0) {
            setTasks(storedTasks);
        }}
    }, [isAuthenticated]);

    
    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && newTask.trim() !== '') {
            const newTaskObject = {
                id: uuid(),
                title: newTask.trim(),
            };
            setTasks([...tasks, newTaskObject]);
            setNewTask("");
        }
        
    };
    
    const handleDelete = (uniqueKey) => {
        const updatedTasks = tasks.filter((task) => task.id !== uniqueKey);
        setTasks(updatedTasks);
    };
    
    const handleModification = (key, m_title) => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map((task, index) => {
                if (task.id === key) {
                    return { id:task.id, title: m_title };
                }
                return task;
            });
            console.log(key)
            return updatedTasks;
        });
    };
    
    const UpdateUserMetadata = useCallback((updatedTasks)=>{
        if (isAuthenticated){
            socket.emit("updateData", [user['sub'], Token, updatedTasks])
        }
    }, [isAuthenticated, user, Token])
    
    const getUserMetadata = useCallback(async () => {
        const domain = "dev-xgi1ni6k23x87bgd.us.auth0.com";
        console.log(Token)
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user['sub']}`;
        
        const metadataResponse = await fetch(userDetailsByIdUrl, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
        const { user_metadata } = await metadataResponse.json();
        setTasks(user_metadata['tasks'])
    }, [Token ,user])
    
    socket.once('token', (e)=>{
        setToken(e['access_token'])
    })
    
    useEffect(()=>{
        if (user && Token && isAuthenticated){
            getUserMetadata();
        }
    }, [user, Token, isAuthenticated, getUserMetadata])

    useEffect(() => {
        UpdateUserMetadata(tasks)
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks, UpdateUserMetadata]);
    return (
        <div className='container my-3'>
            <h1 className='h1'>{`${days[date.getDay()]}`}, <span className='date'>{`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}</span></h1>
            <div className="main_content">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        unique_key={task.id}
                        title={task.title}
                        isChecked={task.isChecked} 
                        delete_func={handleDelete}
                        updateFunc={handleModification}
                    />
                ))}



            </div>
            <div className='task_card d-flex align-items-center'>
                <input
                    type="text"
                    id="input_field"
                    className="task_input form-control"
                    placeholder="Enter Tasks you want to accomplish..."
                    aria-label="Task"
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
            </div>
        </div>
    );
}
