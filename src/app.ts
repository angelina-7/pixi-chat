import { Application, Assets } from "pixi.js";

const app = new Application({
    width: 800,
    height: 600,
    backgroundColor: 0x4472c4
});

document.body.appendChild(app.view as HTMLCanvasElement);

init();

async function init() {
    //load assets
    //pass assets to be sliced
    //create elements to display 
    //  -Text output area: 750x475 xy: 25,25
    //  -Text input area: 575x50 xy: 25,525
    //  -Blue button: 150x50      | xy: 625,525  | Send | Enter key should triger te same callback
    //  -Orange -onHover: 150x50  |      
    //add keydown listener
    //integrate WebSocket
}

let elapsed = 0;
app.ticker.add(update);

function update(dt: number) {
    elapsed += dt;
}

