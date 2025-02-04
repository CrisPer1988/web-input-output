"use client";
import React, { useState } from "react";
import CreateCash from "./CreateCash";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HomeComponent = () => {
  const [show, setShow] = useState("");
  const router = useRouter();

  const handleShowCreate = () => {
    setShow("create");
  };

  const handleClose = () => {
    setShow("");
  };

  return (
    <>
      <div className="relative w-full flex justify-center gap-4">
        <div className="flex justify-center items-center text-white w-full h-20 bg-green-600 p-4 rounded-lg">
          <button onClick={handleShowCreate}>CREAR</button>
        </div>
        <div className="flex justify-center items-center text-white w-full h-20 bg-cyan-600 p-4 rounded-lg">
          <button onClick={() => router.push("/search")}>BUSCAR</button>
        </div>

        {show === "create" && (
          <>
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10"></div>

            <div className="fixed inset-0 flex items-center justify-center z-20">
              <CreateCash close={handleClose} />
            </div>
          </>
        )}
      </div>
      <div className="flex justify-center">
        <Image src="/logo.jpg" alt="logo" width={250} height={250} />
      </div>
    </>
  );
};

export default HomeComponent;
