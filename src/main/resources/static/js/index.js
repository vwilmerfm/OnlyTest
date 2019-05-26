let messageApi = Vue.resource('/message{/id}');

Vue.component('mensaje-fila', {
    props: ['mensaje'],
    template: `
    <div>
        <b><{{mensaje.id}}></b> <span>{{mensaje.text}}</span>
    </div>
    `
});

// Define a new component called todo-item
Vue.component('mensaje-lista', {
    props: ['mensajes'],
    template: `
    <div>
        <mensaje-fila
               v-for="item in mensajes"
               :key="item.id"
               :mensaje="item"/>
    </div>
    `,
    created: function() {
        messageApi.get().then((result) => {
            result.json().then((data) => {
                data.forEach((sms) => {
                    this.mensajes.push(sms);
                });
            }) ;
        });
    }
});

let app = new Vue({
    el: '#app',
    template: '<mensaje-lista :mensajes="messagesArray" />',
    data: {
        messagesArray: []
    }
});