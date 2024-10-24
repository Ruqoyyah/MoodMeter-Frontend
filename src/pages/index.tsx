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
    const [showScale, setShowScale] = useState<boolean>(false);
    const [showTextBox, setShowTextBox] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>("");

    const moodContent: Record<Mood, { question: string; scale: number }> = {
      Anxious: { question: "How anxious are you?", scale: 10 },
      Relaxed: { question: "How relaxed are you?", scale: 10 },
      Happy: { question: "How happy are you?", scale: 10 },
      Sad: { question: "How sad are you?", scale: 10 },
      Angry: { question: "How angry are you?", scale: 10 },
    };

    // Handle the display of the first toast notification
    const handleMoodSelection = (mood: Mood) => {
      setSelectedMood(mood);
      toast("Thank you for logging your emotions", {
        onClose: () => setShowScale(true), // Show the mood scale when the toast closes
        autoClose: 2000, // Optional: Adjust the duration of the toast
      });
    };

    // Handle the final submission of the text box
    const handleFinalSubmit = () => {
      toast("Your details have been submitted successfully!", {
        onClose: () => {
          // Refresh the page after the second toast ends
          window.location.reload();
        },
        autoClose: 2000, // Optional: Adjust the duration of the toast
      });
    };

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
              Hello, <br />
              what is your cherry republic mood today?
            </p>

            {/* Icons with embedded buttons */}
            <div className="flex flex-col items-center space-y-8">
              <div className="flex flex-wrap justify-center flex-row gap-8">
                {/* Anxious Button */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleMoodSelection("Anxious")}
                    className="focus:outline-none"
                  >
                    <Image
                      src={Anxious}
                      alt="Anxious Icon"
                      className="w-16 h-16"
                    />
                  </button>
                  <span className="mt-2 text-white font-semibold">Anxious</span>
                </div>

                {/* Relaxed Button */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleMoodSelection("Relaxed")}
                    className="focus:outline-none"
                  >
                    <Image
                      src={Relaxed}
                      alt="Relaxed Icon"
                      className="w-16 h-16"
                    />
                  </button>
                  <span className="mt-2 text-white font-semibold">Relaxed</span>
                </div>

                {/* Happy Button */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleMoodSelection("Happy")}
                    className="focus:outline-none"
                  >
                    <Image src={Happy} alt="Happy Icon" className="w-16 h-16" />
                  </button>
                  <span className="mt-2 text-white font-semibold">Happy</span>
                </div>

                {/* Sad Button */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleMoodSelection("Sad")}
                    className="focus:outline-none"
                  >
                    <Image src={Sad} alt="Sad Icon" className="w-16 h-16" />
                  </button>
                  <span className="mt-2 text-white font-semibold">Sad</span>
                </div>

                {/* Angry Button */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleMoodSelection("Angry")}
                    className="focus:outline-none"
                  >
                    <Image src={Angry} alt="Angry Icon" className="w-16 h-16" />
                  </button>
                  <span className="mt-2 text-white font-semibold">Angry</span>
                </div>
              </div>

              {/* Mood Scale Section */}
              {/* {showScale && selectedMood && (
                <div className="flex flex-col items-center space-y-4 mt-8">
                  <h2 className="text-xl font-bold text-white">
                    {moodContent[selectedMood].question}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-5">
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
                          onClick={() => {
                            setSelectedScale(i + 1);
                            setShowTextBox(true); // Show the text box after selecting scale
                          }}
                        >
                          {i + 1}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )} */}

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
                  <button
                    className="mt-4 bg-cyan-300 text-white px-6 py-2 rounded-lg hover:bg-purple-100 focus:outline-none"
                    onClick={handleFinalSubmit}
                  >
                    Enter
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </>
    );
  };

  return <MoodSelector />;
}
