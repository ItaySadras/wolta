// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

 

//   const login = (userData) => {
//     // Save user data in state and sessionStorage for persistence
//     setCurrentUser(userData);
//     sessionStorage.setItem('user', JSON.stringify(userData));
//   };

//   const logout = () => {
//     // Implement logout functionality, clear user from state and sessionStorage
//     setCurrentUser(null);
//     sessionStorage.removeItem('user');http://localhost:5173/
//     // Add backend call to invalidate session/cookie if needed
//   };

//   const value = {
//     currentUser,
//     login,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
// };
