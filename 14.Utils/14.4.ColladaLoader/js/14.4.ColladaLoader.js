
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaaff, 1.0);


camera.position.set(50, 150, 350);
camera.lookAt(0, 0, 0);

//环境光
var ambientlight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientlight);

//锥形光
var spotLight = new THREE.SpotLight(0xfcfcfc)
spotLight.position.set(10, 150, -10);

//spotLight.target = plane;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 3000;
spotLight.shadow.mapSize.height = 3000;

scene.add(spotLight);

//JSON
var loader = new THREE.ColladaLoader();
var mesh;
// loader.setBaseUrl("/");
loader.load("./loader/Truck_dae.dae", function (res) {
    console.log(res)
    mesh = res.scene.children[0].children[0].clone();
    mesh.scale.set(4, 4, 4);
    scene.add(mesh);
}, function (xhr) {
    console.log(xhr)
    if (!!xhr.loaded) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
})



document.getElementById("webgl").appendChild(renderer.domElement);
render();
var step = 0;
function render() {

    animation();

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