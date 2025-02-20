var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import PreCallTest from '@jitsi/precall-test';
/**
 * Run a pre-call test to check the network conditions. It uses a TURN server to establish
 * a connection between two PeerConnections using the server as a relay. Afterwards it sends
 * some test traffic through a data channel to measure the network conditions, these are
 * recorded and returned through a Promise.
 *
 * @param {Array<IceServer>} - The ICE servers to use for the test, these are passes to the PeerConnection constructor.
 * @returns {Promise<PreCallResult | any>} - A Promise that resolves with the test results or rejects with an error.
 */
export default function runPreCallTest(iceServers) {
    return __awaiter(this, void 0, void 0, function* () {
        return new PreCallTest().start(iceServers);
    });
}
//# sourceMappingURL=PreCallTest.js.map