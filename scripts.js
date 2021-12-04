/*
Author: Hope Asher
CS601
Assignment 5
*/

// the div that holds the degree table (or the error message)
const tableContainer = document.querySelector("#tableContainer");


// fetch degrees info from API when degrees button is clicked
const degreesButton = document.querySelector("#degreesButton");
degreesButton.addEventListener("click", () => {

    // get the degrees data from API and write it to a table
    getDegrees();

    // disable the getDegrees button to prevent repeated API calls while degree info is on screen
    degreesButton.disabled = true;

    // enable clearDegrees button
    clearButton.disabled = false;
});

// clear degrees info when clear button is clicked
const clearButton = document.querySelector("#clearButton");
clearButton.addEventListener("click", () => {
    tableContainer.innerHTML = "";

    // disable "clear degrees" button and re-enable "get degrees" button
    clearButton.disabled = true;
    degreesButton.disabled = false;
})

// makes API request for degrees and converts the response to a JSON object
async function getDegrees() {

    // the whole promise chain is wrapped in a try in case any other errors are thrown
    try {

        // can also fetch from "./degrees.json" and it works, but wanted to try accessing through external host with netlify
        // (practicing my API working both with both local host and external host)
        await fetch("https://jolly-dijkstra-66642f.netlify.app/degrees.json")

            // get data and check for response status
            .then(response => {

                // throw a new error if the response code is not 200
                if (response.status != 200) {
                    throw new Error(`invalid response code ${response.status}`);
                }
                // parse the response to JSON object
                return response.json();
            })
            .then(data => {

                // call function below to write the degrees data to the DOM as a table
                buildTable(data);
            });
    }
    // catch the error thrown above for invalid response code (or any other error)
    catch (error) {
        tableContainer.innerHTML = `Sorry, there was a problem with the request: ${error.message}.`;
    }
}

// writes the degrees to the DOM as a table
function buildTable(data) {
    {
        // clear out the table div in case table or error message are still there
        tableContainer.innerHTML = "";

        // create the table and add it to the DOM
        let table = document.createElement("table");

        // create the table header
        table.innerHTML = "<thead><tr><th>School</th><th>Major</th><th>Type</th><th>Year</th></thead><tbody></tbody>"
        tableContainer.appendChild(table);


        // help from https://zetcode.com/javascript/jsonforeach/ and MDN docs with this loop
        // loop through each degree in the data object (e.g. Boston University)
        data.degrees.forEach(degree => {
            // create a new row within the table body for the degree
            let newRow = table.querySelector("tbody").insertRow();

            // loop through each key-value pair in the degree object
            Object.entries(degree).forEach(([key, value]) => {

                // create a new table cell for the degree value (e.g. school, major, type, or year)
                let newCell = newRow.insertCell();
                newCell.innerHTML = value;
            });
        });
    }
}