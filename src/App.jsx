import React from "react";
import { useState, useCallback, useRef, useEffect } from "react";
import * as d3 from "d3";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import "./App.css"
import Navigation from "./Navigation/Navigation"
import BarPlot from "./plotsFolder/BarPlot"
import ScatterPlot from "./plotsFolder/ScatterPlot";
import HistogramPlot from "./plotsFolder/HistogramPlot"
import Variables from "./dataController/Variables";
const App = () => {
  const values = useRef(null);
  const [csv_data, setCsv_Data] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedVariables, setSelectedVariables] = useState([]);

  const [barGraph, setBarGraph] = useState(false);
  const [scatterPlot, setScatterPlot] = useState(false);
  const [histogram, setHistogram] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    let value = values.current.value
    let data = d3.csv(value);
    data.then((arr) => {
      setCsv_Data(arr)
      setLoading(false)
      values.current.value = "";
    })
  }

  function getSelectedVariables(variables) {
    let array = [];
    setSelectedVariables((prev) => {
      return Array.from(new Set([...prev, variables]));
    })
  }

  function deleteSelectedVariables(variables) {
    let arr = [...selectedVariables]
    let ind = arr.indexOf(variables)
    arr.splice(ind, 1);
    setSelectedVariables((prev) => {
      return arr;
    })
  }

  const chooseVisualization = (e) => {
    let visualization = e.target.getAttribute("data-name");
    let selectVars = [...selectedVariables]
    switch (visualization) {
      case "bar-graph":
        clearDom()
        setHistogram(false)
        setScatterPlot(false)

        let discrete = selectVars.filter((item) => {
          return isNaN(csv_data[0][item]) === true;
        })
        let linear_1 = selectVars.filter((item) => {
          return isNaN(csv_data[0][item]) === false;
        })
        if (discrete.length < 1 || linear_1.length < 1) {
          toast("please pick one categorical variable and one quantitative variable for the bar plot")
        }
        setBarGraph(true)
        break;
      case "scatter-plot":
        clearDom()
        setBarGraph(false)
        setHistogram(false)
        let linear = selectVars.filter((item) => {
        return isNaN(csv_data[0][item]) === false;
        })
        if (linear.length < 2) {
          toast("please pick two quantitative variables for the scatter plot")
        }
        setScatterPlot(true)
        break;
      case "histogram":
        clearDom()
        setBarGraph(false)
        setScatterPlot(false)
        let linear_2 = selectVars.filter((item) => {
        return isNaN(csv_data[0][item]) === false;
        })
        if (linear_2.length < 1) {
          toast("please pick one quantitative variable for the histogram plot")
        }
        setHistogram(true)
        break;
    }
  }

  function clearPlot(value) {
    if (value.current.firstElementChild) {
      value.current.firstElementChild.remove();
    }
  }

  function clearDom() {
    let element = Array.from(document.getElementsByClassName("plot"));
    element.forEach((elem) => {
      if (elem.firstElementChild) {
        elem.firstElementChild.remove()
      }
    })
  }

  function revertStateBar() {
    setBarGraph(false)
  }

  function revertStateScatter() {
    setScatterPlot(false)
  }

  function revertStateHistogram() {
    setHistogram(false)
  }

  const formelement = (
    <div id="load-data">
      <form>
        <input type="text" name="url" ref={values} id="url_input" placeholder="Please paste in csv link" />
        <button type="submit" className="ff-small btn" onClick={handleSubmit}>Load</button>
      </form>
    </div>
  )


  return (
    <>
      <section id="container">
        {formelement}
        <Variables csv_data={csv_data} loading={loading} getSelectedVariables={getSelectedVariables} deleteSelectedVariables={deleteSelectedVariables} />
        <Navigation chooseVisualization={chooseVisualization} />
        <BarPlot barGraph={barGraph} selectVars={selectedVariables} csv_data={csv_data} revertState={revertStateBar} clearPlot={clearPlot} />
        <ScatterPlot scatterPlot={scatterPlot} selectVars={selectedVariables} csv_data={csv_data} revertState={revertStateScatter} clearPlot={clearPlot} />
        <HistogramPlot histogram={histogram} selectVars={selectedVariables} csv_data={csv_data} revertState={revertStateHistogram} clearPlot={clearPlot} />
      </section>
      <ToastContainer toastStyle={{ backgroundColor: "black" }} />
    </>
  )
}
export default App;