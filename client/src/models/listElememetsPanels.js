import React from 'react';
import ReactDOM from 'react-dom/client';

import { PI, fq, sizeRatio, distX, distY, distZ } from './mainModelParams.js';

//Импортируем panels
import Panel_125x560 from './glb/panels/Panel_125x560.glb';
import Panel_270x560 from './glb/panels/Panel_270x560.glb';
import Panel_560x560 from './glb/panels/Panel_560x560.glb';

const listElememetsPanels = [
  {
    id : 220,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX + ((560/2)/sizeRatio + fq),
      positionY : distY + (( 125 + 270 + 125 + 270 + 270 + 560/2)/sizeRatio + fq*11),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 221,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560/2)/sizeRatio + fq),
      positionY : distY + (( 125 + 270 + 125 + 270 + 270 + 560/2)/sizeRatio + fq*11),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 222,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560/2)/sizeRatio + fq),
      positionY : distY + (( 125 + 270 + 125 + 270 + 270 + 560/2)/sizeRatio + fq*11),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 223,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY + (( 125 + 270 + 125 + 270 + 270 + 560/2)/sizeRatio + fq*11),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 224,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY + (( 125 + 270 + 125 + 270 + 270 + 560/2)/sizeRatio + fq*11),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 225,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX,
      positionY : distY + (( 125 + 270 + 125 + 270 + 270 + 560/2)/sizeRatio + fq*11),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 227,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX + ((560/2)/sizeRatio + fq),
      positionY : distY + (( 125 + 270 + 125 + 270 + 270)/sizeRatio + fq*10),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 228,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560/2)/sizeRatio + fq),
      positionY : distY + (( 125 + 270 + 125 + 270 + 270)/sizeRatio + fq*10),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 229,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560/2)/sizeRatio + fq*3),
      positionY : distY + (( 125 + 270 + 125 + 270 + 270)/sizeRatio + fq*10),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 230,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560+560/2)/sizeRatio + fq*5),
      positionY : distY + (( 125 + 270 + 125 + 270 + 270 + 270)/sizeRatio + fq*12),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 231,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560+560/2)/sizeRatio + fq*5),
      positionY : distY + (( 125 + 270 + 125 + 270)/sizeRatio + fq*8),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 232,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560/2)/sizeRatio + fq*3),
      positionY : distY + (( 125 + 270 + 125 + 270)/sizeRatio + fq*8),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 233,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560/2)/sizeRatio + fq),
      positionY : distY + (( 125 + 270 + 125 + 270)/sizeRatio + fq*8),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 234,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX + ((560/2)/sizeRatio + fq),
      positionY : distY + (( 125 + 270 + 125 + 270)/sizeRatio + fq*8),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 235,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX + ((560/2)/sizeRatio + fq),
      positionY : distY + (( 125 + 270 + 125 + 270 + 270 + 560)/sizeRatio + fq*12),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 236,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560/2)/sizeRatio + fq),
      positionY : distY + (( 125 + 270 + 125 + 270 + 270 + 560)/sizeRatio + fq*12),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 237,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560/2)/sizeRatio + fq),
      positionY : distY + (( 125 + 270 + 125)/sizeRatio + fq*6),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 238,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX + ((560/2)/sizeRatio + fq),
      positionY : distY + (( 125 + 270 + 125)/sizeRatio + fq*6),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 239,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560/2)/sizeRatio + fq),
      positionY : distY - (( 125 )/sizeRatio + fq*2),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 240,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX + ((560/2)/sizeRatio + fq),
      positionY : distY - ((125)/sizeRatio + fq*2),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 241,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560/2)/sizeRatio + fq),
      positionY : distY - (( 125 + 125 )/sizeRatio + fq*4),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 242,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX + ((560/2)/sizeRatio + fq),
      positionY : distY - ((125 + 125)/sizeRatio + fq*4),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 241,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560/2)/sizeRatio + fq*3),
      positionY : distY + ((270)/sizeRatio + fq*2),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 242,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560+560/2)/sizeRatio + fq*5),
      positionY : distY + ((270)/sizeRatio + fq*2),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 243,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560+560/2)/sizeRatio + fq*5),
      positionY : distY + (( 125 + 270 + 125 + 270 + 560/2)/sizeRatio + fq*9),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 244,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560+560/2)/sizeRatio + fq*5),
      positionY : distY + (( 125 + 270 + 125 + 270 + 560/2)/sizeRatio + fq*9),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 245,
    name : 'Panel_560x560',
    type : 'panel',
    model : Panel_560x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560+560)/sizeRatio + fq*6),
      positionY : distY + (( 125 + 125 + 270 + 270 + 560/2)/sizeRatio + fq*9),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 246,
    name : 'Panel_125x560',
    type : 'panel',
    model : Panel_125x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560+560)/sizeRatio + fq*6),
      positionY : distY - ((125 + 125/2)/sizeRatio + fq*3),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 247,
    name : 'Panel_125x560',
    type : 'panel',
    model : Panel_125x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560+560/2)/sizeRatio + fq*5),
      positionY : distY - ((125 + 125/2)/sizeRatio + fq*3),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI,
      rotationZ : PI/2,
    }
  },
  {
    id : 248,
    name : 'Panel_125x560',
    type : 'panel',
    model : Panel_125x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560/2)/sizeRatio + fq*3),
      positionY : distY - ((125 + 125/2)/sizeRatio + fq*3),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI,
      rotationZ : PI/2,
    }
  },
  {
    id : 249,
    name : 'Panel_125x560',
    type : 'panel',
    model : Panel_125x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560/2)/sizeRatio + fq),
      positionY : distY - ((125 + 125/2)/sizeRatio + fq*3),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI,
      rotationZ : PI/2,
    }
  },
  {
    id : 250,
    name : 'Panel_125x560',
    type : 'panel',
    model : Panel_125x560,
    params : {
      rotationType: 0, 
      positionX : distX + ((560/2)/sizeRatio + fq),
      positionY : distY - ((125 + 125/2)/sizeRatio + fq*3),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI,
      rotationZ : PI/2,
    }
  },
  {
    id : 251,
    name : 'Panel_125x560',
    type : 'panel',
    model : Panel_125x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY - ((125 + 125/2)/sizeRatio + fq*3),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 252,
    name : 'Panel_125x560',
    type : 'panel',
    model : Panel_125x560,
    params : {
      rotationType: 0, 
      positionX : distX,
      positionY : distY - ((125 + 125/2)/sizeRatio + fq*3),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 253,
    name : 'Panel_125x560',
    type : 'panel',
    model : Panel_125x560,
    params : {
      rotationType: 0, 
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY - ((125 + 125/2)/sizeRatio + fq*3),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 254,
    name : 'Panel_125x560',
    type : 'panel',
    model : Panel_125x560,
    params : {
      rotationType: 0, 
      positionX : distX + ((560/2)/sizeRatio + fq),
      positionY : distY - ((125/2)/sizeRatio + fq),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI,
      rotationZ : PI/2,
    }
  },
  {
    id : 255,
    name : 'Panel_125x560',
    type : 'panel',
    model : Panel_125x560,
    params : {
      rotationType: 0, 
      positionX : distX - (( 560/2)/sizeRatio + fq),
      positionY : distY - ((125/2)/sizeRatio + fq),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI,
      rotationZ : PI/2,
    }
  },
  {
    id : 256,
    name : 'Panel_125x560',
    type : 'panel',
    model : Panel_125x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560+560)/sizeRatio + fq*6),
      positionY : distY + ((270 + 125/2)/sizeRatio + fq*3),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : PI/2,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 257,
    name : 'Panel_125x560',
    type : 'panel',
    model : Panel_125x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560+560/2)/sizeRatio + fq*5),
      positionY : distY + ((270 + 125/2)/sizeRatio + fq*3),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI,
      rotationZ : PI/2,
    }
  },
  {
    id : 258,
    name : 'Panel_125x560',
    type : 'panel',
    model : Panel_125x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560/2)/sizeRatio + fq*3),
      positionY : distY + ((270 + 125/2)/sizeRatio + fq*3),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI,
      rotationZ : PI/2,
    }
  },
  {
    id : 259,
    name : 'Panel_270x560',
    type : 'panel',
    model : Panel_270x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560/2)/sizeRatio + fq*3),
      positionY : distY + ((560 + 270 + 270/2)/sizeRatio + fq*5),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI,
      rotationZ : PI/2,
    }
  },
  {
    id : 260,
    name : 'Panel_270x560',
    type : 'panel',
    model : Panel_270x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560/2)/sizeRatio + fq),
      positionY : distY + ((560 + 270 + 270/2)/sizeRatio + fq*5),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI,
      rotationZ : PI/2,
    }
  },
  {
    id : 261,
    name : 'Panel_270x560',
    type : 'panel',
    model : Panel_270x560,
    params : {
      rotationType: 0, 
      positionX : distX + ((560/2)/sizeRatio + fq),
      positionY : distY + ((560 + 270 + 270/2)/sizeRatio + fq*5),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI,
      rotationZ : PI/2,
    }
  },
  {
    id : 262,
    name : 'Panel_270x560',
    type : 'panel',
    model : Panel_270x560,
    params : {
      rotationType: 0, 
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY + (( 125 + 270 + 125 + 270 + 270/2)/sizeRatio + fq*9),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : PI/2,
    }
  },
  {
    id : 262,
    name : 'Panel_270x560',
    type : 'panel',
    model : Panel_270x560,
    params : {
      rotationType: 0, 
      positionX : distX,
      positionY : distY + (( 125 + 270 + 125 + 270 + 270/2)/sizeRatio + fq*9),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : PI/2,
    }
  },
  {
    id : 263,
    name : 'Panel_270x560',
    type : 'panel',
    model : Panel_270x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560 )/sizeRatio + fq*4),
      positionY : distY + (( 125 + 270 + 125 + 270 + 270/2)/sizeRatio + fq*9),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : PI/2,
    }
  },
  {
    id : 264,
    name : 'Panel_270x560',
    type : 'panel',
    model : Panel_270x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560 )/sizeRatio + fq*4),
      positionY : distY + (( 125 + 270 + 125 + 270 + 270 + 270/2)/sizeRatio + fq*11),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : PI/2,
    }
  },
  {
    id : 265,
    name : 'Panel_270x560',
    type : 'panel',
    model : Panel_270x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560/2)/sizeRatio + fq),
      positionY : distY + ((560 + 270/2)/sizeRatio + fq*3),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI,
      rotationZ : PI/2,
    }
  },
  {
    id : 266,
    name : 'Panel_270x560',
    type : 'panel',
    model : Panel_270x560,
    params : {
      rotationType: 0, 
      positionX : distX + ((560/2)/sizeRatio + fq),
      positionY : distY + ((560 + 270/2)/sizeRatio + fq*3),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI,
      rotationZ : PI/2,
    }
  },
  {
    id : 267,
    name : 'Panel_270x560',
    type : 'panel',
    model : Panel_270x560,
    params : {
      rotationType: 0, 
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY + (( 125 + 125 + 270 + 270/2)/sizeRatio + fq*7),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : PI/2,
    }
  },
  {
    id : 268,
    name : 'Panel_270x560',
    type : 'panel',
    model : Panel_270x560,
    params : {
      rotationType: 0, 
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY + (( 125 + 125 + 270 + 270/2)/sizeRatio + fq*7),
      positionZ : distZ + ((560/2)/sizeRatio + fq), 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : PI/2,
    }
  },
]

export default listElememetsPanels;