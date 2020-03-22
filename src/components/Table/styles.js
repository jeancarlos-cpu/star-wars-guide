import styled from "styled-components";

export const Container = styled.div`
  display: block;
  li {
    color: black;
    list-style-type: none;
  }

  h2 {
    color: black;
    font-family: "star1";
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  display: block;
  margin: 20px 20px;
  text-align: center;
  font-family: "roboto";

  th {
    background-color: grey;
    color: white;
  }

  td,
  th {
    text-align: left;
    border: 1px solid #ddd;
    padding: 8px;
    display: ${props => (props.transpose ? "block" : null)};
    word-break: ${props => (props.transpose ? "break-word" : null)};
  }

  tr {
    display: ${props => (props.transpose ? "inline-block" : null)};
    word-break: ${props => (props.transpose ? "break-word" : null)};
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;
