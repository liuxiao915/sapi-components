export default {
  tabActive: {
    type: String,
    default: 'demo',
    validator (val) {
      return ['demo', 'api', 'design'].includes(val)
    }
  }
}
