const allGra = {
    liczbKlock : 20, 
    liczbKlockRz : 5, //klocki na rzad
    divPlansza : null, 
    divWynik : null, 
    klockiLos : [], //tablica na wylosowane klocki
    klockiZazn : [], //klocki zaznaczone
    liczbRuch : 0, //liczba ruchów
    klockiImg : 
	[ //obrazki
        'obrazek_1.jpg',
        'obrazek_2.jpg',
        'obrazek_3.jpg',
        'obrazek_4.jpg',
        'obrazek_5.jpg',
        'obrazek_6.jpg',
        'obrazek_7.jpg',
        'obrazek_8.jpg',
        'obrazek_9.jpg',
        'obrazek_10.jpg'
    ]
}
	this.start=function (){
		this.divPlansza = document.querySelector('.plansza');
        this.divPlansza.innerHTML = '';
		this.divWynik = document.querySelector('.wynik');
		this.divWynik.innerHTML = '';
		
		this.klockiLos = [];
        this.klockiZazn = [];
        this.iloscRuch = 0;
		
	}