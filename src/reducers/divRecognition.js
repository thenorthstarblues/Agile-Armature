
export const css = { //also for css checking
  row: 'flexRow ',
  col: 'flexCol ',
  cont: 'container-fluid ',
  left: 'selfStart ',
  center: 'selfCenter ',
  right: 'selfEnd ',
  none: 'in-line ',
}

function createIdRowIdCol(largest, y, height, obj, childIdArr, remainIdArr){
  let y0 = largest[y];
  let y1 = largest[y]+largest[height];

  // find siblings within those horizons for a row
  var idRow = childIdArr.filter(child => {
    return (obj[child][y]>=y0 && (obj[child][y]+obj[child][height])<=y1);
  })

  var remains = childIdArr.filter(child => {
    return !(obj[child][y]>=y0 && (obj[child][y]+obj[child][height])<=y1);
  })
  remainIdArr.push(remains);

  return idRow;
}


export const divCreation = ((obj, parentId, largest, idRow, dir, row)=>{

      let newdir=dir+1;
      let newRow={};
      let rowId='';

      if (!dir){ //during row checking
        rowId="contRow_"+row+'.'+newdir;

        newRow = {
           id: rowId,
           height: largest.height,
           width: Math.min(...idRow.map(id=>obj[id].x))+Math.max(...idRow.map(id=>obj[id].x+obj[id].width)),
           x: Math.min(...idRow.map(id=>obj[id].x)),
           y: Math.min(...idRow.map(id=>obj[id].y)),
           parent: parentId,
           children: idRow,
           tag: 'div',
           css: 'flexRow ' }; //height is auto

      } else {//column defs

        rowId="contCol_"+0+'.'+newdir;

        newRow = {
         id: rowId,
         height: obj[parentId].height,
         width: largest.width,
         x: Math.min(...idRow.map(id=>obj[id].x)),
         y: Math.min(...idRow.map(id=>obj[id].y)),
         parent: parentId,
         children: idRow,
         tag: 'div',
         css: 'flexCol ' };
      }

      obj[rowId]=newRow; //add new object to overall list
      obj[parentId].children.push(rowId); //new child add

      idRow.forEach(childId=>{ //remove child references, rework parent references
        let sl=obj[parentId].children.indexOf(childId);

        obj[parentId].children.splice(sl,1); //child remove
        obj[childId].parent = rowId; // parent
      })

   return [idRow, rowId, newdir];
});



//--------------------------RECURSIVE COMPONENT GROUPING-----------------------------------
export const columnRowCheck = ((obj, parentId, childIdArr, largest={}, remainIdArr=[], dir=0, row=0)=>{

  if (childIdArr.length===0){
    obj[parentId].css = css.none;
  } else if (childIdArr.length === 1){
    //return to this later
  } else { // 2 or more children, recursion here

    // all children, find largest
    let childAreas = childIdArr.map(child => obj[child].width*obj[child].height );
    let bigKidI = childAreas.indexOf(Math.max(...childAreas));
        largest = obj[childIdArr[bigKidI]];

    if (!dir) { // row search on initial round
      var idRow = createIdRowIdCol(largest, 'y', 'height', obj, childIdArr, remainIdArr);

    } else { // column search from within rows
      var idCol = createIdRowIdCol(largest, 'x', 'width', obj, childIdArr, remainIdArr);
    }

//------------------row div creation---------------------------
    if (idRow && idRow.length>1){ // largest + sibling

       let rowId, newdir;
       [idRow, rowId, newdir] = divCreation(obj, parentId, largest, idRow, dir, row);

       idRow = idRow.filter(id=> id !== largest.id);
    //    recurse through children for columns / repeat as necessary
      columnRowCheck(obj, rowId, idRow, largest, remainIdArr, newdir, row+1);

    }

//------------------column div creation---------------------------
    if (idCol && idCol.length>1){ // largest + sibling
      //console.log(idCol);
      let colId, newdir;
      [idCol, colId, newdir] = divCreation(obj, parentId, largest, idCol, dir, row);

      idCol = childIdArr.filter(child => idCol.indexOf(child)===-1);
      remainIdArr.pop();

      if (idCol.length>0){
        columnRowCheck(obj, parentId, idCol, largest, remainIdArr, newdir, row);
      } else {
        columnRowCheck(obj, 0, remainIdArr[0], largest, [], 0, row);
      }
    }

  }

});