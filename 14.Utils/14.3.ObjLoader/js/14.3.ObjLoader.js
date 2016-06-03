
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaaff, 1.0);

camera.lookAt(100, 100, 100);

camera.position.set(50, 50, 200);

//环境光
var ambientlight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientlight);

//锥形光
var spotLight = new THREE.SpotLight(0xfcfcfc)
spotLight.position.set(10, 100, -10);

//spotLight.target = plane;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 3000;
spotLight.shadow.mapSize.height = 3000;

scene.add(spotLight);

//JSON
var mtlLoader = new THREE.MTLLoader();
//材质
var material = new THREE.MeshLambertMaterial({ color: 0x5C3A21 });

//mtl的baseurl记得要设置！！不然jpg会加载失败

mtlLoader.setBaseUrl("obj/")
mtlLoader.setPath("obj/");
//先加载mtl文件
mtlLoader.load("misc_chair01.mtl", function (mtl) {
    mtl.preload();

    var loader = new THREE.OBJLoader();
    loader.setMaterials(mtl);
    loader.setPath("obj/");
    //加载obj文件
    loader.load("misc_chair01.obj", function (geo) {
        geo.children.forEach(function (c) {
            if (c.children.length === 1) {
                if (c.children[0] instanceof THREE.Mesh) {
                    c.children[0].material = material;
                }
            }
        })

        geo.scale.set(60, 60, 60);
        geo.rotation.x = 0.3;
        geo.position.set(0, 0, 0);
        scene.add(geo);
    }, function (xhr) {
        console.log(xhr)
    })
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
    
    for(var i=children.length;i--;){
        if(children[i] instanceof THREE.Object3D){
            children[i].rotation.y += 0.01;
        }
    }
}