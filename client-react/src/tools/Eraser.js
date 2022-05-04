import Tool from './Tool'

export default class Eraser extends Tool {
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

        this.ctx.beginPath()
        this.ctx.rect(x - (this.eraserWidth / 2), y - (this.eraserWidth / 2), this.eraserWidth, this.eraserWidth)
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fill()
        this.ctx.fillStyle = "#000000";
    }
}