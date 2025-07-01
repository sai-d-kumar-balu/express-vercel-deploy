const { Server } = require("socket.io");

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("join-room", (roomId) => {
            socket.join(roomId);
            socket.to(roomId).emit("user-joined", socket.id);
            console.log(`${socket.id} joined room ${roomId}`);
        });

        socket.on("offer", ({ roomId, offer }) => {
            socket.to(roomId).emit("offer", { offer, from: socket.id });
        });

        socket.on("answer", ({ roomId, answer }) => {
            socket.to(roomId).emit("answer", { answer, from: socket.id });
        });

        socket.on("ice-candidate", ({ roomId, candidate }) => {
            socket.to(roomId).emit("ice-candidate", { candidate, from: socket.id });
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};
