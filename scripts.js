/*
Author: Hope Asher
CS601
Assignment 5
*/


// function to make API request for degrees and convert the response to a JSON object
async function getDegrees() {

    // could also fetch from "./degrees.json" but I wanted to try using external hosting with netlify
    await fetch("https://jolly-dijkstra-66642f.netlify.app/degrees.json")

        // get data and check for response status. if it's not 200, throw an error

        // convert the response object to JSON object
        .then((response) => response.json())
        .then((data) => {
            data.degrees.forEach((degree) => {
                console.log(degree);
                const newDiv = document.createElement("div");
                newDiv.innerHTML = degree.school;
                document.querySelector("#degreesinfo").appendChild(newDiv);
            })
        });
}

document.querySelector("button").addEventListener("click", getDegrees);

