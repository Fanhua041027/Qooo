const test = require('node:test')
const assert = require('node:assert/strict')

const storage = new Map()
let capturedPage

global.Page = (definition) => { capturedPage = definition }
global.wx = {
  getStorageSync(key) { return storage.get(key) },
  setStorageSync(key, value) { storage.set(key, value) },
  showToast() {},
  showModal(options) { options.success({ confirm: true, content: '已检查相邻植株' }) },
  reLaunch() {},
  redirectTo() {}
}

function createPage(definition) {
  const page = { ...definition, data: JSON.parse(JSON.stringify(definition.data)) }
  page.setData = (patch, callback) => {
    for (const [key, value] of Object.entries(patch)) {
      if (!key.includes('.')) {
        page.data[key] = value
        continue
      }
      const [parent, child] = key.split('.')
      page.data[parent] = { ...page.data[parent], [child]: value }
    }
    if (callback) callback()
  }
  return page
}

test('任务支持编辑并在完成时保存执行备注', () => {
  storage.clear()
  delete require.cache[require.resolve('../pages/tasks/tasks.js')]
  require('../pages/tasks/tasks.js')
  const page = createPage(capturedPage)
  page.onLoad({})
  page.onShow()

  const first = page.data.tasks[0]
  page.editTask({ currentTarget: { dataset: { id: first.id } } })
  page.updateEditField({ currentTarget: { dataset: { field: 'title' } }, detail: { value: '复查东棚叶片' } })
  page.saveEditor()
  assert.equal(page.data.tasks[0].title, '复查东棚叶片')

  page.toggleTask({ currentTarget: { dataset: { id: first.id } } })
  assert.equal(page.data.tasks[0].done, true)
  assert.equal(page.data.tasks[0].completionNote, '已检查相邻植株')
  assert.equal(storage.get('qd_tasks')[0].done, true)
})

test('同一诊断不会重复创建农事任务', () => {
  storage.clear()
  delete require.cache[require.resolve('../pages/diagnosis-result/diagnosis-result.js')]
  require('../pages/diagnosis-result/diagnosis-result.js')
  const page = createPage(capturedPage)
  page.onLoad({})
  page.addTask()
  page.addTask()
  assert.equal(storage.get('qd_tasks').length, 1)
  assert.equal(storage.get('qd_tasks')[0].diagnosisId, 'preview')
})

test('新增诊断任务后仍保留默认巡查任务', () => {
  storage.clear()
  delete require.cache[require.resolve('../pages/tasks/tasks.js')]
  require('../pages/tasks/tasks.js')
  const page = createPage(capturedPage)
  page.onLoad({})
  storage.set('qd_tasks', [{ id: 'diagnosis_1', title: '复查番茄', done: false }])
  page.onShow()
  assert.equal(page.data.tasks.length, 4)
  assert.equal(page.data.tasks[0].id, 'diagnosis_1')
  assert.equal(page.data.tasks.some((task) => task.id === 'task_1'), true)
})
