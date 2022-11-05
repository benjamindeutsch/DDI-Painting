import Two from "https://cdn.skypack.dev/two.js@latest";

const PI = 3.14159265359;

function makeTriangle(two, a,b,c){
    const group = two.makeGroup();
    const base =  two.makeLine(a.x, a.y, b.x, b.y)
    base.addTo(group);
    const line1 =  two.makeLine(b.x, b.y, c.x, c.y)
    line1.addTo(group);
    const line2 =  two.makeLine(a.x, a.y, c.x, c.y)
    line2.addTo(group);
    return group;
}

const elem = document.body;
const two = new Two({
  fullscreen: true,
}).appendTo(elem);

const size = 80;
const middleX = two.width/2;
const middleY = two.height/2;

const bodyWidth = size*3;


const headX = middleX + bodyWidth + size/2;
const headY = middleY - size;
const head = two.makeCircle(headX, headY, size);
const eye = two.makeRectangle(headX + size/2, headY - size/2, size/4, size/4);

const beak = makeTriangle(two, {x: 0, y: 0}, { x: 0, y: size/2}, {x: size, y: size/4});
beak.position.set(headX + size, headY-size/4);

two.makeRectangle(middleX-size*2, middleY+size, size/4, size/2);
two.makeRectangle(middleX+size*2, middleY+size, size/4, size/2);

const wing2 = makeTriangle(two, {x: 0, y: 0}, { x: 0, y: size*2}, {x: bodyWidth, y: size})
wing2.position.set(middleX, middleY+size/2)
wing2.rotation = -PI*2/3

const body = two.makeEllipse(middleX, middleY, bodyWidth, size);
body.fill = '#FFFFFF'

const wing1 = makeTriangle(two, {x: 0, y: 0}, { x: 0, y: size*2}, {x: bodyWidth, y: size})
wing1.position.set(middleX, middleY-size/2)
wing1.rotation = -PI/3

two.update();
