// import prisma from '@/utlis/db';

// export async function POST(req: Request) {
//   const { institutionType, university, state } = (await req.json()) as {
//     institutionType: string;
//     state: string;

//     university: string;
//   };

//   const data = await prisma.data.findMany({
//     orderBy: {
//       AdmissionYear: 'asc',
//     },
//     where: {
//       INSTITUTION: university,
//       InstitutionType: institutionType,
//     },
//     select: {
//       CourseTotal: true,
//       AdmissionYear: true,
//       COURSE: true,
//       InstitutionType: true,
//     },
//   });

//   const years = ['2017', '2018', '2019', '2020', '2021', '2022'];

//   const courseTotals = years.map((year) => {
//     let total = 0;
//     const dataForYear = data.filter((entry) => entry.AdmissionYear === year);
//     if (dataForYear.length < 0) total = 0;
//     for (let i = 0; i < dataForYear.length; i++) {
//       total += parseInt(dataForYear[i].CourseTotal);
//     }
//     return {
//       year: year,
//       total: total,
//     };
//   });
//   const sorted = transformData(data);

//   return Response.json({
//     data,
//     courseTotals,
//     sorted,
//   });
// }
// interface CourseRecord {
//   CourseTotal: string;
//   AdmissionYear: string;
//   COURSE: string;
//   InstitutionType: string;
// }

// interface InstitutionYearCount {
//   [year: string]: number;
// }

// interface CourseMetaData {
//   [institutionType: string]: InstitutionYearCount;
// }

// interface SortedData {
//   courseName: string;
//   metadata: CourseMetaData;
// }

// const initializeYears = (dataArray: CourseRecord[]): Set<string> => {
//   const years = new Set<string>();
//   dataArray.forEach(({ AdmissionYear }) => years.add(AdmissionYear));
//   return years;
// };

// const transformData = (dataArray: CourseRecord[]): SortedData[] => {
//   const sortedData: SortedData[] = [];
//   const allYears = initializeYears(dataArray);

//   dataArray.forEach(
//     ({ CourseTotal, AdmissionYear, COURSE, InstitutionType }) => {
//       let courseData = sortedData.find((item) => item.courseName === COURSE);

//       if (!courseData) {
//         courseData = { courseName: COURSE, metadata: {} };
//         sortedData.push(courseData);
//       }

//       if (!courseData.metadata[InstitutionType]) {
//         courseData.metadata[InstitutionType] = {};
//         allYears.forEach(
//           (year) => (courseData!.metadata[InstitutionType][year] = 0)
//         );
//       }

//       courseData.metadata[InstitutionType][AdmissionYear] +=
//         parseInt(CourseTotal);
//     }
//   );

//   return sortedData;
// };

// // Example usage:
