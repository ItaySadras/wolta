import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const cleanUpSocket = (newSocket) => {
    const socketId = localStorage.getItem("socketId");
     newSocket.emit("userLoggedOut", { socketId });
  };
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    newSocket.on("SocketId", (data) => {
      localStorage.setItem("socketId", data);
    });
    newSocket.on("connect", () => {
      console.log("Socket connected");
    });
    setSocket(newSocket);

    return  () => {
       cleanUpSocket(newSocket);
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
