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

const lerp = (a, b, c) => {
  return (1 - c) * a + c * b;
};

const UITexture = function(width, height, data) {
  ctx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
  uiCanvas.width = width * 2;
  uiCanvas.height = height * 2;

  if (data) {
    const max = Math.max(data[0].distance, data[1].distance);

    drawBar(
      data[0].label,
      data[0].distance,
      { x: 100, y: uiCanvas.height - 100 },
      100,
      lerp(0, height, data[0].distance / max),
      "blue"
    );

    drawBar(
      data[1].label,
      data[1].distance,
      { x: 300, y: uiCanvas.height - 100 },
      100,
      lerp(0, height, data[1].distance / max),
      "yellow"
    );
  }

  const uiTexture = new Texture(uiCanvas);
  uiTexture.needsUpdate = true;

  return uiTexture;
};

export default UITexture;
