import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  // const cleanUpSocket = (newSocket) => {
  //    newSocket.emit("userLoggedOut", { socketId });
  // };
  useEffect(() => {
    const socketId = localStorage.getItem("socketId");
    const newSocket = io("http://localhost:3000", {
      query: {
        socketId: socketId,
      },
    });
    newSocket.on("SocketId", (data) => {
      console.log("🚀 ~ newSocket.on ~ data:", data);
      // switch (key) {
      //   case value:

      //     break;

      //   default:
      //     break;
      // }
      newSocket.id = data.encryptedSocket;

      localStorage.setItem("socketId", data.cryptedSocket);
    });
    setSocket(newSocket);

    return () => {
      //  cleanUpSocket(newSocket);
      // newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
