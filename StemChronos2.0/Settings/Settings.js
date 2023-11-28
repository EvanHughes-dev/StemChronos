
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

Initial()