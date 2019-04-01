import React, { useState } from 'react';


const Box = ({ boxClass, boxId, row, col, selectBox, onHold }) => {

    let select = () => {
        selectBox(row, col);
    }

    let hold = () => {
        if (onHold) {
            return select();
        }
        else if (!onHold) {
            return null;
        }
    }
    

    return (
        <div className={boxClass} 
        id={boxId} 
        onClick={select} 
        onMouseLeave={hold}
        onMouseUp={hold}
        onDragStart={(e)=>e.preventDefault()} />
    );
}



const Grid = ({ cols, rows, grid, selectBox, ...props }) => {

    const [hold, setHold] = useState(false);

    const width = cols * 14;
    var rowsArr = [];

    var boxClass = "";

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            let boxId = i + "_" + j;

            boxClass = grid[i][j] ? "box on" : "box off";
            rowsArr.push(
                <Box
                    boxClass={boxClass}
                    key={boxId}
                    boxId={boxId}
                    row={i}
                    col={j}
                    selectBox={selectBox}
                    onHold={hold}
                    
                />
            )
        }
    }

    return (
        <div {...props} style={{ width: width }} onMouseDown={()=> setHold(true)} onMouseUp={()=> setHold(false)}>
            {rowsArr}
        </div>
    );
};

export default Grid;