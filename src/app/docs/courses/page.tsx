"use client";
import { useState } from "react";

import DropDown from "../components/Dropdown";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useGetInstutionDataHook from "../hook/getInstution";
import Loading from "../components/Loading";
import { states } from "@/utlis/data";
import { years } from "../conts/conts";
import useGetCourseDataHook from "../hook/getCourse";
import SearchDropDown from "../components/SearchDropDown";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const listofIns = ["university", "college", "polytechnic"];

export default function Page() {
  const [yearC, setYear] = useState([...years]);
  const [stateC, setState] = useState([...states]);
  const [institutionTypeC, setInsType] = useState([...listofIns]);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetCourseDataHook({
    key: [stateC, yearC, institutionTypeC],
    stateC,
    institutionTypeC,
    yearC,
  });

  return (
    <div className="space-y-3">
      <div className="flex gap-4">
        <div>
          <p>Years </p>
          <SearchDropDown
            value={years}
            data={yearC}
            label="all"
            search={search}
            setSearch={setSearch}
            setState={setYear}
          />
        </div>
        <div>
          <p>Instution Type</p>
          <SearchDropDown
            value={listofIns}
            data={institutionTypeC}
            label="all"
            search={search}
            setSearch={setSearch}
            setState={setInsType}
          />
        </div>

        <div>
          <p>state </p>
          <SearchDropDown
            value={states}
            data={stateC}
            label="all"
            search={search}
            setSearch={setSearch}
            setState={setState}
          />
        </div>
      </div>
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Course
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-school"
                  >
                    <path d="m4 6 8-4 8 4" />
                    <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
                    <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
                    <path d="M18 5v17" />
                    <path d="M6 5v17" />
                    <circle cx="12" cy="9" r="2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data?.numberInstutionC}
                  </div>
                </CardContent>
              </Card>

              {data &&
                data?.totalInstutionsC?.map((item) => (
                  <Card key={item.institutionType}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {" "}
                        Total Course for {item.institutionType}
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-school"
                      >
                        <path d="m4 6 8-4 8 4" />
                        <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
                        <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
                        <path d="M18 5v17" />
                        <path d="M6 5v17" />
                        <circle cx="12" cy="9" r="2" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{item.data}</div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {data?.sortedObjectC && (
              <Card className=" overflow-y-auto h-[500px] text-center">
                <CardHeader>
                  <CardHeader>
                    <CardTitle>Total Courses</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-11">
                    <Bar
                      options={{
                        indexAxis: "y" as const,
                        elements: {
                          bar: {
                            borderWidth: 2,
                          },
                        },
                        responsive: true,
                        plugins: {},
                      }}
                      data={{
                        labels: Object.keys(data!.sortedObjectC).slice(0, 20),
                        datasets: [
                          {
                            data: Object.values(data!.sortedObjectC).slice(
                              0,
                              20
                            ),
                            label: "Instution",
                            borderColor: "rgb(255, 99, 132)",
                            backgroundColor: "rgba(255, 99, 132, 0.5)",
                          },
                        ],
                      }}
                    />
                  </CardContent>
                </CardHeader>
              </Card>
            )}
          </>
        )}
      </>
    </div>
  );
}
