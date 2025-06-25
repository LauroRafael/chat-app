<template>
    <div class="container">
        <h2>Cadastro</h2>
        <input v-model="nome" placeholder="Nome" />
        <input v-model="email" placeholder="Email" />
        <input v-model="senha" placeholder="Senha" type="password" />
        <button @click="register">Cadastrar</button>
        <router-link to="/login">Já tem conta? Login</router-link>
    </div>
</template>

<script>
export default {
    name: 'RegisterView',
    data() {
        return { nome: '', email: '', senha: '' };
    },
    methods: {
        async register() {
            try {
                await this.$axios.post('/users', {
                    nome: this.nome,
                    email: this.email,
                    senha: this.senha,
                });
                this.$router.push('/login');
            } catch (err) {
                alert('Erro no cadastro');
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