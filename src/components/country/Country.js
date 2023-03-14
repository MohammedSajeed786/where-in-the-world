import "./Country.css";
import { React, useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
// const BrowserHistory = require('react-router/lib/BrowserHistory').default;
import { ThemeContext } from "../../context/ThemeContextProvider";

export default function Country() {
  const { theme, updateTheme } = useContext(ThemeContext);
  let { name } = useParams();
  const [data, setData] = useState(null);
  const [curr, setCurr] = useState(null);
  const [lang, setLang] = useState(null);
  const [borders, setBorders] = useState(null);

  
  const getDetails = async () => {
    let url = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
    let response = await fetch(url);
    if (response.ok) {
      let details = await response.json();
      setData(details[0]);
      setCurr(Object.keys(details[0].currencies));
      setLang(Object.keys(details[0].languages));
      //   console.log(details[0].currencies,data.currencies);
      let borders = [];
      let x = details[0].borders;
      for (let i = 0; i < x.length; i++) {
        let country = await fetch(
          `https://restcountries.com/v3.1/alpha/${x[i]}`
        );
        country = await country.json();
        borders.push(country[0]["name"].common);
      }
      setBorders(borders);
      // console.log(borders);
    }
  };
  useEffect(() => {
    getDetails();
  }, [name]);
  let navigate = useNavigate();
  return (
    <>
      <div className={`cd-wrapper cd-wrapper-${theme}`}>
        <button
          className={`back back-${theme}`}
          onClick={() => {
            navigate(-1);
          }}
        >
          <i class="fa-sharp fa-solid fa-arrow-left"></i> &nbsp;Back
        </button>
        {data ? (
          <div className={`country-data country-data-${theme}`}>
            <div className="country-image">
              <img src={data.flags.png} alt={data.flags.alt} />
            </div>
            <div className={`country-details country-details-${theme}`}>
              <h1 className="country-name">{data.name.common}</h1>
              <div className="other-details">
                <div className="req">
                  <div className="native-name">
                    <h5 className="details-title">Native Name:</h5>
                    {data.name.common}
                  </div>
                  <div className="country-population">
                    <h5 className="details-title">Population:</h5>
                    {data.population.toLocaleString("en-US")}
                  </div>
                  <div className="country-region">
                    <h5 className="details-title">Region:</h5>
                    {data.region}
                  </div>
                  <div className="country-subregion">
                    <h5 className="details-title">SubRegion:</h5>
                    {data.subregion}
                  </div>
                  <div className="country-capital">
                    <h5 className="details-title">Capital:</h5>
                    {data.capital}
                  </div>
                </div>
                <div className="opt">
                  <div className="country-tld">
                    <h5 className="details-title">Top Level Domain:</h5>

                    {data.tld.map((val, ind) => {
                      if (data.tld.length - 1 == ind) return val;
                      return val + ", ";
                    })}
                  </div>
                  <div className="country-curr">
                    <h5 className="details-title">Currencies:</h5>

                    {curr.map((val, ind) => {
                      if (curr.length - 1 == ind)
                        return data.currencies[val].name;
                      return data.currencies[val].name + ", ";
                    })}
                  </div>
                  <div className="country-lang">
                    <h5 className="details-title">Languages:</h5>

                    {lang.map((val, ind) => {
                      if (lang.length - 1 == ind) return data.languages[val];
                      return data.languages[val] + ", ";
                    })}
                  </div>
                </div>
              </div>
              <div className={`border border-${theme}`}>
                <h5 className="details-title">Border Countries:</h5>
                <div className={`border-countries border-countries-${theme}`}>
                  {borders
                    ? borders.map((val, ind) => {
                        return (
                          <div
                            className={`border-country border-country-${theme}`}
                            onClick={() => {
                              navigate(`/country/${val}`);
                            }}
                          >
                            {val}
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div class={`error error-${theme}`}>
            No country Found with given name. Please provide a valid name
          </div>
        )}
      </div>
    </>
  );
}
