import { useQuery } from "@tanstack/react-query";

interface InstitutionData {
  institutionType: string;
  data: number;
}

interface KeyType {
  [key: string]: number;
}

type Response = {
  institutionData: InstitutionData[];
  totalsByYear: KeyType;
  totalAdmission: number;
  regionTotals: KeyType;
  stateSums: KeyType;
  totoalsByYearForForeignStudent: KeyType;
  forAllinstu: {
    type: string;
    data: KeyType;
  }[];
  totalsByInstutionType: KeyType;
};

export default function useGetAllDataHook({
  key,
  query,
}: {
  key: string[];
  query: string;
}) {
  return useQuery({
    queryKey: key,
    queryFn: async () => await getData(query),
    staleTime: 3600,
  });
}

async function getData(query: string): Promise<Response> {
  const data = await fetch(`/api/data?query=${query}`);
  if (!data.ok) {
    throw new Error("something went wrong");
  }
  const response = await data.json();
  return response;
}
