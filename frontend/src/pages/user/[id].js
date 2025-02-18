import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function UserDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(process.env.NEXT_PUBLIC_API_URL+`user/${id}`)
        .then(response => setUser(response.data))
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(process.env.NEXT_PUBLIC_API_URL+`user/${id}`);
      alert("User deleted successfully");
      router.push("/");  // Redirect back to the user list after deletion
    } catch (error) {
      console.error(error);
      alert("Error deleting user");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">{user.user}</h1>
        <p className="text-lg text-gray-600">Age: {user.age}</p>
        <p className="text-lg text-gray-600">Email: {user.email}</p>
        <p className="text-lg text-gray-600">Interests: {user.interest.join(", ")}</p>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleDelete}
            className="text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded-md"
          >
            Delete User
          </button>

          <Link href={`/user/edit/${user._id}`}
            className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-md">
              Edit User
            
          </Link>
        </div>
      </div>
    </div>
  );
}
