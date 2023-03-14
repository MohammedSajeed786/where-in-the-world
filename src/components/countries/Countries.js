import "./Countries.css";
import { React, useEffect, useState, useRef, useContext } from "react";
import CountryItem from "../countryItem/CountryItem";
import { ThemeContext } from "../../context/ThemeContextProvider";

export default function Countries() {
  const { theme, updateTheme } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const searchRef = useRef("");
  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];
  const [dropdownText, setDropdownText] = useState("Filter by Region");
  const [showOptions, setShowOptions] = useState(false);
  const [region, setRegion] = useState("");
  const getData = async () => {
    let url = "https://restcountries.com/v3.1/all";
    let res = await fetch(url);
    let data = await res.json();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setPageData(data.slice(page * 20, (page + 1) * 20));
  }, [page, data]);

  const searchChanged = () => {
    // console.log(searchRef.current.value.length + " " + region);
    setSearch(searchRef.current.value);

    if (searchRef.current.value.length === 0) {
      setSearch("");
      setPage(0);
      if(region=="")setPageData(data.slice(page * 20, (page + 1) * 20));
      else setPageData(data)
      // console.log("hello",search,pageData,page)
    } else {
      setPageData(data);
    }
  };
  const optionSelected = (option) => {
    if (option != "All") {
      setDropdownText(option);
      setRegion(option);
      setShowOptions(!showOptions);
      setPageData(data);
    } else {
      setShowOptions(!showOptions);
      setDropdownText("Filter by Region");
      setRegion("");
      setPage(0);
      setPageData(data.slice(page * 20, (page + 1) * 20));
    }
  };
  return (
    <>
      <div className={`body-wrapper body-wrapper-${theme}`}>
        <div className={`countries-container countries-container-${theme}`}>
          <div className={`helpers helpers-${theme}`}>
            <div className={`search search-${theme}`}>
              <span className="search-icon">
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
              <input
                type="text"
                className="ip-search"
                placeholder="Search for a country..."
                ref={searchRef}
                onChange={() => {
                  searchChanged();
                }}
              />
            </div>
            <div className={`filter filter-${theme}`}>
              <div
                className={`filter-title filter-title-${theme}`}
                onClick={() => {
                  setShowOptions(!showOptions);
                }}
              >
                {dropdownText} &nbsp;
                {!showOptions ? (
                  <i
                    class="fa-sharp fa-solid  
                fa-angle-down icon"
                  ></i>
                ) : (
                  <i
                    class="fa-sharp fa-solid  
                fa-angle-up icon"
                  ></i>
                )}
              </div>
              {showOptions ? (
                <div className={`regions regions-${theme}`}>
                  {regions.map((region, ind) => {
                    return (
                      <div
                        className={`select-region select-region-${theme}`}
                        onClick={() => {
                          optionSelected(region);
                        }}
                      >
                        {region}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={`countries countries-${theme}`}>
            {pageData.length > 0
              ? pageData.map((country, index, key = index) => {
                  {
                    {/* console.log(region) */}
                    {/* console.log(
                      search +
                        " " +
                        search.toLocaleLowerCase() +
                        " " +
                        country.name.common.toLowerCase() +
                        " " +
                        country.name.common
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase()) +
                        " " +
                        region +
                        " " +
                        region.toLocaleLowerCase() +
                        " " +
                        country.region.toLocaleLowerCase() +
                        " " +
                        country.region.toLocaleLowerCase() ==
                        region.toLocaleLowerCase()
                    ); */}
                  }
                  if (
                    (search == "" ||
                      country.name.common
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase())) &&
                    (region == "" ||
                      country.region.toLocaleLowerCase() ==
                        region.toLocaleLowerCase())
                  ) {
                    return <CountryItem details={country}></CountryItem>;
                  } else return <></>;
                })
              : "No data found"}
          </div>
        </div>
        {search == "" && region == "" ? (
          <div className={`pagination pagination-${theme}`}>
            <button onClick={() => setPage(page - 1)} disabled={page == 0}>
              Prev
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={Math.ceil(data.length / 20) - 1 == page}
            >
              Next
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
