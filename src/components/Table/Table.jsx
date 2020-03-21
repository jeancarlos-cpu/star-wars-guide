import React from "react";

export default function Table({ data, title }) {
  if (data === null) {
    return (
      <div>
        <h2 className="tc">{title} </h2>
        <h1>Loading</h1>
      </div>
    );
  } else if (data.length === 0) {
    return <h1></h1>;
  } else {
    const tableHeader = (
      <tr>
        {Object.keys(data[0]).map((e, i) => {
          e = e[0].charAt(0).toUpperCase() + e.slice(1).replace(/_/g, " ");
          return <th key={i}>{e}</th>;
        })}
      </tr>
    );

    const tableRows = data.map(row => {
      return (
        <tr>
          {Object.values(row).map(e => {
            return <td>{e}</td>;
          })}
        </tr>
      );
    });

    return (
      <div className="table-div">
        <h2 className="tc">{title} </h2>
        <table className="table">
          {tableHeader}
          {tableRows}
        </table>
      </div>
    );
  }
}
