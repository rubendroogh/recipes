import { Chivo_Mono } from '@next/font/google'
import { useRef, useState } from 'react';
import styles from "../styles/CreateRecipe.module.css"
import { DBCreateRecipe, Ingredient, Recipe } from '../database/RecipeRepository';

const font = Chivo_Mono({})

export default function CreateRecipe() {
    const [ingredients, setIngredients] = useState([{title: 'banaan', amount: 1, unit: 'stuks'}] as Ingredient[])

    let titleRef = useRef<HTMLInputElement>(null)
    let newIngredientTitleRef = useRef<HTMLInputElement>(null)
    let newIngredientAmountRef = useRef<HTMLInputElement>(null)
    let newIngredientUnitRef = useRef<HTMLInputElement>(null)

    const submit: React.FormEventHandler<HTMLButtonElement> = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        
        const recipe = {
            title: titleRef.current?.value ?? "",
            ingredients: ingredients
        } as Recipe

        console.log('creating recipe!')
        DBCreateRecipe(recipe)

        const event = new CustomEvent('createdRecipe');
        document.dispatchEvent(event);
    }
    
    const addIngredient: React.FormEventHandler<HTMLButtonElement> = (e: React.FormEvent<HTMLButtonElement>) => {
        let newIngredient = {
            title: newIngredientTitleRef.current!.value,
            amount: parseFloat(newIngredientAmountRef.current!.value),
            unit: newIngredientUnitRef.current!.value
        } as Ingredient

        ingredients.push(newIngredient)
        setIngredients([...ingredients])
    }
    
    function removeIngredient(index: number) {
        if (index > -1) {
            ingredients.splice(index, 1);
        }
        setIngredients([...ingredients])
    }

    return (
        <div className={styles.background}>
            <section className={`${styles.formWrapper}`}>
                <h2>Test</h2>
                <form method="POST">
                    <div>
                        <span>Title: </span>
                        <input ref={titleRef} type="text" name="title" id="title" />
                    </div>
                    {ingredients.map((i, index) => {
                        return (
                            <div className='ingredients'>
                                <span>Ingredient {index + 1}: </span>
                                <span>{i.title}, {i.amount} {i.unit}</span>
                                <button type='button' onClick={(e) => removeIngredient(index)}>x</button>
                            </div>
                        )
                    })}
                    <div className='ingredients'>
                        <span>New Ingredient: </span>
                        <input type="text" ref={newIngredientTitleRef} />
                        <input type="text" ref={newIngredientAmountRef} />
                        <input type="text" ref={newIngredientUnitRef}/>
                        <button type='button' onClick={addIngredient}>+</button>
                    </div>
                    <button type="submit" onClick={submit}>Submit</button>
                </form>
            </section>
        </div>
    )
}
