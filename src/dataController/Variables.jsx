import Loading from "../Loading/Loading"
import SelectedVariables from "./SelectedVariables";
import { useState } from "react";
const Variables = ({ csv_data, loading, getSelectedVariables, deleteSelectedVariables }) => {
  const [chosenVar, setChosenVar] = useState([])
  const selectVariable = (e) => {
    let variable = e.target.getAttribute("data-name");
    setChosenVar((prev) => {
      return [...prev, variable]
    })
    getSelectedVariables(variable)
  }

  const removeVariable = (e) => {
    let variable = e.target.getAttribute("data-name");
    let ind = chosenVar.indexOf(variable);
    let arr = Array.from(new Set([...chosenVar]));
    arr.splice(ind, 1);
    setChosenVar(() => {
      return arr;
    })
    deleteSelectedVariables(variable)
  }

  let csv_variables;

  if (csv_data) {
    csv_variables = Array.from(csv_data.columns).map((item, index) => {
      return (
        <button key={index} className="btn" onClick={selectVariable} data-name={item}>{item}</button>
      )
    })
  }

  return (
    <div id="variables">
      <h5>Variables</h5>
      {loading && <div>
        <Loading />
      </div>}
      {!loading && <div>
        {csv_data && csv_variables}
      </div>}
      <h5>Selected Variables</h5>
      <SelectedVariables chosenVar={chosenVar} removeVariable={removeVariable} getSelectedVariables={getSelectedVariables} loading={loading} />
    </div>
  )
}
export default Variables;