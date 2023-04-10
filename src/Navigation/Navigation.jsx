const Navigation = ({chooseVisualization}) => {
  return (
    <div id="navigation">
      <button className="btn" data-name = "bar-graph" onClick = {chooseVisualization}>Bar Graph</button>
      <button className="btn" data-name = "scatter-plot" onClick = {chooseVisualization}>Scatter Plot</button>
      <button className="btn" data-name = "histogram" onClick = {chooseVisualization}>Histogram</button>
    </div>
  )
}
export default Navigation;