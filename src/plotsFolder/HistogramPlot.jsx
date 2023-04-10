import * as d3 from "d3"
import { useRef } from "react";
const HistogramPlot = ({ histogram, selectVars, csv_data, revertState, clearPlot }) => {
  let divElement = useRef("");

  if (csv_data) {
    let linear = selectVars.filter((item) => {
      return isNaN(csv_data[0][item]) === false;
    })
    if (linear.length > 0 && histogram === true) {
      clearPlot(divElement);
      let yValue = linear[0]
      csv_data.forEach((item) => {
        item[`${yValue}`] = +item[`${yValue}`]
      })

      let margin = { top: 10, right: 30, bottom: 30, left: 40 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      let svg = d3.select("#histplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

      let x = d3.scaleLinear()
        .domain([0, d3.max(csv_data, (d) => d[`${yValue}`])])
        .range([0, width]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      let histogram = d3.histogram()
        .value(function(d) { return d[`${yValue}`]; })
        .domain(x.domain())
        .thresholds(x.ticks(70));

      let bins = histogram(csv_data);

      let y = d3.scaleLinear()
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
        .attr("width", function(d) { return x(d.x1) - x(d.x0) - 1; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#69b3a2")

      svg.append("text")
        .attr("transform",
          "translate(" + (width / 2) + " ," +
          (height + margin.top + 20) + ")")
        .style("text-anchor", "middle").
        attr("className", "x_label")
        .text(`${yValue}`)

      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("className", "y_label")
        .style("text-anchor", "middle")
        .text(`frequency`);
    }
  }

  revertState();

  return (
    <div className="plot" id="histplot" ref={divElement}>

    </div>
  )
}

export default HistogramPlot;