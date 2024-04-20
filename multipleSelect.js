const selectedOption = localStorage.getItem('selectedOption');
document.addEventListener('DOMContentLoaded', getSelectedOption);

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  });


async function getSelectedOption(){
if(selectedOption == 'search'){
    ingredient = localStorage.getItem('ingredient')
    var response = await(fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`))
    data = await response.json();
    meals = data.meals
    var idMeals = []
    meals.forEach(meal => {
        idMeals.push(meal.idMeal);
    });
    console.log(idMeals);

    var recipes = []
   
    idMeals.forEach(async id => {
        data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        meal = await data.json()
        // console.log(meal.meals[0]);
        recipes.push(meal.meals[0]);
    
        
    });
    console.log(recipes)
}

}