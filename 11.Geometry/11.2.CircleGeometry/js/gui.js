var controls = new function(){
    this.width = 60;
    this.height = 40;
    this.widthSegments = 5;
    this.heightSegments = 5
}

var gui = new dat.GUI();
gui.add(controls,"width",0,100).onChange(createPlane);

gui.add(controls,"height",0,100).onChange(createPlane);

gui.add(controls,"widthSegments",0,100).onChange(createPlane);

gui.add(controls,"heightSegments",0,100).onChange(createPlane);

function createPlane(){
    scene.remove(plane)
    plane = new THREE.SceneUtils.createMultiMaterialObject( new THREE.PlaneGeometry(controls.width,controls.height,controls.widthSegments,controls.heightSegments),[planeMaterial,planeMaterial2]);

    scene.add(plane)
}
