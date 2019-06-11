<template>
    <div class="router-list">
        <ul class="router-list-wrapper">
            <li class="router-list-item" 
                v-for="(item, index) in data" 
                @click="handleClick(item)"
                :key="index">
                <span class="router-list-item-text" :class="{'link': item[props.router]}">{{item[props.label]}}</span>
                <router-list v-if="item[props.children]"
                    class="router-child-list"
                    :data="item[props.children]"
                    :props="props"></router-list>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'router-list',
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        props: {
            type: null,
            default: () => ({
                children: 'children',
                label: 'label',
                router: 'router',
            }),
        },
    },
    data() {
        return {

        }
    },
    methods: {
        handleClick(data) {
            const router = data[this.props.router];
            if (!router) return;
            this.$router.push(router);
        },
    },
    mounted() {
        
    },
}
</script>

<style lang="scss">
$theme-color: #42b983;

.router-list {
    &-item {
        &-text.link {
            cursor: pointer;
            text-decoration: underline;
            &:hover {
                color: $theme-color;
            }
        }
    }
    &.router-child-list {
        padding-left: 30px;
    }
}
</style>
