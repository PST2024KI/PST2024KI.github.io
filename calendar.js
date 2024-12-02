async function updateTable(year,month,cells,table){
	if(month<1){
		year--;
		month+=12;
	}
	if(month>12){
		year++;
		console.log("1: "+month);
		month-=12;
		console.log("2: "+month);
	}

	let date = new Date(year,month);
	date.setDate(0);
	let last = date.getDate();
	date.setDate(1);
	let first = (date.getDay()+6%7)+1;
	date.setDate(0);
	let before = date.getDate();
	let data;

	try{
	data = await getIndex(year,month);
	}catch(e){};
	let months = ["January","February","March","April","May","June","July","August","Sebtember","October","November","December"];

	cells.forEach(function(x,y){

		let day;

		x.onclick = null;


		if(1+y<first){
			day = before+y-first+2;
			x.className = "outranged";
		}else if(y+1<last+first){
			day = y+2-first;

			if(data){
				if(data.includes(day.toString())){
					x.onclick = function(){
						setForm(year,month,day,inputs);
						
						giveFeedback(x); 
					};
					x.className = "valid"
				}else{
					x.className = "invalid";
				}
			}else{
				x.className = "invalid";
			}
		}else{
			day = y+2-first-last;
			x.className = "outranged";
		}
		x.innerHTML = day;

	});
	table.tHead.childNodes[1].childNodes[2].innerHTML = months[month-1];
	table.tHead.childNodes[0].childNodes[1].innerHTML = year;
	table.month = month;
	console.log(year);
	table.year = year;


}

function giveFeedback(cell) {
    // Puls-Animation hinzufügen
    cell.classList.add("clicked");

    // Puls-Animation nach 1 Sekunde entfernen
    setTimeout(() => {
        cell.classList.remove("clicked");
    }, 1000);
}


async function makeTable(year,month) {

	table = document.createElement('table');
	let cells = Array(42);
	let days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
	let body = table.createTBody();
	Object.defineProperty(table,"month",{value: month,writable: true});
	Object.defineProperty(table,"year",{value: year,writable: true});


	th = table.createTHead();
	trow = th.insertRow(0);
	days.forEach(function(x,y){
		tcell = trow.insertCell(y);
		tcell.innerHTML = x;
	});
	trow = th.insertRow(0);
	trow.insertCell(0);
	let mleft = trow.insertCell(1);
	mleft.innerHTML = "<";
	mleft.colSpan = 1;
	let mind = trow.insertCell(2);
	mind.colSpan = 3;
	let mright = trow.insertCell(3);
	mright.innerHTML = ">";
	mright.colSpan = 1;
	trow.insertCell(4)

	trow = th.insertRow(0);
	let jleft = trow.insertCell(0);
	jleft.innerHTML = "<";
	jleft.colSpan = 1;
	let jind = trow.insertCell(1);
	jind.innerHTML = year;
	jind.colSpan = 5;
	let jright = trow.insertCell(2);
	jright.innerHTML = ">";
	jright.colSpan = 1;

	mleft.onclick = function(){updateTable(table.year,table.month-1,cells,table);};
	mright.onclick = function(){updateTable(table.year,table.month+1,cells,table);};

	jleft.onclick = function(){updateTable(table.year-1,table.month,cells,table);};
	jright.onclick = function(){updateTable(table.year+1,table.month,cells,table);console.log("here");};


	for(let i=0;i<6;i++){
		row = body.insertRow(i);
		for(let j=0;j<7;j++){
			cells[7*i+j] = row.insertCell(j);
		}
	}
	updateTable(year,month,cells,table);


	document.getElementById("tableDiv").appendChild(table);
	//document.body.insertBefore(table,document.body.childNodes[0]);






}
