
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

const AllMonths = ["January", "Febuary", "March", "April", "May", "June", "July", "Agust", "September", "October", "November", "December"];
const PeriodID = ["FirstVal", 'SecondVal', 'ThirdVal', 'FourthVal', 'FiffthVal', 'SixthVal', 'SeventhVal']

function Initial() {//called on script load
	
	SetDefaultSelect();//Sets deault values for the selects if there are any
	SetDateAndTime();//Sets the header date and time
	SetCustomNameText();//Checks if there are names saved and displays them
	AddEventListeners()//add all needed event listeners

}

function SetDefaultSelect() {//called from Initial()
	if (localStorage.getItem('Year') != null) {//if there is a value
		document.getElementById("GradeLevel").value = localStorage.getItem('Year');//set the grade level to it
	}

	if (localStorage.getItem('TimeMode') != null) {//if there is a value
		document.getElementById('TimeMode').value = localStorage.getItem('TimeMode');//set the time mode to it
	}
}

function UpdateGradeLevel() {//called from AddEventListeners()
	//sets new grade level
	localStorage.setItem("Year", document.getElementById("GradeLevel").value)
}

function UpdateTimeMode() {//called from AddEventListeners()
	//sets new time mode 12 vs 24 hour
	localStorage.setItem("TimeMode", document.getElementById("TimeMode").value)
}

function AddEventListeners() {//called from Initial()
	
	document.getElementById("GradeLevel").addEventListener("change", () => { UpdateGradeLevel() });//Change grade level

	document.getElementById("TimeMode").addEventListener("change", () => { UpdateTimeMode() });//Change grade level

	document.getElementById("PeriodReset").addEventListener("click", () => { ClearCustomNames() });//Clear all names BTN
	
	document.getElementById("ScheduleBTN").addEventListener("click", () => { BackToSchedule() });//Go back to schedule BTN

	for (var i = 0; i < PeriodID.length; i++) {//Add event listener for all schedule name inputs
		document.getElementById(PeriodID[i]).addEventListener("change", (source) => {

			SavePeriodNames(source.target.id);//save the period name asscociated with this objects id
		})
	}


}

function SetDateAndTime() {//called from Initial()
	//Display the date and time for the Chronos header
	const d = new Date();//Current date
	let hour = d.getHours();//Current hour in 24-hour
	let minutes = d.getMinutes();//Current Minute

	let month = d.getMonth();//current month 0-11
	let day = d.getDate();//current day
	let year = d.getFullYear();//current full year

	document.getElementById("CurrentDate").innerHTML = AllMonths[month] + " " + day + ", " + year;//set the day month, year display

	if (minutes < 10) {//If minutes is less than 10
		document.getElementById("CurrentTime").innerHTML = hour + ":0" + minutes;//add a zero before minutes to maintain format
	} else {
		document.getElementById("CurrentTime").innerHTML = hour + ":" + minutes;//just a the minutes
	}

}

function SavePeriodNames(value) {//called from AddEventListeners()
	
	for (var i = 0; i < PeriodID.length; i++) {

		var LocalStorageI = i + 1;//LocalStorageI since local storage name is one greater then the i value

		if (PeriodID[i] == value) {

			var InputValue = document.getElementById(PeriodID[i]).value;//value inputed into field

			if (InputValue == "" || InputValue == null) {

				localStorage.removeItem("Period" + LocalStorageI)//remove value if field was cleared
				break;//stop running

            }
			localStorage.setItem("Period" + LocalStorageI, InputValue);//set new value
			break;
        }
		
    }
		

}


function ClearCustomNames() {//called from AddEventListeners() && SavePeriodNames()
	//remove all period
	for (var i = 1; i <= 7; i++) {

		window.localStorage.removeItem("Period" + i)//remove period from storage

	}
	SetCustomNameText();//display cleared names
}

function SetCustomNameText() {//called from Initial() && ClearCustomNames()
	for (var i = 0; i < 7; i++) {
		var LocalStorageI = i + 1;//LocalStorageI since local storage name is one greater then the i value
		if (localStorage.getItem("Period" + LocalStorageI) != null) {//if there is a value
			document.getElementById(PeriodID[i]).value = localStorage.getItem("Period" + LocalStorageI);//display it
		} else {//if there isnt a value
			document.getElementById(PeriodID[i]).value = "";//display nothing
        }
	}
}


function BackToSchedule() {//called from AddEventListeners()

	window.location = "../index.html";

}
Initial()//starts the scripts needed on launch