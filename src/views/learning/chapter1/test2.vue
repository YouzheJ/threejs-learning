<template>
    <div class="content" ref="content"></div>
</template>

<script>
import * as THREE from 'three';

export default {
    name: 'test1',
    data() {
        return {

        }
    },
    methods: {
        init(width, height) {
            // 新建场景
            const  scene = new THREE.Scene();
            // 新建摄像机
            const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

            // 新建渲染器
            const renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
            renderer.setSize(width, height);
            renderer.shadowMapEnabled = true; // 开启阴影

            // 创建轴
            const axes = new THREE.AxisHelper(20);
            scene.add(axes);

            // 创建光源
            const spotLight = new THREE.SpotLight(0xffffff);
            spotLight.castShadow = true; // 产生阴影
            spotLight.position.set(-40, 60, -10);
            scene.add(spotLight);

            // 创建平面
            const palneGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
            var palneMaterial = new THREE.MeshLambertMaterial({
                color: 0xffffff
            });
            const plane = new THREE.Mesh(palneGeometry, palneMaterial);
            plane.receiveShadow = true; // 接收阴影

            plane.rotation.x = -0.5 * Math.PI;
            plane.position.x = 15;
            plane.position.y = 0;
            plane.position.z = 0;

            scene.add(plane);

            // 创建立方体
            const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
            const cubeMaterial = new THREE.MeshLambertMaterial({
                color: 0xff0000,
            });
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.castShadow = true; // 投射阴影

            cube.position.x = -4;
            cube.position.y = 3;
            cube.position.z = 0;

            scene.add(cube);

            // 创建球体
            const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
            const sphereMaterial = new THREE.MeshLambertMaterial({
                color: 0x7777ff,
            });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.castShadow = true; // 投射阴影

            sphere.position.x = 20;
            sphere.position.y = 4;
            sphere.position.z = 2;

            scene.add(sphere);

            // 调整摄像机
            camera.position.x = -30;
            camera.position.y = 40;
            camera.position.z = 30;

            camera.lookAt(scene.position);

            this.$refs.content.appendChild(renderer.domElement);
            renderer.render(scene, camera);
        },
    },
    mounted() {
        const content = this.$refs.content;
        this.init(content.offsetWidth, content.offsetHeight);
    },
}
</script>

<style lang="scss">
.content {
    width: 100%;
    height: 100%;
}
</style>


