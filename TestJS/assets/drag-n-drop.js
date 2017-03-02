(function()
{
    this.DragDropFiles = function() {
        // check old browsers doesn't support 
        if( !document.querySelectorAll 
                || !('draggable' in document.createElement('span')) 
                || window.opera
        ) 
        { return; }
        this.init();
    }

    DragDropFiles.prototype.init = function() {
        //get the collection of draggable items and add their draggable attribute
        var items = document.querySelectorAll('[data-draggable="item"]');
        var len = items.length;
        for(i = 0; i < len; i ++) {
            items[i].setAttribute('draggable', 'true');
        }
        
        //variable for storing the dragging item reference 
        var item = null;

        //dragstart event to initiate mouse dragging
        document.addEventListener('dragstart', function(e){
            //set the item reference to this element
            item = e.target;
            e.dataTransfer.setData('text', '');
        }, false);

        //dragover event to allow the drag by preventing its default
        document.addEventListener('dragover', function(e) {
            if(item) {
                e.preventDefault();
            }
        }, false);	

        //drop event to allow the element to be dropped into valid targets
        document.addEventListener('drop', function(e){
            //if this element is a drop target, move the item here 
            //then prevent default to allow the action (same as dragover)
            if(e.target.getAttribute('data-draggable') == 'target'){
                e.target.appendChild(item);
                e.preventDefault();
            } else {
                // Todo: remove it in the dataListWidgets

            // if this element drop out of target, remove it
               item.parentNode.removeChild(item);
               item = null;
            }
        }, false);

        //dragend event to clean-up after drop or abort
        // reset item to null
        document.addEventListener('dragend', function(e){
            item = null;
        }, false);
    }

})();	
