export const auth = {
    namespace: true,
    state: { user: null },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        }
    },

    actions: {
        async logout({ commit }) {
            commit("setUser", null)
        },

        async logIn({ commit }, { username, password }) {
            try {
                // Sign in here

                commit("setUser", {})
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

        async signUp(_, { username, password, email }) {
            try {

                return Promise.resolve()
            } catch (error) {
                console.log(error);
                return Promise.reject(error)
            }
        }
    },

    getters: {
        user: (state) => state.user
    }
}