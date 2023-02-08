import { useEffect, useState } from "react";

const handleTime = (time) => {
  const milliSecond = Math.floor((time / 10) % 100);
  const second = Math.floor((time / 1000) % 60); // 1s second -> milliSecond * 1000
  const minute = Math.floor((time / 60000) % 60);
  return (
    <>
      <span>{("0" + minute).slice(-2)}:</span>
      <span>{("0" + second).slice(-2)}:</span>
      <span className="text-[#c9904a]">{("0" + milliSecond).slice(-2)}</span>
    </>
  );
};

const Stopwatch = () => {
  const [time, setTime] = useState(0); // time là millisecond
  const [running, setRunning] = useState(false);
  const [lap, setLap] = useState([]);

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

  const handleLaps = () => {
    setLap((lap) => [...lap, time]);
  };

  const handleReset = () => {
    setTime(0);
    setRunning(false);
    setLap([]);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-[50vw] mx-auto overflow-hidden">
      <div className="w-full">
        <div className="text-white font-bold text-7xl text-center">
          {handleTime(time)}
        </div>
        <div className="flex justify-between w-full mt-10 ">
          <button
            className="font-bold text-xl"
            onClick={() => setRunning(!running)}
          >
            {running ? "Stop" : "Start"}
          </button>
          <button className="font-bold text-xl" onClick={handleReset}>
            Reset
          </button>

          <button
            className={`font-bold text-xl ${
              !running ? "opacity-60 cursor-default pointer-events-none" : ""
            }`}
            onClick={handleLaps}
          >
            Lap
          </button>
        </div>
        <div className="mt-20 h-[500px] laps overflow-auto w-full text-center">
          {!!lap.length &&
            lap.map((item, index) => (
              <div
                key={index}
                className="font-bold max-w-[200px] mx-auto text-xl"
              >
                {handleTime(item)}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Stopwatch;
