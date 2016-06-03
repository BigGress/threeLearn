
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1.0);

camera.lookAt(100, 100, 100);

camera.position.set(50, 50, 200);

//环境光
var ambientlight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientlight);

//锥形光
var spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(0, 100, 0);

//spotLight.target = plane;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 3000;
spotLight.shadow.mapSize.height = 3000;

scene.add(spotLight);

//JSON
var loader = new THREE.OBJLoader();
//材质
var material = new THREE.MeshNormalMaterial({color: 0x00ff00, transparent: true, opacity: 0.5 });
//创建几何体
function createCube(){
    cubegeo = new THREE.CubeGeometry(10,10,10);
    var cube = new THREE.Mesh(cubegeo,material);
    
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = 0;
    
    return cube;
}

var mesh = createCube()
scene.add(mesh);

//保存成缓存图形
var exporter = new THREE.OBJExporter();
var cacheGeo = exporter.parse(mesh);
localStorage.setItem("json",JSON.stringify(cacheGeo));

//图像位置
var x = 10;
//从缓存获取图形
function add(){
    scene.remove(objlGeo)
    
    var a = 0;
    if(a!==1){
        getGeo = localStorage.getItem("json");
        getGeo = JSON.parse(getGeo);
        
        var objlGeo = loader.parse(getGeo);
        objlGeo.position.set(x,x,x);
        scene.add(objlGeo);
        
        a=1;
        setTimeout(function() {
            a=0;
        }, 200);
        
        //位置加10
        x+=10;
    }
}

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
    // system.rotation.y += 0.01;
}