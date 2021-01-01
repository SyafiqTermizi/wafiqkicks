import * as React from "react";
import CanvasJSReact from "../assets/libs/canvasjs.react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export interface Data {
  label: string;
  y: number;
}

export interface Props {
  data: Data[];
  maxCount: number;
}

export const BarChart: React.FC<Props> = ({ data, maxCount }) => {
  const options = {
    animationEnabled: false,
    axisY: {
      maximum: maxCount,
    },
    data: [
      {
        type: "bar",
        dataPoints: data,
      },
    ],
  };

  return <CanvasJSChart options={options} />;
};
