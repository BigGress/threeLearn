
//renderer.setClearColor(0xfcfcfc);
renderer.shadowMap.enabled = true;

//var planeGeometry = new THREE.PlaneGeometry(60,40);
//var planeMaterial = new THREE.MeshLambertMaterial({
//    color:0x777ff
//});
//var plane = new THREE.Mesh(planeGeometry,planeMaterial)
//
//plane.rotation.x = -0.5*Math.PI;
//plane.position.set(0,0,0);
//plane.name = "plane";
//plane.receiveShadow = true;
//
//scene.add(plane);

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

//创建线
var points = gosper(4,60);

var lines = new THREE.Geometry();
var colors= [];
var i = 0;
points.forEach(function(e){
    lines.vertices.push(new THREE.Vector3(e.x,e.z,e.y));
    colors[i] = new THREE.Color(0xffffff);
    colors[i].setHSL(e.x/100+0.5,(e.y*20)/300,0.8);
    i++;
});

lines.colors = colors;
var material = new THREE.LineBasicMaterial({
    opacity:1.0,
    linewidth:1,
    vertexColors:THREE.VertexColors
});
var line = new THREE.Line(lines,material);
line.position.set(25,-30,60);
scene.add(line);


document.getElementById("webgl").appendChild(renderer.domElement);
render();
var step = 0;
function render(){

    animation();

    line.rotation.z = step += 0.01;

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


function gosper(a, b) {

    var turtle = [0, 0, 0];
    var points = [];
    var count = 0;

    rg(a, b, turtle);


    return points;

    function rt(x) {
        turtle[2] += x;
    }

    function lt(x) {
        turtle[2] -= x;
    }

    function fd(dist) {
//                ctx.beginPath();
        points.push({x: turtle[0], y: turtle[1], z: Math.sin(count) * 5});
//                ctx.moveTo(turtle[0], turtle[1]);

        var dir = turtle[2] * (Math.PI / 180);
        turtle[0] += Math.cos(dir) * dist;
        turtle[1] += Math.sin(dir) * dist;

        points.push({x: turtle[0], y: turtle[1], z: Math.sin(count) * 5});
//                ctx.lineTo(turtle[0], turtle[1]);
//                ctx.stroke();

    }

    function rg(st, ln, turtle) {

        st--;
        ln = ln / 2.6457;
        if (st > 0) {
//                    ctx.strokeStyle = '#111';
            rg(st, ln, turtle);
            rt(60);
            gl(st, ln, turtle);
            rt(120);
            gl(st, ln, turtle);
            lt(60);
            rg(st, ln, turtle);
            lt(120);
            rg(st, ln, turtle);
            rg(st, ln, turtle);
            lt(60);
            gl(st, ln, turtle);
            rt(60);
        }
        if (st == 0) {
            fd(ln)
            rt(60)
            fd(ln)
            rt(120)
            fd(ln)
            lt(60)
            fd(ln)
            lt(120)
            fd(ln)
            fd(ln)
            lt(60)
            fd(ln)
            rt(60)
        }
    }

    function gl(st, ln, turtle) {
        st--;
        ln = ln / 2.6457;
        if (st > 0) {
//                    ctx.strokeStyle = '#555';
            lt(60);
            rg(st, ln, turtle);
            rt(60);
            gl(st, ln, turtle);
            gl(st, ln, turtle);
            rt(120);
            gl(st, ln, turtle);
            rt(60);
            rg(st, ln, turtle)
            lt(120)
            rg(st, ln, turtle);
            lt(60);
            gl(st, ln, turtle);
        }
        if (st == 0) {
            lt(60);
            fd(ln);
            rt(60);
            fd(ln);
            fd(ln);
            rt(120)
            fd(ln);
            rt(60);
            fd(ln);
            lt(120);
            fd(ln);
            lt(60);
            fd(ln);
        }
    }
}
