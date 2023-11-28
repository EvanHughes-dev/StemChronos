
const AllMonths = ["January", "Febuary", "March", "April", "May", "June", "July", "Agust", "September", "October", "November", "December"];

function Initial() {
	if (localStorage.getItem('Year')==null) {
		localStorage.setItem("Year", "Fresh")
    }
	
	SetDateAndTime();

	document.getElementById("GradeLevel").addEventListener("change", () => {
		UpdateGradeLevel();
	});

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

function TogglePeriod() {
	if (localStorage.getItem("Period1") != null) {
		for (var i = 0; i < 6;i++) {
			var tempI = i + 1;
			document.getElementById(PeriodID[i]).value = localStorage.getItem("Period" + tempI);
        }
    }
	if (PeriodNameOBJ.style.display == "initial") {
		PeriodNameOBJ.style.display = "none";
		PeriodBtnOBJ.innerHTML ="Edit Period Names"
	} else {
		PeriodNameOBJ.style.display = "initial";
		PeriodBtnOBJ.innerHTML = "Stop Editing"
    }
}

function SavePeriodNames() {
	for (var i = 0; i < 7; i++) {
	
		if (document.getElementById(PeriodID[i]).value == null || document.getElementById(PeriodID[i]).value =="") {
			alert("You must fill all periods with a name")
			return;
        }
	}
	for (var i = 1; i <= 6; i++) {
		console.log(document.getElementById(PeriodID[i]).value +" "+ i)
		localStorage.setItem("Period" + i, document.getElementById(PeriodID[i-1]).value);
		 
	}

}
Initial()