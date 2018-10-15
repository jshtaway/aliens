var addTableData = function() {
    
    d3.json('Data/dataPart.json').then(function(data) {
        var term = d3.select('input').property('value')
        console.log(term)
        var searchData = []
        if (term){
            data.forEach(element => {
                match = false;
                Object.keys(element).forEach(function(key) {
                    var s = String
                    s = element[key]
                    try{
                        if (s.search(term)!=-1){
                            match=true;
                        }
                    } catch (err) {
                        console.log(s, err)
                    }
                })
                if(match){
                    searchData.push(element)
                }
            });
        } else {
            searchData = data
        }
        console.log(searchData)
        var table_handle = d3.select('#alientable')
        table_handle.selectAll('thead').remove()
        table_handle.selectAll('tbody').remove()

        var thead_handle = table_handle.append('thead')
        var tbody_handle = table_handle.append('tbody')

        columns = ['datetime','city', 'country', 'shape', 'durationMinutes', 'comments']

        thead_handle.append("tr")
            .selectAll("th")
            .data(columns)
            .enter()
            .append("th")
            .text(function(column) { return column; });


        // create a row for each object in the data
        var rows = tbody_handle.selectAll("tr")
            .data(searchData)
            .enter()
            .append("tr");

        // create a cell in each row for each column
        var cells = rows.selectAll("td")
            .data(function(row) {
                return columns.map(function(column) {
                    //console.log(row[column])
                    return {column: column, value: row[column]};
                });
            })
            .enter()
            .append("td")
            .attr("style", "font-family: Courier")
            .html(function(d) { return d.value; });

    });
    return false
};