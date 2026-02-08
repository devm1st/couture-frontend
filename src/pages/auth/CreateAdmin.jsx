import { useState } from "react";
import { auth } from "../../api/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Button from "../../components/common/Button";

const CreateAdmin = () => {
  const [email, setEmail] = useState("admin@ibrahimcouture.com");
  const [password, setPassword] = useState("admin123");
  const [message, setMessage] = useState("");

  const handleCreate = async () => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setMessage(`Admin created! UID: ${res.user.uid}`);
      console.log(res.user);
    } catch (err) {
      console.error(err);
      setMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-[#111827] border border-[#1F2933] p-8 rounded-xl w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">
          Create Admin (One Time Only)
        </h1>

        <input
          className="w-full p-3 bg-black border border-gray-700 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 bg-black border border-gray-700 mb-4 rounded"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={handleCreate}>
          Create Admin Account
        </Button>

        {message && (
          <p className="text-sm text-gray-400 mt-4">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateAdmin;
