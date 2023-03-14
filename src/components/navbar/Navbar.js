import React, { useContext, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContextProvider";
export default function Navbar() {
  let navigate = useNavigate();
  const { theme, updateTheme } = useContext(ThemeContext);
  // const themeContext=useContext(ThemeContext)
  // useEffect(() => {
  //    console.log("hello "+ themeContext)
  // })

  return (
    <>
      <div className={`navbar navbar-${theme}`}>
        <h1
          onClick={() => {
            navigate(`/`);
          }}
        >
          Where in the world?
        </h1>
        <p
          class={`mode mode-${theme}`}
          onClick={() => {
            updateTheme(theme);
          }}
        >
          {" "}
          <span class="icon">
            {theme == "light" ? (
              <i class="fa-sharp fa-regular fa-moon"></i>
            ) : (
              <i class="fa-solid fa-regular fa-moon"></i>
            )}
          </span>
          {theme} Mode
        </p>
      </div>{" "}
    </>
  );
}
