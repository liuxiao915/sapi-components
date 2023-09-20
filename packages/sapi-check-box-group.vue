<template>
  <div class="sapi-checkbox-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'sapiCheckboxGroup',
  provide () {
    return {
      CheckboxGroup: this
    }
  },
  props: {
    value: {
      type: Array
    }
  }
}
</script>
