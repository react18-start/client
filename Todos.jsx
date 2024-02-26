/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import 'C:/Users/Faisal/Desktop/client/src/index.css'
import { Button, Input, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'C:/Users/Faisal/Desktop/client/src/LoginForm.css'

function Todos() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ name: '', username: '', email: '', phone: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const showModal = () => {
      setIsModalOpen(true);
    };
    useEffect(() => {
        fetchTodos();
    }, []);
  
    const fetchTodos = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (response.ok) {
                const data = await response.json();
                setTodos(data);
            } else {
                console.error('Failed to fetch TODOs');
            }
        } catch (error) {
            console.error('Error fetching TODOs:', error);
        }
    };
  
    const handleOk = () => {
        setIsModalOpen(false);
        if (editIndex !== null) {
            const updatedTodos = [...todos];
            updatedTodos[editIndex] = newTodo;
            setTodos(updatedTodos);
        } else {
        setTodos([...todos, newTodo]);
        }
        setNewTodo({ name: '', username: '', email: '', phone: '' });
        setEditIndex(null);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditIndex(null);
    };


    const handleEditClick = (index) => {
        setEditIndex(index); 
        
        setNewTodo(todos[index]); 
        showModal(); 
    };
    const handleDeleteClick = (index) => {
        const updatedTodos = todos.filter((todo, i) => i !== index);
        setTodos(updatedTodos);
    };


    return (
        <>
        <div>
            <h2 className='todo-container'>Todos
              <Button className='add' type="primary" onClick={showModal}>Add</Button>
            </h2>
            <Modal className='todo-wrapper'
              title={editIndex !== null ?
              "Edit Todo" :"Add New Todo"} 
              open={isModalOpen} 
              onOk={handleOk} 
              onCancel={handleCancel}>
              <>
                <Input
                    placeholder="Name"
                    value={newTodo.name}
                    onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
                    className="todos-input"
                />
                <Input
                    placeholder="Username"
                    value={newTodo.username}
                    onChange={(e) => setNewTodo({ ...newTodo, username: e.target.value })}
                    className="todos-input"
                />
                <Input
                    placeholder="Email"
                    value={newTodo.email}
                    onChange={(e) => setNewTodo({ ...newTodo, email: e.target.value })}
                    className="todos-input"
                />
                <Input
                    placeholder="Phone"
                    value={newTodo.phone}
                    onChange={(e) => setNewTodo({ ...newTodo, phone: e.target.value })}
                    className="todos-input"
                />
                </>
            </Modal>


            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => (
                        <tr key={todo.id}>
                            <td>{todo.name}</td>
                            <td>{todo.username}</td>
                            <td>{todo.email}</td>
                            <td>{todo.phone}</td>
                            <td>
                             <Button type="link" onClick={() => handleEditClick(index)} icon={<EditOutlined />} />
                             <Button type="link" onClick={() => handleDeleteClick(index)} icon={<DeleteOutlined/>} />
                           </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  </>  

    );
}

export default Todos;
