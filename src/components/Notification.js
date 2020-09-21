import React from 'react';

const Notification = ({ message, messageStyle }) => message && <div style={messageStyle}>{message}</div>;
export default Notification;