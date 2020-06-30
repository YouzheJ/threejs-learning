<template>
    <div class="full">
        <div class="full" ref="stats-content"></div>
        <div class="content full" ref="content"></div>
    </div>
</template>

<script>
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { Stats } from '@/plugins/stats'

export default {
    name: 'test2-1',
    data () {
        return {
            controls: {
                rotationSpeed: 0.02,
                bouncingSpeed: 0.03
            },
            gui: null,
            renderer: null,
            camera: null,
            scene: null
        };
    },
    methods: {
        init (w, h) {
            this.gui = new dat.GUI();
            this.gui.add(this.controls, 'rotationSpeed', 0, 0.5);
            this.gui.add(this.controls, 'bouncingSpeed', 0, 0.5);

            const stats = this.initStats();

            this.scene = new THREE.Scene();

            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setClearColor(0xeeeeee);
            this.renderer.setSize(w, h);
            this.renderer.shadowMap.enabled = true;

            this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);

            // const axes = new THREE.AxesHelper(20);
            // this.scene.add(axes);

            const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
            const planeMaterial = new THREE.MeshLambertMaterial({
                color: 0xffffff
            });
            const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.receiveShadow = true;

            

            this.scene.add(plane);
        },
        initStats () {
            const statContent = this.$refs['stats-content'];
            const stats = new Stats();

            stats.setMode(0); // 0 fps 1 ms
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';

            statContent.appendChild(stats.domElement);

            return stats;
        },
        onResize() {
            const content = this.$refs.content;
            this.camera.aspect = content.offsetWidth / content.offsetHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(content.offsetWidth, content.offsetHeight);
        },
    },
    mounted() {
        const content = this.$refs.content;
        this.init(content.offsetWidth, content.offsetHeight);

        window.addEventListener('resize', this.onResize, false);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
        this.gui.destroy();
    }
};
</script>

<style lang="scss">

</style>
