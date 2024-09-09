function drawAgeClock(birthdate, lifeExpectancy) {
  const canvas = document.getElementById('ageClock');
  const overlayAm = document.getElementById('overlay-am');
  const overlayPm = document.getElementById('overlay-pm');
  const ctx = canvas.getContext('2d');
  const clockRadius = canvas.width / 2;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // 현재 시간 가져오기
  const now = new Date();
  const ageInMilliseconds = now - birthdate;
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

  // 나이 비율 계산 (하루의 시간으로 변환)
  const ageRatio = ageInYears / lifeExpectancy;
  const totalHours = ageRatio * 24;  // 기대 수명에 따른 하루 시간으로 변환
  const hours = Math.floor(totalHours);
  const totalMinutes = (totalHours % 1) * 60;
  const minutes = Math.floor(totalMinutes);
  const seconds = Math.floor((totalMinutes % 1) * 60);

  // AM/PM 상태에 따른 배경색 설정 (transition 포함)
  const isAM = hours < 12;
  if (isAM) {
    overlayAm.classList.add('opacity-1');
    overlayPm.classList.remove('opacity-1');
  } else {
    overlayPm.classList.add('opacity-1');
    overlayAm.classList.remove('opacity-1');
  }

  // 시계 초기화
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 시계 테두리 그리기
  ctx.beginPath();
  ctx.arc(centerX, centerY, clockRadius, 0, 2 * Math.PI);
  ctx.stroke();

  // 시계 숫자 표시
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let num = 1; num <= 12; num++) {
    const angle = (num * Math.PI) / 6;
    const x = centerX + (clockRadius - 20) * Math.cos(angle - Math.PI / 2);
    const y = centerY + (clockRadius - 20) * Math.sin(angle - Math.PI / 2);
    ctx.fillText(num.toString(), x, y);
  }

  // 시침, 분침, 초침 각도 계산
  const hourAngle = ((hours % 12) + minutes / 60) * (Math.PI / 6);  // 시침 각도
  const minuteAngle = (minutes + seconds / 60) * (Math.PI / 30);    // 분침 각도
  const secondAngle = seconds * (Math.PI / 30);                     // 초침 각도

  // 시침, 분침, 초침 그리기
  drawHand(ctx, centerX, centerY, hourAngle, clockRadius * 0.5, 6);  // 시침
  drawHand(ctx, centerX, centerY, minuteAngle, clockRadius * 0.75, 4);  // 분침
  drawHand(ctx, centerX, centerY, secondAngle, clockRadius * 0.9, 2, 'red');  // 초침
}

// 시침, 분침, 초침 그리기 함수
function drawHand(ctx, centerX, centerY, angle, length, width, color = 'black') {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + length * Math.cos(angle - Math.PI / 2), centerY + length * Math.sin(angle - Math.PI / 2));
  ctx.stroke();
}


function drawLifePieChart(birthdate, lifeExpectancy) {
  const now = new Date();
  const ageInMilliseconds = now - birthdate;
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
  const remainingYears = lifeExpectancy - ageInYears;
  const remainingRatio = remainingYears / lifeExpectancy;
  const passedRatio = 1 - remainingRatio;

  const pieChartCanvas = document.getElementById('lifePieChart');
  const pieCtx = pieChartCanvas.getContext('2d');

  pieCtx.clearRect(0, 0, pieChartCanvas.width, pieChartCanvas.height);

  // 지나간 수명 그리기
  pieCtx.beginPath();
  pieCtx.moveTo(100, 100);
  pieCtx.arc(100, 100, 100, -0.5 * Math.PI, (2 * Math.PI * passedRatio) - (0.5 * Math.PI), false);
  pieCtx.fillStyle = 'gray';
  pieCtx.fill();

  // 남은 수명 그리기
  pieCtx.beginPath();
  pieCtx.moveTo(100, 100);
  pieCtx.arc(100, 100, 100, (2 * Math.PI * passedRatio) - (0.5 * Math.PI), 1.5 * Math.PI, false);
  pieCtx.fillStyle = 'red';
  pieCtx.fill();

  // 남은 수명을 24시간으로 환산하여 표시
  //const remainingHours = remainingRatio * 24;
  //document.getElementById('remainingLifeText').innerText = `남은 수명: ${(remainingHours).toFixed(2)}시간 남았습니다.`;


  // 남은 수명을 24시간 기준으로 시, 분, 초로 환산하여 표시
  const remainingTotalSeconds = remainingRatio * 24 * 60 * 60; // 24시간을 초로 변환
  const remainingHours = Math.floor(remainingTotalSeconds / 3600); // 시간을 계산
  const remainingMinutes = Math.floor((remainingTotalSeconds % 3600) / 60); // 분을 계산
  const remainingSeconds = Math.floor(remainingTotalSeconds % 60); // 초를 계산

  // 남은 수명을 시, 분, 초 형식으로 표시
  document.getElementById('remainingLifeText').innerText =
    `남은 수명: ${remainingHours}시간 ${remainingMinutes}분 ${remainingSeconds}초 남았습니다.`;
}
