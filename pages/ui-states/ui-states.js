Page({
  data: {
    groups: [
      { title: '进入与首页', items: [
        { label: '首次进入 / 登录', url: '/pages/login/login?preview=1' },
        { label: '正常首页', url: '/pages/index/index' },
        { label: '首页无网络', url: '/pages/index/index?state=offline' },
        { label: '没有农场', url: '/pages/index/index?state=nofarm' },
        { label: '没有诊断记录', url: '/pages/index/index?state=norecords' }
      ]},
      { title: '图片与诊断', items: [
        { label: '拍照默认状态', url: '/pages/diagnosis/diagnosis' },
        { label: '图片模糊', url: '/pages/diagnosis/diagnosis?state=blur' },
        { label: '图片不符合要求', url: '/pages/diagnosis/diagnosis?state=invalid' },
        { label: '上传中', url: '/pages/diagnosis/diagnosis?state=uploading' },
        { label: '权限拒绝', url: '/pages/diagnosis/diagnosis?state=permission' },
        { label: 'AI 分析中', url: '/pages/diagnosis-processing/diagnosis-processing?preview=1' },
        { label: '诊断失败', url: '/pages/diagnosis-processing/diagnosis-processing?state=failed' },
        { label: '分析中断网', url: '/pages/diagnosis-processing/diagnosis-processing?state=offline&preview=1' }
      ]},
      { title: '结果与后续', items: [
        { label: '诊断成功', url: '/pages/diagnosis-result/diagnosis-result' },
        { label: '结果长文本', url: '/pages/diagnosis-result/diagnosis-result?state=long' },
        { label: '专家暂时不在线', url: '/pages/diagnosis-result/diagnosis-result?state=expert-offline' },
        { label: '没有历史记录', url: '/pages/diagnosis-history/diagnosis-history?state=empty' },
        { label: '没有农场', url: '/pages/farm/farm?state=empty' },
        { label: '没有农事任务', url: '/pages/tasks/tasks?state=empty' },
        { label: '长文章与大字模式', url: '/pages/knowledge-detail/knowledge-detail?large=1' }
      ]}
    ]
  },
  open(e) { wx.navigateTo({ url: e.currentTarget.dataset.url }) }
})
