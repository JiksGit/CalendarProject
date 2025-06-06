class Cell {
  constructor(container, x, y, width, height, bg, borderColor, date) {
    // 다이어리 관련 내용
    this.year;
    this.month;
    this.date = date;
    this.icon;

    // UI 관련 내용
    this.container = container;
    this.div = document.createElement("div");
    this.numDiv = document.createElement("div");
    this.restDiv = document.createElement("div");
    this.titleDiv = document.createElement("div");
    this.iconDiv = document.createElement("div");

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.bg = bg;
    this.borderColor = borderColor;

    this.div.style.position = "absolute";
    this.div.style.left = this.x + "px";
    this.div.style.top = this.y + "px";
    this.div.style.width = this.width + "px";
    this.div.style.height = this.height + "px";
    this.div.style.background = this.bg;
    this.div.style.borderTop = "1px solid " + this.borderColor;
    this.div.style.borderBottom = "1px solid " + this.borderColor;
    this.div.style.borderLeft = "none";
    this.div.style.borderRight = "none";
    this.div.style.boxSizing = "border-box";

    // 날짜 출력 div style
    this.numDiv.style.width = 100 + "%";
    this.numDiv.style.height = 30 + "px";
    this.numDiv.style.textAlign = "right";
    this.numDiv.style.padding = "0px 5px 0px 0px";
    this.numDiv.style.boxSizing = "border-box";
    // this.numDiv.style.background = "gray"; // 추후 주석으로 처리

    // restDiv와 titleDiv의 기본 스타일은 초기화 또는 최소한만 유지
    // 공휴일 제목 div style
    this.restDiv.style.textAlign = "right";
    this.restDiv.style.paddingRight = "5px";
    this.restDiv.style.fontSize = "12px";
    this.restDiv.style.width = 100 + "%";
    this.restDiv.style.height = 15 + "px";

    // // 다이어리 제목 div style0
    this.titleDiv.style.textAlign = "left";
    this.titleDiv.style.paddingLeft = "5px";
    this.titleDiv.style.width = 100 + "%";
    this.titleDiv.style.height = 46 + "px"; // title 2개 가능

    // this.restDiv.style.background = "pink";

    // this.titleDiv.style.background = "blue";

    // 아이콘 영역 div style
    this.iconDiv.style.width = 100 + "%";
    this.iconDiv.style.height = 34 + "px";
    this.iconDiv.style.textAlign = "right";
    // this.iconDiv.style.background = "yellow";

    this.div.appendChild(this.numDiv);
    this.div.appendChild(this.restDiv);
    this.div.appendChild(this.titleDiv);
    this.div.appendChild(this.iconDiv);
    this.container.appendChild(this.div);

    this.diaryCells = []; // diaryCell DOM 요소들을 저장할 배열

    // 셀을 누를 시에 등록 폼 생성
    this.div.addEventListener("click", () => {
      formPrint(this);

      setTimeout(() => {
        document.querySelector('select[name="year"]').value = this.year;
        document.querySelector('select[name="month"]').value = this.month + 1;
        document.querySelector('select[name="date"]').value = this.date;
      }, 10); // 약간의 지연 → DOM 반영 이후 실행
    });

    /* 드랍 이벤트 */
    this.div.addEventListener("dragover", (e) => {
      e.preventDefault(); // drop 허용
    });

    this.div.addEventListener("drop", (e) => {
      e.preventDefault();
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));

      // 기존 일정 제거
      const idx = diaryArray.findIndex(
        (d) =>
          d.title === data.title &&
          d.date === data.date &&
          d.month === data.month &&
          d.year === data.year
      );
      if (idx !== -1) diaryArray.splice(idx, 1);

      // 새 날짜로 이동
      const newDiary = {
        year: this.year,
        month: this.month,
        date: this.date,
        bg: data.bg,
        title: data.title,
        place: data.place,
        description: data.description,
        icon: "./images/noteImg.png",
      };
      diaryArray.push(newDiary);
      // 달력 갱신
      clearCell();
      printNum();
      diaryCellPrint();
    });
  }

  adddiaryCell(diaryCellElement) {
    this.diaryCells.push(diaryCellElement);
  }

  cleardiaryCells() {
    this.diaryCells.forEach((el) => el.remove());
    this.diaryCells = [];
  }

  setDateColor(color) {
    this.numDiv.style.color = color;
  }

  setDate(year, month, date) {
    this.year = year;
    this.month = month;
    this.date = date;

    //렌더링 처리
    this.numDiv.innerText = date;
  }

  renderIcon(src, width) {
    // 어떤 이미지를 원하는 지는 호출자가 결정
    this.icon = document.createElement("img");
    this.icon.src = src;
    this.icon.style.width = width + "px";

    this.iconDiv.appendChild(this.icon);
  }
}
