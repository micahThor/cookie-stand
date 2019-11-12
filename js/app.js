'use strict';

function randomCookies(min, max, sale) {
  return Math.ceil(Math.floor(Math.random() * (max - min + 1) + min) * sale);
}

var seattle = {
  minCustomer: 23,
  maxCustomer: 65,
  avgSale: 6.3,

  randomCookies: function () {
    return randomCookies(this.minCustomer, this.maxCustomer, this.avgSale);
  }
}

var tokyo = {
  minCustomer: 3,
  maxCustomer: 24,
  avgSale: 1.2,

  randomCookies: function () {
    return randomCookies(this.minCustomer, this.maxCustomer, this.avgSale);
  }
}

var dubai = {
  minCustomer: 11,
  maxCustomer: 38,
  avgSale: 3.7,

  randomCookies: function () {
    return randomCookies(this.minCustomer, this.maxCustomer, this.avgSale);
  }
}

var paris = {
  minCustomer: 20,
  maxCustomer: 38,
  avgSale: 2.3,

  randomCookies: function () {
    return randomCookies(this.minCustomer, this.maxCustomer, this.avgSale);
  }
}

var lima = {
  minCustomer: 2,
  maxCustomer: 16,
  avgSale: 4.6,

  randomCookies: function () {
    return randomCookies(this.minCustomer, this.maxCustomer, this.avgSale);
  }
}


// arrays section
var locationObjects = [seattle, tokyo, dubai, paris, lima];
var locationElementId = ['seattle', 'tokyo', 'dubai', 'paris', 'lima'];
var hours = ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM',
  '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM'];


// loop variables
var parentElement;
var ulElement;
var liElement;

// calculates cookie sales per hour for every location and adds to html list tags
// renders on sales.html page
// create html list elements for each location
for (var i = 0, totalCookies = 0; i < locationObjects.length; i++ , totalCookies = 0) {
  parentElement = document.getElementById(locationElementId[i]);
  ulElement = document.createElement('ul');
  parentElement.appendChild(ulElement);

  // gets cookie sales for each hour and adds cookie amount to li elements
  for (var j = 0; j < hours.length; j++) {
    // get cookie sale and add to total
    var cookieAmount = locationObjects[i].randomCookies()
    totalCookies += cookieAmount;
    // generate list item and add cookie data at specified time
    liElement = document.createElement('li');
    liElement.textContent = `${hours[j]}  : ${cookieAmount}`;
    ulElement.appendChild(liElement);
  }
  
  // generate list item and add cookie data at specified time
  liElement = document.createElement('li');
  liElement.textContent = `Total  : ${totalCookies}`;
  ulElement.appendChild(liElement);

}