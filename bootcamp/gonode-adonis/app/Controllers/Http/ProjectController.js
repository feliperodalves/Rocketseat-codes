'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  async index ({ request }) {
    const { page } = request.get()

    const projects = await Project.query()
      .with('user')
      .with('file')
      .paginate(page)

    return projects
  }

  async store ({ request, auth }) {
    const data = request.only(['title', 'description', 'file_id'])

    const project = await Project.create({ ...data, user_id: auth.user.id })

    return project
  }

  async show ({ params }) {
    const project = await Project.findOrFail(params.id)

    await project.load('user', 'tasks', 'file')

    return project
  }

  async update ({ params, request }) {
    const project = await Project.findOfFail(params.id)
    const data = request.only(['title', 'description', 'file_id'])

    project.merge(data)
    await project.save()

    return project
  }

  async destroy ({ params }) {
    const project = await Project.findOfFail(params.id)

    await project.delete()
  }
}

module.exports = ProjectController
