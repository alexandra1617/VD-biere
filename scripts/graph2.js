const data1 = [
  {group: "Tchéquie", value: 6.77},
  {group: "Autriche", value: 6.30},
  {group: "Pologne", value: 5.72},
  {group: "Allemagne", value: 5.57},
  {group: "Irlande", value: 4.92},
  {group: "Lettonie", value: 4.90},
  {group: "Croatie", value: 4.75},
  {group: "Espagne", value: 4.67},
  {group: "Lithuanie", value: 4.61},
  {group: "Slovénie", value: 4.54}
];

const data2 = [
  {group: "Moldavie", value: 1.53},
  {group: "Albanie", value: 1.75},
  {group: "Macédoine", value: 1.93},
  {group: "Italie", value: 1.99},
  {group: "Grèce", value: 2.13},
  {group: "Biélorussie", value: 2.26},
  {group: "Ukraine", value: 2.44},
  {group: "France", value: 2.52},
  {group: "Suède", value: 2.60},
  {group: "Portugal", value: 2.62}
];

const margin1 = {top: 10, right: 30, bottom: 40, left: 30},
    width2 = 700 - margin1.left - margin1.right,
    height2 = 410 - margin1.top - margin1.bottom;

const svg2 = d3.select("#graph2")
  .append("svg")
    .attr("width", width2 + margin1.left + margin1.right)
    .attr("height", height2 + margin1.top + margin1.bottom)
  .append("g")
    .attr("transform", `translate(${margin1.left},${margin1.top})`);

const x = d3.scaleBand()
  .range([ 25, width2 ])
  .padding(0.2);
const xAxis = svg2.append("g")
  .attr("transform", `translate(0,${height2})`)
  .style("font-family", "Ubuntu" )

const y = d3.scaleLinear()
  .range([ height2, 0]);
const yAxis = svg2.append("g")
  .attr("transform", "translate(25,0)") 
  .attr("class", "myYaxis")
  .style("font-family", "Ubuntu" )

svg2.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -15)
    .attr("x", 0)
    .style("font-size", "13px")
    .style("font-family", "Ubuntu" )
    .text("Litres par personne")

function update(data) {

  x.domain(data.map(d => d.group))
  xAxis.call(d3.axisBottom(x))

  y.domain([0, d3.max(data, d => d.value) ]);
  yAxis.transition().duration(1000).call(d3.axisLeft(y));

  const colorScale = d3.scaleThreshold()
  .domain([0, 1, 2, 3, 4, 5, 6, 7])
  .range(d3.schemeOranges[9]);

  var u = svg2.selectAll("rect")
    .data(data)

  u
    .join("rect") 
    .transition()
    .duration(1000)
      .attr("x", d => x(d.group))
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())      
      .attr("height", d => height2 - y(d.value))
      .attr("fill", d => colorScale(d.value))

}

update(data1)
