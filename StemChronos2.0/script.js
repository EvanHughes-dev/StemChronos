

const BaseUrl = 'http://69.242.41.167:8082';

const AllMonths = ["January", "Febuary", "March", "April", "May", "June", "July", "Agust", "September", "October", "November", "December"];
async function GetData() {
	var userYear = localStorage.getItem("Year");
	if (userYear ==null) {
		alert("Choose your grade level");
		localStorage.setItem("Year", "FRE")
	}
	document.getElementById("GradeLevel").value = localStorage.getItem("Year");
	document.getElementById("GradeLevel").addEventListener("change", () => {

		localStorage.setItem("Year", document.getElementById("GradeLevel").value)
		
		GetData();
	});

	
	try {

		await fetch(BaseUrl + "/api/Schedule/" + localStorage.getItem("Year"), {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		})
			.then((response) => response.json())
			.then((json) => {
				const d = new Date();
				let hour = d.getHours();
				let minutes = d.getMinutes();
			
				SetDateAndTime();
				
				var length = json[0].classOrder.length;
				
				var firstHour;
				var lastHour;
				var firstMinute;
				var lastMinute;

				const Remianing = document.getElementById("TimeRemaining");
				var table = document.getElementById("Schedule");
				AddNewHeader(table);
				
				document.getElementById("LetterDay").innerHTML = json[0].letterDay;
			
				var foundCurrentPeriod=false;
				for (var tempIndex = 0; tempIndex < length; tempIndex++) {
					
					var currentPeriod = false;
					var startHour = json[0].startTime[tempIndex].slice(0, 2);
					var endHour = json[0].endTime[tempIndex].slice(0, 2);
					var endMinute = json[0].endTime[tempIndex].slice(3, 5);
					var startMinute = json[0].startTime[tempIndex].slice(3, 5);

					if (tempIndex == 0) {
						
						firstHour = startHour;
						firstMinute = startMinute;
					}
					
					
					var hoursLeft;
					var minutesLeft;
					if (hour >= startHour && hour <= endHour &&!foundCurrentPeriod) {
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

							if (minutes > 1 || minutes == 0) {
								Remianing.innerHTML += minutesLeft + " minutes left in";
							} else {
								Remianing.innerHTML += minutesLeft + " minute left in";
							}
							if (json[0].classOrder[tempIndex] != "Advisory" || json[0].classOrder[tempIndex] != "Seminar" || json[0].classOrder[tempIndex] != "Lunch") {
								Remianing.innerHTML += " " + json[0].classOrder[tempIndex] + " Period"
							} else {
								Remianing.innerHTML += " " + json[0].classOrder[tempIndex]

							}
						}
					}//end of within range
					let tr = document.createElement('tr');
					let TitleTR = document.createElement('td');
					
					TitleTR.innerHTML = json[0].classOrder[tempIndex];
					let TimeTR = document.createElement('td');
					TimeTR.innerHTML = json[0].startTime[tempIndex].slice(0, 5) + "-" + json[0].endTime[tempIndex].slice(0, 5);
					
					if (currentPeriod) {
						
						TitleTR.classList.add("CurrentPeriod");
						TimeTR.classList.add("CurrentPeriod");
						
						//TitleTR.classList.add("CurrentPeriod");
						//TimeTR.classList.add("CurrentPeriod");
						
					
					} 
					
					tr.appendChild(TitleTR);
					tr.appendChild(TimeTR);
					
					table.appendChild(tr);
					
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
			})
			.catch(error => {
				console.error(error);
			});
	}
	catch (e) {
		console.log(e);
	}
}
GetData();

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