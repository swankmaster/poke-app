"use client";
import Link from "next/link";
import Image from "next/image";
import { usePokemonContext } from "@/context/PokemonProvider";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function simulateError() {
  if (Math.random() < 0.3) {
    throw new Error("Artificial error triggered!");
  }
}

export function CapitalizeFirstLetter(str: string): string {
  return str.length === 0 ? str : str.charAt(0).toUpperCase() + str.slice(1);
}

export default function PokemonList() {
  const { pokemons } = usePokemonContext();
  const [delayedData, setDelayedData] = useState<typeof pokemons | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await wait(Math.random() * 3000 + 1000); // Simulate 1s - 4s delay
      try {
        simulateError();
        setDelayedData(pokemons);
      } catch (err) {
        setError(true);
      }
    }
    fetchData();
  }, [pokemons]);
  if (error) throw new Error("Artificial Error Triggered");
  if (!delayedData) return <LoadingSpinner />;

  return (
    <ul className="list-outside hover:list-inside" key="pokemon-list">
      <Image
        src="/International_Pokémon_logo.svg.png"
        alt="Pokémon Logo"
        width={250}
        height={100}
      />
      {delayedData.results.map(
        (p: { url: string | undefined; name: string }, index: React.Key) => {
          const id = p.url?.split("/").filter(Boolean).pop();
          return (
            <li
              key={index}
              className="whitespace-nowrap hover:bg-slate-800 justify-center text-center rounded-md"
            >
              <Link href={`/home/pokemon/${id}`} className="justify-center">
                {CapitalizeFirstLetter(p.name)}
              </Link>
            </li>
          );
        }
      )}
    </ul>
  );
}
