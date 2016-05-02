var controls = new function(){
    this.radius = 10;
    this.tube = 2;
    this.radialSegments = 10;
    this.tubularSegments = 8;
    this.arc = 2*Math.PI;
}

var gui = new dat.GUI();
gui.add(controls,"radius",-100,100).onChange(createSphere);

gui.add(controls,"tube",-100,100).onChange(createSphere);

gui.add(controls,"radialSegments",0,100).onChange(createSphere);

gui.add(controls,"tubularSegments",0,50).onChange(createSphere);
gui.add(controls,"arc",0,2*Math.PI).onChange(createSphere);

function createSphere(){
    scene.remove(torus);
    torusGeometry = new THREE.TorusGeometry(controls.radius,
    controls.tube,
    controls.radialSegments,
    controls.tubularSegments,
    controls.arc)

    torus = new THREE.SceneUtils.createMultiMaterialObject(torusGeometry,[torusMaterial1,torusMaterial2]);

    scene.add(torus);
}
