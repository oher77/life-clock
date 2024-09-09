document.getElementById('start-btn').addEventListener('click', function () {
  document.getElementById('page-1').style.display = 'none';
  document.getElementById('page-2').style.display = 'block';
});

document.getElementById('submitBtn').addEventListener('click', function() {
  const birthdate = new Date(document.getElementById('birthdate').value);
  const lifeExpectancy = parseInt(document.getElementById('lifeExpectancy').value, 10);

  // 입력 검증
  if (!birthdate || isNaN(birthdate.getTime()) || isNaN(lifeExpectancy) || lifeExpectancy <= 0) {
    document.getElementById('error-message').style.display = 'block';
    return;
  } else {
    document.getElementById('error-message').style.display = 'none';
  }

  // 페이지 전환 및 버튼 비활성화로 피드백 제공
  document.getElementById('submitBtn').disabled = true;
  document.getElementById('page-2').style.display = 'block';
  document.getElementById('page-3').style.display = 'block';

  drawAgeClock(birthdate, lifeExpectancy);
  drawLifePieChart(birthdate, lifeExpectancy);

  // 일정 시간 후 버튼 다시 활성화
  setTimeout(() => {
    document.getElementById('submitBtn').disabled = false;
  }, 1000);
});
