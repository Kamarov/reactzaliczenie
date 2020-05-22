import React from 'react';
import PropTypes from 'prop-types';


//Klasa, ktora bedzie nam odpowiadac za karte
export default class Karta extends React.Component {
    static PoprzedniaKarta = null;
    static AktualnaKarta = null;
    static WszystkieKarty = [];

    //Bugi w pamieci wymuszaja na mnie prymitywne rozwiazania...
    static IleZebranoKart = 0;


    //Czyli ogolne zasady gry
    static LogikaKart(_nowoWybranaKarta) {
        //Nic nie wybrano.
        if (Karta.PoprzedniaKarta == null && Karta.AktualnaKarta == null) {
            Karta.PoprzedniaKarta = _nowoWybranaKarta;
            _nowoWybranaKarta.setState({ showValue: true, removed: false });
        }
        //Wybrano tylko jedna
        else if (Karta.PoprzedniaKarta != null && Karta.AktualnaKarta == null) {

            //Nie mozemy wybrac samych siebie.
            if (Karta.PoprzedniaKarta === _nowoWybranaKarta)
                return;

            Karta.AktualnaKarta = _nowoWybranaKarta;

            let areEqual = (_nowoWybranaKarta.props.value === Karta.PoprzedniaKarta.props.value);

            _nowoWybranaKarta.setState({ showValue: true, removed: areEqual });
            Karta.PoprzedniaKarta.setState({ showValue: true, removed: areEqual });

            //No to zbieramy karte.
            if (areEqual) {
                Karta.PoprzedniaKarta = null;
                Karta.AktualnaKarta = null;
                this.IleZebranoKart++;
            }
        }
        //Wybrano juz wszystkie, wiec reset
        else if (Karta.PoprzedniaKarta != null && Karta.AktualnaKarta != null) {
            Karta.PoprzedniaKarta.setState({ showValue: false, removed: false });
            Karta.PoprzedniaKarta = _nowoWybranaKarta;
            Karta.AktualnaKarta.setState({ showValue: false, removed: false });
            Karta.AktualnaKarta = null;
            _nowoWybranaKarta.setState({ showValue: true, removed: false });
        }
    }


    //Dla zobrazowania absurdu React'a...
    UniqueID = -1;

    //Konstuktorek...
    constructor(props) {
        //Serio js? Nie logiczniej bylo uzyc base?
        super(props);

        //Wrzucamy element jak go nie ma - niech nam zyje trzymanie referencji...
        if (!Karta.WszystkieKarty.includes(this)) {
            //Tylko pytanie, dlaczego u diabla jest tych elementow 2x wiecej niz trzeba???
            this.UniqueID = Karta.WszystkieKarty.length;
            Karta.WszystkieKarty.push(this);
        }

        //Domyslnie taki stan ma byc.
        this.state = { showValue: false, removed: false };
    };

    //Wrzucane wartosci
    static propTypes =
        {
            value: PropTypes.string,
        };


    //Czyli zaleznie od stanu wyswietli nam numer, badz tez nie.
    GetValueToDisplay = () => {

        if (this.state.showValue)
            return this.props.value;
        else
            return "";

    };

    //Co ma sie stac, gdy klikniemy w przyciska...
    handleClick = () => {
        Karta.LogikaKart(this);
    };

    //Jak ma sie  normalnie zachowywac karta...
    NormalLook = () => {
        return (
            <div className='karta-display'>
                <button onClick={this.handleClick}> {this.GetValueToDisplay()} </button>
            </div>
        );
    }

    //Jak ma wygladac po zebraniu karty.
    RemovedLook = () => {
        return (
            <div className='karta-display'>
                
            </div>
        );
    }


    render() {

        //Co mamy aktualnie renderowac
        let toDisplay = (this.state.removed) ? this.RemovedLook : this.NormalLook;

        //Renderujemy
        return (toDisplay());
    }
}