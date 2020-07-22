let articleHead = document.createElement('h1'); //should have just made an html
let articleHead2 = document.createElement('h2');
let articleHead3 = document.createElement('h2');
let articleContainer = document.createElement('div');
let dealContainer = document.createElement('div');
let dealContainerRow = document.createElement('div');
articleHead.setAttribute('class', 'display-1 text-center');
articleHead2.setAttribute('class', 'display-4 text-center');
articleHead3.setAttribute('class', 'display-4 text-center');
articleContainer.setAttribute('class', 'container');
dealContainer.setAttribute('class', 'container');
dealContainerRow.setAttribute('class', 'row ');

var xhRequest = new XMLHttpRequest(); // create an instance of the preinstalled module
var url = 'https://timaryavong.github.io/jsonexample/products.json';

// get the page
xhRequest.open('GET', url);

// request a response of JSON object
xhRequest.responseType = 'json';

// send the request (out into the void that is the internet)
xhRequest.send();

let body = document.querySelector('body');
body.setAttribute('class', 'text-align-center');
// when the request returns load it according to this function
xhRequest.onload = function () {
    // declare an object to hold the incoming response
    let weirdProducts = xhRequest.response;
    console.log(weirdProducts);
    header(weirdProducts); //use json response and call my functions  
    products(weirdProducts);
};

function header(jsonObj) { //creates a header
    articleHead.innerHTML = jsonObj.companyName;
    articleHead2.innerHTML = 'Head Office in ' + jsonObj.headOffice;
    articleHead3.innerHTML = 'Established in ' + jsonObj.established;

    let elements = [articleHead, articleHead2, articleHead3]; // array for iteration

    for (let i = 0; i < elements.length; i++) { //reduces the amount that i had to appendchild...
        articleContainer.appendChild(elements[i]);
    }
    document.getElementById("content").appendChild(articleContainer);
}


function products(jsonObj) { //creates product articles from json
    let topDeals = jsonObj.topDeals; // get top deals array from json
    for (let i = 0; i < topDeals.length; i++) {
        let deal = document.createElement('article'); // create elements
        deal.setAttribute('class', 'col-md border rounded text-center font-weight-light text-white bg-dark');
        let image = document.createElement('img');
        let name = document.createElement('p'); 
        let price = document.createElement('p');
        let description = document.createElement('p');
        let features = document.createElement('p');
        
        name.innerHTML = 'Name: ' + topDeals[i].name; // get product information
        price.innerHTML = 'Price: $' + topDeals[i].price;
        description.innerHTML = 'Description: ' + topDeals[i].description;
        image.setAttribute('src', 'images/' + topDeals[i].image);
        image.setAttribute('class', 'p-2');
        features.innerHTML = 'Features';
        features.setAttribute('class', 'text-white');

        let featurelist = document.createElement('ul'); // list all the features
        featurelist.setAttribute('class', 'list-group text-dark');
        for (let j = 0; j < topDeals[i].features.length; j++) { 
            let feature = document.createElement('li');
            feature.setAttribute('class', 'list-group-item');
            feature.innerHTML = topDeals[i].features[j];
            featurelist.appendChild(feature);
        }

        features.appendChild(featurelist); //append the features to the list
        
        let elements = [name, price, description, features, image]; 

        for (let k = 0; k < elements.length; k++) { //reduces the amount that i had to appendchild...
            deal.appendChild(elements[k]);
        }

        dealContainerRow.appendChild(deal);
        dealContainer.appendChild(dealContainerRow);
    }
    document.getElementById("content").appendChild(dealContainer); //place into the content on the index page
}