import * as d3 from "d3"
import { useRef } from "react";
const ScatterPlot = ({ scatterPlot, selectVars, csv_data, revertState, clearPlot }) => {
  let divElement = useRef("")
  if (csv_data) {
    let linear = selectVars.filter((item) => {
      return isNaN(csv_data[0][item]) === false;
    })
    if (linear.length > 1 && scatterPlot === true) {
      clearPlot(divElement);
      let xValue = linear[0]
      let yValue = linear[1]

      csv_data.forEach((item) => {
        item[`${yValue}`] = +item[`${yValue}`]
        item[`${xValue}`] = +item[`${xValue}`]
      })

      let margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      let svg = d3.select("#scatterplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

      let x = d3.scaleLinear()
        .domain([0, d3.max(csv_data, (d) => {
          return d[`${xValue}`]
        })])
        .range([0, width]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      let y = d3.scaleLinear()
        .domain([0, d3.max(csv_data, (d) => {
          return d[`${yValue}`]
        })])
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
        .style("text-anchor", "middle")
        .attr("className", "y_label")
        .text(`${yValue}`);

      svg.append('g')
        .selectAll("dot")
        .data(csv_data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d[`${xValue}`]); })
        .attr("cy", function(d) { return y(d[`${yValue}`]); })
        .attr("r", 1.5)
        .style("fill", "#69b3a2")

    }
  }

  revertState();
  return (
    <div className="plot" id="scatterplot" ref={divElement}>

    </div>
  )
}

export default ScatterPlot;