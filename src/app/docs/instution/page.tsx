"use client";
import { useState } from "react";
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
import { states, yearss } from "@/utlis/data";
import { years } from "../conts/conts";
import SearchDropDown from "../components/SearchDropDown";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
  const [year, setYear] = useState<string[]>([...years]);
  const [state, setState] = useState<string[]>([...states]);
  const [institutionType, setInsType] = useState([
    "university",
    "college",
    "polytechnic",
  ]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const maxPagesToShow = 2;

  const { data, isLoading } = useGetInstutionDataHook({
    key: [state, year, institutionType],
    state,
    institutionType,
    year,
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInstitutions = data?.sortedInstitutionsObject
    ? Object.entries(data.sortedInstitutionsObject).slice(
        indexOfFirstItem,
        indexOfLastItem
      )
    : [];
  console.log(currentInstitutions);
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="space-y-3">
      <div className="flex gap-4">
        <div>
          <p>Years </p>
          <SearchDropDown
            value={years}
            data={year}
            label="all"
            search={search}
            setSearch={setSearch}
            setState={setYear}
            key={1}
          />
        </div>
        <div>
          <p>Instution Type</p>
          <SearchDropDown
            value={listofIns}
            data={institutionType}
            label="all"
            search={search}
            setSearch={setSearch}
            setState={setInsType}
            key={2}
          />
        </div>

        <div>
          <p>state </p>
          <SearchDropDown
            value={states}
            data={state}
            label="all"
            search={search}
            setSearch={setSearch}
            setState={setState}
            key={3}
          />
        </div>
      </div>
      <>
        {!data?.sortedInstitutionsObject ? (
          <Loading />
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Admission
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
                    {data?.numberofInstution}
                  </div>
                </CardContent>
              </Card>

              {data?.totalForInstutions?.map((item) => (
                <Card key={item.institutionType}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {" "}
                      Total Admission for {item.institutionType}
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

            {
              <Card className=" overflow-y-auto h-[500px] text-center">
                <CardHeader>
                  <CardHeader>
                    <CardTitle>Total Admission By University</CardTitle>
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
                        labels: currentInstitutions.map(
                          ([institution]) => institution
                        ),
                        datasets: [
                          {
                            data: currentInstitutions.map(
                              ([_, value]) => value
                            ),
                            label: "Instution",
                            borderColor: "rgb(255, 99, 132)",
                            backgroundColor: "rgba(255, 99, 132, 0.5)",
                          },
                        ],
                      }}
                    />
                  </CardContent>
                  <CardFooter>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                          />
                        </PaginationItem>
                        {Array.from(
                          {
                            length: Math.min(
                              maxPagesToShow,
                              Math.ceil(
                                Object.keys(
                                  data?.sortedInstitutionsObject || {}
                                ).length / itemsPerPage
                              )
                            ),
                          },
                          (_, i) => (
                            <PaginationItem key={i}>
                              <PaginationLink
                                href="#"
                                isActive={i + 1 === currentPage}
                                onClick={() => paginate(i + 1)}
                              >
                                {i + 1}
                              </PaginationLink>
                            </PaginationItem>
                          )
                        )}
                        {currentPage <= maxPagesToShow && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={
                              currentPage ===
                              Math.ceil(
                                Object.keys(
                                  data?.sortedInstitutionsObject || {}
                                ).length / itemsPerPage
                              )
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </CardFooter>
                </CardHeader>
              </Card>
            }
          </>
        )}
      </>
    </div>
  );
}
