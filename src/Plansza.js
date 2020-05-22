import React from 'react';
import Karta from './Karta';
import Czasomierz from './Czasomierz';


//Poniewaz js nie pomyslalo nad zaimplementowaniem tak prostej funkcji...
export function RandomInteger(_min, _max) {
    return Math.floor(Math.random() * (_max - _min)) + _min;
}

export function Restartuj(_plansza) {
    Karta.PoprzedniaKarta = null;
    Karta.AktualnaKarta = null;

    //Kolejna ciekawostka, z 16 kart zrobily sie 32 mimo walidacji - co ciekawe indexy maja rozstrzelone czego juz w ogole nie ogarniam...
    //alert(Karta.WszystkieKarty.length);

    //Komponenty ktore sa juz we mnie juz nie, tak iz musze recznie po nich przejechac?
    for (let i = 0; i < Karta.WszystkieKarty.length; i++) {
        Karta.WszystkieKarty[i].setState({ showValue: false, removed: false });
        //alert(Karta.WszystkieKarty[i].UniqueID);
    }

    Czasomierz.ResetujCzasomierze();
    Karta.IleZebranoKart = 0;
}

//Klasa, ktora bedzie nam odpowiadac za plansze
export default class Plansza extends React.Component {
    constructor(props) {
        super(props);
        this.setState({});
    }


    //Jaki jest obecnie stan planszy.
    StanPlanszy =
        [
            "0", "0", "1", "1",
            "2", "2", "3", "3",
            "4", "4", "5", "5",
            "6", "6", "7", "7"
        ];

    //Wskaznki na funkcje anonimowa - bo ktos wymyslil ze komponencie nie da sie delklarowc metod...
    losujPlanszePtr = () => {

        //Lista na indexy
        let buffList = [];

        //Dodajemy se indexy tablicy
        for (let i = 0; i < 8; i++)
            buffList.push(i, i);

        //Losujemy se numerki do zgadywania
        for (let i = 0; i < this.StanPlanszy.length; i++) {
            //Losujemy jaki numerek bedzie w tym miejscu
            let index = RandomInteger(0, buffList.length);
            this.StanPlanszy[i] = buffList[index].toString();

            //Nie slyszalo sie o RemoveAt? Gorzej niz w Javie...
            buffList.splice(index, 1);
        }

    };

    RestartowaniePtr = () => {
        this.setState({});
        Restartuj(this);
        this.losujPlanszePtr();
    };


    render() {

        //Losujemy plansze
        this.losujPlanszePtr();

        //alert("Dlaczego sie renderuje dwa razy?");

        return (
            //Na chama, ale jeszcze nie wiem jak zrobic za pomoca for'a...
            <div className='plansza-display'>
                <div>
                    <button onClick={this.RestartowaniePtr}>Restartuj Gre</button>
                </div>
                <div className='plansza-karty'>
                    <Karta value={this.StanPlanszy[0]}></Karta>
                    <Karta value={this.StanPlanszy[1]}></Karta>
                    <Karta value={this.StanPlanszy[2]}></Karta>
                    <Karta value={this.StanPlanszy[3]}></Karta>

                    <Karta value={this.StanPlanszy[4]}></Karta>
                    <Karta value={this.StanPlanszy[5]}></Karta>
                    <Karta value={this.StanPlanszy[6]}></Karta>
                    <Karta value={this.StanPlanszy[7]}></Karta>

                    <Karta value={this.StanPlanszy[8]}></Karta>
                    <Karta value={this.StanPlanszy[9]}></Karta>
                    <Karta value={this.StanPlanszy[10]}></Karta>
                    <Karta value={this.StanPlanszy[11]}></Karta>

                    <Karta value={this.StanPlanszy[12]}></Karta>
                    <Karta value={this.StanPlanszy[13]}></Karta>
                    <Karta value={this.StanPlanszy[14]}></Karta>
                    <Karta value={this.StanPlanszy[15]}></Karta>
                </div>
            </div>);

    }
}