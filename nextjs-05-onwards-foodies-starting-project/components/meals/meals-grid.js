import MealItem from './meal-item';
import classes from './meals-grid.module.css';

export default function MealsGrid({meals}) {
  //  console.log(JSON.stringify(meals))
    return (
        <ul className={classes.meals}>
            {meals.map((mealItem) => (
                <li key={mealItem.id}>
                    <MealItem {...mealItem}/>
                </li>
            ))}
        </ul>
    );
}