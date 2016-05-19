var controls = new function(){
    this.visible = true;
    this.color = "#687665";
    this.specular = "#ff5687";
    this.shininess = 10;
    this.wireframe = false;
    this.opacity = 1;
    this.transparent = false;
    this.side = "font";
}

var gui = new dat.GUI();
gui.addColor(controls,"specular").onChange(function(e){
    sphereMaterial.specular = new THREE.Color(e)
})

gui.add(controls,"shininess",0,100).onChange(function(e){
    sphereMaterial.shininess = e
})
