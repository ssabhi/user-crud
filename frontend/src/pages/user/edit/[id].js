// pages/user/edit/[id].js
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({ user: "", interest: "", age: "", mobile: "", email: "" });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/user/${id}`)
        .then(response => setUser(response.data))
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/user/${id}`, user);
      router.push(`/user/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>User Name: </label>
      <input type="text" name="user" value={user.user} onChange={handleChange} required />
      <br />
      <label>Interest: </label>
      <input type="text" name="interest" value={user.interest} onChange={handleChange} required />
      <br />
      <label>Age: </label>
      <input type="number" name="age" value={user.age} onChange={handleChange} required />
      <br />
      <label>Mobile: </label>
      <input type="number" name="mobile" value={user.mobile} onChange={handleChange} required />
      <br />
      <label>Email: </label>
      <input type="email" name="email" value={user.email} onChange={handleChange} required />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
