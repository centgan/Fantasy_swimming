

export const useWebSocket = () => {
    let uuid;
    const Opening = () => {
        const socket = new WebSocket('ws://localhost:8080');
        socket.addEventListener('open', function (event) {
            console.log('connected');
            // socket.send('something on client')
        });
        socket.onmessage = ({data}) => {
            uuid = JSON.parse(data);
            // console.log(, 'this is the earlier message');
        }
        return [socket, uuid];
    }

    return {Opening}
}
