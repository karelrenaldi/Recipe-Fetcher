const baseEndPoint = "http://www.recipepuppy.com/api";
const proxy = "https://cors-anywhere.herokuapp.com/";
const form = document.querySelector("form.search");
const display = document.querySelector(".recipes");

async function fetchRecipes(query){
  const res = await fetch(`${proxy}${baseEndPoint}/?i=${query}`);
  const data = await res.json();
  return data.results;
}

async function handleSubmit(e) {
  e.preventDefault();
  const el = e.currentTarget;
  const button = el.submit;
  button.disabled = true;
  display.classList.add("loading");
  display.innerHTML = "<h1>LOADING...</h1>";
  const data = await fetchRecipes(el.query.value);
  button.disabled = false;
  displayData(data);
}

function displayData(recipes){
  display.classList.remove("loading");
  if(!recipes.length){
    display.classList.remove("found");
    display.classList.add("not-found");
    display.innerHTML = "<h1>NOT FOUND</h1>";
}else{
    display.classList.remove("not-found");
    display.classList.add("found");
    const html = recipes.map(recipe => {
      return `<div class="recipe">
        <h1>${recipe.title}</h2>
        <img src="${recipe.thumbnail}" />
        <h3>${recipe.ingredients}</h3>
        <a href="${recipe.href}">Read More</a>
      </div>`
    }).join("\n");
    display.innerHTML = html;
  }
}

form.addEventListener("submit", handleSubmit);