var controls = new function(){
    this.radius = 15;
    this.tube = 1;
    this.radialSegments = 30;
    this.tubularSegments = 6;
    this.p = 2;
    this.q = 3;
    this.heightScale = 1;
}

var gui = new dat.GUI();
gui.add(controls,"radius",-100,100).onChange(createSphere);

gui.add(controls,"tube",-100,100).onChange(createSphere);

gui.add(controls,"radialSegments",0,100).onChange(createSphere);

gui.add(controls,"tubularSegments",0,50).onChange(createSphere);

gui.add(controls,"p",0,20).onChange(createSphere);

gui.add(controls,"q",0,20).onChange(createSphere);

gui.add(controls,"heightScale",0,10).onChange(createSphere);

function createSphere(){
    scene.remove(torusKnot);
    torusKnotGeometry = new THREE.TorusKnotGeometry(controls.radius,
    controls.tube,
    controls.radialSegments,
    controls.tubularSegments,
    controls.p,
    controls.q)

    torusKnot = new THREE.SceneUtils.createMultiMaterialObject(torusKnotGeometry,[torusKnotMaterial1,torusKnotMaterial2]);

    scene.add(torusKnot);
}
