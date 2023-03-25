<docs>
  <h2>不同形状的按钮</h2>
  <p>提供长方形、正方形、圆角长方形、圆形四种形状。</p>
</docs>
<template>
  <div class="sapi-demo-block-column">
    <div class="sapi-demo-block-row">
      <div class="item">
        <sapi-button
          shape="rectangle"
          variant="base"
        >
          填充按钮
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          shape="square"
          variant="base"
        >
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          shape="round"
          variant="base"
        >
          填充按钮
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          shape="circle"
          variant="base"
        >
        </sapi-button>
      </div>
    </div>
    <div class="sapi-demo-block-row">
      <div class="item">
        <sapi-button
          shape="rectangle"
          variant="outline"
        >
          描边按钮
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          shape="square"
          variant="outline"
        >
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          shape="round"
          variant="outline"
        >
          描边按钮
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          shape="circle"
          variant="outline"
        >
        </sapi-button>
      </div>
    </div>
    <div class="sapi-demo-block-row">
      <div class="item">
        <sapi-button
          shape="rectangle"
          variant="dashed"
        >
          虚框按钮
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          shape="square"
          variant="dashed"
        >
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          shape="round"
          variant="dashed"
        >
          虚框按钮
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          shape="circle"
          variant="dashed"
        >
        </sapi-button>
      </div>
    </div>
    <div class="sapi-demo-block-row">
      <div class="item">
        <sapi-button
          shape="rectangle"
          variant="text"
        >
          文字按钮
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          shape="square"
          variant="text"
        >
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          shape="round"
          variant="text"
        >
          文字按钮
        </sapi-button>
      </div>
      <div class="item">
        <sapi-button
          shape="circle"
          variant="text"
        >
        </sapi-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Shape',
  setup(){
    return {}
  }
}
</script>
