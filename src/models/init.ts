// import type { JitsiConferenceEvents, JitsiConnectionEvents } from "./events";

// export interface Listenable {
//     // constructor( eventEmitter?: EventEmitter<unknown> ); // TODO:
//     addListener: ( eventName: string, listener: () => unknown ) => () => unknown; // TODO: returns remote listener func
//     removeListener: ( eventName: string, listener: () => unknown ) => void;
//     on: (eventName: string, listener: (...args: any[]) => unknown) => unknown; // TODO: returns remote listener func
//     off: (eventName: string, listener: (...args: any[]) => unknown) => void;
//   }

//   export enum CameraFacingMode {
//     ENVIRONMENT = 'environment',
//     USER = 'user'
//   }

//   export enum VideoType {
//     CAMERA = 'camera',
//     DESKTOP = 'desktop',
//   }

//   export enum MediaType {
//     AUDIO = 'audio',
//     VIDEO = 'video'
//   }

//   export enum JingleSessionState {
//     PENDING = 'pending',
//     ACTIVE = 'active',
//     ENDED = 'ended'
//   }

//   /**
//  * Enumeration of the codec mime types
//  * @type {{AV1: string, H264: string, OPUS: string, RED: string, ULPFEC: string, VP8: string, VP9: string}}
//  */
// export enum CodecMimeType {
//     /**
//      * AV1 codec mime type.
//      */
//     AV1 = 'av1',

//     /**
//      * The h264 codec mime type.
//      */
//     H264 = 'h264',

//     /**
//      * The opus codec mime type.
//      */
//     OPUS = 'opus',

//     /**
//      * The red codec mime type.
//      */
//     RED = 'red',

//     /**
//      * The ulpfec codec mime type.
//      */
//     ULPFEC = 'ulpfec',

//     /**
//      * The vp8 codec mime type.
//      */
//     VP8 = 'vp8',

//     /**
//      * The vp9 codec mime type.
//      */
//     VP9 = 'vp9'
// }
  

//   export type PeerMediaInfo = {
//     muted: boolean;
//     videoType: unknown | undefined;
//   }

//   export type JitsiConferenceOptions = object;

//   export interface LocalSdpMunger {
//     // constructor( tpc: TraceablePeerConnection, localEndpointId: string );
//     transformStreamIdentifiers: ( sessionDesc: RTCSessionDescription ) => RTCSessionDescription;
//   }

//   /**
//  * Application-defined values carried in the JWT claims section.
//  *
//  * @see https://github.com/jitsi/lib-jitsi-meet/blob/master/doc/tokens.md#token-identifiers-structure-optional
//  */
// interface JwtIdentity {
//     group: string;
//     user: {
//       id: string;
//       email: string;
//       name: string;
//       avatar: string;
//     };
//     callee?: {
//       id: string;
//       name: string;
//       avatar: string;
//     };
//   }
  

//   export interface JitsiParticipant {
//     // constructor( jid: unknown, conference: unknown, displayName: unknown, hidden: boolean, statsID: string, status: string, identity: unknown, isReplacing?: boolean, isReplaced?: boolean ); // TODO:
//     getBotType: () => string | undefined;
//     getConference: () => JitsiConference;
//     getConnectionStatus: () => string;
//     getDisplayName: () => string;
//     getFeatures: () => Promise<Set<string> | Error>;
//     getId: () => string;
//     getIdentity: () => undefined | JwtIdentity;
//     getJid: () => string;
//     getProperty: ( name: string ) => string;
//     getRole: () => string;
//     getStatsID: () => string;
//     getStatus: () => string;
//     getTracks: () => JitsiTrack[];
//     getTracksByMediaType: ( mediaType: MediaType ) => JitsiTrack[];
//     hasFeature: ( feature: string ) => boolean;
//     isAudioMuted: () => boolean;
//     isHidden: () => boolean;
//     isModerator: () => boolean;
//     isReplaced: () => boolean;
//     isReplacing: () => boolean;
//     isVideoMuted: () => boolean;
//     setBotType: ( newBotType: string ) => void;
//     setFeatures: ( newFeatures: Set<string> | undefined ) => void;
//     setIsReplaced: (newIsReplaced: boolean) => void;
//     setIsReplacing: (newIsReplacing: string) => void;
//     setProperty: ( name: string, value: string ) => void;
//     setRole: ( role: string ) => void;
//     supportsDTMF: () => boolean;
//   }
  

//   export interface SignalingLayer extends Listenable {
//     // constructor( eventEmitter?: unknown ); // TODO:
//     getSSRCOwner: ( ssrc: number ) => string | null;
//     getPeerMediaInfo: ( owner: string, mediaType: MediaType ) => PeerMediaInfo | null;
//   }

//   export interface SignalingLayerImpl {
//     setChatRoom: ( room: ChatRoom ) => void;
//     getPeerMediaInfo: ( owner: string, mediaType: MediaType ) => PeerMediaInfo | null;
//     getSSRCOwner: ( ssrc: number ) => string | null;
//     removeSSRCOwners: (ssrcList: Array<number> ) => void;
//     setSSRCOwner: ( ssrc: number, endpointId: string ) => void;
//     updateSsrcOwnersOnLeave: ( id: string ) => void;
//   }

  
//   export interface JitsiTrack {
//     // constructor( conference: JitsiConference, stream: unknown, track: unknown, streamInactiveHandler: unknown, trackMediaType: MediaType, videoType: VideoType ); // TODO:
//     readonly conference: null | JitsiConference;
//     disposed: boolean;
//     getVideoType: () => VideoType;
//     getType: () => MediaType;
//     isAudioTrack: () => boolean;
//     isWebRTCTrackMuted: () => boolean;
//     isVideoTrack: () => boolean;
//     isLocal: () => boolean;
//     isLocalAudioTrack: () => boolean;
//     getOriginalStream: () => MediaStream;
//     getStreamId: () => string | null;
//     getTrack: () => MediaStreamTrack;
//     getTrackLabel: () => string;
//     getTrackId: () => string | null;
//     getUsageLabel: () => string;
//     attach: ( container: HTMLElement ) => void;
//     detach: ( container: HTMLElement ) => void;
//     dispose: () => void;
//     isScreenSharing: () => boolean;
//     getId: () => string | null;
//     isActive: () => boolean;
//     setAudioLevel: ( audioLevel: number, tpc: TraceablePeerConnection ) => void;
//     setAudioOutput: ( audioOutputDeviceId: '' | string ) => Promise<unknown>; // TODO: what will this promise contain?
//     addEventListener: (type: string, listener: (event: any) => void) => void;
//   }


//   export interface JitsiRemoteTrack extends JitsiTrack {
//     // constructor(rtc: RTC, conference: JitsiConference, ownerEndpointId: string, stream: MediaStream, track: MediaStreamTrack, mediaType: any, videoType: any, ssrc: number, muted: boolean, isP2P: boolean);
//     readonly conference: JitsiConference;
//     setMute: ( value: boolean ) => void;
//     isMuted: () => boolean;
//     getParticipantId: () => string;
//     isLocal: () => false;
//     getSSRC: () => number;
//     toString: () => string;
//     getSourceName: () => string;
//     getTrackStreamingStatus: () => string;
//     _setTrackStreamingStatus: (newStatus: string) => void;
//     _clearEnteredForwardedSourcesTimestamp: () => void;
//     _setEnteredForwardedSourcesTimestamp: (timestamp: number) => void;
//     _getEnteredForwardedSourcesTimestamp: () => number | null;
  
//     containerEvents: [ 'abort', 'canplay', 'canplaythrough', 'emptied', 'ended', 'error', 'loadeddata',
//       'loadedmetadata', 'loadstart', 'pause', 'play', 'playing', 'ratechange', 'stalled', 'suspend',
//       'waiting' ]; // TODO: this might be private
//   }

//   export interface TPCUtils {
//     // constructor(peerconnection: unknown, videoBitrates: unknown); // TODO:
//     ensureCorrectOrderOfSsrcs: ( description: unknown ) => RTCSessionDescription; // TODO:
//     insertUnifiedPlanSimulcastReceive: ( desc: { type: string, sdp: string } ) => RTCSessionDescription;
//     addTrack: ( localTrack: JitsiLocalTrack, isInitiator: boolean ) => void;
//     addTrackUnmute: ( localTrack: JitsiLocalTrack ) => Promise<void>;
//     getLocalStreamHeightConstraints: ( localTrack: JitsiLocalTrack ) => number[];
//     removeTrackMute: ( localTrack: JitsiLocalTrack ) => Promise<void>;
//     replaceTrack: ( oldTrack: JitsiLocalTrack, newTrack: JitsiLocalTrack ) => Promise<void>;
//     setMediaTransferActive: ( active: boolean ) => void;
//     setVideoTransferActive: ( active: boolean ) => void;
//     updateEncodingsResolution: ( parameters: RTCRtpEncodingParameters ) => void;
//   }

//   export type TPCSourceInfo = object;


// //   export default function TraceablePeerConnection( rtc: RTC, id: number, signalingLayer: unknown, iceConfig: unknown, constraints: unknown, isP2P: boolean, options: {
// //     disableSimulcast: boolean;
// //     disableRtx: boolean;
// //     disabledCodec: string;
// //     preferredCodec: string;
// //     startSilent: boolean;
// //   } ): void; // TODO:
  
//   export interface TraceablePeerConnection {
//     audioTransferActive: boolean;
//     videoTransferActive: boolean;
//     id: number;
//     isP2P: boolean;
//     remoteTracks: Map<number, Map<MediaType, JitsiRemoteTrack>>; // TODO:
//     localTracks: Map<number, JitsiLocalTrack>; // TODO:
//     localSSRCs: Map<number, {
//       /**
//        * an array which holds all track's SSRCs
//        */
//       ssrcs: Array<number>;
//       /**
//        * an array stores all track's SSRC
//        * groups
//        */
//       groups: {
//         /**
//          * the SSRC groups semantics
//          */
//         semantics: string;
//         /**
//          * group's SSRCs in order where the first
//          * one is group's primary SSRC, the second one is secondary (RTX) and so
//          * on...
//          */
//         ssrcs: Array<number>;
//       }[];
//     }>;
//     localUfrag: unknown; // TODO:
//     signalingLayer: SignalingLayer; // TODO:
//     options: unknown; // TODO:
//     peerconnection: RTCPeerConnection; // TODO: JSDocs refers to RTCPeerConnectionType = RTCPeerConnection
//     videoBitrates: unknown; // TODO:
//     tpcUtils: TPCUtils;
//     updateLog: Array<unknown>; // TODO:
//     stats: unknown; // TODO:
//     statsinterval: number;
//     maxstats: unknown; // TODO:
//     interop: unknown; // TODO: unknown = Interop refers to @jitsi/sdp-interop
//     simulcast: unknown; // TODO: unknown = Simulcast refers to @jitsi/sdp-simulcast
//     localSdpMunger: LocalSdpMunger; // TODO:
//     eventEmitter: unknown; // TODO:
//     rtxModifier: RtxModifier; // TODO:
//     senderVideoMaxHeight: unknown;
//     trace: ( what: unknown, info: unknown ) => void; // TODO:
//     onicecandidate: unknown; // TODO:
//     onsignalingstatechange: unknown; // TODO:
//     oniceconnectionstatechange: unknown; // TODO:
//     onnegotiationneeded: unknown; // TODO:
//     ondatachannel: unknown; // TODO:
//     getConnectionState: () => string;
//     isSpatialScalabilityOn: () => boolean;
//     getAudioLevels: ( speakerList?: Array<unknown> ) => Map<string, number>; // TODO:
//     getLocalTracks: ( mediaType: MediaType ) => JitsiLocalTrack[];
//     getLocalVideoTrack: () => JitsiLocalTrack | undefined;
//     hasAnyTracksOfType: ( mediaType: MediaType ) => boolean;
//     getRemoteTracks: ( endpointId: string, mediaType: MediaType ) => JitsiRemoteTrack[];
//     getRemoteSourceInfoByParticipant: ( id: string ) => Map<string, TPCSourceInfo>; // TODO:
//     getTargetVideoBitrates: () => unknown; // TODO:
//     getTrackBySSRC: ( ssrc: number ) => JitsiTrack | null;
//     getSsrcByTrackId: ( id: string ) => number | null;
//     removeRemoteTracks: ( owner: string ) => JitsiRemoteTrack[];
//     getLocalSSRC: ( localTrack: JitsiLocalTrack ) => string;
//     signalingState: unknown; // TODO:
//     iceConnectionState: unknown; // TODO:
//     localDescription: unknown; // TODO:
//     remoteDescription: unknown; // TODO:
//     addTrack: ( track: JitsiLocalTrack, isInitiator?: boolean ) => Promise<void>;
//     addTrackUnmute: ( track: JitsiLocalTrack ) => Promise<boolean>;
//     getConfiguredVideoCodec: () => CodecMimeType;
//     setDesktopSharingFrameRate: (maxFps: number) => void;
//     setVideoCodecs: ( preferredCodec?: CodecMimeType, disabledCodec?: CodecMimeType ) => void;
//     removeTrack: ( localTrack: JitsiLocalTrack ) => void;
//     findSenderByKind: ( mediaType: MediaType ) => RTCRtpSender | undefined; // TODO: possible bug in the JSDocs
//     findReceiverForTrack: ( track: MediaStreamTrack ) => RTCRtpReceiver | undefined;
//     findSenderForTrack: ( track: MediaStreamTrack ) => RTCRtpSender | undefined;
//     processLocalSdpForTransceiverInfo: ( localTracks: Array<JitsiLocalTrack> ) => void;
//     replaceTrack: ( oldTrack: JitsiLocalTrack | null, newTrack: JitsiLocalTrack | null ) => Promise<boolean>;
//     removeTrackMute: ( localTrack: JitsiLocalTrack ) => Promise<boolean>;
//     createDataChannel: ( label: unknown, opts: unknown ) => unknown; // TODO:
//     setLocalDescription: ( description: unknown ) => Promise<unknown>;
//     setSenderVideoDegradationPreference: () => Promise<void>;
//     setMaxBitRate: () => Promise<void>; // TODO: definite bug in the JSDocs
//     setRemoteDescription: ( description: unknown ) => unknown; // TODO:
//     setSenderVideoConstraint: ( frameHeight: number ) => Promise<void>;
//     setVideoTransferActive: ( active: boolean ) => boolean;
//     sendTones: ( tones: string, duration: number, interToneGap: number ) => void;
//     close: () => void;
//     createAnswer: ( constraints: unknown ) => unknown; // TODO:
//     createOffer: ( constraints: unknown ) => unknown; // TODO:
//     addIceCandidate: ( candidate: unknown ) => unknown; // TODO:
//     getStats: () => unknown; // TODO:
//     toString: () => string;
//   }

  
// export interface JitsiLocalTrack extends JitsiTrack {
//     // constructor( trackInfo: { rtcId: number, stream: unknown, track: unknown, mediaType: unknown, videoType: unknown, effects: unknown, resolution: unknown, deviceId: string, facingMode: CameraFacingMode, sourceId: unknown } ) // TODO:
//     isEnded: () => boolean;
//     setEffect: ( effect: unknown ) => Promise<unknown>; // TODO:
//     mute: () => Promise<void>;
//     unmute: () => Promise<void>;
//     dispose: () => Promise<void>;
//     isMuted: () => boolean;
//     isLocal: () => true;
//     getDeviceId: () => string;
//     getParticipantId: () => string;
//     getCameraFacingMode: () => CameraFacingMode | undefined;
//     stopStream: () => void;
//     isReceivingData: () => boolean;
//     toString: () => string;
//   }

//   export interface RTC extends Listenable {
//     destroy: () => void;
//     // static createLocalTracks: ( tracksInfo: unknown[] ) => JitsiLocalTrack[]; // TODO:
//     // static obtainAudioAndVideoPermissions: ( options: { devices: unknown[], resolution: string, cameraDeviceId: string, micDeviceId: string } ) => Promise<unknown>; // TODO:
//     initializeBridgeChannel: ( perrconnection: RTCPeerConnection, wsUrl: string ) => void;
//     onCallEnded: () => void;
//     setDesktopSharingFrameRate: (maxFps: number) => void;
//     // static addListener: ( eventType: string, listener: unknown ) => void; // TODO: this should be typed to an enum of eventTypes with appropriate definition for the listeners
//     // static removeListener: ( eventType: string, listener: unknown ) => void; // TODO: this should be typed to an enum of eventTypes with appropriate definition for the listeners
//     // static init: ( options: unknown ) => unknown; // TODO:
//     createPeerConnection: ( signalling: SignalingLayer, iceConfig: unknown, isP2P: boolean, options: { enableInsertableStreams: boolean, disableSimulcast: boolean, disableRtx: boolean, startSilent: boolean } ) => TraceablePeerConnection; // TODO:
//     addLocalTrack: ( track: unknown ) => void; // TODO:
//     getLocalVideoTrack: () => JitsiLocalTrack | undefined;
//     getLocalAudioTrack: () => JitsiLocalTrack | undefined;
//     getLocalEndpointId: () => string;
//     getLocalTracks: ( mediaType: MediaType ) => JitsiLocalTrack[];
//     getRemoteTracks: ( mediaType: MediaType ) => JitsiRemoteTrack[];
//     setAudioMute: ( value: unknown ) => Promise<unknown>; // TODO:
//     removeLocalTrack: ( track: unknown ) => void; // TODO:
//     // static attachMediaStream: ( elSelector: unknown, stream: unknown ) => unknown; // TODO:
//     // static isDeviceListAvailable: () => unknown; // TODO:
//     // static isDeviceChangeAvailable: ( deviceType: string ) => boolean; // TODO: check if deviceType should be an enum
//     // static isWebRtcSupported: () => boolean;
//     // static getAudioOutputDevice: () => string;
//     // static getCurrentlyAvailableMediaDevices: () => unknown[]; // TODO:
//     // static getEventDataForActiveDevice: () => MediaDeviceInfo;
//     // static setAudioOutputDevice: ( deviceId: string ) => Promise<unknown>; // TODO:
//     // static enumerateDevices: ( callback: () => unknown ) => void; // TODO:
//     // static stopMediaStream: ( mediaStream: MediaStream ) => void;
//     // static isDesktopSharingEnabled: () => boolean;
//     closeBridgeChannel: () => void;
//     setAudioLevel: ( tpc: TraceablePeerConnection, ssrc: number, audioLevel: number, isLocal: boolean ) => void;
//     sendChannelMessage: ( to: string, payload: unknown ) => void; // TODO:
//     setLastN: ( value: number ) => void;
//     isInForwardedSources: ( sourceName: string ) => boolean;
//     setReceiverVideoConstraints: ( constraints: unknown ) => void; // TODO:
//     setVideoMute: ( value: unknown ) => Promise<unknown>; // TODO:
//     sendEndpointStatsMessage: ( payload: unknown ) => void; // TODO:
//   }
  
  

// export interface JingleSession extends Listenable {
//     // constructor( sid: string, localJid: string, remoteJid: string, connection: XmppConnection, mediaConstraints: unknown, iceConfig: unknown, isInitiator: boolean ); // TODO:
//     initiatorJid: () => string;
//     responderJid: () => string;
//     initialize: ( room: ChatRoom, rtc: RTC, options: unknown ) => void; // TODO:
//     doInitialize: ( options: unknown ) => void; // TODO:
//     addIceCandidates: ( contents: unknown ) => void; // TODO:
//     getState: () => JingleSessionState;
//     addSources: ( contents: unknown ) => void; // TODO:
//     removeSources: ( contents: unknown ) => void; // TODO:
//     terminate: ( success: ( params: unknown ) => unknown, failure: ( params: unknown ) => unknown, options: { reason: string, reasonDescription: string, requestRestart?: boolean, sendSessionTerminate?: boolean } ) => void; // TODO:
//     acceptOffer: ( jingle: JQuery, success: ( params: unknown ) => unknown, failure: ( params: unknown ) => unknown ) => void; // TODO:
//   }

//   export interface Lobby {
//     // constructor( room: ChatRoom );
//     isSupported: () => boolean;
//     enable: () => Promise<unknown>; // TODO:
//     disable: () => void;
//     setLobbyRoomJid: ( jid: string ) => void;
//     join: ( displayName: string, email?: string ) => Promise<unknown>; // TODO:
//     denyAccess: ( id: string ) => void;
//     approveAccess: ( id: string ) => void;
//   }
  

  
//   export interface ChatRoom extends Listenable {
//     // constructor( connection: XmppConnection, jid: string, password: string, XMPP: unknown, options?: { disableFocus?: boolean, disableDiscoInfo?: boolean, enableLobby?: boolean } );
//     initPresenceMap: ( options?: { statsId: string, deploymentInfo?: { userRegion: string } } ) => void; // TODO: check the options
//     join: ( password: string, replaceParticipant?: boolean ) => Promise<unknown>; // TODO:
//     sendPresence: ( fromJoin: boolean ) => void;
//     doLeave: ( reason?: string ) => void;
//     discoRoomInfo: () => unknown;
//     setMeetingId: ( meetingId: string ) => void;
//     createNonAnonymousRoom: () => void;
//     onConnStatusChanged: ( status: Strophe.Status ) => void;
//     onPresence: ( pres: unknown ) => void; // TODO:
//     setParticipantPropertyListener: ( listener: unknown ) => void; // TODO:
//     processNode: ( node: unknown, from: unknown ) => void; // TODO:
//     sendMessage: ( message: unknown, elementName: string ) => void; // TODO:
//     sendPrivateMessage: ( id: unknown, message: unknown, elementName: string ) => void; // TODO:
//     setSubject: ( subject: string ) => void;
//     onParticipantLeft: ( jid: string, skipEvents?: boolean, reason?: string ) => void;
//     onPresenceUnavailable: ( pres: unknown, from: unknown ) => void; // TODO:
//     onMessage: ( msg: unknown, from: unknown ) => void; // TODO:
//     onPresenceError: ( pres: unknown, from: unknown ) => void; // TODO:
//     setAffiliation: ( jid: string, affiliation: unknown ) => void; // TODO:
//     kick: ( jid: string, reason?: string ) => void; // TODO:
//     lockRoom: ( key: string, onSuccess: unknown, onError: unknown, onNotSupported: unknown ) => void; // TODO:
//     setMembersOnly: ( enabled: boolean, onSuccess: unknown, onError: unknown ) => void; // TODO:
//     addToPresence: ( key: unknown, values: unknown ) => unknown; // TODO:
//     getFromPresence: ( key: unknown ) => void; // TODO:
//     removeFromPresence: ( key: unknown ) => void; // TODO:
//     addPresenceListener: ( name: string, handler: ( params: unknown ) => unknown ) => void; // TODO:
//     removePresenceListener: ( name: string, handler: ( params: unknown ) => unknown ) => void; // TODO:
//     isFocus: ( mucJid: string ) => boolean | null;
//     isModerator: () => boolean;
//     getMemberRole: ( peerJid: string ) => string | null;
//     setVideoMute: ( mute: unknown, callback: ( params: unknown ) => unknown ) => void; // TODO:
//     setAudioMute: ( mute: unknown, callback: ( params: unknown ) => unknown ) => void; // TODO:
//     addAudioInfoToPresence: ( mute: unknown ) => void; // TODO:
//     sendAudioInfoPresence: ( mute: unknown, callback: ( params: unknown ) => unknown ) => void; // TODO:
//     addVideoInfoToPresence: ( mute: unknown ) => void; // TODO:
//     sendVideoInfoPresence: ( mute: unknown ) => void; // TODO:
//     isSIPCallingSupported: () => boolean;
//     dial: ( number: string ) => unknown; // TODO:
//     hangup: () => unknown; // TODO:
//     getLobby: () => Lobby;
//     getAVModeration(): AVModeration;
//     getPhoneNumber: () => string;
//     getPhonePin: () => string;
//     getMeetingId: () => string;
//     muteParticipant: ( jid: string, mute: unknown ) => void; // TODO:
//     onMuteVideo: ( iq: unknown ) => void; // TODO:
//     onMute: ( iq: unknown ) => void; // TODO:
//     clean: () => void;
//     leave: ( reason?: string ) => Promise<unknown>; // TODO:
//     end: () => void;
//   }
  
  

// export interface JingleSessionPC extends JingleSession {
//     // static parseVideoSenders: ( jingleContents: JQuery ) => string | null;
//     // constructor( sid: string, localJid: string, remoteJid: string, connection: XmppConnection, mediaConstraints: unknown, iceConfig: unknown, isP2P: boolean, isInitiator: boolean ); // TODO:
//     //doInitialize: ( options: {} ) => void;
//     sendIceCandidate: ( candidate: RTCIceCandidate ) => void;
//     sendIceCandidates: ( candidates: RTCIceCandidate[] ) => void;
//     addIceCandidates: ( elem: unknown ) => void; // TODO:
//     getConfiguredVideoCodec: () => CodecMimeType;
//     acceptOffer: ( jingleOffer: JQuery, success: ( params: unknown ) => unknown, failure: ( params: unknown ) => unknown, localTracks?: JitsiLocalTrack[] ) => void; // TODO:
//     invite: ( localTracks?: JitsiLocalTrack[] ) => void;
//     sendSessionInitiate: ( offerSdp: string ) => void;
//     setAnswer: ( jingleAnswer: unknown ) => void; // TODO:
//     setOfferAnswerCycle: ( jingleOfferAnswerIq: JQuery, success: ( params: unknown ) => unknown, failure: ( params: unknown ) => unknown, localTracks?: JitsiLocalTrack[] ) => void; // TODO:
//     setVideoCodecs: ( preferred?: CodecMimeType, disabled?: CodecMimeType ) => void;
//     setReceiverVideoConstraint: ( maxFrameHeight: number ) => void;
//     setSenderMaxBitrates: () => Promise<void>;
//     setSenderVideoConstraint: ( maxFrameHeight: number ) => Promise<unknown>; // TODO:
//     setSenderVideoDegradationPreference: () => Promise<void>;
//     terminate: ( success: ( params: unknown ) => unknown, failure: ( params: unknown ) => unknown, options: { reason: string, reasonDescription: string, requestRestart?: boolean, sendSessionTerminate?: boolean } ) => void; // TODO:
//     onTerminated: ( reasonCondition: unknown, reasonText: unknown ) => void; // TODO:
//     onXmppStatusChanged: ( status: Strophe.Status ) => void;
//     addRemoteStream: ( elem: unknown ) => void; // TODO:
//     removeRemoteStream: ( elem: unknown ) => void; // TODO:
//     removeRemoteStreamsOnLeave: ( id: string ) => Promise<JitsiRemoteTrack>;
//     replaceTrack: ( oldTrack: JitsiLocalTrack | null, newTrack: JitsiLocalTrack | null ) => Promise<unknown>; // TODO:
//     addTrackAsUnmute: ( track: JitsiLocalTrack ) => Promise<unknown>; // TODO:
//     removeTrackAsMute: ( track: JitsiLocalTrack ) => Promise<unknown>; // TODO:
//     setMediaTransferActive: ( videoActive: boolean ) => Promise<unknown>; // TODO:
//     modifyContents: ( jingleContents: JQuery ) => void;
//     notifyMySSRCUpdate: ( oldSDP: unknown, newSDP: unknown ) => void; // TODO:
//     newJingleErrorHandler: ( request: unknown, failureCb: ( error: Error ) => void ) => ( this: JingleSessionPC ) => unknown; // TODO:
//     getIceConnectionState: () => unknown; // TODO:
//     close: () => void;
//     toString: () => string;
//   }
  

// export interface JitsiConnection {
//     connect: ( options: unknown ) => void; // TODO:
//     attach: ( options: unknown ) => void; // TODO:
//     disconnect: ( ...args: unknown[] ) => Promise<unknown>; // TODO:
//     getJid: () => string;
//     setToken: ( token: unknown ) => void;
//     initJitsiConference: ( name: string, options: JitsiConferenceOptions ) => JitsiConference;
//     addEventListener: ( event: JitsiConnectionEvents, listener: unknown ) => void; // TODO:
//     removeEventListener: ( event: JitsiConnectionEvents, listener: unknown ) => void; // TODO:
//     getConnectionTimes: () => number; // TODO: check
//     addFeature: ( feature: string, submit?: boolean ) => void;
//     removeFeature: ( feature: string, submit?: boolean ) => void;
//     getLogs: () => unknown | { metadata: { time: Date, url: string, ua: string, xmpp?: unknown } }; // TODO:
//   }

//   type JQuery = object;
  

//   export interface JitsiConference {
//     join(password: string, replaceParticipant?: boolean): void;
//     authenticateAndUpgradeRole: ( options: unknown ) => Promise<unknown>; // TODO:
//     isJoined: () => boolean;
//     isP2PEnabled: () => boolean;
//     isP2PTestModeEnabled: () => boolean;
//     leave: ( reason?: string ) => Promise<unknown>; // TODO:
//     isEndConferenceSupported: () => boolean;
//     end: () => void;
//     getActiveMediaSession: () => JingleSessionPC | undefined;
//     getMediaSessions: () => JingleSessionPC[];
//     getName: () => string;
//     getConnection: () => JitsiConnection;
//     isAuthEnabled: () => boolean;
//     isLoggedIn: () => boolean;
//     getAuthLogin: () => unknown; // TODO:
//     isExternalAuthEnabled: () => boolean;
//     getExternalAuthUrl: ( urlForPopup: boolean ) => Promise<unknown>; // TODO: probably returns a Promise<string>
//     getLocalTracks: ( mediaType: MediaType ) => JitsiLocalTrack[];
//     getLocalAudioTrack: () => JitsiLocalTrack | null;
//     getLocalVideoTrack: () => JitsiLocalTrack | null;
//     getPerformanceStats: () => unknown | null; // TODO:
//     on: ( eventId: JitsiConferenceEvents, handler: (...args: unknown[]) => unknown ) => void; // TODO:
//     once: ( eventId: JitsiConferenceEvents, handler: (...args: unknown[]) => unknown ) => void; // TODO:
//     off: ( eventId: JitsiConferenceEvents, handler: (...args: unknown[]) => unknown ) => void; // TODO:
//     addEventListener: ( eventId: JitsiConferenceEvents, handler: (...args: any[]) => unknown ) => void; // TODO:
//     removeEventListener: ( eventId: JitsiConferenceEvents, handler: (...args: any[]) => unknown ) => void; // TODO:
//     addCommandListener: ( command: string, handler: () => unknown ) => void; // TODO:
//     removeCommandListener: ( command: string, handler: () => unknown ) => void; // TODO:
//     // sendTextMessage: (message: string, elementName: string) => void; // obsolete
//     // sendPrivateTextMessage: (id: string, message: string, elementName: string) => void; // obsolete
//     sendCommand: ( name: string, values: unknown ) => void; // TODO:
//     sendCommandOnce: ( name: string, values: unknown ) => void; // TODO:
//     removeCommand: ( name: string ) => void;
//     setDisplayName: ( name: string ) => void;
//     setSubject: ( name: string ) => void;
//     getTranscriptionStatus: () => 'on' | 'off';
//     addTrack: ( track: JitsiLocalTrack ) => Promise<JitsiLocalTrack>;
//     onLocalTrackRemoved: ( track: JitsiLocalTrack ) => void;
//     removeTrack: ( track: JitsiLocalTrack ) => void;
//     replaceTrack: ( oldTrack: JitsiLocalTrack, newTrack: JitsiLocalTrack ) => Promise<unknown | JitsiTrackError>;
//     getRole: () => string;
//     isHidden: () => boolean | null;
//     isModerator: () => boolean | null;
//     lock: ( password: string ) => Promise<unknown | Error>;
//     unlock: () => Promise<unknown | Error>;
//     getLastN: () => number;
//     setLastN: ( lastN: number ) => void;
//     getParticipants: () => JitsiParticipant[];
//     getParticipantCount: ( countHidden?: boolean ) => number;
//     getParticipantById: ( id: string ) => JitsiParticipant;
//     grantOwner: ( id: string ) => void;
//     revokeOwner: ( id: string ) => void;
//     kickParticipant: ( id: string, reason?: string ) => void;
//     muteParticipant: ( id: string, mediaType?: MediaType ) => void;
//     onMemberJoined: ( jid: string, nick: string, role: string, isHidden: boolean, statsID?: unknown, status?: string, identity?: unknown, botType?: unknown, fullJid?: string, features?: unknown, isReplaceParticipant?: boolean ) => void;
//     onMemberLeft: ( jid: string, reason?: string ) => void;
//     onMemberKicked: ( isSelfPresence: boolean, actorId: string, kickedParticipantId?: string, reason?: string, isReplaceParticipant?: boolean ) => void;
//     onLocalRoleChanged: ( role: string ) => void;
//     onUserRoleChanged: ( jid: string, role: string ) => void;
//     onDisplayNameChanged: ( jid: string, displayName: string ) => void;
//     onRemoteTrackAdded: ( track: JitsiRemoteTrack ) => void;
//     onCallAccepted: ( session: unknown, answer: JQuery ) => void; // TODO: answer is a jQuery object, unknown = JingleSessionPC which doesn't exist
//     onTransportInfo: ( session: unknown, transportInfo: JQuery ) => void; // TODO: transportInfo is a jQuery object, unknown = JingleSessionPC which doesn't exist
//     onRemoteTrackRemoved: ( removedTrack: JitsiRemoteTrack ) => void;
//     onIncomingCall: ( jingleSession: unknown, jingleOffer: unknown, now: unknown ) => void; // TODO: unknown = JingleSessionPC which doesn't exist
//     onCallEnded: ( jingleSession: unknown, reasonCondition: string, reasonText: string ) => void; // TODO: unknown = JingleSessionPC which doesn't exist
//     onSuspendDetected: ( jingleSession: unknown ) => void; // TODO: unknown = JingleSessionPC which doesn't exist
//     updateDTMFSupport: () => void;
//     isDTMFSupported: () => boolean;
//     myUserId: () => string;
//     sendTones: ( tones: unknown, duration: unknown, pause: unknown ) => void; // TODO:
//     startRecording: ( options: unknown ) => Promise<unknown>;
//     stopRecording: ( sessionID: string ) => Promise<unknown>;
//     isSIPCallingSupported: () => boolean;
//     dial: ( number: string ) => Promise<unknown>;
//     hangup: () => Promise<unknown>;
//     getPhoneNumber: () => string | null;
//     getPhonePin: () => string | null;
//     getMeetingUniqueId: () => string | undefined;
//     getActivePeerConnection: () => TraceablePeerConnection | null;
//     getConnectionState: () => string | null;
//     setStartMutedPolicy: ( policy: { audio: boolean, video: boolean } ) => void;
//     getStartMutedPolicy: () => { audio: boolean, video: boolean };
//     isStartAudioMuted: () => boolean;
//     isStartVideoMuted: () => boolean;
//     getConnectionTimes: () => unknown;
//     setLocalParticipantProperty: ( name: string, value: unknown ) => void;
//     removeLocalParticipantProperty: ( name: string ) => void;
//     getLocalParticipantProperty: ( name: string ) => unknown;
//     sendFeedback: ( overallFeedback: number, detailedFeedback: unknown ) => Promise<unknown>;
//     isCallstatsEnabled: () => boolean;
//     getSsrcByTrack: ( track: JitsiTrack ) => number | undefined;
//     sendApplicationLog: ( message: string ) => void;
//     // sendEndpointMessage: (to: string, payload: unknown) => unknown; // TODO: deprecated
//     // broadcastEndpointMessage: (payload: unknown) => void; // TODO: deprecated
//     sendEndpointStatsMessage: ( payload: unknown ) => void; // TODO:
//     sendMessage: ( message: string | unknown, to?: string, sendThroughVideobridge?: boolean ) => void; // TODO: JSDoc is incorrect
//     isConnectionInterrupted: () => boolean;
//     getProperty: ( key: string ) => unknown; // TODO:
//     isP2PActive: () => boolean;
//     getP2PConnectionState: () => string | null;
//     setDesktopSharingFrameRate: (maxFps: number) => boolean;
//     startP2PSession: () => void;
//     stopP2PSession: () => void;
//     getSpeakerStats: () => unknown; // TODO:
//     setReceiverConstraints: ( videoConstraints: unknown ) => void; // TODO:
//     setReceiverVideoConstraint: ( maxFrameHeight: number ) => void;
//     setSenderVideoConstraint: ( maxFrameHeight: number ) => Promise<unknown>; // TODO:
//     isE2EEEnabled: () => boolean;
//     createVideoSIPGWSession: ( sipAddress: string, displayName: string ) => JitsiVideoSIPGWSession | Error;
//     toggleE2EE: ( enabled: boolean ) => void;
//     isLobbySupported: () => boolean;
//     isMembersOnly: () => boolean;
//     enableLobby: () => Promise<unknown>;
//     disableLobby: () => void;
//     joinLobby: ( displayName: string, email: string ) => Promise<never>;
//     lobbyDenyAccess: ( id: string ) => void;
//     lobbyApproveAccess: ( id: string ) => void;
//     isAVModerationSupported(): boolean;
//     enableAVModeration: ( mediaType: MediaType ) => void;
//     disableAVModeration: ( mediaType: MediaType ) => void;
//     avModerationApprove: ( mediaType: MediaType, id: string ) => void;
//   }
  