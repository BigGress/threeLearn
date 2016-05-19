var controls = new function(){
    this.visible = true;
    this.color = "#687665";
    this.wireframe = false;
    this.opacity = 1;
}

var gui = new dat.GUI();
gui = gui.addFolder("Mesh");
gui.add(controls,"visible").onChange(function(e){
    cubeMaterial.visible = this.visible;
    this.visible = this.visible = !this.visible
})

gui.addColor(controls,"color").onChange(function(e){
    cubeMaterial.color = this.color = new THREE.Color(e)
})

gui.add(controls,"wireframe").onChange(function(){
    this.wireframe = !this.wireframe;

    cubeMaterial.wireframe = this.wireframe;
})

gui.add(controls,"opacity",0,1).onChange(function(e){
    this.opacity = e
    cubeMaterial.opacity = e;
    console.log(cubeMaterial.opacity);
})