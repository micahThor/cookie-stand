'use strict';

function main() {
  // create new location manager and add locations
  var locationMgr = new BakeryLocationManager();
  locationMgr.addLocation(new BakeryLocation('Seattle', 23, 65, 6.3));
  locationMgr.addLocation(new BakeryLocation('Tokyo', 3, 24, 1.2));
  locationMgr.addLocation(new BakeryLocation('Dubai', 11, 38, 3.7));
  locationMgr.addLocation(new BakeryLocation('Paris', 20, 38, 2.3));
  locationMgr.addLocation(new BakeryLocation('Lima', 2, 16, 4.6));
  // render table with data
  locationMgr.renderSalesData();
}

// BakeryLocation represents a bakery in a given city
function BakeryLocation(name, minCustomer, maxCustomer, avgSale) {
  this.name = name;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.avgSale = avgSale;
}

BakeryLocation.prototype.getRandomCookies = function () {
  return Math.ceil(Math.floor(Math.random() * (this.maxCustomer - this.minCustomer + 1) + this.minCustomer) * this.avgSale);;
}

// BakerLocationManager manages each BakeryLocation 
function BakeryLocationManager() {
  this.locationList = [];
  this.tableElementId = 'salesDataTable';
  this.hoursOfOperation = ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM',
    '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM'];
}

// function adds a BakeryLocation object instance array
BakeryLocationManager.prototype.addLocation = function (locationName) {
  this.locationList.push(locationName);
}

// function creates a new element.  Returns newly created element
BakeryLocationManager.prototype.addElement = function (tag, container, text) {
  var newElement = document.createElement(tag);
  newElement.textContent = text;
  container.appendChild(newElement);
  return newElement;
}

// function drives the rendering of sales data to html table
BakeryLocationManager.prototype.renderSalesData = function () {
  // get parent container
  var parentElement = document.getElementById(this.tableElementId);
  // create table element
  var tableElement = this.addElement('table', parentElement);
  // create table header of sales hours
  this.renderHourHeader(tableElement);
  // create table data for each location
  this.renderSalesDataForLocation(tableElement);
  // create table footer for total cookies per hour
  this.renderCookieTotalPerHour(tableElement);
}

// function creates a table header for sales data table.  Displays an hour in each cell
BakeryLocationManager.prototype.renderHourHeader = function (parentElement) {
  // create table row
  var rowElement = this.addElement('tr', parentElement);
  // create empty cell at upper right of table
  this.addElement('th', rowElement);
  // creates table header for every hour location is open
  for (var hour = 0; hour < this.hoursOfOperation.length; hour++) {
    this.addElement('th', rowElement, this.hoursOfOperation[hour]);
  }
  // add header for total cell
  this.addElement('th', rowElement, 'Daily Total Location');
}

// function creates cookie sales figures for sales data table.  Displays amount of cookies sold in an hour
BakeryLocationManager.prototype.renderSalesDataForLocation = function (parentElement) {
  // loop variables
  var rowElement;
  var randomCookieAmt;
  var cookieCounterPerLocation = 0;

  // populate each row with cell data for each location
  for (var location = 0; location < this.locationList.length; location++ , cookieCounterPerLocation = 0) {
    // create table row for each location
    rowElement = this.addElement('tr', parentElement);
    this.addElement('th', rowElement, this.locationList[location].name);

    // create table cell data for each hour for cookies sold
    for (var hour = 0; hour < this.hoursOfOperation.length; hour++) {
      randomCookieAmt = this.locationList[location].getRandomCookies();
      this.addElement('td', rowElement, randomCookieAmt);
      cookieCounterPerLocation += randomCookieAmt;
    }

    // create table cell for total amount of cookies for each location
    this.addElement('td', rowElement, cookieCounterPerLocation);
  }
}

// function creates total sales figures for each hour.  Displays total to table
BakeryLocationManager.prototype.renderCookieTotalPerHour = function (parentElement) {
  // loop variables
  var cookieCountPerHour = 0;

  // create row element and add to parent
  var rowElement = this.addElement('tr', parentElement);
  // create heading for total cookie
  this.addElement('th', rowElement, 'Totals');

  // traverse through the table by column.  Adds up total cookies per hour
  for (var i = 1; i < this.hoursOfOperation.length + 2; i++, cookieCountPerHour = 0) {
    for (var j = 1; j < this.locationList.length + 1; j++) {
      console.log(parentElement.rows[j].cells[i].innerHTML);
      cookieCountPerHour += parseInt(parentElement.rows[j].cells[i].innerHTML)
    }
    // add total value to table
    this.addElement('td', rowElement, cookieCountPerHour);
  }
}

// Start program
main();