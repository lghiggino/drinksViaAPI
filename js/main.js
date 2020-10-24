//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
const button = document.querySelector("#button-fetch");
const columns = document.querySelector("#columns");
const results = document.querySelector("#results");
const field = document.querySelector("#form-input");
const errorField = document.querySelector("#result .is-uppercase")

function goFetch(e){
    e.preventDefault()
    let inputValue = document.querySelector("#form-input").value;
    //console.log(inputValue)
    columns.innerHTML = ""
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}` 
    results.classList.remove("is-hidden")
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {    
            console.log(data.drinks)
            data.drinks.forEach(drink => {
                function ingredientsList(){
                    let list = document.createElement("ul")
                    for (let i = 1; i <=15; i++){
                        if (drink[`strMeasure${i}`] !== null && drink[`strMeasure${i}`] !== ""  || drink[`strIngredient${i}`] !== null && drink[`strIngredient${i}`] !== ""){
                            const li = document.createElement("li")
                            if (drink[`strMeasure${i}`] === null){
                                li.innerText = drink[`strIngredient${i}`]
                            } else{li.innerText = drink[`strMeasure${i}`] + " " + drink[`strIngredient${i}`]}
                            list.appendChild(li)
                        }
                    }
                    //console.log(list.innerHTML)
                    return `${list.innerHTML}`
                }
                let html = `
                <!--start card-->
					<div class="column is-3-desktop is-4-tablet has-text-centered">
						<div class="card">
							<div class="card-image">
								<figure class="image is-1by1">
								<img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
								</figure>
							</div>
							<div class="card-content">
								<div class="custom-card">
									<div class="media">
										<div class="media-content">
											<p class="title is-size-4 is-uppercase">${drink.strDrink}</p>
										</div>
									</div>
                                    <div class="content is-size-6 custom-text">
                                        <p class="subtitle is-size-5"> Ingredients</p>
                                        ${ingredientsList()}
                                        <p class="my-6">${drink.strInstructions}</p>
                                        
									</div>
								</div>  
							</div>
						</div>
					</div>
                    <!-- end card -->`
                    
                    columns.innerHTML += html
            })
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

button.addEventListener("click", goFetch)
field.addEventListener("keyup", (e) => {
    if(e.KeyCode === 13){
        e.preventDefault()
        button.click()
    }else return
})

