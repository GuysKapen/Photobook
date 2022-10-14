<template>
  <div class="px-8">
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
    <div class="grid grid-cols-3 gap-12 w-9/12 mx-auto mt-8">
      <router-link
        v-for="(album, idx) in albums"
        :key="idx"
        :to="{ name: 'album-detail', params: { id: album._id } }"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <img
              src="https://i.pinimg.com/564x/d3/1a/6f/d31a6f22b8d115bc766cfeb284682060.jpg"
              alt="book"
              class="rounded-md w-32 h-48"
            />
          </div>
          <div class="ml-4">
            <div>
              <span class="material-symbols-outlined text-sm text-yellow-500">
                star
              </span>
              <span class="material-symbols-outlined text-sm text-yellow-500">
                star
              </span>
              <span class="material-symbols-outlined text-sm text-yellow-500">
                star
              </span>
              <span class="material-symbols-outlined text-sm text-yellow-500">
                star
              </span>
              <span class="material-symbols-outlined text-sm text-yellow-500"> star </span>
            </div>
            <h3 class="text-gray-800 text-base">False Witness: A Novel</h3>
            <p class="text-gray-400 text-sm mt-2 font-light">Karin Slugher</p>
            <div
              class="
                rounded-full
                border border-yellow-600
                text-yellow-600
                inline-block
                px-4
                py-1
                mt-8
              "
            >
              View
            </div>
          </div>
        </div>
      </router-link>
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