import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Chart as ChartJS,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface Props {
  labels: string[];
  data: number[];
}
export default function LineComponent({ labels, data }: Props) {
  return (
    <Line
      options={{
        responsive: true,

        plugins: {
          legend: {
            position: "top" as const,
          },
        },
      }}
      data={{
        labels: labels,
        datasets: [
          {
            label: "All State",
            backgroundColor: "rgba(255,99,132,0.4)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            //stack: 1,

            data: data,
          },
        ],
      }}
      height={"100%"}
    />
  );
}
