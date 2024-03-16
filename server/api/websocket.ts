// experimental
import {Peer} from "crossws";
import {WebSocketServer} from "ws";

type CTX = { node: { server: WebSocketServer, req: any, ws: any }}
const topic = 'ROOM';

export default defineWebSocketHandler({
    open(peer: Peer<CTX>) {
        peer.subscribe(topic);
        peer.publish(topic, 'connected');
    },

    message(peer: Peer<CTX>, message) {
        const text = message.text();
        if (text.trim() === 'ping') {
            peer.send("pong");
            return;
        }
        peer.send(text);
        peer.publish(topic, text);
    },

    close(peer) {
        peer.unsubscribe(topic);
    },

    error(peer, error) {
        console.error("[ws] error", peer, error);
    },
});
