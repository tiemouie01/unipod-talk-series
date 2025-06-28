"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {useQueryState, parseAsInteger} from "nuqs"
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput({
  placeholder,
}: {
  placeholder: string;
}) {
    const [query, setQuery] =useQueryState("query",{defaultValue:"",history:"replace", shallow:false})
    const [ , setPage] = useQueryState('page',parseAsInteger.withDefault(1).withOptions({history:"replace", shallow:false}))
  const handleSearch = useDebouncedCallback(async (term: string) => {
   await setPage(1)
    await setQuery(term || "")
  }, 300)
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="w-full pl-8"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={query}
      />
    </div>
  );
}