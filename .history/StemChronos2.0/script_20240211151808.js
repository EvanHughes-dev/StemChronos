/*
 * @EHughes
 * 
 * 
 * 
 * 
 * 
 */



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
	apiKey: decodeMessage('n6L<iGI3&H4!ML-h]y!0):Chc8}mK7y4%d<7DKY'),
	authDomain: decodeMessage('sB:vNvu-&7(Y_?_S:h}<uh<44?svx'),
	databaseURL: "https://chronos-96d4f.firebaseio.com",
	projectId: "chronos-96d4f",
	storageBucket: "chronos-96d4f.appspot.com",
	messagingSenderId: "866705537581",
	appId: decodeMessage('Ckg77D)VV{DVgCkth}kV}<YV;{;D;7gV7Y&sCC7<YsB:vNvu-&7(Y_?_S:h}<uh<44?svx'),
	measurementId: "G-RK77WZHGE9"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const settings = { timestampsInSnapshots: true };
db.settings(settings);

function GetData() {
	var userYear = localStorage.getItem("Year");
	if (userYear == null) {
		window.location = "./Welcome/Welcome.html";
	}
	
	SetDateAndTime();
	if (DayOfWeek == 0 || DayOfWeek == 6) {
		DailyMessageHEADER.innerHTML = "Enjoy your " + DaysOfWeekFull[DayOfWeek];
		LetterDayOBJ.style.display = 'none';
		WeekendImageOBJ.style.display = 'revert';
		
    }

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

	FetchMessageData();

	let hour = d.getHours();
	let minutes = d.getMinutes();
	var LetterDay = Schedule[DaysOfWeekAbrv[DayOfWeek] + "Letter"]
	if (LetterDay=="X") {
		return;
    }
//	console.log(Schedule);

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

				if (i + 1 == PeriodNames.length) {
					lastHour = endHour;
					lastMinute=endMinute
				}
				if (i == 0) {

					firstHour = startHour;
					firstMinute = startMinute;
				}
				if (i+1 == PeriodNames.length) {

					lastHour = endHour;
					lastMinute = endMinute;
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
	trObject.classList.add("table-primary");
}

function AddNewElement(table, PeriodName, PeriodTime, currentPeriod) {
	if (PeriodName != "Advisory" && PeriodName != "Seminar" && PeriodName != "Lunch" && PeriodName != "L&L") {
		if (window.localStorage.getItem('Period'+PeriodName.substring(0,1))!=null) {
			PeriodName = window.localStorage.getItem('Period' + PeriodName.substring(0, 1));
        }
    }
				let tr = document.createElement('tr');
				let TitleTR = document.createElement('td');
				
				TitleTR.innerHTML = PeriodName
				let TimeTR = document.createElement('td');

				var TimeMode = localStorage.getItem("TimeMode");
				if (TimeMode == null || TimeMode == "12Hour") {
					var startHour = PeriodTime.slice(0, 2);
					var endHour = PeriodTime.slice(6, 8);
					var endMinute = PeriodTime.slice(9, 11);
					var startMinute = PeriodTime.slice(3, 5);
					var StartTime_AmPm ="AM";
					var EndTime_AmPm = "AM";
					if (startHour >= 12) {
						StartTime_AmPm = "PM"
						if (startHour >= 13) {
							startHour -= 12;
						}
					}

					if (endHour >= 12) {
						EndTime_AmPm = "PM"
						if (endHour >= 13) {
							endHour -= 12;
							if (endHour < 10) {
								endHour = "0" + endHour;
							}
						}
					}
					console.log()
					TimeTR.innerHTML = startHour + ":" + startMinute + " " + StartTime_AmPm + " - " + endHour + ":" + endMinute + " " + EndTime_AmPm;
				} else {
					TimeTR.innerHTML = PeriodTime;
				}
				

				if (currentPeriod) {

					TitleTR.classList.add("navy", "text-white");
					TimeTR.classList.add("navy", "text-white");
				}

				tr.appendChild(TitleTR);
				tr.appendChild(TimeTR);

				table.appendChild(tr);
}

function TimeLeft(hoursLeft, minutesLeft, minutes, PeriodName) {
	var customName=false;
	if (PeriodName != "Advisory" && PeriodName != "Seminar" && PeriodName != "Lunch" && PeriodName != "L&L") {
		if (window.localStorage.getItem('Period' + PeriodName.substring(0, 1)) != null) {
			PeriodName = window.localStorage.getItem('Period' + PeriodName.substring(0, 1));
			customName = true;
		}
	}
	if (minutesLeft < 0) {
		hoursLeft -= 1;
		minutesLeft += 60;
	}
	Remianing.innerHTML = ""

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
	if (PeriodName != "Advisory" && PeriodName != "Seminar" && PeriodName != "Lunch" && PeriodName != "L&L" && !customName) {
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

	document.getElementById("CurrentDate").innerHTML = AllMonths[month] + " " + day + ", " + year

	var TimeMode = localStorage.getItem("TimeMode");
	var AM_PM ="AM"
	if (TimeMode == null || TimeMode == "12Hour") {
		if(hour>=12){
			AM_PM="PM";
		}
		if(hour>=13){
			hour-=12;
		}
	}else{
		AM_PM="";
	}

	if (minutes < 10) {
		document.getElementById("CurrentTime").innerHTML = hour + ":0" + minutes +" " + AM_PM
	} else {
		document.getElementById("CurrentTime").innerHTML = hour + ":" + minutes + " " + AM_PM
	}

}
GetData();



function FetchMessageData() {


	//const docRef = firebase.doc();
	db.collection("Schedule").doc("DailyMessage").get().then(docSnap => {
		if (docSnap.exists) {

			if (docSnap.data()[DaysOfWeekFull[DayOfWeek]]!=null){
				SetDailyMessage(docSnap.data())
			}
			

		} else {
			// docSnap.data() will be undefined in this case
			console.log("No such document!");

		}
	}
	);

}

function SetDailyMessage(Data) {
	const TODAYValue = Data[DaysOfWeekFull[DayOfWeek]]
	
	document.getElementById("DailyMessageHeader").innerHTML = TODAYValue[0];
	document.getElementById("DailyMessageText").innerHTML = TODAYValue[1];
}