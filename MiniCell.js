class MiniCell{
    constructor(container, x, y, width, height, bg, borderColor, date){
        this.container = container;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.bg = bg;
        this.borderColor = borderColor;
        this.date = date;

        this.div = document.createElement("div");
        this.div.style.left = this.x +"px";
        this.div.style.top = this.y + "px";
        this.div.style.width = this.width +"px";
        this.div.style.height = this.height  + "px";
        this.div.style.background = this.bg;
        this.div.style.border = "1px solid " + borderColor;
        this.div.style.position = "absolute";
        
        this.container.append(this.div);
    }
    setDateColor(color) {
        this.div.style.color = color;
    }

    setDate(year, month, date){
        this.year = year;
        this.month = month;
        this.date = date;

        this.div.innerText = date;
    }
}