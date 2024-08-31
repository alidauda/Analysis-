import prisma from "@/utlis/db";
import { NextResponse, type NextRequest } from "next/server";
const geopoliticalZones = [
  {
    zone: "North Central",
    states: ["Benue", "Kogi", "Kwara", "Nasarawa", "Niger", "Plateau", "FCT"],
  },
  {
    zone: "North East",
    states: ["Adamawa", "Bauchi", "Borno", "Gombe", "Taraba", "Yobe"],
  },
  {
    zone: "North West",
    states: [
      "Jigawa",
      "Kaduna",
      "Kano",
      "Katsina",
      "Kebbi",
      "Sokoto",
      "Zamfara",
    ],
  },
  { zone: "South East", states: ["Abia", "Anambra", "Ebonyi", "Enugu", "Imo"] },
  {
    zone: "South South",
    states: ["AkwaIbom", "Bayelsa", "CrossRiver", "Delta", "Edo", "Rivers"],
  },
  {
    zone: "South West",
    states: ["Ekiti", "Lagos", "Ogun", "Ondo", "Osun", "Oyo"],
  },
];
interface RegionTotals {
  [region: string]: number;
}
interface StateValues {
  [key: string]: string;
}

interface StateSums {
  [key: string]: number;
}
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello World" });
  // const searchParams = req.nextUrl.searchParams;
  // const query = searchParams.get("query");
  // const regionTotals: RegionTotals = {};
  // const totalsByYear: { [key: string]: number } = {};
  // const totoalsByYearForForeignStudent: { [key: string]: number } = {};
  // const totalsByInstutionType: { [key: string]: number } = {};

  // let data = await prisma.data.findMany({
  //   orderBy: {
  //     AdmissionYear: "asc",
  //   },
  // });
  // if (query && query.trim() !== "") {
  //   data = data.filter((item) => item.AdmissionYear === query.trim());
  // }

  // const stateValues = data.map(
  //   ({
  //     CourseTotal,
  //     INSTITUTION,
  //     InstitutionType,
  //     AdmissionYear,
  //     id,
  //     Foreign,
  //     COURSE,
  //     ...rest
  //   }) => rest
  // );
  // const stateSums = computeStateSums(stateValues);
  // const forAllinstu = ["university", "college", "polytechnic"].map((item) => ({
  //   type: item,
  //   data: computeStateSums(
  //     data
  //       .filter((insuType) => insuType.InstitutionType === item)
  //       .map(
  //         ({
  //           CourseTotal,
  //           INSTITUTION,
  //           InstitutionType,
  //           AdmissionYear,
  //           id,
  //           Foreign,
  //           COURSE,
  //           ...rest
  //         }) => rest
  //       )
  //   ),
  // }));
  // let totalAdmission = getTotal(
  //   data.map((item) => {
  //     return item.CourseTotal;
  //   })
  // );
  // let totalUniversityAdmission = getTotal(
  //   data
  //     .filter((item) => item.InstitutionType === "university")
  //     .map((item) => item.CourseTotal)
  // );
  // let totalCollegeAdmission = getTotal(
  //   data
  //     .filter((item) => item.InstitutionType === "college")
  //     .map((item) => item.CourseTotal)
  // );
  // let totalPolytenicAdmission = getTotal(
  //   data
  //     .filter((item) => item.InstitutionType === "polytechnic")
  //     .map((item) => item.CourseTotal)
  // );

  // data.forEach((item) => {
  //   if (totalsByYear[item.AdmissionYear]) {
  //     totalsByYear[item.AdmissionYear] += parseInt(item.CourseTotal);
  //   } else {
  //     totalsByYear[item.AdmissionYear] = parseInt(item.CourseTotal);
  //   }
  // });
  // data.forEach((item) => {
  //   if (totalsByInstutionType[item.InstitutionType]) {
  //     totalsByInstutionType[item.InstitutionType] += parseInt(item.CourseTotal);
  //   } else {
  //     totalsByInstutionType[item.InstitutionType] = parseInt(item.CourseTotal);
  //   }
  // });
  // data.forEach((item) => {
  //   if (totoalsByYearForForeignStudent[item.AdmissionYear]) {
  //     totoalsByYearForForeignStudent[item.AdmissionYear] += parseInt(
  //       item.Foreign
  //     );
  //   } else {
  //     totoalsByYearForForeignStudent[item.AdmissionYear] = parseInt(
  //       item.Foreign
  //     );
  //   }
  // });
  // for (let i = 0; i < stateValues.length; i++) {
  //   for (const [state, population] of Object.entries(stateValues[i]!)) {
  //     for (const zone of geopoliticalZones) {
  //       if (zone.states.includes(state)) {
  //         regionTotals[zone.zone] =
  //           (regionTotals[zone.zone] || 0) + parseInt(population);
  //       }
  //     }
  //   }
  // }
  // return Response.json({
  //   totalAdmission,
  //   regionTotals,
  //   stateSums,
  //   institutionData: [
  //     { institutionType: "university", data: totalUniversityAdmission },
  //     { institutionType: "college", data: totalCollegeAdmission },
  //     { institutionType: "poly", data: totalPolytenicAdmission },
  //   ],
  //   totalsByYear,
  //   totoalsByYearForForeignStudent,
  //   forAllinstu,
  //   totalsByInstutionType,
  // });
}

function computeStateSums(stateValues: StateValues[]): StateSums {
  const stateSums: StateSums = {};

  for (const stateObj of stateValues) {
    for (const [state, value] of Object.entries(stateObj)) {
      stateSums[state] = (stateSums[state] || 0) + parseInt(value);
    }
  }

  return stateSums;
}

function getTotal(data: string[]) {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += parseInt(data[i]);
  }
  return total;
}
