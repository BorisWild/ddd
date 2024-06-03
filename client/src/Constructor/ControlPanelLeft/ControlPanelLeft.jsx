import React from 'react'
import './ControlPanelLeft.css';


function ControlPanelLeft( props ) {

  const {
    zoomCameraIncrement,
    zoomCameraDecrement,

    nextHistory,
    prevHistory,
    currentHistory,
    stackHistory,

    takeSnapshot,

    changeVisibleLine,

    canPrev,
    canNext, 

  } = props;


  const ZoomControl = () => {

    return (

      <div className="control-panels-left-group mb-1">
        <div className="control-panels-left-btn control-panels-left-btn-top" onClick={ () => zoomCameraDecrement() }  >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 10H17" stroke="#F2F2F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 3L10 17" stroke="#F2F2F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="control-panels-left-group-separator"></div>
        <div className="control-panels-left-btn control-panels-left-btn-bottom" onClick={ () => zoomCameraIncrement() }>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 10H3" stroke="#F2F2F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

    )

  }

  const HistoryControl = () => {

    const nextHistoryBtn = () => {

      if ( canNext ){
        nextHistory();
      }

    }

    const prevHistoryBtn = () => {

      if ( canPrev ){
        prevHistory();
      }

    }

    return (

      <div className="control-panels-left-group">

        <div 
          className={ `control-panels-left-btn control-panels-left-btn-top ${ canPrev === false ? 'disabled' : '' }` }
          onClick={ () => prevHistoryBtn() }
          >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 8H16C18.2091 8 20 9.79086 20 12V17C20 19.2091 18.2091 21 16 21H10" stroke="#F2F2F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 2L4 8L10 14" stroke="#F2F2F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="control-panels-left-group-separator"></div>

        <div 
          className={ `control-panels-left-btn control-panels-left-btn-bottom ${ canNext === false ? 'disabled' : '' }`}
          onClick={ () => nextHistoryBtn() }
          >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 8H8C5.79086 8 4 9.79086 4 12V17C4 19.2091 5.79086 21 8 21H14" stroke="#F2F2F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2L20 8L14 14" stroke="#F2F2F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

      </div>

    )

  }

  const SnapshotBottom = () => {

    const takeSnapshotBtn = () => {

      takeSnapshot();

    }

    return (

      <div className="control-panels-left-btn mb-4" onClick={ () => takeSnapshotBtn() }>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.23203 3.33366L6.70703 5.00033H3.33203V15.0003H16.6654V5.00033H13.2904L11.7654 3.33366H8.23203ZM7.4987 1.66699H12.4987L14.0237 3.33366H16.6654C17.582 3.33366 18.332 4.08366 18.332 5.00033V15.0003C18.332 15.917 17.582 16.667 16.6654 16.667H3.33203C2.41536 16.667 1.66536 15.917 1.66536 15.0003V5.00033C1.66536 4.08366 2.41536 3.33366 3.33203 3.33366H5.9737L7.4987 1.66699ZM9.9987 7.50033C8.6237 7.50033 7.4987 8.62532 7.4987 10.0003C7.4987 11.3753 8.6237 12.5003 9.9987 12.5003C11.3737 12.5003 12.4987 11.3753 12.4987 10.0003C12.4987 8.62532 11.3737 7.50033 9.9987 7.50033ZM9.9987 5.83366C12.2987 5.83366 14.1654 7.70033 14.1654 10.0003C14.1654 12.3003 12.2987 14.167 9.9987 14.167C7.6987 14.167 5.83203 12.3003 5.83203 10.0003C5.83203 7.70033 7.6987 5.83366 9.9987 5.83366Z" fill="#F2F2F2"/>
        </svg>
      </div>

    )
  }

  const VisibleLine = () => {

    return (

      <div className="control-panels-left-btn mb-1" onClick={ () => changeVisibleLine() }>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M11.7695 18.8388L1.16289 8.23222C0.514705 7.58404 0.514705 6.52338 1.16289 5.8752L5.87693 1.16115C6.52511 0.512973 7.58577 0.512973 8.23395 1.16115L18.8406 11.7678C19.4887 12.4159 19.4887 13.4766 18.8406 14.1248L14.1265 18.8388C13.4783 19.487 12.4177 19.487 11.7695 18.8388ZM17.662 12.9463L7.05544 2.33967L2.3414 7.05371L3.51991 8.23222L5.87693 5.8752L7.05544 7.05371L4.69842 9.41073L5.87693 10.5892L8.23395 8.23222L9.41246 9.41073L7.05544 11.7678L8.23395 12.9463L10.591 10.5892L11.7695 11.7678L9.41246 14.1248L10.591 15.3033L12.948 12.9463L14.1265 14.1248L11.7695 16.4818L12.948 17.6603L17.662 12.9463Z" fill="#F2F2F2"/></g><defs><clipPath id="clip0_1396_1067"><rect width="20" height="20" fill="white" transform="matrix(-1 0 0 1 20 0)"/></clipPath></defs></svg>
      </div>

    )

  }

  return (

    <div className="ControlPanelLeft control-panels-left pr-4">
      
      <VisibleLine />

      <ZoomControl />

      <SnapshotBottom />
    
      <HistoryControl />

    </div>
    
  );
}

export default ControlPanelLeft;