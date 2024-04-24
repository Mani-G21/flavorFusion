const selectedOption = localStorage.getItem('selectedOption');
const oilSelect = document.getElementById("oilSelect");
const vegetableSelect = document.getElementById("vegetableSelect");
const spiceSelect = document.getElementById("spiceSelect");
const miscellaneousSelect = document.getElementById('miscellaneous');

document.getElementById('submitButton').addEventListener('click', getSelectedOption);

document.addEventListener('DOMContentLoaded', async function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
});

async function getSelectedOption() {
    if (selectedOption == 'search') {
        ingredient = localStorage.getItem('ingredient');
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        data = await response.json();
        meals = data.meals;
        var idMeals = [];
        meals.forEach(meal => {
            idMeals.push(meal.idMeal);
        });

        var recipes = await Promise.all(idMeals.map(async id => {
            var data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            var meal = await data.json();
            return meal.meals[0];
        }));

        const filteredRecipes = [];

        // Log the values of select elements to check if they are what we expect
        console.log("Oil Select Value:", oilSelect.value);
        console.log("Vegetable Select Value:", vegetableSelect.value);
        console.log("Spice Select Value:", spiceSelect.value);
        console.log("Miscellaneous Select Value:", miscellaneousSelect.value);

        // Iterate over each recipe in the recipes array
        recipes.forEach(recipe => {
            // Check if any of the selected ingredients match the ingredients in the recipe
            for (let i = 1; i <= 20; i++) {
                const ingredient = recipe[`strIngredient${i}`];
                
                // Compare with the selected values of the select elements
                if (ingredient && (ingredient === oilSelect.value.toString() ||
                                    ingredient === vegetableSelect.value.toString() ||
                                    ingredient === spiceSelect.value.toString() ||
                                    ingredient === miscellaneousSelect.value.toString())) {
                    // If any matching ingredient is found, add the recipe to the filtered recipes array
                    filteredRecipes.push(recipe);
                    break; // Break the loop once a matching ingredient is found
                }
            }
        });

        // Log the filtered recipes array
        console.log("Filtered Recipes:", filteredRecipes);
        // Storing the filteredRecipes array in localStorage
    localStorage.setItem('filteredRecipes', JSON.stringify(filteredRecipes));

// Retrieving the filteredRecipes array from localStorage


        window.location.href = 'recipes.html';
    }
}
