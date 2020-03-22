import React from "react";
import { Container } from "./styles";
export default function SearchBar({ handleChange }) {
  return (
    <Container>
      <input type="text" placeholder="Search" onChange={handleChange} />
    </Container>
  );
}
