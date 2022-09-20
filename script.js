const searchBtn= document.getElementById("search-btn")
const mealList= document.getElementById("meal")
const mealDetailsContent= document.querySelector(".meal-details-content")
const recipeCloseBtn = document.getElementById("recipe-close-btn")

// event listeners

searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
  mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// yazılan verinin konsola yazdırılması


/*

function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    console.log(searchInputTxt)}
 // bu fonksiyon metin kısmına yazılan yazıyı text olarak alıp, konsola yazıyor.

*/


/*           JSON ÜZERİNDEN VERİNİN ÇEKİLİP KONSOLA YAZDIRILMASI                 */ 

function getMealList(){
  let searchInputTxt = document.getElementById('search-input').value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
  .then(response => response.json())
  .then(data=>{
    console.log(data);
      let html="";
      if(data.meals){
        data.meals.forEach(meal => {
          html += `
          <div class = "meal-item" data-id="${meal.idMeal}">
            <div class = "meal-img">
             <img src = "${meal.strMealThumb}" alt = "food">
           </div>
           <div class = "meal-name">
             <h3>${meal.strMeal}</h3>
             <a href = "#" class = "recipe-btn ">Get Recipe</a>
           </div>
          </div>
          
          `
          
          ;
        });
        mealList.classList.remove("notFound");
      }
      else{ 
        html="Sorry, We didnt find anything, try new ingredience..";
       mealList.classList.add("notFound")
      }
      
      mealList.innerHTML= html;
  })


}

// yemeğin tarifini almak



  function getMealRecipe(e){
    e.preventDefault();                                 // preventDefault ile eylemin gerçekleşmesi engellenir
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;            // parentElement elementin atasını, üst class ını bulmak için kullanıldı
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}
  // Modal oluşturma

  function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Yapımı:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}