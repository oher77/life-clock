document.getElementById('start-btn').addEventListener('click', function () {
  document.getElementById('page-1').style.display = 'none';
  document.getElementById('page-2').style.display = 'block';
});

document.getElementById('submit-btn').addEventListener('click', function () {
  const birthDate = new Date(document.getElementById('birth-date').value);
  const lifeExpectancy = parseFloat(document.getElementById('life-expectancy').value);

  if (!isNaN(birthDate) && lifeExpectancy > 0) {
    // 입력된 데이터를 바탕으로 계산 수행
    calculateAndDisplay(birthDate, lifeExpectancy);
    document.getElementById('page-2').style.display = 'none';
    document.getElementById('page-3').style.display = 'block';
  } else {
    alert("유효한 생년월일과 기대 수명을 입력하세요.");
  }
});