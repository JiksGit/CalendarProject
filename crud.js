function regist() {
  const year = parseInt(form1.year.value);
  const month = parseInt(form1.month.value);
  const date = parseInt(form1.date.value);

  if (!form1.title.value) {
    alert("제목을 입력하세요.");
    return;
  }

  if (!year || !month || !date) {
    alert("년, 월, 일을 모두 선택해주세요.");
    return;
  }

  const diary = {
    year: year,
    month: month - 1,
    date: date,
    bg: form1.color.value,
    title: form1.title.value,
    place: form1.place.value,
    description: form1.description.value,
    icon: "./images/noteImg.png",
  };

  diaryArray.push(diary);

  form1.reset();

  getCurrentTime(diary.year, diary.month + 1);
  prev();
  // holder 숨기고, 달력 리렌더링
  // diaryCellPrint();
}

function update(obj) {
  if (
    form1.year.value == "" ||
    form1.month.value == "" ||
    form1.date.value == ""
  ) {
    console.log(form1.year.value);
    console.log(form1.month.value);
    console.log(form1.date.value);
    alert("년, 월, 일을 모두 선택해주세요.");
    return;
  } else {
    const year = parseInt(form1.year.value);
    const month = parseInt(form1.month.value);
    const date = parseInt(form1.date.value);
    if (
      obj.year == year &&
      obj.month == month - 1 &&
      obj.date == date &&
      obj.bg == form1.color.value &&
      obj.title == form1.title.value &&
      obj.place == form1.place.value &&
      obj.description == form1.description.value
    ) {
      alert("변경사항이 없습니다");
      return;
    }

    // 기존 diary 제거
    for (let i = 0; i < diaryArray.length; i++) {
      if (
        diaryArray[i].year === obj.year &&
        diaryArray[i].month === obj.month &&
        diaryArray[i].date === obj.date &&
        diaryArray[i].title === obj.title &&
        diaryArray[i].place === obj.place &&
        diaryArray[i].description === obj.description
      ) {
        diaryArray.splice(i, 1);
        break;
      }
    }

    const updateDiary = {
      year: year,
      month: month - 1,
      date: date,
      bg: form1.color.value,
      title: form1.title.value,
      place: form1.place.value,
      description: form1.description.value,
      icon: "./images/noteImg.png",
    };
    //update시에는 diaryArray 뺐다가 추가하기
    diaryArray.push(updateDiary);

    form1.reset();
    // 변경 버튼 닫고, 저장 버튼 보여주기
    document.getElementById("update_diary").style.display = "none";
    document.getElementById("save_diary").style.display = "block";
    document.getElementById("dialog").style.zIndex = -9999;

    getCurrentTime(updateDiary.year, updateDiary.month + 1);
    prev();
    // holder 숨기고, 달력 리렌더링
    // clearCell();
    // printNum();
    // diaryCellPrint();
  }
}
