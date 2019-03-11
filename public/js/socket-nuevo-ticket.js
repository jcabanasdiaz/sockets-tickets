// Comando para establecer comunicación
var socket = io();
var label = $('#lblNuevoTicket')

socket.on('connect', () => {
    console.log('conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', (ticketActual) => {
    label.text(ticketActual);
});

$('button').on('click', () => {
    socket.emit('siguienteTicket', null, (siguienteTicket) => {
        label.text(siguienteTicket);
    });
});