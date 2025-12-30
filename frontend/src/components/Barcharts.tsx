import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type PriceData = {
  time: string;
  price: number;
};

type Props = {
  data: PriceData[];
};

const BarCharts: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg h-full">
      <h2 className="text-xl font-bold mb-4">Price Bars</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            formatter={(value: number) =>
              `${value.toLocaleString("en-IR")} ریال `
            }
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
            }}
          />
          <Bar dataKey="price" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarCharts;
