import React from "react";
// import "./Table.css";
import { Container, Table } from "./styles";

export default function TableComponent({ data, title, transpose }) {
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
            return <td key={e}>{e}</td>;
          })}
        </tr>
      );
    });

    return (
      <Container>
        <h2 className="tc">{title} </h2>
        <Table transpose={transpose}>
          <tbody>
            {tableHeader}
            {tableRows}
          </tbody>
        </Table>
      </Container>
    );
  }
}
