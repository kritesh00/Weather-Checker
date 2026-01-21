import { useEffect, useState } from "react";
import Sun from "../assets/sun.svg";
import Moon from "../assets/moon.svg";

const Theme = () => {

  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem("isDark");
    return storedTheme === "true"; 
  });
  const [img, setImg] = useState(() => {
    const storedTheme = localStorage.getItem("isDark");
    return storedTheme === "true" ? Moon : Sun;
  });


  useEffect(() => {
    document.body.classList.toggle("dark", isDark);

   
    localStorage.setItem("isDark", isDark);
  }, [isDark]);

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input w-30 h-15 absolute opacity-0 cursor-pointer"
        type="checkbox"
        id="darkmode-toggle"
        checked={isDark}
        onChange={() => {
          const newDark = !isDark;
          setIsDark(newDark);
          setImg(newDark ? Moon : Sun);
        }}
      />

      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <img src={img} className="sun h-8 w-8" alt="Sun/Moon" />
      </label>
    </div>
  );
};

export default Theme;
