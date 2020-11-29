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

function click() {
    // Get the datetime value from the filter
    var date = d3.select("#datetime").property("value");
    let filteredData = tableData;

    // Check for date input and filter accordingly
    if (date) {
        filteredData = filteredData.filter(row => row.datetime === date);
    }

    //Use function buildTable to organize and build the filtered information
    buildTable(filteredData);
}

// Create an event to check for the form button
d3.selectAll("#filter-btn").on("click", click);



