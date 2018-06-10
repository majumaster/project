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
	this.rozpoczGre=function (){
		this.divPlansza = document.querySelector('.plansza');
        this.divPlansza.innerHTML = '';
		this.divWynik = document.querySelector('.wynik');
		this.divWynik.innerHTML = '';
		this.klockiLos = [];
        this.klockiZazn = [];
        this.iloscRuch = 0;
		
		 for (let i=0; i<liczbKlock; i++) {
            this.klocki.push(Math.floor(i/2));//zapisywanie liczb obrazow parami
        }
		//losowanie numerow dla obrazkow
		 for (let i=this.liczbKlock-1; i>0; i--) {
            const los = Math.floor(Math.random()*i);
            const obrazek = this.klockiLos[i];
            this.klockiLos[i] = this.klockiLos[los];
			this.klockiLos[los] = obrazek;
        }
		
		//układanie obrazków na planszy
		for(let i=0; i<liczbKlock; i++){
			const obraz = document.createElement('div');
			obraz.classList.add('styleKart');
			this.divPlansza.appendChild(obraz);
			obraz.dataset.cardType = this.klockiLos[i];
            obraz.dataset.index = i;
			
			obraz.addEventListener('click', this.obrazClick.bind(this));
		}
		canGet : true, //czy można klikać na klocki
		klockiPary : 0, //liczba znalezionych par
		obrazClick : function(e) {
			if (!this.klockiZazn[0] || (this.klockiZazn[0].dataset.index !== e.target.dataset.index)) {
                this.klockiZazn.push(e.target);
                e.target.style.backgroundImage = 'url(' + this.klockiImg[e.target.dataset.cardType] + ')';
            }

            if (this.klockiZazn.length === 2) {
                this.canGet = false; //zablokowanie mozliwosci wybierania klockow po zaznaczeniu 2 klockow

                if (this.klockiZazn[0].dataset.cardType === this.klockiZazn[1].dataset.cardType) {
                    setTimeout(this.usunKlocek.bind(this), 500);
                } else {
                    setTimeout(this.schowajKlocek.bind(this), 500);
                }

                this.iloscRuch++;
                this.divWynik.innerHTML = this.iloscRuch;
            }
        
		}
		document.querySelector('.start').addEventListener('click', function() {
         allGra.(rozpoczGre);});
	}