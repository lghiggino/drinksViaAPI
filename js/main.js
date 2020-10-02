//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
const button = document.querySelector(".input-group")

function goFetch(e){
    e.preventDefault()
    const section = document.querySelector(".results")
    section.innerHTML = ""
    let inputValue = document.querySelector("input").value
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}` 

    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {    
            console.log(data.drinks)
            const drinks = data.drinks
            drinks.forEach(drink => {
                const singleDrink = document.createElement("div")
                const name = document.createElement("h2")
                name.innerText = drink.strDrink
                const img = document.createElement("img")
                img.src = drink.strDrinkThumb
                img.alt = drink.strDrink 
                img.classList.add("img.thumbnail")
                img.classList.add(".img-fluid")
                const instructions = document.createElement("h4")
                instructions.innerText = drink.strInstructions
                instructions.classList.add("container")
                const listContainer = document.createElement("div")
                listContainer.classList.add("container-md")
                const list = document.createElement("ul")
                for (let i = 1; i <=15; i++){
                    if (drink[`strMeasure${i}`] !== null || drink[`strIngredient${i}`] !== null){
                        const li = document.createElement("li")
                        if (drink[`strMeasure${i}`] === null){
                            li.innerText = drink[`strIngredient${i}`]
                        } else{li.innerText = drink[`strMeasure${i}`] + " " + drink[`strIngredient${i}`]}
                        li.classList.add("list-group-item")
                        list.appendChild(li)
                    }
                }

                singleDrink.appendChild(name)
                singleDrink.appendChild(img)
                singleDrink.appendChild(instructions)
                listContainer.appendChild(list)
                singleDrink.appendChild(listContainer)

                section.appendChild(singleDrink)
            })
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

button.addEventListener("click", goFetch)
button.addEventListener("keyup", (e) => {
    if(e.KeyCode==13){
        goFetch
    }else return
})
