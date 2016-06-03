
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
var geom = new THREE.CubeGeometry(20, 20, 20);

//加载纹理
var img = new THREE.TextureLoader();

img.load("./texture/stone.jpg", function (imgs) {

    var mat = new THREE.MeshPhongMaterial();
    mat.map = imgs;

    img.load("./texture/stone-bump.jpg", function (bump) {
        mat.bumpMap = bump;

        var mesh = new THREE.Mesh(geom, mat);

        mesh.rotation.y = 10;

        scene.add(mesh)
    })

})

img.load("./texture/stone.jpg", function (imgs) {

    var mat = new THREE.MeshPhongMaterial();
    mat.map = imgs;

    
        var mesh = new THREE.Mesh(geom, mat);

        mesh.rotation.y = 10;
        
        mesh.position.x = 30;
        mesh.position.z = -20;

        scene.add(mesh)

})


document.getElementById("webgl").appendChild(renderer.domElement);
render();
var step = 0;
function render() {

    // animation();

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