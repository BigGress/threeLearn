
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

//加载马进来
var meshAnim;
var geoss ;
var loader = new THREE.JSONLoader();
loader.load("./loader/horse.js",function(geo,mat){
    var mat = new THREE.MeshLambertMaterial({
        color:0xffffff,
        morphNormals: false,
        morphTargets: true,
        // vertextColors: THREE.FaceColors
    });
    
    geoss = geo;
    
    morphColorsToFaceColors(geo);
    geo.computeMorphNormals();
    meshAnim = new THREE.MorphAnimMesh(geo,mat);
    
    scene.add(meshAnim);
})

//定义每个点的颜色
function morphColorsToFaceColors(geo){
    console.log(geo.faces.length)
    if(geo.faces.length>0){
        var colorMap = geo.faces[0];
        
        for(var i = 0;i<colorMap.colors.length;i++){
            geo.faces[i].color = colorMap.colors[i];
            geo.faces[i].color.offsetHSL(0,0.3,0);
        }
    }
}



//绑定轨迹球控件
var orbitControls = new THREE.OrbitControls(camera);
var fakeCamera = new THREE.Object3D();
var vrControls = new THREE.VRControls(fakeCamera);

var clock = new THREE.Clock();

document.getElementById("webgl").appendChild(renderer.domElement);
render();
var step = 0;


function render() {
    
    //输入控件
    var delta = clock.getDelta();
    orbitControls.update(delta);
    vrControls.update(delta);
    
    renderer.clear();
    
    if(meshAnim){
        meshAnim.updateAnimation(delta*1000);
        meshAnim.rotation.y += 0.01;
    }
    
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

// document.body.addEventListener("mousemove",onMouseMove);
var projector = new THREE.Projector();
//鼠标获取函数
function onMouseMove(event){
    event.preventDefault();
    var mouseVector = new THREE.Vector3(
        (event.clientX/window.innerWidth)*2 -1,
        -(event.clientY/window.innerHeight)*2 +1,
        0.5
    );
    mouseVector.unproject(camera);
    // projector.unprojectVector(mouseVector,camera);
    
    var raycaster = new THREE.Raycaster(camera.position,mouseVector.sub(camera.position).normalize());
    
    var interscts = raycaster.intersectObjects([cube]);
    
    if(interscts.length>0){
        // console.log(interscts);
        interscts[0].object.material.transparent = true;
        // interscts[0].object.material.opacity = 0.1;
        
        makeopacity(interscts[0].object.material,0.1,100)
    }
}

//透明函数
function makeopacity(material,opacity,time){
    var int = setInterval(function(){
        if(opacity<=material.opacity){
            material.opacity = (material.opacity-0.01).toFixed(2);
            
            clearInterval(int)
        }
    },time)
}