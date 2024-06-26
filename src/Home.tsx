import Header from "./Header";
import { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import "./Universal.css";
import axios from "axios";

// [x=0, y=0] [x=0, y=1] [x=0, y=2], ..., [x=1, y=0]
// [x1, y1, x2, y2, x3, y3, ...]
// make this [0, 0, 0, 1, 0, 2, 0, 3, 1, 0]

export default function Home() {
  const [numRows, setNumRows] = useState(8);
  const [numCols, setNumCols] = useState(12);
  const buttonSize = 45; // Adjust the size of each button

  // Function to hand grid size change
  const changeGridSize = (rows, cols) => {
    setNumRows(rows);
    setNumCols(cols);
  };

  // State to keep track of button colors
  const [buttonColors, setButtonColors] = useState(
    Array(numRows * numCols).fill("gray")
  );

  // State to keep track of button presses
  const [buttonPresses, setButtonPresses] = useState([]);

  // Function to handle button click and toggle color
  const handleButtonClick = (index) => {
    const newButtonColors = [...buttonColors];
    newButtonColors[index] =
      newButtonColors[index] === "gray" ? "green" : "gray";
    setButtonColors(newButtonColors);

    // Log button press
    // const buttonLabel = indexToLabel(index);
    // setButtonPresses((prevPresses) => [...prevPresses, buttonLabel]);
  };

  // Function to toggle all buttons to green or gray
  const toggleAllButtonsToColor = (color) => {
    const newButtonColors = Array(numRows * numCols).fill(color);
    setButtonColors(newButtonColors);

    // Log button presses
    // if (color === "green") {
    //   const allButtonLabels = Array.from(
    //     { length: numRows * numCols },
    //     (_, index) => indexToLabel(index)
    //   );
    //   setButtonPresses(allButtonLabels);
    // } else {
    //   setButtonPresses([]);
    // }
  };

  // Function to convert index to coordinates
  const indexToCoordinates = (index) => {
    const row = Math.floor(index / numCols);
    const col = index % numCols;
    const x = numRows - row - 1;
    const y = col;
    return [x, y];
  };

  // Function to generate text file content
  const generateTextFileContent = () => {
    const coordinates = [];
    for (let i = buttonColors.length - 1; i >= 0; i--) {
      if (buttonColors[i] === "green") {
        const [x, y] = indexToCoordinates(i);
        coordinates.push(x, y);
      }
    }
    return JSON.stringify(coordinates);
  };

  // Function to handle download button click
  const handleDownloadButtonClick = async () => {
    const content = generateTextFileContent()
    .replace(/\[|\]/g, "") // Remove square brackets
    .replace(/,/g, ""); // Remove commas
    console.log(content);
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/send-array', { content });
      console.log(response.data); // Assuming the backend sends back some response
    }
    catch (error) {
      console.error('Error sending array:', error);
    }
    // const blob = new Blob([content], { type: "text/plain" });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = "button_coordinates.txt";
    // document.body.appendChild(a);
    // a.click();
    // URL.revokeObjectURL(url);
    // document.body.removeChild(a);
  };

  // Function to convert index to label (e.g., 0 -> A1, 1 -> A2, etc.)
  const indexToLabel = (index) => {
    const row = String.fromCharCode(65 + Math.floor(index / numCols));
    const col = (index % numCols) + 1;
    return `${row}${col}`;
  };

  // Function to generate button press log string
  // const generateButtonPressLog = () => {
  //   return buttonPresses.join(", ");
  // };

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
      <Button className="custom-button" onClick={() => changeGridSize(4, 6)}>
        24-Well
      </Button>
      <Button className="custom-button" onClick={() => changeGridSize(8, 12)}>
        96-Well
      </Button>
      <Button className="custom-button" onClick={() => changeGridSize(16, 24)}>
        384-Well
      </Button>
      <Row>
        <Col>
          <Container id="buttonGrid" className="custom-container" fluid>
            {renderButtons()}
          </Container>
        </Col>
      </Row>
      <Button className="custom-button" onClick={handleDownloadButtonClick}>
        Send Job
      </Button>
      <Button
        className="custom-button"
        onClick={() => toggleAllButtonsToColor("green")}
      >
        Select All
      </Button>
      <Button
        className="custom-button"
        onClick={() => toggleAllButtonsToColor("gray")}
      >
        Deselect All
      </Button>
    </>
  );
}
