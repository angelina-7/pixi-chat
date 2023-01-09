import { Container, DisplayObject, Text, BitmapFont, BitmapText, } from 'pixi.js';

BitmapFont.from('InputFont', {
    fontFamily: 'Arial',
    fontSize: 24,
    strokeThickness: 0,
    fill: 'black',
}, {
    chars: [['a', 'z'], ['0', '9'], ['A', 'Z'], ' \\|/.,:()!?@#$%^&*-_=+{}']
});

export class Input extends Container {
    private _label: string;
    private text = new BitmapText('Your text here...', { fontName: 'InputFont' });

    constructor(
        private element: DisplayObject
    ) {
        super();

        this.addChild(this.element);

        this.text.position.set(10,10);
        this.addChild(this.text);

        this.interactive = true;

        this.on('pointerdown', this.onDown.bind(this));
    }

    get label() {
        return this._label;
    }

    set label(value: string) {
        this._label = value;
        this.text.text = value;
        this.text.position.set(10,10)
    }


    private onDown() {
        this.label = '|'      
    }

}