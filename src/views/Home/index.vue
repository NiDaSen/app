<template>
    <div>
        <TypeNav />
        <ListContainer />
        <Recommend />
        <Rank />
        <Like />
        <Floor v-for='(floorList,index) in getFloorList' :key="floorList.id" :floorList='floorList' />
        <Brand />
    </div>
</template>
<script>
    import ListContainer from "./ListContainer/index.vue"
    import Recommend from "./Recommend/index.vue"
    import Rank from "./Rank/index.vue"
    import Like from "./Like/index.vue"
    import Floor from "./Floor/index.vue"
    import Brand from "./Brand/index.vue"
    import { mapState } from 'vuex'
    export default {
        name: '',
        components: {
            ListContainer, Recommend, Rank, Like, Floor, Brand
        },
        computed: {
            ...mapState('home', ['getFloorList'])
        },
        async mounted() {
            this.$store.dispatch('home/getFloorList');
            // //在home中触发vuex根据token获取用户信息
            try {
                await this.$store.dispatch('user/reqGetUserInfo')
            } catch (error) {
                // console.log(error);
            }

        },

    };
</script>
<style scoped>
</style>