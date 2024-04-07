import Header from "./Header";
import { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import "./Universal.css";

export default function Home() {
  const numRows = 16;
  const numCols = 24;
  const buttonSize = 45; // Adjust the size of each button

  // State to keep track of button colors
  const [buttonColors, setButtonColors] = useState(
    Array(numRows * numCols).fill("gray")
  );

  // Function to handle button click and toggle color
  const handleButtonClick = (index) => {
    const newButtonColors = [...buttonColors];
    newButtonColors[index] =
      newButtonColors[index] === "gray" ? "green" : "gray";
    setButtonColors(newButtonColors);
  };

  // Function to toggle all buttons to green or gray
  const toggleAllButtonsToColor = (color) => {
    const newButtonColors = Array(numRows * numCols).fill(color);
    setButtonColors(newButtonColors);
  };

  // Function to convert button colors to a string
  const generateGridStateString = () => {
    let gridStateString = "";
    for (let i = 0; i < numRows * numCols; i++) {
      gridStateString += buttonColors[i] === "green" ? "1" : "0";
    }
    return gridStateString;
  };

  // Function to download the grid state as a text file
  const downloadGridState = () => {
    const gridStateString = generateGridStateString();
    const element = document.createElement("a");
    const file = new Blob([gridStateString], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "grid_state.txt";
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
  };

  // Function to convert index to label (e.g., 0 -> A1, 1 -> A2, etc.)
  const indexToLabel = (index) => {
    const row = String.fromCharCode(65 + Math.floor(index / numCols));
    const col = (index % numCols) + 1;
    return `${row}${col}`;
  };

  const renderButtons = () => {
    const buttons = [];
    for (let i = 0; i < numRows; i++) {
      const rowButtons = [];
      for (let j = 0; j < numCols; j++) {
        const index = i * numCols + j;
        rowButtons.push(
          <Col key={j} style={{ padding: "2px" }}>
            <Button
              style={{
                width: `${buttonSize}px`,
                height: `${buttonSize}px`,
                backgroundColor: buttonColors[index],
              }}
              onClick={() => handleButtonClick(index)}
            >
              {indexToLabel(index)}
            </Button>
          </Col>
        );
      }
      buttons.push(<Row key={i}>{rowButtons}</Row>);
    }
    return buttons;
  };

  return (
    <>
      <Header />
      <Container fluid>{renderButtons()}</Container>
      <Button onClick={downloadGridState}>Download Bit String</Button>
      <Button onClick={() => toggleAllButtonsToColor("green")}>
        Select All
      </Button>
      <Button onClick={() => toggleAllButtonsToColor("gray")}>
        Deselect All
      </Button>
    </>
  );
}
