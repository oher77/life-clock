function calculateAndDisplay(birthDate, lifeExpectancy) {
  const currentDate = new Date();
  const ageInMilliseconds = currentDate - birthDate;
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

  const lifePercentage = ageInYears / lifeExpectancy;

  drawAgeClock(ageInYears, lifeExpectancy);
  drawLifePieChart(lifePercentage);
}