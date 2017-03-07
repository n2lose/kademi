var itemRow;
var dataWidget = [];
var DOMUtils = {
  findFirstElementByClassName: function(element, className) {
    var foundElement = null,
      found;

    function recurse(element, className, found) {
      for (var i = 0; i < element.childNodes.length && !found; i++) {
        var el = element.childNodes[i];
        var classes = el.className != undefined ? el.className.split(" ") : [];
        for (var j = 0, jl = classes.length; j < jl; j++) {
          if (classes[j] == className) {
            found = true;
            foundElement = element.childNodes[i];
            break;
          }
        }
        if (found)
          break;
        recurse(element.childNodes[i], className, found);
      }
    }
    recurse(element, className, false);
    return foundElement;
  },
  findElementsByTagName: function(element, foundTagName) {
    var childrendivs = [],
      children = element.children;
    for (var i = 0; i < children.length; i++) {
      if (children[i].tagName == foundTagName.toUpperCase()) {
        childrendivs.push(children[i]);
        break;
      }
    }
    return childrendivs;
  },
  findAncestor: function(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }
};

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
    itemRow = null;

    btnsClone = document.querySelectorAll('button');
    for (j = 0; j < btnsClone.length; j++) {
      btnsClone[j].addEventListener("click", DragDropFiles.duplicateWidget, false);
    }
  },
  handleDragStart: function(e) {
    //set the item reference to this element
    itemRow = e.target;
    e.dataTransfer.setData('text', '');
  },
  handleDragover: function(e) {
    if (itemRow) {
      e.stopPropagation();
      e.preventDefault();
    }
  },
  handleDrop: function(e) {
    //if this element is a drop target, move the item here 
    //then prevent default to allow the action (same as dragover)
    if (e.target.getAttribute('data-draggable') == 'target') {
      var panel = e.target;
      var tableTarget = DOMUtils.findElementsByTagName(panel, "table")[0];
      var tbodyTarget = DOMUtils.findElementsByTagName(tableTarget, "tbody")[0];
      console.log(itemRow);
      tbodyTarget.appendChild(itemRow);
      e.stopPropagation();
      e.preventDefault();

      //serializeData
      //dataWidget = DragDropFiles.tableToJson(tableTarget);
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
  tableToJson: function(table) {
    var data = [];
    // first row needs to be headers 
    var headers = [];
    for (var i = 0; i < table.rows[0].cells.length; i++) {
      headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
    }
    // go through cells 
    for (var i = 1; i < table.rows.length; i++) {
      var tableRow = table.rows[i];
      var rowData = {};
      for (var j = 0; j < tableRow.cells.length; j++) {
        rowData[headers[j]] = tableRow.cells[j].innerHTML;
      }
      data.push(rowData);
    }
    return data;
  },
  serializeData: function(panel) {
    var serilizeDataWidget = [];
    var data = panel.querySelectorAll('tbody')[0];
    var rowData = data.querySelectorAll('tr');
    for (var i = 0; i < rowData.length; i++) {
      var oWidget = {
        "name": rowData[0].innerHTML,
        "size": rowData[1].innerHTML,
        "dateModified": rowData[2].innerHTML,
      };
      serilizeDataWidget.push(oWidget);
    }
    return serilizeDataWidget;
  },
  duplicateWidget: function(obj) {
    var panel = DOMUtils.findAncestor(obj, "panel");

    var tableTarget = DOMUtils.findElementsByTagName(panel, "table")[0];
    console.log(tableTarget);
    var dataWidget = DragDropFiles.tableToJson(tableTarget);
    var newPanel = document.createElement("div");
    newPanel.className = "panel";
    newPanel.setAttribute("data-draggable", "target");
    var strHTML = '<table>';
    strHTML += '<thead><tr><td>Name</td><td>Size</td><td>Date Modified</td></tr></thead>';
    strHTML += '<tbody>';

    for (var i = 0; i < dataWidget.length; i++) {
      strHTML += '<tr>';
      strHTML += '<td>' + dataWidget[i].name + '</td>';
      strHTML += '<td>' + dataWidget[i].size + '</td>';
      strHTML += '<td>' + dataWidget[i].datemodified + '</td>';
      strHTML += '</tr>';
    }

    strHTML += '</tbody>';
    strHTML += '</table>';
    strHTML += '<button type="button" class="btn-duplicated" onclick="DragDropFiles.duplicateWidget(this);">Duplicated</button>';
    newPanel.innerHTML = strHTML;
    //console.log(strHTML);
  }
};