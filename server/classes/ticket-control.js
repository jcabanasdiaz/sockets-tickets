const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {
            this.reiniciarValores();
        }

    }

    siguienteTicket() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        // Extraigo el primer ticket y lo elimino del array
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        // Generamos el ticket y lo ponemos en la primera posicion de los ultimos 4
        let ticketParaAtender = new Ticket(numeroTicket, escritorio);
        this.ultimos4.unshift(ticketParaAtender);

        // Si tenemos mas de 4 items, borramos el ultimo de la pantalla
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1) // Borra el ultimo elemento
        }

        console.log('Ultimo 4');
        console.log(this.ultimos4);

        // Grabamos
        this.grabarArchivo();

        // Devolvemos el ticket atendido
        return ticketParaAtender;
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

    reiniciarValores() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        this.grabarArchivo();
    }




}


module.exports = {
    TicketControl
}