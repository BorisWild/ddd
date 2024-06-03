import React from 'react';
import ReactDOM from 'react-dom/client';

import { PI, fq, sizeRatio, distX, distY, distZ } from './mainModelParams.js';

//Импортируем fingers
import Fingers_4 from './glb/fingers/Fingers_4.glb';
import Fingers_5 from './glb/fingers/Fingers_5.glb';
import Fingers_90_2 from './glb/fingers/Fingers_90_2.glb';
import Fingers_90_3 from './glb/fingers/Fingers_90_3.glb';
import Fingers_180_2 from './glb/fingers/Fingers_180_2.glb';
import Fingers_180_3 from './glb/fingers/Fingers_180_3.glb';
import Fingers_bottom_4 from './glb/fingers/Fingers_bottom_4.glb';

const listElememetsFingers = [
  {
    id : 0,
    name : 'Fingers_4',
    type : 'finger',
    model : Fingers_4,
    params : {
      rotationType: 0, 
      positionX : distX,
      positionY : distY,
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : PI/2,
    }
  },
  {
    id : 1,
    name : 'Fingers_180_3',
    type : 'finger',
    model : Fingers_180_3,
    params : {
      rotationType: 0, 
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY,
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 2,
    name : 'Fingers_180_3',
    type : 'finger',
    model : Fingers_180_3,
    params : {
      rotationType: 0, 
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY,
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI,
      rotationZ : 0,
    }
  },
  {
    id : 3,
    name : 'Fingers_5',
    type : 'finger',
    model : Fingers_5,
    params : {
      rotationType: 0, 
      positionX : distX,
      positionY : distY - ((125)/sizeRatio + fq*2),
      positionZ : distZ, 
      rotationX : PI,
      rotationY : PI,
      rotationZ : 0,
    }
  },
  {
    id : 4,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY - ((125)/sizeRatio + fq*2),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 5,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY - ((125)/sizeRatio + fq*2),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 6,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX,
      positionY : distY - ((125)/sizeRatio + fq*2),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : PI,
      rotationZ : PI/2,
    }
  },
  {
    id : 7,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY - ((125)/sizeRatio + fq*2),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : -PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 8,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY - ((125)/sizeRatio + fq*2),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : -PI,
      rotationZ : 0,
    }
  },
  {
    id : 9,
    name : 'Fingers_180_2',
    type : 'finger',
    model : Fingers_180_2,
    params : {
      rotationType: 0, 
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY,
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 10,
    name : 'Fingers_180_2',
    type : 'finger',
    model : Fingers_180_2,
    params : {
      rotationType: 0, 
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY,
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : PI,
      rotationZ : 0,
    }
  },
  {
    id : 11,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY + ((270)/sizeRatio + fq*2),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 12,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY + ((270)/sizeRatio + fq*2),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : -PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 13,
    name : 'Fingers_180_2',
    type : 'finger',
    model : Fingers_180_2,
    params : {
      rotationType: 0, 
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+(125))/sizeRatio + fq*4),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : -PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 14,
    name : 'Fingers_180_3',
    type : 'finger',
    model : Fingers_180_3,
    params : {
      rotationType: 0, 
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+(125))/sizeRatio + fq*4),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 15,
    name : 'Fingers_180_2',
    type : 'finger',
    model : Fingers_180_2,
    params : {
      rotationType: 0, 
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+(125))/sizeRatio + fq*4),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : -PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 16,
    name : 'Fingers_180_2',
    type : 'finger',
    model : Fingers_180_2,
    params : {
      rotationType: 0, 
      positionX : distX,
      positionY : distY + ((270+(125))/sizeRatio + fq*4),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : -PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 17,
    name : 'Fingers_180_2',
    type : 'finger',
    model : Fingers_180_2,
    params : {
      rotationType: 0, 
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+(125))/sizeRatio + fq*4),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : -PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 55,
    name : 'Fingers_4',
    type : 'finger',
    model : Fingers_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560)/sizeRatio + fq*4),
      positionY : distY + ((270)/sizeRatio + fq*2),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 56,
    name : 'Fingers_4',
    type : 'finger',
    model : Fingers_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560)/sizeRatio + fq*4),
      positionY : distY + ((270+125)/sizeRatio + fq*4),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 57,
    name : 'Fingers_180_3',
    type : 'finger',
    model : Fingers_180_3,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560)/sizeRatio + fq*4),
      positionY : distY + ((270)/sizeRatio + fq*2),
      positionZ : distZ + ((560)/sizeRatio + fq*2),
      rotationX : PI/2,
      rotationY : 0,
      rotationZ : PI/2,
    }
  },
  {
    id : 58,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560+560)/sizeRatio + fq*6),
      positionY : distY + ((270)/sizeRatio + fq*2),
      positionZ : distZ + ((560)/sizeRatio + fq*2),
      rotationX : 0,
      rotationY : PI,
      rotationZ : 0,
    }
  },
  {
    id : 60,
    name : 'Fingers_180_3',
    type : 'finger',
    model : Fingers_180_3,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560 + 560)/sizeRatio + fq*6),
      positionY : distY + ((270+(125))/sizeRatio + fq*4),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : -PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 61,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560 + 560)/sizeRatio + fq*6),
      positionY : distY + ((270+(125))/sizeRatio + fq*4),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 65,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560 + 560)/sizeRatio + fq*6),
      positionY : distY + ((270)/sizeRatio + fq*2),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 66,
    name : 'Fingers_180_2',
    type : 'finger',
    model : Fingers_180_2,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560 + 560)/sizeRatio + fq*6),
      positionY : distY,
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : PI,
      rotationZ : 0,
    }
  },
  {
    id : 70,
    name : 'Fingers_180_2',
    type : 'finger',
    model : Fingers_180_2,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560 + 560)/sizeRatio + fq*6),
      positionY : distY,
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI,
      rotationZ : 0,
    }
  },
  {
    id : 73,
    name : 'Fingers_180_2',
    type : 'finger',
    model : Fingers_180_2,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560)/sizeRatio + fq*4),
      positionY : distY,
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI,
      rotationZ : 0,
    }
  },
  {
    id : 74,
    name : 'Fingers_4',
    type : 'finger',
    model : Fingers_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560)/sizeRatio + fq*4),
      positionY : distY - ((125)/sizeRatio + fq*2),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 78,
    name : 'Fingers_180_3',
    type : 'finger',
    model : Fingers_180_3,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560 + 560)/sizeRatio + fq*6),
      positionY : distY - ((125)/sizeRatio + fq*2),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : -PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 92,
    name : 'Fingers_5',
    type : 'finger',
    model : Fingers_5,
    params : {
      rotationType: 0, 
      positionX : distX,
      positionY : distY - ((125 + 125)/sizeRatio + fq*4),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : PI,
      rotationZ : PI/2,
    }
  },
  {
    id : 93,
    name : 'Fingers_5',
    type : 'finger',
    model : Fingers_5,
    params : {
      rotationType: 0, 
      positionX : distX,
      positionY : distY - ((125 + 125)/sizeRatio + fq*4),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : PI/2,
    }
  },
  {
    id : 94,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY - ((125 + 125)/sizeRatio + fq*4),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : -PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 95,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY - ((125 + 125 )/sizeRatio + fq*4),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 96,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0,  
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY - ((125 + 125)/sizeRatio + fq*4),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 97,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY - ((125 + 125)/sizeRatio + fq*4),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : -PI,
      rotationZ : 0,
    }
  },
  {
    id : 100,
    name : 'Fingers_4',
    type : 'finger',
    model : Fingers_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560+560)/sizeRatio + fq*4),
      positionY : distY - ((125 + 125)/sizeRatio + fq*4),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 104,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560 + 560)/sizeRatio + fq*6),
      positionY : distY - ((125)/sizeRatio + fq*2),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 105,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560 + 560)/sizeRatio + fq*6),
      positionY : distY - ((125 + 125)/sizeRatio + fq*4),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 106,
    name : 'Fingers_180_3',
    type : 'finger',
    model : Fingers_180_3,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560 + 560)/sizeRatio + fq*6),
      positionY : distY - ((125 + 125)/sizeRatio + fq*4),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : -PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 108,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+(125+125))/sizeRatio + fq*6),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : PI,
      rotationZ : 0,
    }
  },
  {
    id : 109,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+(125+125))/sizeRatio + fq*6),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 110,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+(125+125))/sizeRatio + fq*6),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 111,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+(125+125))/sizeRatio + fq*6),
      positionZ : distZ  + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : -PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 112,
    name : 'Fingers_180_3',
    type : 'finger',
    model : Fingers_180_3,
    params : {
      rotationType: 0,  
      positionX : distX,
      positionY : distY + ((270+(125+125))/sizeRatio + fq*6),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : -PI/2,
      rotationY : 0,
      rotationZ : -PI/2,
    }
  },
  {
    id : 113,
    name : 'Fingers_5',
    type : 'finger',
    model : Fingers_5,
    params : {
      rotationType: 0,  
      positionX : distX,
      positionY : distY + ((270+(125+125))/sizeRatio + fq*6),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 126,
    name : 'Fingers_5',
    type : 'finger',
    model : Fingers_5,
    params : {
      rotationType: 0,   
      positionX : distX,
      positionY : distY + ((270+125+125+270)/sizeRatio + fq*8),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 127,
    name : 'Fingers_5',
    type : 'finger',
    model : Fingers_5,
    params : {
      rotationType: 0,   
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+125+125+270)/sizeRatio + fq*8),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 128,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0,   
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+125+125+270)/sizeRatio + fq*8),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 129,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0,   
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+125+125+270)/sizeRatio + fq*8),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : -PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 130,
    name : 'Fingers_5',
    type : 'finger',
    model : Fingers_5,
    params : {
      rotationType: 0,   
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+125+125+270)/sizeRatio + fq*8),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : PI,
      rotationZ : 0,
    }
  },
  {
    id : 131,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0,   
      positionX : distX,
      positionY : distY + ((270+125+125+270)/sizeRatio + fq*8),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : -PI/2,
      rotationY : 0,
      rotationZ : -PI/2,
    }
  },
  {
    id : 152,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0,   
      positionX : distX - ((560 + 560)/sizeRatio + fq*4) ,
      positionY : distY + ((270+125+125+270)/sizeRatio + fq*8),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : -PI/2,
      rotationY : 0,
      rotationZ : -PI/2,
    }
  },
  {
    id : 153,
    name : 'Fingers_5',
    type : 'finger',
    model : Fingers_5,
    params : {
      rotationType: 0,   
      positionX : distX - ((560 + 560)/sizeRatio + fq*4) ,
      positionY : distY + ((270+125+125+270)/sizeRatio + fq*8),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : -PI/2,
    }
  },
  {
    id : 161,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0,   
      positionX : distX - ((560 + 560)/sizeRatio + fq*4) ,
      positionY : distY + ((270+125+125+270+270)/sizeRatio + fq*10),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : PI,
      rotationZ : 0,
    }
  },
  {
    id : 162,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0,   
      positionX : distX - ((560 + 560)/sizeRatio + fq*4) ,
      positionY : distY + ((270+125+125+270+270)/sizeRatio + fq*10),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 163,
    name : 'Fingers_5',
    type : 'finger',
    model : Fingers_5,
    params : {
      rotationType: 0,   
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+125+125+270+270)/sizeRatio + fq*10),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 164,
    name : 'Fingers_5',
    type : 'finger',
    model : Fingers_5,
    params : {
      rotationType: 0,   
      positionX : distX,
      positionY : distY + ((270+125+125+270+270)/sizeRatio + fq*10),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 165,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0,   
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+125+125+270+270)/sizeRatio + fq*10),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 166,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0,   
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+125+125+270+270)/sizeRatio + fq*10),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : -PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 167,
    name : 'Fingers_5',
    type : 'finger',
    model : Fingers_5,
    params : {
      rotationType: 0,   
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+125+125+270+270)/sizeRatio + fq*10),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : PI,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 168,
    name : 'Fingers_5',
    type : 'finger',
    model : Fingers_5,
    params : {
      rotationType: 0,   
      positionX : distX,
      positionY : distY + ((270+125+125+270+270)/sizeRatio + fq*10),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : PI,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 174,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560 + 560)/sizeRatio + fq*6),
      positionY : distY + ((270+125+415)/sizeRatio + fq*6),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : PI,
      rotationZ : 0,
    }
  },
  {
    id : 175,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560 + 560)/sizeRatio + fq*6),
      positionY : distY + ((270+125+415)/sizeRatio + fq*6),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 189,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560 + 560)/sizeRatio + fq*6),
      positionY : distY + ((270+125+415 + 560)/sizeRatio + fq*8),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 190,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560 + 560)/sizeRatio + fq*6),
      positionY : distY + ((270+125+415 + 560)/sizeRatio + fq*8),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : PI,
      rotationZ : 0,
    }
  },
  {
    id : 191,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560)/sizeRatio + fq*4),
      positionY : distY + ((270+125+415 + 560)/sizeRatio + fq*8),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : -PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 192,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560)/sizeRatio + fq*4),
      positionY : distY + ((270+125+415 + 560)/sizeRatio + fq*8),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 210,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560)/sizeRatio + fq*4),
      positionY : distY + ((270+125+415+560+270)/sizeRatio + fq*10),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : PI/2,
    }
  },
  {
    id : 211,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+125+415+560+270)/sizeRatio + fq*10),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : PI/2,
    }
  },
  {
    id : 212,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX,
      positionY : distY + ((270+125+415+560+270)/sizeRatio + fq*10),
      positionZ : distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : PI/2,
    }
  },


  {
    id : 213,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560)/sizeRatio + fq*4),
      positionY : distY + ((270+125+415+560+270)/sizeRatio + fq*10),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : PI,
      rotationZ : PI/2,
    }
  },
  {
    id : 214,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX - ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+125+415+560+270)/sizeRatio + fq*10),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : PI,
      rotationZ : PI/2,
    }
  },
  {
    id : 215,
    name : 'Fingers_bottom_4',
    type : 'finger',
    model : Fingers_bottom_4,
    params : {
      rotationType: 0, 
      positionX : distX,
      positionY : distY + ((270+125+415+560+270)/sizeRatio + fq*10),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : 0,
      rotationY : PI,
      rotationZ : PI/2,
    }
  },
  {
    id : 216,
    name : 'Fingers_90_3',
    type : 'finger',
    model : Fingers_90_3,
    params : {
      rotationType: 0, 
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+125+415+560+270)/sizeRatio + fq*10),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : -PI/2,
      rotationY : PI,
      rotationZ : 0,
    }
  },
  {
    id : 217,
    name : 'Fingers_90_3',
    type : 'finger',
    model : Fingers_90_3,
    params : {
      rotationType: 0, 
      positionX : distX + ((560)/sizeRatio + fq*2),
      positionY : distY + ((270+125+415+560+270)/sizeRatio + fq*10),
      positionZ : distZ, 
      rotationX : PI,
      rotationY : PI,
      rotationZ : 0,
    }
  },
  {
    id : 219,
    name : 'Fingers_90_3',
    type : 'finger',
    model : Fingers_90_3,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560 + 560)/sizeRatio + fq*6),
      positionY : distY + ((270+125+415+560+270)/sizeRatio + fq*10),
      positionZ : distZ, 
      rotationX : PI,
      rotationY : PI/2,
      rotationZ : 0,
    }
  },
  {
    id : 219,
    name : 'Fingers_90_3',
    type : 'finger',
    model : Fingers_90_3,
    params : {
      rotationType: 0, 
      positionX : distX - ((560 + 560 + 560)/sizeRatio + fq*6),
      positionY : distY + ((270+125+415+560+270)/sizeRatio + fq*10),
      positionZ : distZ + ((560)/sizeRatio + fq*2), 
      rotationX : PI,
      rotationY : 0,
      rotationZ : 0,
    }
  },
]
export default listElememetsFingers;