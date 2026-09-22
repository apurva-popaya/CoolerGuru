import { SearchResultsPage } from "@/components/buyer/search/search-results-page";
import type { GlobalSearchType, SearchBusinessType, SearchSort } from "@/types/search-api";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    type?: string;

    business_type?: string;
    category_slug?: string;

    verified_only?: string;
    premium_only?: string;

    state?: string;
    city?: string;

    sort?: string;

    page?: string;
  }>;
}

const businessTypes: SearchBusinessType[] = ["MANUFACTURER", "SUPPLIER", "EXPORTER", "OEM", "DISTRIBUTOR"];

const sortOptions: SearchSort[] = ["relevance", "newest", "oldest", "name_asc", "name_desc"];

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  const type: GlobalSearchType = params.type === "products" || params.type === "companies" ? params.type : "all";

  const selectedBusinessTypes = (params.business_type ?? "")
    .split(",")
    .filter((value): value is SearchBusinessType => businessTypes.includes(value as SearchBusinessType));

  const selectedCategories = (params.category_slug ?? "").split(",").filter(Boolean);

  const sort = sortOptions.includes(params.sort as SearchSort) ? (params.sort as SearchSort) : "relevance";

  return (
    <SearchResultsPage
      query={params.q ?? ""}
      type={type}
      businessTypes={selectedBusinessTypes}
      categorySlugs={selectedCategories}
      verifiedOnly={params.verified_only === "true"}
      premiumOnly={params.premium_only === "true"}
      state={params.state}
      city={params.city}
      sort={sort}
      page={Math.max(1, Number(params.page) || 1)}
    />
  );
}
