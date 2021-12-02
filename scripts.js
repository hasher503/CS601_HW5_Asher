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
            document.write(data)
        })
}

getDegrees("./degrees.json");