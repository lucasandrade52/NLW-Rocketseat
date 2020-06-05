
function populateUFs () {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

populateUFs ()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

    })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

    //itens de coleta
    //pegar todos os li´s

const itemstoCollect = document.querySelectorAll(".items-grid li")

for (const item of itemstoCollect) {
    item.addEventListener("click", handleSelecteditem)
}

const collectedItems = document.querySelector("input[name=items")

let selectedItems = []

function handleSelecteditem(event) {
    const itemLi = event.target
    
    //add or remove uma classe com JS
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verificar se existem items selecionados, se sim
    //pegar os items selecionados

    const alreadySelected = selectedItems.findIndex( function(item) {
        const itemFound = item == itemId //será true or false
        return itemFound
    })

    //se já estiver
    if( alreadySelected >= 0) {
    //tirar da seleção 
    const filteredItems = selectedItems.filter( item => {
        const itemIsDifferent = item != itemId //false
        return itemIsDifferent
        })

        selectedItems = filteredItems
    }    //se não estiver, adicionar a seleção
    else {

        selectedItems.push(itemId)
    
    }

    //atualizar o campo escondido com os dados selecionados (variavel na linha 58.)
    collectedItems.value = selectedItems
}