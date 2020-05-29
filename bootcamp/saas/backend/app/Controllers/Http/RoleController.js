/**
 * Resourceful controller for interacting with roles
 */

const Role = use('Adonis/Acl/Role');

class RoleController {
  /**
   * Show a list of all roles.
   * GET roles
   *
   */
  async index() {
    const roles = await Role.all();

    return roles;
  }
}

module.exports = RoleController;
