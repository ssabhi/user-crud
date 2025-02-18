// filepath: /d:/Users/test/Documents/pp-1/frontend/src/pages/index.js
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_API_URL+"user")
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="">
      <h1 className="">User List</h1>
      <ul className="">
        {users.map(user => (
          <li key={user._id} className="">
            <div>
              <h2 className="">{user.user}</h2>
              <p className="">{user.email}</p>
            </div>
            <Link href={`/user/${user._id}`} className="">
              View Details
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/user/new" className="">
        Add New User
      </Link>
    </div>
  );
}