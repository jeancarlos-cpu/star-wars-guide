import styled from "styled-components";

export const Container = styled.div`
  display: inline-block;
  border-radius: 5px;
  margin: 0 0 25px 25px;
  line-height: 40px;
  input {
    border: 10px;
    background: rgba(0, 0, 0, 0.4);
    height: 60px;
    padding: 0 20px;
    font-size: 18px;
    font-family: star1;
    color: #ffffff;
    &::placeholder {
      color: rgba(255, 255, 255, 0.9);
    }
  }
`;
