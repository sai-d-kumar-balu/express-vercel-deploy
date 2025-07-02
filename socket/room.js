const { Server } = require('socket.io');

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // When someone initiates a call
        socket.on('initiateCall', ({ userId, signalData, myId }) => {
            console.log(`Call initiated from ${myId} to ${userId}`);
            io.to(userId).emit('incomingCall', {
                from: myId,
                signalData,
            });
        });

        // When receiver answers the call
        socket.on('answerCall', ({ signal, to }) => {
            console.log(`${socket.id} answered call from ${to}`);
            io.to(to).emit('callAccepted', signal);
        });

        // End call
        socket.on('endCall', ({ to }) => {
            console.log(`${socket.id} ended call with ${to}`);
            io.to(to).emit('callEnded');
        });

        // Optional: emit your ID to clients (useful if frontend doesn’t have it yet)
        socket.emit('yourID', socket.id);

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};
