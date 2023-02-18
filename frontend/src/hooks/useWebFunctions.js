export const useWebFunctions = () => {
    const send_message = (data, socket) => {
        socket.send(data);
    }

    return {send_message}
}
