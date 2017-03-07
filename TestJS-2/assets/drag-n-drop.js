
var DragDropFiles = {
  init: function() {
    //get the collection of draggable items and add their draggable attribute
    var items = document.querySelectorAll('[data-draggable="item"]');
    var len = items.length;
    for (i = 0; i < len; i++) {
      items[i].setAttribute('draggable', 'true');
    }
    
    document.addEventListener("dragstart", DragDropFiles.handleDragStart, false);
    document.addEventListener("dragover", DragDropFiles.handleDragover, false);
    document.addEventListener("drop", DragDropFiles.handleDrop, false);
    document.addEventListener("dragend", DragDropFiles.handleDropEnd, false);

    //variable for storing the dragging item reference 
    var item = null;
    

  },
  handleDragStart: function(e) {
    //set the item reference to this element
    item = e.target;
    e.dataTransfer.setData('text', '');
  },
  handleDragover: function(e) {
    if (item) {
      e.stopPropagation();
      e.preventDefault();
    }
  },
  handleDrop: function(e) {
    //if this element is a drop target, move the item here 
    //then prevent default to allow the action (same as dragover)
    console.log("drop : "+ e.target);
    if (e.target.getAttribute('data-draggable') == 'target') {
      var tableTarget = e.target;
      alert(tableTarget);
      var tbodyTarget = tableTarget.getElementsByTagName('tbody')[0];
      tbodyTarget.appendChild(item);
      e.stopPropagation();
      e.preventDefault();
      // DragDropFiles.serializeData(e.target);
    } else {
      // Todo: remove it in the dataListWidgets
      // if this element drop out of target, remove it
      item.parentNode.removeChild(item);
      item = null;
    }
  },
  handleDropEnd: function() {
    item = null;
  },
  serializeData: function(widgetBase) {
    var serilizeDataWidget = [];
    var rowData = widgetBase.querySelectorAll('tr');
    for (var i = 0; i < rowData.length; i++) {
      var rowItem = rowData[i].querySelectorAll("td");
      var oWidget = {
        "name": rowItem[0].innerHTML,
        "size": rowItem[1].innerHTML,
        "dateModified": rowItem[2].innerHTML,
      };
      serilizeDataWidget.push(oWidget);
    }
    console.log(serilizeDataWidget);
    return serilizeDataWidget;
  },
  duplicateWidget: function(objFooter) {
    console.log(objFooter.parentElement.parentNode);
    widgetId = objFooter.parentElement.parentNode.getAttribute("id");

    var newWidget = document.getElementById(widgetId).cloneNode(true);
    document.getElementById("panel").appendChild(newWidget);
  }
};
(function() {
  // init drag n drop
  DragDropFiles.init();
})();