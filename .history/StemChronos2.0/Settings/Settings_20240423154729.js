/*
 * @EHughes
 * Javascript control for Settings.html
 * Initial() runs on page load
 *
 * Future maintainers,
 * Please comment code well.
 * Comment what each function does and where it is called from.
 * As well as the general gist of if statements if there are variables that change values often
 * -EHughes
 */

const AllMonths = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Agust",
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
  "FiffthVal",
  "SixthVal",
  "SeventhVal",
];
const PeriodInputID = [
  "FirstValToggle",
  "SecondValToggle",
  "ThirdValToggle",
  "FourthValToggle",
  "FiffthValToggle",
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
  let hour = d.getHours();
  let minutes = d.getMinutes();

  let month = d.getMonth();
  let day = d.getDate();
  let year = d.getFullYear();

  document.getElementById("CurrentDate").innerHTML =
    AllMonths[month] + " " + day + ", " + year;

  var TimeMode = localStorage.getItem("TimeMode");
  var AM_PM = "AM";
  if (TimeMode == null || TimeMode == "12Hour") {
    if (hour >= 12) {
      AM_PM = "PM";
    }
    if (hour >= 13) {
      hour -= 12;
    }
  } else {
    AM_PM = "";
  }

  if (minutes < 10) {
    document.getElementById("CurrentTime").innerHTML =
      hour + ":0" + minutes + " " + AM_PM;
  } else {
    document.getElementById("CurrentTime").innerHTML =
      hour + ":" + minutes + " " + AM_PM;
  }
}

function SavePeriodNames(value) {
  //called from AddEventListeners()

  for (var i = 0; i < PeriodID.length; i++) {
    var LocalStorageI = i + 1; //LocalStorageI since local storage name is one greater then the i value

    if (PeriodID[i] == value) {
      var InputValue = document.getElementById(PeriodID[i]).value; //value inputed into field

      if (InputValue == "" || InputValue == null) {
        localStorage.removeItem("Period" + LocalStorageI); //remove value if field was cleared
        break; //stop running
      }
      localStorage.setItem("Period" + LocalStorageI, InputValue); //set new value
      break;
    }
  }
}

function ClearCustomNames() {
  //called from AddEventListeners() && SavePeriodNames()
  //remove all period
  for (var i = 1; i <= 7; i++) {
    window.localStorage.removeItem("Period" + i); //remove period from storage
  }
  SetCustomNameText(); //display cleared names
}

function SetCustomNameText() {
  //called from Initial() && ClearCustomNames()
  for (var i = 0; i < 7; i++) {
    var LocalStorageI = i + 1; //LocalStorageI since local storage name is one greater then the i value
    if (localStorage.getItem("Period" + LocalStorageI) != null) {
      //if there is a value
      document.getElementById(PeriodID[i]).value = localStorage.getItem(
        "Period" + LocalStorageI
      ); //display it
    } else {
      //if there isnt a value
      document.getElementById(PeriodID[i]).value = ""; //display nothing
    }
  }
}

function BackToSchedule() {
  //called from AddEventListeners()

  if (localStorage.getItem("Year") == null) {
    alert("Ensure you select a grade level");
    return;
  }
  window.location = "../index.html";
}

function ToggleInput(sourceId) {
  //Toggles input fields for period names. Called from AddEventlisteners()

  for (let i = 0; i < PeriodInputID.length; i++) {
    //loop through all option
    const element = PeriodInputID[i]; //check value of current index

    if (element == sourceId) {
      //if it matches source id

      const InputElement = document.getElementById(PeriodID[i]);
      const ToggleElement = document.getElementById(PeriodInputID[i]);

      console.log(InputElement.style.display);
      //this part deals with displaying the input field for that object
      if (
        InputElement.style.display == "none" ||
        InputElement.style.display == ""
      ) {
        //if it is not displayed or not set
        InputElement.style.display = "revert"; //display it
      } else {
        //if it is diaplyed
        InputElement.style.display = "none"; //don't display it
      }

      //this section deals with turning the arrow so it is facing the right direction
      const ClassList = ToggleElement.classList; //get all class names of the object

      ClassList.forEach((element) => {
        //for each class
        if (element == "ToggleArrowShow") {
          //check if class name 1 exists
          ToggleElement.classList.remove("ToggleArrowShow"); //turn off class name 1
          ToggleElement.classList.add("ToggleArrowHide"); //turn on class name 2
        } else if (element == "ToggleArrowHide") {
          //else if class name 2 exists
          ToggleElement.classList.remove("ToggleArrowHide"); //turn off class name 2
          ToggleElement.classList.add("ToggleArrowShow"); //turn on class name 1
        }
      });

      break;
    }
  }
}

Initial(); //starts the scripts needed on launch
