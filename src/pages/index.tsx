import React, { useEffect, useState } from "react";
import Image from "next/image";
import Happy from "../../public/icons/straight.png";
import Sad from "../../public/icons/smile.png";
import Angry from "../../public/icons/very smile.png";
import Relaxed from "../../public/icons/sad.png";
import Anxious from "../../public/icons/very sad.png";

import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  type Mood = "RELAXED" | "ANXIOUS" | "HAPPY" | "ANGRY" | "SAD";

  const MoodSelector: React.FC = () => {
    const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
    const [selectedScale, setSelectedScale] = useState<number | null>(null);
    const [showScale, setShowScale] = useState<boolean>(false);
    const [showTextBox, setShowTextBox] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>("");
    const [ip, setIp] = useState<string>("");

    const router = useRouter();

    const moodContent: Record<Mood, { question: string; scale: number }> = {
      ANXIOUS: { question: "How anxious are you?", scale: 10 },
      RELAXED: { question: "How relaxed are you?", scale: 10 },
      HAPPY: { question: "How happy are you?", scale: 10 },
      SAD: { question: "How sad are you?", scale: 10 },
      ANGRY: { question: "How angry are you?", scale: 10 },
    };

    // Handle the display of the first toast notification
    const handleMoodSelection = async (mood: Mood) => {
      setSelectedMood(mood);
      setShowScale(true);

      try {
        await axios.post("http://localhost:8082/api/mood/create-mood", {
          rating: mood,
        });
        router.push("/success");
      } catch (error) {
        console.log(error);
      }
    };

    // Handle the final submission of the text box
    const handleFinalSubmit = () => {};

    return (
      <>
        <main
          className={`relative overflow-y-scroll bg-summer z-10 flex flex-col gap-8 items-center justify-center bg-[#00000040] h-screen`}
        >
          {/* Content */}
          <div
            className={`p-5 rounded-xl relative z-10 flex flex-col gap-8 items-center justify-center bg-white`}
          >
            {/* Header Text */}
            <div className="flex flex-col ">
              <p className="font-zubajda sm:text-[16px] text-sm font-bold text-red-600 text-center">
                Hello IT Department !
              </p>
              <p className="font-zubajda sm:text-[62px] text-xl sm:leading-[80px] font-bold text-red-600 text-center">
                what is your cherry republic mood today?
              </p>
            </div>

            {/* Icons with embedded buttons */}
            <div className="">
              <div className="flex flex-wrap justify-center flex-row gap-8">
                {/* Anxious Button */}
                <div className="flex flex-col items-center ">
                  <button
                    onClick={() => handleMoodSelection("ANXIOUS")}
                    className="ease-in-out duration-700 hover:bg-white focus:outline-none bg-red-600 rounded-xl px-8 py-2"
                  >
                    <Image
                      src={Anxious}
                      alt="Anxious Icon"
                      className="w-32 h-32"
                    />
                  </button>
                  {/* <span className="mt-2 text-white font-semibold">Anxious</span> */}
                </div>

                {/* Relaxed Button */}
                <div className="flex flex-col items-center ">
                  <button
                    onClick={() => handleMoodSelection("RELAXED")}
                    className="ease-in-out duration-700 hover:bg-white focus:outline-none bg-red-600 rounded-xl px-8 py-2"
                  >
                    <Image
                      src={Relaxed}
                      alt="Relaxed Icon"
                      className="w-32 h-32"
                    />
                  </button>
                  {/* <span className="mt-2 text-white font-semibold">Relaxed</span> */}
                </div>

                {/* Happy Button */}
                <div className="flex flex-col items-center ">
                  <button
                    onClick={() => handleMoodSelection("HAPPY")}
                    className="ease-in-out duration-700 hover:bg-white focus:outline-none bg-red-600 rounded-xl px-8 py-2"
                  >
                    <Image src={Happy} alt="Happy Icon" className="w-32 h-32" />
                  </button>
                  {/* <span className="mt-2 text-white font-semibold">Happy</span> */}
                </div>

                {/* Sad Button */}
                <div className="flex flex-col items-center ">
                  <button
                    onClick={() => handleMoodSelection("SAD")}
                    className="ease-in-out duration-700 hover:bg-white focus:outline-none bg-red-600 rounded-xl px-8 py-2"
                  >
                    <Image src={Sad} alt="Sad Icon" className="w-32 h-32" />
                  </button>
                  {/* <span className="mt-2 text-white font-semibold">Sad</span> */}
                </div>

                {/* Angry Button */}
                <div className="flex flex-col items-center ">
                  <button
                    onClick={() => handleMoodSelection("ANGRY")}
                    className="ease-in-out duration-700 hover:bg-white focus:outline-none bg-red-600 rounded-xl px-8 py-2"
                  >
                    <Image src={Angry} alt="Angry Icon" className="w-32 h-32" />
                  </button>
                  {/* <span className="mt-2 text-white font-semibold">Angry</span> */}
                </div>
              </div>

              {/* Input section for paragraph text */}
              {showTextBox && (
                <div className="flex flex-col items-center w-full max-w-md">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Do you need to describe how you're feeling in detail?
                  </h2>

                  {/* Text Input Area */}
                  <textarea
                    className="w-full p-4 text-black rounded-lg"
                    rows={4}
                    placeholder="Type here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  ></textarea>

                  {/* Enter Button */}
                </div>
              )}
              {/* <button
                className="mt-4 bg-cyan-300 text-white px-6 py-2 rounded-lg hover:bg-purple-100 focus:outline-none"
                onClick={handleFinalSubmit}
              >
                Enter
              </button> */}
            </div>
          </div>
        </main>
      </>
    );
  };

  return <MoodSelector />;
}
