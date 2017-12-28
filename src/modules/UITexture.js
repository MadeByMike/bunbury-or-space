import { Texture } from "three";

const uiCanvas = document.createElement("canvas");
const ctx = uiCanvas.getContext("2d");

const drawBar = (labelBottom, labelTop, pos, width, height, color) => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(pos.x, pos.y - height, width, height);

  ctx.font = "Normal 40px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(245,245,245,0.75)";

  ctx.fillText(labelBottom, pos.x + width / 2, pos.y + 50);
  ctx.font = "Normal 30px Arial";
  ctx.fillText(
    Math.round(labelTop) + "km",
    pos.x + width / 2,
    pos.y - height - 20
  );
  ctx.restore();
};

const UITexture = function(width, height, data) {
  uiCanvas.width = width * 2;
  uiCanvas.height = height * 2;

  ctx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);

  if (data) {
    console.log("data", data);
    drawBar(
      data[0].label,
      data[0].distance,
      { x: 100, y: uiCanvas.height - 100 },
      100,
      100,
      "blue"
    );
    drawBar(
      data[1].label,
      data[1].distance,
      { x: 300, y: uiCanvas.height - 100 },
      100,
      500,
      "yellow"
    );
  }

  var uiTexture = new Texture(uiCanvas);
  uiTexture.needsUpdate = true;

  return uiTexture;
};

export default UITexture;
