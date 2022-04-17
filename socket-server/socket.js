var activeUsers = [];

/**
 * 
 * @param {*} io 
 */

module.exports = (io) => {

    io.on("connection", (socket) => {
        socket.emit("connected", "Hello and Welcome to the Server");
        socket.on('join', (data) => {
            socket.name = data.name
            socket.userId = socket.id
            const userData = {
                name: data.name,
                userId: socket.id
            }
            activeUsers.push(userData);
            io.emit("join", activeUsers);
        })

        socket.on("callEnded", () => {
            activeUsers.userId.delete(socket.id);
            socket.broadcast.emit("callEnded")
        })

        socket.on("callUser", (data) => {
            io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })

        })

        socket.on("answerCall", (data) => {
            io.to(data.to).emit("callAccepted", data.signal)
        })


        socket.on("disconnect", () => {
            activeUsers.splice(activeUsers.findIndex(function(i){
                return i.userId === socket.userId;
            }), 1);
            io.emit("user-disconnected", activeUsers);
        });
    });
}