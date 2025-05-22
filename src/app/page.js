"use client";

import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");
  const [customIp, setCustomIp] = useState("");

  const handleReq = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const url = "https://string-geo-backend-tbgf.onrender.com";
      // const url = "http://localhost:4000";
      const response = await fetch(`${url}/api/test`, {
        method: "POST",
        body: JSON.stringify({ customIp: customIp?.trim() }),
        headers: {
          "Content-Type": "application/json",
        },
      });
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
      <div className="text-white text-lg flex break-all">{data}</div>
      <div className="flex gap-2">
        <input
          type="text"
          value={customIp}
          onChange={(e) => {
            const value = e.target.value;
            setCustomIp(value);
          }}
          placeholder="Enter any custom ip"
          className="text-white px-2"
        />
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
