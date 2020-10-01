// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60};
var width = 800 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

var svg = d3.select("#barplot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// read data and plot
d3.csv("data.csv").then(function(data) 
{

  // x axis
  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.name; }))
    .padding(0.2);

  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")

  // x label
  svg.append("text")
      .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Name");

  // y axis
  var y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data, function(d) {return d.value})]);
    
  svg.append("g")
      .call(d3.axisLeft(y))

  // y label
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", - margin.left/2)
      .attr("x", - (height/2))
      .style("text-anchor", "middle")
      .text("Value"); 

  // create bars
  svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", "steelblue")

})
