Component({
  properties: {
    label: { type: String, value: '' },
    type: { type: String, value: 'primary' },
    size: { type: String, value: 'large' },
    block: { type: Boolean, value: true },
    loading: { type: Boolean, value: false },
    disabled: { type: Boolean, value: false }
  },
  methods: {
    handleTap() {
      if (!this.data.loading && !this.data.disabled) this.triggerEvent('tap')
    }
  }
})
