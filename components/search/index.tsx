"use client";

import { Country } from "@/app/page";
import Image from "next/image";
import { useState } from "react";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const [countriesList, SetCountriesList] = useState([] as any);

  async function getCountryByName(
    searchedName: string
  ): Promise<Country[] | null> {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries: Country[] = await response.json();

    if (input.length === 0) return null;

    // return countries.find(
    //   (OBJcountry: Country) =>
    //     OBJcountry.translations.por.common == searchedName.toString()
    // )!;

    return countries.filter((country: Country) => {
      if (
        country.translations.por.common
          .toLowerCase()
          .slice(0, searchedName.length) === searchedName.toLowerCase()
      )
        return country;

      return;
    })! as Country[];
  }

  const handleChange = (search: string) => {
    // const fetchData = async () => {
    //   const country = await getCountryByName(input);
    //   console.log(country);
    // };

    // setInput("");

    setInput(search);

    if (search.length === 0) {
      SetCountriesList([]);
      return;
    }

    // Call API Method to get an Array of Nations
    getCountryByName(search).then((res: Country[] | null) => {
      if (res !== null)
        SetCountriesList(res.map((c: Country) => c.translations.por.common));
    }); // need to creat a method to Capitalize country name

    // console.log(input, country);

    //
  };

  return (
    <div className="flex bg-slate-100 rounded-sm gap-1">
      <Image src="/search1.png" alt="search" width={24} height={24} />
      <input
        type="search"
        placeholder="Buscar país"
        className="bg-transparent outline-none w-full font-medium"
        value={input}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <div>
        <ul>
          {countriesList.map((country: string, idx: number) => (
            <li key={country + idx}>
              <a href={`/${country}`}>{country}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
