<template>
    <div class="chat-container">
        <select v-model="para">
            <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.nome }}
            </option>
        </select>

        <div class="messages">
            <div v-for="msg in mensagens" :key="msg.id" :class="{ 'mine': msg.de === meuId }">
                <strong>{{ msg.de === meuId ? 'Você' : 'Outro' }}:</strong> {{ msg.texto }}
            </div>
        </div>

        <input v-model="texto" @keyup.enter="enviar" placeholder="Digite..." />
    </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

export default {
    name: 'ChatView',
    data() {
        return {
            meuId: null,
            para: null,
            texto: '',
            mensagens: [],
            users: [],
        };
    },
    async mounted() {
        const token = localStorage.getItem('token');
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.meuId = payload.sub;

        const res = await this.$axios.get('/users');
        this.users = res.data.filter(u => u.id !== this.meuId);

        socket.on(`mensagem:${this.meuId}`, msg => {
            if (msg.para == this.meuId || msg.de == this.meuId)
                this.mensagens.push(msg);
        });
    },
    watch: {
        para() {
            this.carregarMensagens();
        },
    },
    methods: {
        async carregarMensagens() {
            const { data } = await this.$axios.get(`/messages?de=${this.meuId}&para=${this.para}`);
            this.mensagens = data;
        },
        async enviar() {
            if (!this.texto) return;
            await this.$axios.post('/messages', {
                de: this.meuId,
                para: this.para,
                texto: this.texto,
            });
            this.texto = '';
        },
    },
};
</script>

<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: auto;
}

.messages {
    flex-grow: 1;
    height: 400px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
}

.mine {
    text-align: right;
    color: blue;
}
</style>