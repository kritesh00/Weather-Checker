import { useState } from "react";
import Snowfall from "react-snowfall";
import Spinner from "./Spinner";
import WelcomeMessage from "./WelcomeMessage";
import Theme from "./Theme";

const Card = () => {
  const [Description, setDescription] = useState("");
  const [Temperature, setTemparature] = useState("");
  const [text, setText] = useState("");
  const [Loading, setLoading] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState(false);

  const checkWeather = async () => {
    const cityRegex = /^[A-Za-z\u00C0-\u017F\s'-]+$/;

    if (!cityRegex.test(text)) {
      alert("Please enter a valid city name");
      return;
    }

    setWelcomeMessage(true);
    setLoading(true);

    const response = await fetch(`https://goweather.xyz/weather/${text}`);
    const data = await response.json();

    setDescription("Weather: " + data.description);
    setTemparature("Temperature: " + data.temperature);
    setLoading(false);
    setText("");

    setTimeout(() => {
      setDescription("");
      setTemparature("");
      setWelcomeMessage(false);
    }, 5000);
  };

  return (
    <>
      <Snowfall />

      <div className="fixed top-4 left-4 z-50">
        
      </div>

      <section className="flex justify-center items-center h-screen">
        
        <div
          className="
          flex flex-col gap-4 justify-center items-center
          w-[300px]
          bg-[var(--card_background)]
          text-[var(--color)]
          p-6 rounded-xl shadow-lg font-bold
        "
        id="card"
        >
            
        
          {welcomeMessage && <WelcomeMessage />}

          <img src="/sun.svg" className="h-[120px] w-[120px]" />
          <h3>
            Change Theme:
          </h3>
          <Theme />

          <h1 className="text-2xl text-[var(--color)]">
            Weather Checker
          </h1>

          <input
            type="text"
            placeholder="Enter city"
            className="w-full rounded-md text-center h-8 outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {Loading && <Spinner />}

          {!Loading && (
            <>
              <p>{Description}</p>
              <p>{Temperature}</p>
            </>
          )}

          <button
            onClick={checkWeather}
            className="
            bg-[var(--color)]
            text-[var(--body_background)]
            px-4 py-2 rounded-md
            hover:opacity-80
          "
          >
            Check Weather
          </button>
        </div>
      </section>
    </>
  );
};

export default Card;
