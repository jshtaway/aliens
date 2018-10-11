var data = {'datetime': 1,'city': 1, 'country': 1, 'shape': 1, 'durationMinutes': 1, 'comments': 1}
console.log('data: ',data)
console.log(dataSet)
var showData = function (){
    deleteTable()
    addTableData()
    //d3.select('#table')
};

var deleteTable = function(){
    d3.selectAll('tr').remove()
}

var addTableData = function(){   
    console.log('adding table')
    var thead = d3.select('thead') 
    var columns = ['datetime','city', 'country', 'shape', 'durationMinutes', 'comments']

    // thead.append("tr")
    // .selectAll("th")
    // .data(columns)
    // .enter()
    // .append("th")
    // .text(function(column) { return column; });

    // create a row for each object in the data
    var rows = d3.select('tbody').selectAll("tr")
    .data(dataSet)
    .enter()
    .append("tr");

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
    .data(function(row) {
        return columns.map(function(c) {
            console.log(row[column])
            return {column: c, value: row[c]};
        });
    })
    .enter()
    .append("td")
    .attr("style", "font-family: Courier")
    .html(function(d) { return d.value; });
};

addTableData();