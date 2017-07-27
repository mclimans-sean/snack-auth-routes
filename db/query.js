const knex = require('./knex')

module.exports = {
  findUserByEmail: function (email) {
    return knex('users').where('email', email).first();
  },

  createUser: function (user) {
    return knex('users').insert(user, '*').then(users => {
      return users[0];
    });
  },

  snacks: {
    getAll() {
      return knex('snacks');
    },
    getOne(id) {
      return knex('snacks').where('id', id).first();
    },
    create(snack) {
      return knex('snacks').insert(snack, '*').then(snacks => {
        return snacks[0];
      })
    },
    update(id, snack) {
      return knex('snacks').where('id', id).update(snack, '*').then(snacks => {
        return snacks[0];
      })
    },
    delete(id) {
      return knex('snacks').where('id', id).del()
    }
  }
}
