"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function ClearFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filtersApplied =
    searchParams.get("status") || searchParams.get("priority");

  // check if there are any search params
  if (!filtersApplied) return null;

  const onClear = () => {
    // remove search params
    router.refresh();
    router.push("/tasks");
  };

  return (
    <div>
      <h1 className="underline cursor-pointer"
        onClick={onClear}
      >Clear Filters</h1>
    </div>
  );
}

export default ClearFilters;
