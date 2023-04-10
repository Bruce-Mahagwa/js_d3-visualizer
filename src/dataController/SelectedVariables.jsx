import { useState } from "react";
const SelectedVariables = ({ chosenVar, removeVariable, getSelectedVariables, loading }) => {
  let chosenValues = Array.from(new Set(chosenVar))
  let element = chosenValues.map((item, index) => {
      return (
        <button className="btn" key={index} onClick={removeVariable} data-name={item}>{item}</button>
      )
    })
  
  
  return (
    <div id="chosen-vars">
      {!loading && element}
    </div>
  )
}
export default SelectedVariables;