import { defineStore } from "pinia";
import axios from 'axios'

export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        user: null,
        token: null,
    }),
    actions: {
        async logout() {
            this.user = null
        },

        async login({ email, password }) {
            console.log(email, password);
            try {
                // Sign in here
                axios.post("http://localhost:9000/authenticate", { email: email, password: password }).then(res => {
                    this.token = res.data["token"]
                    this.user = res.data["user"]
                })

                return Promise.resolve("Success")
            } catch (error) {
                console.log(error);
                return Promise.reject(error)
            }
        },

        // Confirm email address
        async confirmSignUp(_, { username, code }) {
            try {
                return Promise.resolve()
            } catch (error) {
                return Promise.reject(error)
            }
        },

        async signup(_, { username, password, email }) {
            try {

                return Promise.resolve()
            } catch (error) {
                console.log(error);
                return Promise.reject(error)
            }
        }
    },
});
