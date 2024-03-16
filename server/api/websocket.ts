// experimental
import {Peer} from "crossws";
import {WebSocketServer} from "ws";

type CTX = { node: { server: WebSocketServer, req: any, ws: any }}

export default defineWebSocketHandler({
    open(peer: Peer<CTX>) {
        peer.subscribe('ROOM');
        peer.publish('ROOM', 'connected');
    },

    message(peer: Peer<CTX>, message) {
        const text = message.text();
        if (text.trim() === 'ping') {
            peer.send("pong");
            return;
        }
        peer.send(text);
        peer.publish('ROOM', text);
    },

    close(peer) {
        peer.unsubscribe('ROOM');
    },

    error(peer, error) {
        console.error("[ws] error", peer, error);
    },
});
