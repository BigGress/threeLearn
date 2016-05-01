//允许产生阴影
renderer.shadowMap.enabled = true;
camera.position.set(100,100,100);
//平台
var planeGeometry = new THREE.PlaneGeometry(60,40);
var planeMaterial = new THREE.MeshLambertMaterial({
    color:0xffffff
});
var plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x = -0.5*Math.PI;
plane.position.set(10,10,10);
//接收阴影
plane.receiveShadow = true;

scene.add(plane);

//创建坐标轴
var axes = new THREE.AxisHelper(50);
scene.add(axes);
//方块

var cubeGeometry = new THREE.CubeGeometry(10,10,10);
var cubeMaterial = new THREE.MeshLambertMaterial({
    color:0xff0000
});
var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
cube.castShadow = true;
cube.position.set(10,15,10);
scene.add(cube);

//环境光
var ambientLight = new THREE.AmbientLight("#0c0c0c");
scene.add(ambientLight);
//
////聚光灯光源
//var spotLight = new THREE.SpotLight(0xffffff);
//spotLight.position.set(30,50,20);
////产生阴影
//spotLight.castShadow = true;
//spotLight.target = plane;

//阴影的宽和高
//spotLight.shadowMapWidth = 2300;
//spotLight.shadowMapHeight = 2300;
//scene.add(spotLight);

//方向光
var dirlight = new THREE.DirectionalLight(0xffffff);
dirlight.position.set(-40,60,-10);
dirlight.castShadow = true;
dirlight.shadow.camera.near = 2;
dirlight.shadow.camera.far = 1000;
dirlight.shadow.camera.left = -200;
dirlight.shadow.camera.right = 200;
dirlight.shadow.camera.top = -200;
dirlight.shadow.camera.bottom = 200;

dirlight.distance = 0;
dirlight.intensity = .5;
dirlight.shadow.mapSize.height = 1024;
dirlight.shadow.mapSize.width = 1024;
scene.add(dirlight)


//点光源
var pointLight = new THREE.PointLight("#087653");
pointLight.distance = 100;
scene.add(pointLight);
//设置一个圆形到点光源
var sphereGeometry = new THREE.SphereGeometry(1,20,20);
var sphereMaterial = new THREE.MeshBasicMaterial({
    color:0x00ff00
})
var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere.position.set(10,30,31);
sphere.name = "test";
scene.add(sphere);
var step = 0;
//点光源动画
function pointMove(){
    step += 0.1;
    var x = +(14 * (Math.cos(step)));
    var y = 30;
    var z = +(7 * (Math.sin(step)));

    pointLight.position.set(x,y,z);
    sphere.position.set(x,y,z);
}

$("#webgl").append(renderer.domElement);
render()

function render(){

    cube.rotation.y += 0.02;

    pointMove();

    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

