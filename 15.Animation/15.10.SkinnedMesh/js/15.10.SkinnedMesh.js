
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

//动画
var posSrc = {pos:-1};
var tween = new TWEEN.Tween(posSrc).to({pos:0},3000);
tween.easing(TWEEN.Easing.Cubic.InOut);
var tweenBack = new TWEEN.Tween(posSrc).to({pos:-10},3000);
tweenBack.easing(TWEEN.Easing.Cubic.InOut);
tween.chain(tweenBack);
tweenBack.chain(tween);

//动画函数
function updateFn(){

}

tween.onUpdate(updateFn);
tweenBack.onUpdate(updateFn);

//引入手
var loader = new THREE.JSONLoader();
loader.load("./loader/hand-1.js",function(geometry,mat){
    var mat = new THREE.MeshLambertMaterial({
        color:0xF0C8C9,
        skinning:true
    });
    
    mesh = new THREE.SkinnedMesh(geometry,mat);
    
    mesh.rotation.x = 0.5*Math.PI;
    mesh.rotation.y = 0.5*Math.PI;
    
    mesh.geometry.bones.forEach(function(e){
        e.useQuaternion = false;
    })
    
    mesh.scale.set(5,5,5);
    
    tween.start();
    
    scene.add(mesh);
})

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
    
    TWEEN.update();
    
    renderer.clear();

    
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