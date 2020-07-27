import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Gradient } from "react-gradient";
import TextField from "@material-ui/core/TextField";

import Card from "./Card";

function App() {
  const [top, setTop] = useState([]);
  const [nobel, setNobel] = useState([]);
  const [filter, setFilter] = useState([]);
  const [showNobel, setShowNobel] = useState(true);
  const [category, setCategory] = useState(``);
  const [year, setYear] = useState(``);
  const [categoryArray, setCategoryArray] = useState([]);
  let arr = [];
  for (let i = 1900; i <= 2018; i++) {
    arr.unshift(i);
  }

  useEffect(() => {
    axios
      .get("http://api.nobelprize.org/v1/prize.json")
      .then((res) => {
        setNobel(res.data.prizes);
        const arrCategory = [
          ...new Set(
            res.data.prizes.map((data) => {
              return data.category;
            })
          ),
        ];
        setCategoryArray(arrCategory);
        const four = res.data.prizes.map((data) => {
          return data.laureates;
        });
        const newArray = four.flat(5);
        const map11 = newArray.filter(Boolean);

        handleArray(map11);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleArray(data) {
    const map2 = data.map((data) => {
      return data.firstname.concat(` `, data.surname);
    });
    const map3 = map2.filter((item, index) => map2.indexOf(item) !== index);
    const map4 = map3.filter((item) => {
      return !item.includes("International") && !item.includes("Office");
    });
    console.log(map4);
    setTop(map4);
  }

  function handlecategory(e, value) {
    if (value) {
      setCategory(value);
    } else {
      return;
    }
  }

  function handleyear(e, value) {
    if (value) {
      setYear(value);
    } else {
      return;
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (year && category) {
      let filteredArray = [...nobel].filter((data) => {
        return data.year === year && data.category === category;
      });
      setShowNobel(false);
      setFilter(filteredArray);
      console.log(filteredArray);
      console.log(year, category);
    }
  }
  function Reset() {
    setShowNobel(true);
  }

  return (
    <div className="container">
      <div className="top">
        <Gradient
          gradients={[
            ["#6f00ff", "#9CA2FF"],
            ["#FF47F4", "#6DFF5C"],
          ]}
          property="background"
          duration="4000"
          element="div"
          angle="30deg"
          className="top-four"
        >
          <h2>The magnificent four</h2>
          {top &&
            top.map((data, index) => {
              return <p key={index}>{data}</p>;
            })}
        </Gradient>
      </div>

      <div className="filter-box">
        <form onSubmit={handleSubmit}>
          <Autocomplete
            onInputChange={handlecategory}
            size="small"
            autoHighlight
            id="size-small-standard"
            options={categoryArray}
            getOptionLabel={(option) => option.toString()}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Category"
                placeholder="Category"
              />
            )}
          />
          <Autocomplete
            onInputChange={handleyear}
            size="small"
            autoHighlight
            id="size-small-standard"
            options={arr}
            getOptionLabel={(option) => option.toString()}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Year"
                placeholder="Year"
              />
            )}
          />
          <div className="form-btn-div">
            <button className="form-btn" type="submit">
              Filter
            </button>
            <button className="form-btn" type="button" onClick={Reset}>
              Reset
            </button>
          </div>
        </form>
      </div>
      {showNobel ? (
        <div className="grid">
          {nobel &&
            nobel.map((data, index) => {
              return (
                <Card
                  key={index}
                  year={data.year}
                  category={data.category}
                  cardBody={
                    <div className="body-name">
                      {data.laureates ? (
                        data.laureates.map((user) => {
                          return (
                            <p key={user.id}>
                              {user.firstname ? (
                                user.firstname
                              ) : (
                                <span>Name not available</span>
                              )}{" "}
                              {user.surname}
                            </p>
                          );
                        })
                      ) : (
                        <p className="error">Name not available</p>
                      )}
                    </div>
                  }
                />
              );
            })}
        </div>
      ) : (
        <div className="grid">
          {filter &&
            filter.map((data, index) => {
              return (
                <Card
                  key={index}
                  year={data.year}
                  category={data.category}
                  cardBody={
                    <div className="body-name">
                      {data.laureates &&
                        data.laureates.map((user) => {
                          return (
                            <p key={user.id}>
                              {user.firstname} {user.surname}
                            </p>
                          );
                        })}
                    </div>
                  }
                />
              );
            })}
        </div>
      )}
    </div>
  );
}

export default App;
