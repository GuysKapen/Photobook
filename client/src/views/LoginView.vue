<template>
  <div>
    <form class="flex flex-col items-center" @submit.prevent="login">
      <div class="flex flex-col user">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email"
          >Email</label
        >
        <input
          class="
            shadow
            appearance-none
            bg-white
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            leading-tight
            focus:outline-none focus:shadow-outline
          "
          type="email"
          v-model="email"
          id="email"
        />
      </div>
      <div class="flex flex-col mt-10">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password"
          >Password</label
        >
        <input
          class="
            shadow
            appearance-none
            border
            bg-white
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            mb-3
            leading-tight
            focus:outline-none focus:shadow-outline
          "
          type="password"
          v-model="password"
        />
      </div>
      <!-- eslint-disable -->
      <button class="btn-blue">Sign in</button>
    </form>
    <div class="text-red-600">{{ error.message }}</div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "@/stores/auth/auth";
export default {
  data: () => ({
    email: "",
    password: "",
    email: "",
    error: "",
  }),
  computed: {
    // gives access to this.count inside the component
    // same as reading from store.count
    ...mapState(useAuthStore, ["user"]),
    // same as above but registers it as this.myOwnName
  },
  methods: {
    ...mapActions(useAuthStore, { loginVue: "login" }),
    async login() {
      try {
        await this.loginVue({
          email: this.email,
          password: this.password,
        });
        this.$router.push("/albums");
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>
