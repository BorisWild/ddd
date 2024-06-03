import React from 'react'
import './BG.css';


function BG ( props ) {

  const { modelAR, closeModelAR } = props;

  return (

    <div className={ `Modal-bg ${ modelAR ? 'show' : '' }` } onClick={ () => closeModelAR() }> 

    </div>
    
  );
}

export default BG;