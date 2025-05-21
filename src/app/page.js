"use client";

import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");

  const handleReq = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/api/test");
      const res = await response.json();
      if (!response.ok) {
        throw Error(res.message || "Something went wrong");
      }
      setData(res.message);
    } catch (error) {
      console.log("Error");
      setData(error.message + " !!!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-4">
      <div className="text-white text-lg">{data}</div>
      <div>
        <button
          onClick={handleReq}
          className="p-4  my-auto bg-amber-800 cursor-pointer rounded -sm"
        >
          {isLoading ? "Sending..." : "Send request"}
        </button>
      </div>
    </div>
  );
}
