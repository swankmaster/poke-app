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

export default async function ServerPokemonList() {
  await wait(10000);

  return "Neel";
}
