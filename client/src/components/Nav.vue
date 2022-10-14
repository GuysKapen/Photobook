<template>
  <div>
    <ul class="flex justify-end">
      <li class="mr-6" v-if="!store.user">
        <router-link to="/login">
          <a class="text-blue-500 hover:text-blue-800 cursor-pointer">Login</a>
        </router-link>
      </li>
      <li class="mr-6" v-if="!store.user">
        <router-link to="/signup">
          <a class="text-blue-500 hover:text-blue-800 cursor-pointer"
            >Sign Up</a
          >
        </router-link>
      </li>
      <li class="mr-6" v-if="store.user">
        <div class="font-semibold text-black-500">
          <!-- Welcome {{ user.username }} -->
        </div>
      </li>
      <li class="mr-6" v-if="store.user">
        <router-link to="/albums">
          <div class="text-blue-500 hover:text-blue-800 cursor-pointer">
            Albums
          </div>
        </router-link>
      </li>
      <li class="mr-6" v-if="store.user">
        <div
          class="text-blue-500 hover:text-blue-800 cursor-pointer"
          @click="logout"
        >
          Logout
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth/auth";
export default {
  setup() {
    const store = useAuthStore();

    return {
      // you can return the whole store instance to use it in the template
      store,
    };
  },
  state: () => {
    return {
      user: null,
    }
  },
  getters: {
     user() {
      return store.getters['users/user']
    }
  },
  methods: {
    // async logout() {
    //   await this.$store.dispatch("auth/logout");
    //   this.$router.push("/");
    // },
  },
  computed: {
   
  },
};
</script>

<style lang="scss" scoped>
</style>