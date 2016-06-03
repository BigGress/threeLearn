
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfefefe, 1.0);

//环境光
var ambientlight = new THREE.AmbientLight(0xfefefe);
scene.add(ambientlight);

//锥形光
var spotLight = new THREE.SpotLight(0xfcfcfc)
spotLight.position.set(10, 150, -10);

//spotLight.target = plane;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 3000;
spotLight.shadow.mapSize.height = 3000;

scene.add(spotLight);
//网格模型
var geom = new THREE.CubeGeometry(200, 200, 200);

//天空盒子
var path = "./bg/";
var format = ".jpg";
var urls = [
    path + "posx" + format, path + "negx" + format,
    path + "posy" + format, path + "negy" + format,
    path + "posz" + format, path + "negz" + format,
];

var loader = new THREE.CubeTextureLoader();
textureCube = loader.load(urls);
textureCube.format = THREE.RGBFormat;
textureCube.mapping = THREE.CubeReflectionMapping;
var shader = THREE.ShaderLib["cube"];
// shader.uniforms.tCube.value = textureCube;

// var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
var material = new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide,
});
material.uniforms["tCube"].value = textureCube;

var cubeMesh = new THREE.Mesh(
    geom, material
);
// cubeMesh.scale.set(10,10,10)
scene.add(cubeMesh)
//天空盒子结束

//圆形
var mat1 = new THREE.MeshPhongMaterial( { envMap: textureCube } );
var geom = new THREE.SphereGeometry(10,100,100);
var sphere = new THREE.Mesh(geom,mat1);
scene.add(sphere);

//正方形
var mat1 = new THREE.MeshLambertMaterial( { envMap: textureCube } );
var geom = new THREE.CubeGeometry(10,10,10);
var cube = new THREE.Mesh(geom,mat1);

cube.position.x = 20
scene.add(cube);

var ctrl = new THREE.OrbitControls(camera);
ctrl.minDistance = 100;
ctrl.maxDistance = 200;
document.getElementById("webgl").appendChild(renderer.domElement);
render();
var step = 0;
function render() {

    // animation();
    ctrl.update();

    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function random() {
    var returnNum = Math.random() * 100 - 50;
    return returnNum;
}
var step = 0;
function animation() {
    var children = scene.children;

    for (var i = children.length; i--;) {
        if (children[i] instanceof THREE.Object3D) {
            children[i].rotation.y += 0.01;
        }
    }
}