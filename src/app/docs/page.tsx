"use client";
import Link from "next/link";

import { Bar, Line } from "react-chartjs-2";

import CardSection from "./components/CardSection";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import useGetAllDataHook from "./hook/getData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LineComponent from "./components/LineComponent";
import PieChart from "./components/PieChart";
import {
  BarElement,
  CategoryScale,
  Legend,
  LineElement,
  LinearScale,
  Title,
  Tooltip,
  Chart as ChartJS,
} from "chart.js";
import { institutionType } from "./conts/conts";
import Loading from "./components/Loading";
const years = ["2017", "2018", "2019", "2020", "2021", "2022"];
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Component() {
  const [query, setValue] = useState("");
  const { data, isLoading } = useGetAllDataHook({
    key: [query],
    query,
  });

  return (
    <div className="space-y-3">
      <Select onValueChange={setValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Years</SelectLabel>
            <SelectItem value=" ">All Year</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <CardSection
            data={{
              totalAdmission: data!.totalAdmission,
              institutionData: data!.institutionData,
            }}
          />
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {" "}
                Total Admission for all States
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LineComponent
                data={Object.values(data!.stateSums)}
                labels={Object.keys(data!.stateSums)}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Total Admission For Each Insutition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Bar
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top" as const,
                    },
                  },
                }}
                data={{
                  labels: Object.keys(data!.forAllinstu[0].data),
                  datasets: institutionType.map((item, index) => ({
                    data: Object.values(data!.forAllinstu[index].data),
                    label: item.type,
                    borderColor: item.borderColor,
                    backgroundColor: item.backgroundColor,
                  })),
                }}
              />
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  Admission Across All Years
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LineComponent
                  data={Object.values(data!.totalsByYear)}
                  labels={Object.keys(data!.totalsByYear)}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  Admission Across All Region
                </CardTitle>
              </CardHeader>
              <LineComponent
                data={Object.values(data!.regionTotals)}
                labels={Object.keys(data!.regionTotals)}
              />
            </Card>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  All Admission For Foerign Student
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={Object.values(data!.totoalsByYearForForeignStudent)}
                  label={Object.keys(data!.totoalsByYearForForeignStudent)}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  All Admission For Foerign Student
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={Object.values(data!.totalsByInstutionType)}
                  label={Object.keys(data!.totalsByInstutionType)}
                />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
