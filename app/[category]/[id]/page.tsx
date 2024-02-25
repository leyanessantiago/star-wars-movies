import DetailsTable from "@/components/DetailsTable/DetailsTable";
import SearchForm from "@/components/SearchForm/SearchForm";
import { BASE_URL } from "@/libs/api";
import { getDetails } from "@/libs/get-details";
import { transformSnakeCaseToTitleCase } from "@/libs/utils/transform-snake-case-title-case";

interface DetailsProps {
  params: { category: string, id: number }
}

export default async function Page({ params }: DetailsProps) {
  const { category, id } = params;

  const data = await getDetails(category, `${BASE_URL}/${category}/${id}`);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <SearchForm />
      <div className="mt-16 w-80 md:w-4/5 lg:w-1/2">
        <h1
          className="font-bold text-xl text-white mb-3 text-center">
          {transformSnakeCaseToTitleCase(category.endsWith('s') ? category.slice(0, category.length - 1) : category)}
        </h1>
        <DetailsTable data={data} />
      </div>
    </main>
  );
}
