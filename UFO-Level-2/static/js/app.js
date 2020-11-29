// from data.js
var tableData = data;

var tbody = d3.select("tbody");

function buildTable(data) {
    //Clean data if there's anything inside
    tbody.html("");


    //Loop through each row and append the information to the table
    data.forEach((dataRow) => {
        var row = tbody.append("tr");
        Object.values(dataRow).forEach((value) => {
            let cell = row.append("td");
            cell.text(value);
        });
    });
}

// Build table when page loads
buildTable(tableData);

//Create an array for the filters
var filters = {};

function getFilters() {
    //Get the changed filters and store them
    var changedElement = d3.select(this).select("input");
    var elementValue = changedElement.property("value");
    var filterID = changedElement.attr("id");


    //Add filterID from entered value, otherwise delete it
    if (elementValue) {
        filters[filterID] = elementValue;
    }
    else {
        delete filters[filterID];
    }

    //Call filterTable function and apply filters
    filterTable();
}

function filterTable () {
    let filterData = tableData;

    //Loop through the filters and keep the matching data
    Object.entries(filters).forEach(([key, value]) => {
        filterData = filterData.filter (row => row[key] === value);
    });

    //Use function buildTable to organize and build the filtered information
    buildTable(filterData);
}

//Build an event to listen for changes
d3.selectAll(".filter").on("change", getFilters);