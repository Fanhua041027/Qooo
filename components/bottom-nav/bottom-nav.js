const ROUTES = {
  home: '/pages/index/index',
  diagnosis: '/pages/diagnosis/diagnosis',
  farm: '/pages/farm/farm',
  tasks: '/pages/tasks/tasks',
  profile: '/pages/profile/profile'
}

Component({
  properties: { current: { type: String, value: 'home' } },
  data: {
    items: [
      { key: 'home', label: '首页' },
      { key: 'diagnosis', label: '诊断' },
      { key: 'farm', label: '农场' },
      { key: 'tasks', label: '任务' },
      { key: 'profile', label: '我的' }
    ]
  },
  methods: {
    change(e) {
      const key = e.currentTarget.dataset.key
      if (key === this.data.current) return
      wx.reLaunch({ url: ROUTES[key] })
    }
  }
})
