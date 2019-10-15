'use strict'

const Task = use('App/Models/Task')

class TaskController {
  async index ({ params }) {
    const tasks = await Task.query()
      .where('project_id', params.project_id)
      .with('user')
      .with('file')
      .fetch()

    return tasks
  }

  async store ({ request, params }) {
    const data = request.only([
      'user_id',
      'file_id',
      'title',
      'description',
      'due_date'
    ])

    const task = await Task.create({ ...data, project_id: params.project_id })

    return task
  }

  async show ({ params }) {
    const task = await Task.findOfFail(params.id)

    await task.load('user', 'project', 'file')

    return task
  }

  async update ({ params, request }) {
    const task = await Task.findOfFail(params.id)
    const data = request.only([
      'user_id',
      'file_id',
      'title',
      'description',
      'due_date'
    ])

    task.merge(data)
    await task.save()

    return task
  }

  async destroy ({ params }) {
    const task = await Task.findOfFail(params.id)

    await task.destroy()
  }
}

module.exports = TaskController
