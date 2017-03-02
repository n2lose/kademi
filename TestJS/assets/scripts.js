var WidgetManage = {
    createWidget() {
        return {
            dataList: [],
            init: function() {},
            formatDate: function() {}
        }
    },
    cloneWidget(widgetBase) {
        var klass = function() {}
        klass.prototype = widgetBase;
        return new klass;
    }
};

var dataListWidgets = [];

(function() {
  var FileListWidgets = {
      init : function() {
       
        var inputFile = document.getElementById("file");
        inputFile.addEventListener("change", this.handleBtnUploadFiles, false);

        var dropbox;
        dropbox = document.getElementById("box__input");
        dropbox.addEventListener("dragenter", FileListWidgets.dragenter, false);
        dropbox.addEventListener("dragover", FileListWidgets.dragover, false);
        dropbox.addEventListener("drop", FileListWidgets.drop, false);

        var fileName = document.getElementById("file-name");
        fileName.addEventListener("click", this.toggleSort, false);
      },
      formatDate : function(date) {
        return (date.getMonth() + 1) + 
                "/" +  date.getDate() +
                "/" +  date.getFullYear();
      },
      createRow : function(file) {
        var rowTR = document.createElement("tr");
        var data = '<td class="row">'+ file.name +'</td>';
        data    += '<td class="row">'+ file.size +' kb</td>';
        data    += '<td class="row">'+ FileListWidgets.formatDate(file.lastModifiedDate) +'</td>';
        rowTR.innerHTML = data ;
        rowTR.setAttribute("data-draggable", "item");
        return rowTR;
      },
      checkFileExist: function(file) {
        if(dataListWidgets.length > 0 ) {
            for(var i = 0; i < dataListWidgets.length; i++) {
               if(file.name === dataListWidgets[i].name) {
                   return false;
               }
            } 
        }
        return true;
      },
      handleBtnUploadFiles: function(ojbFile) {
          fileList = ojbFile.target.files;
          for(var i = 0; i < fileList.length; i++) {
              var fileItem = fileList[i];
              if(FileListWidgets.checkFileExist(fileItem)) {
                dataListWidgets.push(fileItem);
                FileListWidgets.showMsgSuccess();
              } else {
                  FileListWidgets.showMsgError();
              }
          }
          dataListWidgets.sort(FileListWidgets.dynamicSortMultiple("name"));
          FileListWidgets.bindingFiles(dataListWidgets);
      },
      handleDragnDropFiles: function(files) {
          fileList = files;
          for(var i = 0; i < fileList.length; i++) {
              var fileItem = fileList[i];
              if(FileListWidgets.checkFileExist(fileItem)) {
                dataListWidgets.push(fileItem);
                FileListWidgets.showMsgSuccess();
              } else {
                  FileListWidgets.showMsgError();
              }
          }
          
          dataListWidgets.sort(FileListWidgets.dynamicSortMultiple("name"));
          FileListWidgets.bindingFiles(dataListWidgets);
      },
      bindingFiles : function(fileList) {
        var tbody = document.getElementById("list-widgets");
        tbody.innerHTML = "";
        if(fileList.length > 0) {
            
            for(var i = 0; i < fileList.length; i++) {
                var rowItem = this.createRow(fileList[i]);
                tbody.appendChild(rowItem);
            }
        }
        DragDropFiles.prototype.init();
      },
      dynamicSort : function(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
      },
      toggleSort : function() {
          dataListWidgets.reverse(FileListWidgets.dynamicSortMultiple("name"));
          console.log(dataListWidgets);
          FileListWidgets.bindingFiles(dataListWidgets);
      },

      dynamicSortMultiple: function () {
        /*
        * save the arguments object as it will be overwritten
        * note that arguments object is an array-like object
        * consisting of the names of the properties to sort by
        */
        var props = arguments;
        return function (obj1, obj2) {
            var i = 0, result = 0, numberOfProperties = props.length;
            /* try getting a different result from 0 (equal)
            * as long as we have extra properties to compare
            */
            while(result === 0 && i < numberOfProperties) {
                result = FileListWidgets.dynamicSort(props[i])(obj1, obj2);
                i++;
            }
            return result;
        }
      },
      showMsgSuccess: function() {
        document.getElementById("box-success").style.display = "block";
        setTimeout(function(){
            document.getElementById("box-success").style.display = "none";
        }, 1000);
      },
      showMsgError: function() {
        document.getElementById("box-error").style.display = "block";
        setTimeout(function(){
            document.getElementById("box-error").style.display = "none";
        }, 2000);
      },
      dragenter : function(e) {
        e.stopPropagation();
        e.preventDefault();
      },
      dragover : function(e) {
        e.stopPropagation();
        e.preventDefault();
      },
      drop : function(e) {
        e.stopPropagation();
        e.preventDefault();

        var dt = e.dataTransfer;
        var files = dt.files;
        FileListWidgets.handleDragnDropFiles(files);
      }
  }
  
    FileListWidgets.init();
})();


