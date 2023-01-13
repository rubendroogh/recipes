import { Chivo_Mono } from '@next/font/google'
import { ChangeEvent, useRef, useState } from 'react'
import { Recipe } from '../database/RecipeRepository'
import styles from '../styles/Recipe.module.css'

const font = Chivo_Mono({})

export default function SingleRecipe(props: Recipe) {
    let inputRef = useRef<HTMLInputElement>(null);
    const [persons, setPersons] = useState(props.personAmount ?? 1);
    
    let personLabel = persons == 1 ? "persoon" : "personen";
    
    const ingredientsJSX = props.ingredients.map(i => <li key={i.title}>{i.title}, {i.amount * persons} {i.unit}</li>)
    
    const personsChange = (e: ChangeEvent) => {
        let value = parseFloat(inputRef.current!.value)
        
        if (!isNaN(value)) {
            setPersons(value)
        }
        else {
            setPersons(1)
        }
    }

    return (
        <section className={`${font.className} ${styles.section}`}>
            <h2 className={font.className}>{props.title} voor {persons} {personLabel}</h2>
            <ul>
                {ingredientsJSX}
            </ul>
            <br />
            {
                props.creator &&
                <small>By {props.creator}</small>
            }
            {/* <input ref={inputRef} style={{marginTop: 20}} onChange={personsChange} value={persons} type="number" /> */}
        </section>
    )
}
