let messageApi = Vue.resource('/message{/id}');

function getIndexFromList(list, id) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return i;
        }
    }

    return -1;
}

Vue.component('mensaje-form', {
    props: ['messages', 'messageAttr'],
    data: function () {
        return {
            text: '',
            id: ''
        }
    },
    watch: {
        messageAttr: function (newVal, oldVal) {
            this.text = newVal.text;
            this.id = newVal.id;
        }
    },
    template:
        '<div>' +
        '<input type="text" placeholder="Escribe un mensaje" v-model="text" />' +
        '<input type="button" value="Guardar" @click="saveSMS" />' +
        '</div>',
    methods: {
        saveSMS() {
            const message = {text: this.text};

            if (this.id) {
                messageApi.update({id: this.id}, message)
                    .then(result =>
                        result.json().then(data => {
                            const index = getIndexFromList(this.messages, data.id);
                            this.messages.splice(index, 1, data);
                            this.text = '';
                            this.id = '';
                        })
                    );
            } else {
                messageApi.save({}, message)
                    .then(result => {
                        result.json()
                            .then(data => {
                                this.messages.push(data);
                                this.text = ''
                            });
                    });
            }
        }
    }

});

Vue.component('mensaje-fila', {
    props: ['mensaje', 'editMethod', 'messages'],
    template: `
    <div>
        <b><{{mensaje.id}}></b> <span>{{mensaje.text}}</span>
        <span style="position: absolute; right: 0;">
            <input type="button" value="Editar" @click="editSMS" />
            <input type="button" value="Borrar" @click="deleteSMS" />
        </span>
    </div>
    `,
    methods: {
        editSMS: function () {
            this.editMethod(this.mensaje);
        },
        deleteSMS: function () {
            messageApi.remove({id: this.mensaje.id}).then(result => {
                if (result.ok) {
                    this.messages.splice(this.messages.indexOf(this.mensaje), 1)
                }
            })
        }
    }
});

// Define a new component called todo-item
Vue.component('mensaje-lista', {
    props: ['mensajes'],
    data() {
        return {
            message: null
        }
    },
    template: `
    <div style="position: relative; width: 300px;">
        <!-- formulario add -->
        <mensaje-form :messages="mensajes" :messageAttr="message"/>
        <!-- mensaje -->
        <mensaje-fila
               v-for="item in mensajes"
               :key="item.id"
               :mensaje="item"
               :messages="mensajes"
               :editMethod="editarSMS"/>
    </div>
    `,
    created: function () {
        messageApi.get()
            .then((result) => {
                result.json()
                    .then((data) => {
                        data.forEach((sms) => {
                            // use the props value
                            this.mensajes.push(sms);
                        });
                    });
            });
    },
    methods: {
        editarSMS: function (pSms) {
            this.message = pSms;
        }
    }
});

let app = new Vue({
    el: '#app',
    template: '<mensaje-lista :mensajes="messagesArray" />',
    data: {
        messagesArray: []
    }
});