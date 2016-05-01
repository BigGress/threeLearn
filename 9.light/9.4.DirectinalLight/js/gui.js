var controls = new function(){
    this.dirlightColor = "#0c0c0c";
    this.spotColor = 0xffffff;
    this.step = 0;
    this.distance = 0;
    this.showHeight = 1024;
    this.showWidth = 1024;
}

var gui = new dat.GUI();
gui.addColor(controls,"dirlightColor").onChange(function(e){
    dirlight.color = new THREE.Color(e);
})
gui.add(controls,"distance",0,5).onChange(function(e){
    dirlight.distance = this.distance = e;
})
gui.add(controls,"showHeight",0,10000).onChange(function(e){
    dirlight.shadow.mapSize.height = this.showHeight = e;
})
gui.add(controls,"showWidth",0,10000).onChange(function(e){
    dirlight.shadow.mapSize.width = this.showWidth = e;
})
