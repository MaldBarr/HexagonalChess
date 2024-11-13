import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000', {
    transports: ['websocket', 'polling'],
});

const Chat = ({ roomId, username }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Join the room
        socket.emit('joinRoom', roomId);

        socket.on('chatMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        socket.on('chessMove', (move) => {
            const moveMessage = `${move.username} movio ${move.piece} de ${move.fromHex} a ${move.toHex}`;
            setMessages((prevMessages) => [...prevMessages, { username: 'System', text: moveMessage }]);
        });

        return () => {
            socket.off('chatMessage');
            socket.off('chessMove');
        };
    }, [roomId]);

    const sendMessage = () => {
        socket.emit('chatMessage', { roomId, username, text: message });
        setMessage('');
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.username}: </strong>{msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;