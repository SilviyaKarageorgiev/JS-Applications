// function attachEvents() {

//     let baseUrl = 'http://localhost:3030/jsonstore/forecaster';
//     let submitButton = document.getElementById('submit');
//     let inputElement = document.getElementById('location');

//     let divForecast = document.getElementById('forecast');
//     let currentDiv = document.getElementById('current');
//     let upcomingDiv = document.getElementById('upcoming');

//     let todaysDiv = document.createElement('div');
//     todaysDiv.className = 'forecasts';

//     let threeDaysDiv = document.createElement('div');
//     threeDaysDiv.className = 'forecast-info';

//     let symbols = {
//         'Sunny': '☀',
//         'Partly sunny': '⛅',
//         'Overcast': '☁',
//         'Rain': '☂',
//         'Degrees': '°'
//     }

//     submitButton.addEventListener('click', () => {

        
//         todaysDiv.innerHTML = '';
//         threeDaysDiv.innerHTML = '';

//         let conditionSymbolSpan = document.createElement('span');
//         conditionSymbolSpan.className = 'condition symbol';
//         let conditionSpan = document.createElement('span');
//         conditionSpan.className = 'condition';

//         let locationName = inputElement.value;
//         let locationCode = '';
//         inputElement.value = '';

//         divForecast.style.display = 'block';

//         fetch(`${baseUrl}/locations`)
//             .then(res => res.json())
//             .then(data => {
//                 locationCode = data.find(x => x.name === locationName).code;

//             })
//             .catch(err => {
//                 todaysDiv.innerHTML = '';
//                 threeDaysDiv.innerHTML = '';

//                 divForecast.style.display = 'block';

//                 let errorSpan = document.createElement('span');
//                 errorSpan.textContent = 'Error';
//                 divForecast.appendChild(errorSpan);
//             });

//         fetch(`${baseUrl}/today/${locationCode}`)
//             .then(res => res.json())
//             .then(data => {

//                 let name = data[locationCode].name;
//                 let low = data[locationCode].forecast.low;
//                 let high = data[locationCode].forecast.high;
//                 let condition = data[locationCode].forecast.condition;


//                 let spanSymbol = document.createElement('span');
//                 spanSymbol.className = 'condition symbol';
//                 spanSymbol.textContent = symbols[condition];

//                 let spanCondition = document.createElement('span');
//                 spanCondition.className = 'condition';

//                 let spanData1 = document.createElement('span');
//                 spanData1.className = 'forecast-data';
//                 spanData1.textContent = name;
//                 spanCondition.appendChild(spanData1);

//                 let spanData2 = document.createElement('span');
//                 spanData2.className = 'forecast-data';
//                 spanData2.textContent = `${low}${symbols['Degrees']}/${high}${symbols['Degrees']}`;
//                 spanCondition.appendChild(spanData2);

//                 let spanData3 = document.createElement('span');
//                 spanData3.className = 'forecast-data';
//                 spanData3.textContent = condition;
//                 spanCondition.appendChild(spanData3);

//                 todaysDiv.appendChild(spanSymbol);
//                 todaysDiv.appendChild(spanCondition);
//                 currentDiv.appendChild(todaysDiv);

//             })

//         fetch(`${baseUrl}/upcoming/${locationCode}`)
//             .then(res => res.json())
//             .then(data => {

//                 let condition = '';
//                 let high = '';
//                 let low = '';

//                 let arr = data[locationCode].forecast;
//                 arr.forEach(x => {
//                     condition = x.condition;
//                     high = x.high;
//                     low = x.low;

//                     let spanUpcoming = document.createElement('span');
//                     spanUpcoming.className = 'upcoming';

//                     let spanData1Symbol = document.createElement('span');
//                     spanData1Symbol.className = 'symbol';
//                     spanData1Symbol.textContent = symbols[condition];
//                     spanUpcoming.appendChild(spanData1Symbol);

//                     let spanData2 = document.createElement('span');
//                     spanData2.className = 'forecast-data';
//                     spanData2.textContent = `${low}${symbols['Degrees']}/${high}${symbols['Degrees']}`;
//                     spanUpcoming.appendChild(spanData2);

//                     let spanData3 = document.createElement('span');
//                     spanData3.className = 'forecast-data';
//                     spanData3.textContent = condition;
//                     spanUpcoming.appendChild(spanData3);

//                     threeDaysDiv.appendChild(spanUpcoming);
//                     upcomingDiv.appendChild(threeDaysDiv);

//                 });

//             })

//     });
// }

// attachEvents();

function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/forecaster';
    const forecastDiv = document.querySelector('#forecast');
    const currentDiv = document.querySelector('#current');
    const upcomingDiv = document.querySelector('#upcoming');
    let todaysDiv = createTag('div', null, 'forecasts');
    let threeDayForecast = createTag('div', null, 'forecast-info');

    const symbols = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°'

    }
    const submitButton = document.querySelector('#submit');
    submitButton.addEventListener('click', onClick);

    async function onClick() {
        todaysDiv.innerHTML = '';
        threeDayForecast.innerHTML = '';
        let location = document.querySelector('#location').value;

        try {

            let result = await fetch(`${baseUrl}/locations`);
            let data = await result.json();

            let searched = data.find(l => l.name == location);

            let todayForecast = await fetch(`${baseUrl}/today/${searched.code}`);
            let todaysData = await todayForecast.json();

            let upcoming = await fetch(`${baseUrl}/upcoming/${searched.code}`);
            let upcomingData = await upcoming.json();

            displayTodaysData(todaysData);
            displayUpcomingData(upcomingData);


        } catch (error) {
            todaysDiv.innerHTML = '';
            threeDayForecast.innerHTML = '';
            forecastDiv.style.display = 'block';
            let errorSpan = document.createElement('span');
            errorSpan.textContent = 'Error';
            forecastDiv.appendChild(errorSpan);
        }

    }
    function displayTodaysData(object) {
        forecastDiv.style.display = 'block';

        todaysDiv.appendChild(createTag('span', symbols[object.forecast.condition], 'condition symbol'));

        let dataSpan = createTag('span', null, 'condition');
        dataSpan.appendChild(createTag('span', object.name, 'forecast-data'));
        dataSpan.appendChild(createTag('span', `${object.forecast.low}°/${object.forecast.high}°`, 'forecast-data'));
        dataSpan.appendChild(createTag('span', `${object.forecast.condition}`, 'forecast-data'));

        todaysDiv.appendChild(dataSpan);
        currentDiv.appendChild(todaysDiv);

    }

    function displayUpcomingData(object) {

        for (const day of object.forecast) {
            let spanElement = createTag('span', null, 'upcoming');
            spanElement.appendChild(createTag('span', symbols[day.condition], 'symbol'));
            spanElement.appendChild(createTag('span', `${day.low}°/${day.high}°`, 'forecast-data'));
            spanElement.appendChild(createTag('span', `${day.condition}`, 'forecast-data'));

            threeDayForecast.appendChild(spanElement);
        }

        upcomingDiv.appendChild(threeDayForecast);
    }
    function createTag(tag, text = null, className = null) {
        let el = document.createElement(tag);
        if (text) { el.textContent = text; }
        if (className) { el.className = className; }
        return el;
    }
}

attachEvents();