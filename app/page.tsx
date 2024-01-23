"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

interface Pokemon {
  id: string;
  name: string;
  images: string;
  cardmarket: {
    prices: {
      averageSellPrice: string;
    };
  };
  number: string;
  set: {
    name: string;
  };
  types: string[];
}

const Pokemon: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    axios({
      url: "https://api.pokemontcg.io/v2/cards?q=set.id:swsh11&orderBy=-cardmarket.prices.averageSellPrice", //https://api.pokemontcg.io/v2/sets
      method: "GET",
      headers: {
        "X-Api-Key": "c685c0b5-2061-4705-9eff-2e0c219ba257",
      },
    })
      .then((response) => {
        setPokemon(response.data.data);
        console.log(response.data.data);
        // setFilteredData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="bg-gray-800 min-h-screen p-2 sm:p-10">
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl text-yellow-300 font-bold mb-6">
            Pokédex
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {pokemon.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 rounded-lg p-4 text-white"
            >
              <div className="text-yellow-400 text-sm mb-2">{item.id}</div>
              <div className="flex justify-center mb-4">
                <img
                  src={item.images.small}
                  alt={`Placeholder image for ${item.name}`}
                  className=" sm:h-30 sm:w-30"
                />
              </div>
              <h2 className="text-lg sm:text-xl font-bold mb-2">{item.name}</h2>
              <div className="text-xs sm:text-sm mb-1">
                Avg. Price: ${item.cardmarket.prices.averageSellPrice}
              </div>
              <div className="text-xs sm:text-sm mb-1">Type: {item.types}</div>
              <div className="text-xs sm:text-sm">Number: {item.number}</div>
              <div className="text-xs sm:text-sm">Set: {item.set.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
