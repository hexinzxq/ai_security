<template>
  <div>
    <template v-if="item.type === 'input'">
      <el-form-item :label="item.label">
        <el-input
          v-model.trim="value"
          :name="item.name"
          :placeholder="item.placeholder"
        />
      </el-form-item>
    </template>
    <template v-else-if="item.type === 'date'">
      <el-form-item :label="item.label">
        <el-date-picker
          v-model="value"
          :name="item.name"
          :type="item.dateType"
          :placeholder="item.placeholder"
        />
      </el-form-item>
    </template>
    <template v-else-if="item.type === 'daterange'">
      <el-form-item :label="item.label">
        <el-date-picker
          v-model="value"
          :name="item.name"
          type="datetimerange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          prefix-icon="el-icon-date"
          :placeholder="item.placeholder"
          style="width: 100%"
        />
      </el-form-item>
    </template>
    <template v-else-if="item.type === 'select'">
      <el-form-item :label="item.label">
        <el-select
          v-model="value"
          :name="item.name"
          :placeholder="item.placeholder"
          @change="callback"
        >
          <el-option
            v-for="(opt, index) in item.options"
            :key="index"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
      </el-form-item>
    </template>
    <template v-else-if="item.type === 'button'">
      <el-form-item class="form-btn">
        <el-button
          :type="item.btnType"
          @click="item.callback()"
        >{{
          item.name
        }}</el-button>
      </el-form-item>
    </template>
    <template v-else-if="item.type === 'btnInline'">
      <el-form-item class="form-btn">
        <el-button
          v-for="(btn, index) in item.btnList"
          :key="index"
          :size="btn.size"
          :type="btn.btnType"
          @click="btn.callback()"
        >{{ btn.name }}</el-button>
      </el-form-item>
    </template>
    <!-- 布局字段占位内容 -->
    <template v-else-if="item.type === 'seat'">
      <el-form-item class="seat" />
    </template>
  </div>
</template>
<script>
export default {
  props: {
    // 字段配置
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 是否清空标志
    clearFlag: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      // 子组件中绑定的值
      value: '',
      callback: () => {}
    }
  },
  watch: {
    // 组件中的值发生变化则传递给父组件
    value(newvalue, oldvalue) {
      this.$emit('update-value', { value: newvalue, key: this.item.name })
    },
    // 变化则清空组件中的值
    clearFlag() {
      this.value = ''
    }
  },
  mounted() {
    if (this.item.defaultVal) {
      this.value = this.item.defaultVal
    }
    this.$nextTick(() => {
      this.item.callback && (this.callback = this.item.callback)
    })
  }
}
</script>
<style lang="scss" scoped>
::v-deep .form-btn {
	.el-form-item__content {
		margin-left: 0 !important;
	}
}
</style>
