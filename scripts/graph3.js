const margin2 = {top: 10, right: 30, bottom: 30, left: 50},
    width3 = 700 - margin2.left - margin2.right,
    height3 = 400 - margin2.top - margin2.bottom;

const svg3 = d3.select("#graph3")
  .append("svg")
    .attr("width", width3 + margin2.left + margin2.right)
    .attr("height", height3 + margin2.top + margin2.bottom)
  .append("g")
    .attr("transform", `translate(${margin2.left}, ${margin2.top})`);

d3.csv("data/switzerland.csv").then(function(data) {

    const allGroup = new Set(data.map(d => d.Type))

    d3.select("#dropdownButton")
      .selectAll('myOptions')
     	  .data(allGroup)
      .enter()
    	  .append('option')
      .text(function (d) { return d; }) 
      .attr("value", function (d) { return d; }) 

    const myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(['#ef6001','#c0171b','#2170b3'])

    const x = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.Year; }))
      .range([ 0, width3 ]);
    svg3.append("g")
      .attr("transform", "translate(0," + height3 + ")")
      .style("font-family", "Ubuntu" )
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.Indicator; })])
      .range([ height3, 0 ]);
    svg3.append("g")
      .style("font-family", "Ubuntu" )  
      .call(d3.axisLeft(y));

    svg3.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -30)
    .attr("x", 0)
    .style("font-size", "13px")
    .style("font-family", "Ubuntu" )
    .text("Litres par personne")

    const line = svg3
      .append('g')
      .append("path")
        .datum(data.filter(function(d){return d.Type=="Bière"}))
        .attr("d", d3.line()
          .x(function(d) { return x(d.Year) })
          .y(function(d) { return y(+d.Indicator) })
        )
        .attr("stroke", function(d){ return myColor("valueA") })
        .style("stroke-width", 4)
        .style("fill", "none")

    function update(selectedGroup) {

      const dataFilter = data.filter(function(d){return d.Type==selectedGroup})

      line
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.Year) })
            .y(function(d) { return y(+d.Indicator) })
          )
          .attr("stroke", function(d){ return myColor(selectedGroup) })
    }

    d3.select("#dropdownButton").on("change", function(event,d) {
      const selectedOption = d3.select(this).property("value")
      update(selectedOption)
  })

})
