import React, { useEffect, useState } from "react";
import { client, account } from "../appwrite/appwriteConfig";

const TestAppwrite = () => {
  const [status, setStatus] = useState("Checking connection...");

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Try to get project info
        const res = await client.call("get", "/health/version");
        console.log("Appwrite connected ", res);
        setStatus("Connected to Appwrite successfully!");
      } catch (err) {
        console.error("Appwrite connection failed ", err);
        setStatus(" Failed to connect. Check .env or endpoint.");
      }
    };

    testConnection();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-xl">
      <p>{status}</p>
    </div>
  );
};

export default TestAppwrite;
