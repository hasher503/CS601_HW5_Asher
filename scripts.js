/*
Author: Hope Asher
CS601
Assignment 5
*/

// the div that holds the degree table (or the error message)
const tableContainer = document.querySelector("#tableContainer");

// function to make API request for degrees and convert the response to a JSON object
async function getDegrees() {

    // the whole fetch is wrapped in a try in case any other errors are thrown besides mine
    try {

        // could also fetch from "./degrees.json" but wanted to try using external hosting with netlify
        await fetch("https://jolly-dijkstra-66642f.netlify.app/degrees.json")

            // get data and check for response status. if it's not 200, throw an error
            .then((response) => {

                // throw a new error if the response code is not ok
                if (response.status != 200) {
                    throw new Error(`invalid response code ${response.status}`);
                }
                // parse the response to JSON object
                return response.json();
            })
            .then((data) => {
                // clear out the degrees div to prevent duplicates if degrees were previously fetched
                tableContainer.innerHTML = "";

                // create the table and add it to the DOM
                let table = document.createElement("table");

                // create the table header
                table.innerHTML = "<thead><tr><th>School</th><th>Major</th><th>Type</th><th>Year</th></thead><tbody></tbody>"
                tableContainer.appendChild(table);


                // help from here https://zetcode.com/javascript/jsonforeach/ and MDN docs with the loop below

                // loop through each degree in the data object (e.g. Boston University)
                data.degrees.forEach(degree => {
                    // create a new table row for the degree
                    let newRow = table.insertRow();

                    // loop through each key-value pair in the degree object
                    Object.entries(degree).forEach(([key, value]) => {

                        // create a new table cell for the degree value (e.g. school, major, type, or year)
                        let newCell = newRow.insertCell();
                        newCell.innerHTML = value;
                    })

                })

                // for (const degree in data.degrees) {
                //     for (const [key, value] of Object.entries(degree)) {
                //         console.log(`${key} ${value}`);
                //     }
                // }

            })
    }
    // catch the error thrown above for invalid response code (or any other error)
    catch (error) {
        tableContainer.innerHTML = `Sorry, there was a problem with the request: ${error.message}.`;
    }

}


// fetch degrees info from API when degrees button is clicked
document.querySelector("#degreesbutton").addEventListener("click", getDegrees);

// clear degrees info when clear button is clicked
document.querySelector("#clearbutton").addEventListener("click", () => {
    tableContainer.innerHTML = "";
})