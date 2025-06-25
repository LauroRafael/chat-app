<template>
    <div class="container">
        <h2>Login</h2>
        <input v-model="email" placeholder="Email" />
        <input v-model="senha" placeholder="Senha" type="password" />
        <button @click="login">Entrar</button>
        <router-link to="/register">Criar conta</router-link>
    </div>
</template>

<script>
export default {
    name: 'LoginView',
    data() {
        return { email: '', senha: '' };
    },
    methods: {
        async login() {
            try {
                const { data } = await this.$axios.post('/login', {
                    email: this.email,
                    senha: this.senha,
                });
                localStorage.setItem('token', data.token);
                this.$router.push('/chat');
            } catch (err) {
                alert('Login inválido');
            }
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: auto;
}
</style>