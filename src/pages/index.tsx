import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import backgroundImage from "../../public/icons/background_summer.jpg";
import Happy from "../../public/gifs/happy.gif";
import Sad from "../../public/gifs/sad.gif";
import Angry from "../../public/gifs/angry.gif";
import Relaxed from "../../public/gifs/relaxed.gif";
import Anxious from "../../public/gifs/anxious.gif";
import { bgClasses, bgGifs } from "../../constants";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Home() {
  type Mood = "Relaxed" | "Anxious" | "Happy" | "Angry" | "Sad";

  const MoodSelector: React.FC = () => {
    const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
    const [selectedScale, setSelectedScale] = useState<number | null>(null);
    // const [bg, setBg] = useState<string>("bg-gif1");

    const moodContent: Record<Mood, { question: string; scale: number }> = {
      Anxious: { question: "How anxious are you?", scale: 10 },
      Relaxed: { question: "How relaxed are you?", scale: 10 },
      Happy: { question: "How happy are you?", scale: 10 },
      Sad: { question: "How sad are you?", scale: 10 },
      Angry: { question: "How angry are you?", scale: 10 },
    };
    useEffect(() => {
      // Initialize an index for tracking the current item
      let currentIndex = 0;

      // Set up an interval to update the view state
      const interval = setInterval(() => {
        // Set view to the current item's view property
        // setBg(bgClasses[currentIndex]);

        // Update currentIndex to the next item, looping back to 0 if at the end
        currentIndex = (currentIndex + 1) % bgClasses.length;
      }, 4000); // 2000 ms = 2 seconds

      // Cleanup the interval when the component unmounts or updates
      return () => clearInterval(interval);
    }, []); // Empty de

    return (
      <>
        {/* <Header /> */}
        <main
          className={`relative z-10 flex flex-col gap-8 items-center justify-center bg-[#00000040] h-screen`}
        >
          {/* Background image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src={backgroundImage}
              alt="Background"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          {/* Content */}
          <div
            className={` p-5 rounded-xl relative z-10 flex flex-col gap-8 items-center justify-center bg-[#00000040] `}
            // style={{
            //   background: `url(${bg}) no-repeat center center`,
            //   backgroundSize: "cover",
            // }}
          >
            {/* Header Text */}
            <h1 className="sm:text-4xl text-xl font-bold text-white">
              Hi! <br></br>How are you feeling today?
            </h1>

            {/* Icons with embedded buttons */}
            <div className="flex flex-col items-center space-y-8">
              <div className="flex flex-wrap justify-center flex-row gap-8">
                {/* Anxious Button */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => {
                      setSelectedMood("Anxious");
                      setSelectedScale(null); // Reset scale when changing mood
                    }}
                    className="focus:outline-none"
                  >
                    <Image
                      src={Anxious}
                      alt="Relaxed Icon"
                      className="w-12 h-12"
                    />
                  </button>
                  <span className="mt-2 text-white text-sm">Anxious</span>
                </div>

                {/* Relaxed Button */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => {
                      setSelectedMood("Relaxed");
                      setSelectedScale(null); // Reset scale when changing mood
                    }}
                    className="focus:outline-none"
                  >
                    <Image
                      src={Relaxed}
                      alt="Anxious Icon"
                      className="w-12 h-12"
                    />
                  </button>
                  <span className="mt-2 text-white text-sm">Relaxed</span>
                </div>

                {/* Happy Button */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => {
                      setSelectedMood("Happy");
                      setSelectedScale(null); // Reset scale when changing mood
                    }}
                    className="focus:outline-none"
                  >
                    <Image src={Happy} alt="Happy Icon" className="w-12 h-12" />
                  </button>
                  <span className="mt-2 text-white text-sm">Happy</span>
                </div>

                {/* Sad Button */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => {
                      setSelectedMood("Sad");
                      setSelectedScale(null); // Reset scale when changing mood
                    }}
                    className="focus:outline-none"
                  >
                    <Image src={Sad} alt="Angry Icon" className="w-12 h-12" />
                  </button>
                  <span className="mt-2 text-white text-sm">Sad</span>
                </div>

                {/* Angry Button */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => {
                      setSelectedMood("Angry");
                      setSelectedScale(null); // Reset scale when changing mood
                    }}
                    className="focus:outline-none"
                  >
                    <Image src={Angry} alt="Sad Icon" className="w-12 h-12" />
                  </button>
                  <span className="mt-2 text-white text-sm">Angry</span>
                </div>
              </div>

              {/* Mood Scale Section */}
              {selectedMood && (
                <div className="flex flex-col items-center space-y-4 mt-8">
                  <h2 className="text-xl font-bold text-white">
                    {moodContent[selectedMood].question}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-5 ">
                    {Array.from(
                      { length: moodContent[selectedMood].scale },
                      (_, i) => (
                        <button
                          key={i}
                          className={`w-8 h-8 text-white border border-white rounded-full ${
                            selectedScale === i + 1
                              ? "bg-blue-500"
                              : "bg-transparent"
                          }`}
                          onClick={() => setSelectedScale(i + 1)}
                        >
                          {i + 1}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Input section for paragraph text */}
            <div className="flex flex-col items-center w-full max-w-md">
              <h2 className="text-xl font-semibold text-white mb-4">
                Do you need to describe how you're feeling in detail?
              </h2>

              {/* Text Input Area */}
              <textarea
                className="w-full p-4 text-black rounded-lg"
                rows={4}
                placeholder="Type here..."
              ></textarea>

              {/* Enter Button */}
              <button
                className="mt-4 bg-cyan-300 text-white px-6 py-2 rounded-lg hover:bg-purple-100 focus:outline-none"
                onClick={() => {
                  toast("Response Submitted");
                }}
              >
                Enter
              </button>
            </div>
          </div>
        </main>
      </>
    );
  };

  return <MoodSelector />;
}
