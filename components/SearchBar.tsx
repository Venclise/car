"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Input } from "./ui/input";
import { Search } from "lucide-react";

import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";
import { categories } from "@/lib/constants";
import Link from "next/link";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

export default function SearchBar() {
  const router = useRouter();
  const [results, setResults] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.length < 2 || search === "") {
      setResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const res = await fetch(`api/products?search=${search}`);
      const data = await res.json();
      setResults(data);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="w-full h-max ">
      <div className="lg:flex hidden w-full">
        <Combobox items={results}>
          <div className="flex items-center gap-4 bg-gray-100  rounded-full px-5 py-3 w-full">
            <Search strokeWidth={2} size={15} className="w-max text-blue-600" />
            <ComboboxInput
              type="text"
              placeholder="Search for Cars"
              value={search}
              className=" focus-visible:ring-gray-100 w-full font-semibold placeholder:text-blue-600 text-xl border-0 ring-0  "
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ComboboxContent className="flex flex-col h-[50vh] w-full  ">
            {results.length > 0 ? (
              <ComboboxList className="  flex flex-col w-full p-5 z-50">
                <span className="text-sm font-semibold text-blue-600 ">
                  Related Searches
                </span>
                {results.map((item) => (
                  <div
                    key={item._id}
                    className="p-2 w-full  hover:bg-gray-100 rounded-md hover:text-blue-600"
                    onClick={() => {
                      router.push(`/products/item/${item._id}`);
                    }}
                  >
                    <div className="w-full text-left flex items-center gap-2 cursor-pointer">
                      <Search className="w-4 h-4 " />
                      {item.title}
                    </div>
                  </div>
                ))}
              </ComboboxList>
            ) : (
              <ComboboxList
                className={`${search.length ? "hidden" : "flex"}  h-full  flex-col w-full p-10  z-50 `}
              >
                <span className="text-md font-semibold p-2 text-blue-600">
                  Quick Search
                </span>
                {categories.map((item) => (
                  <Link
                    href={`/products/${item.title}`}
                    key={item.title}
                    className="p-2 w-full  hover:bg-gray-100 rounded-md hover:text-blue-600"
                  >
                    <div className="w-full text-left flex items-center gap-2 cursor-pointer">
                      <Search className="w-4 h-4 " />
                      <span className="text-sm">{item.title}</span>
                    </div>
                  </Link>
                ))}
              </ComboboxList>
            )}
            {loading && (
              <div className="h-full w-full  flex items-center justify-center">
                <p className=" flex items-center ">
                  <Spinner />
                  Loading
                </p>
              </div>
            )}
          </ComboboxContent>
        </Combobox>
      </div>

      <div className="flex md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="cursor-pointer rounded-full"
              variant="ghost"
              size="icon-lg"
            >
              <Search strokeWidth={1.3} />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="h-[80vh] p-10 lg:px-20 lg:py-10 z-[100]"
          >
            <SheetTitle></SheetTitle>

            <div className="flex items-center gap-4">
              <Search strokeWidth={1.5} className="w-5 h-5 text-blue-600" />
              <input
                type="text"
                placeholder="Search here"
                value={search}
                className="w-full font-bold placeholder:text-blue-600 text-2xl border-0 outline-0 "
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex flex-col h-screen ">
              {results.length > 0 ? (
                <div className=" bg-white flex flex-col items-start justify-start w-full mt-12  z-50">
                  <span className="text-sm font-semibold text-blue-600 ">
                    Related Searches
                  </span>
                  {results.map((item) => (
                    <div
                      key={item._id}
                      className="p-2 w-full  hover:bg-gray-50 rounded-md hover:text-blue-600"
                      onClick={() => {
                        router.push(`/products/item/${item._id}`);
                      }}
                    >
                      <SheetClose className="w-full text-left flex items-center gap-2 cursor-pointer">
                        <Search className="w-4 h-4 " />
                        {item.title}
                      </SheetClose>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={`${search.length ? "hidden" : "flex"} bg-white  flex-col items-start justify-start w-full mt-12  z-50`}
                >
                  <span className="text-md font-semibold p-2 text-blue-600">
                    Search by brands
                  </span>
                  {categories.map((item) => (
                    <Link
                      href={item.title}
                      key={item.title}
                      className="p-2 w-full  hover:bg-gray-50 rounded-md hover:text-blue-600"
                    >
                      <SheetClose className="w-full text-left flex items-center gap-2 cursor-pointer">
                        <Search className="w-4 h-4 " />
                        <span className="text-sm">{item.title}</span>
                      </SheetClose>
                    </Link>
                  ))}
                </div>
              )}

              {loading && (
                <p className="w-full flex items-center ">
                  <Spinner />
                </p>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
