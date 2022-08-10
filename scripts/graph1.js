const svg1 = d3.select("#graph1"),
    width1 = +svg1.attr("width"),
    height1 = +svg1.attr("height");

const path = d3.geoPath();
const projection = d3.geoMercator()
  .scale(128)
  .center([0,20])
  .translate([width1 / 2, height1 / 2]);

let data = new Map();
const colorScale = d3.scaleThreshold()
  .domain([0, 1, 2, 3, 4, 5, 6, 7])
  .range(d3.schemeOranges[9]);

const keys = [0,1,2,3,4,5,6,7]
  
const size = 10
svg1.selectAll("squares")
  .data(keys)
  .enter()
  .append("rect")
    .attr("x", function(d,i){ return 500 + i*(size*2)})
    .attr("y", 370) 
    .attr("width", size*2)
    .attr("height", size)
    .style("fill", function(d){ return colorScale(d)})

svg1.selectAll("label")
  .data(keys)
  .enter()
  .append("text")
    .attr("x", function(d,i){ return 500 + i*(size*2) + (size/2)})
    .attr("y", 380 + size*1.2)
    .style("fill", function(d){ return colorScale(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")

svg1.append("text")
  .attr("x", 500)
  .attr("y", 360)
  .style("font-size", "13px")
  .style("fill", "grey")
  .text("Litres par personne")
  .attr("text-anchor", "left")
  .attr("alignment-baseline","middle")

Promise.all([
  d3.json("data/world.geojson"),
  d3.csv("data/world.csv", function(d) {
      data.set(d.Code, +d.Indicator)
  })
  ]).then(function(loadData){
      let topo = loadData[0]

    svg1.append("g")
    .selectAll("path")
    .data(topo.features)
    .join("path")
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      .attr("fill", function (d) {
        d.total = data.get(d.id) || 0;
        return colorScale(d.total);
      })
})
