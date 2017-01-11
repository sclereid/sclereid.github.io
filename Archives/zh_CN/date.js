window.deadline = new Date("June 7, 2017 9:00:00");

Date.prototype.toString = function()
{
	var str = "<span>";
	if(this.getHours()<10)
	str += '0';
	str += this.getHours() + ':';
	if(this.getMinutes()<10)
	str += '0';
	str += this.getMinutes() + ':';
	if(this.getSeconds()<10)
	str += '0';
	str += this.getSeconds();
	str += '</span>&nbsp;<span>';
	switch (this.getMonth()) 
	{
		case 0:
		str += "Jan";
		break;
		case 1:
		str += "Feb";
		break;
		case 2:
		str += "March";
		break;
		case 3:
		str += "Apr";
		break;
		case 4:
		str += "May";
		break;
		case 5:
		str += "June";
		break;
		case 6:
		str += "July";
		break;
		case 7:
		str += "Aug";
		break;
		case 8:
		str += "Sept";
		break;
		case 9:
		str += "Oct";
		break;
		case 10:
		str += "Nov";
		break;
		case 11:
		str += "Dec";
		break;
	}
	str += ". " + this.getDate();
	str += ", " + this.getFullYear();
	str += '</span>';
	return str;
}
function loop()
{
	var date = new Date();
	document.getElementById("time").innerHTML=date;
	//alert((deadline-date)/1000/60/60/24);
	var tmp = deadline.getTime()-date.getTime();
	document.getElementById("udays").innerHTML=parseInt(tmp/(24*60*60*1000));
	document.getElementById("uhours").innerHTML=parseInt(tmp/(60*60*1000));
	document.getElementById("uminutes").innerHTML=parseInt(tmp/(60*1000));
	document.getElementById("useconds").innerHTML=parseInt(tmp/(1000));
	
	var perc = 1-tmp/(365*24*60*60*1000);
	document.getElementById("percentage").innerHTML=parseInt(perc*10000000)/100000+'%';
	document.getElementById("bar").style.borderLeft = (''+parseInt(perc*320)+'px solid gray');
	document.getElementById("bar").style.width = parseInt((1-perc)*320)+'px';
}

setInterval(loop,1000);
