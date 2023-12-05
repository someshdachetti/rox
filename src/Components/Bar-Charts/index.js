import './index.css'
import { Bar } from "react-chartjs-2";
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
} from "chart.js";
import { useState, useEffect } from "react";

Chart.register(LinearScale, CategoryScale, BarController, BarElement);
let listOfMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const BarCharts = (props) => {
  const { setMonth, chartData } = props;
  const [barData, setBarData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const selectMonthData = chartData.filter((each) => {
      const selectMonthData = new Date(each.dateOfSale);
      return listOfMonths[selectMonthData.getMonth()] === setMonth;
    });

    const priceData = selectMonthData.map((each) => each.price);

    setBarData(priceData);
    setLoading(false);
  }, [setMonth, chartData]);

  const data = {
    labels: [
      "0-100",
      "101-200",
      "201-300",
      "301-400",
      "401-500",
      "501-600",
      "601-700",
      "701-800",
      "801-900",
      "901-Above",
    ],
    datasets: [
      {
        label: "Sample Data",
        data: barData,
        backgroundColor: "white",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
        <div  className="bar-chart">
          <Bar data={data} options={options} />
        </div>

    </div>
  );
};
