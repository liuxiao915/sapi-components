<template functional>
    <div class="online-chart-card-container">
        <template v-if="$slots.leftTitle || $slots.rightTitle">
            <div class="online-chart-card-header">
                <slot name="leftTitle">
                    <span></span>
                </slot>
                <slot name="rightTitle"></slot>
            </div>
            <div class="online-chart-card-header-border"></div>
        </template>
        <div class="online-chart-card-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
