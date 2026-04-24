import { Suspense } from "react";
// import Loading from './loading'
import { Metadata } from "next";
import ProductsGrid from "@/components/products/ProductsGrid";
import Loading from "./item/loading";

export async function generateMetadata({
  params,
}: {
  params: { category?: string };
}): Promise<Metadata> {
  return {
    title: "CarHub  | Explore Our Best Car Deals",
    description: `Discover incredible Cars. Choose your favorite Car and customize your dream experience today.`,
    openGraph: {
      title: `CarHub`,
      description: `Explore the best Cars`,
      type: "website",
    },
  };
}

export default async function page() {
  return (
    <div className="mt-24">
      <Suspense fallback={<Loading />}>
        <ProductsGrid />
      </Suspense>
    </div>
  );
}
