const DEFAULT_TASKS = [
  { id: 'task_1', title: '检查东棚相邻植株', time: '17:30', plot: '东棚 2 号地', tag: '诊断复查', urgent: true, done: false },
  { id: 'task_2', title: '记录叶片病斑变化', time: '明天 09:00', plot: '东棚 2 号地', tag: '拍照记录', urgent: false, done: false },
  { id: 'task_3', title: '完成西棚通风', time: '08:20', plot: '西棚 1 号地', tag: '日常巡检', urgent: false, done: true }
]
const { requireAuth } = require('../../services/auth-service')

Page({
  data: {
    forceEmpty: false,
    filter: 'all',
    tasks: DEFAULT_TASKS,
    visibleTasks: DEFAULT_TASKS,
    completedCount: 1,
    editingTask: null
  },
  onLoad(options) {
    if (!requireAuth()) return
    this.setData({ forceEmpty: options.state === 'empty' })
  },
  onShow() {
    if (this.data.forceEmpty) {
      this.setData({ tasks: [], visibleTasks: [], completedCount: 0 })
      return
    }
    const saved = wx.getStorageSync('qd_tasks') || []
    const savedById = new Map(saved.map((task) => [task.id, task]))
    const defaultTasks = DEFAULT_TASKS.map((task) => savedById.get(task.id) || task)
    const defaultIds = new Set(DEFAULT_TASKS.map((task) => task.id))
    const customTasks = saved.filter((task) => !defaultIds.has(task.id))
    const tasks = [...customTasks, ...defaultTasks]
    this.setData({ tasks }, () => this.applyFilter())
  },
  setFilter(event) {
    this.setData({ filter: event.currentTarget.dataset.filter }, () => this.applyFilter())
  },
  applyFilter() {
    const { tasks, filter } = this.data
    const visibleTasks = filter === 'todo' ? tasks.filter((item) => !item.done) : filter === 'done' ? tasks.filter((item) => item.done) : tasks
    this.setData({
      visibleTasks,
      completedCount: tasks.filter((item) => item.done).length
    })
  },
  toggleTask(event) {
    const id = event.currentTarget.dataset.id
    const current = this.data.tasks.find((item) => item.id === id)
    if (!current) return
    if (current.done) {
      this.updateTask(id, { done: false, completionNote: '', completedAt: '' })
      return
    }
    wx.showModal({
      title: '完成这项任务？',
      content: '可以补充一条执行备注，方便之后复查。',
      editable: true,
      placeholderText: '例如：已检查相邻 6 株，未发现新病斑',
      confirmText: '标记完成',
      success: ({ confirm, content }) => {
        if (confirm) this.updateTask(id, { done: true, completionNote: content || '已完成，未填写备注', completedAt: new Date().toISOString() })
      }
    })
  },
  updateTask(id, patch) {
    const tasks = this.data.tasks.map((item) => item.id === id ? { ...item, ...patch } : item)
    wx.setStorageSync('qd_tasks', tasks)
    this.setData({ tasks }, () => this.applyFilter())
  },
  editTask(event) {
    const task = this.data.tasks.find((item) => item.id === event.currentTarget.dataset.id)
    if (task) this.setData({ editingTask: { ...task, assignee: task.assignee || '陈师傅', note: task.note || '' } })
  },
  updateEditField(event) {
    const field = event.currentTarget.dataset.field
    this.setData({ [`editingTask.${field}`]: event.detail.value })
  },
  closeEditor() { this.setData({ editingTask: null }) },
  saveEditor() {
    const task = this.data.editingTask
    if (!task || !task.title.trim()) {
      wx.showToast({ title: '请填写任务名称', icon: 'none' })
      return
    }
    this.updateTask(task.id, task)
    this.setData({ editingTask: null })
    wx.showToast({ title: '任务已更新', icon: 'success' })
  },
  addTask() {
    wx.showToast({ title: '原型中已预留新建任务入口', icon: 'none' })
  },
  startDiagnosis() {
    wx.reLaunch({ url: '/pages/diagnosis/diagnosis' })
  }
})
