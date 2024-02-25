import { Suspense } from "react";
import SearchView from "@/components/SearchView/SearchView";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchView />
      </Suspense>
    </main>
  );
}
