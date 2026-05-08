import React, { useState, useEffect } from "react";

const Clock = () => {
  // 1. Create a state to hold the current time
  const [time, setTime] = useState(new Date());

  // 2. Set up a timer to update the state every second
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup the timer when the component unmounts
    return () => clearInterval(timerId);
  }, []);

  // 3. Format the single time state into different timezones
  const formatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const indiaTime = time.toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
    ...formatOptions,
  });

  const usaTime = time.toLocaleTimeString("en-US", {
    timeZone: "America/Los_Angeles",
    ...formatOptions,
  });

  const chinaTime = time.toLocaleTimeString("en-US", {
    timeZone: "Asia/Shanghai",
    ...formatOptions,
  });

  return (
    <>
      {/* Made the heading text smaller on mobile, but keep text-[40px] on md screens and up */}
      <div className="container flex justify-center items-center mt-[17px] px-4">
        <h1 className="text-center font-semibold text-3xl md:text-[40px] text-[#000000e8]">
          Welcome to World Clock
        </h1>
      </div>

      <main className="mt-4 pb-10">
        {/* Changed md:grid-cols-3 to lg:grid-cols-3 so it stacks nicely on iPads/Tablets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-18 justify-items-center max-w-7xl mx-auto px-4">
          {/* INDIA CARD */}
          {/* Replaced fixed w-[27vw] h-[43vh] with full width for mobile, restoring your exact sizes on large (lg:) screens */}
          <div className="col border border-[#0d6efd] w-full max-w-[400px] lg:max-w-none lg:w-[27vw] h-auto lg:h-[43vh] pb-6 lg:pb-0 rounded-lg overflow-hidden">
            <div className="card">
              <div className="card-header bg-[#0d6efd] h-15 flex justify-center items-center">
                <h4 className="flex items-center gap-1 text-center text-white text-2xl">
                  India
                  <img
                    src="./img/clock_3.png"
                    alt="clock"
                    className="w-7 h-7"
                  />
                </h4>
              </div>
              <hr className="border border-[#0d6efd] w-full" />
            </div>
            <div className="card-body text-center px-2">
              <h1 className="text-[40px] font-semibold mt-2">{indiaTime}</h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>10 users included</li>
                <li>2 GB of storage</li>
                <li>Email support</li>
                <li>Help center access</li>
              </ul>
              {/* Replaced fixed w-96 with w-[90%] so it doesn't overflow the mobile card */}
              <button className="bg-[#0d6efd] text-white w-[90%] max-w-[384px] h-11 text-xl rounded-lg">
                More About This Zone
              </button>
            </div>
          </div>

          {/* UNITED STATES CARD */}
          <div className="col border border-[#0d6efd] w-full max-w-[400px] lg:max-w-none lg:w-[27vw] h-auto lg:h-[43vh] pb-6 lg:pb-0 rounded-lg overflow-hidden">
            <div className="card">
              <div className="card-header h-15 flex justify-center items-center">
                <h4 className="flex items-center gap-1 text-center text-black text-2xl">
                  United States
                  <img
                    src="./img/clock_3.png"
                    alt="clock"
                    className="w-7 h-7"
                  />
                </h4>
              </div>
              <hr className="border border-[#0d6efd] w-full" />
            </div>
            <div className="card-body text-center px-2">
              <h1 className="text-[40px] font-semibold mt-2">{usaTime}</h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>20 users included</li>
                <li>10 GB of storage</li>
                <li>Priority email support</li>
                <li>Help center access</li>
              </ul>
              <button className="bg-[#0d6efd] text-white w-[90%] max-w-[384px] h-11 text-xl rounded-lg">
                More About This Zone
              </button>
            </div>
          </div>

          {/* CHINA CARD */}
          <div className="col border border-[#0d6efd] w-full max-w-[400px] lg:max-w-none lg:w-[27vw] h-auto lg:h-[43vh] pb-6 lg:pb-0 rounded-lg overflow-hidden">
            <div className="card">
              <div className="card-header bg-[#0d6efd] h-15 flex justify-center items-center">
                <h4 className="flex items-center gap-1 text-center text-white text-2xl">
                  China
                  <img
                    src="./img/clock_3.png"
                    alt="clock"
                    className="w-7 h-7"
                  />
                </h4>
              </div>
              <hr className="border border-[#0d6efd] w-full" />
            </div>
            <div className="card-body text-center px-2">
              <h1 className="text-[40px] font-semibold mt-2">{chinaTime}</h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>30 users included</li>
                <li>15 GB of storage</li>
                <li>Phone and email support</li>
                <li>Help center access</li>
              </ul>
              <button className="bg-[#0d6efd] text-white w-[90%] max-w-[384px] h-11 text-xl rounded-lg">
                More About This Zone
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Clock;
