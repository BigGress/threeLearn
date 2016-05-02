var controls = new function(){
    this.raduis = 18;
    this.segments = 40;
    this.thetaStart = 0;
    this.thetaLength = 2;
}

var gui = new dat.GUI();
gui.add(controls,"raduis",0,100).onChange(createPlane);

gui.add(controls,"segments",0,100).onChange(createPlane);

gui.add(controls,"thetaStart",0,2).onChange(createPlane);

gui.add(controls,"thetaLength",0,2).onChange(createPlane);

function createPlane(){
    scene.remove(circle)
    circle = new THREE.SceneUtils.createMultiMaterialObject( new THREE.CircleGeometry(controls.raduis,controls.segments,controls.thetaStart*Math.PI,controls.thetaLength*Math.PI),[circleMaterial1,circleMaterial2]);

    scene.add(circle)
}
