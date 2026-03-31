import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('nemra_users')) || [];
    const activeUser = JSON.parse(localStorage.getItem('nemra_active_user')) || null;
    const storedBookings = JSON.parse(localStorage.getItem('nemra_bookings')) || [];
    
    setUsers(storedUsers);
    setCurrentUser(activeUser);
    setBookings(storedBookings);
  }, []);

  const signup = (name, email, password, role) => {
    const userExists = users.find(u => u.email === email);
    if (userExists) return { success: false, message: "Email is already registered." };

    const newUser = { id: Date.now(), name, email, password, role };
    const updatedUsers = [...users, newUser];
    
    setUsers(updatedUsers);
    localStorage.setItem('nemra_users', JSON.stringify(updatedUsers));
    
    setCurrentUser(newUser);
    localStorage.setItem('nemra_active_user', JSON.stringify(newUser));
    return { success: true };
  };

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('nemra_active_user', JSON.stringify(user));
      return { success: true };
    }
    return { success: false, message: "Invalid email or password." };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('nemra_active_user');
  };

  const bookItem = (itemData, type) => {
    if (!currentUser) return { success: false, message: "Please log in to book." };

    const newBooking = {
      bookingId: `NMR-${Math.floor(Math.random() * 1000000)}`,
      userEmail: currentUser.email,
      type: type, 
      dateBooked: new Date().toISOString(),
      ...itemData
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('nemra_bookings', JSON.stringify(updatedBookings));
    
    return { success: true };
  };

  const getUserBookings = () => {
    if (!currentUser) return [];
    return bookings.filter(b => b.userEmail === currentUser.email);
  };

  // NEW: Cancel Booking Function
  const cancelBooking = (bookingId) => {
    const updatedBookings = bookings.filter(b => b.bookingId !== bookingId);
    setBookings(updatedBookings);
    localStorage.setItem('nemra_bookings', JSON.stringify(updatedBookings));
  };

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout, bookItem, getUserBookings, cancelBooking }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);