import React from 'react';


function DivisionBtn( { elems, callback } ){

  const colorsCells = [ '#E99499', '#9E93CF', '#B2D9BC', '#BA7FAD', '#FFEFB1' ];

  const [popupActive, setPopupActive] = React.useState( false );
  const [setupData, setSetupData] = React.useState(null);

  //1. У нас есть сетка, в которой ячейки. Ячейки же состоят из клеток.

  //2. С сеткой все понятно, нужно просто в ней хранить все ячейки.

  //3. Ячейки же должны в себе содержать id, цвет, а так же все клетки

  //4. Клетка же должны содержать в себе только индекс и к какой ячейке она принадлежит.

  React.useEffect( () => {  

    setPopupActive( false );

    let needParams = [
      { size : 125, values : 1 },
      { size : 270, values : 2 },
      { size : 415, values : 3 },
      { size : 560, values : 4 },
    ];

    try{

      if ( elems && elems[0] ) {

        let elem = elems[0];

        let _setupData = { 
          col : {
            values : needParams.find( (item) => item.size == elem.chars.height.value ).values,
          },
          row : {
            values : needParams.find( (item) => item.size == elem.chars.width.value ).values,
          },
        }

        setSetupData( _setupData );

      }

    }catch(error) {
      // console.error( error );
    }

  }, [ elems ] );

  const changePopupActiveModal = () => {

    setPopupActive( !popupActive );
 
  }

  const DivisionPopup = ( {setupData, callback} ) => {

    const [ colValue, setColValue ] = React.useState( setupData.col.values ); //высота 
    const [ rowValue, setRowValue ] = React.useState( setupData.row.values ); //ширина

    const [ tiles, setTiles ] = React.useState( [] );

    const [ cells, setCells ] = React.useState( [] );
    const [ currentCell, setCurrentCell ] = React.useState( 0 ); 

    // React.useEffect( () => {

    //   console.log( tiles );

    // }, [ tiles ] );

    // React.useEffect( () => {

    //   console.log( cells );

    // }, [ cells ] );

    // React.useEffect( () => {

    //   console.log( currentCell );

    // }, [ currentCell ] );

    const setupCells = () => {

      setCells( [
        {
          childrenTiles : [],
          hexColor : colorsCells[0],
        }
      ] );

      setCurrentCell( 0 );

    }

    const setupTiles = () => {

      let _tiles = [];

      for ( let x = 0; x < (rowValue * colValue); x++ ){

        _tiles.push( {
          parent : -1,
          disabled : false,
        } );

      }

      setTiles( _tiles )

    }

    React.useState( () => {

      setupCells();
      setupTiles();

    }, [ elems ] )

    const resetCells = () => {

      setupCells();
      setupTiles();

    }

    const newCell = () => {

      // console.log( 'new Cell' ) 

      setCells( 
        [ 
          ...cells,  
          {
            childrenTiles : [],
            hexColor : colorsCells[ cells.length ],
          }
        ] 
      );

      setCurrentCell( cells.length );

    }

    const canAddNewCell = ( currCell, tiles) => {

      let counterCurrCell = 0, allCounter = 0;

      tiles.forEach( (tile) => {

        if ( tile.parent === currCell ){
          counterCurrCell++;
        }
        if (  tile.parent !== -1 ){
          allCounter++;
        }

      } )

      if ( tiles.length-1 < allCounter ){
        return false;
      }
      
      if ( counterCurrCell > 1 ){
        return true;
      }
      return false;

    }

    const DivisionGrid = ( {size, stateTiles, stateCells, callbackTiles, callbackCells, currCell} ) => {

      const clickTile = ( index, size ) => {

        // stateTiles = stateTiles.map( (tile, indexTile) => {

        //   // let _disabled = true;

        //   // if ( indexTile === index-4 ||  indexTile === index-1 || indexTile === index+1 || indexTile === index+4 ){
        //   //   _disabled = false;
        //   // }

        //   // return {
        //   //   parent : tile.parent,
        //   //   disabled : _disabled,
        //   // }
        // } )

        if ( stateTiles[index].parent === -1 ){

          stateTiles[index].parent = currCell;
          stateTiles[index].disabled = false;

          callbackTiles( [ ...stateTiles ] );

        } else {
          
          if ( currCell === stateTiles[index].parent ){

            stateTiles[index].parent = -1;
            callbackTiles( [ ...stateTiles ] );

          }

        }

      }

      const getColorTile = ( _index, _cells ) => {

        if ( _index !== -1 ){
          return _cells[_index].hexColor;
        }
        return '';

      }

      return (
        <div className={ `DivisionGrid x${ size.width }` }>
          {
            stateTiles && stateTiles.map( (tile, index) =>
              <div 
                className={ `Tile ${ tile.disabled ? 'disabled' : '' } ${ tile.parent !== -1 ? 'active' : ''}` }
                style={ { 'background' : getColorTile( tile.parent, stateCells ) } }
                key={ `tile-${index}` }
                onClick={ () => clickTile ( index, size ) }
                >
              </div>
            )
              
          }
        </div>
      )

    }

    return (

      <div className="DivisionPopup">

        <DivisionGrid 
          size={ {width : rowValue, height : colValue} } 
          stateTiles={ tiles }
          stateCells={ cells }
          callbackTiles={ setTiles }
          callbackCells={ setCells }
          currCell={ currentCell }
        />

        <div 
          className={ `BtnNewCell mb-1 ${ canAddNewCell( currentCell, tiles ) ? '' : 'disabled' }` }
          onClick={ () => newCell() }
          >
          Новая ячейка
        </div>

        <div 
          className="BtnApply mb-1"
          onClick={ () => callback( elems, { value : rowValue, cells : tiles } ) }
          >
          Применить
        </div>
        <div 
          className="BtnReset"
          onClick={ () => resetCells() }
          >
          Сбросить
        </div>
      </div>

    )

  }

  return (

    <div className="DivisionBtn">
      <div 
        className={ `theme-btn theme-btn-sm ${ popupActive ? 'theme-btn-red' : 'theme-btn-graydark' }` }
        onClick={ () => changePopupActiveModal() }
        >
        <svg className="svg-big" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 1L10 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"/>
          <path d="M19 10L1 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"/>
        </svg>

        Разделить

        <svg className="svg-small" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 8L11 12L11 4L5 8Z" fill="black"/>
        </svg>

      </div>
      {
        popupActive && setupData !== null ? (
          <DivisionPopup 
            setupData={ setupData }
            callback={ callback }
          />
        ) : ''

      }
    </div>

  )

}

export default DivisionBtn;
