import Header from "../components/Header";
import React, { useState } from "react";
import Image from "next/image";
import Happy from "../../public/icons/happy (1).png";
import Sad from "../../public/icons/sad-face.png";
import Angry from "../../public/icons/angry.png";
import Relaxed from "../../public/icons/dreamy.png";
import Anxious from "../../public/icons/anxious.png";

export default function Home() {
  type Mood = "Relaxed" | "Anxious" | "Happy" | "Angry" | "Sad";

  const MoodSelector: React.FC = () => {
    const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
    const [selectedScale, setSelectedScale] = useState<number | null>(null);

    const moodContent: Record<Mood, { question: string; scale: number }> = {
      Anxious: { question: "How anxious are you?", scale: 10 },
      Relaxed: { question: "How relaxed are you?", scale: 10 },
      Happy: { question: "How happy are you?", scale: 10 },
      Sad: { question: "How sad are you?", scale: 10 },
      Angry: { question: "How angry are you?", scale: 10 },
    };

    return (
      <>
        <Header />
        <main className="relative mt-16">
          {/* Background YouTube Video */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/eTD0WWFIDAg?autoplay=1&loop=1&mute=1&playlist=eTD0WWFIDAg"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Background Video"
            ></iframe>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50 space-y-8">
            {/* Header Text */}
            <h1 className="text-4xl font-bold text-white">
              Hi! <br></br>How are you feeling today?
            </h1>

            {/* Icons with embedded buttons */}
            <div className="flex flex-col items-center space-y-8">
              <div className="flex space-x-14">
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
                  <span className="mt-2 text-white text-sm">Anxious</span>
                </div>
              </div>

              {/* Mood Scale Section */}
              {selectedMood && (
                <div className="flex flex-col items-center space-y-4 mt-8">
                  <h2 className="text-xl font-bold text-white">
                    {moodContent[selectedMood].question}
                  </h2>
                  <div className="flex space-x-2">
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
                className="mt-4 bg-purple-800 text-white px-6 py-2 rounded-lg hover:bg-purple-400 focus:outline-none"
                onClick={() => alert("Details submitted!")}
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