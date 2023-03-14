import "./CountryItem.css";
import React,{useContext} from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContextProvider";

export default function CountryItem({ details }) {
  const {theme,updateTheme}=useContext(ThemeContext);
  let navigate = useNavigate();
  return (
    <div
      class={`country-item-container country-item-container-${theme}`}
      onClick={() => {
        navigate(`country/${details.name.common}`);
      }}
    >
      <div className="flag-image">
        <img src={details.flags.png} alt="flag" />
      </div>
      <div className="details">
        <h4 className="name">{details.name.common}</h4>
        <div className="Population">
          <span className="title">population: </span>
          {details.population.toLocaleString("en-US")}
        </div>
        <div className="region">
          <span className="title">region: </span>
          {details.region}
        </div>
        <div className="capital">
          <span className="title">capital: </span>
          {details.capital}
        </div>
      </div>
    </div>
  );
}
