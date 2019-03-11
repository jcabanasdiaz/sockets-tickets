// Comando para establecer comunicación
var socket = io();
var label = $('small');

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', () => {
    socket.emit('atenderTicket', { escritorio: escritorio }, (ticketParaAtender) => {
        label.text('Ticket ' + ticketParaAtender.numero);

        socket.broadcast.emit('refrescarUltimos4');
    });
});