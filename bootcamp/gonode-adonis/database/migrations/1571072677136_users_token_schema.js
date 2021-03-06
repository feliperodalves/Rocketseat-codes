'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersTokenSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.string('token', 255)
      table.timestamp('token_created_at')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('token')
      table.dropColumn('token_created_at')
    })
  }
}

module.exports = UsersTokenSchema
