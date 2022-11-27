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

function replaceRange(s, start, end, substitute) {
  console.log("REPLACERANGE: " + s + "SUB: " + substitute);
  return s.substring(0, start) + substitute + s.substring(end);
}

export function isObjectEmpty(value) {
  // 👇️ Check if undefined or null
  if (value === undefined || value === null) {
    console.log('✅ variable is undefined or null init(): ' + value);
    return true;
  } else {
    console.log('⛔️ variable is NOT undefined or null init(): ' + value);
    return false;
  };
}