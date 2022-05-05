import Brush from './Tool'

export default class Eraser extends Brush {
    constructor(canvas) {
        super(canvas);
        this.listen();
        this.eraserWidth = 10;
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();
        let currentX = e.pageX - e.target.offsetLeft;
        let currentY = e.pageY - e.target.offsetTop;
        this.draw(currentX, currentY);
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            this.draw(currentX, currentY);
        }
    }

    draw(x, y) {
        this.ctx.strokeStyle = "white"
        this.ctx.lineWidth = this.eraserWidth
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }
}