import Tool from './Tool'

export default class Line extends Tool {
    constructor(canvas){
        super(canvas);
        this.listen();
    }

    listen(){
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e){
        this.mouseDown = false;
    }

    mouseDownHandler(e){
        this.mouseDown = true;
        let data = this.canvas.toDataURL();
        this.ctx.beginPath();
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = data;
    }

    mouseMoveHandler(e){
        if(this.mouseDown){
            this.draw(this.startX,this.startY,e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
        }
    }

    draw(x,y,cx,cy){
        const img = new Image()
        img.src = this.saved
        img.onload = async () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(x, y)
            this.ctx.lineTo(cx,cy);
            this.ctx.stroke()
        }
    }
}