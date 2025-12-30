
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type PriceData = {
  time: string;
  price: number;
};

type Props = {
  data: PriceData[];
};

const Recharts: React.FC<Props> = ({ data }) => {
  // محاسبه درصد تغییر قیمت نسبت به روز قبل
  const dataWithChange = data.map((item, index) => {
    if (index === 0) return { ...item, change: 0 };
    const prevPrice = data[index - 1].price;
    const change = ((item.price - prevPrice) / prevPrice) * 100;
    return { ...item, change };
  });

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Currency Price Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dataWithChange}>
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#fff' }}
            formatter={(value: number, name: string) => {
              if (name === 'change') {
                const color = value >= 0 ? 'limegreen' : 'red';
                return <span style={{ color }}>{value.toFixed(2)}%</span>;
              }
              return value;
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#4ade80"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Recharts;
