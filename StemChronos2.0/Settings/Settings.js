
const AllMonths = ["January", "Febuary", "March", "April", "May", "June", "July", "Agust", "September", "October", "November", "December"];

document.getElementById('ScheduleBTN').addEventListener('click', () => { BackToSchedule()})
document.getElementById('PeriodReset').addEventListener('click', () => { ClearCustomNames() })
function Initial() {
	if (localStorage.getItem('Year')!=null) {
		document.getElementById("GradeLevel").value = localStorage.getItem('Year');
    }
	
	SetDateAndTime();

	document.getElementById("GradeLevel").addEventListener("change", () => {
		UpdateGradeLevel();
	});

	
	
	SetCustomNameText();
	

}


function UpdateGradeLevel() {
	localStorage.setItem("Year", document.getElementById("GradeLevel").value)
}

function SetDateAndTime() {
	//Display the date and time for the Chronos header
	const d = new Date();
	let hour = d.getHours();
	let minutes = d.getMinutes();

	let month = d.getMonth();
	let day = d.getDate();
	let year = d.getFullYear();

	document.getElementById("CurrentDate").innerHTML = AllMonths[month] + " " + day + ", " + year

	if (minutes < 10) {
		document.getElementById("CurrentTime").innerHTML = hour + ":0" + minutes
	} else {
		document.getElementById("CurrentTime").innerHTML = hour + ":" + minutes
	}

}
const PeriodNameOBJ = document.getElementById("PeriodName");
const PeriodBtnOBJ = document.getElementById("PeriodToggle");

const PeriodID = ["FirstVal", 'SecondVal', 'ThirdVal', 'FourthVal', 'FiffthVal', 'SixthVal', 'SeventhVal']

for (var i = 0; i < PeriodID.length; i++) {
	document.getElementById(PeriodID[i]).addEventListener("change", (source) => {
		
		SavePeriodNames(source.target.id);
	})
}

/*
function TogglePeriod() {
	
	if (PeriodNameOBJ.style.display == "initial") {
		PeriodNameOBJ.style.display = "none";
		PeriodBtnOBJ.innerHTML ="Edit Period Names"
	} else {
		PeriodNameOBJ.style.display = "initial";
		PeriodBtnOBJ.innerHTML = "Stop Editing"
    }
}
*/

function SavePeriodNames(value) {
	
	

	for (var i = 0; i < PeriodID.length;i++) {
		var tempI = i + 1;
		if (PeriodID[i] == value) {
			if (document.getElementById(PeriodID[i]).value == "" || document.getElementById(PeriodID[i]).value==null) {
				localStorage.removeItem("Period" + tempI)
				return;
            }
			localStorage.setItem("Period" + tempI, document.getElementById(PeriodID[i]).value);
			break;
        }
		
    }
		

}


function ClearCustomNames() {
	for (var i = 1; i <= 7; i++) {

		
		window.localStorage.removeItem("Period" + i)

	}
	SetCustomNameText();
}

function SetCustomNameText() {
	for (var i = 0; i < 7; i++) {
		var tempI = i + 1;
		if (localStorage.getItem("Period" + tempI) != null) {
		

			document.getElementById(PeriodID[i]).value = localStorage.getItem("Period" + tempI);
		}
	}
}

var ErrorBox = document.getElementById("ErrorBox");
function BackToSchedule() {
	

		window.location = "../index.html";
    

}
Initial()