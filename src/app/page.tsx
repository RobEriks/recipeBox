"use client"

import React, { useState } from "react"

type Recipe = {
  id: number;
  name: string;
};





export default function Home() {

  const [recipes, setRecipes] = useState<Recipe[]>([
    { id: 1, name: "Chicken Curry"},
    { id: 2, name: "Lasagne"},
    { id: 3, name: "Tacos"},
  ])


  return (
    <div className="min-h-screen p-8 bg-gray-500">
      <h1 className="text-3xl font-bold mb-6">Recipe Box</h1>



      <ul className="space-y-6">
         {recipes.map((recipe) => (
          <li key={recipe.id} className="p-4 bg-white rounded-lg shadow-md text-blue-600 font-bold">
            {recipe.name}
            </li>
         ))}


      </ul>



    </div>
  );
}
