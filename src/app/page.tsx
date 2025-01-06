"use client"

import React, { useState, useEffect } from "react"

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
  const [newRecipeName, setNewRecipeName] = useState<string>("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editedName, setEditedName] = useState<string>("")

  useEffect(() => {
    const savedRecipes = localStorage.getItem("recipes")
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes))
  }, [recipes])

  const addRecipe = () => {
    if (!newRecipeName.trim()) return
    const newRecipe: Recipe = {
      id: recipes.length + 1,
      name: newRecipeName
    }
    setRecipes([...recipes, newRecipe])
    setNewRecipeName("")
  }

  const deleteRecipe = (id: number) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id)
    setRecipes(updatedRecipes)
  }

  const startEditing = (id: number, name: string) => {
    setEditingId(id)
    setEditedName(name)
  }

  const saveEdit = (id: number) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === id ? { ...recipe, name: editedName } : recipe
    )
    setRecipes(updatedRecipes)
    setEditingId(null)
  }

  return (
    <div className="min-h-screen p-8 bg-gray-500">
      <h1 className="text-3xl font-bold mb-6">Recipe Box</h1>

      <div className="mb-6">
        <input
          type="text"
          value={newRecipeName}
          onChange={(e) => setNewRecipeName(e.target.value)}
          placeholder="New recipe"
          className="p-2 rounded-lg mr-4 text-gray-900"
        />
        <button
          onClick={addRecipe}
          className="mb-6 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md"
        >
          Add Recipe
        </button>
      </div>

      <ul className="space-y-6">
        {recipes.map((recipe) => (
          <li
            key={recipe.id}
            className="p-4 bg-white rounded-lg shadow-md text-blue-600 font-bold"
          >
            {editingId === recipe.id ? (
              // Redigeringsläge
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="p-2 rounded-lg text-gray-900"
                />
                <button
                  onClick={() => saveEdit(recipe.id)}
                  className="px-2 py-1 bg-green-500 text-white rounded-lg text-sm"
                >
                  Save
                </button>
              </div>
            ) : (
              // Visningsläge
              <>
                {recipe.name}
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(recipe.id, recipe.name)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded-lg text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteRecipe(recipe.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}