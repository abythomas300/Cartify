// src/pages/AdminPanel.jsx
import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineSearch, HiOutlineBell } from "react-icons/hi";

/**
 * AdminPanel - placeholder dashboard UI
 * - Replace placeholder arrays with real API data later.
 */

const sampleUsers = [
  { id: "u1", name: "Alice", email: "alice@example.com", role: "user" },
  { id: "u2", name: "Bob", email: "bob@example.com", role: "admin" },
  { id: "u3", name: "Charlie", email: "charlie@example.com", role: "user" },
];

const sampleProducts = [
  { id: "p1", name: "Blue Shirt", price: 699, stock: 12, category: "clothing" },
  { id: "p2", name: "Coffee Mug", price: 249, stock: 40, category: "kitchen" },
];

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // TODO: replace with fetch hooks
  const users = sampleUsers;
  const products = sampleProducts;

  const statUsers = users.length;
  const statProducts = products.length;
  const statOrders = 25; // placeholder

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r w-64 p-4 transition-transform transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-64 md:translate-x-0"
          } md:static fixed top-0 left-0 h-full z-20`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-indigo-600">Cartify Admin</h2>
            <button
              className="md:hidden p-1"
              onClick={() => setSidebarOpen(false)}
              aria-label="close"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-2 text-sm">
            <a href="#overview" className="px-3 py-2 rounded hover:bg-gray-50">Overview</a>
            <a href="#users" className="px-3 py-2 rounded hover:bg-gray-50">Users</a>
            <a href="#products" className="px-3 py-2 rounded hover:bg-gray-50">Products</a>
            <a href="#orders" className="px-3 py-2 rounded hover:bg-gray-50">Orders</a>
            <a href="#settings" className="px-3 py-2 rounded hover:bg-gray-50">Settings</a>
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {/* Topbar */}
          <header className="bg-white border-b p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className="md:hidden p-2 rounded hover:bg-gray-50"
                onClick={() => setSidebarOpen((v) => !v)}
                aria-label="toggle menu"
              >
                <HiOutlineMenu className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-semibold">Admin Dashboard</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border rounded-md px-3 py-2 pr-10 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <HiOutlineSearch className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
              <button className="p-2 rounded hover:bg-gray-50">
                <HiOutlineBell className="w-6 h-6" />
              </button>
              <div className="text-sm text-gray-700">admin@cartify.com</div>
            </div>
          </header>

          {/* Dashboard content */}
          <main className="p-6 space-y-6">
            {/* Stats */}
            <section id="overview">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-xs text-gray-500">Users</div>
                  <div className="text-2xl font-bold">{statUsers}</div>
                  <div className="text-sm text-green-600 mt-1">+6% since last week</div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-xs text-gray-500">Products</div>
                  <div className="text-2xl font-bold">{statProducts}</div>
                  <div className="text-sm text-indigo-600 mt-1">New products: 2</div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-xs text-gray-500">Orders</div>
                  <div className="text-2xl font-bold">{statOrders}</div>
                  <div className="text-sm text-yellow-600 mt-1">Pending: 3</div>
                </div>
              </div>
            </section>

            {/* Tables */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Users table */}
              <div className="bg-white rounded-lg shadow p-4" id="users">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Users</h3>
                  <button className="text-sm px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700">Add user</button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left text-gray-500 border-b">
                      <tr>
                        <th className="py-2">ID</th>
                        <th className="py-2">Name</th>
                        <th className="py-2">Email</th>
                        <th className="py-2">Role</th>
                        <th className="py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} className="border-b last:border-b-0">
                          <td className="py-2">{u.id}</td>
                          <td className="py-2">{u.name}</td>
                          <td className="py-2">{u.email}</td>
                          <td className="py-2">{u.role}</td>
                          <td className="py-2">
                            <div className="flex gap-2">
                              <button className="px-2 py-1 text-xs border rounded">Edit</button>
                              <button className="px-2 py-1 text-xs border rounded">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Products table */}
              <div className="bg-white rounded-lg shadow p-4" id="products">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Products</h3>
                  <button className="text-sm px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700">Add product</button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left text-gray-500 border-b">
                      <tr>
                        <th className="py-2">ID</th>
                        <th className="py-2">Name</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Stock</th>
                        <th className="py-2">Category</th>
                        <th className="py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id} className="border-b last:border-b-0">
                          <td className="py-2">{p.id}</td>
                          <td className="py-2">{p.name}</td>
                          <td className="py-2">₹{p.price}</td>
                          <td className="py-2">{p.stock}</td>
                          <td className="py-2">{p.category}</td>
                          <td className="py-2">
                            <div className="flex gap-2">
                              <button className="px-2 py-1 text-xs border rounded">Edit</button>
                              <button className="px-2 py-1 text-xs border rounded">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
