import React from 'react';


const Box = ({ boxClass, boxId, row, col, selectBox }) => {

    let select = () => {
        selectBox(row, col);
    }

    return (
        <div className={boxClass} id={boxId} onClick={select} 
        onTouchStart={select} 
        onTouchEnd={select} 
        onMouseDown={select} 
        onMouseUp={select} 
        onMouseLeave={select}
        />
    );
}



const Grid = ({ cols, rows, grid, selectBox }) => {

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
                />
            )
        }
    }

    return (
        <div className="grid" style={{ width: width }}>
            {rowsArr}
        </div>
    );
};

export default Grid;