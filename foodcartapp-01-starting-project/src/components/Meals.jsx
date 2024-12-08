import { useContext } from "react";
import MealsItem from "./MealsItem";
import  useFetch  from "../hooks/useFetch";
const requestConfig = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
export default function Meals() {
    const {respData, isLoading} = useFetch('http://localhost:3000/meals',requestConfig);
    return (
        <ul id="meals">
            {respData && respData.map((data) => (
                <MealsItem key={data.id} data={data}/>
            ))}
           
        </ul>
    );
}