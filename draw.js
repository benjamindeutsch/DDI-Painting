import Two from "https://cdn.skypack.dev/two.js@latest";

const PI = 3.14159265359;

const two = new Two({
  type: Two.Types.canvas,
  fullscreen: true,
  autostart: true,
}).appendTo(document.body);

function makeTriangle(two, width, height, fillColor) {
  const group = two.makeGroup();

  const base = two.makeLine(0, 0, 0, height);
  const line1 = two.makeLine(0, height, width, height / 2);
  const line2 = two.makeLine(0, 0, width, height / 2);

  //fill rectangle
  if (fillColor) {
    for (let i = 0; i < height; i += 0.5) {
      const fillLine = two.makeLine(0, i, width, height / 2);
      fillLine.stroke = fillColor;
      fillLine.addTo(group);
    }
  }

  base.addTo(group);
  line1.addTo(group);
  line2.addTo(group);

  return group;
}

function draw(size) {
  const middleX = two.width / 2;
  const middleY = two.height / 2;
  const bodyWidth = size * 3;

  //legs
  two.makeRectangle(middleX - size * 2, middleY + size - 5, size * 4 / 9, size * 4 / 3);
  two.makeRectangle(middleX + size * 2, middleY + size - 5, size * 4 / 9, size * 4 / 3);

  //wings and body
  const wing2 = makeTriangle(two, bodyWidth, size * 2);
  wing2.position.set(middleX - size / 2, middleY + size / 2);
  wing2.rotation = (-PI * 2) / 3;

  const body = two.makeEllipse(middleX, middleY, bodyWidth, size);
  body.fill = "#FFFFFF";

  const wing1 = makeTriangle(two, bodyWidth, size * 2, "#FFFFFF");
  wing1.position.set(middleX, middleY - size / 2);
  wing1.rotation = -PI / 3;

  //head
  const headX = middleX + bodyWidth + size / 5;
  const headY = middleY - size;
  const beak = makeTriangle(two, size, size / 2);
  two.makeCircle(headX, headY, size);
  two.makeRectangle(headX + size / 3, headY - size / 3, size / 2, size / 2);
  beak.position.set(headX + size - 5, headY - size / 4);

  two.update();
}

function resize() {
  two.clear();
  draw(window.innerWidth / 15);
}

two.bind("resize", resize);
resize();
