import * as d3 from "d3"
import { useRef } from "react";
const BarPlot = ({ barGraph, selectVars, csv_data, revertState, clearPlot }) => {
  const divElement = useRef("");
  if (csv_data) {
    let discrete = selectVars.filter((item) => {
      return isNaN(csv_data[0][item]) === true;
    })
    let linear = selectVars.filter((item) => {
      return isNaN(csv_data[0][item]) === false;
    })
    if (discrete.length > 0 && linear.length > 0 && barGraph === true) {
      clearPlot(divElement);
      let xValue = discrete[0]
      let yValue = linear[0]

      let margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      csv_data.forEach((item) => {
        item[`${yValue}`] = +item[`${yValue}`]
      })
      let svg = d3.select("#barplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

      // X axis
      let x = d3.scaleBand()
        .range([0, width])
        .domain(csv_data.map(function(d) { return d[`${xValue}`]; }))
        .padding(0.2);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      let y = d3.scaleLinear()
        .domain([0, d3.max(csv_data, (d) => d[`${yValue}`])])
        .range([height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));

      svg.append("text")
        .attr("transform",
          "translate(" + (width / 2) + " ," +
          (height + margin.top + 20) + ")")
        .style("text-anchor", "middle").
        attr("className", "x_label")
        .text(`${xValue}`)

      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("className", "y_label")
        .style("text-anchor", "middle")
        .text(`${yValue}`);

      // Bars
      svg.selectAll(".mybar")
        .data(csv_data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d[`${xValue}`]); })
        .attr("y", function(d) { return y(d[`${yValue}`]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d[`${yValue}`]); })
        .attr("fill", "#69b3a2")
    }
  }

  revertState();

  return (
    <div className="plot" id="barplot" ref={divElement}>

    </div>
  )
}

export default BarPlot;