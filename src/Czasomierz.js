import React from 'react';
import Karta from './Karta';

//Klasa odpowiedzialna za czasomierz
export default class Czasomierz extends React.Component {

    //Do resetowania czasomierzy
    static ResetujCzasomierze = () => {
        //alert(Czasomierz.Czasomierze.length);
        for (let i = 0; i < Czasomierz.Czasomierze.length; i++)
            Czasomierz.Czasomierze[i].setState({ startowyCzas: Date.now(), aktualnyCzas: Date.now() });
    }

    //Dostep do wszystkich czasomierzy, w tym wypadku jednego, ale to js, wiec moze byc grubo...
    static Czasomierze = [];

    constructor(props) {
        super(props)

        this.state = { startowyCzas: Date.now(), aktualnyCzas: Date.now() };

        //Dodajemy do czasomierzy
        if (!Czasomierz.Czasomierze.includes(this))
            Czasomierz.Czasomierze.push(this);

        //Wrzucamy corrutyne odmierzajaca czas
        this.timer = setInterval(() => {
            if (Karta.IleZebranoKart < 8)
                this.setState({ aktualnyCzas: Date.now() });
        }, 1);


    }


    render() {

        let sekundy = (this.state.aktualnyCzas - this.state.startowyCzas) / 1000;

        return (<div className="czasomierz-display">{sekundy.toString()}</div>);
    }
}