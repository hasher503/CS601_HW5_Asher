/*
Author: Hope Asher
CS601
Assignment 5
*/

async function getDegrees(url) {
    await fetch(url)
        // get data and check for response status. if it's not 200, throw an error
        .then((response) => response.json())
        .then((data) => {
            document.write(data.degrees[0].degree1.school)
        });
}

getDegrees("https://jolly-dijkstra-66642f.netlify.app/degrees.json");

// getDegrees("./degrees.json");