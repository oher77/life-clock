document.getElementById('start-btn').addEventListener('click', function () {
  document.getElementById('page-1').style.display = 'none';
  document.getElementById('page-2').style.display = 'flex';
});

document.getElementById('submitBtn').addEventListener('click', function () {
  const birthdateInput = document.getElementById('birthdate');
  const lifeExpectancyInput = document.getElementById('lifeExpectancy');
  const birthdate = new Date(birthdateInput.value);
  const lifeExpectancy = parseInt(lifeExpectancyInput.value, 10);
  const today = new Date();
  const minYear = 1800;

  // 입력 검증용 변수 초기화
  let hasError = false;

  // 에러 메시지 초기화
  document.getElementById('error-message').innerText = '';
  birthdateInput.style.border = 'none';
  lifeExpectancyInput.style.border = 'none';

  // 입력 검증
  if (!birthdate || isNaN(birthdate.getTime()) || isNaN(lifeExpectancy) || lifeExpectancy <= 0) {
    document.getElementById('error-message').innerText = '생년월일과 기대수명을 입력하세요.';
    birthdateInput.style.border = '2px solid red';
    lifeExpectancyInput.style.border = '2px solid red';
    hasError = true;
  }
  // 생년월일로 나이를 계산
  let currentAge = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    currentAge--; // 생일이 지나지 않았으면 나이를 1살 줄임
  }

  // 기대수명이 현재 나이보다 작은 경우
  if (lifeExpectancy < currentAge) {
    document.getElementById('error-message').innerText = '기대수명이 현재 나이보다 작습니다. 다시 입력해주세요.';
    lifeExpectancyInput.style.border = '2px solid red';
    hasError = true;
  }
  // 기대수명이 너무 긴  경우
  if (lifeExpectancy > 1000) {
    document.getElementById('error-message').innerText = '너무 긴 기대 수명이네요. 다시 입력해주세요.';
    lifeExpectancyInput.style.border = '2px solid red';
    hasError = true;
  }

  // 생년월일 최소년도 및 미래 날짜 검증
  if (birthdate.getFullYear() < minYear) {
    document.getElementById('error-message').innerText = '생년월일이 너무 오래되었어요. 다시 확인해주세요.';
    birthdateInput.style.border = '2px solid red';
    hasError = true;
  } else if (birthdate > today) {
    document.getElementById('error-message').innerText = '아직 태어나지 않은 분은 입력할 수 없어요.';
    birthdateInput.style.border = '2px solid red';
    hasError = true;
  }

  // 오류가 있으면 반환
  if (hasError) {
    return;
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
