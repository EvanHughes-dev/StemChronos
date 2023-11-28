

// Import the functions you need from the SDKs you need



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const d = new Date();
const DayOfWeek = d.getDay();

const DailyMessageOBJ = document.getElementById('DailyMessageText');
const DailyMessageHEADER = document.getElementById('DailyMessageHeader');

const DaysOfWeekAbrv = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat']
const DaysOfWeekFull = ['Sunday', 'Monday', 'Tuesday',  'Wednesday', 'Thursday', 'Friday', 'Saturday']
const AllMonths = ["January", "Febuary", "March", "April", "May", "June", "July", "Agust", "September", "October", "November", "December"];

const LetterDayOBJ = document.getElementById('LetterDayParent');
const WeekendImageOBJ = document.getElementById('WeekendImage');
const Remianing = document.getElementById("TimeRemaining");

const firebaseConfig = {
	apiKey: "AIzaSyBL9jpJTz-eCYJM0r1etRbx_6YpPqa67_4",
	authDomain: "chronos-96d4f.firebaseapp.com",
	databaseURL: "https://chronos-96d4f.firebaseio.com",
	projectId: "chronos-96d4f",
	storageBucket: "chronos-96d4f.appspot.com",
	messagingSenderId: "866705537581",
	appId: "1:866705537581:web:5ba4523272685649c116a4",
	measurementId: "G-RK77WZHGE9"
};

function GetData() {
	
	SetDateAndTime();
	if (DayOfWeek == 0 || DayOfWeek == 6) {
		DailyMessageHEADER.innerHTML = "Enjoy your " + DaysOfWeekFull[DayOfWeek];
		LetterDayOBJ.style.display = 'none';
		WeekendImageOBJ.style.display = 'revert';
		
    }


	// Initialize Firebase
	const app = firebase.initializeApp(firebaseConfig);
	const db = firebase.firestore(app);
	const settings = {timestampsInSnapshots: true };
	db.settings(settings);
	

	var userYear = localStorage.getItem("Year");
	if (userYear == null) {
		alert("Choose your grade level");
		localStorage.setItem("Year", "Fresh")
		userYear = localStorage.getItem("Year")
	}
	document.getElementById("GradeLevel").value = localStorage.getItem("Year");
	document.getElementById("GradeLevel").addEventListener("change", () => {

		localStorage.setItem("Year", document.getElementById("GradeLevel").value)
		location.reload();

	});


	//const docRef = firebase.doc();
	db.collection("Schedule").doc(userYear.toString()).get().then(docSnap => {
		if (docSnap.exists) {
		
			SetSchedule(docSnap.data());
		} else {
			// docSnap.data() will be undefined in this case
			console.log("No such document!");
			
		}
	}
	);
}

async function SetSchedule(Schedule) {
	
	let hour = d.getHours();
	let minutes = d.getMinutes();
	var LetterDay = Schedule[DaysOfWeekAbrv[DayOfWeek] + "Letter"]
	if (LetterDay=="X") {
		return;
    }
	console.log(Schedule);

	var PeriodNames = [];
	var PeriodTimes = [];

	try {
		PeriodNames = Schedule[DaysOfWeekAbrv[DayOfWeek] + "Periods"];
		PeriodTimes = Schedule[DaysOfWeekAbrv[DayOfWeek] + "Times"];
		
			var firstHour ;			
			var lastHour ;
			var firstMinute ;
			var lastMinute ;
			
			var table = document.getElementById("Schedule");
			AddNewHeader(table);

			document.getElementById("LetterDay").innerHTML = LetterDay;

			var foundCurrentPeriod = false;
			for (var i = 0; i < PeriodNames.length; i++) {
				
				var currentPeriod = false;
				var startHour = PeriodTimes[i].slice(0, 2);
				var endHour = PeriodTimes[i].slice(6, 8);
				var endMinute = PeriodTimes[i].slice(9, 11);
				var startMinute = PeriodTimes[i].slice(3, 5);
				var PeriodName = PeriodNames[i];
				if (i == 0) {

					firstHour = startHour;
					firstMinute = startMinute;
				}


				var hoursLeft;
				var minutesLeft;
				if (hour >= startHour && hour <= endHour && !foundCurrentPeriod) {
					if (hour == endHour && hour == startHour) {
						if (minutes < endMinute && minutes >= startMinute) {
							//console.log("In range test 0")
							currentPeriod = true;
						}
					}
					else if (hour == endHour && minutes < endMinute) {//if the hour is just equal to the end hour

						currentPeriod = true;
						//console.log("ran3")
					}
					else if (hour == startHour && minutes >= startMinute) {
						//console.log("ran2")
						currentPeriod = true;
					} else if (hour != startHour && hour != endHour) {
						currentPeriod = true;
						//	console.log("ran1")
					}
					if (currentPeriod) {

						hoursLeft = endHour - hour;
						minutesLeft = endMinute - minutes;
						TimeLeft(hoursLeft, minutesLeft, minutes, PeriodName);
					}
				}//end of within range
				AddNewElement(table, PeriodName, PeriodTimes[i], currentPeriod)

			}
			if (hour < firstHour || hour == firstHour && minutes < firstMinute) {

				var minutesUnitilSchoolStart = ((firstHour * 60) + parseInt(firstMinute)) - ((hour * 60) + minutes)

				Remianing.innerHTML = "School starts in "
				if (minutesUnitilSchoolStart / 60 < 1) {
					Remianing.innerHTML += minutesUnitilSchoolStart + " minutes"
				} else {
					var hoursLeft = minutesUnitilSchoolStart - ((minutesUnitilSchoolStart % 60))
					hoursLeft /= 60;
					if (hoursLeft > 1) {
						Remianing.innerHTML += hoursLeft + " hours " + (minutesUnitilSchoolStart % 60) + " minutes"
					} else {
						Remianing.innerHTML += hoursLeft + " hour " + (minutesUnitilSchoolStart % 60) + " minutes"
					}

				}

			} else if (hour > lastHour || hour == lastHour && minutes > lastMinute) {
				Remianing.innerHTML = "Schools over!"

			}
		
	}
	catch (e) {
		console.log(e);
	}
}

function AddNewHeader(table) {
	table.innerHTML = "";

	var trObject = document.createElement("tr");
	var period = document.createElement("th");
	var time = document.createElement("th");
	time.innerHTML = "Time";
	period.innerHTML = "Period";
	trObject.appendChild(period);
	trObject.appendChild(time);
	table.appendChild(trObject)

}

function AddNewElement(table, PeriodName, PeriodTime, currentPeriod) {
	let tr = document.createElement('tr');
				let TitleTR = document.createElement('td');

				TitleTR.innerHTML = PeriodName
				let TimeTR = document.createElement('td');
				TimeTR.innerHTML = PeriodTime;

				if (currentPeriod) {

					TitleTR.classList.add("CurrentPeriod");
					TimeTR.classList.add("CurrentPeriod");
				}

				tr.appendChild(TitleTR);
				tr.appendChild(TimeTR);

				table.appendChild(tr);
}

function TimeLeft(hoursLeft, minutesLeft, minutes, PeriodName) {

	if (minutesLeft < 0) {
		hoursLeft -= 1;
		minutesLeft += 60;
	}
	Remianing.innerHTML = "There is "

	if (hoursLeft == 1) {
		Remianing.innerHTML += hoursLeft + " hour ";
	} else if (hoursLeft > 1) {
		Remianing.innerHTML += hoursLeft + " hour ";
	}

	if (minutes!=1) {
		Remianing.innerHTML += minutesLeft + " minutes left in";
	} else {
		Remianing.innerHTML += minutesLeft + " minute left in";
	}
	//console.log(json[0].classOrder[i].replace(/\s+/g, ''));
	if (PeriodName != "Advisory" && PeriodName != "Seminar" && PeriodName != "Lunch" && PeriodName != "L&L") {
		Remianing.innerHTML += " " + PeriodName + " Period"
	} else {
		Remianing.innerHTML += " " + PeriodName

	}
}

function SetDateAndTime() {

	const d = new Date();
	let hour = d.getHours();
	let minutes = d.getMinutes();

	let month = d.getMonth();
	let day = d.getDate();
	let year = d.getFullYear();

	document.getElementById("CurrentDate").innerHTML = AllMonths[month] + " " + day + ", " +year

	if (minutes < 10) {
		document.getElementById("CurrentTime").innerHTML = hour + ":0" + minutes
	} else {
		document.getElementById("CurrentTime").innerHTML = hour + ":" + minutes
	}

}
GetData();