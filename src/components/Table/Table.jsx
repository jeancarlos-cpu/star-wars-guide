import React from "react";
import "./Table.css";

export default function Table({ data, title }) {
  // console.log(data);
  if (data === null) {
    return (
      <div>
        <h2 className="tc">{title} </h2>
        <h1>Loading</h1>
      </div>
    );
  } else if (!data || data[0] === undefined) {
    return <div />;
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
        <tr key={row}>
          {Object.values(row).map(e => {
            console.log(e);

            return <td key={e}>{e}</td>;
          })}
        </tr>
      );
    });

    return (
      <div className="table-div">
        <h2 className="tc">{title} </h2>
        <table className="table">
          <tbody>
            {tableHeader}
            {tableRows}
          </tbody>
        </table>
      </div>
    );
  }
}
