import React, { useEffect, useState } from "react";
import Image from "next/image";
import Happy from "../../public/gifs/happy.gif";
import Sad from "../../public/gifs/sad.gif";
import Angry from "../../public/gifs/angry.gif";
import Relaxed from "../../public/gifs/relaxed.gif";
import Anxious from "../../public/gifs/anxious.gif";

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
    const [loading, setLoading] = useState<boolean>(false);
    const [ip, setIp] = useState<string>("");

    const router = useRouter();
    const fetchIp = async () => {
      axios
        .get("https://ipapi.co/json/")
        .then((response) => {
          console.log(response);
          setIp(response.data.ip);
        })
        .catch(() => {
          // TODO: loader status: setIsGettingLocation(false);
          console.log(
            "the geolocation service is not supported in your browser"
          );
        });
    };

    useEffect(() => {
      fetchIp();
    }, []);

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
    };

    // Handle the final submission of the text box
    const handleFinalSubmit = async () => {
      if (selectedMood === null) {
        toast.error("Kindly select a mood");
        return;
      }
      if (selectedScale === null) {
        toast.error(`Kindly specify how ${selectedScale} you are`);
        return;
      }
      setLoading(true);
      try {
        setLoading(false);
        const res = await axios.post(
          "http://localhost:8082/api/mood/create-mood",
          {
            rating: selectedMood,
            intensity: selectedScale,
          }
        );
        if (res.data.statusCode == "OK") {
          router.push("/success");
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
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
            <p className="font-zubajda sm:text-[62px] text-xl sm:leading-[80px] font-bold text-white">
              Hello, <br />
              what is your cherry republic mood today?
            </p>

            {/* Icons with embedded buttons */}
            <div className="flex flex-col items-center space-y-8">
              <div className="flex flex-wrap justify-center flex-row gap-8">
                {/* Anxious Button */}
                <div className="flex flex-col items-center ">
                  <button
                    onClick={() => handleMoodSelection("ANXIOUS")}
                    className="ease-in-out duration-700 hover:bg-white focus:outline-none bg-[#ffffff80] rounded-full p-2"
                  >
                    <Image
                      src={Anxious}
                      alt="Anxious Icon"
                      className="w-32 h-32"
                    />
                  </button>
                  <span className="mt-2 text-white font-semibold">Anxious</span>
                </div>

                {/* Relaxed Button */}
                <div className="flex flex-col items-center ">
                  <button
                    onClick={() => handleMoodSelection("RELAXED")}
                    className="ease-in-out duration-700 hover:bg-white focus:outline-none bg-[#ffffff80] rounded-full p-2"
                  >
                    <Image
                      src={Relaxed}
                      alt="Relaxed Icon"
                      className="w-32 h-32"
                    />
                  </button>
                  <span className="mt-2 text-white font-semibold">Relaxed</span>
                </div>

                {/* Happy Button */}
                <div className="flex flex-col items-center ">
                  <button
                    onClick={() => handleMoodSelection("HAPPY")}
                    className="ease-in-out duration-700 hover:bg-white focus:outline-none bg-[#ffffff80] rounded-full p-2"
                  >
                    <Image src={Happy} alt="Happy Icon" className="w-32 h-32" />
                  </button>
                  <span className="mt-2 text-white font-semibold">Happy</span>
                </div>

                {/* Sad Button */}
                <div className="flex flex-col items-center ">
                  <button
                    onClick={() => handleMoodSelection("SAD")}
                    className="ease-in-out duration-700 hover:bg-white focus:outline-none bg-[#ffffff80] rounded-full p-2"
                  >
                    <Image src={Sad} alt="Sad Icon" className="w-32 h-32" />
                  </button>
                  <span className="mt-2 text-white font-semibold">Sad</span>
                </div>

                {/* Angry Button */}
                <div className="flex flex-col items-center ">
                  <button
                    onClick={() => handleMoodSelection("ANGRY")}
                    className="ease-in-out duration-700 hover:bg-white focus:outline-none bg-[#ffffff80] rounded-full p-2"
                  >
                    <Image src={Angry} alt="Angry Icon" className="w-32 h-32" />
                  </button>
                  <span className="mt-2 text-white font-semibold">Angry</span>
                </div>
              </div>

              {/* Mood Scale Section */}
              {showScale && selectedMood && (
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
                            // setShowTextBox(true); // Show the text box after selecting scale
                          }}
                        >
                          {i + 1}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

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
              <button
                className="mt-4 bg-cyan-300 text-white px-6 py-2 rounded-lg hover:bg-purple-100 focus:outline-none"
                onClick={handleFinalSubmit}
                disabled={loading}
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
