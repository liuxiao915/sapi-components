<template>
  <el-dialog :title="title" :visible.sync="visible" width="800px" append-to-body @close="closeDialog" @open="openDialog">
    <el-row>
      <el-col :xs="24" :md="12" :style="{height: '350px'}">
        <vue-cropper
          v-if="showCropper"
          ref="cropper"
          :img="options.img"
          :info="true"
          :auto-crop="options.autoCrop"
          :auto-crop-width="options.autoCropWidth"
          :auto-crop-height="options.autoCropHeight"
          :fixed-box="options.fixedBox"
          :output-type="options.outputType"
          @realTime="realTime"
        />
      </el-col>
      <el-col :xs="24" :md="12" :style="{height: '350px'}">
        <div ref="preview" class="avatar-upload-preview">
          <img :src="previews.url" :style="previews.img">
        </div>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :lg="2" :sm="3" :xs="3">
        <el-upload action="#" :http-request="requestUpload" :show-file-list="false" :before-upload="beforeUpload">
          <el-button size="small">
            选择
            <i class="el-icon-upload el-icon--right" />
          </el-button>
        </el-upload>
      </el-col>
      <el-col :lg="{span: 1, offset: 2}" :sm="2" :xs="2">
        <el-button icon="el-icon-plus" size="small" @click="changeScale(1)" />
      </el-col>
      <el-col :lg="{span: 1, offset: 1}" :sm="2" :xs="2">
        <el-button icon="el-icon-minus" size="small" @click="changeScale(-1)" />
      </el-col>
      <el-col :lg="{span: 1, offset: 1}" :sm="2" :xs="2">
        <el-button icon="el-icon-refresh-left" size="small" @click="rotateLeft()" />
      </el-col>
      <el-col :lg="{span: 1, offset: 1}" :sm="2" :xs="2">
        <el-button icon="el-icon-refresh-right" size="small" @click="rotateRight()" />
      </el-col>
      <el-col :lg="{span: 2, offset: 6}" :sm="2" :xs="2">
        <el-button type="primary" size="small" @click="uploadImg()">提 交</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import VueCropper from './vue-cropper.vue'
export default {
  name: 'CutPicture',
  components: { VueCropper },
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false
    },
    fileObj: {
      type: Object,
      default: () => { return { fileUrl: '', fileName: '' } }
    }
  },
  data() {
    return {
      title: '',
      file: null,
      imagePhotos: [],
      visible: false,
      showCropper: false,
      options: {
        img: '', // 裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        outputType: 'png', // 默认生成截图为PNG格式
        filename: 'avatar' // 文件名称
      },
      previews: {}
    }
  },
  watch: {
    value: {
      handler(val) {
        this.visible = val
        this.options.img = this.fileObj?.fileUrl || ''
        this.title = this.$route.query.type === 'edit' ? '编辑头像' : '新增头像'
      },
      immediate: true
    }
  },
  methods: {
    openDialog() {
      console.log('openDialog--测试');
      this.showCropper = true
    },
    // 刷新组件
    refresh() {
      this.$refs.cropper.refresh()
    },
    // 覆盖默认的上传行为
    requestUpload() {},
    // 向左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    // 向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    // 图片缩放
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    // 上传预处理
    beforeUpload(file) {
      this.file = file
      if (file.type.indexOf('image/') === -1) {
        this.$message.warning('文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。')
      } else {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.options.img = reader.result
          this.options.filename = file.name
        }
      }
    },
    // 上传图片
    uploadImg() {
      this.$refs.cropper.getCropBlob(data => {
        const formData = new FormData()
        formData.append('multipartFile', data, this.file?.name || this.fileObj?.fileName)
        formData.append('pubNet', 1)
        // API.uploadImg(formData).then(res => {
        //   if (res.code === 0) {
        //     const list = [{ fileUrl: res.data.objectUrl, fileName: this.file?.name || this.fileObj?.fileName, orders: 1 }]
        //     this.$emit('done', list)
        //     this.$message.success('上传成功')
        //     this.showCropper = false
        //     this.$emit('input', false)
        //   }
        // })
      })
    },
    // 实时预览
    realTime(data) {
      this.previews = data
    },
    // 关闭窗口
    closeDialog() {
      this.showCropper = false
      this.$emit('input', false)
    }
  }
}
</script>
<style scoped lang="scss">
.avatar-upload-preview {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  // border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
}
</style>
