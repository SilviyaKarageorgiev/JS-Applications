// function getInfo() {

//     let baseUrl = 'http://localhost:3030/jsonstore/bus/businfo';
//     let inputElement = document.getElementById('stopId');
//     let ulElement = document.getElementById('buses');
//     let divElement = document.getElementById('stopName');

//     fetch(`${baseUrl}/${inputElement.value}`)
//         .then(response => response.json())
//         .then(data => {
//             let buses = data.buses;
//             let name = data.name;

//             divElement.textContent = name;
//             ulElement.innerHTML = '';
//             Object.keys(buses).forEach(bus => {
//                 let liElement = document.createElement('li');
//                 liElement.textContent = `Bus ${bus} arrives in ${buses[bus]} minutes`
//                 ulElement.appendChild(liElement);
//             })
//         })
//         .catch(error => {
//             divElement.textContent = 'Error';
//             ulElement.innerHTML = '';
//         })
// }

async function getInfo(){

    let stopNameElement = document.getElementById('stopName');
    let timetableElement = document.getElementById('buses');

    let stopId = document.getElementById('stopId').value;

    let url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    try{
        timetableElement.innerHTML = '';
        let res = await fetch(url);
        if(res.status != 200){
            throw new Error('Stop ID not found!');
        }

        let data = await res.json();

        stopNameElement.textContent = data.name;

        Object.entries(data.buses).forEach(b => {
            let liElement = document.createElement('li');
            liElement.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;

            timetableElement.appendChild(liElement);
        });

    } catch (error) {
        stopNameElement.textContent = 'Error';
    }

}