import React, { useState, useEffect, useRef } from "react";

// IMPORTANT: This path matches the VS Code folder structure in your screenshot!
import wakeUpSound from "/music/wake_up.mp3";

// --- The TimePicker Modal Sub-Component ---
const TimePickerModal = ({ isOpen, onClose, onSave, onClear }) => {
  const [mode, setMode] = useState("hour");
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState("PM");

  useEffect(() => {
    if (isOpen) setMode("hour");
  }, [isOpen]);

  if (!isOpen) return null;

  const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const currentItems = mode === "hour" ? hours : minutes;
  const displayHour = hour.toString().padStart(2, "0");
  const displayMinute = minute.toString().padStart(2, "0");

  const handAngle = mode === "hour" ? (hour % 12) * 30 : minute * 6;

  const handleItemClick = (val) => {
    if (mode === "hour") {
      setHour(val);
      setMode("minute");
    } else {
      setMinute(val);
    }
  };

  const handleSaveClick = () => {
    // Normal space used here
    onSave(`${displayHour}:${displayMinute} ${period}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center font-sans">
      <div className="w-[320px] bg-[#323232] shadow-2xl rounded-md overflow-hidden select-none">
        <div className="p-6 flex justify-between items-center bg-[#323232]">
          <div className="flex items-baseline text-6xl tracking-tight">
            <span
              onClick={() => setMode("hour")}
              className={`cursor-pointer transition-colors ${
                mode === "hour"
                  ? "text-white"
                  : "text-[#9e9e9e] hover:text-white/80"
              }`}
            >
              {displayHour}
            </span>
            <span className="text-[#9e9e9e] mx-1">:</span>
            <span
              onClick={() => setMode("minute")}
              className={`cursor-pointer transition-colors ${
                mode === "minute"
                  ? "text-white"
                  : "text-[#9e9e9e] hover:text-white/80"
              }`}
            >
              {displayMinute}
            </span>
          </div>
          <div className="flex flex-col text-lg font-medium space-y-1">
            <button
              className={`${
                period === "AM" ? "text-white" : "text-[#9e9e9e]"
              } hover:text-white transition-colors text-right`}
              onClick={() => setPeriod("AM")}
            >
              AM
            </button>
            <button
              className={`${
                period === "PM" ? "text-white" : "text-[#9e9e9e]"
              } hover:text-white transition-colors text-right`}
              onClick={() => setPeriod("PM")}
            >
              PM
            </button>
          </div>
        </div>

        <div className="bg-[#424242] p-8 pb-12 flex justify-center items-center">
          <div className="relative w-[240px] h-[240px] bg-[#5a5a5a] rounded-full transition-opacity duration-300">
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#3b82f6] rounded-full -mt-1 -ml-1 z-20"></div>

            <div
              className="absolute bottom-1/2 left-1/2 w-[2px] h-[95px] bg-[#3b82f6] origin-bottom transition-transform duration-150 ease-out z-10"
              style={{ transform: `translateX(-50%) rotate(${handAngle}deg)` }}
            >
              <div className="absolute top-[-16px] left-[-15px] w-8 h-8 bg-[#3b82f6] rounded-full flex items-center justify-center text-white text-lg z-20">
                {mode === "hour" ? hour : displayMinute}
              </div>
            </div>

            {currentItems.map((num, i) => {
              const angleDegrees = mode === "hour" ? i * 30 : num * 6;
              const angleRadians = (angleDegrees * Math.PI) / 180;
              const radius = 96;
              const x = Math.sin(angleRadians) * radius;
              const y = -Math.cos(angleRadians) * radius;

              const isSelected =
                mode === "hour" ? hour === num : minute === num;
              const isFiveMinuteMark = mode === "minute" && num % 5 === 0;
              const showText = mode === "hour" || isFiveMinuteMark;
              const displayNum =
                mode === "minute" ? num.toString().padStart(2, "0") : num;

              return (
                <div
                  key={num}
                  onClick={() => handleItemClick(num)}
                  className={`absolute flex items-center justify-center rounded-full cursor-pointer z-30 ${
                    isSelected ? "text-transparent" : "text-white"
                  } ${
                    showText
                      ? "w-10 h-10 -ml-5 -mt-5 hover:bg-white/20 transition-colors"
                      : "w-6 h-6 -ml-3 -mt-3"
                  }`}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                >
                  {showText ? displayNum : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#424242] px-4 py-4 flex justify-between items-center">
          <button
            onClick={onClear}
            className="text-white/90 hover:text-white font-bold tracking-wider text-sm px-3 py-2 rounded hover:bg-white/10 transition-colors"
          >
            CLEAR
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="text-white/90 hover:text-white font-bold tracking-wider text-sm px-3 py-2 rounded hover:bg-white/10 transition-colors"
            >
              CANCEL
            </button>
            <button
              onClick={handleSaveClick}
              className="text-[#3b82f6] hover:text-blue-400 font-bold tracking-wider text-sm px-3 py-2 rounded hover:bg-blue-400/10 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- The Main Alarm Component ---
const Alarm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alarmTime, setAlarmTime] = useState(null);
  const [isRinging, setIsRinging] = useState(false);

  // Initialize the audio with the imported file
  const audioRef = useRef(new Audio(wakeUpSound));

  // The Timer interval that checks the time every second
  useEffect(() => {
    if (!alarmTime) return;

    const interval = setInterval(() => {
      // 1. Get the raw time from the browser
      const rawTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      // 2. FIX FOR CHROME: Replace invisible Unicode spacing with standard spacing
      const currentTime = rawTime.replace(/[\u202F\u00A0]/g, " ");

      // 3. Compare standard formatted time against our saved alarm
      if (currentTime === alarmTime) {
        setIsRinging(true);
        setAlarmTime(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [alarmTime]);

  // Handle the Audio playing and stopping
  useEffect(() => {
    const audio = audioRef.current;

    const handleAudioFinished = () => {
      setIsRinging(false);
    };

    audio.addEventListener("ended", handleAudioFinished);

    if (isRinging) {
      audio.loop = false; // Only play once
      audio.play().catch((err) => console.error("Audio block:", err));
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      audio.removeEventListener("ended", handleAudioFinished);
    };
  }, [isRinging]);

  const handleSaveAlarm = (selectedTime) => {
    setAlarmTime(selectedTime);
    setIsRinging(false);
    setIsModalOpen(false);
  };

  const handleClearAlarm = () => {
    setAlarmTime(null);
    setIsRinging(false);
    setIsModalOpen(false);
  };

  const stopRinging = () => {
    setIsRinging(false);
  };

  return (
    <>
      <div className="container flex flex-col justify-center items-center mt-20 mx-auto">
        {isRinging ? (
          <button
            onClick={stopRinging}
            className="btn text-center bg-red-600 text-white hover:bg-red-700 transition-colors p-2 font-bold text-xl w-[218px] h-[46px] rounded-full shadow-lg animate-bounce"
          >
            Stop Alarm!
          </button>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn text-center bg-[#212529] text-amber-500 hover:bg-gray-800 transition-colors p-2 font-bold text-xl w-[218px] h-[46px] rounded-full shadow-md"
          >
            Set an Alarm
          </button>
        )}

        <span
          className={`font-semibold mt-[18px] text-lg ${
            isRinging ? "text-amber-500" : "text-gray-500"
          }`}
        >
          {isRinging
            ? "Alarm Ringing!"
            : alarmTime
              ? `Alarm is set for ${alarmTime}`
              : "No alarm set currently."}
        </span>
      </div>

      <TimePickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAlarm}
        onClear={handleClearAlarm}
      />
    </>
  );
};

export default Alarm;
