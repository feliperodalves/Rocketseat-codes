/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const UserTeam = use('App/Models/UserTeam');
/**
 * Resourceful controller for interacting with permissions
 */
class PermissionController {
  /**
   * Show a list of permissions.
   * GET permission
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ request, auth }) {
    const teamJoin = await UserTeam.query()
      .where('team_id', request.team_id)
      .where('user_id', auth.user.id)
      .first();

    return {
      roler: await teamJoin.getRoles(),
      permissions: await teamJoin.getPermissions(),
    };
  }
}

module.exports = PermissionController;
