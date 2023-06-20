<template>
  <div @click="handleClick">弹窗</div>
	<sapi-dialog width="995px" top="12%" class="station-select-dialog user-select-dialog" :has-max="false" v-model="visible" @on-close="close" @on-open="open">
		<span slot="title">弹窗</span>

		<div class="footer text-center">
			<button size="small" @click="close">取消</button>
			<button size="small" v-if="hasClear===true" @click="confirm(0)">清空选择</button>
			<button type="primary" size="small" :disabled="disabled" @click="confirm">确定</button>
		</div>
	</sapi-dialog>
</template>

<script>
	export default {
		data() {
			return {
				visible: false,
				disabled: false
			}
		},
		props: ["value", "hasClear", "isRefresh"],
		methods: {
			confirm(index) {
        if(index === 0) {
          this.$emit("call-back",{});
        }
        this.close();
			},
			close() {
				this.$emit("input", false);
			},
			handleClick() {
				this.visible = true;
        console.log('this.visible:::', this.visible)
			},
			open() {
				this.init();
			},
			init() {

			}
		},
		watch: {
			value(val) {
				this.visible = val;
        console.log('this.visible:::', this.visible)
			},
		},
		created() {
			this.visible = this.value;
			//pager改变时将要执行的函数，对该值进行初始化
		}
	}
</script>
<style>
	.station-set-box-middle-right {
		float: right;
	}
	
	.station-set-box-left .sapi-tree .tree-node-label>i {
		padding-right: 6px;
	}
	
	.user-select-dialog .pagination-left {
		clear: both;
		margin-top: 5px;
		text-align: left;
		overflow: hidden;
	}
	
	.user-select-dialog .pager-hide .pagination-left {
		display: none;
	}
	
	.user-select-dialog .search-active .station-set-box-left {
		display: none;
	}
	
	.user-select-dialog .search-active .station-set-box-middle {
		width: 100%;
		margin-left: 0;
	}
</style>