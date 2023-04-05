import React, { useState, useEffect } from "react";
import "./chart.css";
import Chart from "react-apexcharts";
import axios from "axios";
const Piechart = () => {
  const [ages, setAge] = useState([]);
  const [counts, setCount] = useState([]);
  console.log(ages);
  const getTotalss = async () => {
    const res = await axios.get(`getCountAge`);
    setAge(res.data.map((age) => age.range));
    setCount(res.data.map((age) => age.count));
  };

  useEffect(() => {
    getTotalss();
  }, []);

  const [chatData, setChatData] = useState({
    series: [25, 15, 44, 55, 41, 17],
    options: {
      chart: {
        width: "100%",
        type: "pie",
      },
      labels: ["10-20", "21-31", "32-42", "43-53", "54-64", "65-75"],
      theme: {
        monochrome: {
          enabled: true,
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5,
          },
        },
      },
      title: {
        text: "Age Range",
      },
      dataLabels: {
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex];
          return [name, val.toFixed(1) + "%"];
        },
      },
      legend: {
        show: false,
      },
    },
  });

  chatData.series = counts;

  return (
    <div className="piechart">
      {chatData.series.length !== 0 && (
        <Chart
          options={chatData?.options}
          series={chatData?.series}
          height="350"
          type="pie"
        />
      )}
    </div>
  );
};

export default Piechart;
