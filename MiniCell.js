class MiniCell {
  constructor(
    container,
    x,
    y,
    bg,
    borderColor,
    title,
    place,
    description,
    date
  ) {
    // 다이어리 관련 내용
    this.title = title;
    this.place = place;
    this.description = description;
    this.date = date;

    this.container = container;
    this.x = x;
    this.y = y;
    this.bg = bg;
    this.borderColor = borderColor;

    this.div = document.createElement("div");
    this.div.style.width = 100 + "%";
    this.div.style.height = 23 + "px";
    this.div.style.textAlign = "left";
    this.div.style.fontSize = "12px";
    this.div.style.color = "black";
    this.div.style.background = this.bg;
    this.div.style.paddingLeft = "5px";
    this.div.innerText = title;
    this.div.style.border = "1px solid " + this.borderColor;
    this.div.style.boxSizing = "border-box";
    this.div.style.position = "relative";

    this.div.addEventListener("click", (event) => {
      event.stopPropagation(); // 셀 클릭 막기
      openDialog(this);
    });

    this.container.appendChild(this.div);
  }
}
