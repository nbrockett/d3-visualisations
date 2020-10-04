
// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60};
var width = 800 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

var svg = d3.select("#lineplot").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// set x and y Axis
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);


// read data and plot
d3.csv("data.csv").then(function(data) {

  // format the data
  data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.value = +d.value;
  });

  var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);
      
  svg.selectAll("dot")
      .data(data)
      .enter().append("circle")
      .attr("r", 5)
      .attr("cx", function(d) { return x(d.date); })
      .attr("cy", function(d) { return y(d.value); });

  // x axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // x label
  svg.append("text")
      .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .attr("font-family", function(d,i) {return "Source Sans Pro"})
      .text("Time");

  // y label
  svg.append("g")
      .call(d3.axisLeft(y));

  // y label
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", - 3*margin.left/4)
      .attr("x", - (height/2))
      .style("text-anchor", "middle")
      .attr("font-family", function(d,i) {return "Source Sans Pro"})
      .text("Value"); 

});
