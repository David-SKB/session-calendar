import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}

export function getTheme(property) {
  let theme = "";
  switch (property) {
    case "accentColor":
      theme = "white";
      break;
    case "backgroundColor":
      theme = "grey";
      break;
    default:
      theme = "red";
      break;
  }
    
  return theme;
}

export function getThemeClass(property) {
  let themeClass = "";
  switch (property) {
    case "border":
      themeClass = "theme-dark";
      break;
      case "accent":
        themeClass = "theme-dark-accent";
        break;  
      case "primary-color":
      themeClass = "theme-red";
      break;
    default:
      themeClass = "theme-dark";
  }
  return themeClass;
}