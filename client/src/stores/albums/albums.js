import { defineStore } from "pinia";
import axios from 'axios'

import { useAuthStore } from "@/stores/auth/auth";

const serverUrl = import.meta.env.VITE_SERVER_URL;

import { mapActions, mapState } from "pinia";
export const useAlbumStore = defineStore({
    id: "album",
    state: () => ({
        albums: null,
    }),
    actions: {
        async getAlbum(albumId) {
            const res = await axios.get(`${serverUrl}/users/${this.user._id}/albums/${albumId}`, { params: { token: this.token } })
            return res.data
        },
        async getAlbumsData() {
            const authStore = useAuthStore()
            const res = await axios.get(`${serverUrl}/users/${authStore.user._id}/albums`, { params: { token: authStore.token } })
            this.albums = res.data
            return res.data
        },
        async createPhoto(_, data) {
            // const {
            //     aws_user_files_s3_bucket_region: region,
            //     aws_user_files_s3_bucket: bucket
            // } = awsconfig;
            // const { file, type: mimeType, id } = data;
            // const extension = file.name.substr(file.name.lastIndexOf(".") + 1);
            // const photoId = uuid();
            // const key = `images/${photoId}.${extension}`;
            // const inputData = {
            //     id: photoId,
            //     photoAlbumId: id,
            //     contentType: mimeType,
            //     fullsize: {
            //         key,
            //         region,
            //         bucket
            //     }
            // }

            //s3 bucket storage add file to it
            try {
                // await Storage.put(key, file, {
                //     level: "protected",
                //     contentType: mimeType,
                //     metadata: { albumId: id, photoId }
                // })
                // await API.graphql(
                //     graphqlOperation(createPhotoMutation, { input: inputData })
                // )
                return Promise.resolve("success");


            } catch (error) {
                console.log("createPhoto error", error)
                return Promise.reject(error);

            }
        }

    },
});
