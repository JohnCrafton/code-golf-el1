// on document.DOMContentLoaded, call the function init()
document.addEventListener("DOMContentLoaded", init);

const templates = {
    truck_markup: {
        no_trucks: `<dd>There are no food trucks today.</dd>`,
        truck: `
        <dd id="trucks">
            <ul>
                <li><span>Name:</span><span>NAME</span></li>
                <li><span>Location:</span><span>LOCATION</span></li>
                <li><span>Location Description:</span><span>DESCRIPTION</span></li>
                <li><span>Hours:</span><span></span>HOURS</li>
                <li><span>Food Items:</span><span>ITEMS</span></li>
            </ul>
        </dd>`
    }
}

function init() {
    fetch("https://trucks.crafton.dev/available")
        .then(response => response.json())
        .then(data => {
            console.log(`data = ${JSON.stringify(data)}`);
            renderTrucks(data.trucks);
        }
    );

    const renderTrucks = (data) => {

        console.log(`renderTrucks: ${data.length} trucks`);

        if (data.length === 0) {
            // If there are no trucks, add the "no_trucks" markup
            document.getElementById("trucks").innerHTML = templates.truck_markup.no_trucks;
            return;
        }

        // Get the element with the ID "trucks"
        const truckList = document.getElementById("trucks");
        // Loop through the trucks
        data.forEach(truck => {
            // Add the "truck" markup to the "trucks" element
            truckList.innerHTML += templates.truck_markup.truck
                .replace("NAME", truck.name)
                .replace("LOCATION", JSON.stringify(`lat: ${truck.location.latitude}, lon: ${truck.location.longitude}`))
                .replace("DESCRIPTION", truck.location_description)
                .replace("HOURS", truck.hours)
                .replace("ITEMS", truck.items);
        });
    }
}