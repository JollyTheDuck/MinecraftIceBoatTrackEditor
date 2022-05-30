class Track {
    constructor(gravel,scene)
    {
        this.gravel == gravel;
        this.scene = scene;
        this.track = [];
        this.line = null;
        this.meshes = [];
    }

    addTrack(block)
    {
        var actualblock = block.box;
        var pos = {
            x: actualblock.position.x,
            y: actualblock.position.y,
            z: actualblock.position.z,
            width: block.currentTrackWidth,
            gravel: block.createGravel
        }
        this.track.push(pos);
        console.log(this.track);
        //make a box
        var box = BABYLON.MeshBuilder.CreateBox("box", { width: actualblock.width, height: actualblock.height, depth: actualblock.depth}, this.scene);
        //set vector position
        box.position = actualblock.position;
        box.material = new BABYLON.StandardMaterial("material", this.scene);
        //add the box to the scene
        this.scene.addMesh(box);
        //add the box to the meshes array
        this.meshes.push(box);
        //refresh the line
        if(this.track.length > 1){
            this.refreshLine();
        }
    }

    removeTrack()
    {
        if(this.track.length > 0){
            this.track.pop();
            this.meshes.pop().dispose();
            this.refreshLine();
        }
    }

    refreshLine()
    {
        //create the line
        if(this.line != null){
            this.line.dispose();
        }
        this.line = BABYLON.MeshBuilder.CreateLines("line", {points: this.track}, this.scene);
        this.line.color = new BABYLON.Color3(1,0,0);
        this.line.alpha = 0.5;
        //add the line to the scene
        this.scene.addMesh(this.line);
    }

}