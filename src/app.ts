import { Application, Assets, BitmapFont, BitmapText } from "pixi.js";
import { Button } from "./Button";
import { Input } from "./Input";
import { TextArea } from "./TextArea";
import { createPanel, sliceBtn } from "./utils";

const app = new Application({
    width: 800,
    height: 600,
    backgroundColor: 0x4472c4
});

document.body.appendChild(app.view as HTMLCanvasElement);

init();

async function init() {
    //load assets
    Assets.addBundle('btns', {
        bevel: 'assets/bevel.png',
        hover: 'assets/hover.png',
        inset: 'assets/inset.png',
    });

    const assets = await Assets.loadBundle('btns');

    //pass assets to be sliced
    const bevelTiles = sliceBtn(assets.bevel);
    const hoverTiles = sliceBtn(assets.hover);
    const insetTiles = sliceBtn(assets.inset);

    //create elements to display 
    //  -Text output area: 750x475 xy: 25,25
    const textOutput = new TextArea(
        createPanel(insetTiles, 750, 475, 0xffffff)
    );
    textOutput.position.set(25,25);

    app.stage.addChild(textOutput);

    //  -Text input area: 575x50 xy: 25,525
    const inputArea = new Input(
        createPanel(bevelTiles, 575, 50, 0xffffff)
    );
    inputArea.position.set(25,525);

    app.stage.addChild(inputArea);

    //  -Blue button: 150x50      | xy: 625,525  | Send | Enter key should triger the same callback
    //  -Orange -onHover: 150x50  |      
    const sendBtn = new Button(
        'Send',
        onClick,
        createPanel(bevelTiles, 150, 50, 0xffffff),
        createPanel(hoverTiles, 150, 50, 0xffffff),
        createPanel(insetTiles, 150, 50, -0xffffff)
    );
    sendBtn.position.set(625,525);

    app.stage.addChild(sendBtn);

    function onClick() {
        
    }

    //add keydown listener
    


    //integrate WebSocket
}

let elapsed = 0;
app.ticker.add(update);

function update(dt: number) {
    elapsed += dt;

}

