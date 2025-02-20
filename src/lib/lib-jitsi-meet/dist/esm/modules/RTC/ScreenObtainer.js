import JitsiTrackError from '../../JitsiTrackError';
import * as JitsiTrackErrors from '../../JitsiTrackErrors';
import browser from '../browser';
const logger = require('@jitsi/logger').getLogger(__filename);
/**
 * The default frame rate for Screen Sharing.
 */
export const SS_DEFAULT_FRAME_RATE = 5;
/**
 * Handles obtaining a stream from a screen capture on different browsers.
 */
const ScreenObtainer = {
    /**
     * If not <tt>null</tt> it means that the initialization process is still in
     * progress. It is used to make desktop stream request wait and continue
     * after it's done.
     * {@type Promise|null}
     */
    obtainStream: null,
    /**
     * Initializes the function used to obtain a screen capture
     * (this.obtainStream).
     *
     * @param {object} options
     */
    init(options = {}) {
        this.options = options;
        this.obtainStream = this._createObtainStreamMethod();
        if (!this.obtainStream) {
            logger.info('Desktop sharing disabled');
        }
    },
    /**
     * Returns a method which will be used to obtain the screen sharing stream
     * (based on the browser type).
     *
     * @returns {Function}
     * @private
     */
    _createObtainStreamMethod() {
        var _a;
        const supportsGetDisplayMedia = browser.supportsGetDisplayMedia();
        if (browser.isElectron() && !((_a = this.options.testing) === null || _a === void 0 ? void 0 : _a.electronUseGetDisplayMedia)) {
            return this.obtainScreenOnElectron;
        }
        else if (browser.isReactNative() && supportsGetDisplayMedia) {
            return this.obtainScreenFromGetDisplayMediaRN;
        }
        else if (supportsGetDisplayMedia) {
            return this.obtainScreenFromGetDisplayMedia;
        }
        logger.log('Screen sharing not supported on ', browser.getName());
        return null;
    },
    /**
     * Gets the appropriate constraints for audio sharing.
     *
     * @returns {Object|boolean}
     */
    _getAudioConstraints() {
        const { audioQuality } = this.options;
        const audio = (audioQuality === null || audioQuality === void 0 ? void 0 : audioQuality.stereo) ? {
            autoGainControl: false,
            channelCount: 2,
            echoCancellation: false,
            noiseSuppression: false
        } : true;
        return audio;
    },
    /**
     * Checks whether obtaining a screen capture is supported in the current
     * environment.
     * @returns {boolean}
     */
    isSupported() {
        return this.obtainStream !== null;
    },
    /**
     * Obtains a screen capture stream on Electron.
     *
     * @param onSuccess - Success callback.
     * @param onFailure - Failure callback.
     * @param {Object} options - Optional parameters.
     */
    obtainScreenOnElectron(onSuccess, onFailure, options = {}) {
        if (window.JitsiMeetScreenObtainer && window.JitsiMeetScreenObtainer.openDesktopPicker) {
            const { desktopSharingFrameRate, desktopSharingResolution, desktopSharingSources } = this.options;
            window.JitsiMeetScreenObtainer.openDesktopPicker({
                desktopSharingSources: options.desktopSharingSources || desktopSharingSources || ['screen', 'window']
            }, (streamId, streamType, screenShareAudio = false) => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                if (streamId) {
                    let audioConstraints = false;
                    if (screenShareAudio) {
                        audioConstraints = {};
                        const optionalConstraints = this._getAudioConstraints();
                        if (typeof optionalConstraints !== 'boolean') {
                            audioConstraints = {
                                optional: optionalConstraints
                            };
                        }
                        // Audio screen sharing for electron only works for screen type devices.
                        // i.e. when the user shares the whole desktop.
                        // Note. The documentation specifies that chromeMediaSourceId should not be present
                        // which, in the case a users has multiple monitors, leads to them being shared all
                        // at once. However we tested with chromeMediaSourceId present and it seems to be
                        // working properly.
                        if (streamType === 'screen') {
                            audioConstraints.mandatory = {
                                chromeMediaSource: 'desktop'
                            };
                        }
                    }
                    const constraints = {
                        audio: audioConstraints,
                        video: {
                            mandatory: {
                                chromeMediaSource: 'desktop',
                                chromeMediaSourceId: streamId,
                                minFrameRate: (_a = desktopSharingFrameRate === null || desktopSharingFrameRate === void 0 ? void 0 : desktopSharingFrameRate.min) !== null && _a !== void 0 ? _a : SS_DEFAULT_FRAME_RATE,
                                maxFrameRate: (_b = desktopSharingFrameRate === null || desktopSharingFrameRate === void 0 ? void 0 : desktopSharingFrameRate.max) !== null && _b !== void 0 ? _b : SS_DEFAULT_FRAME_RATE,
                                minWidth: (_c = desktopSharingResolution === null || desktopSharingResolution === void 0 ? void 0 : desktopSharingResolution.width) === null || _c === void 0 ? void 0 : _c.min,
                                minHeight: (_d = desktopSharingResolution === null || desktopSharingResolution === void 0 ? void 0 : desktopSharingResolution.height) === null || _d === void 0 ? void 0 : _d.min,
                                maxWidth: (_f = (_e = desktopSharingResolution === null || desktopSharingResolution === void 0 ? void 0 : desktopSharingResolution.width) === null || _e === void 0 ? void 0 : _e.max) !== null && _f !== void 0 ? _f : window.screen.width,
                                maxHeight: (_h = (_g = desktopSharingResolution === null || desktopSharingResolution === void 0 ? void 0 : desktopSharingResolution.height) === null || _g === void 0 ? void 0 : _g.max) !== null && _h !== void 0 ? _h : window.screen.height
                            }
                        }
                    };
                    // We have to use the old API on Electron to get a desktop stream.
                    navigator.mediaDevices.getUserMedia(constraints)
                        .then(stream => {
                        this.setContentHint(stream);
                        onSuccess({
                            stream,
                            sourceId: streamId,
                            sourceType: streamType
                        });
                    })
                        .catch(err => onFailure(err));
                }
                else {
                    // As noted in Chrome Desktop Capture API:
                    // If user didn't select any source (i.e. canceled the prompt)
                    // then the callback is called with an empty streamId.
                    onFailure(new JitsiTrackError(JitsiTrackErrors.SCREENSHARING_USER_CANCELED));
                }
            }, err => onFailure(new JitsiTrackError(JitsiTrackErrors.ELECTRON_DESKTOP_PICKER_ERROR, err)));
        }
        else {
            onFailure(new JitsiTrackError(JitsiTrackErrors.ELECTRON_DESKTOP_PICKER_NOT_FOUND));
        }
    },
    /**
     * Obtains a screen capture stream using getDisplayMedia.
     *
     * @param callback - The success callback.
     * @param errorCallback - The error callback.
     */
    obtainScreenFromGetDisplayMedia(callback, errorCallback) {
        let getDisplayMedia;
        if (navigator.getDisplayMedia) {
            getDisplayMedia = navigator.getDisplayMedia.bind(navigator);
        }
        else {
            // eslint-disable-next-line max-len
            getDisplayMedia = navigator.mediaDevices.getDisplayMedia.bind(navigator.mediaDevices);
        }
        const audio = this._getAudioConstraints();
        let video = {};
        const constraintOpts = {};
        const { desktopSharingFrameRate, screenShareSettings } = this.options;
        if (typeof desktopSharingFrameRate === 'object') {
            video.frameRate = desktopSharingFrameRate;
        }
        // At the time of this writing 'min' constraint for fps is not supported by getDisplayMedia on any of the
        // browsers. getDisplayMedia will fail with an error "invalid constraints" in this case.
        video.frameRate && delete video.frameRate.min;
        if (browser.isChromiumBased()) {
            // Show users the current tab is the preferred capture source, default: false.
            browser.isEngineVersionGreaterThan(93)
                && (constraintOpts.preferCurrentTab = (screenShareSettings === null || screenShareSettings === void 0 ? void 0 : screenShareSettings.desktopPreferCurrentTab) || false);
            // Allow users to select system audio, default: include.
            browser.isEngineVersionGreaterThan(104)
                && (constraintOpts.systemAudio = (screenShareSettings === null || screenShareSettings === void 0 ? void 0 : screenShareSettings.desktopSystemAudio) || 'include');
            // Allow users to seamlessly switch which tab they are sharing without having to select the tab again.
            browser.isEngineVersionGreaterThan(106)
                && (constraintOpts.surfaceSwitching = (screenShareSettings === null || screenShareSettings === void 0 ? void 0 : screenShareSettings.desktopSurfaceSwitching) || 'include');
            // Allow a user to be shown a preference for what screen is to be captured, default: unset.
            browser.isEngineVersionGreaterThan(106) && (screenShareSettings === null || screenShareSettings === void 0 ? void 0 : screenShareSettings.desktopDisplaySurface)
                && (video.displaySurface = screenShareSettings === null || screenShareSettings === void 0 ? void 0 : screenShareSettings.desktopDisplaySurface);
            // Allow users to select the current tab as a capture source, default: exclude.
            browser.isEngineVersionGreaterThan(111)
                && (constraintOpts.selfBrowserSurface = (screenShareSettings === null || screenShareSettings === void 0 ? void 0 : screenShareSettings.desktopSelfBrowserSurface) || 'exclude');
            // Set bogus resolution constraints to work around
            // https://bugs.chromium.org/p/chromium/issues/detail?id=1056311 for low fps screenshare. Capturing SS at
            // very high resolutions restricts the framerate. Therefore, skip this hack when capture fps > 5 fps.
            if (!((desktopSharingFrameRate === null || desktopSharingFrameRate === void 0 ? void 0 : desktopSharingFrameRate.max) > SS_DEFAULT_FRAME_RATE)) {
                video.height = 99999;
                video.width = 99999;
            }
        }
        // Allow a user to be shown a preference for what screen is to be captured.
        if (browser.isSafari() && (screenShareSettings === null || screenShareSettings === void 0 ? void 0 : screenShareSettings.desktopDisplaySurface)) {
            video.displaySurface = screenShareSettings === null || screenShareSettings === void 0 ? void 0 : screenShareSettings.desktopDisplaySurface;
        }
        if (Object.keys(video).length === 0) {
            video = true;
        }
        const constraints = Object.assign(Object.assign({ video,
            audio }, constraintOpts), { cursor: 'always' });
        logger.info('Using getDisplayMedia for screen sharing', constraints);
        getDisplayMedia(constraints)
            .then(stream => {
            this.setContentHint(stream);
            // Apply min fps constraints to the track so that 0Hz mode doesn't kick in.
            // https://bugs.chromium.org/p/webrtc/issues/detail?id=15539
            if (browser.isChromiumBased()) {
                const track = stream.getVideoTracks()[0];
                let minFps = SS_DEFAULT_FRAME_RATE;
                if (typeof (desktopSharingFrameRate === null || desktopSharingFrameRate === void 0 ? void 0 : desktopSharingFrameRate.min) === 'number' && desktopSharingFrameRate.min > 0) {
                    minFps = desktopSharingFrameRate.min;
                }
                const contraints = {
                    frameRate: {
                        min: minFps
                    }
                };
                try {
                    track.applyConstraints(contraints);
                }
                catch (err) {
                    logger.warn(`Min fps=${minFps} constraint could not be applied on the desktop track,`
                        + `${err.message}`);
                }
            }
            callback({
                stream,
                sourceId: stream.id
            });
        })
            .catch(error => {
            var _a;
            const errorDetails = {
                errorName: error === null || error === void 0 ? void 0 : error.name,
                errorMsg: error === null || error === void 0 ? void 0 : error.message,
                errorStack: error === null || error === void 0 ? void 0 : error.stack
            };
            logger.error('getDisplayMedia error', JSON.stringify(constraints), JSON.stringify(errorDetails));
            if (((_a = errorDetails.errorMsg) === null || _a === void 0 ? void 0 : _a.indexOf('denied by system')) !== -1) {
                // On Chrome this is the only thing different between error returned when user cancels
                // and when no permission was given on the OS level.
                errorCallback(new JitsiTrackError(JitsiTrackErrors.PERMISSION_DENIED));
                return;
            }
            else if (errorDetails.errorMsg === 'NotReadableError') {
                // This can happen under some weird conditions:
                //  - https://issues.chromium.org/issues/369103607
                //  - https://issues.chromium.org/issues/353555347
                errorCallback(new JitsiTrackError(JitsiTrackErrors.SCREENSHARING_GENERIC_ERROR));
                return;
            }
            errorCallback(new JitsiTrackError(JitsiTrackErrors.SCREENSHARING_USER_CANCELED));
        });
    },
    /**
     * Obtains a screen capture stream using getDisplayMedia.
     *
     * @param callback - The success callback.
     * @param errorCallback - The error callback.
     */
    obtainScreenFromGetDisplayMediaRN(callback, errorCallback) {
        logger.info('Using getDisplayMedia for screen sharing');
        navigator.mediaDevices.getDisplayMedia({ video: true })
            .then(stream => {
            this.setContentHint(stream);
            callback({
                stream,
                sourceId: stream.id
            });
        })
            .catch(() => {
            errorCallback(new JitsiTrackError(JitsiTrackErrors
                .SCREENSHARING_USER_CANCELED));
        });
    },
    /** Sets the contentHint on the transmitted MediaStreamTrack to indicate charaterstics in the video stream, which
     * informs RTCPeerConnection on how to encode the track (to prefer motion or individual frame detail).
     *
     * @param {MediaStream} stream - The captured desktop stream.
     * @returns {void}
     */
    setContentHint(stream) {
        const { desktopSharingFrameRate } = this.options;
        const desktopTrack = stream.getVideoTracks()[0];
        // Set contentHint on the desktop track based on the fps requested.
        if ('contentHint' in desktopTrack) {
            desktopTrack.contentHint = (desktopSharingFrameRate === null || desktopSharingFrameRate === void 0 ? void 0 : desktopSharingFrameRate.max) > SS_DEFAULT_FRAME_RATE ? 'motion' : 'detail';
        }
        else {
            logger.warn('MediaStreamTrack contentHint attribute not supported');
        }
    },
    /**
     * Sets the max frame rate to be used for a desktop track capture.
     *
     * @param {number} maxFps capture frame rate to be used for desktop tracks.
     * @returns {void}
     */
    setDesktopSharingFrameRate(maxFps) {
        logger.info(`Setting the desktop capture rate to ${maxFps}`);
        this.options.desktopSharingFrameRate = {
            min: SS_DEFAULT_FRAME_RATE,
            max: maxFps
        };
    }
};
export default ScreenObtainer;
//# sourceMappingURL=ScreenObtainer.js.map