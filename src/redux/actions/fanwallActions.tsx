import { Dispatch } from "redux";
import {
    SET_LOADING_FALSE,
    SET_LOADING_TRUE,
    SET_FANWALL_INITIAL,
    SET_FANWALLS,
    SET_FANWALL,
    SET_FANWALL_WINOPTION,
    SET_FANWALL_TOPFANS,
    SET_USER
} from "../types";
import * as api from "../../api";

export const fanwallAction = {
    saveFanwall: (fanwall: any, daremeId: any, navigate: any) => async (dispatch: Dispatch<any>) => {
        dispatch({ type: SET_LOADING_TRUE });
        let result: any = null;
        let cover: any = null;
        if (fanwall.video) {
            if (fanwall.video.preview?.indexOf('uploads') === -1) {
                const formData = new FormData();
                formData.append("file", fanwall.video);
                const config = {
                    headers: { "content-type": "multipart/form-data" },
                };
                result = await api.uploadFanwall(formData, config);
            }
        }
        if (fanwall.cover) {
            if (fanwall.cover.preview?.indexOf('uploads') === -1) {
                const formData = new FormData();
                formData.append("file", fanwall.cover);
                const config = { headers: { "content-type": "multipart/form-data" } };
                cover = await api.selectCover(formData, config);
            }
        }
        api.saveFanwall({
            fanwallId: fanwall.id,
            daremeId: daremeId,
            sizeType: fanwall.sizeType,
            cover: cover?.data.success ? cover.data.path : fanwall.cover,
            video: result?.data.success ? result.data.path : fanwall.video,
            message: fanwall.message === "" ? null : fanwall.message,
            embedUrl: fanwall.embedUrl === "" ? null : fanwall.embedUrl,
            posted: fanwall.posted
        }).then((result) => {
            const { data } = result;
            if (data.success) {
                dispatch({ type: SET_LOADING_FALSE });
                navigate(`/dareme/result/${daremeId}`);
            }
        }).catch(err => console.log(err));
    },

    getPostDetail: (fanwallId: any) => async (dispatch: Dispatch<any>) => {
        dispatch({ type: SET_LOADING_TRUE });
        dispatch({ type: SET_FANWALL_INITIAL });
        api.getPostDetail(fanwallId)
            .then((result: any) => {
                const { data } = result;
                if (data.success) {
                    dispatch({ type: SET_FANWALL_TOPFANS, payload: data.topFuns });
                    dispatch({ type: SET_FANWALL, payload: data.fanwall });
                    dispatch({ type: SET_FANWALL_WINOPTION, payload: data.winOption });
                    dispatch({ type: SET_LOADING_FALSE });
                }
            }).catch((err: any) => console.log(err));
    },

    getFanwallsByPersonalUrl: (data: any) => async (dispatch: Dispatch<any>) => {
        dispatch({ type: SET_LOADING_TRUE });
        dispatch({ type: SET_FANWALL_INITIAL });
        api.getFanwallsByPersonalisedUrl({ url: data })
            .then((result: any) => {
                const { data } = result;
                if (data.success) {
                    dispatch({ type: SET_FANWALLS, payload: data.fanwalls });
                    dispatch({ type: SET_LOADING_FALSE });
                }
            }).catch((err: any) => console.log(err));
    },

    likeFanwall: (fanwallId: any) => async (dispatch: Dispatch<any>) => {
        dispatch({ type: SET_LOADING_TRUE });
        api.likeFanwall({ fanwallId: fanwallId })
            .then((result: any) => {
                const { data } = result;
                if (data.success) dispatch({ type: SET_FANWALL, payload: data.fanwall });
                dispatch({ type: SET_LOADING_FALSE });
            }).catch((err: any) => console.log(err));
    },

    unlockFanwall: (fanwallId: any) => async (dispatch: Dispatch<any>) => {
        dispatch({ type: SET_LOADING_TRUE });
        api.unlockFanwall({ fanwallId: fanwallId })
            .then((result) => {
                const { data } = result;
                if (data.success) {
                    dispatch({ type: SET_FANWALL, payload: data.fanwall });
                    dispatch({ type: SET_USER, payload: data.user });
                }
                dispatch({ type: SET_LOADING_FALSE });
            }).catch(err => console.log(err));
    },

    deleteFanwall: (fanwallId: any, navigate: any, url: any) => async (dispatch: Dispatch<any>) => {
        dispatch({ type: SET_LOADING_TRUE });
        api.deleteFanwall(fanwallId)
            .then((result) => {
                const { data } = result;
                if (data.success) {
                    dispatch({ type: SET_LOADING_FALSE });
                    navigate(url);
                }
            }).catch(err => console.log(err));
    }
};