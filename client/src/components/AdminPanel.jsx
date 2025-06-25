import React, { useState, useEffect } from 'react';
import api from '../api';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/admin/users').then(res => setUsers(res.data));
  }, []);

  return (
    <section id="admin-section">
      <h2>Admin Panel – Registered Users</h2>
      <table className="user-table">
        <thead>
          <tr><th>Name</th><th>Email/Phone</th><th>Role</th><th>Joined</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email || u.phone}</td>
              <td>{u.role}</td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
