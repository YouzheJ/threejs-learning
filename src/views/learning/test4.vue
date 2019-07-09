<template>
    <div class="content">
        <div ref="stat-content"></div>
        <div class="webgl-content" ref="content"></div>
    </div>
</template>

<script>
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { Stats } from '../../plugins/stats';

export default {
    name: 'test1',
    data() {
        return {
            constrols: {
                rotationSpeed: 0.02,
                bouncingSpeed: 0.03,
            },
            gui: null,
            camera: null,
            renderer: null,
            scene: null,
        }
    },
    methods: {
        init(width, height) {
            this.gui = new dat.GUI();
            this.gui.add(this.constrols, 'rotationSpeed', 0, 0.5);
            this.gui.add(this.constrols, 'bouncingSpeed', 0, 0.5);

            const stats = this.initStat();
            // 新建场景
            const  scene = new THREE.Scene();
            // 新建摄像机
            const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

            // 新建渲染器
            const renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
            renderer.setSize(width, height);
            renderer.shadowMap.enabled = true; // 开启阴影

            // 创建轴
            // const axes = new THREE.AxisHelper(20);
            // scene.add(axes);

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

            const ambientLight = new THREE.AmbientLight(0x0c0c0c);
            scene.add(ambientLight);
            
            // 创建光源
            const spotLight = new THREE.SpotLight(0xffffff);
            spotLight.position.set(-40, 60, -10);
            spotLight.castShadow = true; // 产生阴影
            scene.add(spotLight);

            this.$refs.content.appendChild(renderer.domElement);

            this.renderer = renderer;
            this.camera = camera;

            let step = 0;
            const renderScene = () => {
                stats.update();

                cube.rotation.x += this.constrols.rotationSpeed;
                cube.rotation.y += this.constrols.rotationSpeed;
                cube.rotation.z += this.constrols.rotationSpeed;

                step += this.constrols.bouncingSpeed;
                sphere.position.x = 20 + (10 * Math.cos(step));
                sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));
                
                requestAnimationFrame(renderScene);
                renderer.render(scene, camera);
            }

            renderScene();
        },
        initStat() {
            const statContent = this.$refs['stat-content'];
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
    },
}
</script>

<style lang="scss">
.content {
    width: 100%;
    height: 100%;
    .webgl-content {
        width: 100%;
        height: 100%;
    }
}
.dg.ac {
    z-index: 1000;
}
</style>


