const inquirer = require("inquirer");
const fs = require("fs").promises;

class LogoGenerator {
  constructor() {
    this.colors = [
      "red",
      "blue",
      "green",
      
    ];

    this.shapes = [
      { name: "Circle", value: "circle" },
      { name: "Square", value: "square" },
      { name: "Triangle", value: "triangle" },
    ];
  }

  async generateSVG(color, shape, text) {
    const shapeContent = this.getShapeContent(shape);
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
        <rect width="100" height="100" fill="${color}" />
        <text x="50%" y="50%" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
        ${shapeContent}
      </svg>
    `;
    return svgContent;
  }

  getShapeContent(shape) {
    switch (shape) {
      case "circle":
        return '<circle cx="50" cy="50" r="40" fill="transparent" stroke="white" stroke-width="5" />';
      case "square":
        return '<rect width="80" height="80" x="10" y="10" fill="transparent" stroke="white" stroke-width="5" />';
      case "triangle":
        return '<polygon points="50,10 90,90 10,90" fill="transparent" stroke="white" stroke-width="5" />';
      default:
        return "";
    }
  }

  async saveSVGToFile(svgContent, fileName) {
    try {
      await fs.writeFile(fileName, svgContent);
      console.log("SVG file saved successfully!");
    } catch (error) {
      console.error("Error saving SVG file:", error);
    }
  }

  async promptUser() {
    try {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "color",
          message: "Enter the color for the logo:",
          validate: (input) => this.colors.includes(input),
        },
        {
          type: "list",
          name: "shape",
          message: "Select a shape for the logo:",
          choices: this.shapes,
        },
        {
          type: "input",
          name: "text",
          message: "Enter the text for the logo:",
        },
        {
          type: "input",
          name: "fileName",
          message: "Enter the file name for the SVG:",
        },
      ]);

      const { color, shape, text, fileName } = answers;
      const svgContent = await this.generateSVG(color, shape, text);
      await this.saveSVGToFile(svgContent, fileName);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
}

const logoGenerator = new LogoGenerator();
logoGenerator.promptUser();
