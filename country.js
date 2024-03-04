const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
});

const countryName = new URLSearchParams(location.search).get('name').trim();
const flagImage = document.querySelector('.country-details img');
const countryNameH1 = document.querySelector('.country-details h1');
const nativeName = document.querySelector('.native-name');
const region = document.querySelector('.region');
const subRegion = document.querySelector('.Sub');
const population = document.querySelector('.population');
const capital = document.querySelector('.capital');
const topLevelDomain = document.querySelector('.top');
const currencies = document.querySelector('.currencies');
const language = document.querySelector('.languages');
const borderCountries = document.querySelector('.border-countries');

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
        console.log(country);
        console.log(Object.values(country.name.nativeName)[0].common);
        flagImage.src = country.flags.svg;
        countryNameH1.innerText = country.name.common;
        population.innerText = country.population || 'Data Not Available';
        region.innerText = country.region || 'Data Not Available';
        subRegion.innerText = country.subregion || 'Data Not Available';
        capital.innerText = country.capital?.[0] || 'Data Not Available';
        topLevelDomain.innerText = country.tld || 'Data Not Available';

        if (country.name.nativeName) {
            nativeName.innerText = Object.values(country.name.nativeName)[0].common || 'Data Not Available';
        } else {
            nativeName.innerText = country.name.common || 'Data Not Available';
        }

        if (country.currencies) {
            currencies.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ');
        }

        if (country.languages) {
            language.innerText = Object.values(country.languages).join(', ');
        }

        if (country.borders) {
            country.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([borderCountry]) => {
                        const countryBorderTag = document.createElement('a');
                        countryBorderTag.innerText = borderCountry.name.common;
                        countryBorderTag.href = `country.html?name=${borderCountry.name.common}`;
                        borderCountries.appendChild(countryBorderTag);
                    });
            });
        }
    });
