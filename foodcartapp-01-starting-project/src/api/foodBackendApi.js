export async function fetchMeals() {
   // console.log('apiURL'+apiURL);
    const response =  await fetch('http://localhost:3000/meals');
    const jsonResponse = response.json();
    if (!response.ok){
        throw new Error('Failed to Fetch Meals Items');
    }

    return jsonResponse;
}