class Track {
    constructor(gravel,scene)
    {
        this.gravel == gravel;
        this.scene = scene;
        this.track = [];
        this.line = null;
    }

    addTrack(block)
    {
        this.track.push(block);
        //make a box
        var box = BABYLON.MeshBuilder.CreateBox("box", { width: block.width, height: block.height, depth: block.depth}, this.scene);
        //set vector position
        box.position = block.position;
        box.material = new BABYLON.StandardMaterial("material", this.scene);
        //add the box to the scene
        this.scene.addMesh(box);
        console.log(this.track)
        //refresh the line
        this.refreshLine();
    }

    refreshLine()
    {
            //create a new line from the track
            this.line = BABYLON.MeshBuilder.CreateLines("line", {points: this.track}, this.scene);
            //set the color
            this.line.color = new BABYLON.Color3(1, 0, 0);
            //set the line width
            this.line.width = 0.1;
            //add the line to the scene
            this.scene.addMesh(this.line);
    }

}