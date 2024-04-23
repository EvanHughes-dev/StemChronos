const AllMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const PeriodID = [
  "FirstVal",
  "SecondVal",
  "ThirdVal",
  "FourthVal",
  "FifthVal",
  "SixthVal",
  "SeventhVal",
];
const PeriodInputID = [
  "FirstValToggle",
  "SecondValToggle",
  "ThirdValToggle",
  "FourthValToggle",
  "FifthValToggle",
  "SixthValToggle",
  "SeventhValToggle",
];

function Initial() {
  SetDefaultSelect();
  SetDateAndTime();
  SetCustomNameText();
  AddEventListeners();
}

function SetDefaultSelect() {
  if (localStorage.getItem("Year") !== null) {
    document.getElementById("GradeLevel").value = localStorage.getItem("Year");
  }

  if (localStorage.getItem("TimeMode") !== null) {
    document.getElementById("TimeMode").value =
      localStorage.getItem("TimeMode");
  }
}

function UpdateGradeLevel() {
  localStorage.setItem("Year", document.getElementById("GradeLevel").value);
}

function UpdateTimeMode() {
  localStorage.setItem("TimeMode", document.getElementById("TimeMode").value);
}

function AddEventListeners() {
  document
    .getElementById("GradeLevel")
    .addEventListener("change", UpdateGradeLevel);
  document
    .getElementById("TimeMode")
    .addEventListener("change", UpdateTimeMode);
  document
    .getElementById("PeriodReset")
    .addEventListener("click", ClearCustomNames);
  document
    .getElementById("ScheduleBTN")
    .addEventListener("click", BackToSchedule);

  PeriodID.forEach((id, index) => {
    document.getElementById(id).addEventListener("change", () => {
      SavePeriodNames(id);
    });
  });

  PeriodInputID.forEach((id, index) => {
    document.getElementById(id).addEventListener("click", () => {
      ToggleInput(id);
    });
  });
}

function SetDateAndTime() {
  const d = new Date();
  const hour = d.getHours();
  const minutes = d.getMinutes();
  const month = d.getMonth();
  const day = d.getDate();
  const year = d.getFullYear();

  document.getElementById(
    "CurrentDate"
  ).innerHTML = `${AllMonths[month]} ${day}, ${year}`;

  const TimeMode = localStorage.getItem("TimeMode");
  let AM_PM = "AM";
  if (TimeMode === null || TimeMode === "12Hour") {
    if (hour >= 12) {
      AM_PM = "PM";
    }
    if (hour >= 13) {
      hour -= 12;
    }
  }

  const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;
  document.getElementById(
    "CurrentTime"
  ).innerHTML = `${hour}:${formattedMinutes} ${AM_PM}`;
}

function SavePeriodNames(value) {
  const index = PeriodID.indexOf(value);
  if (index !== -1) {
    const InputValue = document.getElementById(value).value;
    if (!InputValue) {
      localStorage.removeItem(`Period${index + 1}`);
    } else {
      localStorage.setItem(`Period${index + 1}`, InputValue);
    }
  }
}

function ClearCustomNames() {
  for (let i = 1; i <= PeriodID.length; i++) {
    localStorage.removeItem(`Period${i}`);
  }
  SetCustomNameText();
}

function SetCustomNameText() {
  PeriodID.forEach((id, index) => {
    const value = localStorage.getItem(`Period${index + 1}`);
    document.getElementById(id).value = value ? value : "";
  });
}

function BackToSchedule() {
  if (localStorage.getItem("Year") === null) {
    alert("Ensure you select a grade level");
    return;
  }
  window.location = "../index.html";
}

function ToggleInput(sourceId) {
  const index = PeriodInputID.indexOf(sourceId);
  if (index !== -1) {
    const InputElement = document.getElementById(PeriodID[index]);
    const ToggleElement = document.getElementById(PeriodInputID[index]);

    if (
      InputElement.style.display === "none" ||
      InputElement.style.display === ""
    ) {
      InputElement.style.display = "revert";
    } else {
      InputElement.style.display = "none";
    }

    ToggleElement.classList.toggle("ToggleArrowShow");
    ToggleElement.classList.toggle("ToggleArrowHide");
  }
}

Initial();
