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
    ],
	 rozpoczGre : function (){
		this.divPlansza = document.querySelector('.plansza');
        this.divPlansza.innerHTML = '';
		this.divWynik = document.querySelector('.wynik');
		this.divWynik.innerHTML = '';
		this.klockiLos = [];
        this.klockiZazn = [];
        this.iloscRuch = 0;
		this.canGet = true;
        this.klockiPary = 0;
		
		 for (let i=0; i<this.liczbKlock; i++) {
            this.klockiLos.push(Math.floor(i/2));//zapisywanie liczb obrazow parami
        }
		//losowanie numerow dla obrazkow
		 for (let i=this.liczbKlock-1; i>0; i--) {
            const los = Math.floor(Math.random()*i);
            const obrazek = this.klockiLos[i];
            this.klockiLos[i] = this.klockiLos[los];
			this.klockiLos[los] = obrazek;
        }
		
		//układanie obrazków na planszy
		for(let i=0; i<this.liczbKlock; i++){
			const obraz = document.createElement('div');
			obraz.classList.add('styleKart');
			this.divPlansza.appendChild(obraz);
			obraz.dataset.cardType = this.klockiLos[i];
            obraz.dataset.index = i;
			 console.log(5+(obraz.offsetWidth+5)*(i%this.liczbKlockRz))
            obraz.style.left = 5+(obraz.offsetWidth+10)*(i%this.liczbKlockRz) + 'px'
            obraz.style.top = 5+(obraz.offsetHeight+10)*(Math.floor(i/this.liczbKlockRz)) + 'px';

            obraz.addEventListener('click', this.obrazClick.bind(this));
        }
    },
   canGet : true, //czy można klikać na klocki
		klockiPary : 0, //liczba znalezionych par
		obrazClick : function(e) {
			if (this.canGet) {	
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
		},

    usunKlocek : function() {
        this.klockiZazn[0].remove();
        this.klockiZazn[1].remove();

        this.canGet = true;//po usunieniu dobrze wybranej pary umozliwienie dalszego zaznaczania
        this.klockiZazn = [];

        this.klockiPary++;
        if (this.klockiPary >= this.liczbKlock / 2) {
            alert('Koniec gry: Wygrales!!');
        }
    },

   schowajKlocek : function() {
        this.klockiZazn[0].style.backgroundImage = 'url(obrazek.jpg)';
        this.klockiZazn[1].style.backgroundImage = 'url(obrazek.jpg)';

        this.klockiZazn = [];
        this.canGet = true;
    }

   
}

	document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button').addEventListener('click', function() {
        allGra.rozpoczGre();
    });
});