import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function AddUser() {
  const [user, setUser] = useState({ user: "", interest: "", age: "", mobile: "", email: "" });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/user", user);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Add New User</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">User Name</label>
            <input
              type="text"
              name="user"
              value={user.user}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Interests</label>
            <input
              type="text"
              name="interest"
              value={user.interest}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={user.age}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Mobile</label>
            <input
              type="number"
              name="mobile"
              value={user.mobile}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
