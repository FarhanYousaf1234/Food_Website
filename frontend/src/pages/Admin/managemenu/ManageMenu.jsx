import React, { useEffect, useState } from 'react';
import './Managemenu.css'; // Import CSS for styling
import { FaEdit, FaTrash } from 'react-icons/fa';
import AdminNavbar from '../../../components/Adminnavbar/AdminNavbar';
import AdminFooter from '../../../components/AdminFooter/AdminFooter';
const Adminmanagemenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: '', imageUrl: '', availability: true });
    const [editingItem, setEditingItem] = useState(null);

    // Fetch all menu items when component mounts
    useEffect(() => {
        const fetchMenuItems = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:2000/api/menu', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);  // Check what the API response looks like
            setMenuItems(data);
        };

        fetchMenuItems();
    }, []);

    // Add a new menu item
    const handleAddItem = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('Admintoken');

        const response = await fetch('http://localhost:2000/api/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newItem),
        });

        if (response.ok) {
            const addedItem = await response.json();
            setMenuItems([...menuItems, addedItem]);
            setNewItem({ name: '', description: '', price: '', category: '', imageUrl: '', availability: true });
        }
    };

    // Handle edit menu item
    const handleEditItem = async (item) => {
        setEditingItem(item);
        setNewItem({ ...item });
    };

    // Update a menu item
    const handleUpdateItem = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('Admintoken');

        const response = await fetch(`http://localhost:2000/api/admin/${editingItem._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newItem),
        });

        if (response.ok) {
            const updatedItem = await response.json();
            setMenuItems(menuItems.map(item => (item._id === updatedItem._id ? updatedItem : item)));
            setEditingItem(null);
            setNewItem({ name: '', description: '', price: '', category: '', imageUrl: '', availability: true });
        }
    };

    // Delete a menu item
    const handleDeleteItem = async (id) => {
        const token = sessionStorage.getItem('Admintoken');
        await fetch(`http://localhost:2000/api/admin/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setMenuItems(menuItems.filter(item => item._id !== id));
    };

    return (

        // Add the AdminNavbar component
        <>
            <AdminNavbar />
            <div className="admin-Menu">
                <h2 className="Menu-title">Manage Menu</h2>

                <form onSubmit={editingItem ? handleUpdateItem : handleAddItem} className="menu-form">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newItem.description}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={newItem.category}
                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newItem.imageUrl}
                        onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
                        required
                    />
                    <label>
                        Available:
                        <input
                            type="checkbox"
                            checked={newItem.availability}
                            onChange={(e) => setNewItem({ ...newItem, availability: e.target.checked })}
                        />
                    </label>
                    <button type="submit" className="submit-button">{editingItem ? 'Update' : 'Add'} Menu Item</button>
                </form>

                <table className="menu-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuItems.map(item => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>{item.category}</td>
                                <td>{item.availability ? 'In Stock' : 'Out of Stock'}</td>
                                <td>
                                    <button onClick={() => handleEditItem(item)}><FaEdit /></button>
                                    <button onClick={() => handleDeleteItem(item._id)}><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AdminFooter />

        </>


    );
};

export default Adminmanagemenu;
