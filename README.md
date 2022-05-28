# MinecraftIceBoatTrackEditor

This is an Ice Boat Racing track maker for Minecraft

#Usage
Open html.html

    Controls
    -WASD
        -move the preview block
    -Enter
        -place a block
    -left click and drag
        -rotate the camera
    -right click and drag
        -move the camera
    -G
        -generate the track

#Exporting
Once you have finished creating your track, You should open the developer tools (f12)
press G it will generate the track and give you a big list of commands to copy (in most browsers there will be a copy button)
You can store this data in a .mcfuntions file, read more about this in the next header

#Importing
 your track is the most complex part of making the track.

You have to create a datapack, you can eather follow a youtube tutorial by OMGCraft(https://www.youtube.com/watch?v=Af920SeuVSk). 
Or read more about it here:
    
    -Creating a datapack
       -On windows: press the windows key and type in %appdata% and tap on enter,
       -Then go to .minecraft and go to one of your world saves(folder is called saves)
       -open a save you want to import your track in and go to the folder datapacks
       -Make a folder(just a folder), you can call this whatever you want
       -Open that folder and make a new file called pack.mcmeta
       -Open the file you just made in notepad and add the following text:
       ```
       {
          "pack": {
                  "pack_format": number,
                  "description": "add some flavour text"
                  }
       }
       ```
       -don't include the `
       -now, your pack_format number depends on what version of minecraft your running.
       
       |  format number |     versions   |
       |        4       | 1.13  - 1.14.4 |
       |        5       | 1.14  - 1.16.1 |
       |        6       | 1.16.2- 1.16.5 |
       |        7       | 1.17  - 1.17.1 |
       |        8       | 1.18  - 1.18.1 |
       |        9       |     1.18.2     |
       |       1 0      |      1.19      |
       
       -after you have done this, make another folder, at the same place you made your pack.mcmeta and call it data.
       -in that folder, make another folder with a namespace(name of your choosing, this will be relevant when importing)
       -in that folder, make another folder called functions
       -in that folder, put your .mcfunction file that you made earlier
       -congratulations, you can now import your track into minecraft, read on down here.

Once you have created a datapack, and put your mcfunction file in the functions folder, you can enter your world!
Make sure you have operator permissions and type the command /function (your namespace):(your file name)
This will put the track next to you, now you can make with world edit a schematic, or just drive it!
If this doesn't work try doing /reload and then your function command. WATCH OUT!!!! if your on a server, ask the administrator for permission to do this! this could crash a server!

#Enjoy!
