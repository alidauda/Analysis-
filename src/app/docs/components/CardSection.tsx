import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
interface CardProps {
  totalAdmission: number;
  institutionData: InstitutionData[];
}
interface InstitutionData {
  institutionType: string;
  data: number;
}
export default function CardSection({ data }: { data: CardProps }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Admission</CardTitle>
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
            {data.totalAdmission.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      {data.institutionData.map((item) => (
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
            <div className="text-2xl font-bold">
              {item.data.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
