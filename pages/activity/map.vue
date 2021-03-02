<template>
    <view>
        <web-view :src="url"></web-view>
    </view>
</template>

<script>
     export default {
        data() {
            return {
                url: ''
            };
        },
        onLoad(options) {
            this.url=options.url;
            this.url = decodeURIComponent(this.url) //解码网址
        },
    }
</script>

<style lang="scss" scoped>
</style>
