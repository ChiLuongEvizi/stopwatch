import { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0); // time là millisecond
  const [running, setRunning] = useState(false);
  const milliSecond = Math.floor((time / 10) % 100);
  const second = Math.floor((time / 1000) % 60); // 1s second -> milliSecond * 1000
  const minute = Math.floor((time / 60000) % 60);
  const ref = useRef(0);
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);
  const laps = () => {
    const laps = document.querySelector(".laps");
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timestamp = document.createElement("span");
    number.innerText = `#${++ref.current}`;
    timestamp.innerHTML = `${("0" + minute).slice(-2)} : ${("0" + second).slice(
      -2
    )} : ${("0" + milliSecond).slice(-2)}`;
    li.setAttribute("class", "lap-item");
    li.append(number, timestamp);
    laps.append(li);
  };
  const reset = () => {
    const laps = document.querySelector(".laps");
    setTime(0);
    setRunning(false);
    ref.current = 0;
    laps.innerHTML = "";
  };
  return (
    <div className="flex flex-col justify-center items-center  h-screen max-w-[500px] mx-auto">
      <div className="text-white font-bold text-7xl">
        <span>{("0" + minute).slice(-2)}:</span>
        <span>{("0" + second).slice(-2)}:</span>
        <span className="text-[#c9904a]">{("0" + milliSecond).slice(-2)}</span>
      </div>
      <div className="flex justify-between w-full mt-10 ">
        <button
          className="font-bold text-xl"
          onClick={() => setRunning(!running)}
        >
          {!running ? "Start" : "Stop"}
        </button>
        <button className="font-bold text-xl" onClick={reset}>
          Reset
        </button>

        <button
          className={`font-bold text-xl ${
            time === 0 || !running
              ? "opacity-60 cursor-default pointer-events-none"
              : ""
          }`}
          onClick={laps}
        >
          Lap
        </button>
      </div>
      <ul className="mt-20 laps h-[500px] overflow-y-scroll "></ul>
    </div>
  );
};
export default Stopwatch;
