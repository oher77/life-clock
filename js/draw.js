function drawAgeClock(currentAge, lifeExpectancy) {
    const ctx = document.getElementById('ageClock').getContext('2d');
    const hoursPassedToday = (currentAge % 1) * 24;  // 하루 기준으로 현재 시간
    
    // 시계 그리기 (생략된 기본 캔버스 드로잉 로직)
    ctx.clearRect(0, 0, 200, 200);
    ctx.beginPath();
    ctx.arc(100, 100, 80, 0, 2 * Math.PI);
    ctx.stroke();
    
    // 시침 그리기
    const angle = (hoursPassedToday / 24) * 2 * Math.PI;
    ctx.moveTo(100, 100);
    ctx.lineTo(100 + 60 * Math.cos(angle), 100 + 60 * Math.sin(angle));
    ctx.stroke();
}

function drawLifePieChart(lifePercentage) {
    const ctx = document.getElementById('lifePieChart').getContext('2d');
    ctx.clearRect(0, 0, 200, 200);
    
    // 파이 차트 그리기
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.arc(100, 100, 80, 0, 2 * Math.PI * lifePercentage);
    ctx.lineTo(100, 100);
    ctx.fillStyle = 'blue';
    ctx.fill();
}