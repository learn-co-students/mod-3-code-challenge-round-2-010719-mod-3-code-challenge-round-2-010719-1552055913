let allBeers = []
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("you're the best");

  let beerDetail = document.querySelector("#beer-detail")
  let beerList = document.querySelector("#list-group")

  console.log(beerDetail)



  fetchBeers()


  function fetchBeers(){
    // debugger
    fetch("http://localhost:3000/beers")
    .then(r => r.json())
    .then( function(beers){
      renderAllBeers(beers)
      return allBeers = beers
    })
  }

  function renderAllBeers(beers){
    beers.forEach(function(beer){
      renderEachBeerOnList(beer)
    })
  }

  function renderEachBeerOnList(beer){
    beerList.innerHTML += `
    <li class="list-group-item" data-id="${beer.id}">${beer.name}</li>
    `
  }

  // function renderBeerDetails
/********
event listeners
****************/

  beerList.addEventListener("click", function(e){
    console.log(e.target.dataset.id)
    let id = e.target.dataset.id
    showBeerDetails(id)
  })

  document.addEventListener("click", function(e){
    let id = e.target.dataset.id
    // debugger
    if (e.target.dataset.action === "name-edit"){
      editName(id)
    } else if (e.target.dataset.action === "desc-edit"){
      editDescription(id)
    }
  })


  ////////////////////////

  function showBeerDetails(id){
    let beerForDetail = allBeers.find(function(beer){
      return beer.id == id
    })
    renderBeerDetails(beerForDetail)
  }


  function renderBeerDetails(beerForDetail){
    beerDetail.innerHTML = ""
    beerDetail.innerHTML += `
      <textarea id="new-name-info">${beerForDetail.name}</textarea>
      <img src="${beerForDetail.image_url}">
      <h3>${beerForDetail.tagline}</h3>
      <textarea id="new-desc-info">${beerForDetail.description}</textarea>
      <button data-action="desc-edit" data-id=${beerForDetail.id} id="edit-beer-description" class="btn btn-info">
        Edit Description
      </button>
      <button data-action="name-edit" data-id=${beerForDetail.id} id="edit-beer-name" class="btn btn-info">
        Edit Name
      </button>
    `

  }

  function editName(id){
    let editBeerNameField = document.querySelector("#new-name-info")
    // let beerForEdit = allBeers.find(function(beer){
    //   return beer.id == id
    // })
    let data = {
      name: editBeerNameField.value
    }
    fetch("http://localhost:3000/beers"+`/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(r=> r.json())
    .then(function(newBeer){
      // beerForEdit = newBeerName
      allBeers = allBeers.map(function(beer){
        if (beer.id == newBeer.id){
          return newBeer
        } else {
          return beer
        }
      })
      beerList.innerHTML = ""
      renderAllBeers(allBeers)
    })
    // debugger
  }

  function editDescription(id){
    let editBeerDescriptionField = document.querySelector("#new-desc-info")
    // let beerForEdit = allBeers.find(function(beer){
    //   return beer.id == id
    // })
    let data = {
      description: editBeerDescriptionField.value
    }
    fetch("http://localhost:3000/beers"+`/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(r=> r.json())
    .then(function(newBeer){
      allBeers = allBeers.map(function(beer){
        if (beer.id == newBeer.id){
          return newBeer
        } else {
          return beer
        }
      })
      beerList.innerHTML = ""
      renderAllBeers(allBeers)

  })
}








});
