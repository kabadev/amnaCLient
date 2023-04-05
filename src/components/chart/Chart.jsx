import React, { useState, useEffect } from "react";
import "./chart.css";
import Chart from "react-apexcharts";
import axios from "axios";
const ApexChart = ({ awardId, awardTitle }) => {
  const [countries, setCountries] = useState([]);
  const [males, setMales] = useState([]);
  const [females, setFemales] = useState([]);
  //   const [chatData, setChatData] = useState({});
  const getTotalss = async () => {
    const res = await axios.get(`getCountChart`);
    setCountries(res.data.map((country) => country.country));
    setMales(res.data.map((country) => country.male));
    setFemales(res.data.map((country) => country.female));
  };

  useEffect(() => {
    getTotalss();
  }, [awardId]);

  const [chatData, setChatData] = useState({
    options: {
      fill: {
        type: "gradient",
        gradient: {
          gradientToColors: ["#F55555", "#6078ea", "#6094ea"],
          type: "vertical",
          shadeIntensity: 0.5,
          inverseColors: false,
        },
      },
      chart: {
        width: "100%",
      },
      title: {
        text: "country Analysis",
        align: "left",
        style: {
          fontSize: "12px",
        },
      },
      colors: ["#FCCF31", "#17ead9", "#f02fc2"],
      //   colors: ["#927907"],
      chart: {
        id: "Country Anlysis",
      },
      xaxis: {
        categories: countries,
      },
    },
    series: [
      {
        name: "Males",
        data: males,
      },
      {
        name: "Females",
        data: females,
      },
    ],
  });
  chatData.series[0].data = males;
  chatData.series[1].data = females;
  chatData.options.xaxis.categories = countries;

  return (
    <div className="chart">
      {chatData.options.xaxis.categories.length !== 0 && (
        <Chart
          options={chatData?.options}
          series={chatData?.series}
          height="350"
          type="bar"
        />
      )}
    </div>
  );
};

export default ApexChart;
