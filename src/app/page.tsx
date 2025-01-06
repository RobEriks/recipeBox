"use client"

import React, { useState } from "react"



const recipes = [
  { id: 1, name: "Chicken Curry"},
  { id: 2, name: "Lasagne"},
  { id: 3, name: "Tacos"},
]


export default function Home() {
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
