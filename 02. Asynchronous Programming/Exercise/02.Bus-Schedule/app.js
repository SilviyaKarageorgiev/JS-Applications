function solve() {

    let baseUrl = 'http://localhost:3030/jsonstore/bus/schedule';
    let infoDiv = document.querySelector('.info');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');

    let stopId = 'depot';
    let stopName = '';

    function depart() {
        fetch(`${baseUrl}/${stopId}`)
            .then(response => response.json())
            .then(data => {
                stopName = data.name;

                infoDiv.textContent = `Next stop ${stopName}`;
                stopId = data.next;

                departBtn.disabled = true;
                arriveBtn.disabled = false;
            })
    }

    function arrive() {
        infoDiv.textContent = `Arriving at ${stopName}`;

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
