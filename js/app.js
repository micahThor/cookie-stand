'use strict';

function main() {
  // create new location manager and add default locations
  var locationMgr = new BakeryLocationManager();
  locationMgr.addLocation(new BakeryLocation('Seattle', 23, 65, 6.3));
  locationMgr.addLocation(new BakeryLocation('Tokyo', 3, 24, 1.2));
  locationMgr.addLocation(new BakeryLocation('Dubai', 11, 38, 3.7));
  locationMgr.addLocation(new BakeryLocation('Paris', 20, 38, 2.3));
  locationMgr.addLocation(new BakeryLocation('Lima', 2, 16, 4.6));

  // get form element and add event listener
  // with each submit, a new location is added to table
  var form = document.getElementById('locationForm');
  form.addEventListener('submit', function (event) {
    // get inputs from form event
    var locationName = event.target.locationName.value;
    var minCustomers = parseInt(event.target.minCustomers.value);
    var maxCustomers = parseInt(event.target.maxCustomers.value);
    var avgCustomerPurchase = parseFloat(event.target.avgSalePerCustomer.value);

    document.getElementById(locationMgr.tableElementId).innerHTML = "";
    
    event.preventDefault();
    // create new Location
    var newLocation = new BakeryLocation(locationName, minCustomers, maxCustomers, avgCustomerPurchase);
    // add location to manager
    locationMgr.addLocation(newLocation);
    // render sales data with new location
    locationMgr.renderSalesData();
    // reset form fields
    event.target.reset();
  });

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

// function returns a random number between min and max customer count multiplied times the average daily sales
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
  this.renderTableHeader(tableElement);
  // create table data for each location
  this.renderTableBody(tableElement);
  // create table footer for total cookies per hour
  this.renderTableFooter(tableElement);
}

// function creates a table header for sales data table.  Displays an hour in each cell
// acts as the header of the table
BakeryLocationManager.prototype.renderTableHeader = function (parentElement) {
  // create table row
  var tableHeadElement = this.addElement('thead', parentElement);
  var rowElement = this.addElement('tr', tableHeadElement);
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
// acts as the content of the table
BakeryLocationManager.prototype.renderTableBody = function (parentElement) {
  // loop variables
  var rowElement;
  var randomCookieAmt;
  var cookieCounterPerLocation = 0;

  // Html element variable
  var tableBodyElement = this.addElement('tbody', parentElement);

  // populate each row with cell data for each location
  for (var location = 0; location < this.locationList.length; location++ , cookieCounterPerLocation = 0) {
    // create table row for each location
    rowElement = this.addElement('tr', tableBodyElement);
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
// Acts as the footer of the table
BakeryLocationManager.prototype.renderTableFooter = function (parentElement) {
  // loop variables
  var cookieCountPerHour = 0;

  // create tfoot and row element and add to parent
  var tableFootElement = this.addElement('tfoot', parentElement);
  var rowElement = this.addElement('tr', tableFootElement);
  // create heading for total cookie
  this.addElement('th', rowElement, 'Totals');

  // traverse through the table by column.  Adds up total cookies per hour
  for (var hour = 1; hour < this.hoursOfOperation.length + 2; hour++ , cookieCountPerHour = 0) {
    for (var location = 1; location < this.locationList.length + 1; location++) {
      cookieCountPerHour += parseInt(parentElement.rows[location].cells[hour].innerHTML)
    }
    // add total value to table
    this.addElement('td', rowElement, cookieCountPerHour);
  }
}

// Start program
main();