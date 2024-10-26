import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    const time = setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);
  return (
    <>
      <main
        className={`relative overflow-y-scroll bg-summer z-10 flex flex-col gap-8 items-center justify-center bg-[#00000040] h-screen`}
      >
        {/* Content */}
        <div
          className={`p-5 rounded-xl relative z-10 flex flex-col gap-8 items-center justify-center bg-[#00000040]`}
        >
          {/* Header Text */}
          <p className="font-zubajda sm:text-4xl text-xl font-bold text-white">
            Thank You!
          </p>
          <p className="font-zubajda sm:text-4xl text-xl font-bold text-white">
            Your Cherry Republic Mood
          </p>
          <p className="font-zubajda sm:text-4xl text-xl font-bold text-white">
            has been recorded!
          </p>
        </div>
      </main>
    </>
  );
}
