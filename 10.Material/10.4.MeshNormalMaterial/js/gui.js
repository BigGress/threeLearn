var controls = new function(){
    this.visible = true;
    this.color = "#687665";
    this.wireframe = false;
    this.opacity = 1;
    this.transparent = false;
    this.side = "font";
}

var gui = new dat.GUI();
gui = gui.addFolder("Mesh");
gui.add(controls,"visible").onChange(function(e){
    sphereMaterial.visible = this.visible;
    this.visible = this.visible = !this.visible
})

gui.addColor(controls,"color").onChange(function(e){
    sphereMaterial.color = this.color = new THREE.Color(e)
})

gui.add(controls,"wireframe").onChange(function(){
    this.wireframe = !this.wireframe;

    sphereMaterial.wireframe = this.wireframe;
})

gui.add(controls,"opacity",0,1).onChange(function(e){
    this.opacity = e
    sphereMaterial.opacity = e;
})
gui.add(controls,"transparent").onChange(function(e){
    this.transparent = !this.transparent;
    sphereMaterial.transparent = this.transparent;
})

gui.add(controls,"side",["font","back","double"]).onChange(function(e){
    var side = 0;
    switch (e){
        case "font":
            side = 0;
            break;
        case "back":
            side = 1;
            break;
        case "double":
            side = 2;
            break;
    }

    sphereMaterial.side = side
})