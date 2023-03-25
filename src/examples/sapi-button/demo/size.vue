<docs>
  <h2>不同尺寸的按钮</h2>
  <p>提供大、中（默认）、小三种尺寸。</p>
</docs>
<template>
  <div class="sapi-demo-block-column">
    <div class="sapi-demo-block-row">
      <div class="item">
        <sapi-button
          size="small"
          variant="base"
        >
          填充按钮
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          size="small"
          variant="outline"
        >
          描边按钮
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          size="small"
          variant="dashed"
        >
          虚框按钮
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          size="small"
          variant="text"
        >
          文字按钮
        </sapi-button>
      </div>
    </div>
    <div class="sapi-demo-block-row">
      <div class="item">
        <sapi-button
          size="medium"
          variant="base"
        >
          填充按钮
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          size="medium"
          variant="outline"
        >
          描边按钮
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          size="medium"
          variant="dashed"
        >
          虚框按钮
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          size="medium"
          variant="text"
        >
          文字按钮
        </sapi-button>
      </div>
    </div>
    <div class="sapi-demo-block-row">
      <div class="item">
        <sapi-button
          size="large"
          variant="base"
        >
          填充按钮
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          size="large"
          variant="outline"
        >
          描边按钮
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          size="large"
          variant="dashed"
        >
          虚框按钮
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          size="large"
          variant="text"
        >
          文字按钮
        </sapi-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Size',
  setup(){
    return {}
  }
}
</script>
