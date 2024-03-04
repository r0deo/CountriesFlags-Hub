const countryContainer = document.querySelector('.div-countries')
const fitlerRegion = document.querySelector('.filter-region')
const searchInput = document.querySelector('.search-container input')
const changerMode = document.querySelector('.changer')

let allCountriesData 

fetch("https://restcountries.com/v3.1/all")
.then((res) => res.json())
.then((data) => {
    renderCountries(data)
    allCountriesData = data 
}) 


fitlerRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${fitlerRegion.value}`).then((res) => res.json())
.then(console.log())
.then(renderCountries)
})


function renderCountries(data){
    countryContainer.innerHTML = ''

    data.forEach((country) => {
        // console.log(country)
        
        const countryCard = document.createElement('a')

        countryCard.classList.add('country-card')

        countryCard.href = `/country.html?name= ${country.name.common}`;

        const cardHtml =   `
        <img src="${country.flags.svg}" alt="flag">

        <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>Population:</b>${country.population}</p>
            <p><b>Region:</b>${country.region}</p>
            <p><b>Capital:</b>${country.capital}</p> 
        </div>
        `

        countryCard.innerHTML = cardHtml;
 
        countryContainer.append(countryCard)
    })
}


searchInput.addEventListener('input', (e) => {
 const filteredCountries = allCountriesData.filter((country) => country.name.common.includes(e.target.value))
 renderCountries(filteredCountries)
})

changerMode.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});
