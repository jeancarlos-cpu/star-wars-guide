import styled from "styled-components";

export const Container = styled.div`
  font-size: 1em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  /* vertical-align: middle;  */
  color: black;
  padding: 0;
  margin: 0;

  img {
    height: auto;
    width: auto;
    /* vertical-align: bottom; */
    margin-bottom: auto;
    min-height: 0;
    min-width: 0;
  }
`;

export const CloseButton = styled.div`
  float: right;
  opacity: 0.3;
  position: fixed;
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.3;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }

  &:before,
  &:after {
    position: absolute;
    left: 15px;
    content: " ";
    height: 33px;
    width: 2px;
    background-color: #333;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;
