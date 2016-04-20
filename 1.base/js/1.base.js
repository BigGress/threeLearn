$(function(){
    var scene = new THREE.Scene();
    
    var camera = new THREE.PerspectiveCamera(45,
            window.innerWidth/window.innerHeight,0.1,1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColorHex(0xEEEEEE);
    renderer.setSize(window.innerWidth,window.innerHeight);

    var axes = new THREE.AxisHelper(20);
    scene.add(axes);
    var planeGeometry = new THREE.PlaneGeometry()
})