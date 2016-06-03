//场景
var scene = new THREE.Scene();

//相机
var camera = new THREE.PerspectiveCamera(45,
    window.innerWidth/window.innerHeight,0.1,1000);

camera.position.set(50,50,50);
camera.lookAt(scene.position);

//场景
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor(0xFEFEFE,1.0);