import {Direction} from "../types/types";

export const CHECK_POINTS: Array<{x: number, y: number, size: number, direction: Direction, id: number, final: boolean}>
    = [
    {x:20, y:105,size: 40,direction: Direction.right,id:1,final:false},
    {x:315,y: 110,size: 40,direction: Direction.down,id:2,final:false},
    {x:282,y: 280,size: 40,direction: Direction.right,id:3,final:false},
    {x:440,y: 200,size: 40,direction: Direction.up,id:4,final:false},
    {x:415,y: -30,size: 40,direction: Direction.right,id:5,final:false},
    {x:570,y: 0,size: 40,direction: Direction.down,id:6,final:false},
    {x:540,y: 240,size: 40,direction: Direction.right,id:7,final:false},
    {x:635,y: 220,size: 40,direction: Direction.right,id:8,final:true},

    {x:635,y: 220,size: 40,direction: Direction.left,id:9,final:false},
    {x:430,y: 240,size: 40,direction: Direction.up,id:10,final:false},
    {x:430,y: 0,size: 40,direction: Direction.left,id:11,final:false},
    {x:310,y: 0,size: 40,direction: Direction.down,id:12,final:false},
    {x:310,y: 320,size: 40,direction: Direction.left,id:13,final:false},
    {x:170,y: 320,size: 40,direction: Direction.up,id:14,final:false},
    {x:175,y: 80,size: 40,direction: Direction.left,id:15,final:false},
    {x:175,y: 20,size: 40,direction: Direction.left,id:16,final:true},

    {x:115,y: 450,size: 40,direction: Direction.up,id:17,final:false},
    {x:150,y: 230,size: 40,direction: Direction.right,id:18,final:false},
    {x:390,y: 230,size: 40,direction: Direction.down,id:19,final:false},
    {x:350,y: 460,size: 40,direction: Direction.right,id:20,final:false},
    {x:575,y: 410,size: 40,direction: Direction.up,id:21,final:false},
    {x:525,y: 110,size: 40,direction: Direction.right,id:22,final:false},

    {x:635,y: 220,size: 40,direction: Direction.right,id:23,final:true},
]