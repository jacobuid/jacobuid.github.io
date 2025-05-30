// Remove this before adding to framework
window.top.addEventListener('markerClicked', function (e) {
    console.info(e);
    console.log('Point Name: ' + e.detail.name);
    console.log('Point [x] Cordinate: ' + e.detail.value.x);
    console.log('Point [y] Cordinate: ' + e.detail.value.y);
    alert(
        'Point Name: ' + e.detail.name +
        '\nPoint [x] Cordinate: ' + e.detail.value.x +
        '\nPoint [y] Cordinate: ' + e.detail.value.y);
}, false);

var InteractiveSiteMap = {

    // Touch Avalible
    touch: 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0,

    // Create the event.
    createEvent: function (marker, e) {
        var self = this;
        window.top[e] = new CustomEvent(e, {
            detail: {
                name: marker, //Name of the marker on map
                value: self.data.levels[self.data.level].entities[marker] //url string or html content
            }
        });

        //Deploy the event
        window.top.dispatchEvent(window.top.markerClicked);
    },

    // Get Session Data
    saveData: function () {
        var self = this;
        sessionStorage.setItem('SiteMapData', JSON.stringify(self.data));
        self.drawActions();
    },

    // Show New Entity Dialog
    toggleNewEntity: function (form) {
        var self = this;
        if (form) {
            var _markup = '<form class="entityForm well">';
                _markup +=      '<p>Add Entity</p>';
                _markup +=      '<input class="form-control form-group" type="text"/>';
                _markup +=      '<select class="form-control form-group">';
                _markup +=          '<option value="">-- Select Icon --</option>';
                $.each(self.data.icons, function ( index, value ) {
                    _markup +=      '<option value="' + value + '">' + value + '</option>';
                });
                _markup +=      '</select>';
                _markup +=      '<input type="submit" value="Submit" class="btn btn-primary btn-sm btn-block"/>';
                _markup += '</form>';
            
        } else {
            var _markup = '<button class="btn btn-default navbar-btn add">Add Unit/Amenity</button>';
        }

        $(self.$map.$actions.$new).html(_markup);


        self.$map.$actions.find('.add').on('click', function (e) {
            self.toggleNewEntity(true);
        });  

        self.$map.$actions.find('.entityForm').on('submit', function (e) {
            e.preventDefault();
            var _form = this;
            var _name = $($.parseHTML(_form[0].value)).text();
            var _icon = $($.parseHTML(_form[1].value)).text();
            if(_name){
                self.addEntity(_name, _icon);
            }
            self.toggleNewEntity(false);
        });
    },

    // Add An Unassigned/Avalible Entity
    addEntity: function (name, icon) {
        var self = this;
        self.data.levels[self.data.level].entities[name] = {
            name:name,
            icon: icon,
            x: null,
            y: null,
            assigned: false
        };
        self.drawActions();
        self.saveData();
        return self.data.levels[self.data.level].entities[name];
    },

    // Set data to be Assigned
    assign: function (name, cord) {
        var self = this;
        self.data.levels[self.data.level].entities[name].assigned = true;
        self.data.levels[self.data.level].entities[name].x = cord.x;
        self.data.levels[self.data.level].entities[name].y = cord.y;
        self.saveData();
        return self.data.levels[self.data.level].entities[name];
    },

    // Set data to be Unassigned
    unassign: function (name) {
        var self = this;
        self.data.levels[self.data.level].entities[name].assigned = false;
        self.data.levels[self.data.level].entities[name].x = null;
        self.data.levels[self.data.level].entities[name].y = null;
        self.saveData();
        return self.data.levels[self.data.level].entities[name];
    },

    // Get Entity using name
    getEntity: function (name) {
        var self = this;
        return self.data.levels[self.data.level].entities[name];
    },

    // Set Cordinates
    setCords: function (name, value) {
        var self = this;
        self.data.levels[self.data.level].entities[name].x = value.x;
        self.data.levels[self.data.level].entities[name].y = value.y;
        self.saveData();
    },

    // Get Cordinates from Event
    getCords: function (e) {
        var self = this;
        var _cords = {
            x: (( e.clientX - self.$map.$canvas.offset().left + $(window.top).scrollLeft() ) / self.$map.$canvas.width()) * 100,
            y: (( e.clientY - self.$map.$canvas.offset().top + $(window.top).scrollTop() ) / self.$map.$canvas.height()) * 100
        }
        return _cords;
    },

    // Set Percentage from Cordinates
    getPercent: function (cords) {
        var self = this;
        var _cords = {
            x: ( cords.x / self.$map.$canvas.width() ) * 100,
            y: ( cords.y / self.$map.$canvas.height() ) * 100
        }
        return _cords;
    },

    // Resize Map on Window Resize
    resizeCanvas: function () {
        var self = this;
        self.$map.$canvas.width(self.$map.$image.width());
        self.$map.$canvas.height(self.$map.$image.height());
        self.$map.$canvas.css('margin-left', '-' + (self.$map.$image.width() / 2) + 'px');
    },

    // Get Icon
    getIcon: function (unit) {
        switch (unit.icon) {
            case 'apartment':
                var _icon = 'fa-home';
                break;
            case 'garage':
                var _icon = 'fa-car';
                break;
            case 'tree':
                var _icon = 'fa-tree';
                break;
            case 'water':
                var _icon = 'fa-tint';
                break;
            case 'marker':
                var _icon = 'fa-map-marker';
                break;
            default:
                var _icon = 'fa-map-marker';

        }
        return _icon;
    },

    // Draw Marker on the Canvas
    drawMarker: function (cords) {
        var self = this;
        
        var _marker = document.createElement('i');
        _marker.setAttribute('class', 'marker no-select fa fa-map-marker');
        _marker.setAttribute('style', 'width:' + self.data.markerSize + 'px; height:' + self.data.markerSize + 'px; font-size:' + self.data.markerSize + 'px; position:absolute; left:' + cords.x + '%; top:' + cords.y + '%; text-align:center');

        if (self.data.markerSize) {
            _marker.style.marginLeft = '-' + (self.data.markerSize / 2) + 'px';
            _marker.style.marginTop = '-' + (self.data.markerSize / 2) + 'px';
        }

        self.$map.$canvas.append(_marker);

        return _marker;

        // Marker DOM Created Above
        //  <i class="marker glyphicon [icon]"></i>
    },

    // Assign Marker to Entity
    assignMarker: function (marker, unit, e) {
        var self = this;

        var _icon = self.getIcon(unit);
        marker.setAttribute('class', 'marker no-select fa ' + _icon);
        marker.setAttribute('data-name', unit.name);
        $(marker).data('name', unit.name);


        if (self.data.role === 'user') {
            self.startUser();
        } else {
            if (!e) {
                // Only Add tooltip when the marker is created
                self.addTooltip(marker, unit);
            }

            self.startAdmin();
        }
        

        return marker;
    },

    // Draw the content of te Tooltip
    drawTooltipContent: function (unit) {
        var self = this;
        var _markup = '<select class="form-control form-group new-marker-select select-unit">';
        $.each(self.data.levels[self.data.level].entities, function (name, value) {
            if (value.assigned === false) {
                _markup += '<option value="' + name + '">' + name + '</option>';
            } else {
                if (value.assigned === true && value.name === unit.name) {
                    _markup += '<option selected value="' + name + '">' + name + '</option>';
                }
            }
        });
        _markup += '</select>';
        _markup += '<button class="btn btn-danger delete-marker">Delete ' + unit.name.charAt(0).toUpperCase() + unit.name.slice(1) + '</button>';
        return _markup;
    },

    // Create tooltip
    addTooltip: function (marker, unit) {
        var self = this;

        if (unit) {
            var openTooltip = function (e) {
                e.preventDefault();
                contextTooltip.open();
            }
            var contextTooltip = new Drop({
                target: $(marker)[0],
                content: function () {

                    var _markup = self.drawTooltipContent(unit);
                    return _markup;
                },
                position: 'bottom center',
                openOn: null,
                remove: false,
                constrainToWindow: true,
                constrainToScrollParent: true,
                classes: 'drop-theme-arrows-bounce-dark'
            });

            if (self.touch) {
                contextTooltip.target.removeEventListener('touchend', openTooltip, false);
                contextTooltip.target.addEventListener('touchend', openTooltip, false);
            } else {
                contextTooltip.target.removeEventListener('mouseup', openTooltip, false);
                contextTooltip.target.addEventListener('mouseup', openTooltip, false);
            }
            
            contextTooltip.on('open', function (e) {

                // Tooltip opened
                var _drop = this, origVal = '';

                $(_drop.content).find('.select-unit').off().on('focus', function () {
                    origVal = this.value;
                }).on('change', function (e) {
                    var _cords = {
                        x: parseInt($(_drop.target).css('left').replace('px', '')),
                        y: parseInt($(_drop.target).css('top').replace('px', '')),
                    }
                    _cords = self.getPercent(_cords);

                    unit = self.assign(this.value, _cords);
                    self.unassign(origVal);
                    self.assignMarker(_drop.target, unit, e);
                    self.saveData();
                    _drop.remove();
                });

                $(_drop.content).find('.delete-marker').off().on('click', function (e) {
                    self.deleteMarker(_drop, unit.name);
                });

                

                if (self.touch) {

                    // Touch Screen Only Events
                    $(_drop.content).find('.select-unit').focus();
                    document.addEventListener('touchstart', function (e) {
                        if (!$(e.target).closest(_drop.content).length && e.target !== _drop.target) {
                            _drop.remove();
                        }
                    });

                } else {

                    // Mouse Only Events
                    $(document).on('click', function (e) {
                        if (!$(e.target).closest(_drop.content).length && e.target !== _drop.target) {
                            _drop.remove();
                        }
                    });

                }

            });
            contextTooltip.on('close', function (e) {
                // Tooltip Closed

            });
        } else {
            var eventToggle = function (e, _drop) {
                if (!$(e.target).closest(_drop.content).length && e.target !== _drop.target) {
                    self.deleteMarker(_drop);
                }
            };
            var newTooltip = new Drop({
                target: $(marker)[0],
                content: function () {

                    var _markup = '<select class="form-control new-marker-select select-unit">';
                    _markup += '<option value="">-- Assign Entity --</option>';
                    $.each(self.data.levels[self.data.level].entities, function (name, value) {
                        if (value.assigned === false) {
                            _markup += '<option value="' + name + '">' + name + '</option>';
                        }
                    });
                    _markup += '</select>';

                    return _markup;


                },
                position: 'bottom center',
                openOn: 'always',
                remove: true,
                constrainToWindow: true,
                constrainToScrollParent: true,
                classes: 'drop-theme-arrows-bounce-dark'
            });
            newTooltip.on('open', function (e) {
                // Tooltip opened
                var _drop = this;
                
                $(_drop.content).find('.select-unit').off().on('change', function (e) {
                    var _cords = {
                        x: parseInt($(_drop.target).css('left').replace('px', '')),
                        y: parseInt($(_drop.target).css('top').replace('px', '')),
                    }
                    _cords = self.getPercent(_cords);

                    var _unit = self.assign(this.value,_cords);
                    self.assignMarker(_drop.target, _unit);
                    self.saveData();
                    self.drawActions();
                    _drop.remove();
                });


                if (self.touch) {

                    // Touch Screen Only Events
                    $(_drop.content).find('.select-unit').focus();
                    $(document).on('touchstart', function (e) {
                        eventToggle(e,_drop)
                    });

                } else {

                    // Mouse Only Events
                    $(document).on('click', function (e) {
                        eventToggle(e, _drop);
                    });

                }
            });
            newTooltip.on('close', function (e) {
                // Tooltip Closed
                var _drop = this;
                if (self.touch) {
                    $(document).off('touchstart');
                } else {
                    // Mouse Only Events
                    $(document).off('click');

                }
            });
        }
    },

    // Start moving the Marker
    moveMarker: function (marker, e) {
        var self = this; 

        // Desktop
        if (!e.targetTouches) {
            // Offset of the Element from Container *
            var _origCords = self.getCords(e);

            document.onmousemove = function (e) {
                // Cursor offset from Canvas
                var _newCords = self.getCords(e);

                var _movementX = _newCords.x - _origCords.x;
                var _movementY = _newCords.y - _origCords.y;

                var posX = _origCords.x + _movementX;
                var posY = _origCords.y + _movementY;

                // Keep Marker inside Canvas
                if (posX < 0) { posX = 0; }
                if (posY < 0) { posY = 0; }
                if (posX > 100) { posX = 100; }
                if (posY > 100) { posY = 100; }

                // Move Element
                marker.style.left = posX + '%';
                marker.style.top = posY + '%';
            }
        }
        // Mobile
        else {
            var touch = e.targetTouches[0];

            // Offset of the Touch from Container *
            var _cords = self.getCords(touch);

            // Keep Marker inside Canvas
            if (_cords.x < 0) { _cords.x = 0; }
            if (_cords.y < 0) { _cords.y = 0; }
            if (_cords.x > 100) { _cords.x = 100; }
            if (_cords.y > 100) { _cords.y = 100; }

            // Move Element
            marker.style.left = _cords.x + '%';
            marker.style.top = _cords.y + '%';

            self.setCords($(marker).data('name'), _cords);

        }
        
    },

    // Stop moving the Marker
    stopMoving: function (marker, e) {
        var self = this;
        document.onmousemove = function () { }
        var _newCords = self.getCords(e);
        self.setCords($(marker).data('name'), _newCords);
    },

    // Add Marker from Canvas
    deleteMarker: function (drop, name) {
        var self = this;
        if (name) { self.unassign(name); };
        // Remove Marker from DOM
        $(drop.target).remove()
        drop.remove();
    },

    // Set Canvas events for Admin
    startAdmin: function () {
        var self = this;

        self.$map.removeClass('user').addClass('admin');


        // Get all Markers
        self.$map.$markers = self.$map.find('.marker');

        // Add New Marker
        self.$map.$canvas.off('click').on('click', function (e) {
            if (!$(e.target).is('.marker')) {

                var _cords = self.getCords(e);
                var _unassignedMarker = self.drawMarker(_cords);
                self.addTooltip(_unassignedMarker);

            }
        });

        // Marker Events    
        self.$map.$markers.off();

        self.$map.$markers.on('mousedown', function (e) {
                if (e.which === 1) {
                    self.moveMarker(this, e);
                }
            })
            .on('mouseup', function (e) {
                if (e.which === 1) {
                    self.stopMoving(this, e);
                }
            }).on('touchmove', function (event) {
                event.preventDefault();
                console.log('touch started');
                var e = event.originalEvent;
                self.moveMarker(this, e);
            });

        

    },

    // Set Canvas events for User
    startUser: function () {
        var self = this;

        self.$map.removeClass('admin').addClass('user');
        // Get all Markers
        self.$map.$markers = self.$map.find('.marker');

        self.$map.$markers.off().on('mouseup', function (e) {
            if (e.which === 1) {
                self.createEvent($(this).data('name'), 'markerClicked');
            }
        });
    },

    // Show/Refresh the Unassigned Entities
    drawActions: function () {
        var self = this;

        // Unassigned Entities
        var _markup = '<div class="well">';
            _markup +=      '<p>Unassigned Units/Amenities:</p>';

            $.each(self.data.levels[self.data.level].entities, function (name, value) {
                if (value.assigned === false) {
                    _markup += '<p>' + name + '</p>';

                }
            });
            _markup +=      '<div class="new"></div>';
            _markup += '</div>';

        // Add New Entities
        

        self.$map.$actions.html(_markup);
        self.$map.$actions.$new = self.$map.$actions.find('.new');

        if (self.data.amenities) {
            self.toggleNewEntity(false);
        }
        
    },

    // Draw Level Select
    buildLevel: function () {
        var self = this;
        var _markup = '<select class="form-control form-group level-select">';
                _markup += '<option value="">-- Select Level --</option>';
            $.each(self.data.levels, function (name, value) {
                _markup += '<option value="' + name + '">' + value.name + '</option>';
            });
            _markup += '<select>';
            self.$map.$levels.html(_markup);
    },

    // Draw Level Select
    selectLevel: function () {
        var self = this;
        var $select = self.$map.$levels.find('.level-select');

        $select.val(self.data.level);

        $select.on('change', function (e) {
            self.data.level = this.value;
            self.saveData();
            self.init(self.$map, self.data);
        });
    },

    // Draw the Container, Map and Canvas
    drawMap: function () {
        var self = this;

        // SECTION: clip
        var wrapper = document.createElement('section');
        wrapper.setAttribute('class', 'wrapper clearfix');
        wrapper.setAttribute('style', 'display:none');

        // DIV: clip
        var clip = document.createElement('div');
        if (self.data.role === 'admin') {
            clip.setAttribute('class', 'clip col-md-9');
        }
        if (self.data.role === 'user') {
            clip.setAttribute('class', 'clip col-md-12');
        }
        wrapper.appendChild(clip);

        // DIV: view
        var view = document.createElement('div');
        view.setAttribute('class', 'view');
        clip.appendChild(view);

        // DIV: Levels
        var levels = document.createElement('div');
        levels.setAttribute('class', 'levels');
        clip.appendChild(levels);

        // IMG: image
        var image = document.createElement('img');
        image.setAttribute('src', self.data.levels[self.data.level].img);
        image.setAttribute('class', 'image no-select');
        view.appendChild(image);

        // DIV: canvas
        var canvas = document.createElement('div');
        canvas.setAttribute('class', 'canvas no-select');
        view.appendChild(canvas);       

        // ASIDE: actions
        if (self.data.role === 'admin') {
            var actions = document.createElement('aside');
            actions.setAttribute('class', 'actions col-md-3');
            wrapper.appendChild(actions);
        }

        return wrapper;
    },

    // Initialize the Interactive Site Map
    init: function (map,data) {

        var self = this;
        self.data = data;
        if (map) { self.$map = map; }
        
        self.$map.addClass('ism');

        if (self.data) {
            
            if (self.data.level === null) {
                self.data.level = 0;
            }
            var _wrapper = self.drawMap();

            // Add the structure to the "#map" container
            self.$map.html(_wrapper).promise().done(function () {

                
                self.$map.$wrapper = this.find('.wrapper');
                self.$map.$actions = this.find('.actions');
                self.$map.$clip = this.find('.clip');
                self.$map.$view = this.find('.view');
                self.$map.$image = this.find('.image');
                self.$map.$canvas = this.find('.canvas');
                self.$map.$levels = this.find('.levels');
                
                self.drawActions();

                self.buildLevel();
                self.selectLevel();

                $.each(self.data.levels[self.data.level].entities, function (name, unit) {
                    if (unit.assigned === true) {
                        var _cords = { x: unit.x, y: unit.y };
                        var _unassignedMarker = self.drawMarker(_cords);
                        var _assignedMarker = self.assignMarker(_unassignedMarker, unit);
                    }
                });

                if (self.data.role === 'admin') {
                    self.startAdmin();
                }

                if (self.data.role === 'user') {
                    self.startUser();
                }

                setTimeout(function () {
                    // Set Canvas Size to Image Size
                    self.$map.$wrapper.fadeIn(1000);
                    self.resizeCanvas();
                }, 500);

                $(window.top).resize(function () {
                    self.resizeCanvas();
                });

            });
        } else {
            self.$map.html('No data.');
        }
        

    }

};

$.fn.addISM = function (data) {
    InteractiveSiteMap.init(this,data);
};