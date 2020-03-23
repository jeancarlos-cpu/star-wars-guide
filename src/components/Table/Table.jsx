import React from "react";
import { Container, Table } from "./styles";

export default function TableComponent({ data, title, transpose }) {
  if (!data.length) {
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

    const tableRows = data.map((row, i) => {
      return (
        <tr key={i}>
          {Object.values(row).map((e, i) => {
            return <td key={i}>{e}</td>;
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
