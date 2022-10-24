<template>
    <ul class="yin-header-nav">
        <li :class="{ active: item.name === activeName }" v-for="item in styleList" :key="item.path"
            @click="handleChangeView(item)" @mouseover="handleMousover">
            {{ item.name }}
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { getCurrentInstance, defineProps, defineEmits } from "vue";


const { proxy } = getCurrentInstance() as any;

const props = defineProps({
    styleList: { type: Array, require: true },
    activeName: { type: String, require: true }
})

const emits = defineEmits(['click', 'mouseover'])

const handleMousover = () => {
    emits('mouseover')

}
const handleChangeView = (item) => {
    // proxy.$emit("click", item.path, item.name);
    emits("click", item.path, item.name)

}

</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";

li {
    margin: $header-nav-margin;
    padding: $header-nav-padding;
    line-height: 3.3rem;
    color: $color-grey;
    border-bottom: none;
    cursor: pointer;
}

li.active {
    color: $color-black;
    font-weight: 600;
    border-bottom: 5px solid $color-black;
}
</style>
