export const years = ["2017", "2018", "2019", "2020", "2021", "2022"];
export const institutionType = [
  {
    type: "university",
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
  {
    type: "college",
    borderColor: "rgba(255, 99, 132, 1)",
    backgroundColor: "rgba(255, 99, 132, 0.2)",
  },
  {
    type: "polytechnic",
    borderColor: "rgba(54, 162, 235, 1)",
    backgroundColor: "rgba(54, 162, 235,0.2)",
  },
];
export function sortObj(obj: { [key: string]: number }) {
  const sortedInstitutionsArray = Object.entries(obj).sort(
    (a, b) => b[1] - a[1]
  );

  const sortedInstitutionsObject = Object.fromEntries(sortedInstitutionsArray);
  return sortedInstitutionsObject;
}
