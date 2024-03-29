const User = require("../backend/src/model/userModel")

const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user?.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user?.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user?.userId === userId);
};

io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    socket.on("allUser", (alluser) => {
        io.emit("getAlluer", alluser);
    })

    socket.on("addConversation", (conversationId) => {
        io.emit("getAllConversation", conversationId);
    })

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit("getMessage", {
            senderId,
            text,
        });

        io.to(user?.socketId).emit("getNotif", {
            senderId,
            text,
        });
    });

    //get notification 
    socket.on("sendNotification", ({ notificationId, senderId, notification }) => {
        const user = getUser(notificationId);

        io.to(user?.socketId).emit("getNotification", {
            senderId,
            notification
        })
    })

    //when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});
