/*
BigReactApp.jsx
Single-file React component (default export) — production-ready starter with Tailwind styling.
Usage: drop into a CRA/Vite React project, ensure Tailwind is configured, then import and render <App />.
Features included:
- Responsive layout (Header, Sidebar, Content)
- Theme toggle (light/dark)
- Dashboard cards with stats
- Todo list with add/edit/delete and localStorage persistence
- Simple data table with sorting and search
- Modal component
- Reusable UI components: Button, Input, Card

Note: Tailwind classes are used for styling (no Tailwind import required here).
*/

import React, { useEffect, useMemo, useState } from 'react';

/* ---------------------- Reusable UI primitives ---------------------- */
const Button = ({ children, onClick, className = '', ...props }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-2xl shadow-sm transition active:scale-95 focus:outline-none ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className = '', ...props }) => (
  <input
    className={`px-3 py-2 rounded-lg border focus:ring-2 focus:ring-offset-1 focus:outline-none ${className}`}
    {...props}
  />
);

const Card = ({ children, className = '' }) => (
  <div className={`bg-white/80 backdrop-blur-sm dark:bg-gray-800/70 rounded-xl p-4 shadow ${className}`}>
    {children}
  </div>
);

/* ---------------------- Small utility hooks ---------------------- */
function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {}
  }, [key, state]);
  return [state, setState];
}

/* ---------------------- Modal ---------------------- */
const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative max-w-2xl w-full">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <Button onClick={onClose} className="bg-gray-200 dark:bg-gray-700">Close</Button>
          </div>
          <div>{children}</div>
        </Card>
      </div>
    </div>
  );
};

/* ---------------------- Demo components ---------------------- */
const Header = ({ onToggleSidebar, onToggleTheme, theme }) => (
  <header className="flex items-center justify-between gap-4 p-4 border-b dark:border-gray-700">
    <div className="flex items-center gap-3">
      <button onClick={onToggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
        ☰
      </button>
      <h1 className="text-xl font-bold">Big React Starter</h1>
    </div>
    <div className="flex items-center gap-3">
      <Button onClick={onToggleTheme} className="bg-gray-100 dark:bg-gray-700">Theme: {theme}</Button>
    </div>
  </header>
);

const Sidebar = ({ open }) => (
  <aside className={`bg-white/80 dark:bg-gray-900/60 border-r dark:border-gray-800 p-4 transition-all ${open ? 'w-60' : 'w-16 overflow-hidden'}`}>
    <nav className="flex flex-col gap-3">
      <a className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Dashboard</a>
      <a className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Todos</a>
      <a className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Data Table</a>
      <a className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Settings</a>
    </nav>
  </aside>
);

/* ---------------------- Dashboard ---------------------- */
const StatsCard = ({ title, value, trend }) => (
  <Card className="flex flex-col">
    <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
    <div className="text-2xl font-semibold mt-2">{value}</div>
    <div className={`text-sm mt-2 ${trend >= 0 ? 'text-green-600' : 'text-red-500'}`}>{trend >= 0 ? `▲ ${trend}%` : `▼ ${Math.abs(trend)}%`}</div>
  </Card>
);

const Dashboard = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {stats.map((s) => (
      <StatsCard key={s.title} {...s} />
    ))}
  </div>
);

/* ---------------------- Todo list ---------------------- */
const TodoList = ({ todos, setTodos }) => {
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  function addTodo() {
    if (!text.trim()) return;
    setTodos((t) => [{ id: Date.now(), text: text.trim(), done: false }, ...t]);
    setText('');
  }
  function toggleDone(id) {
    setTodos((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  }
  function remove(id) {
    setTodos((t) => t.filter((x) => x.id !== id));
  }
  function startEdit(item) {
    setEditingId(item.id);
    setEditText(item.text);
  }
  function saveEdit() {
    setTodos((t) => t.map((x) => (x.id === editingId ? { ...x, text: editText } : x)));
    setEditingId(null);
    setEditText('');
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-3">Todos</h3>
      <div className="flex gap-2 mb-3">
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="New todo" />
        <Button onClick={addTodo} className="bg-blue-500 text-white">Add</Button>
      </div>

      <ul className="space-y-2">
        {todos.length === 0 && <li className="text-gray-500">No todos yet.</li>}
        {todos.map((t) => (
          <li key={t.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={t.done} onChange={() => toggleDone(t.id)} />
              {editingId === t.id ? (
                <Input value={editText} onChange={(e) => setEditText(e.target.value)} />
              ) : (
                <span className={`select-none ${t.done ? 'line-through text-gray-400' : ''}`}>{t.text}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {editingId === t.id ? (
                <>
                  <Button onClick={saveEdit} className="bg-green-500 text-white">Save</Button>
                  <Button onClick={() => setEditingId(null)} className="bg-gray-200">Cancel</Button>
                </>
              ) : (
                <>
                  <Button onClick={() => startEdit(t)} className="bg-yellow-300">Edit</Button>
                  <Button onClick={() => remove(t.id)} className="bg-red-500 text-white">Delete</Button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

/* ---------------------- Simple Data Table ---------------------- */
const DataTable = ({ data }) => {
  const [q, setQ] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [asc, setAsc] = useState(true);

  const filtered = useMemo(() => {
    const lower = q.toLowerCase();
    return data
      .filter((r) => r.name.toLowerCase().includes(lower) || (r.email && r.email.toLowerCase().includes(lower)))
      .sort((a, b) => {
        const A = a[sortKey];
        const B = b[sortKey];
        if (A < B) return asc ? -1 : 1;
        if (A > B) return asc ? 1 : -1;
        return 0;
      });
  }, [data, q, sortKey, asc]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." />
        <div className="flex gap-2">
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} className="px-3 py-2 rounded-lg">
            <option value="name">Name</option>
            <option value="age">Age</option>
            <option value="email">Email</option>
          </select>
          <Button onClick={() => setAsc((v) => !v)} className="bg-gray-200">{asc ? 'Asc' : 'Desc'}</Button>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="p-2">Name</th>
              <th className="p-2">Age</th>
              <th className="p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t dark:border-gray-800">
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.age}</td>
                <td className="p-2">{r.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

/* ---------------------- Main App ---------------------- */
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useLocalStorage('app_theme', 'light');
  const [todos, setTodos] = useLocalStorage('app_todos', [
    { id: 1, text: 'Welcome — edit or delete me', done: false },
  ]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const stats = useMemo(
    () => [
      { title: 'Visitors', value: '12,430', trend: 4.5 },
      { title: 'Signups', value: '213', trend: -1.2 },
      { title: 'Revenue', value: '$4,980', trend: 8.7 },
    ],
    []
  );

  // sample data for table
  const data = useMemo(
    () => [
      { id: 1, name: 'Alice Johnson', age: 28, email: 'alice@example.com' },
      { id: 2, name: 'Bob Smith', age: 34, email: 'bob@example.com' },
      { id: 3, name: 'Carlos Diaz', age: 22, email: 'carlos@example.com' },
      { id: 4, name: 'Diana Prince', age: 31, email: 'diana@example.com' },
    ],
    []
  );

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all">
      <div className="max-w-7xl mx-auto">
        <Header onToggleSidebar={() => setSidebarOpen((s) => !s)} onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))} theme={theme} />
        <div className="flex">
          <Sidebar open={sidebarOpen} />
          <main className="flex-1 p-6">
            <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Dashboard stats={stats} />
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TodoList todos={todos} setTodos={setTodos} />
                  <Card>
                    <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
                    <div className="flex flex-col gap-3">
                      <Button onClick={() => setModalOpen(true)} className="bg-indigo-500 text-white">Open Modal</Button>
                      <Button onClick={() => setTodos([])} className="bg-red-500 text-white">Clear Todos</Button>
                    </div>
                  </Card>
                </div>
                <div className="mt-4">
                  <DataTable data={data} />
                </div>
              </div>
            </div>
            <footer className="text-sm text-gray-500 mt-8">Made with ❤️ — Big React Starter (single-file)</footer>
          </main>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Example Modal">
        <p className="mb-3">This is a reusable modal component. Put any content here.</p>
        <div className="flex gap-2 justify-end">
          <Button onClick={() => setModalOpen(false)} className="bg-gray-200">Close</Button>
        </div>
      </Modal>
    </div>
  );
}
                