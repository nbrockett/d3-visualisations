// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60};
var width = 800 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

var svg = d3.select("#histogram")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// read data and plot
d3.csv("data2.csv").then(function(data) 
{

  const n_bins = 50;

  var x = d3.scaleLinear()
            .range([0, width])
            .domain([0, 500]);

  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  var histogram = d3.histogram()
      .value(function(d) { return d.price; })
      .domain(x.domain())
      .thresholds(x.ticks(n_bins)); 

  var bins = histogram(data);

  var y = d3.scaleLinear()
      .range([height, 0]);
      y.domain([0, d3.max(bins, function(d) { return d.length; })]);
  svg.append("g")
      .call(d3.axisLeft(y));

  svg.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) - 1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "steelblue")
})