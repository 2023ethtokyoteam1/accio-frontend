import { useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";
import Chart from "chart.js/auto";
const ChartJS = require("chart.js");
const { _adapters } = ChartJS;
import "chartjs-adapter-luxon";

export default function ScatterChart({ data }) {
  const chartRef = useRef();
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(ctx, {
        type: "scatter",
        data: data,
        options: {
          maintainAspectRatio: false,
          responsive: true,
          layout: {
            padding: 20,
          },
          scales: {
            x: {
              type: "time",
              grid: {
                display: false,
              },
              position: "bottom",
              time: {
                unit: "day",
                displayFormats: {
                  day: "MMM dd",
                },
              },
            },
            y: {
              type: "linear",
         
              position: "left",
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  const value = context.parsed.y || 0;
                  const date = DateTime.fromMillis(context.parsed.x).toFormat('MMM dd');
                  const formattedValue = value.toLocaleString(); // 숫자를 천 단위로 구분하여 문자열로 포맷팅
                  return `${date} : ${formattedValue} wETH`; // 최종적으로 반환되는 문자열
                },
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} width={600} height={200}></canvas>;
}
