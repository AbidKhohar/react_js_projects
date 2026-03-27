// import React, { useState } from 'react';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   age: number;
//   password: string;
// }

// const CreatePage: React.FC = () => {``
//   const [showForm, setShowForm] = useState(false);
//   const [form, setForm] = useState<Omit<User, 'id'>>({
//     name: '',
//     email: '',
//     age: 0,
//     password: '',
//   });

//   const [data, setData] = useState<User[]>([]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setForm({
//       ...form,
//       [name]: name === 'age' ? Number(value) : value,
//     });
//   };

//   const validateForm = (): boolean => {
//     return form.name.trim() && form.email.includes('@') && form.age > 0 && form.password.trim();
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       alert('Please fill all fields correctly');
//       return;
//     }

//     const newUser: User = { id: Date.now(), ...form };
//     setData([...data, newUser]);
//     setForm({ name: '', email: '', age: 0, password: '' });
//     setShowForm(false);
//   };

//   return (
//     <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6 text-sky-600">User Management</h1>

//         {!showForm && (
//           <button
//             onClick={() => setShowForm(true)}
//             className="mb-6 px-6 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
//           >
//             + Create New User
//           </button>
//         )}

//         {showForm && (
//           <div className="mb-6 p-6 bg-white rounded shadow">
//             <h2 className="text-2xl font-bold mb-4"> Add New User</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block mb-1 text-gray-700">Full Name *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                   placeholder="Enter full name"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 text-gray-700">Email *</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                   placeholder="example@email.com"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 text-gray-700">Age *</label>
//                 <input
//                   type="number"
//                   name="age"
//                   value={form.age}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                   placeholder="Enter age"
//                   min={1}
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 text-gray-700">Password *</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                   placeholder="Enter password"
//                   required
//                 />
//               </div>
//               <div className="flex gap-3 pt-4">
//                 <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700">
//                   Add User
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                 >
//                   ✕ Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         <div className="bg-white rounded shadow overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="px-4 py-2 text-left">ID</th>
//                 <th className="px-4 py-2 text-left">Name</th>
//                 <th className="px-4 py-2 text-left">Email</th>
//                 <th className="px-4 py-2 text-left">Age</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.length > 0 ? (
//                 data.map((user) => (
//                   <tr key={user.id} className="border-b">
//                     <td className="px-4 py-2">{user.id}</td>
//                     <td className="px-4 py-2">{user.name}</td>
//                     <td className="px-4 py-2">{user.email}</td>
//                     <td className="px-4 py-2">{user.age}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
//                     No users found. Create one to get started!
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatePage;












import React, { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';

// ✅ ZOD SCHEMA
const userSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email'),
  age: z.number().min(1, 'Age must be greater than 0'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  password: string;
};

const CreatePage: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);

  // ✅ TanStack Form
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      age: 0,
      password: '',
    },
    onSubmit: async ({ value }) => {
      const result = userSchema.safeParse(value);

      if (!result.success) {
        alert(result.error.errors[0].message);
        return;
      }

      const newUser: User = {
        id: Date.now(),
        ...value,
      };

      setData((prev) => [...prev, newUser]);
      form.reset();
      setShowForm(false);
    },
  });

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-sky-600 mb-6">User Management</h1>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-6 px-6 py-2 bg-green-600 text-white rounded"
        >
          + Create User
        </button>
      )}

      {showForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault(); // 🔥 IMPORTANT
            form.handleSubmit();
          }}
          className="bg-white p-6 rounded shadow space-y-4"
        >
          {/* NAME */}
          <form.Field
            name="name"
            children={(field) => (
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Name"
                className="w-full border p-2"
              />
            )}
          />

          {/* EMAIL */}
          <form.Field
            name="email"
            children={(field) => (
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Email"
                className="w-full border p-2"
              />
            )}
          />

          {/* AGE */}
          <form.Field
            name="age"
            children={(field) => (
              <input
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                placeholder="Age"
                className="w-full border p-2"
              />
            )}
          />

          {/* PASSWORD */}
          <form.Field
            name="password"
            children={(field) => (
              <input
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Password"
                className="w-full border p-2"
              />
            )}
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-sky-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-400 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* TABLE */}
      <table className="w-full bg-white mt-6">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreatePage;



