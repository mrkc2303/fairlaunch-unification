import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const BondingCurveChart = ({ totalSupply, bondingCurveHoldings }) => {
  const [chartData, setChartData] = useState(null);
  const [selectedCurve, setSelectedCurve] = useState("quadratic");
  const [currentSupplyIndex, setCurrentSupplyIndex] = useState(null);

  useEffect(() => {
    if (!totalSupply || !bondingCurveHoldings) return;

    const supply = Array.from({ length: 100 }, (_, i) => (i + 1) * (totalSupply / 100)); // Scale data

    const curves = {
      linear: supply.map(x => 0.01 * x), // Linear formula
      exponential: supply.map(x => 0.005 * Math.exp(0.005 * x)), // Exponential formula
      logarithmic: supply.map(x => 0.5 * Math.log(x + 1)), // Logarithmic formula
      quadratic: supply.map(x => 0.00005 * x ** 2), // Quadratic formula
    };

    // ** Find Index Closest to the Current Total Supply **
    const closestIndex = supply.findIndex(x => x >= bondingCurveHoldings);
    setCurrentSupplyIndex(closestIndex);

    setChartData({
      labels: supply.map(x => x.toFixed(0)), // Round values for clarity
      datasets: [
        {
          label: `${selectedCurve.charAt(0).toUpperCase() + selectedCurve.slice(1)} Curve`,
          data: curves[selectedCurve],
          borderColor: selectedCurve === "linear" ? "#22C55E" :
                       selectedCurve === "exponential" ? "#FACC15" :
                       selectedCurve === "logarithmic" ? "#3B82F6" : "#E11D48", // Color based on type
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 2,
          pointRadius: 1,
        },
        // ** Marker for Current Supply **
        {
          label: "Current Supply",
          data: supply.map((_, i) => (i === closestIndex ? curves[selectedCurve][i] : null)), // Highlight only one point
          borderColor: "#FFFFFF", // White color for visibility
          backgroundColor: "#FFFFFF",
          borderWidth: 4,
          pointRadius: 6,
          pointHoverRadius: 8,
          showLine: false
        },
      ],
    });
  }, [selectedCurve, totalSupply, bondingCurveHoldings]);

  return (
    <div className="bg-[#1A1A2E] p-6 rounded-lg border border-[#292B3A] shadow-lg">
      <h2 className="text-white text-xl font-bold mb-4">Bonding Curve Visualization</h2>

      {/* <select 
        className="w-full bg-[#2A2D3E] text-white p-2 rounded-lg mb-4 border border-[#3B3E5A]"
        value={selectedCurve}
        onChange={(e) => setSelectedCurve(e.target.value)}
      >
        <option value="linear">Linear</option>
        <option value="exponential">Exponential</option>
        <option value="logarithmic">Logarithmic</option>
        <option value="quadratic">Quadratic (x²)</option>
      </select> */}

      {chartData && <Line data={chartData} />}
    </div>
  );
};

export default BondingCurveChart;
