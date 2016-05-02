
renderer.setClearColor(0xfcfcfc);
renderer.shadowMap.enabled = true;
//坐标加入
var axes = new THREE.AxisHelper(50);
scene.add(axes)

//环境光
var ambientlight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientlight);

//锥形光
var spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(0,100,0);

//spotLight.target = plane;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 3000;
spotLight.shadow.mapSize.height = 3000;

scene.add(spotLight);

//自定义图形

function drawShape(){
    var shape = new THREE.Shape();

    //从10，10这个点画到10，40这个点
    shape.moveTo(10,10);

    shape.lineTo(10,40);

    //曲线
    shape.bezierCurveTo(15,25,25,25,30,40);

    //画出的线经过这些点
    shape.splineThru([
        new THREE.Vector2(32,30),
        new THREE.Vector2(28,20),
        new THREE.Vector2(30,10),
    ])

    shape.quadraticCurveTo(20,15,10,10);

    //test
    //var test = new THREE.Path();
    //test.absarc(15,15,3,0,Math.PI*2,true);
    //shape.holes.push(test);

    //eye
    var hole1 = new THREE.Path();
    hole1.absellipse(16,24,2,3,0,Math.PI*2,true);
    shape.holes.push(hole1);
    //eye
    var hole2 = new THREE.Path();
    hole2.absellipse(23,24,2,3,0,Math.PI*2,true);
    shape.holes.push(hole2);
    //mouth
    var hole3 = new THREE.Path();
    hole3.absarc(20,16,2,0,Math.PI,true);
    shape.holes.push(hole3);

    //把面转成点
    
    var line = new THREE.Line(shape.createPointsGeometry(10),
    new THREE.LineBasicMaterial({color:0xff3333,linewidth:2}))

    return {
        shape:shape,
        line:line
    };
}

var shapeGeometry = new THREE.ShapeGeometry(drawShape().shape);
var shapeMaterial = new THREE.MeshBasicMaterial({
    color:0x000000
});
var shape = new THREE.Mesh(shapeGeometry,shapeMaterial);

shape.position.y = -10;

scene.add(shape)

scene.add(drawShape().line)


document.getElementById("webgl").appendChild(renderer.domElement);
render();
var step = 0;
function render(){

    animation();

    renderer.render(scene,camera);
    requestAnimationFrame(render)
}

function random(){
    var returnNum = Math.random()*100-50;
    return returnNum;
}

function animation(){
    var childs = scene.children;
    for(var i=childs.length;i--;){
        if(childs[i].name === "sphere"){
            childs[i].rotation.y += 0.02;
            childs[i].rotation.z += 0.02;
        }
    }
}