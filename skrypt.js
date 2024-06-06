var wszystkieKarty = ["AsKier", "KrolKier", "DamaKier", "WaletKier", "10Kier", "9kier", "8Kier", "7Kier", "6Kier", "5Kier", "4Kier", "3Kier", "2Kier",
"AsKaro", "KrolKaro", "DamaKaro", "WaletKaro", "10Karo", "9Karo", "8Karo", "7Karo", "6Karo", "5Karo", "4Karo", "3Karo", "2Karo",
"AsTrefl", "KrolTrefl", "DamaTrefl", "WaletTrefl", "10Trefl", "9Trefl", "8Trefl", "7Trefl", "6Trefl", "5Trefl", "4Trefl", "3Trefl", "2Trefl", 
"AsPik", "KrolPik", "DamaPik", "WaletPik", "10Pik", "9Pik", "8Pik", "7Pik", "6Pik", "5Pik", "4Pik", "3Pik", "2Pik"];

var twojeKarty = [];

var kartyPrzeciwnika = [];

var suma = 0;

var sumaPrzeciwnika = 0;

var ktoraKarta = 0;

var ktoraKartaPrzeciwnika = 0;

var ktoraKartaWTalii = 0;

var losoweLiczby = [];

var spasuj = false;

var passPrzeciwnika = false;

window.addEventListener("keydown", function(e) { 
	if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) { 
		e.preventDefault();
		e.stopPropagation(); 
	} 
}, false);

function Sleep(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
}

function przetasujKarty()
{
	for(var i = 0;i < wszystkieKarty.length;i++)
	{
		losoweLiczby[i] = i;
	}
	for(var i = 0;i < wszystkieKarty.length;i++)
	{
		var temp = losoweLiczby[i];
		var los = Math.floor(Math.random() * (wszystkieKarty.length - 1));
		losoweLiczby[i] = losoweLiczby[los];
		losoweLiczby[los] = temp;
	}	
	twojeKarty[ktoraKarta] = wszystkieKarty[losoweLiczby[ktoraKartaWTalii]];
	ktoraKartaWTalii++;
	kartyPrzeciwnika[ktoraKartaPrzeciwnika] = wszystkieKarty[losoweLiczby[ktoraKartaWTalii]];
	ktoraKartaWTalii++;
	ktoraKarta++;
	ktoraKartaPrzeciwnika++;
}

var wylosuj = Math.floor(Math.random() * 9);

async function wyswietlKarty()
{
	suma = 0;
	for(var i = 0;i < twojeKarty.length;i++)
	{
		if(twojeKarty[i].charAt(0) >= '0' && twojeKarty[i].charAt(0) <= '9')
		{
			if(twojeKarty[i].charAt(1) == '0')
				suma += 10;
			else 
				suma += twojeKarty[i].charAt(0)-'0';
		}
		else if(twojeKarty[i].substring(0, 2) == "As")
		{
			if(suma < 11)
				suma += 11;
			else
				suma += 1;
		}
		else if(twojeKarty[i].substring(0, 4) == "Krol" || twojeKarty[i].substring(0, 4) == "Dama" || twojeKarty[i].substring(0, 5) == "Walet")
		{
			suma += 10;
		}
	}
	var output = "<h3>Twoj wynik: " + suma;
	if(spasuj)
		output += " PASS";
	output += "</h3>";
	var ileKart = twojeKarty.length;
	for(var i = 0;i < ileKart;i++)
	{
		output += "<img class='karta' src='Karty/" + twojeKarty[i] + ".jpg' />";
	}
	output += "<img class='karta' src='CardBack.jpg'/>";
	console.log(suma);
	sumaPrzeciwnika = 0;
	for(var i = 0;i < kartyPrzeciwnika.length;i++)
	{
		if(kartyPrzeciwnika[i].charAt(0) >= '0' && kartyPrzeciwnika[i].charAt(0) <= '9')
		{
			if(kartyPrzeciwnika[i].charAt(1) == '0')
				sumaPrzeciwnika += 10;
			else
				sumaPrzeciwnika += kartyPrzeciwnika[i].charAt(0)-'0';
		}
		else if(kartyPrzeciwnika[i].substring(0, 2) == "As")
		{
			if(sumaPrzeciwnika < 11)
				sumaPrzeciwnika += 11;
			else
				sumaPrzeciwnika += 1;
		}
		else if(kartyPrzeciwnika[i].substring(0, 4) == "Krol" ||kartyPrzeciwnika[i].substring(0, 4) == "Dama" || kartyPrzeciwnika[i].substring(0, 5) == "Walet")
		{
			sumaPrzeciwnika += 10;
		}
		
	}
	var przeciwnik = "<h3>Wynik przeciwnika: " + sumaPrzeciwnika;
	if(passPrzeciwnika)
		przeciwnik += " PASS";
	przeciwnik += "</h3>";
	for(var i = 0;i < kartyPrzeciwnika.length;i++)
	{
		przeciwnik += "<img class='karta' src='Karty/" + kartyPrzeciwnika[i] + ".jpg' />";
	}
	przeciwnik += "<img class='karta' src='CardBack.jpg'/>";
	document.getElementById("twojeKarty").innerHTML = output;
	await Sleep(200);
	document.getElementById("kartyPrzeciwnika").innerHTML = przeciwnik;
	
	if(sumaPrzeciwnika > 21)
		passPrzeciwnika = true;
	
	if(suma > 21)
		spasuj = true;
		
	if(suma == 21)
	{
		spasuj = true;
	}
	if(sumaPrzeciwnika == 21)
	{
		passPrzeciwnika = true;
	}
	
	if((spasuj == true && sumaPrzeciwnika < 11 + wylosuj))
	{
		kartyPrzeciwnika[ktoraKartaPrzeciwnika] = wszystkieKarty[losoweLiczby[ktoraKartaWTalii]];
		ktoraKartaWTalii++;
		ktoraKartaPrzeciwnika++;
		wyswietlKarty();
		if(sumaPrzeciwnika >= 11 + wylosuj)
		{
			winCondition();

		}
	}
	else if(spasuj == true && sumaPrzeciwnika > 11)
	{
		winCondition();
	}
}

function winCondition()
{
	if(sumaPrzeciwnika > 21 && suma > 21)
		document.getElementById("koniecGry").innerHTML = "<span class='remis end-text'>REMIS</span>";
	else if(sumaPrzeciwnika <= 21 && suma > 21)
		document.getElementById("koniecGry").innerHTML = "<span class='przegrana end-text'>PRZECIWNIK WYGRAL</span>";
	else if(sumaPrzeciwnika <= 21 && suma <= 21 && sumaPrzeciwnika > suma)
		document.getElementById("koniecGry").innerHTML = "<span class='przegrana end-text'>PRZECIWNIK WYGRAL</span>";
	else if(sumaPrzeciwnika <= 21 && suma <= 21 && sumaPrzeciwnika == suma )
		document.getElementById("koniecGry").innerHTML = "<span class='remis end-text'>REMIS</span>";
	else if(sumaPrzeciwnika <= 21 && suma <= 21 && sumaPrzeciwnika < suma )
		document.getElementById("koniecGry").innerHTML = "<span class='wygrana end-text'>WYGRALES</span>";
	else if(sumaPrzeciwnika > 21 && suma <= 21)
		document.getElementById("koniecGry").innerHTML = "<span class='wygrana end-text'>WYGRALES</span>";
}

function dobierzKarte()
{	
	if(suma < 21 && spasuj == false)
	{
		twojeKarty[ktoraKarta] = wszystkieKarty[losoweLiczby[ktoraKartaWTalii]];
		ktoraKarta++;
		ktoraKartaWTalii++;
		if(sumaPrzeciwnika < 11 + wylosuj)
		{
			kartyPrzeciwnika[ktoraKartaPrzeciwnika] = wszystkieKarty[losoweLiczby[ktoraKartaWTalii]];
			ktoraKartaWTalii++;
			ktoraKartaPrzeciwnika++;
		}
		else
			passPrzeciwnika = true;
		wyswietlKarty();
	}
}	

function pass()
{
	spasuj = true;
	if(sumaPrzeciwnika > 11 + wylosuj)
			passPrzeciwnika = true;
	wyswietlKarty();
}

window.onload = function()
{
	przetasujKarty();
	wyswietlKarty();
}