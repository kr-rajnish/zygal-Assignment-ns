const canvas = document.getElementById("canvas");
const canvasText = canvas.getContext("2d");
const downloadLink = document.getElementById("downloadLink");

canvasText.fillStyle = "#FF0000";
canvasText.font = "16px Arial";
canvasText.textAlign = "center";
canvasText.textBaseline = "middle";

const char = "A";
const x = canvas.width / 2;
const y = canvas.height / 2;

canvasText.fillText(char, x, y);

downloadLink.addEventListener("click", () => {
  const storingPixelData = [];

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const [r, g, b, a] = canvasText.getImageData(x, y, 1, 1).data;
      const hexColor = `0x${((r << 16) | (g << 8) | b)
        .toString(16)
        .padStart(6, "0")}`;
      storingPixelData.push(hexColor);
    }
  }

  const binaryData = new Blob([storingPixelData.join(", ")], {
    type: "text/plain",
  });
  downloadLink.href = URL.createObjectURL(binaryData);
});
