import { Container, DisplayObject, Text, BitmapFont, BitmapText, } from 'pixi.js';

BitmapFont.from('InputFont', {
    fontFamily: 'Arial',
    fontSize: 24,
    strokeThickness: 0,
    fill: 'black',
}, {
    chars: [['a', 'z'], ['0', '9'], ['A', 'Z'], ' \\|/.,:()!?@#$%^&*-_=+{}']
});

const cursor = '|';

export class Input extends Container {
    private _label: string;
    private text: BitmapText;

    constructor(
        private element: DisplayObject
    ) {
        super();

        this.addChild(this.element);

        this.text = new BitmapText('', { fontName: 'InputFont' });
        this.text.position.set(10, 10);
        this.label = 'Your text here...';
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
        this.text.position.set(10, 10)
    }


    private onDown() {
        this.label = cursor;
    }

    handleKeyStroke(eventKey: string) {
        const text = this.label.charAt(0) == '|' ? '' : this.label.slice(0,-1);
        
        if (eventKey.length == 1) {
            this.label = text + eventKey + cursor;
        } else if (eventKey == 'Backspace') {
            this.label = text.slice(0, -1) + cursor;
        }
    }

}