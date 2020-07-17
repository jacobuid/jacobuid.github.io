function addTree(tree,data) {
    tree.tree({
        data: data,
        //dragAndDrop: true,
        autoOpen: true,
        useContextMenu: false,
        onCanSelectNode: function (node) {
            if (node.children.length == 0) {
                // Nodes without children can be selected
                return true;
            }
            else {
                // Nodes with children cannot be selected
                return false;
            }
        }
    });
}

function addFilteredTree(tree, filter, _filtering, thread, data) {

    tree.tree({
        data: data,
        //dragAndDrop: true,
        autoOpen: true,
        useContextMenu: false,
        onCreateLi: function (node, $li) {
            
			var title = $li.find('.jqtree-title');
            var search = filter.val().toLowerCase();
            var value = title.text().toLowerCase();
			
            if (search !== '') {
                
				var _parent = node.parent;
				var _parentValue = (typeof _parent.name === 'string')? _parent.name.toLowerCase() : "";
				$li.hide();
				while (typeof (_parent.element) !== 'undefined') {
					if (value.indexOf(search) > -1 || _parentValue.indexOf(search) > -1) {
						$li.show();
						$(_parent.element).show().addClass('jqtree-filtered');
                    }
					_parent = _parent.parent;
					_parentValue = (typeof _parent.name === 'string')? _parent.name.toLowerCase() : "";
                }
                if (!_filtering) {
                    _filtering = true;
                };
                if (!tree.hasClass('jqtree-filtering')) {
                    tree.addClass('jqtree-filtering');
                };
            } else {
                if (_filtering) {
                    _filtering = false;
                };
                if (tree.hasClass('jqtree-filtering')) {
                    tree.removeClass('jqtree-filtering');
                };
            };

        },
        onCanSelectNode: function (node) {
            if (node.children.length == 0) {
                // Nodes without children can be selected
                return true;
            }
            else {
                // Nodes with children cannot be selected
                return false;
            }
        }
    });
    filter.keyup(function () {
        clearTimeout(thread);
        thread = setTimeout(function () {
            tree.tree('loadData', data);
        }, 50);
    });

}