var controls = new function(){
    this.radius = 10;
    this.widthSegments = 10;
    this.heightSegments = 10;
    this.phiStart = 0;
    this.phiLength = 3.15;
    this.thetaStart = 0;
    this.thetaLength = 3.1;
}

var gui = new dat.GUI();
gui.add(controls,"radius",0,100).onChange(createSphere);

gui.add(controls,"widthSegments",0,100).onChange(createSphere);

gui.add(controls,"heightSegments",0,100).onChange(createSphere);

gui.add(controls,"phiStart",0,2 * Math.PI).onChange(createSphere);
gui.add(controls,"phiLength",0,2 * Math.PI).onChange(createSphere);
gui.add(controls,"thetaStart",0,2 * Math.PI).onChange(createSphere);
gui.add(controls,"thetaLength",0,2 * Math.PI).onChange(createSphere);

function createSphere(){
    scene.remove(sphere);
    sphereGeometry = new THREE.SphereGeometry(controls.radius,controls.widthSegments,controls.heightSegments,
        controls.phiStart,controls.phiLength,controls.thetaStart,controls.thetaLength);

    sphere = new THREE.SceneUtils.createMultiMaterialObject(sphereGeometry,[sphereMaterial1,sphereMaterial2]);

    scene.add(sphere);
}
