class Chat{

  constructor(table,options){
      this.table = table;
      this.options = options;
      this.knex = require('knex')(this.options);
  }

  newTable(){
      this.knex.schema.createTable(this.table,(table) => {
          table.string('email',200);
          table.string('texto',250);
          table.string('fyh',100);
      })
      .then(() => {
          console.log('tabla creada');
      })
      .catch((error) => {
          console.log('La tabla ya existe');
      });
  }

  addMessage(message){
      this.knex(this.table).insert(message)
      .then(() => {
          console.log('Mensaje guardo con exito');
      })
      .catch((error) => {
        console.log('El mensaje no pudo ser guardado')
      })
      .finally(()=>{
        this.knex.destroy()
    })
  }

  readMessages(){
      const nuevoMensaje = this.knex.from(this.table).select('*')
      .then((data) => {
          return data;
      })
      .catch((error) => {
          console.log(error);throw error
      });
      return nuevoMensaje;
  }

}

module.exports = Chat;