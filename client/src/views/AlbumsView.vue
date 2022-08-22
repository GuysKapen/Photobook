<template>
  <div>
    <h3 class="text-3xl">Create Or Choose An Album</h3>
    <div class="flex flex-col m-auto w-64">
      <input
        class="
          my-4
          bg-gray-200
          appearance-none
          border-2 border-gray-200
          rounded
          w-full
          py-2
          px-4
          text-gray-700
          leading-tight
          focus:outline-none focus:bg-white focus:border-purple-500
        "
        placeholder="Album Name..."
        type="text"
        v-model="albumName"
      />
      <button class="btn-blue mb-4" @click="createAlbum()">Create Album</button>
    </div>
    <div class="text-red-500">{{ error }}</div>
    <hr />
    <h5 class="mt-4 text-2xl">List Of Albums</h5>
    <div class="flex flex-wrap w-full m-auto justify-center">
      <div
        v-for="(album, idx) in albums"
        :key="idx"
        class="
          cursor-pointer
          mt-4
          ml-4
          w-3/12
          h-24
          shadow-xl
          flex
          items-center
          justify-center
        "
        @click="openAlbumDetail(album)"
      >
        <div class="text-2xl">{{ album.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "@/stores/auth/auth";
import { useAlbumStore } from "@/stores/albums/albums";
import axios from "axios";
const serverUrl = import.meta.env.VITE_SERVER_URL;

export default {
  async mounted() {
    const albumStore = useAlbumStore();
    albumStore.getAlbumsData();
  },
  data: () => ({ albumName: "", error: "" }),
  methods: {
    openAlbumDetail(album) {
      this.$router.push(`/album/${album.id}`);
    },
    async createAlbum() {
      const albumStore = useAlbumStore();

      this.error = "";
      if (!this.albumName) {
        this.error = "Please enter an album name";
        return;
      }
      const newAlbum = {
        name: this.albumName,
        owner: this.user.id,
      };

      try {
        axios
          .post(`${serverUrl}/users/${this.user._id}/albums`, newAlbum, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
              "x-access-token": this.token,
            },
          })
          .then((res) => {
            albumStore.getAlbumsData();
            console.log("Albums", albumStore.albums);
          });
      } catch (error) {
        console.error("createalbum", error);
      }
    },
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
    ...mapState(useAuthStore, ["token"]),
    ...mapState(useAlbumStore, ["albums"]),
  },
};
</script>