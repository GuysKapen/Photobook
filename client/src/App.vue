<template>
  <div id="app">
    <div id="nav">
      <Nav />
    </div>
    <router-view />
  </div>
</template>
<script>
import Nav from "@/components/Nav.vue";
import { mapActions } from "vuex";
import { useAuthStore } from "@/stores/auth/auth";
import "@/assets/main.css"
export default {
  setup() {
    const store = useAuthStore();

    return {
      // you can return the whole store instance to use it in the template
      store,
    };
  },
  mounted() {
    // console.log(this);
    // this.authAction();
  },
  components: {
    Nav,
  },
  methods: {
    ...mapActions("auth", ["authAction"]),
  },
};
</script>