import { addDoc, collection, getDocs } from "firebase/firestore"
import { db } from "./firebase"

export interface Recipe {
    title: string,
    ingredients: Ingredient[],
    personAmount?: number,
    creator?: string
}

export interface Ingredient {
    title: string,
    amount: number,
    unit: string
}

export async function DBGetRecipes(): Promise<Recipe[]> {
    var recipes: Recipe[] = []
    var docs = await getDocs(collection(db, "recipes"))

    docs.forEach((doc) => {
        recipes.push(doc.data() as Recipe)
    })

    return recipes
}

export async function DBCreateRecipe(recipe: Recipe) {
    const docRef = await addDoc(collection(db, "recipes"), recipe)
}
