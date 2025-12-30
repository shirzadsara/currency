import React, { useMemo, useState } from "react";
import Recharts from "./Recharts";
import BarChart from "./Barcharts";

import { useGetCurrenciesQuery } from "../features/apiSlice";

import ReactCountryFlag from "react-country-flag";
import currencyToCountry from "../utils/currencyToCountry";


export default function Dashboard() {
  const { data = [], isLoading, error } = useGetCurrenciesQuery();
  const [selectedSymbol, setSelectedSymbol] = useState("USD");

//چون (api خارجی) قیمت ریالی نمیده برای افزایش و کاهش عدد تصادفی قرار دادم
function getRandomChange() {
  // عدد بین -3% تا +3%
  return (Math.random() * 6 - 3).toFixed(2);
}


console.log(data);
  // آخرین قیمت هر ارز (برای کارت‌ها)
  const latestPrices = useMemo(() => {
    const map = new Map<string, any>();    
    data.forEach((item: any) => {
      map.set(item.symbol, item); // چون مرتب شده، آخرین می‌مونه
    });

    return Array.from(map.values());
  }, [data]);

  // داده نمودار فقط برای ارز انتخاب‌شده
const chartData = useMemo(() => {
   if (!data) return [];
  return data
    .filter((item: any) => item.symbol === selectedSymbol)
    .map((item: any) => ({
      time: new Date(item.date).toLocaleTimeString("en-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      price: Number(item.price),
    }));
}, [data, selectedSymbol]);


  if (isLoading) {
    return  <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      Loading data...
    </div>;
  }

  if (error) {
    return  <div className="min-h-screen bg-gray-900 text-red-500 flex items-center justify-center">
      Failed to load data
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-yellow-400">
          Currency Dashboard
        </h1>

       <select
  value={selectedSymbol}
  onChange={(e) => setSelectedSymbol(e.target.value)}
>
    {latestPrices.map((item: any) => (
    <option className="text-black" key={item.symbol} value={item.symbol}>
      {item.symbol}
    </option>
  ))}
</select>

      </header>

      {/* Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-9 gap-6">
  {latestPrices.map((item: any) => {
    const change = Number(getRandomChange());
    const color = change >= 0 ? "text-green-400" : "text-red-500";

    return (      
      <div
        key={item.symbol}
        className="bg-gray-800 p-6 rounded-xl shadow border border-gray-700 flex flex-col items-center"
      >
        {/* آیکون کشور */}
       <ReactCountryFlag
        svg
        countryCode={currencyToCountry[item.symbol]}
        style={{ width: "28px", height: "28px" }}
      />


        {/* نماد ارز */}
        <h2 className="text-gray-400 text-lg">{item.symbol}</h2>

        {/* قیمت */}
        <p className="text-2xl font-bold mt-1">{item.price.toLocaleString("fa-IR")} ریال</p>

        {/* درصد تغییر نمایشی */}
        <p className={`mt-1 font-semibold ${color}`}>
          {change >= 0 ? "▲" : "▼"} {Math.abs(change)}%
        </p>
      </div>
    );
  })}
</div>


      {/* Chart 
      <div className="mt-12 bg-gray-800 p-6 rounded-xl shadow border border-gray-700">
        <h2 className="text-gray-400 font-medium mb-4">
          {selectedSymbol} Price Trend
        </h2>

        <Recharts data={chartData} />
      </div>
      */}

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Line Chart */}
  <div className="mt-12 bg-gray-800 p-6 rounded-xl shadow border border-gray-700">
        <h2 className="text-gray-400 font-medium mb-4">
          {selectedSymbol} Price Trend
        </h2>

        <Recharts data={chartData} />
      </div>

  {/* Bar Chart */}
  <div className="mt-12 bg-gray-800 p-6 rounded-xl shadow border border-gray-700">
    <h2 className="text-gray-400 font-medium mb-4">
      {selectedSymbol} Price Comparison
    </h2>
    <BarChart data={chartData} />
  </div>
</div>

    </div>
  );
}
