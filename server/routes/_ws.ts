// experimental
import {Peer} from "crossws";

const peers: Array<Peer> = [];

export default defineWebSocketHandler({
    open(peer) {
        peers.push(peer);
        console.log("[ws] open", peer);
    },

    message(peer, message) {
        console.log("[ws] message", peer, message);
        const text = message.text();
        if (text.includes("ping")) {
            peer.send("pong");
        } else {
            peers.forEach(item => item.send(text));
        }
    },

    close(peer, event) {
        peers.splice(peers.indexOf(peer), 1);
        console.log("[ws] close", peer, event);
    },

    error(peer, error) {
        console.log("[ws] error", peer, error);
    },
});
