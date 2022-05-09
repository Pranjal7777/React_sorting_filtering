import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);

  const getData = () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const sort = (type) => {
    if (type === "low") {
      setData([...data].sort((a, b) => a.price - b.price));
    } else if (type === "high") {
      setData([...data].sort((a, b) => b.price - a.price));
    }
  };
  const filter = (range) => {
    setData([...data].filter((elem) => elem.price > range));
  };
  console.log(data);
  return (
    <div className="App">
      <button
        onClick={() => {
          filter(100);
        }}
      >
        Filter
      </button>
      <button
        onClick={() => {
          sort("low");
        }}
      >
        Low to High
      </button>
      <button
        onClick={() => {
          sort("high");
        }}
      >
        High to Low
      </button>
      {data.map((elem) => {
        return (
          <div key={elem.id}>
            <img
              style={{ width: "100px", height: "100px" }}
              src={elem.image}
              alt=""
            />
            <p>{elem.title}</p>
            <p> ${elem.price}</p>
          </div>
        );
      })}
    </div>
  );
}
