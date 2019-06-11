(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Tribute = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _TributeEvents = require("./TributeEvents");

var _TributeEvents2 = _interopRequireDefault(_TributeEvents);

var _TributeMenuEvents = require("./TributeMenuEvents");

var _TributeMenuEvents2 = _interopRequireDefault(_TributeMenuEvents);

var _TributeRange = require("./TributeRange");

var _TributeRange2 = _interopRequireDefault(_TributeRange);

var _TributeSearch = require("./TributeSearch");

var _TributeSearch2 = _interopRequireDefault(_TributeSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tribute = function () {
    function Tribute(_ref) {
        var _this = this;

        var _ref$values = _ref.values,
            values = _ref$values === undefined ? null : _ref$values,
            _ref$iframe = _ref.iframe,
            iframe = _ref$iframe === undefined ? null : _ref$iframe,
            _ref$selectClass = _ref.selectClass,
            selectClass = _ref$selectClass === undefined ? 'highlight' : _ref$selectClass,
            _ref$trigger = _ref.trigger,
            trigger = _ref$trigger === undefined ? '@' : _ref$trigger,
            _ref$autocompleteMode = _ref.autocompleteMode,
            autocompleteMode = _ref$autocompleteMode === undefined ? false : _ref$autocompleteMode,
            _ref$selectTemplate = _ref.selectTemplate,
            selectTemplate = _ref$selectTemplate === undefined ? null : _ref$selectTemplate,
            _ref$menuItemTemplate = _ref.menuItemTemplate,
            menuItemTemplate = _ref$menuItemTemplate === undefined ? null : _ref$menuItemTemplate,
            _ref$lookup = _ref.lookup,
            lookup = _ref$lookup === undefined ? 'key' : _ref$lookup,
            _ref$fillAttr = _ref.fillAttr,
            fillAttr = _ref$fillAttr === undefined ? 'value' : _ref$fillAttr,
            _ref$collection = _ref.collection,
            collection = _ref$collection === undefined ? null : _ref$collection,
            _ref$menuContainer = _ref.menuContainer,
            menuContainer = _ref$menuContainer === undefined ? null : _ref$menuContainer,
            _ref$scrollContainer = _ref.scrollContainer,
            scrollContainer = _ref$scrollContainer === undefined ? null : _ref$scrollContainer,
            _ref$noMatchTemplate = _ref.noMatchTemplate,
            noMatchTemplate = _ref$noMatchTemplate === undefined ? null : _ref$noMatchTemplate,
            _ref$headerTemplate = _ref.headerTemplate,
            headerTemplate = _ref$headerTemplate === undefined ? null : _ref$headerTemplate,
            _ref$requireLeadingSp = _ref.requireLeadingSpace,
            requireLeadingSpace = _ref$requireLeadingSp === undefined ? true : _ref$requireLeadingSp,
            _ref$allowSpaces = _ref.allowSpaces,
            allowSpaces = _ref$allowSpaces === undefined ? false : _ref$allowSpaces,
            _ref$replaceTextSuffi = _ref.replaceTextSuffix,
            replaceTextSuffix = _ref$replaceTextSuffi === undefined ? null : _ref$replaceTextSuffi,
            _ref$positionMenu = _ref.positionMenu,
            positionMenu = _ref$positionMenu === undefined ? true : _ref$positionMenu,
            _ref$spaceSelectsMatc = _ref.spaceSelectsMatch,
            spaceSelectsMatch = _ref$spaceSelectsMatc === undefined ? false : _ref$spaceSelectsMatc,
            _ref$selectWithComma = _ref.selectWithComma,
            selectWithComma = _ref$selectWithComma === undefined ? false : _ref$selectWithComma,
            _ref$searchOpts = _ref.searchOpts,
            searchOpts = _ref$searchOpts === undefined ? {} : _ref$searchOpts,
            _ref$editor = _ref.editor,
            editor = _ref$editor === undefined ? {} : _ref$editor,
            _ref$isValidSelection = _ref.isValidSelection,
            isValidSelection = _ref$isValidSelection === undefined ? null : _ref$isValidSelection,
            _ref$menuItemLimit = _ref.menuItemLimit,
            menuItemLimit = _ref$menuItemLimit === undefined ? null : _ref$menuItemLimit;

        _classCallCheck(this, Tribute);

        this.autocompleteMode = autocompleteMode;
        this.menuSelected = 0;
        this.current = {};
        this.inputEvent = false;
        this.isActive = false;
        this.menuContainer = menuContainer;
        this.scrollContainer = scrollContainer;
        this.allowSpaces = allowSpaces;
        this.replaceTextSuffix = replaceTextSuffix;
        this.positionMenu = positionMenu;
        this.hasTrailingSpace = false;
        this.spaceSelectsMatch = spaceSelectsMatch;
        this.selectWithComma = selectWithComma;
        this.invalidEvent = document.createEvent('Event');
        this.invalidEvent.initEvent('invalid', true, true);

        if (this.autocompleteMode) {
            trigger = '';
            allowSpaces = false;
        }

        if (values) {
            this.collection = [{
                // symbol that starts the lookup
                trigger: trigger,

                // is it wrapped in an iframe
                iframe: iframe,

                // class applied to selected item
                selectClass: selectClass,

                // function called on select that retuns the content to insert
                selectTemplate: (selectTemplate || Tribute.defaultSelectTemplate).bind(this),

                // function called that returns content for an item
                menuItemTemplate: (menuItemTemplate || Tribute.defaultMenuItemTemplate).bind(this),

                // function called when menu is empty, disables hiding of menu.
                noMatchTemplate: function (t) {
                    if (typeof t === 'function') {
                        return t.bind(_this);
                    }

                    return noMatchTemplate || function () {
                        return '';
                    }.bind(_this);
                }(noMatchTemplate),

                headerTemplate: function (t) {
                    if (typeof t === 'function') {
                        return t.bind(_this);
                    }

                    return headerTemplate || function () {
                        return '';
                    }.bind(_this);
                }(headerTemplate),

                // column to search against in the object
                lookup: lookup,

                // column that contains the content to insert by default
                fillAttr: fillAttr,

                // array of objects or a function returning an array of objects
                values: values,

                requireLeadingSpace: requireLeadingSpace,

                searchOpts: searchOpts,

                editor: editor,

                selectWithComma: selectWithComma,

                isValidSelection: function (t) {
                    if (typeof t === 'function') {
                        return t.bind(_this);
                    }

                    return isValidSelection || function () {
                        return '';
                    }.bind(_this);
                }(isValidSelection),

                menuItemLimit: menuItemLimit
            }];
        } else if (collection) {
            if (this.autocompleteMode) console.warn('Tribute in autocomplete mode does not work for collections');
            this.collection = collection.map(function (item) {
                return {
                    trigger: item.trigger || trigger,
                    iframe: item.iframe || iframe,
                    selectClass: item.selectClass || selectClass,
                    selectTemplate: (item.selectTemplate || Tribute.defaultSelectTemplate).bind(_this),
                    menuItemTemplate: (item.menuItemTemplate || Tribute.defaultMenuItemTemplate).bind(_this),
                    // function called when menu is empty, disables hiding of menu.
                    noMatchTemplate: function (t) {
                        if (typeof t === 'function') {
                            return t.bind(_this);
                        }

                        return null;
                    }(noMatchTemplate),
                    headerTemplate: function (t) {
                        if (typeof t === 'function') {
                            return t.bind(_this);
                        }

                        return null;
                    }(headerTemplate),
                    lookup: item.lookup || lookup,
                    fillAttr: item.fillAttr || fillAttr,
                    values: item.values,
                    requireLeadingSpace: item.requireLeadingSpace,
                    searchOpts: item.searchOpts || searchOpts,
                    editor: item.editor || editor,
                    isValidSelection: function (t) {
                        if (typeof t === 'function') {
                            return t.bind(_this);
                        }

                        return null;
                    }(isValidSelection),
                    menuItemLimit: item.menuItemLimit || menuItemLimit
                };
            });
        } else {
            throw new Error('[Tribute] No collection specified.');
        }

        new _TributeRange2.default(this);
        new _TributeEvents2.default(this);
        new _TributeMenuEvents2.default(this);
        new _TributeSearch2.default(this);
    }

    _createClass(Tribute, [{
        key: "triggers",
        value: function triggers() {
            return this.collection.map(function (config) {
                return config.trigger;
            });
        }
    }, {
        key: "attach",
        value: function attach(el, editor) {
            if (!el) {
                throw new Error('[Tribute] Must pass in a DOM node or NodeList.');
            }

            // Check if it is a jQuery collection
            if (typeof jQuery !== 'undefined' && el instanceof jQuery) {
                el = el.get();
            }

            // Is el an Array/Array-like object?
            if (el.constructor === NodeList || el.constructor === HTMLCollection || el.constructor === Array) {
                var length = el.length;
                for (var i = 0; i < length; ++i) {
                    this._attach(el[i]);
                }
            } else {
                this._attach(el, editor);
            }
        }
    }, {
        key: "_attach",
        value: function _attach(el, editor) {
            if (el.hasAttribute('data-tribute')) {
                console.warn('Tribute was already bound to ' + el.nodeName);
            }

            this.ensureEditable(el);
            this.events.bind(el, editor);

            if (this.scrollContainer) {
                this.scrollContainer.addEventListener('scroll', this.scrollEvent.bind(this));
            }

            el.setAttribute('data-tribute', true);
        }
    }, {
        key: "scrollEvent",
        value: function scrollEvent(e) {
            this.events.scroll(this, e);
        }
    }, {
        key: "ensureEditable",
        value: function ensureEditable(element) {
            if (Tribute.inputTypes().indexOf(element.nodeName) === -1) {
                if (element.contentEditable) {
                    element.contentEditable = true;
                } else {
                    throw new Error('[Tribute] Cannot bind to ' + element.nodeName);
                }
            }
        }
    }, {
        key: "createMenu",
        value: function createMenu() {
            var wrapper = this.range.getDocument().createElement('div'),
                ul = this.range.getDocument().createElement('ul');

            wrapper.className = 'tribute-container';
            wrapper.appendChild(ul);

            if (this.menuContainer) {
                return this.menuContainer.appendChild(wrapper);
            }

            return this.range.getDocument().body.appendChild(wrapper);
        }
    }, {
        key: "showMenuFor",
        value: function showMenuFor(element, scrollTo) {
            var _this2 = this;

            // Only proceed if menu isn't already shown for the current element & mentionText
            if (this.isActive && this.current.element === element && this.current.mentionText === this.currentMentionTextSnapshot) {
                return;
            }
            this.currentMentionTextSnapshot = this.current.mentionText;

            // create the menu if it doesn't exist.
            if (!this.menu) {
                this.menu = this.createMenu();
                element.tributeMenu = this.menu;
                this.menuEvents.bind(this.menu);
            }

            this.isActive = true;
            this.menuSelected = 0;

            if (!this.current.mentionText) {
                this.current.mentionText = '';
            }

            var processValues = function processValues(values, text) {
                // Tribute may not be active any more by the time the value callback returns
                if (!_this2.isActive) {
                    return;
                }

                var items = _this2.search.filter(_this2.current.mentionText, values, {
                    pre: _this2.current.collection.searchOpts.pre || '<span>',
                    post: _this2.current.collection.searchOpts.post || '</span>',
                    extract: function extract(el) {
                        if (typeof _this2.current.collection.lookup === 'string') {
                            return el[_this2.current.collection.lookup];
                        } else if (typeof _this2.current.collection.lookup === 'function') {
                            return _this2.current.collection.lookup(el, _this2.current.mentionText);
                        } else {
                            throw new Error('Invalid lookup attribute, lookup must be string or function.');
                        }
                    }
                });

                _this2.current.filteredItems = items;

                var ul = _this2.menu.querySelector('ul');

                _this2.range.positionMenuAtCaret(scrollTo);

                if (_this2.current.collection.headerTemplate && _this2.current.collection.headerTemplate(text)) {
                    var header = document.createElement('div');
                    header.setAttribute("class", "header");
                    header.innerHTML = _this2.current.collection.headerTemplate(text);
                    var oldHeader = _this2.menu.querySelector(".header");
                    if (oldHeader && oldHeader.remove) {
                        oldHeader.remove();
                    } else if (oldHeader && !oldHeader.remove) {
                        oldHeader.parentNode.removeChild(oldHeader);
                    }
                    _this2.menu.insertBefore(header, _this2.menu.childNodes[0]);
                }

                if (!items.length) {
                    var noMatchEvent = new CustomEvent('tribute-no-match', { detail: _this2.menu });
                    _this2.current.element.dispatchEvent(noMatchEvent);
                    if (!_this2.current.collection.noMatchTemplate) {
                        _this2.hideMenu();
                    } else {
                        ul.innerHTML = _this2.current.collection.noMatchTemplate();
                    }

                    return;
                }

                if (_this2.current.collection.menuItemLimit) {
                    items = items.slice(0, _this2.current.collection.menuItemLimit);
                }

                ul.innerHTML = '';
                var fragment = _this2.range.getDocument().createDocumentFragment();

                items.forEach(function (item, index) {
                    var li = _this2.range.getDocument().createElement('li');
                    li.setAttribute('data-index', index);
                    li.addEventListener('mousemove', function (e) {
                        var li = e.target;
                        var index = li.getAttribute('data-index') || li.parentNode && li.parentNode.getAttribute('data-index');
                        if (e.movementY !== 0) {
                            _this2.events.setActiveLi(index);
                        }
                    });
                    if (_this2.menuSelected === index) {
                        li.className = _this2.current.collection.selectClass;
                    }
                    li.innerHTML = _this2.current.collection.menuItemTemplate(item);
                    fragment.appendChild(li);
                });
                ul.appendChild(fragment);
            };

            if (typeof this.current.collection.values === 'function') {
                this.current.collection.values(this.current.mentionText, processValues);
            } else {
                processValues(this.current.collection.values, this.current.mentionText);
            }
            this.menu.querySelector("ul").scrollTop = 0;
        }
    }, {
        key: "showMenuForCollection",
        value: function showMenuForCollection(element, collectionIndex) {
            if (element !== document.activeElement) {
                this.placeCaretAtEnd(element);
            }

            this.current.collection = this.collection[collectionIndex || 0];
            this.current.externalTrigger = true;
            this.current.element = element;

            if (element.isContentEditable) this.insertTextAtCursor(this.current.collection.trigger);else this.insertAtCaret(element, this.current.collection.trigger);

            this.showMenuFor(element);
        }

        // TODO: make sure this works for inputs/textareas

    }, {
        key: "placeCaretAtEnd",
        value: function placeCaretAtEnd(el) {
            el.focus();
            if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.body.createTextRange != "undefined") {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.collapse(false);
                textRange.select();
            }
        }

        // for contenteditable

    }, {
        key: "insertTextAtCursor",
        value: function insertTextAtCursor(text) {
            var sel, range, html;
            sel = window.getSelection();
            range = sel.getRangeAt(0);
            range.deleteContents();
            var textNode = document.createTextNode(text);
            range.insertNode(textNode);
            range.selectNodeContents(textNode);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
        }

        // for regular inputs

    }, {
        key: "insertAtCaret",
        value: function insertAtCaret(textarea, text) {
            var scrollPos = textarea.scrollTop;
            var caretPos = textarea.selectionStart;

            var front = textarea.value.substring(0, caretPos);
            var back = textarea.value.substring(textarea.selectionEnd, textarea.value.length);
            textarea.value = front + text + back;
            caretPos = caretPos + text.length;
            textarea.selectionStart = caretPos;
            textarea.selectionEnd = caretPos;
            textarea.focus();
            textarea.scrollTop = scrollPos;
        }
    }, {
        key: "hideMenu",
        value: function hideMenu() {
            if (this.menu) {
                this.menu.style.cssText = 'display: none;';
                this.isActive = false;
                this.menuSelected = 0;
                this.current = {};
            }
        }
    }, {
        key: "selectItemAtIndex",
        value: function selectItemAtIndex(index, originalEvent) {
            index = parseInt(index);
            if (typeof index !== 'number' || isNaN(index)) return;
            var item = this.current.filteredItems[index];
            if (typeof this.current.collection.isValidSelection === 'function' && this.current.collection.isValidSelection(item, this.current.collection.editor) === false) {
                this.current.collection.editor.el.dispatchEvent(this.invalidEvent);
                return;
            }
            var content = this.current.collection.selectTemplate(item);
            if (content !== null) this.replaceText(content, originalEvent, item);
        }
    }, {
        key: "replaceText",
        value: function replaceText(content, originalEvent, item) {
            this.range.replaceTriggerText(content, true, true, originalEvent, item);
        }
    }, {
        key: "_append",
        value: function _append(collection, newValues, replace) {
            if (typeof collection.values === 'function') {
                throw new Error('Unable to append to values, as it is a function.');
            } else if (!replace) {
                collection.values = collection.values.concat(newValues);
            } else {
                collection.values = newValues;
            }
        }
    }, {
        key: "append",
        value: function append(collectionIndex, newValues, replace) {
            var index = parseInt(collectionIndex);
            if (typeof index !== 'number') throw new Error('please provide an index for the collection to update.');

            var collection = this.collection[index];

            this._append(collection, newValues, replace);
        }
    }, {
        key: "appendCurrent",
        value: function appendCurrent(newValues, replace) {
            if (this.isActive) {
                this._append(this.current.collection, newValues, replace);
            } else {
                throw new Error('No active state. Please use append instead and pass an index.');
            }
        }
    }, {
        key: "detach",
        value: function detach(el) {
            if (!el) {
                throw new Error('[Tribute] Must pass in a DOM node or NodeList.');
            }

            // Check if it is a jQuery collection
            if (typeof jQuery !== 'undefined' && el instanceof jQuery) {
                el = el.get();
            }

            // Is el an Array/Array-like object?
            if (el.constructor === NodeList || el.constructor === HTMLCollection || el.constructor === Array) {
                var length = el.length;
                for (var i = 0; i < length; ++i) {
                    this._detach(el[i]);
                }
            } else {
                this._detach(el);
            }
        }
    }, {
        key: "_detach",
        value: function _detach(el) {
            var _this3 = this;

            this.events.unbind(el);
            if (el.tributeMenu) {
                this.menuEvents.unbind(el.tributeMenu);
            }
            if (this.scrollContainer) {
                this.scrollContainer.removeEventListener('scroll', this.scrollEvent);
            }

            setTimeout(function () {
                el.removeAttribute('data-tribute');
                _this3.isActive = false;
                if (el.tributeMenu) {
                    el.tributeMenu.remove();
                }
            });
        }
    }], [{
        key: "defaultSelectTemplate",
        value: function defaultSelectTemplate(item) {
            if (typeof item === 'undefined') return null;
            if (this.range.isContentEditable(this.current.element)) {
                return '<span class="tribute-mention">' + (this.current.collection.trigger + item.original[this.current.collection.fillAttr]) + '</span>';
            }

            return this.current.collection.trigger + item.original[this.current.collection.fillAttr];
        }
    }, {
        key: "defaultMenuItemTemplate",
        value: function defaultMenuItemTemplate(matchItem) {
            return matchItem.string;
        }
    }, {
        key: "inputTypes",
        value: function inputTypes() {
            return ['TEXTAREA', 'INPUT'];
        }
    }]);

    return Tribute;
}();

exports.default = Tribute;
module.exports = exports.default;

},{"./TributeEvents":2,"./TributeMenuEvents":3,"./TributeRange":4,"./TributeSearch":5,"./utils":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TributeEvents = function () {
    function TributeEvents(tribute) {
        _classCallCheck(this, TributeEvents);

        this.tribute = tribute;
        this.tribute.events = this;
    }

    _createClass(TributeEvents, [{
        key: 'bind',
        value: function bind(element, editor) {
            element.boundKeydown = this.keydown.bind(element, this, editor);
            element.boundKeyup = this.keyup.bind(element, this, editor);
            element.boundInput = this.input.bind(element, this, editor);

            element.addEventListener('keydown', element.boundKeydown, false);
            element.addEventListener('keyup', element.boundKeyup, false);
            element.addEventListener('input', element.boundInput, false);
        }
    }, {
        key: 'unbind',
        value: function unbind(element) {
            element.removeEventListener('keydown', element.boundKeydown, false);
            element.removeEventListener('keyup', element.boundKeyup, false);
            element.removeEventListener('input', element.boundInput, false);

            delete element.boundKeydown;
            delete element.boundKeyup;
            delete element.boundInput;
        }
    }, {
        key: 'scroll',
        value: function scroll(instance, e) {
            instance.isActive = false;
            instance.hideMenu();
        }
    }, {
        key: 'keydown',
        value: function keydown(instance, editor, event) {
            if (instance.tribute.isActive && [16, 17, 18, 20].includes(event.keyCode)) {
                return;
            }
            if (instance.shouldDeactivate(event)) {
                instance.tribute.isActive = false;
                instance.tribute.hideMenu();
            }

            var element = this;
            instance.commandEvent = false;

            TributeEvents.keys().forEach(function (o) {
                if (o.key === event.keyCode) {
                    instance.commandEvent = true;
                    instance.callbacks()[o.value.toLowerCase()](event, element, editor);
                }
            });
        }
    }, {
        key: 'input',
        value: function input(instance, event, editor) {
            instance.inputEvent = true;
            instance.keyup.call(this, instance, event, editor);
        }
    }, {
        key: 'click',
        value: function click(instance, event) {
            var tribute = instance.tribute;
            if (tribute.menu && tribute.menu.contains(event.target)) {
                event.preventDefault();
                event.stopPropagation();
                if (event.target.getAttribute("class") === "header" || event.target.tagName === "UL") {
                    return;
                }
                var li = event.target;
                while (li.nodeName.toLowerCase() !== 'li') {
                    li = li.parentNode;
                    if (!li || li === tribute.menu) {
                        throw new Error('cannot find the <li> container for the click');
                    }
                }
                tribute.selectItemAtIndex(li.getAttribute('data-index'), event);
                tribute.hideMenu();

                // TODO: should fire with externalTrigger and target is outside of menu
            } else if (tribute.current.element && !tribute.current.externalTrigger) {
                tribute.current.externalTrigger = false;
                setTimeout(function () {
                    return tribute.hideMenu();
                });
            }
        }
    }, {
        key: 'keyup',
        value: function keyup(instance, editor, event) {
            if (instance.tribute.isActive && [16, 17, 18, 20].includes(event.keyCode)) {
                return;
            }

            if (instance.inputEvent) {
                instance.inputEvent = false;
            }
            instance.updateSelection(this);
            if (event.keyCode === 27) return;

            if (editor && editor.charCounter && editor.charCounter.count() === 0) {
                instance.tribute.isActive = false;
                instance.tribute.hideMenu();
                return;
            }

            if (!instance.tribute.allowSpaces && instance.tribute.hasTrailingSpace) {
                instance.tribute.hasTrailingSpace = false;
                instance.commandEvent = true;
                instance.callbacks()["space"](event, this);
                return;
            }

            if (!instance.tribute.isActive) {
                if (instance.tribute.autocompleteMode) {
                    instance.callbacks().triggerChar(event, this, '');
                } else {
                    var keyCode = instance.getKeyCode(instance, this, event);

                    if (isNaN(keyCode) || !keyCode) return;

                    var trigger = instance.tribute.triggers().find(function (trigger) {
                        return trigger.charCodeAt(0) === keyCode;
                    });

                    if (typeof trigger !== 'undefined') {
                        instance.callbacks().triggerChar(event, this, trigger, true);
                    }
                }
            }

            if ((instance.tribute.current.trigger || instance.tribute.autocompleteMode) && instance.commandEvent === false || instance.tribute.isActive && [8, 46].includes(event.keyCode)) {
                if (event.keyCode === 81) {
                    var text = instance.tribute.range.getTextPrecedingCurrentSelection();
                    if (text.length > 1) {
                        instance.tribute.hideMenu();
                        return;
                    } else {
                        instance.tribute.showMenuFor(this, true);
                    }
                } else {
                    instance.tribute.showMenuFor(this, true);
                }
            }
        }
    }, {
        key: 'shouldDeactivate',
        value: function shouldDeactivate(event) {
            if (!this.tribute.isActive) return false;

            if (this.tribute.current.mentionText.length === 0) {
                var eventKeyPressed = false;
                TributeEvents.keys().forEach(function (o) {
                    if (event.keyCode === o.key) eventKeyPressed = true;
                });

                return !eventKeyPressed;
            }

            return false;
        }
    }, {
        key: 'getKeyCode',
        value: function getKeyCode(instance, el, event) {
            var char = void 0;
            var tribute = instance.tribute;
            var info = tribute.range.getTriggerInfo(false, tribute.hasTrailingSpace, true, tribute.allowSpaces, tribute.autocompleteMode);

            if (info) {
                return info.mentionTriggerChar.charCodeAt(0);
            } else {
                return false;
            }
        }
    }, {
        key: 'updateSelection',
        value: function updateSelection(el) {
            this.tribute.current.element = el;
            var info = this.tribute.range.getTriggerInfo(false, this.tribute.hasTrailingSpace, true, this.tribute.allowSpaces, this.tribute.autocompleteMode);

            if (info) {
                this.tribute.current.selectedPath = info.mentionSelectedPath;
                this.tribute.current.mentionText = info.mentionText;
                this.tribute.current.selectedOffset = info.mentionSelectedOffset;
            }
        }
    }, {
        key: 'callbacks',
        value: function callbacks() {
            var _this = this;

            return {
                triggerChar: function triggerChar(e, el, trigger) {
                    var showMenu = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

                    var text = _this.tribute.range.getTextPrecedingCurrentSelection();
                    var words = text.split(/\s/);
                    var lastWord = words[words.length - 1];
                    if (lastWord.split('@').length - 1 > 1) {
                        return;
                    }
                    if (lastWord.trim()[0] !== '@') {
                        return;
                    }
                    var tribute = _this.tribute;
                    tribute.current.trigger = trigger;

                    var collectionItem = tribute.collection.find(function (item) {
                        return item.trigger === trigger;
                    });

                    tribute.current.collection = collectionItem;
                    if (tribute.inputEvent || showMenu) tribute.showMenuFor(el, true);
                },
                enter: function enter(e, el) {
                    // choose selection
                    if (_this.tribute.isActive && _this.tribute.current.filteredItems) {
                        e.preventDefault();
                        e.stopPropagation();
                        setTimeout(function () {
                            _this.tribute.selectItemAtIndex(_this.tribute.menuSelected, e);
                            _this.tribute.hideMenu();
                        }, 0);
                    }
                },
                comma: function comma(e, el) {
                    if (_this.tribute.isActive) {
                        if (_this.tribute.selectWithComma) {
                            _this.callbacks().enter(e, el);
                        }
                    }
                },
                escape: function escape(e, el) {
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        _this.tribute.isActive = false;
                        _this.tribute.hideMenu();
                    }
                },
                tab: function tab(e, el) {
                    // choose first match
                    _this.callbacks().enter(e, el);
                },
                space: function space(e, el, editor) {
                    if (_this.tribute.isActive) {
                        if (_this.tribute.spaceSelectsMatch) {
                            _this.callbacks().enter(e, el);
                        } else if (!_this.tribute.allowSpaces) {
                            e.stopPropagation();
                            setTimeout(function () {
                                _this.tribute.hideMenu();
                                _this.tribute.isActive = false;
                            }, 0);
                        }
                    }
                    var text = _this.tribute.range.getTextPrecedingCurrentSelection().trim();
                    if (text.lastIndexOf(_this.tribute.current.trigger) === text.length - 1) {
                        e.stopPropagation();
                        setTimeout(function () {
                            _this.tribute.hideMenu();
                            _this.tribute.isActive = false;
                        }, 0);
                    }
                },
                up: function up(e, el) {
                    // navigate up ul
                    if (_this.tribute.isActive && _this.tribute.current.filteredItems) {
                        e.preventDefault();
                        e.stopPropagation();
                        var count = _this.tribute.current.filteredItems.length,
                            selected = _this.tribute.menuSelected;

                        if (count > selected && selected > 0) {
                            _this.tribute.menuSelected--;
                            _this.setActiveLi();
                        } else if (selected === 0) {
                            _this.tribute.menuSelected = count - 1;
                            _this.setActiveLi();
                            _this.tribute.menu.querySelector("ul").scrollTop = _this.tribute.menu.querySelector("ul").offsetHeight;
                        }
                    }
                },
                down: function down(e, el) {
                    // navigate down ul
                    if (_this.tribute.isActive && _this.tribute.current.filteredItems) {
                        e.preventDefault();
                        e.stopPropagation();
                        var count = _this.tribute.current.filteredItems.length - 1,
                            selected = _this.tribute.menuSelected;

                        if (count > selected) {
                            _this.tribute.menuSelected++;
                            _this.setActiveLi();
                        } else if (count === selected) {
                            _this.tribute.menuSelected = 0;
                            _this.setActiveLi();
                            _this.tribute.menu.querySelector("ul").scrollTop = 0;
                        }
                    }
                },
                delete: function _delete(e, el) {
                    if (_this.tribute.isActive && _this.tribute.current.mentionText.length < 1) {
                        _this.tribute.hideMenu();
                    } else if (_this.tribute.isActive) {
                        _this.tribute.showMenuFor(el);
                    } else if (!_this.tribute.isActive) {
                        var text = _this.tribute.range.getTextPrecedingCurrentSelection();
                        var words = text.split(" ");
                        if (words[words.length - 1].split('@').length - 1 > 1) {
                            return;
                        }
                        if (words[words.length - 1].trim()[0] !== '@') {
                            return;
                        }
                        _this.tribute.inputEvent = true;
                        _this.callbacks().triggerChar(e, el, _this.tribute.current.trigger || "@", true);
                    }
                }
            };
        }
    }, {
        key: 'setActiveLi',
        value: function setActiveLi(index) {
            var lis = this.tribute.menu.querySelectorAll('li'),
                length = lis.length >>> 0;

            if (index) this.tribute.menuSelected = parseInt(index);

            for (var i = 0; i < length; i++) {
                var li = lis[i];
                if (i === this.tribute.menuSelected) {
                    li.classList.add(this.tribute.current.collection.selectClass);

                    var liClientRect = li.getBoundingClientRect();
                    var menuClientRect = this.tribute.menu.querySelector("ul").getBoundingClientRect();

                    if (liClientRect.bottom > menuClientRect.bottom) {
                        var scrollDistance = liClientRect.bottom - menuClientRect.bottom;
                        this.tribute.menu.querySelector("ul").scrollTop += scrollDistance;
                    } else if (liClientRect.top < menuClientRect.top) {
                        var _scrollDistance = menuClientRect.top - liClientRect.top;
                        this.tribute.menu.querySelector("ul").scrollTop -= _scrollDistance;
                    }
                } else {
                    li.classList.remove(this.tribute.current.collection.selectClass);
                }
            }
        }
    }, {
        key: 'getFullHeight',
        value: function getFullHeight(elem, includeMargin) {
            var height = elem.getBoundingClientRect().height;

            if (includeMargin) {
                var style = elem.currentStyle || window.getComputedStyle(elem);
                return height + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
            }

            return height;
        }
    }], [{
        key: 'keys',
        value: function keys() {
            return [{
                key: 9,
                value: 'TAB'
            }, {
                key: 8,
                value: 'DELETE'
            }, {
                key: 13,
                value: 'ENTER'
            }, {
                key: 27,
                value: 'ESCAPE'
            }, {
                key: 32,
                value: 'SPACE'
            }, {
                key: 38,
                value: 'UP'
            }, {
                key: 40,
                value: 'DOWN'
            }, {
                key: 188,
                value: 'COMMA'
            }];
        }
    }, {
        key: 'remove',
        value: function remove(elem) {
            if (elem && elem.remove) {
                elem.remove();
                return;
            }
            if (elem && !elem.remove) {
                elem.parentNode.removeChild(elem);
            }
        }
    }]);

    return TributeEvents;
}();

exports.default = TributeEvents;
module.exports = exports.default;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TributeMenuEvents = function () {
    function TributeMenuEvents(tribute) {
        _classCallCheck(this, TributeMenuEvents);

        this.tribute = tribute;
        this.tribute.menuEvents = this;
        this.menu = this.tribute.menu;
    }

    _createClass(TributeMenuEvents, [{
        key: 'bind',
        value: function bind(menu) {
            var _this = this;

            this.menuClickEvent = this.tribute.events.click.bind(null, this);
            this.menuContainerScrollEvent = this.debounce(function () {
                if (_this.tribute.isActive) {
                    _this.tribute.showMenuFor(_this.tribute.current.element, false);
                }
            }, 300, false);
            this.windowResizeEvent = this.debounce(function () {
                if (_this.tribute.isActive) {
                    _this.tribute.range.positionMenuAtCaret(true);
                }
            }, 300, false);

            // fixes IE11 issues with mousedown
            this.tribute.range.getDocument().addEventListener('MSPointerDown', this.menuClickEvent, false);
            this.tribute.range.getDocument().addEventListener('mousedown', this.menuClickEvent, false);
            window.addEventListener('resize', this.windowResizeEvent);

            if (this.menuContainer) {
                this.menuContainer.addEventListener('scroll', this.menuContainerScrollEvent, false);
            } else {
                window.addEventListener('scroll', this.menuContainerScrollEvent);
            }
        }
    }, {
        key: 'unbind',
        value: function unbind(menu) {
            this.tribute.range.getDocument().removeEventListener('mousedown', this.menuClickEvent, false);
            this.tribute.range.getDocument().removeEventListener('MSPointerDown', this.menuClickEvent, false);
            window.removeEventListener('resize', this.windowResizeEvent);

            if (this.menuContainer) {
                this.menuContainer.removeEventListener('scroll', this.menuContainerScrollEvent, false);
            } else {
                window.removeEventListener('scroll', this.menuContainerScrollEvent);
            }
        }
    }, {
        key: 'debounce',
        value: function debounce(func, wait, immediate) {
            var _this2 = this,
                _arguments = arguments;

            var timeout;
            return function () {
                var context = _this2,
                    args = _arguments;
                var later = function later() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }
    }]);

    return TributeMenuEvents;
}();

exports.default = TributeMenuEvents;
module.exports = exports.default;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Thanks to https://github.com/jeff-collins/ment.io
var TributeRange = function () {
    function TributeRange(tribute) {
        _classCallCheck(this, TributeRange);

        this.tribute = tribute;
        this.tribute.range = this;
    }

    _createClass(TributeRange, [{
        key: 'getDocument',
        value: function getDocument() {
            var iframe = void 0;
            if (this.tribute.current.collection) {
                iframe = this.tribute.current.collection.iframe;
            }

            if (!iframe) {
                return document;
            }

            return iframe.contentWindow.document;
        }
    }, {
        key: 'positionMenuAtCaret',
        value: function positionMenuAtCaret(scrollTo) {
            var _this = this;

            var context = this.tribute.current,
                coordinates = void 0;

            var info = this.getTriggerInfo(false, this.tribute.hasTrailingSpace, true, this.tribute.allowSpaces, this.tribute.autocompleteMode);

            if (typeof info !== 'undefined') {

                if (!this.tribute.positionMenu) {
                    this.tribute.menu.style.cssText = 'display: block;';
                    return;
                }

                if (!this.isContentEditable(context.element)) {
                    coordinates = this.getTextAreaOrInputUnderlinePosition(this.tribute.current.element, info.mentionPosition);
                } else {
                    coordinates = this.getContentEditableCaretPosition(info.mentionPosition);
                }

                this.tribute.menu.style.cssText = 'top: ' + coordinates.top + 'px;\n                                     left: ' + coordinates.left + 'px;\n                                     right: ' + coordinates.right + 'px;\n                                     bottom: ' + coordinates.bottom + 'px;\n                                     position: absolute;\n                                     z-index: 10000;\n                                     display: block;';

                if (coordinates.left === 'auto') {
                    this.tribute.menu.style.left = 'auto';
                }

                if (coordinates.top === 'auto') {
                    this.tribute.menu.style.top = 'auto';
                }

                if (scrollTo) this.scrollIntoView();

                window.setTimeout(function () {
                    var menuDimensions = {
                        width: _this.tribute.menu.offsetWidth,
                        height: _this.tribute.menu.offsetHeight
                    };
                    var menuIsOffScreen = _this.isMenuOffScreen(coordinates, menuDimensions);

                    var menuIsOffScreenHorizontally = window.innerWidth > menuDimensions.width && (menuIsOffScreen.left || menuIsOffScreen.right);
                    var menuIsOffScreenVertically = window.innerHeight > menuDimensions.height && (menuIsOffScreen.top || menuIsOffScreen.bottom);
                    if (menuIsOffScreenHorizontally || menuIsOffScreenVertically) {
                        _this.tribute.menu.style.cssText = 'display: none';
                        _this.positionMenuAtCaret(scrollTo);
                    }
                }, 0);
            } else {
                this.tribute.menu.style.cssText = 'display: none';
            }
        }
    }, {
        key: 'selectElement',
        value: function selectElement(targetElement, path, offset) {
            var range = void 0;
            var elem = targetElement;

            if (path) {
                for (var i = 0; i < path.length; i++) {
                    elem = elem.childNodes[path[i]];
                    if (elem === undefined) {
                        return;
                    }
                    while (elem.length < offset) {
                        offset -= elem.length;
                        elem = elem.nextSibling;
                    }
                    if (elem.childNodes.length === 0 && !elem.length) {
                        elem = elem.previousSibling;
                    }
                }
            }
            var sel = this.getWindowSelection();

            range = this.getDocument().createRange();
            range.setStart(elem, offset);
            range.setEnd(elem, offset);
            range.collapse(true);

            try {
                sel.removeAllRanges();
            } catch (error) {}

            sel.addRange(range);
            targetElement.focus();
        }
    }, {
        key: 'replaceTriggerText',
        value: function replaceTriggerText(text, requireLeadingSpace, hasTrailingSpace, originalEvent, item) {
            var info = this.getTriggerInfo(true, hasTrailingSpace, requireLeadingSpace, this.tribute.allowSpaces, this.tribute.autocompleteMode);

            if (info !== undefined) {
                var context = this.tribute.current;
                var replaceEvent = new CustomEvent('tribute-replaced', {
                    detail: {
                        item: item,
                        instance: context,
                        context: info,
                        event: originalEvent
                    }
                });

                if (!this.isContentEditable(context.element)) {
                    var myField = this.tribute.current.element;
                    var textSuffix = typeof this.tribute.replaceTextSuffix == 'string' ? this.tribute.replaceTextSuffix : ' ';
                    text += textSuffix;
                    var startPos = info.mentionPosition;
                    var endPos = info.mentionPosition + info.mentionText.length + textSuffix.length;
                    myField.value = myField.value.substring(0, startPos) + text + myField.value.substring(endPos, myField.value.length);
                    myField.selectionStart = startPos + text.length;
                    myField.selectionEnd = startPos + text.length;
                } else {
                    // add a space to the end of the pasted text
                    var _textSuffix = typeof this.tribute.replaceTextSuffix == 'string' ? this.tribute.replaceTextSuffix : '\xA0';

                    if (originalEvent.keyCode === 188) {
                        _textSuffix = "," + _textSuffix;
                    }
                    text += _textSuffix;
                    this.pasteHtml(text, info.mentionPosition, info.mentionPosition + info.mentionText.length + !this.tribute.autocompleteMode);
                }

                context.element.dispatchEvent(replaceEvent);
            }
        }
    }, {
        key: 'pasteHtml',
        value: function pasteHtml(html, startPos, endPos) {
            var range = void 0,
                sel = void 0,
                selEl = void 0;
            sel = this.getWindowSelection();
            var _sel = sel,
                anchorOffset = _sel.anchorOffset,
                anchorNode = _sel.anchorNode;

            if (anchorNode.childNodes && anchorNode.childNodes[anchorOffset]) {
                var child = anchorNode.childNodes[anchorOffset];
                if (child.nodeType === Node.TEXT_NODE) {
                    selEl = child;
                } else if (anchorOffset > 0 && child.nodeType === Node.ELEMENT_NODE) {
                    selEl = anchorNode.childNodes[anchorOffset - 1];
                }
            } else {
                selEl = sel.anchorNode;
            }
            range = this.getDocument().createRange();
            range.setStart(selEl, startPos);
            range.setEnd(selEl, endPos);
            range.deleteContents();

            var el = this.getDocument().createElement('div');
            el.innerHTML = html;
            var frag = this.getDocument().createDocumentFragment(),
                node = void 0,
                lastNode = void 0;
            while (node = el.firstChild) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }, {
        key: 'getWindowSelection',
        value: function getWindowSelection() {
            if (this.tribute.collection.iframe) {
                return this.tribute.collection.iframe.contentWindow.getSelection();
            }

            return window.getSelection();
        }
    }, {
        key: 'getNodePositionInParent',
        value: function getNodePositionInParent(element) {
            if (element.parentNode === null) {
                return 0;
            }

            for (var i = 0; i < element.parentNode.childNodes.length; i++) {
                var node = element.parentNode.childNodes[i];

                if (node === element) {
                    return i;
                }
            }
        }
    }, {
        key: 'getContentEditableSelectedPath',
        value: function getContentEditableSelectedPath(ctx) {
            var sel = this.getWindowSelection();
            var selected = sel.anchorNode;
            var path = [];
            var offset = void 0;

            if (selected != null) {
                var i = void 0;
                var ce = selected.contentEditable;
                while (selected !== null && ce !== 'true') {
                    i = this.getNodePositionInParent(selected);
                    path.push(i);
                    selected = selected.parentNode;
                    if (selected !== null) {
                        ce = selected.contentEditable;
                    }
                }
                path.reverse();

                // getRangeAt may not exist, need alternative
                offset = sel.getRangeAt(0).startOffset;

                return {
                    selected: selected,
                    path: path,
                    offset: offset
                };
            }
        }
    }, {
        key: 'getTextPrecedingCurrentSelection',
        value: function getTextPrecedingCurrentSelection() {
            var context = this.tribute.current,
                text = '';

            if (!this.isContentEditable(context.element)) {
                var textComponent = this.tribute.current.element;
                if (textComponent) {
                    var startPos = textComponent.selectionStart;
                    if (textComponent.value && startPos >= 0) {
                        text = textComponent.value.substring(0, startPos);
                    }
                }
            } else {
                var selectedElem = this.getWindowSelection().anchorNode;

                if (selectedElem != null) {
                    var anchorOffset = this.getWindowSelection().anchorOffset;
                    if (selectedElem.childNodes && selectedElem.childNodes[anchorOffset]) {
                        var child = selectedElem.childNodes[anchorOffset];
                        if (child.nodeType === Node.TEXT_NODE) {
                            text = child.textContent;
                        } else if (anchorOffset > 0 && child.nodeType === Node.ELEMENT_NODE) {
                            text += selectedElem.childNodes[anchorOffset - 1].textContent;
                        }
                    } else {
                        var workingNodeContent = selectedElem.textContent;
                        var selectStartOffset = this.getWindowSelection().getRangeAt(0).startOffset;

                        if (workingNodeContent && selectStartOffset >= 0) {
                            text = workingNodeContent.substring(0, selectStartOffset);
                        }
                    }
                }
            }
            return text;
        }
    }, {
        key: 'getLastWordInText',
        value: function getLastWordInText(text) {
            text = text.replace(/\u00A0/g, ' '); // https://stackoverflow.com/questions/29850407/how-do-i-replace-unicode-character-u00a0-with-a-space-in-javascript
            var wordsArray = text.split(' ');
            var worldsCount = wordsArray.length - 1;
            return wordsArray[worldsCount].trim();
        }
    }, {
        key: 'getTriggerInfo',
        value: function getTriggerInfo(menuAlreadyActive, hasTrailingSpace, requireLeadingSpace, allowSpaces, isAutocomplete) {
            var _this2 = this;

            var ctx = this.tribute.current;
            var selected = void 0,
                path = void 0,
                offset = void 0;

            if (!this.isContentEditable(ctx.element)) {
                selected = this.tribute.current.element;
            } else {
                var selectionInfo = this.getContentEditableSelectedPath(ctx);

                if (selectionInfo) {
                    selected = selectionInfo.selected;
                    path = selectionInfo.path;
                    offset = selectionInfo.offset;
                }
            }

            var effectiveRange = this.getTextPrecedingCurrentSelection();
            var lastWordOfEffectiveRange = this.getLastWordInText(effectiveRange);

            if (isAutocomplete) {
                return {
                    mentionPosition: effectiveRange.length - lastWordOfEffectiveRange.length,
                    mentionText: lastWordOfEffectiveRange,
                    mentionSelectedElement: selected,
                    mentionSelectedPath: path,
                    mentionSelectedOffset: offset
                };
            }

            if (effectiveRange !== undefined && effectiveRange !== null) {
                var mostRecentTriggerCharPos = -1;
                var triggerChar = void 0;

                this.tribute.collection.forEach(function (config) {
                    var c = config.trigger;
                    var idx = config.requireLeadingSpace ? _this2.lastIndexWithLeadingSpace(effectiveRange, c) : effectiveRange.lastIndexOf(c);

                    if (idx > mostRecentTriggerCharPos) {
                        mostRecentTriggerCharPos = idx;
                        triggerChar = c;
                        requireLeadingSpace = config.requireLeadingSpace;
                    }
                });

                if (mostRecentTriggerCharPos >= 0 && (mostRecentTriggerCharPos === 0 || !requireLeadingSpace || /[\xA0\s]/g.test(effectiveRange.substring(mostRecentTriggerCharPos - 1, mostRecentTriggerCharPos)))) {
                    var currentTriggerSnippet = effectiveRange.substring(mostRecentTriggerCharPos + 1, effectiveRange.length);

                    triggerChar = effectiveRange.substring(mostRecentTriggerCharPos, mostRecentTriggerCharPos + 1);
                    var firstSnippetChar = currentTriggerSnippet.substring(0, 1);
                    var leadingSpace = currentTriggerSnippet.length > 0 && (firstSnippetChar === ' ' || firstSnippetChar === '\xA0');
                    if (hasTrailingSpace) {
                        currentTriggerSnippet = currentTriggerSnippet.trim();
                    }

                    var regex = allowSpaces ? /[^\S ]/g : /[\xA0\s]/g;

                    this.tribute.hasTrailingSpace = regex.test(currentTriggerSnippet);

                    if (!leadingSpace && (menuAlreadyActive || !regex.test(currentTriggerSnippet))) {
                        return {
                            mentionPosition: mostRecentTriggerCharPos,
                            mentionText: currentTriggerSnippet,
                            mentionSelectedElement: selected,
                            mentionSelectedPath: path,
                            mentionSelectedOffset: offset,
                            mentionTriggerChar: triggerChar
                        };
                    }
                }
            }
        }
    }, {
        key: 'lastIndexWithLeadingSpace',
        value: function lastIndexWithLeadingSpace(str, char) {
            var reversedStr = str.split('').reverse().join('');
            var index = -1;

            for (var cidx = 0, len = str.length; cidx < len; cidx++) {
                var firstChar = cidx === str.length - 1;
                var leadingSpace = /\s/.test(reversedStr[cidx + 1]);
                var match = char === reversedStr[cidx];

                if (match && (firstChar || leadingSpace)) {
                    index = str.length - 1 - cidx;
                    break;
                }
            }

            return index;
        }
    }, {
        key: 'isContentEditable',
        value: function isContentEditable(element) {
            if (!element) {
                return false;
            }
            return element.nodeName !== 'INPUT' && element.nodeName !== 'TEXTAREA';
        }
    }, {
        key: 'isMenuOffScreen',
        value: function isMenuOffScreen(coordinates, menuDimensions) {
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var doc = document.documentElement;
            var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

            var menuTop = typeof coordinates.top === 'number' ? coordinates.top : windowTop + windowHeight - coordinates.bottom - menuDimensions.height;
            var menuRight = typeof coordinates.right === 'number' ? coordinates.right : coordinates.left + menuDimensions.width;
            var menuBottom = typeof coordinates.bottom === 'number' ? coordinates.bottom : coordinates.top + menuDimensions.height;
            var menuLeft = typeof coordinates.left === 'number' ? coordinates.left : windowLeft + windowWidth - coordinates.right - menuDimensions.width;

            return {
                top: menuTop < Math.floor(windowTop),
                right: menuRight > Math.ceil(windowLeft + windowWidth),
                bottom: menuBottom > Math.ceil(windowTop + windowHeight),
                left: menuLeft < Math.floor(windowLeft)
            };
        }
    }, {
        key: 'getMenuDimensions',
        value: function getMenuDimensions() {
            // Width of the menu depends of its contents and position
            // We must check what its width would be without any obstruction
            // This way, we can achieve good positioning for flipping the menu
            var dimensions = {
                width: null,
                height: null
            };

            this.tribute.menu.style.cssText = 'top: 0px;\n                                 left: 0px;\n                                 position: fixed;\n                                 zIndex: 10000;\n                                 display: block;\n                                 visibility; hidden;';
            dimensions.width = this.tribute.menu.offsetWidth;
            dimensions.height = this.tribute.menu.offsetHeight;

            this.tribute.menu.style.cssText = 'display: none;';

            return dimensions;
        }
    }, {
        key: 'getTextAreaOrInputUnderlinePosition',
        value: function getTextAreaOrInputUnderlinePosition(element, position, flipped) {
            var properties = ['direction', 'boxSizing', 'width', 'height', 'overflowX', 'overflowY', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize', 'fontSizeAdjust', 'lineHeight', 'fontFamily', 'textAlign', 'textTransform', 'textIndent', 'textDecoration', 'letterSpacing', 'wordSpacing'];

            var isFirefox = window.mozInnerScreenX !== null;

            var div = this.getDocument().createElement('div');
            div.id = 'input-textarea-caret-position-mirror-div';
            this.getDocument().body.appendChild(div);

            var style = div.style;
            var computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;

            style.whiteSpace = 'pre-wrap';
            if (element.nodeName !== 'INPUT') {
                style.wordWrap = 'break-word';
            }

            // position off-screen
            style.position = 'absolute';
            style.visibility = 'hidden';

            // transfer the element's properties to the div
            properties.forEach(function (prop) {
                style[prop] = computed[prop];
            });

            if (isFirefox) {
                style.width = parseInt(computed.width) - 2 + 'px';
                if (element.scrollHeight > parseInt(computed.height)) style.overflowY = 'scroll';
            } else {
                style.overflow = 'hidden';
            }

            div.textContent = element.value.substring(0, position);

            if (element.nodeName === 'INPUT') {
                div.textContent = div.textContent.replace(/\s/g, ' ');
            }

            var span = this.getDocument().createElement('span');
            span.textContent = element.value.substring(position) || '.';
            div.appendChild(span);

            var rect = element.getBoundingClientRect();
            var doc = document.documentElement;
            var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

            var coordinates = {
                top: rect.top + windowTop + span.offsetTop + parseInt(computed.borderTopWidth) + parseInt(computed.fontSize) - element.scrollTop,
                left: rect.left + windowLeft + span.offsetLeft + parseInt(computed.borderLeftWidth)
            };

            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;

            var menuDimensions = this.getMenuDimensions();
            var menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);

            if (menuIsOffScreen.right) {
                coordinates.right = windowWidth - coordinates.left;
                coordinates.left = 'auto';
            }

            var parentHeight = this.tribute.menuContainer ? this.tribute.menuContainer.offsetHeight : this.getDocument().body.offsetHeight;

            if (menuIsOffScreen.bottom) {
                var parentRect = this.tribute.menuContainer ? this.tribute.menuContainer.getBoundingClientRect() : this.getDocument().body.getBoundingClientRect();
                var scrollStillAvailable = parentHeight - (windowHeight - parentRect.top);

                coordinates.bottom = scrollStillAvailable + (windowHeight - rect.top - span.offsetTop);
                coordinates.top = 'auto';
            }

            menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);
            if (menuIsOffScreen.left) {
                coordinates.left = windowWidth > menuDimensions.width ? windowLeft + windowWidth - menuDimensions.width : windowLeft;
                delete coordinates.right;
            }
            if (menuIsOffScreen.top) {
                coordinates.top = windowHeight > menuDimensions.height ? windowTop + windowHeight - menuDimensions.height : windowTop;
                delete coordinates.bottom;
            }

            this.getDocument().body.removeChild(div);
            return coordinates;
        }
    }, {
        key: 'getContentEditableCaretPosition',
        value: function getContentEditableCaretPosition(selectedNodePosition) {
            var markerTextChar = '﻿';
            var markerEl = void 0,
                markerId = 'sel_' + new Date().getTime() + '_' + Math.random().toString().substr(2);
            var range = void 0;
            var sel = this.getWindowSelection();
            var prevRange = sel.getRangeAt(0);

            range = this.getDocument().createRange();
            range.setStart(sel.anchorNode, selectedNodePosition);
            range.setEnd(sel.anchorNode, selectedNodePosition);

            range.collapse(false);

            // Create the marker element containing a single invisible character using DOM methods and insert it
            markerEl = this.getDocument().createElement('span');
            markerEl.id = markerId;

            markerEl.appendChild(this.getDocument().createTextNode(markerTextChar));
            range.insertNode(markerEl);
            sel.removeAllRanges();
            sel.addRange(prevRange);

            var rect = markerEl.getBoundingClientRect();
            var doc = document.documentElement;
            var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
            var coordinates = {
                left: rect.left + windowLeft,
                top: rect.top + markerEl.offsetHeight + windowTop
            };
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;

            var menuDimensions = this.getMenuDimensions();
            var menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);

            if (menuIsOffScreen.right) {
                coordinates.left = 'auto';
                coordinates.right = windowWidth - rect.left - windowLeft;
            }

            var parentHeight = this.tribute.menuContainer ? this.tribute.menuContainer.offsetHeight : this.getDocument().body.offsetHeight;

            if (menuIsOffScreen.bottom) {
                var parentRect = this.tribute.menuContainer ? this.tribute.menuContainer.getBoundingClientRect() : this.getDocument().body.getBoundingClientRect();
                var scrollStillAvailable = parentHeight - (windowHeight - parentRect.top);

                coordinates.top = 'auto';
                coordinates.bottom = scrollStillAvailable + (windowHeight - rect.top);
            }

            menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);
            if (menuIsOffScreen.left) {
                coordinates.left = windowWidth > menuDimensions.width ? windowLeft + windowWidth - menuDimensions.width : windowLeft;
                delete coordinates.right;
            }
            if (menuIsOffScreen.top) {
                coordinates.top = windowHeight > menuDimensions.height ? windowTop + windowHeight - menuDimensions.height : windowTop;
                delete coordinates.bottom;
            }

            markerEl.parentNode.removeChild(markerEl);
            return coordinates;
        }
    }, {
        key: 'scrollIntoView',
        value: function scrollIntoView(elem) {
            var reasonableBuffer = 20,
                clientRect = void 0;
            var maxScrollDisplacement = 100;
            var e = this.menu;

            if (typeof e === 'undefined') return;

            while (clientRect === undefined || clientRect.height === 0) {
                clientRect = e.getBoundingClientRect();

                if (clientRect.height === 0) {
                    e = e.childNodes[0];
                    if (e === undefined || !e.getBoundingClientRect) {
                        return;
                    }
                }
            }

            var elemTop = clientRect.top;
            var elemBottom = elemTop + clientRect.height;

            if (elemTop < 0) {
                window.scrollTo(0, window.pageYOffset + clientRect.top - reasonableBuffer);
            } else if (elemBottom > window.innerHeight) {
                var maxY = window.pageYOffset + clientRect.top - reasonableBuffer;

                if (maxY - window.pageYOffset > maxScrollDisplacement) {
                    maxY = window.pageYOffset + maxScrollDisplacement;
                }

                var targetY = window.pageYOffset - (window.innerHeight - elemBottom);

                if (targetY > maxY) {
                    targetY = maxY;
                }

                window.scrollTo(0, targetY);
            }
        }
    }]);

    return TributeRange;
}();

exports.default = TributeRange;
module.exports = exports.default;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Thanks to https://github.com/mattyork/fuzzy
var TributeSearch = function () {
    function TributeSearch(tribute) {
        _classCallCheck(this, TributeSearch);

        this.tribute = tribute;
        this.tribute.search = this;
    }

    _createClass(TributeSearch, [{
        key: 'simpleFilter',
        value: function simpleFilter(pattern, array) {
            var _this = this;

            return array.filter(function (string) {
                return _this.test(pattern, string);
            });
        }
    }, {
        key: 'test',
        value: function test(pattern, string) {
            return this.match(pattern, string) !== null;
        }
    }, {
        key: 'match',
        value: function match(pattern, string, opts) {
            opts = opts || {};
            var patternIdx = 0,
                result = [],
                len = string.length,
                totalScore = 0,
                currScore = 0,
                pre = opts.pre || '',
                post = opts.post || '',
                compareString = opts.caseSensitive && string || string.toLowerCase(),
                ch = void 0,
                compareChar = void 0;

            pattern = opts.caseSensitive && pattern || pattern.toLowerCase();

            var patternCache = this.traverse(compareString, pattern, 0, 0, []);
            if (!patternCache) {
                return null;
            }

            return {
                rendered: this.render(string, patternCache.cache, pre, post),
                score: patternCache.score
            };
        }
    }, {
        key: 'traverse',
        value: function traverse(string, pattern, stringIndex, patternIndex, patternCache) {
            // if the pattern search at end
            if (pattern.length === patternIndex) {

                // calculate score and copy the cache containing the indices where it's found
                return {
                    score: this.calculateScore(patternCache),
                    cache: patternCache.slice()
                };
            }

            // if string at end or remaining pattern > remaining string
            if (string.length === stringIndex || pattern.length - patternIndex > string.length - stringIndex) {
                return undefined;
            }

            var c = pattern[patternIndex];
            var index = string.indexOf(c, stringIndex);
            var best = void 0,
                temp = void 0;

            while (index > -1) {
                patternCache.push(index);
                temp = this.traverse(string, pattern, index + 1, patternIndex + 1, patternCache);
                patternCache.pop();

                // if downstream traversal failed, return best answer so far
                if (!temp) {
                    return best;
                }

                if (!best || best.score < temp.score) {
                    best = temp;
                }

                index = string.indexOf(c, index + 1);
            }

            return best;
        }
    }, {
        key: 'calculateScore',
        value: function calculateScore(patternCache) {
            var score = 0;
            var temp = 1;

            patternCache.forEach(function (index, i) {
                if (i > 0) {
                    if (patternCache[i - 1] + 1 === index) {
                        temp += temp + 1;
                    } else {
                        temp = 1;
                    }
                }

                score += temp;
            });

            return score;
        }
    }, {
        key: 'render',
        value: function render(string, indices, pre, post) {
            var rendered = string.substring(0, indices[0]);

            indices.forEach(function (index, i) {
                rendered += pre + string[index] + post + string.substring(index + 1, indices[i + 1] ? indices[i + 1] : string.length);
            });

            return rendered;
        }
    }, {
        key: 'filter',
        value: function filter(pattern, arr, opts) {
            var _this2 = this;

            opts = opts || {};
            return arr.reduce(function (prev, element, idx, arr) {
                var str = element;

                if (opts.extract) {
                    str = opts.extract(element);

                    if (!str) {
                        // take care of undefineds / nulls / etc.
                        str = '';
                    }
                }

                var rendered = _this2.match(pattern, str, opts);

                if (rendered != null) {
                    prev[prev.length] = {
                        string: rendered.rendered,
                        score: rendered.score,
                        index: idx,
                        original: element
                    };
                }

                return prev;
            }, []).sort(function (a, b) {
                var compare = b.score - a.score;
                if (compare) return compare;
                return a.index - b.index;
            });
        }
    }]);

    return TributeSearch;
}();

exports.default = TributeSearch;
module.exports = exports.default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Tribute = require("./Tribute");

var _Tribute2 = _interopRequireDefault(_Tribute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Tribute2.default; /**
                                     * Tribute.js
                                     * Native ES6 JavaScript @mention Plugin
                                     **/

module.exports = exports.default;

},{"./Tribute":1}],7:[function(require,module,exports){
'use strict';

if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}

if (window && typeof window.CustomEvent !== "function") {
    var CustomEvent = function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    };

    if (typeof window.Event !== 'undefined') {
        CustomEvent.prototype = window.Event.prototype;
    }

    window.CustomEvent = CustomEvent;
}

},{}]},{},[6])(6)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvVHJpYnV0ZS5qcyIsInNyYy9UcmlidXRlRXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVNZW51RXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVSYW5nZS5qcyIsInNyYy9UcmlidXRlU2VhcmNoLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVNLE87QUFDRiwyQkF5Qkc7QUFBQTs7QUFBQSwrQkF4QkMsTUF3QkQ7QUFBQSxZQXhCQyxNQXdCRCwrQkF4QlUsSUF3QlY7QUFBQSwrQkF2QkMsTUF1QkQ7QUFBQSxZQXZCQyxNQXVCRCwrQkF2QlUsSUF1QlY7QUFBQSxvQ0F0QkMsV0FzQkQ7QUFBQSxZQXRCQyxXQXNCRCxvQ0F0QmUsV0FzQmY7QUFBQSxnQ0FyQkMsT0FxQkQ7QUFBQSxZQXJCQyxPQXFCRCxnQ0FyQlcsR0FxQlg7QUFBQSx5Q0FwQkMsZ0JBb0JEO0FBQUEsWUFwQkMsZ0JBb0JELHlDQXBCb0IsS0FvQnBCO0FBQUEsdUNBbkJDLGNBbUJEO0FBQUEsWUFuQkMsY0FtQkQsdUNBbkJrQixJQW1CbEI7QUFBQSx5Q0FsQkMsZ0JBa0JEO0FBQUEsWUFsQkMsZ0JBa0JELHlDQWxCb0IsSUFrQnBCO0FBQUEsK0JBakJDLE1BaUJEO0FBQUEsWUFqQkMsTUFpQkQsK0JBakJVLEtBaUJWO0FBQUEsaUNBaEJDLFFBZ0JEO0FBQUEsWUFoQkMsUUFnQkQsaUNBaEJZLE9BZ0JaO0FBQUEsbUNBZkMsVUFlRDtBQUFBLFlBZkMsVUFlRCxtQ0FmYyxJQWVkO0FBQUEsc0NBZEMsYUFjRDtBQUFBLFlBZEMsYUFjRCxzQ0FkaUIsSUFjakI7QUFBQSx3Q0FiQyxlQWFEO0FBQUEsWUFiQyxlQWFELHdDQWJtQixJQWFuQjtBQUFBLHdDQVpDLGVBWUQ7QUFBQSxZQVpDLGVBWUQsd0NBWm1CLElBWW5CO0FBQUEsdUNBWEMsY0FXRDtBQUFBLFlBWEMsY0FXRCx1Q0FYa0IsSUFXbEI7QUFBQSx5Q0FWQyxtQkFVRDtBQUFBLFlBVkMsbUJBVUQseUNBVnVCLElBVXZCO0FBQUEsb0NBVEMsV0FTRDtBQUFBLFlBVEMsV0FTRCxvQ0FUZSxLQVNmO0FBQUEseUNBUkMsaUJBUUQ7QUFBQSxZQVJDLGlCQVFELHlDQVJxQixJQVFyQjtBQUFBLHFDQVBDLFlBT0Q7QUFBQSxZQVBDLFlBT0QscUNBUGdCLElBT2hCO0FBQUEseUNBTkMsaUJBTUQ7QUFBQSxZQU5DLGlCQU1ELHlDQU5xQixLQU1yQjtBQUFBLHdDQUxDLGVBS0Q7QUFBQSxZQUxDLGVBS0Qsd0NBTG1CLEtBS25CO0FBQUEsbUNBSkMsVUFJRDtBQUFBLFlBSkMsVUFJRCxtQ0FKYyxFQUlkO0FBQUEsK0JBSEMsTUFHRDtBQUFBLFlBSEMsTUFHRCwrQkFIVSxFQUdWO0FBQUEseUNBRkMsZ0JBRUQ7QUFBQSxZQUZDLGdCQUVELHlDQUZvQixJQUVwQjtBQUFBLHNDQURDLGFBQ0Q7QUFBQSxZQURDLGFBQ0Qsc0NBRGlCLElBQ2pCOztBQUFBOztBQUNDLGFBQUssZ0JBQUwsR0FBd0IsZ0JBQXhCO0FBQ0EsYUFBSyxZQUFMLEdBQW9CLENBQXBCO0FBQ0EsYUFBSyxPQUFMLEdBQWUsRUFBZjtBQUNBLGFBQUssVUFBTCxHQUFrQixLQUFsQjtBQUNBLGFBQUssUUFBTCxHQUFnQixLQUFoQjtBQUNBLGFBQUssYUFBTCxHQUFxQixhQUFyQjtBQUNBLGFBQUssZUFBTCxHQUF1QixlQUF2QjtBQUNBLGFBQUssV0FBTCxHQUFtQixXQUFuQjtBQUNBLGFBQUssaUJBQUwsR0FBeUIsaUJBQXpCO0FBQ0EsYUFBSyxZQUFMLEdBQW9CLFlBQXBCO0FBQ0EsYUFBSyxnQkFBTCxHQUF3QixLQUF4QjtBQUNBLGFBQUssaUJBQUwsR0FBeUIsaUJBQXpCO0FBQ0EsYUFBSyxlQUFMLEdBQXVCLGVBQXZCO0FBQ0EsYUFBSyxZQUFMLEdBQW9CLFNBQVMsV0FBVCxDQUFxQixPQUFyQixDQUFwQjtBQUNBLGFBQUssWUFBTCxDQUFrQixTQUFsQixDQUE0QixTQUE1QixFQUF1QyxJQUF2QyxFQUE2QyxJQUE3Qzs7QUFFQSxZQUFJLEtBQUssZ0JBQVQsRUFBMkI7QUFDdkIsc0JBQVUsRUFBVjtBQUNBLDBCQUFjLEtBQWQ7QUFDSDs7QUFFRCxZQUFJLE1BQUosRUFBWTtBQUNSLGlCQUFLLFVBQUwsR0FBa0IsQ0FBQztBQUNmO0FBQ0EseUJBQVMsT0FGTTs7QUFJZjtBQUNBLHdCQUFRLE1BTE87O0FBT2Y7QUFDQSw2QkFBYSxXQVJFOztBQVVmO0FBQ0EsZ0NBQWdCLENBQUMsa0JBQWtCLFFBQVEscUJBQTNCLEVBQWtELElBQWxELENBQXVELElBQXZELENBWEQ7O0FBYWY7QUFDQSxrQ0FBa0IsQ0FBQyxvQkFBb0IsUUFBUSx1QkFBN0IsRUFBc0QsSUFBdEQsQ0FBMkQsSUFBM0QsQ0FkSDs7QUFnQmY7QUFDQSxpQ0FBa0IsYUFBSztBQUNuQix3QkFBSSxPQUFPLENBQVAsS0FBYSxVQUFqQixFQUE2QjtBQUN6QiwrQkFBTyxFQUFFLElBQUYsQ0FBTyxLQUFQLENBQVA7QUFDSDs7QUFFRCwyQkFBTyxtQkFBbUIsWUFBWTtBQUFDLCtCQUFPLEVBQVA7QUFBVSxxQkFBdkIsQ0FBd0IsSUFBeEIsQ0FBNkIsS0FBN0IsQ0FBMUI7QUFDSCxpQkFOZ0IsQ0FNZCxlQU5jLENBakJGOztBQXlCZixnQ0FBaUIsYUFBSztBQUNsQix3QkFBSSxPQUFPLENBQVAsS0FBYSxVQUFqQixFQUE2QjtBQUN6QiwrQkFBTyxFQUFFLElBQUYsQ0FBTyxLQUFQLENBQVA7QUFDSDs7QUFFRCwyQkFBTyxrQkFBa0IsWUFBWTtBQUFDLCtCQUFPLEVBQVA7QUFBVSxxQkFBdkIsQ0FBd0IsSUFBeEIsQ0FBNkIsS0FBN0IsQ0FBekI7QUFDSCxpQkFOZSxDQU1iLGNBTmEsQ0F6QkQ7O0FBaUNmO0FBQ0Esd0JBQVEsTUFsQ087O0FBb0NmO0FBQ0EsMEJBQVUsUUFyQ0s7O0FBdUNmO0FBQ0Esd0JBQVEsTUF4Q087O0FBMENmLHFDQUFxQixtQkExQ047O0FBNENmLDRCQUFZLFVBNUNHOztBQThDZix3QkFBUSxNQTlDTzs7QUFnRGYsaUNBQWlCLGVBaERGOztBQWtEZixrQ0FBbUIsYUFBSztBQUNwQix3QkFBSSxPQUFPLENBQVAsS0FBYSxVQUFqQixFQUE2QjtBQUN6QiwrQkFBTyxFQUFFLElBQUYsQ0FBTyxLQUFQLENBQVA7QUFDSDs7QUFFRCwyQkFBTyxvQkFBb0IsWUFBWTtBQUFDLCtCQUFPLEVBQVA7QUFBVSxxQkFBdkIsQ0FBd0IsSUFBeEIsQ0FBNkIsS0FBN0IsQ0FBM0I7QUFDSCxpQkFOaUIsQ0FNZixnQkFOZSxDQWxESDs7QUEwRGYsK0JBQWU7QUExREEsYUFBRCxDQUFsQjtBQTRESCxTQTdERCxNQThESyxJQUFJLFVBQUosRUFBZ0I7QUFDakIsZ0JBQUksS0FBSyxnQkFBVCxFQUNJLFFBQVEsSUFBUixDQUFhLDREQUFiO0FBQ0osaUJBQUssVUFBTCxHQUFrQixXQUFXLEdBQVgsQ0FBZSxnQkFBUTtBQUNyQyx1QkFBTztBQUNILDZCQUFTLEtBQUssT0FBTCxJQUFnQixPQUR0QjtBQUVILDRCQUFRLEtBQUssTUFBTCxJQUFlLE1BRnBCO0FBR0gsaUNBQWEsS0FBSyxXQUFMLElBQW9CLFdBSDlCO0FBSUgsb0NBQWdCLENBQUMsS0FBSyxjQUFMLElBQXVCLFFBQVEscUJBQWhDLEVBQXVELElBQXZELENBQTRELEtBQTVELENBSmI7QUFLSCxzQ0FBa0IsQ0FBQyxLQUFLLGdCQUFMLElBQXlCLFFBQVEsdUJBQWxDLEVBQTJELElBQTNELENBQWdFLEtBQWhFLENBTGY7QUFNSDtBQUNBLHFDQUFrQixhQUFLO0FBQ25CLDRCQUFJLE9BQU8sQ0FBUCxLQUFhLFVBQWpCLEVBQTZCO0FBQ3pCLG1DQUFPLEVBQUUsSUFBRixDQUFPLEtBQVAsQ0FBUDtBQUNIOztBQUVELCtCQUFPLElBQVA7QUFDSCxxQkFOZ0IsQ0FNZCxlQU5jLENBUGQ7QUFjSCxvQ0FBaUIsYUFBSztBQUNsQiw0QkFBSSxPQUFPLENBQVAsS0FBYSxVQUFqQixFQUE2QjtBQUN6QixtQ0FBTyxFQUFFLElBQUYsQ0FBTyxLQUFQLENBQVA7QUFDSDs7QUFFRCwrQkFBTyxJQUFQO0FBQ0gscUJBTmUsQ0FNYixjQU5hLENBZGI7QUFxQkgsNEJBQVEsS0FBSyxNQUFMLElBQWUsTUFyQnBCO0FBc0JILDhCQUFVLEtBQUssUUFBTCxJQUFpQixRQXRCeEI7QUF1QkgsNEJBQVEsS0FBSyxNQXZCVjtBQXdCSCx5Q0FBcUIsS0FBSyxtQkF4QnZCO0FBeUJILGdDQUFZLEtBQUssVUFBTCxJQUFtQixVQXpCNUI7QUEwQkgsNEJBQVEsS0FBSyxNQUFMLElBQWUsTUExQnBCO0FBMkJILHNDQUFtQixhQUFLO0FBQ3BCLDRCQUFJLE9BQU8sQ0FBUCxLQUFhLFVBQWpCLEVBQTZCO0FBQ3pCLG1DQUFPLEVBQUUsSUFBRixDQUFPLEtBQVAsQ0FBUDtBQUNIOztBQUVELCtCQUFPLElBQVA7QUFDSCxxQkFOaUIsQ0FNZixnQkFOZSxDQTNCZjtBQWtDSCxtQ0FBZSxLQUFLLGFBQUwsSUFBc0I7QUFsQ2xDLGlCQUFQO0FBb0NILGFBckNpQixDQUFsQjtBQXNDSCxTQXpDSSxNQTBDQTtBQUNELGtCQUFNLElBQUksS0FBSixDQUFVLG9DQUFWLENBQU47QUFDSDs7QUFFRCxZQUFJLHNCQUFKLENBQWlCLElBQWpCO0FBQ0EsWUFBSSx1QkFBSixDQUFrQixJQUFsQjtBQUNBLFlBQUksMkJBQUosQ0FBc0IsSUFBdEI7QUFDQSxZQUFJLHVCQUFKLENBQWtCLElBQWxCO0FBQ0g7Ozs7bUNBbUJVO0FBQ1AsbUJBQU8sS0FBSyxVQUFMLENBQWdCLEdBQWhCLENBQW9CLGtCQUFVO0FBQ2pDLHVCQUFPLE9BQU8sT0FBZDtBQUNILGFBRk0sQ0FBUDtBQUdIOzs7K0JBRU0sRSxFQUFJLE0sRUFBUTtBQUNmLGdCQUFJLENBQUMsRUFBTCxFQUFTO0FBQ0wsc0JBQU0sSUFBSSxLQUFKLENBQVUsZ0RBQVYsQ0FBTjtBQUNIOztBQUVEO0FBQ0EsZ0JBQUksT0FBTyxNQUFQLEtBQWtCLFdBQWxCLElBQWlDLGNBQWMsTUFBbkQsRUFBMkQ7QUFDdkQscUJBQUssR0FBRyxHQUFILEVBQUw7QUFDSDs7QUFFRDtBQUNBLGdCQUFJLEdBQUcsV0FBSCxLQUFtQixRQUFuQixJQUErQixHQUFHLFdBQUgsS0FBbUIsY0FBbEQsSUFBb0UsR0FBRyxXQUFILEtBQW1CLEtBQTNGLEVBQWtHO0FBQzlGLG9CQUFJLFNBQVMsR0FBRyxNQUFoQjtBQUNBLHFCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksTUFBcEIsRUFBNEIsRUFBRSxDQUE5QixFQUFpQztBQUM3Qix5QkFBSyxPQUFMLENBQWEsR0FBRyxDQUFILENBQWI7QUFDSDtBQUNKLGFBTEQsTUFLTztBQUNILHFCQUFLLE9BQUwsQ0FBYSxFQUFiLEVBQWlCLE1BQWpCO0FBQ0g7QUFDSjs7O2dDQUVPLEUsRUFBSSxNLEVBQVE7QUFDaEIsZ0JBQUksR0FBRyxZQUFILENBQWdCLGNBQWhCLENBQUosRUFBcUM7QUFDakMsd0JBQVEsSUFBUixDQUFhLGtDQUFrQyxHQUFHLFFBQWxEO0FBQ0g7O0FBRUQsaUJBQUssY0FBTCxDQUFvQixFQUFwQjtBQUNBLGlCQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLEVBQWpCLEVBQXFCLE1BQXJCOztBQUVBLGdCQUFJLEtBQUssZUFBVCxFQUEwQjtBQUN0QixxQkFBSyxlQUFMLENBQXFCLGdCQUFyQixDQUFzQyxRQUF0QyxFQUFnRCxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBaEQ7QUFDSDs7QUFFRCxlQUFHLFlBQUgsQ0FBZ0IsY0FBaEIsRUFBZ0MsSUFBaEM7QUFDSDs7O29DQUVXLEMsRUFBRztBQUNYLGlCQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLElBQW5CLEVBQXlCLENBQXpCO0FBQ0g7Ozt1Q0FFYyxPLEVBQVM7QUFDcEIsZ0JBQUksUUFBUSxVQUFSLEdBQXFCLE9BQXJCLENBQTZCLFFBQVEsUUFBckMsTUFBbUQsQ0FBQyxDQUF4RCxFQUEyRDtBQUN2RCxvQkFBSSxRQUFRLGVBQVosRUFBNkI7QUFDekIsNEJBQVEsZUFBUixHQUEwQixJQUExQjtBQUNILGlCQUZELE1BRU87QUFDSCwwQkFBTSxJQUFJLEtBQUosQ0FBVSw4QkFBOEIsUUFBUSxRQUFoRCxDQUFOO0FBQ0g7QUFDSjtBQUNKOzs7cUNBRVk7QUFDVCxnQkFBSSxVQUFVLEtBQUssS0FBTCxDQUFXLFdBQVgsR0FBeUIsYUFBekIsQ0FBdUMsS0FBdkMsQ0FBZDtBQUFBLGdCQUNJLEtBQUssS0FBSyxLQUFMLENBQVcsV0FBWCxHQUF5QixhQUF6QixDQUF1QyxJQUF2QyxDQURUOztBQUdBLG9CQUFRLFNBQVIsR0FBb0IsbUJBQXBCO0FBQ0Esb0JBQVEsV0FBUixDQUFvQixFQUFwQjs7QUFFQSxnQkFBSSxLQUFLLGFBQVQsRUFBd0I7QUFDcEIsdUJBQU8sS0FBSyxhQUFMLENBQW1CLFdBQW5CLENBQStCLE9BQS9CLENBQVA7QUFDSDs7QUFFRCxtQkFBTyxLQUFLLEtBQUwsQ0FBVyxXQUFYLEdBQXlCLElBQXpCLENBQThCLFdBQTlCLENBQTBDLE9BQTFDLENBQVA7QUFDSDs7O29DQUVXLE8sRUFBUyxRLEVBQVU7QUFBQTs7QUFDM0I7QUFDQSxnQkFBSSxLQUFLLFFBQUwsSUFBaUIsS0FBSyxPQUFMLENBQWEsT0FBYixLQUF5QixPQUExQyxJQUFxRCxLQUFLLE9BQUwsQ0FBYSxXQUFiLEtBQTZCLEtBQUssMEJBQTNGLEVBQXVIO0FBQ3JIO0FBQ0Q7QUFDRCxpQkFBSywwQkFBTCxHQUFrQyxLQUFLLE9BQUwsQ0FBYSxXQUEvQzs7QUFFQTtBQUNBLGdCQUFJLENBQUMsS0FBSyxJQUFWLEVBQWdCO0FBQ1oscUJBQUssSUFBTCxHQUFZLEtBQUssVUFBTCxFQUFaO0FBQ0Esd0JBQVEsV0FBUixHQUFzQixLQUFLLElBQTNCO0FBQ0EscUJBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixLQUFLLElBQTFCO0FBQ0g7O0FBRUQsaUJBQUssUUFBTCxHQUFnQixJQUFoQjtBQUNBLGlCQUFLLFlBQUwsR0FBb0IsQ0FBcEI7O0FBRUEsZ0JBQUksQ0FBQyxLQUFLLE9BQUwsQ0FBYSxXQUFsQixFQUErQjtBQUMzQixxQkFBSyxPQUFMLENBQWEsV0FBYixHQUEyQixFQUEzQjtBQUNIOztBQUVELGdCQUFNLGdCQUFnQixTQUFoQixhQUFnQixDQUFDLE1BQUQsRUFBUyxJQUFULEVBQWtCO0FBQ3BDO0FBQ0Esb0JBQUksQ0FBQyxPQUFLLFFBQVYsRUFBb0I7QUFDaEI7QUFDSDs7QUFFRCxvQkFBSSxRQUFRLE9BQUssTUFBTCxDQUFZLE1BQVosQ0FBbUIsT0FBSyxPQUFMLENBQWEsV0FBaEMsRUFBNkMsTUFBN0MsRUFBcUQ7QUFDN0QseUJBQUssT0FBSyxPQUFMLENBQWEsVUFBYixDQUF3QixVQUF4QixDQUFtQyxHQUFuQyxJQUEwQyxRQURjO0FBRTdELDBCQUFNLE9BQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsVUFBeEIsQ0FBbUMsSUFBbkMsSUFBMkMsU0FGWTtBQUc3RCw2QkFBUyxpQkFBQyxFQUFELEVBQVE7QUFDYiw0QkFBSSxPQUFPLE9BQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsTUFBL0IsS0FBMEMsUUFBOUMsRUFBd0Q7QUFDcEQsbUNBQU8sR0FBRyxPQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLE1BQTNCLENBQVA7QUFDSCx5QkFGRCxNQUVPLElBQUksT0FBTyxPQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLE1BQS9CLEtBQTBDLFVBQTlDLEVBQTBEO0FBQzdELG1DQUFPLE9BQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsTUFBeEIsQ0FBK0IsRUFBL0IsRUFBbUMsT0FBSyxPQUFMLENBQWEsV0FBaEQsQ0FBUDtBQUNILHlCQUZNLE1BRUE7QUFDSCxrQ0FBTSxJQUFJLEtBQUosQ0FBVSw4REFBVixDQUFOO0FBQ0g7QUFDSjtBQVg0RCxpQkFBckQsQ0FBWjs7QUFjQSx1QkFBSyxPQUFMLENBQWEsYUFBYixHQUE2QixLQUE3Qjs7QUFFQSxvQkFBSSxLQUFLLE9BQUssSUFBTCxDQUFVLGFBQVYsQ0FBd0IsSUFBeEIsQ0FBVDs7QUFFQSx1QkFBSyxLQUFMLENBQVcsbUJBQVgsQ0FBK0IsUUFBL0I7O0FBRUEsb0JBQUksT0FBSyxPQUFMLENBQWEsVUFBYixDQUF3QixjQUF4QixJQUEwQyxPQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLGNBQXhCLENBQXVDLElBQXZDLENBQTlDLEVBQTRGO0FBQ3hGLHdCQUFNLFNBQVMsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWY7QUFDQSwyQkFBTyxZQUFQLENBQW9CLE9BQXBCLEVBQTZCLFFBQTdCO0FBQ0EsMkJBQU8sU0FBUCxHQUFtQixPQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLGNBQXhCLENBQXVDLElBQXZDLENBQW5CO0FBQ0Esd0JBQU0sWUFBWSxPQUFLLElBQUwsQ0FBVSxhQUFWLENBQXdCLFNBQXhCLENBQWxCO0FBQ0Esd0JBQUksYUFBYSxVQUFVLE1BQTNCLEVBQW1DO0FBQy9CLGtDQUFVLE1BQVY7QUFDSCxxQkFGRCxNQUVPLElBQUksYUFBYSxDQUFDLFVBQVUsTUFBNUIsRUFBb0M7QUFDdkMsa0NBQVUsVUFBVixDQUFxQixXQUFyQixDQUFpQyxTQUFqQztBQUNIO0FBQ0QsMkJBQUssSUFBTCxDQUFVLFlBQVYsQ0FBdUIsTUFBdkIsRUFBK0IsT0FBSyxJQUFMLENBQVUsVUFBVixDQUFxQixDQUFyQixDQUEvQjtBQUNIOztBQUVELG9CQUFJLENBQUMsTUFBTSxNQUFYLEVBQW1CO0FBQ2Ysd0JBQUksZUFBZSxJQUFJLFdBQUosQ0FBZ0Isa0JBQWhCLEVBQW9DLEVBQUUsUUFBUSxPQUFLLElBQWYsRUFBcEMsQ0FBbkI7QUFDQSwyQkFBSyxPQUFMLENBQWEsT0FBYixDQUFxQixhQUFyQixDQUFtQyxZQUFuQztBQUNBLHdCQUFJLENBQUMsT0FBSyxPQUFMLENBQWEsVUFBYixDQUF3QixlQUE3QixFQUE4QztBQUMxQywrQkFBSyxRQUFMO0FBQ0gscUJBRkQsTUFFTztBQUNILDJCQUFHLFNBQUgsR0FBZSxPQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLGVBQXhCLEVBQWY7QUFDSDs7QUFFRDtBQUNIOztBQUVELG9CQUFJLE9BQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsYUFBNUIsRUFBMkM7QUFDdkMsNEJBQVEsTUFBTSxLQUFOLENBQVksQ0FBWixFQUFlLE9BQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsYUFBdkMsQ0FBUjtBQUNIOztBQUVELG1CQUFHLFNBQUgsR0FBZSxFQUFmO0FBQ0Esb0JBQUksV0FBVyxPQUFLLEtBQUwsQ0FBVyxXQUFYLEdBQXlCLHNCQUF6QixFQUFmOztBQUVBLHNCQUFNLE9BQU4sQ0FBYyxVQUFDLElBQUQsRUFBTyxLQUFQLEVBQWlCO0FBQzNCLHdCQUFJLEtBQUssT0FBSyxLQUFMLENBQVcsV0FBWCxHQUF5QixhQUF6QixDQUF1QyxJQUF2QyxDQUFUO0FBQ0EsdUJBQUcsWUFBSCxDQUFnQixZQUFoQixFQUE4QixLQUE5QjtBQUNBLHVCQUFHLGdCQUFILENBQW9CLFdBQXBCLEVBQWlDLFVBQUMsQ0FBRCxFQUFPO0FBQ3RDLDRCQUFJLEtBQUssRUFBRSxNQUFYO0FBQ0EsNEJBQUksUUFBUSxHQUFHLFlBQUgsQ0FBZ0IsWUFBaEIsS0FBa0MsR0FBRyxVQUFILElBQWlCLEdBQUcsVUFBSCxDQUFjLFlBQWQsQ0FBMkIsWUFBM0IsQ0FBL0Q7QUFDRSw0QkFBSSxFQUFFLFNBQUYsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkIsbUNBQUssTUFBTCxDQUFZLFdBQVosQ0FBd0IsS0FBeEI7QUFDSDtBQUNKLHFCQU5EO0FBT0Esd0JBQUksT0FBSyxZQUFMLEtBQXNCLEtBQTFCLEVBQWlDO0FBQy9CLDJCQUFHLFNBQUgsR0FBZSxPQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLFdBQXZDO0FBQ0Q7QUFDRCx1QkFBRyxTQUFILEdBQWUsT0FBSyxPQUFMLENBQWEsVUFBYixDQUF3QixnQkFBeEIsQ0FBeUMsSUFBekMsQ0FBZjtBQUNBLDZCQUFTLFdBQVQsQ0FBcUIsRUFBckI7QUFDSCxpQkFmRDtBQWdCQSxtQkFBRyxXQUFILENBQWUsUUFBZjtBQUNILGFBM0VEOztBQTZFQSxnQkFBSSxPQUFPLEtBQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsTUFBL0IsS0FBMEMsVUFBOUMsRUFBMEQ7QUFDdEQscUJBQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsTUFBeEIsQ0FBK0IsS0FBSyxPQUFMLENBQWEsV0FBNUMsRUFBeUQsYUFBekQ7QUFDSCxhQUZELE1BRU87QUFDSCw4QkFBYyxLQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLE1BQXRDLEVBQThDLEtBQUssT0FBTCxDQUFhLFdBQTNEO0FBQ0g7QUFDRCxpQkFBSyxJQUFMLENBQVUsYUFBVixDQUF3QixJQUF4QixFQUE4QixTQUE5QixHQUEwQyxDQUExQztBQUNIOzs7OENBRXFCLE8sRUFBUyxlLEVBQWlCO0FBQzVDLGdCQUFJLFlBQVksU0FBUyxhQUF6QixFQUF3QztBQUNwQyxxQkFBSyxlQUFMLENBQXFCLE9BQXJCO0FBQ0g7O0FBRUQsaUJBQUssT0FBTCxDQUFhLFVBQWIsR0FBMEIsS0FBSyxVQUFMLENBQWdCLG1CQUFtQixDQUFuQyxDQUExQjtBQUNBLGlCQUFLLE9BQUwsQ0FBYSxlQUFiLEdBQStCLElBQS9CO0FBQ0EsaUJBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsT0FBdkI7O0FBRUEsZ0JBQUksUUFBUSxpQkFBWixFQUNJLEtBQUssa0JBQUwsQ0FBd0IsS0FBSyxPQUFMLENBQWEsVUFBYixDQUF3QixPQUFoRCxFQURKLEtBR0ksS0FBSyxhQUFMLENBQW1CLE9BQW5CLEVBQTRCLEtBQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsT0FBcEQ7O0FBRUosaUJBQUssV0FBTCxDQUFpQixPQUFqQjtBQUNIOztBQUVEOzs7O3dDQUNnQixFLEVBQUk7QUFDaEIsZUFBRyxLQUFIO0FBQ0EsZ0JBQUksT0FBTyxPQUFPLFlBQWQsSUFBOEIsV0FBOUIsSUFDTyxPQUFPLFNBQVMsV0FBaEIsSUFBK0IsV0FEMUMsRUFDdUQ7QUFDbkQsb0JBQUksUUFBUSxTQUFTLFdBQVQsRUFBWjtBQUNBLHNCQUFNLGtCQUFOLENBQXlCLEVBQXpCO0FBQ0Esc0JBQU0sUUFBTixDQUFlLEtBQWY7QUFDQSxvQkFBSSxNQUFNLE9BQU8sWUFBUCxFQUFWO0FBQ0Esb0JBQUksZUFBSjtBQUNBLG9CQUFJLFFBQUosQ0FBYSxLQUFiO0FBQ0gsYUFSRCxNQVFPLElBQUksT0FBTyxTQUFTLElBQVQsQ0FBYyxlQUFyQixJQUF3QyxXQUE1QyxFQUF5RDtBQUM1RCxvQkFBSSxZQUFZLFNBQVMsSUFBVCxDQUFjLGVBQWQsRUFBaEI7QUFDQSwwQkFBVSxpQkFBVixDQUE0QixFQUE1QjtBQUNBLDBCQUFVLFFBQVYsQ0FBbUIsS0FBbkI7QUFDQSwwQkFBVSxNQUFWO0FBQ0g7QUFDSjs7QUFFRDs7OzsyQ0FDbUIsSSxFQUFNO0FBQ3JCLGdCQUFJLEdBQUosRUFBUyxLQUFULEVBQWdCLElBQWhCO0FBQ0Esa0JBQU0sT0FBTyxZQUFQLEVBQU47QUFDQSxvQkFBUSxJQUFJLFVBQUosQ0FBZSxDQUFmLENBQVI7QUFDQSxrQkFBTSxjQUFOO0FBQ0EsZ0JBQUksV0FBVyxTQUFTLGNBQVQsQ0FBd0IsSUFBeEIsQ0FBZjtBQUNBLGtCQUFNLFVBQU4sQ0FBaUIsUUFBakI7QUFDQSxrQkFBTSxrQkFBTixDQUF5QixRQUF6QjtBQUNBLGtCQUFNLFFBQU4sQ0FBZSxLQUFmO0FBQ0EsZ0JBQUksZUFBSjtBQUNBLGdCQUFJLFFBQUosQ0FBYSxLQUFiO0FBQ0g7O0FBRUQ7Ozs7c0NBQ2MsUSxFQUFVLEksRUFBTTtBQUMxQixnQkFBSSxZQUFZLFNBQVMsU0FBekI7QUFDQSxnQkFBSSxXQUFXLFNBQVMsY0FBeEI7O0FBRUEsZ0JBQUksUUFBUyxTQUFTLEtBQVYsQ0FBaUIsU0FBakIsQ0FBMkIsQ0FBM0IsRUFBOEIsUUFBOUIsQ0FBWjtBQUNBLGdCQUFJLE9BQVEsU0FBUyxLQUFWLENBQWlCLFNBQWpCLENBQTJCLFNBQVMsWUFBcEMsRUFBa0QsU0FBUyxLQUFULENBQWUsTUFBakUsQ0FBWDtBQUNBLHFCQUFTLEtBQVQsR0FBaUIsUUFBUSxJQUFSLEdBQWUsSUFBaEM7QUFDQSx1QkFBVyxXQUFXLEtBQUssTUFBM0I7QUFDQSxxQkFBUyxjQUFULEdBQTBCLFFBQTFCO0FBQ0EscUJBQVMsWUFBVCxHQUF3QixRQUF4QjtBQUNBLHFCQUFTLEtBQVQ7QUFDQSxxQkFBUyxTQUFULEdBQXFCLFNBQXJCO0FBQ0g7OzttQ0FFVTtBQUNQLGdCQUFJLEtBQUssSUFBVCxFQUFlO0FBQ1gscUJBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsT0FBaEIsR0FBMEIsZ0JBQTFCO0FBQ0EscUJBQUssUUFBTCxHQUFnQixLQUFoQjtBQUNBLHFCQUFLLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxxQkFBSyxPQUFMLEdBQWUsRUFBZjtBQUNIO0FBQ0o7OzswQ0FFaUIsSyxFQUFPLGEsRUFBZTtBQUNwQyxvQkFBUSxTQUFTLEtBQVQsQ0FBUjtBQUNBLGdCQUFJLE9BQU8sS0FBUCxLQUFpQixRQUFqQixJQUE2QixNQUFNLEtBQU4sQ0FBakMsRUFBK0M7QUFDL0MsZ0JBQUksT0FBTyxLQUFLLE9BQUwsQ0FBYSxhQUFiLENBQTJCLEtBQTNCLENBQVg7QUFDQSxnQkFBSSxPQUFPLEtBQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsZ0JBQS9CLEtBQW9ELFVBQXBELElBQWtFLEtBQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsZ0JBQXhCLENBQXlDLElBQXpDLEVBQStDLEtBQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsTUFBdkUsTUFBbUYsS0FBekosRUFBZ0s7QUFDNUoscUJBQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsTUFBeEIsQ0FBK0IsRUFBL0IsQ0FBa0MsYUFBbEMsQ0FBZ0QsS0FBSyxZQUFyRDtBQUNBO0FBQ0g7QUFDRCxnQkFBSSxVQUFVLEtBQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsY0FBeEIsQ0FBdUMsSUFBdkMsQ0FBZDtBQUNBLGdCQUFJLFlBQVksSUFBaEIsRUFBc0IsS0FBSyxXQUFMLENBQWlCLE9BQWpCLEVBQTBCLGFBQTFCLEVBQXlDLElBQXpDO0FBQ3pCOzs7b0NBRVcsTyxFQUFTLGEsRUFBZSxJLEVBQU07QUFDdEMsaUJBQUssS0FBTCxDQUFXLGtCQUFYLENBQThCLE9BQTlCLEVBQXVDLElBQXZDLEVBQTZDLElBQTdDLEVBQW1ELGFBQW5ELEVBQWtFLElBQWxFO0FBQ0g7OztnQ0FFTyxVLEVBQVksUyxFQUFXLE8sRUFBUztBQUNwQyxnQkFBSSxPQUFPLFdBQVcsTUFBbEIsS0FBNkIsVUFBakMsRUFBNkM7QUFDekMsc0JBQU0sSUFBSSxLQUFKLENBQVUsa0RBQVYsQ0FBTjtBQUNILGFBRkQsTUFFTyxJQUFJLENBQUMsT0FBTCxFQUFjO0FBQ2pCLDJCQUFXLE1BQVgsR0FBb0IsV0FBVyxNQUFYLENBQWtCLE1BQWxCLENBQXlCLFNBQXpCLENBQXBCO0FBQ0gsYUFGTSxNQUVBO0FBQ0gsMkJBQVcsTUFBWCxHQUFvQixTQUFwQjtBQUNIO0FBQ0o7OzsrQkFFTSxlLEVBQWlCLFMsRUFBVyxPLEVBQVM7QUFDeEMsZ0JBQUksUUFBUSxTQUFTLGVBQVQsQ0FBWjtBQUNBLGdCQUFJLE9BQU8sS0FBUCxLQUFpQixRQUFyQixFQUErQixNQUFNLElBQUksS0FBSixDQUFVLHVEQUFWLENBQU47O0FBRS9CLGdCQUFJLGFBQWEsS0FBSyxVQUFMLENBQWdCLEtBQWhCLENBQWpCOztBQUVBLGlCQUFLLE9BQUwsQ0FBYSxVQUFiLEVBQXlCLFNBQXpCLEVBQW9DLE9BQXBDO0FBQ0g7OztzQ0FFYSxTLEVBQVcsTyxFQUFTO0FBQzlCLGdCQUFJLEtBQUssUUFBVCxFQUFtQjtBQUNmLHFCQUFLLE9BQUwsQ0FBYSxLQUFLLE9BQUwsQ0FBYSxVQUExQixFQUFzQyxTQUF0QyxFQUFpRCxPQUFqRDtBQUNILGFBRkQsTUFFTztBQUNILHNCQUFNLElBQUksS0FBSixDQUFVLCtEQUFWLENBQU47QUFDSDtBQUNKOzs7K0JBRU0sRSxFQUFJO0FBQ1AsZ0JBQUksQ0FBQyxFQUFMLEVBQVM7QUFDTCxzQkFBTSxJQUFJLEtBQUosQ0FBVSxnREFBVixDQUFOO0FBQ0g7O0FBRUQ7QUFDQSxnQkFBSSxPQUFPLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUMsY0FBYyxNQUFuRCxFQUEyRDtBQUN2RCxxQkFBSyxHQUFHLEdBQUgsRUFBTDtBQUNIOztBQUVEO0FBQ0EsZ0JBQUksR0FBRyxXQUFILEtBQW1CLFFBQW5CLElBQStCLEdBQUcsV0FBSCxLQUFtQixjQUFsRCxJQUFvRSxHQUFHLFdBQUgsS0FBbUIsS0FBM0YsRUFBa0c7QUFDOUYsb0JBQUksU0FBUyxHQUFHLE1BQWhCO0FBQ0EscUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxNQUFwQixFQUE0QixFQUFFLENBQTlCLEVBQWlDO0FBQzdCLHlCQUFLLE9BQUwsQ0FBYSxHQUFHLENBQUgsQ0FBYjtBQUNIO0FBQ0osYUFMRCxNQUtPO0FBQ0gscUJBQUssT0FBTCxDQUFhLEVBQWI7QUFDSDtBQUNKOzs7Z0NBRU8sRSxFQUFJO0FBQUE7O0FBQ1IsaUJBQUssTUFBTCxDQUFZLE1BQVosQ0FBbUIsRUFBbkI7QUFDQSxnQkFBSSxHQUFHLFdBQVAsRUFBb0I7QUFDaEIscUJBQUssVUFBTCxDQUFnQixNQUFoQixDQUF1QixHQUFHLFdBQTFCO0FBQ0g7QUFDRCxnQkFBSSxLQUFLLGVBQVQsRUFBMEI7QUFDdEIscUJBQUssZUFBTCxDQUFxQixtQkFBckIsQ0FBeUMsUUFBekMsRUFBbUQsS0FBSyxXQUF4RDtBQUNIOztBQUVELHVCQUFXLFlBQU07QUFDYixtQkFBRyxlQUFILENBQW1CLGNBQW5CO0FBQ0EsdUJBQUssUUFBTCxHQUFnQixLQUFoQjtBQUNBLG9CQUFJLEdBQUcsV0FBUCxFQUFvQjtBQUNoQix1QkFBRyxXQUFILENBQWUsTUFBZjtBQUNIO0FBQ0osYUFORDtBQU9IOzs7OENBM1Y0QixJLEVBQU07QUFDakMsZ0JBQUksT0FBTyxJQUFQLEtBQWdCLFdBQXBCLEVBQWlDLE9BQU8sSUFBUDtBQUNqQyxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxpQkFBWCxDQUE2QixLQUFLLE9BQUwsQ0FBYSxPQUExQyxDQUFKLEVBQXdEO0FBQ3BELHVCQUFPLG9DQUFvQyxLQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLE9BQXhCLEdBQWtDLEtBQUssUUFBTCxDQUFjLEtBQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsUUFBdEMsQ0FBdEUsSUFBeUgsU0FBaEk7QUFDSDs7QUFFRCxtQkFBTyxLQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLE9BQXhCLEdBQWtDLEtBQUssUUFBTCxDQUFjLEtBQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsUUFBdEMsQ0FBekM7QUFDRDs7O2dEQUU4QixTLEVBQVc7QUFDdEMsbUJBQU8sVUFBVSxNQUFqQjtBQUNIOzs7cUNBRW1CO0FBQ2hCLG1CQUFPLENBQUMsVUFBRCxFQUFhLE9BQWIsQ0FBUDtBQUNIOzs7Ozs7a0JBK1VVLE87Ozs7Ozs7Ozs7Ozs7O0lDdGdCVCxhO0FBQ0YsMkJBQVksT0FBWixFQUFxQjtBQUFBOztBQUNqQixhQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsYUFBSyxPQUFMLENBQWEsTUFBYixHQUFzQixJQUF0QjtBQUNIOzs7OzZCQXdDSSxPLEVBQVMsTSxFQUFRO0FBQ2xCLG9CQUFRLFlBQVIsR0FBdUIsS0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixPQUFsQixFQUEyQixJQUEzQixFQUFpQyxNQUFqQyxDQUF2QjtBQUNBLG9CQUFRLFVBQVIsR0FBcUIsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixPQUFoQixFQUF5QixJQUF6QixFQUErQixNQUEvQixDQUFyQjtBQUNBLG9CQUFRLFVBQVIsR0FBcUIsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixPQUFoQixFQUF5QixJQUF6QixFQUErQixNQUEvQixDQUFyQjs7QUFFQSxvQkFBUSxnQkFBUixDQUF5QixTQUF6QixFQUNJLFFBQVEsWUFEWixFQUMwQixLQUQxQjtBQUVBLG9CQUFRLGdCQUFSLENBQXlCLE9BQXpCLEVBQ0ksUUFBUSxVQURaLEVBQ3dCLEtBRHhCO0FBRUEsb0JBQVEsZ0JBQVIsQ0FBeUIsT0FBekIsRUFDSSxRQUFRLFVBRFosRUFDd0IsS0FEeEI7QUFFSDs7OytCQUVNLE8sRUFBUztBQUNaLG9CQUFRLG1CQUFSLENBQTRCLFNBQTVCLEVBQ0ksUUFBUSxZQURaLEVBQzBCLEtBRDFCO0FBRUEsb0JBQVEsbUJBQVIsQ0FBNEIsT0FBNUIsRUFDSSxRQUFRLFVBRFosRUFDd0IsS0FEeEI7QUFFQSxvQkFBUSxtQkFBUixDQUE0QixPQUE1QixFQUNJLFFBQVEsVUFEWixFQUN3QixLQUR4Qjs7QUFHQSxtQkFBTyxRQUFRLFlBQWY7QUFDQSxtQkFBTyxRQUFRLFVBQWY7QUFDQSxtQkFBTyxRQUFRLFVBQWY7QUFDSDs7OytCQUVNLFEsRUFBVSxDLEVBQUc7QUFDaEIscUJBQVMsUUFBVCxHQUFvQixLQUFwQjtBQUNBLHFCQUFTLFFBQVQ7QUFDSDs7O2dDQUVPLFEsRUFBVSxNLEVBQVEsSyxFQUFPO0FBQzdCLGdCQUFJLFNBQVMsT0FBVCxDQUFpQixRQUFqQixJQUE2QixDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEVBQWIsRUFBaUIsUUFBakIsQ0FBMEIsTUFBTSxPQUFoQyxDQUFqQyxFQUEyRTtBQUN2RTtBQUNIO0FBQ0QsZ0JBQUksU0FBUyxnQkFBVCxDQUEwQixLQUExQixDQUFKLEVBQXNDO0FBQ2xDLHlCQUFTLE9BQVQsQ0FBaUIsUUFBakIsR0FBNEIsS0FBNUI7QUFDQSx5QkFBUyxPQUFULENBQWlCLFFBQWpCO0FBQ0g7O0FBRUQsZ0JBQUksVUFBVSxJQUFkO0FBQ0EscUJBQVMsWUFBVCxHQUF3QixLQUF4Qjs7QUFFQSwwQkFBYyxJQUFkLEdBQXFCLE9BQXJCLENBQTZCLGFBQUs7QUFDOUIsb0JBQUksRUFBRSxHQUFGLEtBQVUsTUFBTSxPQUFwQixFQUE2QjtBQUN6Qiw2QkFBUyxZQUFULEdBQXdCLElBQXhCO0FBQ0EsNkJBQVMsU0FBVCxHQUFxQixFQUFFLEtBQUYsQ0FBUSxXQUFSLEVBQXJCLEVBQTRDLEtBQTVDLEVBQW1ELE9BQW5ELEVBQTRELE1BQTVEO0FBQ0g7QUFDSixhQUxEO0FBTUg7Ozs4QkFFSyxRLEVBQVUsSyxFQUFPLE0sRUFBUTtBQUMzQixxQkFBUyxVQUFULEdBQXNCLElBQXRCO0FBQ0EscUJBQVMsS0FBVCxDQUFlLElBQWYsQ0FBb0IsSUFBcEIsRUFBMEIsUUFBMUIsRUFBb0MsS0FBcEMsRUFBMkMsTUFBM0M7QUFDSDs7OzhCQUVLLFEsRUFBVSxLLEVBQU87QUFDbkIsZ0JBQUksVUFBVSxTQUFTLE9BQXZCO0FBQ0EsZ0JBQUksUUFBUSxJQUFSLElBQWdCLFFBQVEsSUFBUixDQUFhLFFBQWIsQ0FBc0IsTUFBTSxNQUE1QixDQUFwQixFQUF5RDtBQUNyRCxzQkFBTSxjQUFOO0FBQ0Esc0JBQU0sZUFBTjtBQUNBLG9CQUFJLE1BQU0sTUFBTixDQUFhLFlBQWIsQ0FBMEIsT0FBMUIsTUFBdUMsUUFBdkMsSUFBbUQsTUFBTSxNQUFOLENBQWEsT0FBYixLQUF5QixJQUFoRixFQUFzRjtBQUNsRjtBQUNIO0FBQ0Qsb0JBQUksS0FBSyxNQUFNLE1BQWY7QUFDQSx1QkFBTyxHQUFHLFFBQUgsQ0FBWSxXQUFaLE9BQThCLElBQXJDLEVBQTJDO0FBQ3ZDLHlCQUFLLEdBQUcsVUFBUjtBQUNBLHdCQUFJLENBQUMsRUFBRCxJQUFPLE9BQU8sUUFBUSxJQUExQixFQUFnQztBQUM1Qiw4QkFBTSxJQUFJLEtBQUosQ0FBVSw4Q0FBVixDQUFOO0FBQ0g7QUFDSjtBQUNELHdCQUFRLGlCQUFSLENBQTBCLEdBQUcsWUFBSCxDQUFnQixZQUFoQixDQUExQixFQUF5RCxLQUF6RDtBQUNBLHdCQUFRLFFBQVI7O0FBRUo7QUFDQyxhQWpCRCxNQWlCTyxJQUFJLFFBQVEsT0FBUixDQUFnQixPQUFoQixJQUEyQixDQUFDLFFBQVEsT0FBUixDQUFnQixlQUFoRCxFQUFpRTtBQUNwRSx3QkFBUSxPQUFSLENBQWdCLGVBQWhCLEdBQWtDLEtBQWxDO0FBQ0EsMkJBQVc7QUFBQSwyQkFBTSxRQUFRLFFBQVIsRUFBTjtBQUFBLGlCQUFYO0FBQ0g7QUFDSjs7OzhCQUVLLFEsRUFBVSxNLEVBQVEsSyxFQUFPO0FBQzNCLGdCQUFJLFNBQVMsT0FBVCxDQUFpQixRQUFqQixJQUE2QixDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEVBQWIsRUFBaUIsUUFBakIsQ0FBMEIsTUFBTSxPQUFoQyxDQUFqQyxFQUEyRTtBQUN2RTtBQUNIOztBQUVELGdCQUFJLFNBQVMsVUFBYixFQUF5QjtBQUNyQix5QkFBUyxVQUFULEdBQXNCLEtBQXRCO0FBQ0g7QUFDRCxxQkFBUyxlQUFULENBQXlCLElBQXpCO0FBQ0EsZ0JBQUksTUFBTSxPQUFOLEtBQWtCLEVBQXRCLEVBQTBCOztBQUUxQixnQkFBSSxVQUFVLE9BQU8sV0FBakIsSUFBZ0MsT0FBTyxXQUFQLENBQW1CLEtBQW5CLE9BQStCLENBQW5FLEVBQXNFO0FBQ2xFLHlCQUFTLE9BQVQsQ0FBaUIsUUFBakIsR0FBNEIsS0FBNUI7QUFDQSx5QkFBUyxPQUFULENBQWlCLFFBQWpCO0FBQ0E7QUFDSDs7QUFFRCxnQkFBSSxDQUFDLFNBQVMsT0FBVCxDQUFpQixXQUFsQixJQUFpQyxTQUFTLE9BQVQsQ0FBaUIsZ0JBQXRELEVBQXdFO0FBQ3BFLHlCQUFTLE9BQVQsQ0FBaUIsZ0JBQWpCLEdBQW9DLEtBQXBDO0FBQ0EseUJBQVMsWUFBVCxHQUF3QixJQUF4QjtBQUNBLHlCQUFTLFNBQVQsR0FBcUIsT0FBckIsRUFBOEIsS0FBOUIsRUFBcUMsSUFBckM7QUFDQTtBQUNIOztBQUVELGdCQUFJLENBQUMsU0FBUyxPQUFULENBQWlCLFFBQXRCLEVBQWdDO0FBQzVCLG9CQUFJLFNBQVMsT0FBVCxDQUFpQixnQkFBckIsRUFBdUM7QUFDbkMsNkJBQVMsU0FBVCxHQUFxQixXQUFyQixDQUFpQyxLQUFqQyxFQUF3QyxJQUF4QyxFQUE4QyxFQUE5QztBQUNILGlCQUZELE1BRU87QUFDSCx3QkFBSSxVQUFVLFNBQVMsVUFBVCxDQUFvQixRQUFwQixFQUE4QixJQUE5QixFQUFvQyxLQUFwQyxDQUFkOztBQUVBLHdCQUFJLE1BQU0sT0FBTixLQUFrQixDQUFDLE9BQXZCLEVBQWdDOztBQUVoQyx3QkFBSSxVQUFVLFNBQVMsT0FBVCxDQUFpQixRQUFqQixHQUE0QixJQUE1QixDQUFpQyxtQkFBVztBQUN0RCwrQkFBTyxRQUFRLFVBQVIsQ0FBbUIsQ0FBbkIsTUFBMEIsT0FBakM7QUFDSCxxQkFGYSxDQUFkOztBQUlBLHdCQUFJLE9BQU8sT0FBUCxLQUFtQixXQUF2QixFQUFvQztBQUNoQyxpQ0FBUyxTQUFULEdBQXFCLFdBQXJCLENBQWlDLEtBQWpDLEVBQXdDLElBQXhDLEVBQThDLE9BQTlDLEVBQXVELElBQXZEO0FBQ0g7QUFDSjtBQUNKOztBQUVELGdCQUFJLENBQUMsU0FBUyxPQUFULENBQWlCLE9BQWpCLENBQXlCLE9BQXpCLElBQW9DLFNBQVMsT0FBVCxDQUFpQixnQkFBdEQsS0FDRyxTQUFTLFlBQVQsS0FBMEIsS0FEN0IsSUFFRyxTQUFTLE9BQVQsQ0FBaUIsUUFBakIsSUFBNkIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLFFBQVIsQ0FBaUIsTUFBTSxPQUF2QixDQUZwQyxFQUVxRTtBQUNqRSxvQkFBSSxNQUFNLE9BQU4sS0FBa0IsRUFBdEIsRUFBMEI7QUFDdEIsd0JBQU0sT0FBTyxTQUFTLE9BQVQsQ0FBaUIsS0FBakIsQ0FBdUIsZ0NBQXZCLEVBQWI7QUFDQSx3QkFBSSxLQUFLLE1BQUwsR0FBYyxDQUFsQixFQUFxQjtBQUNqQixpQ0FBUyxPQUFULENBQWlCLFFBQWpCO0FBQ0E7QUFDSCxxQkFIRCxNQUdPO0FBQ0gsaUNBQVMsT0FBVCxDQUFpQixXQUFqQixDQUE2QixJQUE3QixFQUFtQyxJQUFuQztBQUNIO0FBQ0osaUJBUkQsTUFRTztBQUNILDZCQUFTLE9BQVQsQ0FBaUIsV0FBakIsQ0FBNkIsSUFBN0IsRUFBbUMsSUFBbkM7QUFDSDtBQUNKO0FBQ0o7Ozt5Q0FFZ0IsSyxFQUFPO0FBQ3BCLGdCQUFJLENBQUMsS0FBSyxPQUFMLENBQWEsUUFBbEIsRUFBNEIsT0FBTyxLQUFQOztBQUU1QixnQkFBSSxLQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLFdBQXJCLENBQWlDLE1BQWpDLEtBQTRDLENBQWhELEVBQW1EO0FBQy9DLG9CQUFJLGtCQUFrQixLQUF0QjtBQUNBLDhCQUFjLElBQWQsR0FBcUIsT0FBckIsQ0FBNkIsYUFBSztBQUM5Qix3QkFBSSxNQUFNLE9BQU4sS0FBa0IsRUFBRSxHQUF4QixFQUE2QixrQkFBa0IsSUFBbEI7QUFDaEMsaUJBRkQ7O0FBSUEsdUJBQU8sQ0FBQyxlQUFSO0FBQ0g7O0FBRUQsbUJBQU8sS0FBUDtBQUNIOzs7bUNBRVUsUSxFQUFVLEUsRUFBSSxLLEVBQU87QUFDNUIsZ0JBQUksYUFBSjtBQUNBLGdCQUFJLFVBQVUsU0FBUyxPQUF2QjtBQUNBLGdCQUFJLE9BQU8sUUFBUSxLQUFSLENBQWMsY0FBZCxDQUE2QixLQUE3QixFQUFvQyxRQUFRLGdCQUE1QyxFQUE4RCxJQUE5RCxFQUFvRSxRQUFRLFdBQTVFLEVBQXlGLFFBQVEsZ0JBQWpHLENBQVg7O0FBRUEsZ0JBQUksSUFBSixFQUFVO0FBQ04sdUJBQU8sS0FBSyxrQkFBTCxDQUF3QixVQUF4QixDQUFtQyxDQUFuQyxDQUFQO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsdUJBQU8sS0FBUDtBQUNIO0FBQ0o7Ozt3Q0FFZSxFLEVBQUk7QUFDaEIsaUJBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsT0FBckIsR0FBK0IsRUFBL0I7QUFDQSxnQkFBSSxPQUFPLEtBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsY0FBbkIsQ0FBa0MsS0FBbEMsRUFBeUMsS0FBSyxPQUFMLENBQWEsZ0JBQXRELEVBQXdFLElBQXhFLEVBQThFLEtBQUssT0FBTCxDQUFhLFdBQTNGLEVBQXdHLEtBQUssT0FBTCxDQUFhLGdCQUFySCxDQUFYOztBQUVBLGdCQUFJLElBQUosRUFBVTtBQUNOLHFCQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLFlBQXJCLEdBQW9DLEtBQUssbUJBQXpDO0FBQ0EscUJBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsV0FBckIsR0FBbUMsS0FBSyxXQUF4QztBQUNBLHFCQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLGNBQXJCLEdBQXNDLEtBQUsscUJBQTNDO0FBQ0g7QUFDSjs7O29DQUVXO0FBQUE7O0FBQ1IsbUJBQU87QUFDSCw2QkFBYSxxQkFBQyxDQUFELEVBQUksRUFBSixFQUFRLE9BQVIsRUFBc0M7QUFBQSx3QkFBckIsUUFBcUIsdUVBQVYsS0FBVTs7QUFDL0Msd0JBQU0sT0FBTyxNQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLGdDQUFuQixFQUFiO0FBQ0Esd0JBQU0sUUFBUSxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWQ7QUFDQSx3QkFBTSxXQUFXLE1BQU0sTUFBTSxNQUFOLEdBQWUsQ0FBckIsQ0FBakI7QUFDQSx3QkFBSSxTQUFTLEtBQVQsQ0FBZSxHQUFmLEVBQW9CLE1BQXBCLEdBQTZCLENBQTdCLEdBQWlDLENBQXJDLEVBQXdDO0FBQ3BDO0FBQ0g7QUFDRCx3QkFBSSxTQUFTLElBQVQsR0FBZ0IsQ0FBaEIsTUFBdUIsR0FBM0IsRUFBZ0M7QUFDNUI7QUFDSDtBQUNELHdCQUFJLFVBQVUsTUFBSyxPQUFuQjtBQUNBLDRCQUFRLE9BQVIsQ0FBZ0IsT0FBaEIsR0FBMEIsT0FBMUI7O0FBRUEsd0JBQUksaUJBQWlCLFFBQVEsVUFBUixDQUFtQixJQUFuQixDQUF3QixnQkFBUTtBQUNqRCwrQkFBTyxLQUFLLE9BQUwsS0FBaUIsT0FBeEI7QUFDSCxxQkFGb0IsQ0FBckI7O0FBSUEsNEJBQVEsT0FBUixDQUFnQixVQUFoQixHQUE2QixjQUE3QjtBQUNBLHdCQUFJLFFBQVEsVUFBUixJQUFzQixRQUExQixFQUFvQyxRQUFRLFdBQVIsQ0FBb0IsRUFBcEIsRUFBd0IsSUFBeEI7QUFDdkMsaUJBcEJFO0FBcUJILHVCQUFPLGVBQUMsQ0FBRCxFQUFJLEVBQUosRUFBVztBQUNkO0FBQ0Esd0JBQUksTUFBSyxPQUFMLENBQWEsUUFBYixJQUF5QixNQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLGFBQWxELEVBQWlFO0FBQzdELDBCQUFFLGNBQUY7QUFDQSwwQkFBRSxlQUFGO0FBQ0EsbUNBQVcsWUFBTTtBQUNiLGtDQUFLLE9BQUwsQ0FBYSxpQkFBYixDQUErQixNQUFLLE9BQUwsQ0FBYSxZQUE1QyxFQUEwRCxDQUExRDtBQUNBLGtDQUFLLE9BQUwsQ0FBYSxRQUFiO0FBQ0gseUJBSEQsRUFHRyxDQUhIO0FBSUg7QUFDSixpQkEvQkU7QUFnQ0gsdUJBQU8sZUFBQyxDQUFELEVBQUksRUFBSixFQUFXO0FBQ2Qsd0JBQUksTUFBSyxPQUFMLENBQWEsUUFBakIsRUFBMkI7QUFDdkIsNEJBQUksTUFBSyxPQUFMLENBQWEsZUFBakIsRUFBa0M7QUFDOUIsa0NBQUssU0FBTCxHQUFpQixLQUFqQixDQUF1QixDQUF2QixFQUEwQixFQUExQjtBQUNIO0FBQ0o7QUFDSixpQkF0Q0U7QUF1Q0gsd0JBQVEsZ0JBQUMsQ0FBRCxFQUFJLEVBQUosRUFBVztBQUNmLHdCQUFJLE1BQUssT0FBTCxDQUFhLFFBQWpCLEVBQTJCO0FBQ3ZCLDBCQUFFLGNBQUY7QUFDQSwwQkFBRSxlQUFGO0FBQ0EsOEJBQUssT0FBTCxDQUFhLFFBQWIsR0FBd0IsS0FBeEI7QUFDQSw4QkFBSyxPQUFMLENBQWEsUUFBYjtBQUNIO0FBQ0osaUJBOUNFO0FBK0NILHFCQUFLLGFBQUMsQ0FBRCxFQUFJLEVBQUosRUFBVztBQUNaO0FBQ0EsMEJBQUssU0FBTCxHQUFpQixLQUFqQixDQUF1QixDQUF2QixFQUEwQixFQUExQjtBQUNILGlCQWxERTtBQW1ESCx1QkFBTyxlQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsTUFBUixFQUFtQjtBQUN0Qix3QkFBSSxNQUFLLE9BQUwsQ0FBYSxRQUFqQixFQUEyQjtBQUN2Qiw0QkFBSSxNQUFLLE9BQUwsQ0FBYSxpQkFBakIsRUFBb0M7QUFDaEMsa0NBQUssU0FBTCxHQUFpQixLQUFqQixDQUF1QixDQUF2QixFQUEwQixFQUExQjtBQUNILHlCQUZELE1BRU8sSUFBSSxDQUFDLE1BQUssT0FBTCxDQUFhLFdBQWxCLEVBQStCO0FBQ2xDLDhCQUFFLGVBQUY7QUFDQSx1Q0FBVyxZQUFNO0FBQ2Isc0NBQUssT0FBTCxDQUFhLFFBQWI7QUFDQSxzQ0FBSyxPQUFMLENBQWEsUUFBYixHQUF3QixLQUF4QjtBQUNILDZCQUhELEVBR0csQ0FISDtBQUlIO0FBQ0o7QUFDRCx3QkFBTSxPQUFPLE1BQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsZ0NBQW5CLEdBQXNELElBQXRELEVBQWI7QUFDQSx3QkFBSSxLQUFLLFdBQUwsQ0FBaUIsTUFBSyxPQUFMLENBQWEsT0FBYixDQUFxQixPQUF0QyxNQUFtRCxLQUFLLE1BQUwsR0FBYyxDQUFyRSxFQUF3RTtBQUNwRSwwQkFBRSxlQUFGO0FBQ0EsbUNBQVcsWUFBTTtBQUNiLGtDQUFLLE9BQUwsQ0FBYSxRQUFiO0FBQ0Esa0NBQUssT0FBTCxDQUFhLFFBQWIsR0FBd0IsS0FBeEI7QUFDSCx5QkFIRCxFQUdHLENBSEg7QUFJSDtBQUNKLGlCQXZFRTtBQXdFSCxvQkFBSSxZQUFDLENBQUQsRUFBSSxFQUFKLEVBQVc7QUFDWDtBQUNBLHdCQUFJLE1BQUssT0FBTCxDQUFhLFFBQWIsSUFBeUIsTUFBSyxPQUFMLENBQWEsT0FBYixDQUFxQixhQUFsRCxFQUFpRTtBQUM3RCwwQkFBRSxjQUFGO0FBQ0EsMEJBQUUsZUFBRjtBQUNBLDRCQUFJLFFBQVEsTUFBSyxPQUFMLENBQWEsT0FBYixDQUFxQixhQUFyQixDQUFtQyxNQUEvQztBQUFBLDRCQUNJLFdBQVcsTUFBSyxPQUFMLENBQWEsWUFENUI7O0FBR0EsNEJBQUksUUFBUSxRQUFSLElBQW9CLFdBQVcsQ0FBbkMsRUFBc0M7QUFDbEMsa0NBQUssT0FBTCxDQUFhLFlBQWI7QUFDQSxrQ0FBSyxXQUFMO0FBQ0gseUJBSEQsTUFHTyxJQUFJLGFBQWEsQ0FBakIsRUFBb0I7QUFDekIsa0NBQUssT0FBTCxDQUFhLFlBQWIsR0FBNEIsUUFBUSxDQUFwQztBQUNBLGtDQUFLLFdBQUw7QUFDQSxrQ0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixhQUFsQixDQUFnQyxJQUFoQyxFQUFzQyxTQUF0QyxHQUFrRCxNQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLGFBQWxCLENBQWdDLElBQWhDLEVBQXNDLFlBQXhGO0FBQ0Q7QUFDSjtBQUNKLGlCQXpGRTtBQTBGSCxzQkFBTSxjQUFDLENBQUQsRUFBSSxFQUFKLEVBQVc7QUFDYjtBQUNBLHdCQUFJLE1BQUssT0FBTCxDQUFhLFFBQWIsSUFBeUIsTUFBSyxPQUFMLENBQWEsT0FBYixDQUFxQixhQUFsRCxFQUFpRTtBQUM3RCwwQkFBRSxjQUFGO0FBQ0EsMEJBQUUsZUFBRjtBQUNBLDRCQUFJLFFBQVEsTUFBSyxPQUFMLENBQWEsT0FBYixDQUFxQixhQUFyQixDQUFtQyxNQUFuQyxHQUE0QyxDQUF4RDtBQUFBLDRCQUNJLFdBQVcsTUFBSyxPQUFMLENBQWEsWUFENUI7O0FBR0EsNEJBQUksUUFBUSxRQUFaLEVBQXNCO0FBQ2xCLGtDQUFLLE9BQUwsQ0FBYSxZQUFiO0FBQ0Esa0NBQUssV0FBTDtBQUNILHlCQUhELE1BR08sSUFBSSxVQUFVLFFBQWQsRUFBd0I7QUFDM0Isa0NBQUssT0FBTCxDQUFhLFlBQWIsR0FBNEIsQ0FBNUI7QUFDQSxrQ0FBSyxXQUFMO0FBQ0Esa0NBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsYUFBbEIsQ0FBZ0MsSUFBaEMsRUFBc0MsU0FBdEMsR0FBa0QsQ0FBbEQ7QUFDSDtBQUNKO0FBQ0osaUJBM0dFO0FBNEdILHdCQUFRLGlCQUFDLENBQUQsRUFBSSxFQUFKLEVBQVc7QUFDZix3QkFBSSxNQUFLLE9BQUwsQ0FBYSxRQUFiLElBQXlCLE1BQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsV0FBckIsQ0FBaUMsTUFBakMsR0FBMEMsQ0FBdkUsRUFBMEU7QUFDdEUsOEJBQUssT0FBTCxDQUFhLFFBQWI7QUFDSCxxQkFGRCxNQUVPLElBQUksTUFBSyxPQUFMLENBQWEsUUFBakIsRUFBMkI7QUFDOUIsOEJBQUssT0FBTCxDQUFhLFdBQWIsQ0FBeUIsRUFBekI7QUFDSCxxQkFGTSxNQUVBLElBQUksQ0FBQyxNQUFLLE9BQUwsQ0FBYSxRQUFsQixFQUE0QjtBQUMvQiw0QkFBTSxPQUFPLE1BQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsZ0NBQW5CLEVBQWI7QUFDQSw0QkFBTSxRQUFRLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZDtBQUNBLDRCQUFJLE1BQU0sTUFBTSxNQUFOLEdBQWUsQ0FBckIsRUFBd0IsS0FBeEIsQ0FBOEIsR0FBOUIsRUFBbUMsTUFBbkMsR0FBNEMsQ0FBNUMsR0FBZ0QsQ0FBcEQsRUFBdUQ7QUFDbkQ7QUFDSDtBQUNELDRCQUFJLE1BQU0sTUFBTSxNQUFOLEdBQWUsQ0FBckIsRUFBd0IsSUFBeEIsR0FBK0IsQ0FBL0IsTUFBc0MsR0FBMUMsRUFBK0M7QUFDM0M7QUFDSDtBQUNELDhCQUFLLE9BQUwsQ0FBYSxVQUFiLEdBQTBCLElBQTFCO0FBQ0EsOEJBQUssU0FBTCxHQUFpQixXQUFqQixDQUE2QixDQUE3QixFQUFnQyxFQUFoQyxFQUFxQyxNQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLE9BQXJCLElBQWdDLEdBQXJFLEVBQTJFLElBQTNFO0FBQ0g7QUFDSjtBQTdIRSxhQUFQO0FBK0hIOzs7b0NBRVcsSyxFQUFPO0FBQ2YsZ0JBQUksTUFBTSxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLGdCQUFsQixDQUFtQyxJQUFuQyxDQUFWO0FBQUEsZ0JBQ0ksU0FBUyxJQUFJLE1BQUosS0FBZSxDQUQ1Qjs7QUFHQSxnQkFBSSxLQUFKLEVBQVcsS0FBSyxPQUFMLENBQWEsWUFBYixHQUE0QixTQUFTLEtBQVQsQ0FBNUI7O0FBRVgsaUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxNQUFwQixFQUE0QixHQUE1QixFQUFpQztBQUM3QixvQkFBSSxLQUFLLElBQUksQ0FBSixDQUFUO0FBQ0Esb0JBQUksTUFBTSxLQUFLLE9BQUwsQ0FBYSxZQUF2QixFQUFxQztBQUNqQyx1QkFBRyxTQUFILENBQWEsR0FBYixDQUFpQixLQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLFVBQXJCLENBQWdDLFdBQWpEOztBQUVBLHdCQUFJLGVBQWUsR0FBRyxxQkFBSCxFQUFuQjtBQUNBLHdCQUFJLGlCQUFpQixLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLGFBQWxCLENBQWdDLElBQWhDLEVBQXNDLHFCQUF0QyxFQUFyQjs7QUFFQSx3QkFBSSxhQUFhLE1BQWIsR0FBc0IsZUFBZSxNQUF6QyxFQUFpRDtBQUM3Qyw0QkFBSSxpQkFBaUIsYUFBYSxNQUFiLEdBQXNCLGVBQWUsTUFBMUQ7QUFDQSw2QkFBSyxPQUFMLENBQWEsSUFBYixDQUFrQixhQUFsQixDQUFnQyxJQUFoQyxFQUFzQyxTQUF0QyxJQUFtRCxjQUFuRDtBQUNILHFCQUhELE1BR08sSUFBSSxhQUFhLEdBQWIsR0FBbUIsZUFBZSxHQUF0QyxFQUEyQztBQUM5Qyw0QkFBSSxrQkFBaUIsZUFBZSxHQUFmLEdBQXFCLGFBQWEsR0FBdkQ7QUFDQSw2QkFBSyxPQUFMLENBQWEsSUFBYixDQUFrQixhQUFsQixDQUFnQyxJQUFoQyxFQUFzQyxTQUF0QyxJQUFtRCxlQUFuRDtBQUNIO0FBRUosaUJBZEQsTUFjTztBQUNILHVCQUFHLFNBQUgsQ0FBYSxNQUFiLENBQW9CLEtBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsVUFBckIsQ0FBZ0MsV0FBcEQ7QUFDSDtBQUNKO0FBQ0o7OztzQ0FFYSxJLEVBQU0sYSxFQUFlO0FBQ2pDLGdCQUFJLFNBQVMsS0FBSyxxQkFBTCxHQUE2QixNQUExQzs7QUFFQSxnQkFBSSxhQUFKLEVBQW1CO0FBQ2pCLG9CQUFJLFFBQVEsS0FBSyxZQUFMLElBQXFCLE9BQU8sZ0JBQVAsQ0FBd0IsSUFBeEIsQ0FBakM7QUFDQSx1QkFBTyxTQUFTLFdBQVcsTUFBTSxTQUFqQixDQUFULEdBQXVDLFdBQVcsTUFBTSxZQUFqQixDQUE5QztBQUNEOztBQUVELG1CQUFPLE1BQVA7QUFDRDs7OytCQS9YYTtBQUNWLG1CQUFPLENBQUM7QUFDSixxQkFBSyxDQUREO0FBRUosdUJBQU87QUFGSCxhQUFELEVBR0o7QUFDQyxxQkFBSyxDQUROO0FBRUMsdUJBQU87QUFGUixhQUhJLEVBTUo7QUFDQyxxQkFBSyxFQUROO0FBRUMsdUJBQU87QUFGUixhQU5JLEVBU0o7QUFDQyxxQkFBSyxFQUROO0FBRUMsdUJBQU87QUFGUixhQVRJLEVBWUo7QUFDQyxxQkFBSyxFQUROO0FBRUMsdUJBQU87QUFGUixhQVpJLEVBZUo7QUFDQyxxQkFBSyxFQUROO0FBRUMsdUJBQU87QUFGUixhQWZJLEVBa0JKO0FBQ0MscUJBQUssRUFETjtBQUVDLHVCQUFPO0FBRlIsYUFsQkksRUFxQko7QUFDQyxxQkFBSyxHQUROO0FBRUMsdUJBQU87QUFGUixhQXJCSSxDQUFQO0FBeUJIOzs7K0JBRWEsSSxFQUFNO0FBQ2hCLGdCQUFJLFFBQVEsS0FBSyxNQUFqQixFQUF5QjtBQUNyQixxQkFBSyxNQUFMO0FBQ0E7QUFDSDtBQUNELGdCQUFJLFFBQVEsQ0FBQyxLQUFLLE1BQWxCLEVBQTBCO0FBQ3RCLHFCQUFLLFVBQUwsQ0FBZ0IsV0FBaEIsQ0FBNEIsSUFBNUI7QUFDSDtBQUNKOzs7Ozs7a0JBOFZVLGE7Ozs7Ozs7Ozs7Ozs7O0lDeFlULGlCO0FBQ0YsK0JBQVksT0FBWixFQUFxQjtBQUFBOztBQUNqQixhQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsYUFBSyxPQUFMLENBQWEsVUFBYixHQUEwQixJQUExQjtBQUNBLGFBQUssSUFBTCxHQUFZLEtBQUssT0FBTCxDQUFhLElBQXpCO0FBQ0g7Ozs7NkJBRUksSSxFQUFNO0FBQUE7O0FBQ1AsaUJBQUssY0FBTCxHQUFzQixLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLEtBQXBCLENBQTBCLElBQTFCLENBQStCLElBQS9CLEVBQXFDLElBQXJDLENBQXRCO0FBQ0EsaUJBQUssd0JBQUwsR0FBZ0MsS0FBSyxRQUFMLENBQWMsWUFBTTtBQUNoRCxvQkFBSSxNQUFLLE9BQUwsQ0FBYSxRQUFqQixFQUEyQjtBQUN2QiwwQkFBSyxPQUFMLENBQWEsV0FBYixDQUF5QixNQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLE9BQTlDLEVBQXVELEtBQXZEO0FBQ0g7QUFDSixhQUorQixFQUk3QixHQUo2QixFQUl4QixLQUp3QixDQUFoQztBQUtBLGlCQUFLLGlCQUFMLEdBQXlCLEtBQUssUUFBTCxDQUFjLFlBQU07QUFDekMsb0JBQUksTUFBSyxPQUFMLENBQWEsUUFBakIsRUFBMkI7QUFDdkIsMEJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsbUJBQW5CLENBQXVDLElBQXZDO0FBQ0g7QUFDSixhQUp3QixFQUl0QixHQUpzQixFQUlqQixLQUppQixDQUF6Qjs7QUFNQTtBQUNBLGlCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLFdBQW5CLEdBQWlDLGdCQUFqQyxDQUFrRCxlQUFsRCxFQUNJLEtBQUssY0FEVCxFQUN5QixLQUR6QjtBQUVBLGlCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLFdBQW5CLEdBQWlDLGdCQUFqQyxDQUFrRCxXQUFsRCxFQUNJLEtBQUssY0FEVCxFQUN5QixLQUR6QjtBQUVBLG1CQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLEtBQUssaUJBQXZDOztBQUVBLGdCQUFJLEtBQUssYUFBVCxFQUF3QjtBQUNwQixxQkFBSyxhQUFMLENBQW1CLGdCQUFuQixDQUFvQyxRQUFwQyxFQUE4QyxLQUFLLHdCQUFuRCxFQUE2RSxLQUE3RTtBQUNILGFBRkQsTUFFTztBQUNILHVCQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLEtBQUssd0JBQXZDO0FBQ0g7QUFFSjs7OytCQUVNLEksRUFBTTtBQUNULGlCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLFdBQW5CLEdBQWlDLG1CQUFqQyxDQUFxRCxXQUFyRCxFQUNJLEtBQUssY0FEVCxFQUN5QixLQUR6QjtBQUVBLGlCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLFdBQW5CLEdBQWlDLG1CQUFqQyxDQUFxRCxlQUFyRCxFQUNJLEtBQUssY0FEVCxFQUN5QixLQUR6QjtBQUVBLG1CQUFPLG1CQUFQLENBQTJCLFFBQTNCLEVBQXFDLEtBQUssaUJBQTFDOztBQUVBLGdCQUFJLEtBQUssYUFBVCxFQUF3QjtBQUNwQixxQkFBSyxhQUFMLENBQW1CLG1CQUFuQixDQUF1QyxRQUF2QyxFQUFpRCxLQUFLLHdCQUF0RCxFQUFnRixLQUFoRjtBQUNILGFBRkQsTUFFTztBQUNILHVCQUFPLG1CQUFQLENBQTJCLFFBQTNCLEVBQXFDLEtBQUssd0JBQTFDO0FBQ0g7QUFDSjs7O2lDQUVRLEksRUFBTSxJLEVBQU0sUyxFQUFXO0FBQUE7QUFBQTs7QUFDNUIsZ0JBQUksT0FBSjtBQUNBLG1CQUFPLFlBQU07QUFDVCxvQkFBSSxVQUFVLE1BQWQ7QUFBQSxvQkFDSSxPQUFPLFVBRFg7QUFFQSxvQkFBSSxRQUFRLFNBQVIsS0FBUSxHQUFNO0FBQ2QsOEJBQVUsSUFBVjtBQUNBLHdCQUFJLENBQUMsU0FBTCxFQUFnQixLQUFLLEtBQUwsQ0FBVyxPQUFYLEVBQW9CLElBQXBCO0FBQ25CLGlCQUhEO0FBSUEsb0JBQUksVUFBVSxhQUFhLENBQUMsT0FBNUI7QUFDQSw2QkFBYSxPQUFiO0FBQ0EsMEJBQVUsV0FBVyxLQUFYLEVBQWtCLElBQWxCLENBQVY7QUFDQSxvQkFBSSxPQUFKLEVBQWEsS0FBSyxLQUFMLENBQVcsT0FBWCxFQUFvQixJQUFwQjtBQUNoQixhQVhEO0FBWUg7Ozs7OztrQkFJVSxpQjs7Ozs7Ozs7Ozs7Ozs7QUNuRWY7SUFDTSxZO0FBQ0YsMEJBQVksT0FBWixFQUFxQjtBQUFBOztBQUNqQixhQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsYUFBSyxPQUFMLENBQWEsS0FBYixHQUFxQixJQUFyQjtBQUNIOzs7O3NDQUVhO0FBQ1YsZ0JBQUksZUFBSjtBQUNBLGdCQUFJLEtBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsVUFBekIsRUFBcUM7QUFDakMseUJBQVMsS0FBSyxPQUFMLENBQWEsT0FBYixDQUFxQixVQUFyQixDQUFnQyxNQUF6QztBQUNIOztBQUVELGdCQUFJLENBQUMsTUFBTCxFQUFhO0FBQ1QsdUJBQU8sUUFBUDtBQUNIOztBQUVELG1CQUFPLE9BQU8sYUFBUCxDQUFxQixRQUE1QjtBQUNIOzs7NENBRW1CLFEsRUFBVTtBQUFBOztBQUMxQixnQkFBSSxVQUFVLEtBQUssT0FBTCxDQUFhLE9BQTNCO0FBQUEsZ0JBQ0ksb0JBREo7O0FBR0EsZ0JBQUksT0FBTyxLQUFLLGNBQUwsQ0FBb0IsS0FBcEIsRUFBMkIsS0FBSyxPQUFMLENBQWEsZ0JBQXhDLEVBQTBELElBQTFELEVBQWdFLEtBQUssT0FBTCxDQUFhLFdBQTdFLEVBQTBGLEtBQUssT0FBTCxDQUFhLGdCQUF2RyxDQUFYOztBQUVBLGdCQUFJLE9BQU8sSUFBUCxLQUFnQixXQUFwQixFQUFpQzs7QUFFN0Isb0JBQUcsQ0FBQyxLQUFLLE9BQUwsQ0FBYSxZQUFqQixFQUE4QjtBQUMxQix5QkFBSyxPQUFMLENBQWEsSUFBYixDQUFrQixLQUFsQixDQUF3QixPQUF4QjtBQUNBO0FBQ0g7O0FBRUQsb0JBQUksQ0FBQyxLQUFLLGlCQUFMLENBQXVCLFFBQVEsT0FBL0IsQ0FBTCxFQUE4QztBQUMxQyxrQ0FBYyxLQUFLLG1DQUFMLENBQXlDLEtBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsT0FBOUQsRUFDVixLQUFLLGVBREssQ0FBZDtBQUVILGlCQUhELE1BSUs7QUFDRCxrQ0FBYyxLQUFLLCtCQUFMLENBQXFDLEtBQUssZUFBMUMsQ0FBZDtBQUNIOztBQUdELHFCQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLEtBQWxCLENBQXdCLE9BQXhCLGFBQTBDLFlBQVksR0FBdEQsd0RBQ2lDLFlBQVksSUFEN0MseURBRWtDLFlBQVksS0FGOUMsMERBR21DLFlBQVksTUFIL0M7O0FBUUEsb0JBQUksWUFBWSxJQUFaLEtBQXFCLE1BQXpCLEVBQWlDO0FBQzdCLHlCQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLEtBQWxCLENBQXdCLElBQXhCLEdBQStCLE1BQS9CO0FBQ0g7O0FBRUQsb0JBQUksWUFBWSxHQUFaLEtBQW9CLE1BQXhCLEVBQWdDO0FBQzVCLHlCQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLEtBQWxCLENBQXdCLEdBQXhCLEdBQThCLE1BQTlCO0FBQ0g7O0FBRUQsb0JBQUksUUFBSixFQUFjLEtBQUssY0FBTDs7QUFFZCx1QkFBTyxVQUFQLENBQWtCLFlBQU07QUFDcEIsd0JBQUksaUJBQWlCO0FBQ2xCLCtCQUFPLE1BQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsV0FEUDtBQUVsQixnQ0FBUSxNQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCO0FBRlIscUJBQXJCO0FBSUEsd0JBQUksa0JBQWtCLE1BQUssZUFBTCxDQUFxQixXQUFyQixFQUFrQyxjQUFsQyxDQUF0Qjs7QUFFQSx3QkFBSSw4QkFBOEIsT0FBTyxVQUFQLEdBQW9CLGVBQWUsS0FBbkMsS0FBNkMsZ0JBQWdCLElBQWhCLElBQXdCLGdCQUFnQixLQUFyRixDQUFsQztBQUNBLHdCQUFJLDRCQUE0QixPQUFPLFdBQVAsR0FBcUIsZUFBZSxNQUFwQyxLQUErQyxnQkFBZ0IsR0FBaEIsSUFBdUIsZ0JBQWdCLE1BQXRGLENBQWhDO0FBQ0Esd0JBQUksK0JBQStCLHlCQUFuQyxFQUE4RDtBQUMxRCw4QkFBSyxPQUFMLENBQWEsSUFBYixDQUFrQixLQUFsQixDQUF3QixPQUF4QixHQUFrQyxlQUFsQztBQUNBLDhCQUFLLG1CQUFMLENBQXlCLFFBQXpCO0FBQ0g7QUFDSixpQkFiRCxFQWFHLENBYkg7QUFlSCxhQWpERCxNQWlETztBQUNILHFCQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLEtBQWxCLENBQXdCLE9BQXhCLEdBQWtDLGVBQWxDO0FBQ0g7QUFDSjs7O3NDQUVhLGEsRUFBZSxJLEVBQU0sTSxFQUFRO0FBQ3ZDLGdCQUFJLGNBQUo7QUFDQSxnQkFBSSxPQUFPLGFBQVg7O0FBRUEsZ0JBQUksSUFBSixFQUFVO0FBQ04scUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLE1BQXpCLEVBQWlDLEdBQWpDLEVBQXNDO0FBQ2xDLDJCQUFPLEtBQUssVUFBTCxDQUFnQixLQUFLLENBQUwsQ0FBaEIsQ0FBUDtBQUNBLHdCQUFJLFNBQVMsU0FBYixFQUF3QjtBQUNwQjtBQUNIO0FBQ0QsMkJBQU8sS0FBSyxNQUFMLEdBQWMsTUFBckIsRUFBNkI7QUFDekIsa0NBQVUsS0FBSyxNQUFmO0FBQ0EsK0JBQU8sS0FBSyxXQUFaO0FBQ0g7QUFDRCx3QkFBSSxLQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsS0FBMkIsQ0FBM0IsSUFBZ0MsQ0FBQyxLQUFLLE1BQTFDLEVBQWtEO0FBQzlDLCtCQUFPLEtBQUssZUFBWjtBQUNIO0FBQ0o7QUFDSjtBQUNELGdCQUFJLE1BQU0sS0FBSyxrQkFBTCxFQUFWOztBQUVBLG9CQUFRLEtBQUssV0FBTCxHQUFtQixXQUFuQixFQUFSO0FBQ0Esa0JBQU0sUUFBTixDQUFlLElBQWYsRUFBcUIsTUFBckI7QUFDQSxrQkFBTSxNQUFOLENBQWEsSUFBYixFQUFtQixNQUFuQjtBQUNBLGtCQUFNLFFBQU4sQ0FBZSxJQUFmOztBQUVBLGdCQUFJO0FBQ0Esb0JBQUksZUFBSjtBQUNILGFBRkQsQ0FFRSxPQUFPLEtBQVAsRUFBYyxDQUFFOztBQUVsQixnQkFBSSxRQUFKLENBQWEsS0FBYjtBQUNBLDBCQUFjLEtBQWQ7QUFDSDs7OzJDQUVrQixJLEVBQU0sbUIsRUFBcUIsZ0IsRUFBa0IsYSxFQUFlLEksRUFBTTtBQUNqRixnQkFBSSxPQUFPLEtBQUssY0FBTCxDQUFvQixJQUFwQixFQUEwQixnQkFBMUIsRUFBNEMsbUJBQTVDLEVBQWlFLEtBQUssT0FBTCxDQUFhLFdBQTlFLEVBQTJGLEtBQUssT0FBTCxDQUFhLGdCQUF4RyxDQUFYOztBQUVBLGdCQUFJLFNBQVMsU0FBYixFQUF3QjtBQUNwQixvQkFBSSxVQUFVLEtBQUssT0FBTCxDQUFhLE9BQTNCO0FBQ0Esb0JBQUksZUFBZSxJQUFJLFdBQUosQ0FBZ0Isa0JBQWhCLEVBQW9DO0FBQ25ELDRCQUFRO0FBQ0osOEJBQU0sSUFERjtBQUVKLGtDQUFVLE9BRk47QUFHSixpQ0FBUyxJQUhMO0FBSUosK0JBQU87QUFKSDtBQUQyQyxpQkFBcEMsQ0FBbkI7O0FBU0Esb0JBQUksQ0FBQyxLQUFLLGlCQUFMLENBQXVCLFFBQVEsT0FBL0IsQ0FBTCxFQUE4QztBQUMxQyx3QkFBSSxVQUFVLEtBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsT0FBbkM7QUFDQSx3QkFBSSxhQUFhLE9BQU8sS0FBSyxPQUFMLENBQWEsaUJBQXBCLElBQXlDLFFBQXpDLEdBQ1gsS0FBSyxPQUFMLENBQWEsaUJBREYsR0FFWCxHQUZOO0FBR0EsNEJBQVEsVUFBUjtBQUNBLHdCQUFJLFdBQVcsS0FBSyxlQUFwQjtBQUNBLHdCQUFJLFNBQVMsS0FBSyxlQUFMLEdBQXVCLEtBQUssV0FBTCxDQUFpQixNQUF4QyxHQUFpRCxXQUFXLE1BQXpFO0FBQ0EsNEJBQVEsS0FBUixHQUFnQixRQUFRLEtBQVIsQ0FBYyxTQUFkLENBQXdCLENBQXhCLEVBQTJCLFFBQTNCLElBQXVDLElBQXZDLEdBQ1osUUFBUSxLQUFSLENBQWMsU0FBZCxDQUF3QixNQUF4QixFQUFnQyxRQUFRLEtBQVIsQ0FBYyxNQUE5QyxDQURKO0FBRUEsNEJBQVEsY0FBUixHQUF5QixXQUFXLEtBQUssTUFBekM7QUFDQSw0QkFBUSxZQUFSLEdBQXVCLFdBQVcsS0FBSyxNQUF2QztBQUNILGlCQVpELE1BWU87QUFDSDtBQUNBLHdCQUFJLGNBQWEsT0FBTyxLQUFLLE9BQUwsQ0FBYSxpQkFBcEIsSUFBeUMsUUFBekMsR0FDWCxLQUFLLE9BQUwsQ0FBYSxpQkFERixHQUVYLE1BRk47O0FBSUEsd0JBQUksY0FBYyxPQUFkLEtBQTBCLEdBQTlCLEVBQW1DO0FBQy9CLHNDQUFhLE1BQU0sV0FBbkI7QUFDSDtBQUNELDRCQUFRLFdBQVI7QUFDQSx5QkFBSyxTQUFMLENBQWUsSUFBZixFQUFxQixLQUFLLGVBQTFCLEVBQ0ksS0FBSyxlQUFMLEdBQXVCLEtBQUssV0FBTCxDQUFpQixNQUF4QyxHQUFpRCxDQUFDLEtBQUssT0FBTCxDQUFhLGdCQURuRTtBQUVIOztBQUVELHdCQUFRLE9BQVIsQ0FBZ0IsYUFBaEIsQ0FBOEIsWUFBOUI7QUFDSDtBQUNKOzs7a0NBRVMsSSxFQUFNLFEsRUFBVSxNLEVBQVE7QUFDOUIsZ0JBQUksY0FBSjtBQUFBLGdCQUFXLFlBQVg7QUFBQSxnQkFBZ0IsY0FBaEI7QUFDQSxrQkFBTSxLQUFLLGtCQUFMLEVBQU47QUFGOEIsdUJBR08sR0FIUDtBQUFBLGdCQUd0QixZQUhzQixRQUd0QixZQUhzQjtBQUFBLGdCQUdSLFVBSFEsUUFHUixVQUhROztBQUk5QixnQkFBSSxXQUFXLFVBQVgsSUFBeUIsV0FBVyxVQUFYLENBQXNCLFlBQXRCLENBQTdCLEVBQWtFO0FBQzlELG9CQUFNLFFBQVEsV0FBVyxVQUFYLENBQXNCLFlBQXRCLENBQWQ7QUFDQSxvQkFBSSxNQUFNLFFBQU4sS0FBbUIsS0FBSyxTQUE1QixFQUF1QztBQUNuQyw0QkFBUSxLQUFSO0FBQ0gsaUJBRkQsTUFFTyxJQUFJLGVBQWUsQ0FBZixJQUFvQixNQUFNLFFBQU4sS0FBbUIsS0FBSyxZQUFoRCxFQUE4RDtBQUNqRSw0QkFBUSxXQUFXLFVBQVgsQ0FBc0IsZUFBZSxDQUFyQyxDQUFSO0FBQ0g7QUFDSixhQVBELE1BT087QUFDSCx3QkFBUSxJQUFJLFVBQVo7QUFDSDtBQUNELG9CQUFRLEtBQUssV0FBTCxHQUFtQixXQUFuQixFQUFSO0FBQ0Esa0JBQU0sUUFBTixDQUFlLEtBQWYsRUFBc0IsUUFBdEI7QUFDQSxrQkFBTSxNQUFOLENBQWEsS0FBYixFQUFvQixNQUFwQjtBQUNBLGtCQUFNLGNBQU47O0FBRUEsZ0JBQUksS0FBSyxLQUFLLFdBQUwsR0FBbUIsYUFBbkIsQ0FBaUMsS0FBakMsQ0FBVDtBQUNBLGVBQUcsU0FBSCxHQUFlLElBQWY7QUFDQSxnQkFBSSxPQUFPLEtBQUssV0FBTCxHQUFtQixzQkFBbkIsRUFBWDtBQUFBLGdCQUNJLGFBREo7QUFBQSxnQkFDVSxpQkFEVjtBQUVBLG1CQUFRLE9BQU8sR0FBRyxVQUFsQixFQUErQjtBQUMzQiwyQkFBVyxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBWDtBQUNIO0FBQ0Qsa0JBQU0sVUFBTixDQUFpQixJQUFqQjs7QUFFQTtBQUNBLGdCQUFJLFFBQUosRUFBYztBQUNWLHdCQUFRLE1BQU0sVUFBTixFQUFSO0FBQ0Esc0JBQU0sYUFBTixDQUFvQixRQUFwQjtBQUNBLHNCQUFNLFFBQU4sQ0FBZSxJQUFmO0FBQ0Esb0JBQUksZUFBSjtBQUNBLG9CQUFJLFFBQUosQ0FBYSxLQUFiO0FBQ0g7QUFDSjs7OzZDQUVvQjtBQUNqQixnQkFBSSxLQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLE1BQTVCLEVBQW9DO0FBQ2hDLHVCQUFPLEtBQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsTUFBeEIsQ0FBK0IsYUFBL0IsQ0FBNkMsWUFBN0MsRUFBUDtBQUNIOztBQUVELG1CQUFPLE9BQU8sWUFBUCxFQUFQO0FBQ0g7OztnREFFdUIsTyxFQUFTO0FBQzdCLGdCQUFJLFFBQVEsVUFBUixLQUF1QixJQUEzQixFQUFpQztBQUM3Qix1QkFBTyxDQUFQO0FBQ0g7O0FBRUQsaUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxRQUFRLFVBQVIsQ0FBbUIsVUFBbkIsQ0FBOEIsTUFBbEQsRUFBMEQsR0FBMUQsRUFBK0Q7QUFDM0Qsb0JBQUksT0FBTyxRQUFRLFVBQVIsQ0FBbUIsVUFBbkIsQ0FBOEIsQ0FBOUIsQ0FBWDs7QUFFQSxvQkFBSSxTQUFTLE9BQWIsRUFBc0I7QUFDbEIsMkJBQU8sQ0FBUDtBQUNIO0FBQ0o7QUFDSjs7O3VEQUU4QixHLEVBQUs7QUFDaEMsZ0JBQUksTUFBTSxLQUFLLGtCQUFMLEVBQVY7QUFDQSxnQkFBSSxXQUFXLElBQUksVUFBbkI7QUFDQSxnQkFBSSxPQUFPLEVBQVg7QUFDQSxnQkFBSSxlQUFKOztBQUVBLGdCQUFJLFlBQVksSUFBaEIsRUFBc0I7QUFDbEIsb0JBQUksVUFBSjtBQUNBLG9CQUFJLEtBQUssU0FBUyxlQUFsQjtBQUNBLHVCQUFPLGFBQWEsSUFBYixJQUFxQixPQUFPLE1BQW5DLEVBQTJDO0FBQ3ZDLHdCQUFJLEtBQUssdUJBQUwsQ0FBNkIsUUFBN0IsQ0FBSjtBQUNBLHlCQUFLLElBQUwsQ0FBVSxDQUFWO0FBQ0EsK0JBQVcsU0FBUyxVQUFwQjtBQUNBLHdCQUFJLGFBQWEsSUFBakIsRUFBdUI7QUFDbkIsNkJBQUssU0FBUyxlQUFkO0FBQ0g7QUFDSjtBQUNELHFCQUFLLE9BQUw7O0FBRUE7QUFDQSx5QkFBUyxJQUFJLFVBQUosQ0FBZSxDQUFmLEVBQWtCLFdBQTNCOztBQUVBLHVCQUFPO0FBQ0gsOEJBQVUsUUFEUDtBQUVILDBCQUFNLElBRkg7QUFHSCw0QkFBUTtBQUhMLGlCQUFQO0FBS0g7QUFDSjs7OzJEQUVrQztBQUMvQixnQkFBSSxVQUFVLEtBQUssT0FBTCxDQUFhLE9BQTNCO0FBQUEsZ0JBQ0ksT0FBTyxFQURYOztBQUdBLGdCQUFJLENBQUMsS0FBSyxpQkFBTCxDQUF1QixRQUFRLE9BQS9CLENBQUwsRUFBOEM7QUFDMUMsb0JBQUksZ0JBQWdCLEtBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsT0FBekM7QUFDQSxvQkFBSSxhQUFKLEVBQW1CO0FBQ2Ysd0JBQUksV0FBVyxjQUFjLGNBQTdCO0FBQ0Esd0JBQUksY0FBYyxLQUFkLElBQXVCLFlBQVksQ0FBdkMsRUFBMEM7QUFDdEMsK0JBQU8sY0FBYyxLQUFkLENBQW9CLFNBQXBCLENBQThCLENBQTlCLEVBQWlDLFFBQWpDLENBQVA7QUFDSDtBQUNKO0FBRUosYUFURCxNQVNPO0FBQ0gsb0JBQUksZUFBZSxLQUFLLGtCQUFMLEdBQTBCLFVBQTdDOztBQUVBLG9CQUFJLGdCQUFnQixJQUFwQixFQUEwQjtBQUN0Qix3QkFBTSxlQUFlLEtBQUssa0JBQUwsR0FBMEIsWUFBL0M7QUFDQSx3QkFBSSxhQUFhLFVBQWIsSUFBMkIsYUFBYSxVQUFiLENBQXdCLFlBQXhCLENBQS9CLEVBQXNFO0FBQ2xFLDRCQUFNLFFBQVEsYUFBYSxVQUFiLENBQXdCLFlBQXhCLENBQWQ7QUFDQSw0QkFBSSxNQUFNLFFBQU4sS0FBbUIsS0FBSyxTQUE1QixFQUF1QztBQUNuQyxtQ0FBTyxNQUFNLFdBQWI7QUFDSCx5QkFGRCxNQUVPLElBQUksZUFBZSxDQUFmLElBQW9CLE1BQU0sUUFBTixLQUFtQixLQUFLLFlBQWhELEVBQThEO0FBQ2pFLG9DQUFRLGFBQWEsVUFBYixDQUF3QixlQUFlLENBQXZDLEVBQTBDLFdBQWxEO0FBQ0g7QUFDSixxQkFQRCxNQU9PO0FBQ0gsNEJBQUkscUJBQXFCLGFBQWEsV0FBdEM7QUFDQSw0QkFBSSxvQkFBb0IsS0FBSyxrQkFBTCxHQUEwQixVQUExQixDQUFxQyxDQUFyQyxFQUF3QyxXQUFoRTs7QUFFQSw0QkFBSSxzQkFBc0IscUJBQXFCLENBQS9DLEVBQWtEO0FBQzlDLG1DQUFPLG1CQUFtQixTQUFuQixDQUE2QixDQUE3QixFQUFnQyxpQkFBaEMsQ0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNKO0FBQ0QsbUJBQU8sSUFBUDtBQUNIOzs7MENBRWlCLEksRUFBTTtBQUNwQixtQkFBTyxLQUFLLE9BQUwsQ0FBYSxTQUFiLEVBQXdCLEdBQXhCLENBQVAsQ0FEb0IsQ0FDaUI7QUFDckMsZ0JBQUksYUFBYSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWpCO0FBQ0EsZ0JBQUksY0FBYyxXQUFXLE1BQVgsR0FBb0IsQ0FBdEM7QUFDQSxtQkFBTyxXQUFXLFdBQVgsRUFBd0IsSUFBeEIsRUFBUDtBQUNIOzs7dUNBRWMsaUIsRUFBbUIsZ0IsRUFBa0IsbUIsRUFBcUIsVyxFQUFhLGMsRUFBZ0I7QUFBQTs7QUFDbEcsZ0JBQUksTUFBTSxLQUFLLE9BQUwsQ0FBYSxPQUF2QjtBQUNBLGdCQUFJLGlCQUFKO0FBQUEsZ0JBQWMsYUFBZDtBQUFBLGdCQUFvQixlQUFwQjs7QUFFQSxnQkFBSSxDQUFDLEtBQUssaUJBQUwsQ0FBdUIsSUFBSSxPQUEzQixDQUFMLEVBQTBDO0FBQ3RDLDJCQUFXLEtBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsT0FBaEM7QUFDSCxhQUZELE1BRU87QUFDSCxvQkFBSSxnQkFBZ0IsS0FBSyw4QkFBTCxDQUFvQyxHQUFwQyxDQUFwQjs7QUFFQSxvQkFBSSxhQUFKLEVBQW1CO0FBQ2YsK0JBQVcsY0FBYyxRQUF6QjtBQUNBLDJCQUFPLGNBQWMsSUFBckI7QUFDQSw2QkFBUyxjQUFjLE1BQXZCO0FBQ0g7QUFDSjs7QUFFRCxnQkFBSSxpQkFBaUIsS0FBSyxnQ0FBTCxFQUFyQjtBQUNBLGdCQUFJLDJCQUEyQixLQUFLLGlCQUFMLENBQXVCLGNBQXZCLENBQS9COztBQUVBLGdCQUFJLGNBQUosRUFBb0I7QUFDaEIsdUJBQU87QUFDSCxxQ0FBaUIsZUFBZSxNQUFmLEdBQXdCLHlCQUF5QixNQUQvRDtBQUVILGlDQUFhLHdCQUZWO0FBR0gsNENBQXdCLFFBSHJCO0FBSUgseUNBQXFCLElBSmxCO0FBS0gsMkNBQXVCO0FBTHBCLGlCQUFQO0FBT0g7O0FBRUQsZ0JBQUksbUJBQW1CLFNBQW5CLElBQWdDLG1CQUFtQixJQUF2RCxFQUE2RDtBQUN6RCxvQkFBSSwyQkFBMkIsQ0FBQyxDQUFoQztBQUNBLG9CQUFJLG9CQUFKOztBQUVBLHFCQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLE9BQXhCLENBQWdDLGtCQUFVO0FBQ3RDLHdCQUFJLElBQUksT0FBTyxPQUFmO0FBQ0Esd0JBQUksTUFBTSxPQUFPLG1CQUFQLEdBQ04sT0FBSyx5QkFBTCxDQUErQixjQUEvQixFQUErQyxDQUEvQyxDQURNLEdBRU4sZUFBZSxXQUFmLENBQTJCLENBQTNCLENBRko7O0FBSUEsd0JBQUksTUFBTSx3QkFBVixFQUFvQztBQUNoQyxtREFBMkIsR0FBM0I7QUFDQSxzQ0FBYyxDQUFkO0FBQ0EsOENBQXNCLE9BQU8sbUJBQTdCO0FBQ0g7QUFDSixpQkFYRDs7QUFhQSxvQkFBSSw0QkFBNEIsQ0FBNUIsS0FFSSw2QkFBNkIsQ0FBN0IsSUFDQSxDQUFDLG1CQURELElBRUEsWUFBWSxJQUFaLENBQ0ksZUFBZSxTQUFmLENBQ0ksMkJBQTJCLENBRC9CLEVBRUksd0JBRkosQ0FESixDQUpKLENBQUosRUFVRTtBQUNFLHdCQUFJLHdCQUF3QixlQUFlLFNBQWYsQ0FBeUIsMkJBQTJCLENBQXBELEVBQ3hCLGVBQWUsTUFEUyxDQUE1Qjs7QUFHQSxrQ0FBYyxlQUFlLFNBQWYsQ0FBeUIsd0JBQXpCLEVBQW1ELDJCQUEyQixDQUE5RSxDQUFkO0FBQ0Esd0JBQUksbUJBQW1CLHNCQUFzQixTQUF0QixDQUFnQyxDQUFoQyxFQUFtQyxDQUFuQyxDQUF2QjtBQUNBLHdCQUFJLGVBQWUsc0JBQXNCLE1BQXRCLEdBQStCLENBQS9CLEtBRVgscUJBQXFCLEdBQXJCLElBQ0EscUJBQXFCLE1BSFYsQ0FBbkI7QUFLQSx3QkFBSSxnQkFBSixFQUFzQjtBQUNsQixnREFBd0Isc0JBQXNCLElBQXRCLEVBQXhCO0FBQ0g7O0FBRUQsd0JBQUksUUFBUSxjQUFjLFNBQWQsR0FBMEIsV0FBdEM7O0FBRUEseUJBQUssT0FBTCxDQUFhLGdCQUFiLEdBQWdDLE1BQU0sSUFBTixDQUFXLHFCQUFYLENBQWhDOztBQUVBLHdCQUFJLENBQUMsWUFBRCxLQUFrQixxQkFBcUIsQ0FBRSxNQUFNLElBQU4sQ0FBVyxxQkFBWCxDQUF6QyxDQUFKLEVBQWtGO0FBQzlFLCtCQUFPO0FBQ0gsNkNBQWlCLHdCQURkO0FBRUgseUNBQWEscUJBRlY7QUFHSCxvREFBd0IsUUFIckI7QUFJSCxpREFBcUIsSUFKbEI7QUFLSCxtREFBdUIsTUFMcEI7QUFNSCxnREFBb0I7QUFOakIseUJBQVA7QUFRSDtBQUNKO0FBQ0o7QUFDSjs7O2tEQUUwQixHLEVBQUssSSxFQUFNO0FBQ2xDLGdCQUFJLGNBQWMsSUFBSSxLQUFKLENBQVUsRUFBVixFQUFjLE9BQWQsR0FBd0IsSUFBeEIsQ0FBNkIsRUFBN0IsQ0FBbEI7QUFDQSxnQkFBSSxRQUFRLENBQUMsQ0FBYjs7QUFFQSxpQkFBSyxJQUFJLE9BQU8sQ0FBWCxFQUFjLE1BQU0sSUFBSSxNQUE3QixFQUFxQyxPQUFPLEdBQTVDLEVBQWlELE1BQWpELEVBQXlEO0FBQ3JELG9CQUFJLFlBQVksU0FBUyxJQUFJLE1BQUosR0FBYSxDQUF0QztBQUNBLG9CQUFJLGVBQWUsS0FBSyxJQUFMLENBQVUsWUFBWSxPQUFPLENBQW5CLENBQVYsQ0FBbkI7QUFDQSxvQkFBSSxRQUFRLFNBQVMsWUFBWSxJQUFaLENBQXJCOztBQUVBLG9CQUFJLFVBQVUsYUFBYSxZQUF2QixDQUFKLEVBQTBDO0FBQ3RDLDRCQUFRLElBQUksTUFBSixHQUFhLENBQWIsR0FBaUIsSUFBekI7QUFDQTtBQUNIO0FBQ0o7O0FBRUQsbUJBQU8sS0FBUDtBQUNIOzs7MENBRWlCLE8sRUFBUztBQUN2QixnQkFBSSxDQUFDLE9BQUwsRUFBYztBQUNWLHVCQUFPLEtBQVA7QUFDSDtBQUNELG1CQUFPLFFBQVEsUUFBUixLQUFxQixPQUFyQixJQUFnQyxRQUFRLFFBQVIsS0FBcUIsVUFBNUQ7QUFDSDs7O3dDQUVlLFcsRUFBYSxjLEVBQWdCO0FBQ3pDLGdCQUFJLGNBQWMsT0FBTyxVQUF6QjtBQUNBLGdCQUFJLGVBQWUsT0FBTyxXQUExQjtBQUNBLGdCQUFJLE1BQU0sU0FBUyxlQUFuQjtBQUNBLGdCQUFJLGFBQWEsQ0FBQyxPQUFPLFdBQVAsSUFBc0IsSUFBSSxVQUEzQixLQUEwQyxJQUFJLFVBQUosSUFBa0IsQ0FBNUQsQ0FBakI7QUFDQSxnQkFBSSxZQUFZLENBQUMsT0FBTyxXQUFQLElBQXNCLElBQUksU0FBM0IsS0FBeUMsSUFBSSxTQUFKLElBQWlCLENBQTFELENBQWhCOztBQUVBLGdCQUFJLFVBQVUsT0FBTyxZQUFZLEdBQW5CLEtBQTJCLFFBQTNCLEdBQXNDLFlBQVksR0FBbEQsR0FBd0QsWUFBWSxZQUFaLEdBQTJCLFlBQVksTUFBdkMsR0FBZ0QsZUFBZSxNQUFySTtBQUNBLGdCQUFJLFlBQVksT0FBTyxZQUFZLEtBQW5CLEtBQTZCLFFBQTdCLEdBQXdDLFlBQVksS0FBcEQsR0FBNEQsWUFBWSxJQUFaLEdBQW1CLGVBQWUsS0FBOUc7QUFDQSxnQkFBSSxhQUFhLE9BQU8sWUFBWSxNQUFuQixLQUE4QixRQUE5QixHQUF5QyxZQUFZLE1BQXJELEdBQThELFlBQVksR0FBWixHQUFrQixlQUFlLE1BQWhIO0FBQ0EsZ0JBQUksV0FBVyxPQUFPLFlBQVksSUFBbkIsS0FBNEIsUUFBNUIsR0FBdUMsWUFBWSxJQUFuRCxHQUEwRCxhQUFhLFdBQWIsR0FBMkIsWUFBWSxLQUF2QyxHQUErQyxlQUFlLEtBQXZJOztBQUVBLG1CQUFPO0FBQ0gscUJBQUssVUFBVSxLQUFLLEtBQUwsQ0FBVyxTQUFYLENBRFo7QUFFSCx1QkFBTyxZQUFZLEtBQUssSUFBTCxDQUFVLGFBQWEsV0FBdkIsQ0FGaEI7QUFHSCx3QkFBUSxhQUFhLEtBQUssSUFBTCxDQUFVLFlBQVksWUFBdEIsQ0FIbEI7QUFJSCxzQkFBTSxXQUFXLEtBQUssS0FBTCxDQUFXLFVBQVg7QUFKZCxhQUFQO0FBTUg7Ozs0Q0FFbUI7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsZ0JBQUksYUFBYTtBQUNiLHVCQUFPLElBRE07QUFFYix3QkFBUTtBQUZLLGFBQWpCOztBQUtBLGlCQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLEtBQWxCLENBQXdCLE9BQXhCO0FBTUQsdUJBQVcsS0FBWCxHQUFtQixLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLFdBQXJDO0FBQ0EsdUJBQVcsTUFBWCxHQUFvQixLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLFlBQXRDOztBQUVBLGlCQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLEtBQWxCLENBQXdCLE9BQXhCOztBQUVBLG1CQUFPLFVBQVA7QUFDRjs7OzREQUVtQyxPLEVBQVMsUSxFQUFVLE8sRUFBUztBQUM1RCxnQkFBSSxhQUFhLENBQUMsV0FBRCxFQUFjLFdBQWQsRUFBMkIsT0FBM0IsRUFBb0MsUUFBcEMsRUFBOEMsV0FBOUMsRUFDYixXQURhLEVBQ0EsZ0JBREEsRUFDa0Isa0JBRGxCLEVBRWIsbUJBRmEsRUFFUSxpQkFGUixFQUUyQixZQUYzQixFQUdiLGNBSGEsRUFHRyxlQUhILEVBR29CLGFBSHBCLEVBSWIsV0FKYSxFQUlBLGFBSkEsRUFJZSxZQUpmLEVBSTZCLGFBSjdCLEVBS2IsVUFMYSxFQUtELGdCQUxDLEVBS2lCLFlBTGpCLEVBSytCLFlBTC9CLEVBTWIsV0FOYSxFQU1BLGVBTkEsRUFNaUIsWUFOakIsRUFPYixnQkFQYSxFQU9LLGVBUEwsRUFPc0IsYUFQdEIsQ0FBakI7O0FBVUEsZ0JBQUksWUFBYSxPQUFPLGVBQVAsS0FBMkIsSUFBNUM7O0FBRUEsZ0JBQUksTUFBTSxLQUFLLFdBQUwsR0FBbUIsYUFBbkIsQ0FBaUMsS0FBakMsQ0FBVjtBQUNBLGdCQUFJLEVBQUosR0FBUywwQ0FBVDtBQUNBLGlCQUFLLFdBQUwsR0FBbUIsSUFBbkIsQ0FBd0IsV0FBeEIsQ0FBb0MsR0FBcEM7O0FBRUEsZ0JBQUksUUFBUSxJQUFJLEtBQWhCO0FBQ0EsZ0JBQUksV0FBVyxPQUFPLGdCQUFQLEdBQTBCLGlCQUFpQixPQUFqQixDQUExQixHQUFzRCxRQUFRLFlBQTdFOztBQUVBLGtCQUFNLFVBQU4sR0FBbUIsVUFBbkI7QUFDQSxnQkFBSSxRQUFRLFFBQVIsS0FBcUIsT0FBekIsRUFBa0M7QUFDOUIsc0JBQU0sUUFBTixHQUFpQixZQUFqQjtBQUNIOztBQUVEO0FBQ0Esa0JBQU0sUUFBTixHQUFpQixVQUFqQjtBQUNBLGtCQUFNLFVBQU4sR0FBbUIsUUFBbkI7O0FBRUE7QUFDQSx1QkFBVyxPQUFYLENBQW1CLGdCQUFRO0FBQ3ZCLHNCQUFNLElBQU4sSUFBYyxTQUFTLElBQVQsQ0FBZDtBQUNILGFBRkQ7O0FBSUEsZ0JBQUksU0FBSixFQUFlO0FBQ1gsc0JBQU0sS0FBTixHQUFrQixTQUFTLFNBQVMsS0FBbEIsSUFBMkIsQ0FBN0M7QUFDQSxvQkFBSSxRQUFRLFlBQVIsR0FBdUIsU0FBUyxTQUFTLE1BQWxCLENBQTNCLEVBQ0ksTUFBTSxTQUFOLEdBQWtCLFFBQWxCO0FBQ1AsYUFKRCxNQUlPO0FBQ0gsc0JBQU0sUUFBTixHQUFpQixRQUFqQjtBQUNIOztBQUVELGdCQUFJLFdBQUosR0FBa0IsUUFBUSxLQUFSLENBQWMsU0FBZCxDQUF3QixDQUF4QixFQUEyQixRQUEzQixDQUFsQjs7QUFFQSxnQkFBSSxRQUFRLFFBQVIsS0FBcUIsT0FBekIsRUFBa0M7QUFDOUIsb0JBQUksV0FBSixHQUFrQixJQUFJLFdBQUosQ0FBZ0IsT0FBaEIsQ0FBd0IsS0FBeEIsRUFBK0IsR0FBL0IsQ0FBbEI7QUFDSDs7QUFFRCxnQkFBSSxPQUFPLEtBQUssV0FBTCxHQUFtQixhQUFuQixDQUFpQyxNQUFqQyxDQUFYO0FBQ0EsaUJBQUssV0FBTCxHQUFtQixRQUFRLEtBQVIsQ0FBYyxTQUFkLENBQXdCLFFBQXhCLEtBQXFDLEdBQXhEO0FBQ0EsZ0JBQUksV0FBSixDQUFnQixJQUFoQjs7QUFFQSxnQkFBSSxPQUFPLFFBQVEscUJBQVIsRUFBWDtBQUNBLGdCQUFJLE1BQU0sU0FBUyxlQUFuQjtBQUNBLGdCQUFJLGFBQWEsQ0FBQyxPQUFPLFdBQVAsSUFBc0IsSUFBSSxVQUEzQixLQUEwQyxJQUFJLFVBQUosSUFBa0IsQ0FBNUQsQ0FBakI7QUFDQSxnQkFBSSxZQUFZLENBQUMsT0FBTyxXQUFQLElBQXNCLElBQUksU0FBM0IsS0FBeUMsSUFBSSxTQUFKLElBQWlCLENBQTFELENBQWhCOztBQUVBLGdCQUFJLGNBQWM7QUFDZCxxQkFBSyxLQUFLLEdBQUwsR0FBVyxTQUFYLEdBQXVCLEtBQUssU0FBNUIsR0FBd0MsU0FBUyxTQUFTLGNBQWxCLENBQXhDLEdBQTRFLFNBQVMsU0FBUyxRQUFsQixDQUE1RSxHQUEwRyxRQUFRLFNBRHpHO0FBRWQsc0JBQU0sS0FBSyxJQUFMLEdBQVksVUFBWixHQUF5QixLQUFLLFVBQTlCLEdBQTJDLFNBQVMsU0FBUyxlQUFsQjtBQUZuQyxhQUFsQjs7QUFLQSxnQkFBSSxjQUFjLE9BQU8sVUFBekI7QUFDQSxnQkFBSSxlQUFlLE9BQU8sV0FBMUI7O0FBRUEsZ0JBQUksaUJBQWlCLEtBQUssaUJBQUwsRUFBckI7QUFDQSxnQkFBSSxrQkFBa0IsS0FBSyxlQUFMLENBQXFCLFdBQXJCLEVBQWtDLGNBQWxDLENBQXRCOztBQUVBLGdCQUFJLGdCQUFnQixLQUFwQixFQUEyQjtBQUN2Qiw0QkFBWSxLQUFaLEdBQW9CLGNBQWMsWUFBWSxJQUE5QztBQUNBLDRCQUFZLElBQVosR0FBbUIsTUFBbkI7QUFDSDs7QUFFRCxnQkFBSSxlQUFlLEtBQUssT0FBTCxDQUFhLGFBQWIsR0FDYixLQUFLLE9BQUwsQ0FBYSxhQUFiLENBQTJCLFlBRGQsR0FFYixLQUFLLFdBQUwsR0FBbUIsSUFBbkIsQ0FBd0IsWUFGOUI7O0FBSUEsZ0JBQUksZ0JBQWdCLE1BQXBCLEVBQTRCO0FBQ3hCLG9CQUFJLGFBQWEsS0FBSyxPQUFMLENBQWEsYUFBYixHQUNYLEtBQUssT0FBTCxDQUFhLGFBQWIsQ0FBMkIscUJBQTNCLEVBRFcsR0FFWCxLQUFLLFdBQUwsR0FBbUIsSUFBbkIsQ0FBd0IscUJBQXhCLEVBRk47QUFHQSxvQkFBSSx1QkFBdUIsZ0JBQWdCLGVBQWUsV0FBVyxHQUExQyxDQUEzQjs7QUFFQSw0QkFBWSxNQUFaLEdBQXFCLHdCQUF3QixlQUFlLEtBQUssR0FBcEIsR0FBMEIsS0FBSyxTQUF2RCxDQUFyQjtBQUNBLDRCQUFZLEdBQVosR0FBa0IsTUFBbEI7QUFDSDs7QUFFRCw4QkFBa0IsS0FBSyxlQUFMLENBQXFCLFdBQXJCLEVBQWtDLGNBQWxDLENBQWxCO0FBQ0EsZ0JBQUksZ0JBQWdCLElBQXBCLEVBQTBCO0FBQ3RCLDRCQUFZLElBQVosR0FBbUIsY0FBYyxlQUFlLEtBQTdCLEdBQ2IsYUFBYSxXQUFiLEdBQTJCLGVBQWUsS0FEN0IsR0FFYixVQUZOO0FBR0EsdUJBQU8sWUFBWSxLQUFuQjtBQUNIO0FBQ0QsZ0JBQUksZ0JBQWdCLEdBQXBCLEVBQXlCO0FBQ3JCLDRCQUFZLEdBQVosR0FBa0IsZUFBZSxlQUFlLE1BQTlCLEdBQ1osWUFBWSxZQUFaLEdBQTJCLGVBQWUsTUFEOUIsR0FFWixTQUZOO0FBR0EsdUJBQU8sWUFBWSxNQUFuQjtBQUNIOztBQUVELGlCQUFLLFdBQUwsR0FBbUIsSUFBbkIsQ0FBd0IsV0FBeEIsQ0FBb0MsR0FBcEM7QUFDQSxtQkFBTyxXQUFQO0FBQ0g7Ozt3REFFK0Isb0IsRUFBc0I7QUFDbEQsZ0JBQUksaUJBQWlCLEdBQXJCO0FBQ0EsZ0JBQUksaUJBQUo7QUFBQSxnQkFBYyxvQkFBa0IsSUFBSSxJQUFKLEdBQVcsT0FBWCxFQUFsQixTQUEwQyxLQUFLLE1BQUwsR0FBYyxRQUFkLEdBQXlCLE1BQXpCLENBQWdDLENBQWhDLENBQXhEO0FBQ0EsZ0JBQUksY0FBSjtBQUNBLGdCQUFJLE1BQU0sS0FBSyxrQkFBTCxFQUFWO0FBQ0EsZ0JBQUksWUFBWSxJQUFJLFVBQUosQ0FBZSxDQUFmLENBQWhCOztBQUVBLG9CQUFRLEtBQUssV0FBTCxHQUFtQixXQUFuQixFQUFSO0FBQ0Esa0JBQU0sUUFBTixDQUFlLElBQUksVUFBbkIsRUFBK0Isb0JBQS9CO0FBQ0Esa0JBQU0sTUFBTixDQUFhLElBQUksVUFBakIsRUFBNkIsb0JBQTdCOztBQUVBLGtCQUFNLFFBQU4sQ0FBZSxLQUFmOztBQUVBO0FBQ0EsdUJBQVcsS0FBSyxXQUFMLEdBQW1CLGFBQW5CLENBQWlDLE1BQWpDLENBQVg7QUFDQSxxQkFBUyxFQUFULEdBQWMsUUFBZDs7QUFFQSxxQkFBUyxXQUFULENBQXFCLEtBQUssV0FBTCxHQUFtQixjQUFuQixDQUFrQyxjQUFsQyxDQUFyQjtBQUNBLGtCQUFNLFVBQU4sQ0FBaUIsUUFBakI7QUFDQSxnQkFBSSxlQUFKO0FBQ0EsZ0JBQUksUUFBSixDQUFhLFNBQWI7O0FBRUEsZ0JBQUksT0FBTyxTQUFTLHFCQUFULEVBQVg7QUFDQSxnQkFBSSxNQUFNLFNBQVMsZUFBbkI7QUFDQSxnQkFBSSxhQUFhLENBQUMsT0FBTyxXQUFQLElBQXNCLElBQUksVUFBM0IsS0FBMEMsSUFBSSxVQUFKLElBQWtCLENBQTVELENBQWpCO0FBQ0EsZ0JBQUksWUFBWSxDQUFDLE9BQU8sV0FBUCxJQUFzQixJQUFJLFNBQTNCLEtBQXlDLElBQUksU0FBSixJQUFpQixDQUExRCxDQUFoQjtBQUNBLGdCQUFJLGNBQWM7QUFDZCxzQkFBTSxLQUFLLElBQUwsR0FBWSxVQURKO0FBRWQscUJBQUssS0FBSyxHQUFMLEdBQVcsU0FBUyxZQUFwQixHQUFtQztBQUYxQixhQUFsQjtBQUlBLGdCQUFJLGNBQWMsT0FBTyxVQUF6QjtBQUNBLGdCQUFJLGVBQWUsT0FBTyxXQUExQjs7QUFFQSxnQkFBSSxpQkFBaUIsS0FBSyxpQkFBTCxFQUFyQjtBQUNBLGdCQUFJLGtCQUFrQixLQUFLLGVBQUwsQ0FBcUIsV0FBckIsRUFBa0MsY0FBbEMsQ0FBdEI7O0FBRUEsZ0JBQUksZ0JBQWdCLEtBQXBCLEVBQTJCO0FBQ3ZCLDRCQUFZLElBQVosR0FBbUIsTUFBbkI7QUFDQSw0QkFBWSxLQUFaLEdBQW9CLGNBQWMsS0FBSyxJQUFuQixHQUEwQixVQUE5QztBQUNIOztBQUVELGdCQUFJLGVBQWUsS0FBSyxPQUFMLENBQWEsYUFBYixHQUNiLEtBQUssT0FBTCxDQUFhLGFBQWIsQ0FBMkIsWUFEZCxHQUViLEtBQUssV0FBTCxHQUFtQixJQUFuQixDQUF3QixZQUY5Qjs7QUFJQSxnQkFBSSxnQkFBZ0IsTUFBcEIsRUFBNEI7QUFDeEIsb0JBQUksYUFBYSxLQUFLLE9BQUwsQ0FBYSxhQUFiLEdBQ1gsS0FBSyxPQUFMLENBQWEsYUFBYixDQUEyQixxQkFBM0IsRUFEVyxHQUVYLEtBQUssV0FBTCxHQUFtQixJQUFuQixDQUF3QixxQkFBeEIsRUFGTjtBQUdBLG9CQUFJLHVCQUF1QixnQkFBZ0IsZUFBZSxXQUFXLEdBQTFDLENBQTNCOztBQUVBLDRCQUFZLEdBQVosR0FBa0IsTUFBbEI7QUFDQSw0QkFBWSxNQUFaLEdBQXFCLHdCQUF3QixlQUFlLEtBQUssR0FBNUMsQ0FBckI7QUFDSDs7QUFFRCw4QkFBa0IsS0FBSyxlQUFMLENBQXFCLFdBQXJCLEVBQWtDLGNBQWxDLENBQWxCO0FBQ0EsZ0JBQUksZ0JBQWdCLElBQXBCLEVBQTBCO0FBQ3RCLDRCQUFZLElBQVosR0FBbUIsY0FBYyxlQUFlLEtBQTdCLEdBQ2IsYUFBYSxXQUFiLEdBQTJCLGVBQWUsS0FEN0IsR0FFYixVQUZOO0FBR0EsdUJBQU8sWUFBWSxLQUFuQjtBQUNIO0FBQ0QsZ0JBQUksZ0JBQWdCLEdBQXBCLEVBQXlCO0FBQ3JCLDRCQUFZLEdBQVosR0FBa0IsZUFBZSxlQUFlLE1BQTlCLEdBQ1osWUFBWSxZQUFaLEdBQTJCLGVBQWUsTUFEOUIsR0FFWixTQUZOO0FBR0EsdUJBQU8sWUFBWSxNQUFuQjtBQUNIOztBQUVELHFCQUFTLFVBQVQsQ0FBb0IsV0FBcEIsQ0FBZ0MsUUFBaEM7QUFDQSxtQkFBTyxXQUFQO0FBQ0g7Ozt1Q0FFYyxJLEVBQU07QUFDakIsZ0JBQUksbUJBQW1CLEVBQXZCO0FBQUEsZ0JBQ0ksbUJBREo7QUFFQSxnQkFBSSx3QkFBd0IsR0FBNUI7QUFDQSxnQkFBSSxJQUFJLEtBQUssSUFBYjs7QUFFQSxnQkFBSSxPQUFPLENBQVAsS0FBYSxXQUFqQixFQUE4Qjs7QUFFOUIsbUJBQU8sZUFBZSxTQUFmLElBQTRCLFdBQVcsTUFBWCxLQUFzQixDQUF6RCxFQUE0RDtBQUN4RCw2QkFBYSxFQUFFLHFCQUFGLEVBQWI7O0FBRUEsb0JBQUksV0FBVyxNQUFYLEtBQXNCLENBQTFCLEVBQTZCO0FBQ3pCLHdCQUFJLEVBQUUsVUFBRixDQUFhLENBQWIsQ0FBSjtBQUNBLHdCQUFJLE1BQU0sU0FBTixJQUFtQixDQUFDLEVBQUUscUJBQTFCLEVBQWlEO0FBQzdDO0FBQ0g7QUFDSjtBQUNKOztBQUVELGdCQUFJLFVBQVUsV0FBVyxHQUF6QjtBQUNBLGdCQUFJLGFBQWEsVUFBVSxXQUFXLE1BQXRDOztBQUVBLGdCQUFJLFVBQVUsQ0FBZCxFQUFpQjtBQUNiLHVCQUFPLFFBQVAsQ0FBZ0IsQ0FBaEIsRUFBbUIsT0FBTyxXQUFQLEdBQXFCLFdBQVcsR0FBaEMsR0FBc0MsZ0JBQXpEO0FBQ0gsYUFGRCxNQUVPLElBQUksYUFBYSxPQUFPLFdBQXhCLEVBQXFDO0FBQ3hDLG9CQUFJLE9BQU8sT0FBTyxXQUFQLEdBQXFCLFdBQVcsR0FBaEMsR0FBc0MsZ0JBQWpEOztBQUVBLG9CQUFJLE9BQU8sT0FBTyxXQUFkLEdBQTRCLHFCQUFoQyxFQUF1RDtBQUNuRCwyQkFBTyxPQUFPLFdBQVAsR0FBcUIscUJBQTVCO0FBQ0g7O0FBRUQsb0JBQUksVUFBVSxPQUFPLFdBQVAsSUFBc0IsT0FBTyxXQUFQLEdBQXFCLFVBQTNDLENBQWQ7O0FBRUEsb0JBQUksVUFBVSxJQUFkLEVBQW9CO0FBQ2hCLDhCQUFVLElBQVY7QUFDSDs7QUFFRCx1QkFBTyxRQUFQLENBQWdCLENBQWhCLEVBQW1CLE9BQW5CO0FBQ0g7QUFDSjs7Ozs7O2tCQUlVLFk7Ozs7Ozs7Ozs7Ozs7O0FDL3BCZjtJQUNNLGE7QUFDRiwyQkFBWSxPQUFaLEVBQXFCO0FBQUE7O0FBQ2pCLGFBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxhQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQXNCLElBQXRCO0FBQ0g7Ozs7cUNBRVksTyxFQUFTLEssRUFBTztBQUFBOztBQUN6QixtQkFBTyxNQUFNLE1BQU4sQ0FBYSxrQkFBVTtBQUMxQix1QkFBTyxNQUFLLElBQUwsQ0FBVSxPQUFWLEVBQW1CLE1BQW5CLENBQVA7QUFDSCxhQUZNLENBQVA7QUFHSDs7OzZCQUVJLE8sRUFBUyxNLEVBQVE7QUFDbEIsbUJBQU8sS0FBSyxLQUFMLENBQVcsT0FBWCxFQUFvQixNQUFwQixNQUFnQyxJQUF2QztBQUNIOzs7OEJBRUssTyxFQUFTLE0sRUFBUSxJLEVBQU07QUFDekIsbUJBQU8sUUFBUSxFQUFmO0FBQ0EsZ0JBQUksYUFBYSxDQUFqQjtBQUFBLGdCQUNJLFNBQVMsRUFEYjtBQUFBLGdCQUVJLE1BQU0sT0FBTyxNQUZqQjtBQUFBLGdCQUdJLGFBQWEsQ0FIakI7QUFBQSxnQkFJSSxZQUFZLENBSmhCO0FBQUEsZ0JBS0ksTUFBTSxLQUFLLEdBQUwsSUFBWSxFQUx0QjtBQUFBLGdCQU1JLE9BQU8sS0FBSyxJQUFMLElBQWEsRUFOeEI7QUFBQSxnQkFPSSxnQkFBZ0IsS0FBSyxhQUFMLElBQXNCLE1BQXRCLElBQWdDLE9BQU8sV0FBUCxFQVBwRDtBQUFBLGdCQVFJLFdBUko7QUFBQSxnQkFRUSxvQkFSUjs7QUFVQSxzQkFBVSxLQUFLLGFBQUwsSUFBc0IsT0FBdEIsSUFBaUMsUUFBUSxXQUFSLEVBQTNDOztBQUVBLGdCQUFJLGVBQWUsS0FBSyxRQUFMLENBQWMsYUFBZCxFQUE2QixPQUE3QixFQUFzQyxDQUF0QyxFQUF5QyxDQUF6QyxFQUE0QyxFQUE1QyxDQUFuQjtBQUNBLGdCQUFJLENBQUMsWUFBTCxFQUFtQjtBQUNmLHVCQUFPLElBQVA7QUFDSDs7QUFFRCxtQkFBTztBQUNILDBCQUFVLEtBQUssTUFBTCxDQUFZLE1BQVosRUFBb0IsYUFBYSxLQUFqQyxFQUF3QyxHQUF4QyxFQUE2QyxJQUE3QyxDQURQO0FBRUgsdUJBQU8sYUFBYTtBQUZqQixhQUFQO0FBSUg7OztpQ0FFUSxNLEVBQVEsTyxFQUFTLFcsRUFBYSxZLEVBQWMsWSxFQUFjO0FBQy9EO0FBQ0EsZ0JBQUksUUFBUSxNQUFSLEtBQW1CLFlBQXZCLEVBQXFDOztBQUVqQztBQUNBLHVCQUFPO0FBQ0gsMkJBQU8sS0FBSyxjQUFMLENBQW9CLFlBQXBCLENBREo7QUFFSCwyQkFBTyxhQUFhLEtBQWI7QUFGSixpQkFBUDtBQUlIOztBQUVEO0FBQ0EsZ0JBQUksT0FBTyxNQUFQLEtBQWtCLFdBQWxCLElBQWlDLFFBQVEsTUFBUixHQUFpQixZQUFqQixHQUFnQyxPQUFPLE1BQVAsR0FBZ0IsV0FBckYsRUFBa0c7QUFDOUYsdUJBQU8sU0FBUDtBQUNIOztBQUVELGdCQUFJLElBQUksUUFBUSxZQUFSLENBQVI7QUFDQSxnQkFBSSxRQUFRLE9BQU8sT0FBUCxDQUFlLENBQWYsRUFBa0IsV0FBbEIsQ0FBWjtBQUNBLGdCQUFJLGFBQUo7QUFBQSxnQkFBVSxhQUFWOztBQUVBLG1CQUFPLFFBQVEsQ0FBQyxDQUFoQixFQUFtQjtBQUNmLDZCQUFhLElBQWIsQ0FBa0IsS0FBbEI7QUFDQSx1QkFBTyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQXNCLE9BQXRCLEVBQStCLFFBQVEsQ0FBdkMsRUFBMEMsZUFBZSxDQUF6RCxFQUE0RCxZQUE1RCxDQUFQO0FBQ0EsNkJBQWEsR0FBYjs7QUFFQTtBQUNBLG9CQUFJLENBQUMsSUFBTCxFQUFXO0FBQ1AsMkJBQU8sSUFBUDtBQUNIOztBQUVELG9CQUFJLENBQUMsSUFBRCxJQUFTLEtBQUssS0FBTCxHQUFhLEtBQUssS0FBL0IsRUFBc0M7QUFDbEMsMkJBQU8sSUFBUDtBQUNIOztBQUVELHdCQUFRLE9BQU8sT0FBUCxDQUFlLENBQWYsRUFBa0IsUUFBUSxDQUExQixDQUFSO0FBQ0g7O0FBRUQsbUJBQU8sSUFBUDtBQUNIOzs7dUNBRWMsWSxFQUFjO0FBQ3pCLGdCQUFJLFFBQVEsQ0FBWjtBQUNBLGdCQUFJLE9BQU8sQ0FBWDs7QUFFQSx5QkFBYSxPQUFiLENBQXFCLFVBQUMsS0FBRCxFQUFRLENBQVIsRUFBYztBQUMvQixvQkFBSSxJQUFJLENBQVIsRUFBVztBQUNQLHdCQUFJLGFBQWEsSUFBSSxDQUFqQixJQUFzQixDQUF0QixLQUE0QixLQUFoQyxFQUF1QztBQUNuQyxnQ0FBUSxPQUFPLENBQWY7QUFDSCxxQkFGRCxNQUdLO0FBQ0QsK0JBQU8sQ0FBUDtBQUNIO0FBQ0o7O0FBRUQseUJBQVMsSUFBVDtBQUNILGFBWEQ7O0FBYUEsbUJBQU8sS0FBUDtBQUNIOzs7K0JBRU0sTSxFQUFRLE8sRUFBUyxHLEVBQUssSSxFQUFNO0FBQy9CLGdCQUFJLFdBQVcsT0FBTyxTQUFQLENBQWlCLENBQWpCLEVBQW9CLFFBQVEsQ0FBUixDQUFwQixDQUFmOztBQUVBLG9CQUFRLE9BQVIsQ0FBZ0IsVUFBQyxLQUFELEVBQVEsQ0FBUixFQUFjO0FBQzFCLDRCQUFZLE1BQU0sT0FBTyxLQUFQLENBQU4sR0FBc0IsSUFBdEIsR0FDUixPQUFPLFNBQVAsQ0FBaUIsUUFBUSxDQUF6QixFQUE2QixRQUFRLElBQUksQ0FBWixDQUFELEdBQW1CLFFBQVEsSUFBSSxDQUFaLENBQW5CLEdBQW9DLE9BQU8sTUFBdkUsQ0FESjtBQUVILGFBSEQ7O0FBS0EsbUJBQU8sUUFBUDtBQUNIOzs7K0JBRU0sTyxFQUFTLEcsRUFBSyxJLEVBQU07QUFBQTs7QUFDdkIsbUJBQU8sUUFBUSxFQUFmO0FBQ0EsbUJBQU8sSUFDRixNQURFLENBQ0ssVUFBQyxJQUFELEVBQU8sT0FBUCxFQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUE2QjtBQUNqQyxvQkFBSSxNQUFNLE9BQVY7O0FBRUEsb0JBQUksS0FBSyxPQUFULEVBQWtCO0FBQ2QsMEJBQU0sS0FBSyxPQUFMLENBQWEsT0FBYixDQUFOOztBQUVBLHdCQUFJLENBQUMsR0FBTCxFQUFVO0FBQUU7QUFDUiw4QkFBTSxFQUFOO0FBQ0g7QUFDSjs7QUFFRCxvQkFBSSxXQUFXLE9BQUssS0FBTCxDQUFXLE9BQVgsRUFBb0IsR0FBcEIsRUFBeUIsSUFBekIsQ0FBZjs7QUFFQSxvQkFBSSxZQUFZLElBQWhCLEVBQXNCO0FBQ2xCLHlCQUFLLEtBQUssTUFBVixJQUFvQjtBQUNoQixnQ0FBUSxTQUFTLFFBREQ7QUFFaEIsK0JBQU8sU0FBUyxLQUZBO0FBR2hCLCtCQUFPLEdBSFM7QUFJaEIsa0NBQVU7QUFKTSxxQkFBcEI7QUFNSDs7QUFFRCx1QkFBTyxJQUFQO0FBQ0gsYUF4QkUsRUF3QkEsRUF4QkEsRUEwQk4sSUExQk0sQ0EwQkQsVUFBQyxDQUFELEVBQUksQ0FBSixFQUFVO0FBQ1osb0JBQUksVUFBVSxFQUFFLEtBQUYsR0FBVSxFQUFFLEtBQTFCO0FBQ0Esb0JBQUksT0FBSixFQUFhLE9BQU8sT0FBUDtBQUNiLHVCQUFPLEVBQUUsS0FBRixHQUFVLEVBQUUsS0FBbkI7QUFDSCxhQTlCTSxDQUFQO0FBK0JIOzs7Ozs7a0JBR1UsYTs7Ozs7Ozs7OztBQ2hKZjs7Ozs7O2tCQUVlLGlCLEVBUGY7Ozs7Ozs7Ozs7QUNBQSxJQUFJLENBQUMsTUFBTSxTQUFOLENBQWdCLElBQXJCLEVBQTJCO0FBQ3ZCLFVBQU0sU0FBTixDQUFnQixJQUFoQixHQUF1QixVQUFTLFNBQVQsRUFBb0I7QUFDdkMsWUFBSSxTQUFTLElBQWIsRUFBbUI7QUFDZixrQkFBTSxJQUFJLFNBQUosQ0FBYyxrREFBZCxDQUFOO0FBQ0g7QUFDRCxZQUFJLE9BQU8sU0FBUCxLQUFxQixVQUF6QixFQUFxQztBQUNqQyxrQkFBTSxJQUFJLFNBQUosQ0FBYyw4QkFBZCxDQUFOO0FBQ0g7QUFDRCxZQUFJLE9BQU8sT0FBTyxJQUFQLENBQVg7QUFDQSxZQUFJLFNBQVMsS0FBSyxNQUFMLEtBQWdCLENBQTdCO0FBQ0EsWUFBSSxVQUFVLFVBQVUsQ0FBVixDQUFkO0FBQ0EsWUFBSSxLQUFKOztBQUVBLGFBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxNQUFwQixFQUE0QixHQUE1QixFQUFpQztBQUM3QixvQkFBUSxLQUFLLENBQUwsQ0FBUjtBQUNBLGdCQUFJLFVBQVUsSUFBVixDQUFlLE9BQWYsRUFBd0IsS0FBeEIsRUFBK0IsQ0FBL0IsRUFBa0MsSUFBbEMsQ0FBSixFQUE2QztBQUN6Qyx1QkFBTyxLQUFQO0FBQ0g7QUFDSjtBQUNELGVBQU8sU0FBUDtBQUNILEtBbkJEO0FBb0JIOztBQUVELElBQUksVUFBVSxPQUFPLE9BQU8sV0FBZCxLQUE4QixVQUE1QyxFQUF3RDtBQUFBLFFBQzdDLFdBRDZDLEdBQ3RELFNBQVMsV0FBVCxDQUFxQixLQUFyQixFQUE0QixNQUE1QixFQUFvQztBQUNsQyxpQkFBUyxVQUFVO0FBQ2pCLHFCQUFTLEtBRFE7QUFFakIsd0JBQVksS0FGSztBQUdqQixvQkFBUTtBQUhTLFNBQW5CO0FBS0EsWUFBSSxNQUFNLFNBQVMsV0FBVCxDQUFxQixhQUFyQixDQUFWO0FBQ0EsWUFBSSxlQUFKLENBQW9CLEtBQXBCLEVBQTJCLE9BQU8sT0FBbEMsRUFBMkMsT0FBTyxVQUFsRCxFQUE4RCxPQUFPLE1BQXJFO0FBQ0EsZUFBTyxHQUFQO0FBQ0QsS0FWcUQ7O0FBWXZELFFBQUksT0FBTyxPQUFPLEtBQWQsS0FBd0IsV0FBNUIsRUFBeUM7QUFDdkMsb0JBQVksU0FBWixHQUF3QixPQUFPLEtBQVAsQ0FBYSxTQUFyQztBQUNEOztBQUVBLFdBQU8sV0FBUCxHQUFxQixXQUFyQjtBQUNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IFRyaWJ1dGVVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IFRyaWJ1dGVFdmVudHMgZnJvbSBcIi4vVHJpYnV0ZUV2ZW50c1wiO1xuaW1wb3J0IFRyaWJ1dGVNZW51RXZlbnRzIGZyb20gXCIuL1RyaWJ1dGVNZW51RXZlbnRzXCI7XG5pbXBvcnQgVHJpYnV0ZVJhbmdlIGZyb20gXCIuL1RyaWJ1dGVSYW5nZVwiO1xuaW1wb3J0IFRyaWJ1dGVTZWFyY2ggZnJvbSBcIi4vVHJpYnV0ZVNlYXJjaFwiO1xuXG5jbGFzcyBUcmlidXRlIHtcbiAgICBjb25zdHJ1Y3Rvcih7XG4gICAgICAgIHZhbHVlcyA9IG51bGwsXG4gICAgICAgIGlmcmFtZSA9IG51bGwsXG4gICAgICAgIHNlbGVjdENsYXNzID0gJ2hpZ2hsaWdodCcsXG4gICAgICAgIHRyaWdnZXIgPSAnQCcsXG4gICAgICAgIGF1dG9jb21wbGV0ZU1vZGUgPSBmYWxzZSxcbiAgICAgICAgc2VsZWN0VGVtcGxhdGUgPSBudWxsLFxuICAgICAgICBtZW51SXRlbVRlbXBsYXRlID0gbnVsbCxcbiAgICAgICAgbG9va3VwID0gJ2tleScsXG4gICAgICAgIGZpbGxBdHRyID0gJ3ZhbHVlJyxcbiAgICAgICAgY29sbGVjdGlvbiA9IG51bGwsXG4gICAgICAgIG1lbnVDb250YWluZXIgPSBudWxsLFxuICAgICAgICBzY3JvbGxDb250YWluZXIgPSBudWxsLFxuICAgICAgICBub01hdGNoVGVtcGxhdGUgPSBudWxsLFxuICAgICAgICBoZWFkZXJUZW1wbGF0ZSA9IG51bGwsXG4gICAgICAgIHJlcXVpcmVMZWFkaW5nU3BhY2UgPSB0cnVlLFxuICAgICAgICBhbGxvd1NwYWNlcyA9IGZhbHNlLFxuICAgICAgICByZXBsYWNlVGV4dFN1ZmZpeCA9IG51bGwsXG4gICAgICAgIHBvc2l0aW9uTWVudSA9IHRydWUsXG4gICAgICAgIHNwYWNlU2VsZWN0c01hdGNoID0gZmFsc2UsXG4gICAgICAgIHNlbGVjdFdpdGhDb21tYSA9IGZhbHNlLFxuICAgICAgICBzZWFyY2hPcHRzID0ge30sXG4gICAgICAgIGVkaXRvciA9IHt9LFxuICAgICAgICBpc1ZhbGlkU2VsZWN0aW9uID0gbnVsbCxcbiAgICAgICAgbWVudUl0ZW1MaW1pdCA9IG51bGwsXG4gICAgfSkge1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZU1vZGUgPSBhdXRvY29tcGxldGVNb2RlXG4gICAgICAgIHRoaXMubWVudVNlbGVjdGVkID0gMFxuICAgICAgICB0aGlzLmN1cnJlbnQgPSB7fVxuICAgICAgICB0aGlzLmlucHV0RXZlbnQgPSBmYWxzZVxuICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyID0gbWVudUNvbnRhaW5lclxuICAgICAgICB0aGlzLnNjcm9sbENvbnRhaW5lciA9IHNjcm9sbENvbnRhaW5lclxuICAgICAgICB0aGlzLmFsbG93U3BhY2VzID0gYWxsb3dTcGFjZXNcbiAgICAgICAgdGhpcy5yZXBsYWNlVGV4dFN1ZmZpeCA9IHJlcGxhY2VUZXh0U3VmZml4XG4gICAgICAgIHRoaXMucG9zaXRpb25NZW51ID0gcG9zaXRpb25NZW51XG4gICAgICAgIHRoaXMuaGFzVHJhaWxpbmdTcGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNwYWNlU2VsZWN0c01hdGNoID0gc3BhY2VTZWxlY3RzTWF0Y2g7XG4gICAgICAgIHRoaXMuc2VsZWN0V2l0aENvbW1hID0gc2VsZWN0V2l0aENvbW1hO1xuICAgICAgICB0aGlzLmludmFsaWRFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgICB0aGlzLmludmFsaWRFdmVudC5pbml0RXZlbnQoJ2ludmFsaWQnLCB0cnVlLCB0cnVlKTtcblxuICAgICAgICBpZiAodGhpcy5hdXRvY29tcGxldGVNb2RlKSB7XG4gICAgICAgICAgICB0cmlnZ2VyID0gJydcbiAgICAgICAgICAgIGFsbG93U3BhY2VzID0gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IFt7XG4gICAgICAgICAgICAgICAgLy8gc3ltYm9sIHRoYXQgc3RhcnRzIHRoZSBsb29rdXBcbiAgICAgICAgICAgICAgICB0cmlnZ2VyOiB0cmlnZ2VyLFxuXG4gICAgICAgICAgICAgICAgLy8gaXMgaXQgd3JhcHBlZCBpbiBhbiBpZnJhbWVcbiAgICAgICAgICAgICAgICBpZnJhbWU6IGlmcmFtZSxcblxuICAgICAgICAgICAgICAgIC8vIGNsYXNzIGFwcGxpZWQgdG8gc2VsZWN0ZWQgaXRlbVxuICAgICAgICAgICAgICAgIHNlbGVjdENsYXNzOiBzZWxlY3RDbGFzcyxcblxuICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGNhbGxlZCBvbiBzZWxlY3QgdGhhdCByZXR1bnMgdGhlIGNvbnRlbnQgdG8gaW5zZXJ0XG4gICAgICAgICAgICAgICAgc2VsZWN0VGVtcGxhdGU6IChzZWxlY3RUZW1wbGF0ZSB8fCBUcmlidXRlLmRlZmF1bHRTZWxlY3RUZW1wbGF0ZSkuYmluZCh0aGlzKSxcblxuICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGNhbGxlZCB0aGF0IHJldHVybnMgY29udGVudCBmb3IgYW4gaXRlbVxuICAgICAgICAgICAgICAgIG1lbnVJdGVtVGVtcGxhdGU6IChtZW51SXRlbVRlbXBsYXRlIHx8IFRyaWJ1dGUuZGVmYXVsdE1lbnVJdGVtVGVtcGxhdGUpLmJpbmQodGhpcyksXG5cbiAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBjYWxsZWQgd2hlbiBtZW51IGlzIGVtcHR5LCBkaXNhYmxlcyBoaWRpbmcgb2YgbWVudS5cbiAgICAgICAgICAgICAgICBub01hdGNoVGVtcGxhdGU6ICh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9NYXRjaFRlbXBsYXRlIHx8IGZ1bmN0aW9uICgpIHtyZXR1cm4gJyd9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9KShub01hdGNoVGVtcGxhdGUpLFxuXG4gICAgICAgICAgICAgICAgaGVhZGVyVGVtcGxhdGU6ICh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGVhZGVyVGVtcGxhdGUgfHwgZnVuY3Rpb24gKCkge3JldHVybiAnJ30uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgIH0pKGhlYWRlclRlbXBsYXRlKSxcblxuICAgICAgICAgICAgICAgIC8vIGNvbHVtbiB0byBzZWFyY2ggYWdhaW5zdCBpbiB0aGUgb2JqZWN0XG4gICAgICAgICAgICAgICAgbG9va3VwOiBsb29rdXAsXG5cbiAgICAgICAgICAgICAgICAvLyBjb2x1bW4gdGhhdCBjb250YWlucyB0aGUgY29udGVudCB0byBpbnNlcnQgYnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgIGZpbGxBdHRyOiBmaWxsQXR0cixcblxuICAgICAgICAgICAgICAgIC8vIGFycmF5IG9mIG9iamVjdHMgb3IgYSBmdW5jdGlvbiByZXR1cm5pbmcgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgICAgICAgICAgIHZhbHVlczogdmFsdWVzLFxuXG4gICAgICAgICAgICAgICAgcmVxdWlyZUxlYWRpbmdTcGFjZTogcmVxdWlyZUxlYWRpbmdTcGFjZSxcblxuICAgICAgICAgICAgICAgIHNlYXJjaE9wdHM6IHNlYXJjaE9wdHMsXG5cbiAgICAgICAgICAgICAgICBlZGl0b3I6IGVkaXRvcixcblxuICAgICAgICAgICAgICAgIHNlbGVjdFdpdGhDb21tYTogc2VsZWN0V2l0aENvbW1hLFxuXG4gICAgICAgICAgICAgICAgaXNWYWxpZFNlbGVjdGlvbjogKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpc1ZhbGlkU2VsZWN0aW9uIHx8IGZ1bmN0aW9uICgpIHtyZXR1cm4gJyd9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9KShpc1ZhbGlkU2VsZWN0aW9uKSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBtZW51SXRlbUxpbWl0OiBtZW51SXRlbUxpbWl0LFxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvY29tcGxldGVNb2RlKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignVHJpYnV0ZSBpbiBhdXRvY29tcGxldGUgbW9kZSBkb2VzIG5vdCB3b3JrIGZvciBjb2xsZWN0aW9ucycpXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBpdGVtLnRyaWdnZXIgfHwgdHJpZ2dlcixcbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lOiBpdGVtLmlmcmFtZSB8fCBpZnJhbWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENsYXNzOiBpdGVtLnNlbGVjdENsYXNzIHx8IHNlbGVjdENsYXNzLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RUZW1wbGF0ZTogKGl0ZW0uc2VsZWN0VGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0U2VsZWN0VGVtcGxhdGUpLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtVGVtcGxhdGU6IChpdGVtLm1lbnVJdGVtVGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0TWVudUl0ZW1UZW1wbGF0ZSkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIHdoZW4gbWVudSBpcyBlbXB0eSwgZGlzYWJsZXMgaGlkaW5nIG9mIG1lbnUuXG4gICAgICAgICAgICAgICAgICAgIG5vTWF0Y2hUZW1wbGF0ZTogKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICB9KShub01hdGNoVGVtcGxhdGUpLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJUZW1wbGF0ZTogKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICB9KShoZWFkZXJUZW1wbGF0ZSksXG4gICAgICAgICAgICAgICAgICAgIGxvb2t1cDogaXRlbS5sb29rdXAgfHwgbG9va3VwLFxuICAgICAgICAgICAgICAgICAgICBmaWxsQXR0cjogaXRlbS5maWxsQXR0ciB8fCBmaWxsQXR0cixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBpdGVtLnZhbHVlcyxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZUxlYWRpbmdTcGFjZTogaXRlbS5yZXF1aXJlTGVhZGluZ1NwYWNlLFxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hPcHRzOiBpdGVtLnNlYXJjaE9wdHMgfHwgc2VhcmNoT3B0cyxcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBpdGVtLmVkaXRvciB8fCBlZGl0b3IsXG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWRTZWxlY3Rpb246ICh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgICAgfSkoaXNWYWxpZFNlbGVjdGlvbiksXG4gICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtTGltaXQ6IGl0ZW0ubWVudUl0ZW1MaW1pdCB8fCBtZW51SXRlbUxpbWl0LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tUcmlidXRlXSBObyBjb2xsZWN0aW9uIHNwZWNpZmllZC4nKVxuICAgICAgICB9XG5cbiAgICAgICAgbmV3IFRyaWJ1dGVSYW5nZSh0aGlzKVxuICAgICAgICBuZXcgVHJpYnV0ZUV2ZW50cyh0aGlzKVxuICAgICAgICBuZXcgVHJpYnV0ZU1lbnVFdmVudHModGhpcylcbiAgICAgICAgbmV3IFRyaWJ1dGVTZWFyY2godGhpcylcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFNlbGVjdFRlbXBsYXRlKGl0ZW0pIHtcbiAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBudWxsO1xuICAgICAgaWYgKHRoaXMucmFuZ2UuaXNDb250ZW50RWRpdGFibGUodGhpcy5jdXJyZW50LmVsZW1lbnQpKSB7XG4gICAgICAgICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cInRyaWJ1dGUtbWVudGlvblwiPicgKyAodGhpcy5jdXJyZW50LmNvbGxlY3Rpb24udHJpZ2dlciArIGl0ZW0ub3JpZ2luYWxbdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uZmlsbEF0dHJdKSArICc8L3NwYW4+JztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnRyaWdnZXIgKyBpdGVtLm9yaWdpbmFsW3RoaXMuY3VycmVudC5jb2xsZWN0aW9uLmZpbGxBdHRyXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdE1lbnVJdGVtVGVtcGxhdGUobWF0Y2hJdGVtKSB7XG4gICAgICAgIHJldHVybiBtYXRjaEl0ZW0uc3RyaW5nXG4gICAgfVxuXG4gICAgc3RhdGljIGlucHV0VHlwZXMoKSB7XG4gICAgICAgIHJldHVybiBbJ1RFWFRBUkVBJywgJ0lOUFVUJ11cbiAgICB9XG5cbiAgICB0cmlnZ2VycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi5tYXAoY29uZmlnID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb25maWcudHJpZ2dlclxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGF0dGFjaChlbCwgZWRpdG9yKSB7XG4gICAgICAgIGlmICghZWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignW1RyaWJ1dGVdIE11c3QgcGFzcyBpbiBhIERPTSBub2RlIG9yIE5vZGVMaXN0LicpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBpZiBpdCBpcyBhIGpRdWVyeSBjb2xsZWN0aW9uXG4gICAgICAgIGlmICh0eXBlb2YgalF1ZXJ5ICE9PSAndW5kZWZpbmVkJyAmJiBlbCBpbnN0YW5jZW9mIGpRdWVyeSkge1xuICAgICAgICAgICAgZWwgPSBlbC5nZXQoKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSXMgZWwgYW4gQXJyYXkvQXJyYXktbGlrZSBvYmplY3Q/XG4gICAgICAgIGlmIChlbC5jb25zdHJ1Y3RvciA9PT0gTm9kZUxpc3QgfHwgZWwuY29uc3RydWN0b3IgPT09IEhUTUxDb2xsZWN0aW9uIHx8IGVsLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xuICAgICAgICAgICAgbGV0IGxlbmd0aCA9IGVsLmxlbmd0aFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2F0dGFjaChlbFtpXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2F0dGFjaChlbCwgZWRpdG9yKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2F0dGFjaChlbCwgZWRpdG9yKSB7XG4gICAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdHJpYnV0ZScpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1RyaWJ1dGUgd2FzIGFscmVhZHkgYm91bmQgdG8gJyArIGVsLm5vZGVOYW1lKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbnN1cmVFZGl0YWJsZShlbClcbiAgICAgICAgdGhpcy5ldmVudHMuYmluZChlbCwgZWRpdG9yKVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsQ29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEV2ZW50LmJpbmQodGhpcykgKVxuICAgICAgICB9XG5cbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLXRyaWJ1dGUnLCB0cnVlKVxuICAgIH1cblxuICAgIHNjcm9sbEV2ZW50KGUpIHtcbiAgICAgICAgdGhpcy5ldmVudHMuc2Nyb2xsKHRoaXMsIGUpXG4gICAgfVxuXG4gICAgZW5zdXJlRWRpdGFibGUoZWxlbWVudCkge1xuICAgICAgICBpZiAoVHJpYnV0ZS5pbnB1dFR5cGVzKCkuaW5kZXhPZihlbGVtZW50Lm5vZGVOYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmNvbnRlbnRFZGl0YWJsZSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY29udGVudEVkaXRhYmxlID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tUcmlidXRlXSBDYW5ub3QgYmluZCB0byAnICsgZWxlbWVudC5ub2RlTmFtZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZU1lbnUoKSB7XG4gICAgICAgIGxldCB3cmFwcGVyID0gdGhpcy5yYW5nZS5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgdWwgPSB0aGlzLnJhbmdlLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gICAgICAgIHdyYXBwZXIuY2xhc3NOYW1lID0gJ3RyaWJ1dGUtY29udGFpbmVyJ1xuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHVsKVxuXG4gICAgICAgIGlmICh0aGlzLm1lbnVDb250YWluZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1lbnVDb250YWluZXIuYXBwZW5kQ2hpbGQod3JhcHBlcilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnJhbmdlLmdldERvY3VtZW50KCkuYm9keS5hcHBlbmRDaGlsZCh3cmFwcGVyKVxuICAgIH1cblxuICAgIHNob3dNZW51Rm9yKGVsZW1lbnQsIHNjcm9sbFRvKSB7XG4gICAgICAgIC8vIE9ubHkgcHJvY2VlZCBpZiBtZW51IGlzbid0IGFscmVhZHkgc2hvd24gZm9yIHRoZSBjdXJyZW50IGVsZW1lbnQgJiBtZW50aW9uVGV4dFxuICAgICAgICBpZiAodGhpcy5pc0FjdGl2ZSAmJiB0aGlzLmN1cnJlbnQuZWxlbWVudCA9PT0gZWxlbWVudCAmJiB0aGlzLmN1cnJlbnQubWVudGlvblRleHQgPT09IHRoaXMuY3VycmVudE1lbnRpb25UZXh0U25hcHNob3QpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRNZW50aW9uVGV4dFNuYXBzaG90ID0gdGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0XG5cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBtZW51IGlmIGl0IGRvZXNuJ3QgZXhpc3QuXG4gICAgICAgIGlmICghdGhpcy5tZW51KSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUgPSB0aGlzLmNyZWF0ZU1lbnUoKVxuICAgICAgICAgICAgZWxlbWVudC50cmlidXRlTWVudSA9IHRoaXMubWVudVxuICAgICAgICAgICAgdGhpcy5tZW51RXZlbnRzLmJpbmQodGhpcy5tZW51KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IHRydWVcbiAgICAgICAgdGhpcy5tZW51U2VsZWN0ZWQgPSAwXG5cbiAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnQubWVudGlvblRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudC5tZW50aW9uVGV4dCA9ICcnXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9jZXNzVmFsdWVzID0gKHZhbHVlcywgdGV4dCkgPT4ge1xuICAgICAgICAgICAgLy8gVHJpYnV0ZSBtYXkgbm90IGJlIGFjdGl2ZSBhbnkgbW9yZSBieSB0aGUgdGltZSB0aGUgdmFsdWUgY2FsbGJhY2sgcmV0dXJuc1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpdGVtcyA9IHRoaXMuc2VhcmNoLmZpbHRlcih0aGlzLmN1cnJlbnQubWVudGlvblRleHQsIHZhbHVlcywge1xuICAgICAgICAgICAgICAgIHByZTogdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uc2VhcmNoT3B0cy5wcmUgfHwgJzxzcGFuPicsXG4gICAgICAgICAgICAgICAgcG9zdDogdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uc2VhcmNoT3B0cy5wb3N0IHx8ICc8L3NwYW4+JyxcbiAgICAgICAgICAgICAgICBleHRyYWN0OiAoZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5sb29rdXAgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxbdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwXVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5sb29rdXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5sb29rdXAoZWwsIHRoaXMuY3VycmVudC5tZW50aW9uVGV4dClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBsb29rdXAgYXR0cmlidXRlLCBsb29rdXAgbXVzdCBiZSBzdHJpbmcgb3IgZnVuY3Rpb24uJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHRoaXMuY3VycmVudC5maWx0ZXJlZEl0ZW1zID0gaXRlbXNcblxuICAgICAgICAgICAgbGV0IHVsID0gdGhpcy5tZW51LnF1ZXJ5U2VsZWN0b3IoJ3VsJylcblxuICAgICAgICAgICAgdGhpcy5yYW5nZS5wb3NpdGlvbk1lbnVBdENhcmV0KHNjcm9sbFRvKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uaGVhZGVyVGVtcGxhdGUgJiYgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uaGVhZGVyVGVtcGxhdGUodGV4dCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgICAgIGhlYWRlci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhlYWRlclwiKVxuICAgICAgICAgICAgICAgIGhlYWRlci5pbm5lckhUTUwgPSB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5oZWFkZXJUZW1wbGF0ZSh0ZXh0KVxuICAgICAgICAgICAgICAgIGNvbnN0IG9sZEhlYWRlciA9IHRoaXMubWVudS5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlclwiKVxuICAgICAgICAgICAgICAgIGlmIChvbGRIZWFkZXIgJiYgb2xkSGVhZGVyLnJlbW92ZSkge1xuICAgICAgICAgICAgICAgICAgICBvbGRIZWFkZXIucmVtb3ZlKClcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9sZEhlYWRlciAmJiAhb2xkSGVhZGVyLnJlbW92ZSkge1xuICAgICAgICAgICAgICAgICAgICBvbGRIZWFkZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvbGRIZWFkZXIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubWVudS5pbnNlcnRCZWZvcmUoaGVhZGVyLCB0aGlzLm1lbnUuY2hpbGROb2Rlc1swXSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgbm9NYXRjaEV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCd0cmlidXRlLW5vLW1hdGNoJywgeyBkZXRhaWw6IHRoaXMubWVudSB9KVxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudC5lbGVtZW50LmRpc3BhdGNoRXZlbnQobm9NYXRjaEV2ZW50KVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubm9NYXRjaFRlbXBsYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU1lbnUoKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHVsLmlubmVySFRNTCA9IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLm5vTWF0Y2hUZW1wbGF0ZSgpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5tZW51SXRlbUxpbWl0KSB7XG4gICAgICAgICAgICAgICAgaXRlbXMgPSBpdGVtcy5zbGljZSgwLCB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5tZW51SXRlbUxpbWl0KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1bC5pbm5lckhUTUwgPSAnJ1xuICAgICAgICAgICAgbGV0IGZyYWdtZW50ID0gdGhpcy5yYW5nZS5nZXREb2N1bWVudCgpLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuXG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBsaSA9IHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpXG4gICAgICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxldCBsaSA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gbGkuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykgfHwgKGxpLnBhcmVudE5vZGUgJiYgbGkucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUubW92ZW1lbnRZICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXRBY3RpdmVMaShpbmRleClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWVudVNlbGVjdGVkID09PSBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgbGkuY2xhc3NOYW1lID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uc2VsZWN0Q2xhc3NcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGkuaW5uZXJIVE1MID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubWVudUl0ZW1UZW1wbGF0ZShpdGVtKVxuICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGxpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHVsLmFwcGVuZENoaWxkKGZyYWdtZW50KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi52YWx1ZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnZhbHVlcyh0aGlzLmN1cnJlbnQubWVudGlvblRleHQsIHByb2Nlc3NWYWx1ZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9jZXNzVmFsdWVzKHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnZhbHVlcywgdGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0KVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubWVudS5xdWVyeVNlbGVjdG9yKFwidWxcIikuc2Nyb2xsVG9wID0gMFxuICAgIH1cblxuICAgIHNob3dNZW51Rm9yQ29sbGVjdGlvbihlbGVtZW50LCBjb2xsZWN0aW9uSW5kZXgpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMucGxhY2VDYXJldEF0RW5kKGVsZW1lbnQpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbiA9IHRoaXMuY29sbGVjdGlvbltjb2xsZWN0aW9uSW5kZXggfHwgMF1cbiAgICAgICAgdGhpcy5jdXJyZW50LmV4dGVybmFsVHJpZ2dlciA9IHRydWVcbiAgICAgICAgdGhpcy5jdXJyZW50LmVsZW1lbnQgPSBlbGVtZW50XG5cbiAgICAgICAgaWYgKGVsZW1lbnQuaXNDb250ZW50RWRpdGFibGUpXG4gICAgICAgICAgICB0aGlzLmluc2VydFRleHRBdEN1cnNvcih0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi50cmlnZ2VyKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmluc2VydEF0Q2FyZXQoZWxlbWVudCwgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24udHJpZ2dlcilcblxuICAgICAgICB0aGlzLnNob3dNZW51Rm9yKGVsZW1lbnQpXG4gICAgfVxuXG4gICAgLy8gVE9ETzogbWFrZSBzdXJlIHRoaXMgd29ya3MgZm9yIGlucHV0cy90ZXh0YXJlYXNcbiAgICBwbGFjZUNhcmV0QXRFbmQoZWwpIHtcbiAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuZ2V0U2VsZWN0aW9uICE9IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAmJiB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlUmFuZ2UgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhlbCk7XG4gICAgICAgICAgICByYW5nZS5jb2xsYXBzZShmYWxzZSk7XG4gICAgICAgICAgICB2YXIgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQuYm9keS5jcmVhdGVUZXh0UmFuZ2UgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdmFyIHRleHRSYW5nZSA9IGRvY3VtZW50LmJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICAgICAgICB0ZXh0UmFuZ2UubW92ZVRvRWxlbWVudFRleHQoZWwpO1xuICAgICAgICAgICAgdGV4dFJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcbiAgICAgICAgICAgIHRleHRSYW5nZS5zZWxlY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZvciBjb250ZW50ZWRpdGFibGVcbiAgICBpbnNlcnRUZXh0QXRDdXJzb3IodGV4dCkge1xuICAgICAgICB2YXIgc2VsLCByYW5nZSwgaHRtbDtcbiAgICAgICAgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICByYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApO1xuICAgICAgICByYW5nZS5kZWxldGVDb250ZW50cygpO1xuICAgICAgICB2YXIgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbiAgICAgICAgcmFuZ2UuaW5zZXJ0Tm9kZSh0ZXh0Tm9kZSk7XG4gICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyh0ZXh0Tm9kZSlcbiAgICAgICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpXG4gICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpXG4gICAgfVxuXG4gICAgLy8gZm9yIHJlZ3VsYXIgaW5wdXRzXG4gICAgaW5zZXJ0QXRDYXJldCh0ZXh0YXJlYSwgdGV4dCkge1xuICAgICAgICB2YXIgc2Nyb2xsUG9zID0gdGV4dGFyZWEuc2Nyb2xsVG9wO1xuICAgICAgICB2YXIgY2FyZXRQb3MgPSB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcblxuICAgICAgICB2YXIgZnJvbnQgPSAodGV4dGFyZWEudmFsdWUpLnN1YnN0cmluZygwLCBjYXJldFBvcyk7XG4gICAgICAgIHZhciBiYWNrID0gKHRleHRhcmVhLnZhbHVlKS5zdWJzdHJpbmcodGV4dGFyZWEuc2VsZWN0aW9uRW5kLCB0ZXh0YXJlYS52YWx1ZS5sZW5ndGgpO1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IGZyb250ICsgdGV4dCArIGJhY2s7XG4gICAgICAgIGNhcmV0UG9zID0gY2FyZXRQb3MgKyB0ZXh0Lmxlbmd0aDtcbiAgICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQgPSBjYXJldFBvcztcbiAgICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uRW5kID0gY2FyZXRQb3M7XG4gICAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICAgIHRleHRhcmVhLnNjcm9sbFRvcCA9IHNjcm9sbFBvcztcbiAgICB9XG5cbiAgICBoaWRlTWVudSgpIHtcbiAgICAgICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgICAgICAgdGhpcy5tZW51LnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTogbm9uZTsnXG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMubWVudVNlbGVjdGVkID0gMFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0ge31cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdEl0ZW1BdEluZGV4KGluZGV4LCBvcmlnaW5hbEV2ZW50KSB7XG4gICAgICAgIGluZGV4ID0gcGFyc2VJbnQoaW5kZXgpXG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInIHx8IGlzTmFOKGluZGV4KSkgcmV0dXJuXG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5jdXJyZW50LmZpbHRlcmVkSXRlbXNbaW5kZXhdXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uaXNWYWxpZFNlbGVjdGlvbiA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5pc1ZhbGlkU2VsZWN0aW9uKGl0ZW0sIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLmVkaXRvcikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5lZGl0b3IuZWwuZGlzcGF0Y2hFdmVudCh0aGlzLmludmFsaWRFdmVudClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uc2VsZWN0VGVtcGxhdGUoaXRlbSlcbiAgICAgICAgaWYgKGNvbnRlbnQgIT09IG51bGwpIHRoaXMucmVwbGFjZVRleHQoY29udGVudCwgb3JpZ2luYWxFdmVudCwgaXRlbSlcbiAgICB9XG5cbiAgICByZXBsYWNlVGV4dChjb250ZW50LCBvcmlnaW5hbEV2ZW50LCBpdGVtKSB7XG4gICAgICAgIHRoaXMucmFuZ2UucmVwbGFjZVRyaWdnZXJUZXh0KGNvbnRlbnQsIHRydWUsIHRydWUsIG9yaWdpbmFsRXZlbnQsIGl0ZW0pXG4gICAgfVxuXG4gICAgX2FwcGVuZChjb2xsZWN0aW9uLCBuZXdWYWx1ZXMsIHJlcGxhY2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uLnZhbHVlcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gYXBwZW5kIHRvIHZhbHVlcywgYXMgaXQgaXMgYSBmdW5jdGlvbi4nKVxuICAgICAgICB9IGVsc2UgaWYgKCFyZXBsYWNlKSB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnZhbHVlcyA9IGNvbGxlY3Rpb24udmFsdWVzLmNvbmNhdChuZXdWYWx1ZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnZhbHVlcyA9IG5ld1ZhbHVlc1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kKGNvbGxlY3Rpb25JbmRleCwgbmV3VmFsdWVzLCByZXBsYWNlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHBhcnNlSW50KGNvbGxlY3Rpb25JbmRleClcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHRocm93IG5ldyBFcnJvcigncGxlYXNlIHByb3ZpZGUgYW4gaW5kZXggZm9yIHRoZSBjb2xsZWN0aW9uIHRvIHVwZGF0ZS4nKVxuXG4gICAgICAgIGxldCBjb2xsZWN0aW9uID0gdGhpcy5jb2xsZWN0aW9uW2luZGV4XVxuXG4gICAgICAgIHRoaXMuX2FwcGVuZChjb2xsZWN0aW9uLCBuZXdWYWx1ZXMsIHJlcGxhY2UpXG4gICAgfVxuXG4gICAgYXBwZW5kQ3VycmVudChuZXdWYWx1ZXMsIHJlcGxhY2UpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2FwcGVuZCh0aGlzLmN1cnJlbnQuY29sbGVjdGlvbiwgbmV3VmFsdWVzLCByZXBsYWNlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBhY3RpdmUgc3RhdGUuIFBsZWFzZSB1c2UgYXBwZW5kIGluc3RlYWQgYW5kIHBhc3MgYW4gaW5kZXguJylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRldGFjaChlbCkge1xuICAgICAgICBpZiAoIWVsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tUcmlidXRlXSBNdXN0IHBhc3MgaW4gYSBET00gbm9kZSBvciBOb2RlTGlzdC4nKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgaXQgaXMgYSBqUXVlcnkgY29sbGVjdGlvblxuICAgICAgICBpZiAodHlwZW9mIGpRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiYgZWwgaW5zdGFuY2VvZiBqUXVlcnkpIHtcbiAgICAgICAgICAgIGVsID0gZWwuZ2V0KClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElzIGVsIGFuIEFycmF5L0FycmF5LWxpa2Ugb2JqZWN0P1xuICAgICAgICBpZiAoZWwuY29uc3RydWN0b3IgPT09IE5vZGVMaXN0IHx8IGVsLmNvbnN0cnVjdG9yID09PSBIVE1MQ29sbGVjdGlvbiB8fCBlbC5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSBlbC5sZW5ndGhcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXRhY2goZWxbaV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kZXRhY2goZWwpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZGV0YWNoKGVsKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnVuYmluZChlbClcbiAgICAgICAgaWYgKGVsLnRyaWJ1dGVNZW51KSB7XG4gICAgICAgICAgICB0aGlzLm1lbnVFdmVudHMudW5iaW5kKGVsLnRyaWJ1dGVNZW51KVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbENvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxDb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5zY3JvbGxFdmVudClcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyaWJ1dGUnKVxuICAgICAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICBpZiAoZWwudHJpYnV0ZU1lbnUpIHtcbiAgICAgICAgICAgICAgICBlbC50cmlidXRlTWVudS5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZTtcbiIsImNsYXNzIFRyaWJ1dGVFdmVudHMge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUuZXZlbnRzID0gdGhpc1xuICAgIH1cblxuICAgIHN0YXRpYyBrZXlzKCkge1xuICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgIGtleTogOSxcbiAgICAgICAgICAgIHZhbHVlOiAnVEFCJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDgsXG4gICAgICAgICAgICB2YWx1ZTogJ0RFTEVURSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAxMyxcbiAgICAgICAgICAgIHZhbHVlOiAnRU5URVInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogMjcsXG4gICAgICAgICAgICB2YWx1ZTogJ0VTQ0FQRSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAzMixcbiAgICAgICAgICAgIHZhbHVlOiAnU1BBQ0UnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogMzgsXG4gICAgICAgICAgICB2YWx1ZTogJ1VQJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDQwLFxuICAgICAgICAgICAgdmFsdWU6ICdET1dOJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDE4OCxcbiAgICAgICAgICAgIHZhbHVlOiAnQ09NTUEnXG4gICAgICAgIH1dXG4gICAgfVxuICAgIFxuICAgIHN0YXRpYyByZW1vdmUoZWxlbSkge1xuICAgICAgICBpZiAoZWxlbSAmJiBlbGVtLnJlbW92ZSkge1xuICAgICAgICAgICAgZWxlbS5yZW1vdmUoKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsZW0gJiYgIWVsZW0ucmVtb3ZlKSB7XG4gICAgICAgICAgICBlbGVtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmQoZWxlbWVudCwgZWRpdG9yKSB7XG4gICAgICAgIGVsZW1lbnQuYm91bmRLZXlkb3duID0gdGhpcy5rZXlkb3duLmJpbmQoZWxlbWVudCwgdGhpcywgZWRpdG9yKTtcbiAgICAgICAgZWxlbWVudC5ib3VuZEtleXVwID0gdGhpcy5rZXl1cC5iaW5kKGVsZW1lbnQsIHRoaXMsIGVkaXRvcik7XG4gICAgICAgIGVsZW1lbnQuYm91bmRJbnB1dCA9IHRoaXMuaW5wdXQuYmluZChlbGVtZW50LCB0aGlzLCBlZGl0b3IpO1xuXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsXG4gICAgICAgICAgICBlbGVtZW50LmJvdW5kS2V5ZG93biwgZmFsc2UpXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZEtleXVwLCBmYWxzZSlcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsXG4gICAgICAgICAgICBlbGVtZW50LmJvdW5kSW5wdXQsIGZhbHNlKVxuICAgIH1cblxuICAgIHVuYmluZChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsXG4gICAgICAgICAgICBlbGVtZW50LmJvdW5kS2V5ZG93biwgZmFsc2UpXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZEtleXVwLCBmYWxzZSlcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsXG4gICAgICAgICAgICBlbGVtZW50LmJvdW5kSW5wdXQsIGZhbHNlKVxuXG4gICAgICAgIGRlbGV0ZSBlbGVtZW50LmJvdW5kS2V5ZG93blxuICAgICAgICBkZWxldGUgZWxlbWVudC5ib3VuZEtleXVwXG4gICAgICAgIGRlbGV0ZSBlbGVtZW50LmJvdW5kSW5wdXRcbiAgICB9XG5cbiAgICBzY3JvbGwoaW5zdGFuY2UsIGUpIHtcbiAgICAgICAgaW5zdGFuY2UuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICBpbnN0YW5jZS5oaWRlTWVudSgpXG4gICAgfVxuXG4gICAga2V5ZG93bihpbnN0YW5jZSwgZWRpdG9yLCBldmVudCkge1xuICAgICAgICBpZiAoaW5zdGFuY2UudHJpYnV0ZS5pc0FjdGl2ZSAmJiBbMTYsIDE3LCAxOCwgMjBdLmluY2x1ZGVzKGV2ZW50LmtleUNvZGUpKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5zdGFuY2Uuc2hvdWxkRGVhY3RpdmF0ZShldmVudCkpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnRyaWJ1dGUuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgaW5zdGFuY2UudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXNcbiAgICAgICAgaW5zdGFuY2UuY29tbWFuZEV2ZW50ID0gZmFsc2VcblxuICAgICAgICBUcmlidXRlRXZlbnRzLmtleXMoKS5mb3JFYWNoKG8gPT4ge1xuICAgICAgICAgICAgaWYgKG8ua2V5ID09PSBldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY29tbWFuZEV2ZW50ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrcygpW28udmFsdWUudG9Mb3dlckNhc2UoKV0oZXZlbnQsIGVsZW1lbnQsIGVkaXRvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBpbnB1dChpbnN0YW5jZSwgZXZlbnQsIGVkaXRvcikge1xuICAgICAgICBpbnN0YW5jZS5pbnB1dEV2ZW50ID0gdHJ1ZVxuICAgICAgICBpbnN0YW5jZS5rZXl1cC5jYWxsKHRoaXMsIGluc3RhbmNlLCBldmVudCwgZWRpdG9yKVxuICAgIH1cblxuICAgIGNsaWNrKGluc3RhbmNlLCBldmVudCkge1xuICAgICAgICBsZXQgdHJpYnV0ZSA9IGluc3RhbmNlLnRyaWJ1dGVcbiAgICAgICAgaWYgKHRyaWJ1dGUubWVudSAmJiB0cmlidXRlLm1lbnUuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgPT09IFwiaGVhZGVyXCIgfHwgZXZlbnQudGFyZ2V0LnRhZ05hbWUgPT09IFwiVUxcIikge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGxpID0gZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICB3aGlsZSAobGkubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2xpJykge1xuICAgICAgICAgICAgICAgIGxpID0gbGkucGFyZW50Tm9kZVxuICAgICAgICAgICAgICAgIGlmICghbGkgfHwgbGkgPT09IHRyaWJ1dGUubWVudSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBmaW5kIHRoZSA8bGk+IGNvbnRhaW5lciBmb3IgdGhlIGNsaWNrJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cmlidXRlLnNlbGVjdEl0ZW1BdEluZGV4KGxpLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCBldmVudClcbiAgICAgICAgICAgIHRyaWJ1dGUuaGlkZU1lbnUoKVxuXG4gICAgICAgIC8vIFRPRE86IHNob3VsZCBmaXJlIHdpdGggZXh0ZXJuYWxUcmlnZ2VyIGFuZCB0YXJnZXQgaXMgb3V0c2lkZSBvZiBtZW51XG4gICAgICAgIH0gZWxzZSBpZiAodHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQgJiYgIXRyaWJ1dGUuY3VycmVudC5leHRlcm5hbFRyaWdnZXIpIHtcbiAgICAgICAgICAgIHRyaWJ1dGUuY3VycmVudC5leHRlcm5hbFRyaWdnZXIgPSBmYWxzZVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0cmlidXRlLmhpZGVNZW51KCkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBrZXl1cChpbnN0YW5jZSwgZWRpdG9yLCBldmVudCkge1xuICAgICAgICBpZiAoaW5zdGFuY2UudHJpYnV0ZS5pc0FjdGl2ZSAmJiBbMTYsIDE3LCAxOCwgMjBdLmluY2x1ZGVzKGV2ZW50LmtleUNvZGUpKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnN0YW5jZS5pbnB1dEV2ZW50KSB7XG4gICAgICAgICAgICBpbnN0YW5jZS5pbnB1dEV2ZW50ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZS51cGRhdGVTZWxlY3Rpb24odGhpcylcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSByZXR1cm5cblxuICAgICAgICBpZiAoZWRpdG9yICYmIGVkaXRvci5jaGFyQ291bnRlciAmJiBlZGl0b3IuY2hhckNvdW50ZXIuY291bnQoKSA9PT0gMCkge1xuICAgICAgICAgICAgaW5zdGFuY2UudHJpYnV0ZS5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICBpbnN0YW5jZS50cmlidXRlLmhpZGVNZW51KClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpbnN0YW5jZS50cmlidXRlLmFsbG93U3BhY2VzICYmIGluc3RhbmNlLnRyaWJ1dGUuaGFzVHJhaWxpbmdTcGFjZSkge1xuICAgICAgICAgICAgaW5zdGFuY2UudHJpYnV0ZS5oYXNUcmFpbGluZ1NwYWNlID0gZmFsc2U7XG4gICAgICAgICAgICBpbnN0YW5jZS5jb21tYW5kRXZlbnQgPSB0cnVlO1xuICAgICAgICAgICAgaW5zdGFuY2UuY2FsbGJhY2tzKClbXCJzcGFjZVwiXShldmVudCwgdGhpcyk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaW5zdGFuY2UudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgaWYgKGluc3RhbmNlLnRyaWJ1dGUuYXV0b2NvbXBsZXRlTW9kZSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrcygpLnRyaWdnZXJDaGFyKGV2ZW50LCB0aGlzLCAnJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleUNvZGUgPSBpbnN0YW5jZS5nZXRLZXlDb2RlKGluc3RhbmNlLCB0aGlzLCBldmVudClcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4oa2V5Q29kZSkgfHwgIWtleUNvZGUpIHJldHVyblxuICAgIFxuICAgICAgICAgICAgICAgIGxldCB0cmlnZ2VyID0gaW5zdGFuY2UudHJpYnV0ZS50cmlnZ2VycygpLmZpbmQodHJpZ2dlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cmlnZ2VyLmNoYXJDb2RlQXQoMCkgPT09IGtleUNvZGVcbiAgICAgICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuY2FsbGJhY2tzKCkudHJpZ2dlckNoYXIoZXZlbnQsIHRoaXMsIHRyaWdnZXIsIHRydWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChpbnN0YW5jZS50cmlidXRlLmN1cnJlbnQudHJpZ2dlciB8fCBpbnN0YW5jZS50cmlidXRlLmF1dG9jb21wbGV0ZU1vZGUpXG4gICAgICAgICAgICAmJiBpbnN0YW5jZS5jb21tYW5kRXZlbnQgPT09IGZhbHNlXG4gICAgICAgICAgICB8fCBpbnN0YW5jZS50cmlidXRlLmlzQWN0aXZlICYmIFs4LCA0Nl0uaW5jbHVkZXMoZXZlbnQua2V5Q29kZSkpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSA4MSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBpbnN0YW5jZS50cmlidXRlLnJhbmdlLmdldFRleHRQcmVjZWRpbmdDdXJyZW50U2VsZWN0aW9uKClcbiAgICAgICAgICAgICAgICBpZiAodGV4dC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLnRyaWJ1dGUuaGlkZU1lbnUoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UudHJpYnV0ZS5zaG93TWVudUZvcih0aGlzLCB0cnVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UudHJpYnV0ZS5zaG93TWVudUZvcih0aGlzLCB0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdWxkRGVhY3RpdmF0ZShldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5jdXJyZW50Lm1lbnRpb25UZXh0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgbGV0IGV2ZW50S2V5UHJlc3NlZCA9IGZhbHNlXG4gICAgICAgICAgICBUcmlidXRlRXZlbnRzLmtleXMoKS5mb3JFYWNoKG8gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBvLmtleSkgZXZlbnRLZXlQcmVzc2VkID0gdHJ1ZVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgcmV0dXJuICFldmVudEtleVByZXNzZWRcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGdldEtleUNvZGUoaW5zdGFuY2UsIGVsLCBldmVudCkge1xuICAgICAgICBsZXQgY2hhclxuICAgICAgICBsZXQgdHJpYnV0ZSA9IGluc3RhbmNlLnRyaWJ1dGVcbiAgICAgICAgbGV0IGluZm8gPSB0cmlidXRlLnJhbmdlLmdldFRyaWdnZXJJbmZvKGZhbHNlLCB0cmlidXRlLmhhc1RyYWlsaW5nU3BhY2UsIHRydWUsIHRyaWJ1dGUuYWxsb3dTcGFjZXMsIHRyaWJ1dGUuYXV0b2NvbXBsZXRlTW9kZSlcblxuICAgICAgICBpZiAoaW5mbykge1xuICAgICAgICAgICAgcmV0dXJuIGluZm8ubWVudGlvblRyaWdnZXJDaGFyLmNoYXJDb2RlQXQoMClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlU2VsZWN0aW9uKGVsKSB7XG4gICAgICAgIHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQgPSBlbFxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMudHJpYnV0ZS5yYW5nZS5nZXRUcmlnZ2VySW5mbyhmYWxzZSwgdGhpcy50cmlidXRlLmhhc1RyYWlsaW5nU3BhY2UsIHRydWUsIHRoaXMudHJpYnV0ZS5hbGxvd1NwYWNlcywgdGhpcy50cmlidXRlLmF1dG9jb21wbGV0ZU1vZGUpXG5cbiAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5jdXJyZW50LnNlbGVjdGVkUGF0aCA9IGluZm8ubWVudGlvblNlbGVjdGVkUGF0aFxuICAgICAgICAgICAgdGhpcy50cmlidXRlLmN1cnJlbnQubWVudGlvblRleHQgPSBpbmZvLm1lbnRpb25UZXh0XG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUuY3VycmVudC5zZWxlY3RlZE9mZnNldCA9IGluZm8ubWVudGlvblNlbGVjdGVkT2Zmc2V0XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxsYmFja3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0cmlnZ2VyQ2hhcjogKGUsIGVsLCB0cmlnZ2VyLCBzaG93TWVudSA9IGZhbHNlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IHRoaXMudHJpYnV0ZS5yYW5nZS5nZXRUZXh0UHJlY2VkaW5nQ3VycmVudFNlbGVjdGlvbigpXG4gICAgICAgICAgICAgICAgY29uc3Qgd29yZHMgPSB0ZXh0LnNwbGl0KC9cXHMvKVxuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RXb3JkID0gd29yZHNbd29yZHMubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgICAgICBpZiAobGFzdFdvcmQuc3BsaXQoJ0AnKS5sZW5ndGggLSAxID4gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsYXN0V29yZC50cmltKClbMF0gIT09ICdAJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHRyaWJ1dGUgPSB0aGlzLnRyaWJ1dGVcbiAgICAgICAgICAgICAgICB0cmlidXRlLmN1cnJlbnQudHJpZ2dlciA9IHRyaWdnZXJcblxuICAgICAgICAgICAgICAgIGxldCBjb2xsZWN0aW9uSXRlbSA9IHRyaWJ1dGUuY29sbGVjdGlvbi5maW5kKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS50cmlnZ2VyID09PSB0cmlnZ2VyXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHRyaWJ1dGUuY3VycmVudC5jb2xsZWN0aW9uID0gY29sbGVjdGlvbkl0ZW1cbiAgICAgICAgICAgICAgICBpZiAodHJpYnV0ZS5pbnB1dEV2ZW50IHx8IHNob3dNZW51KSB0cmlidXRlLnNob3dNZW51Rm9yKGVsLCB0cnVlKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudGVyOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjaG9vc2Ugc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSAmJiB0aGlzLnRyaWJ1dGUuY3VycmVudC5maWx0ZXJlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnNlbGVjdEl0ZW1BdEluZGV4KHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQsIGUpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaGlkZU1lbnUoKVxuICAgICAgICAgICAgICAgICAgICB9LCAwKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21tYTogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLnNlbGVjdFdpdGhDb21tYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3MoKS5lbnRlcihlLCBlbClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlc2NhcGU6IChlLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmhpZGVNZW51KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFiOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjaG9vc2UgZmlyc3QgbWF0Y2hcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrcygpLmVudGVyKGUsIGVsKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwYWNlOiAoZSwgZWwsIGVkaXRvcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5zcGFjZVNlbGVjdHNNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3MoKS5lbnRlcihlLCBlbClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy50cmlidXRlLmFsbG93U3BhY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaGlkZU1lbnUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy50cmlidXRlLnJhbmdlLmdldFRleHRQcmVjZWRpbmdDdXJyZW50U2VsZWN0aW9uKCkudHJpbSgpO1xuICAgICAgICAgICAgICAgIGlmICh0ZXh0Lmxhc3RJbmRleE9mKHRoaXMudHJpYnV0ZS5jdXJyZW50LnRyaWdnZXIpID09PSB0ZXh0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXA6IChlLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIG5hdmlnYXRlIHVwIHVsXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSAmJiB0aGlzLnRyaWJ1dGUuY3VycmVudC5maWx0ZXJlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmZpbHRlcmVkSXRlbXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID4gc2VsZWN0ZWQgJiYgc2VsZWN0ZWQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkLS1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlTGkoKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZCA9IGNvdW50IC0gMVxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlTGkoKVxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKS5zY3JvbGxUb3AgPSB0aGlzLnRyaWJ1dGUubWVudS5xdWVyeVNlbGVjdG9yKFwidWxcIikub2Zmc2V0SGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG93bjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gbmF2aWdhdGUgZG93biB1bFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUgJiYgdGhpcy50cmlidXRlLmN1cnJlbnQuZmlsdGVyZWRJdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICBsZXQgY291bnQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudC5maWx0ZXJlZEl0ZW1zLmxlbmd0aCAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWRcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPiBzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZCsrXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZUxpKClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQgPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZUxpKClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKS5zY3JvbGxUb3AgPSAwXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVsZXRlOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlICYmIHRoaXMudHJpYnV0ZS5jdXJyZW50Lm1lbnRpb25UZXh0Lmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmhpZGVNZW51KClcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuc2hvd01lbnVGb3IoZWwpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSB0aGlzLnRyaWJ1dGUucmFuZ2UuZ2V0VGV4dFByZWNlZGluZ0N1cnJlbnRTZWxlY3Rpb24oKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB3b3JkcyA9IHRleHQuc3BsaXQoXCIgXCIpXG4gICAgICAgICAgICAgICAgICAgIGlmICh3b3Jkc1t3b3Jkcy5sZW5ndGggLSAxXS5zcGxpdCgnQCcpLmxlbmd0aCAtIDEgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmRzW3dvcmRzLmxlbmd0aCAtIDFdLnRyaW0oKVswXSAhPT0gJ0AnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaW5wdXRFdmVudCA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3MoKS50cmlnZ2VyQ2hhcihlLCBlbCwgKHRoaXMudHJpYnV0ZS5jdXJyZW50LnRyaWdnZXIgfHwgXCJAXCIpLCB0cnVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEFjdGl2ZUxpKGluZGV4KSB7XG4gICAgICAgIGxldCBsaXMgPSB0aGlzLnRyaWJ1dGUubWVudS5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLFxuICAgICAgICAgICAgbGVuZ3RoID0gbGlzLmxlbmd0aCA+Pj4gMFxuXG4gICAgICAgIGlmIChpbmRleCkgdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZCA9IHBhcnNlSW50KGluZGV4KVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBsaSA9IGxpc1tpXVxuICAgICAgICAgICAgaWYgKGkgPT09IHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKHRoaXMudHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24uc2VsZWN0Q2xhc3MpXG5cbiAgICAgICAgICAgICAgICBsZXQgbGlDbGllbnRSZWN0ID0gbGkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICBsZXQgbWVudUNsaWVudFJlY3QgPSB0aGlzLnRyaWJ1dGUubWVudS5xdWVyeVNlbGVjdG9yKFwidWxcIikuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgICAgICAgICAgICAgIGlmIChsaUNsaWVudFJlY3QuYm90dG9tID4gbWVudUNsaWVudFJlY3QuYm90dG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGxEaXN0YW5jZSA9IGxpQ2xpZW50UmVjdC5ib3R0b20gLSBtZW51Q2xpZW50UmVjdC5ib3R0b21cbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUucXVlcnlTZWxlY3RvcihcInVsXCIpLnNjcm9sbFRvcCArPSBzY3JvbGxEaXN0YW5jZVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGlDbGllbnRSZWN0LnRvcCA8IG1lbnVDbGllbnRSZWN0LnRvcCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsRGlzdGFuY2UgPSBtZW51Q2xpZW50UmVjdC50b3AgLSBsaUNsaWVudFJlY3QudG9wXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKS5zY3JvbGxUb3AgLT0gc2Nyb2xsRGlzdGFuY2VcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnRyaWJ1dGUuY3VycmVudC5jb2xsZWN0aW9uLnNlbGVjdENsYXNzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RnVsbEhlaWdodChlbGVtLCBpbmNsdWRlTWFyZ2luKSB7XG4gICAgICBsZXQgaGVpZ2h0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcblxuICAgICAgaWYgKGluY2x1ZGVNYXJnaW4pIHtcbiAgICAgICAgbGV0IHN0eWxlID0gZWxlbS5jdXJyZW50U3R5bGUgfHwgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbSlcbiAgICAgICAgcmV0dXJuIGhlaWdodCArIHBhcnNlRmxvYXQoc3R5bGUubWFyZ2luVG9wKSArIHBhcnNlRmxvYXQoc3R5bGUubWFyZ2luQm90dG9tKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGVpZ2h0XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlRXZlbnRzO1xuIiwiY2xhc3MgVHJpYnV0ZU1lbnVFdmVudHMge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUubWVudUV2ZW50cyA9IHRoaXNcbiAgICAgICAgdGhpcy5tZW51ID0gdGhpcy50cmlidXRlLm1lbnVcbiAgICB9XG5cbiAgICBiaW5kKG1lbnUpIHtcbiAgICAgICAgdGhpcy5tZW51Q2xpY2tFdmVudCA9IHRoaXMudHJpYnV0ZS5ldmVudHMuY2xpY2suYmluZChudWxsLCB0aGlzKVxuICAgICAgICB0aGlzLm1lbnVDb250YWluZXJTY3JvbGxFdmVudCA9IHRoaXMuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5zaG93TWVudUZvcih0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50LCBmYWxzZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMzAwLCBmYWxzZSlcbiAgICAgICAgdGhpcy53aW5kb3dSZXNpemVFdmVudCA9IHRoaXMuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5yYW5nZS5wb3NpdGlvbk1lbnVBdENhcmV0KHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDMwMCwgZmFsc2UpXG5cbiAgICAgICAgLy8gZml4ZXMgSUUxMSBpc3N1ZXMgd2l0aCBtb3VzZWRvd25cbiAgICAgICAgdGhpcy50cmlidXRlLnJhbmdlLmdldERvY3VtZW50KCkuYWRkRXZlbnRMaXN0ZW5lcignTVNQb2ludGVyRG93bicsXG4gICAgICAgICAgICB0aGlzLm1lbnVDbGlja0V2ZW50LCBmYWxzZSlcbiAgICAgICAgdGhpcy50cmlidXRlLnJhbmdlLmdldERvY3VtZW50KCkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJyxcbiAgICAgICAgICAgIHRoaXMubWVudUNsaWNrRXZlbnQsIGZhbHNlKVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy53aW5kb3dSZXNpemVFdmVudClcblxuICAgICAgICBpZiAodGhpcy5tZW51Q29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnVDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5tZW51Q29udGFpbmVyU2Nyb2xsRXZlbnQsIGZhbHNlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMubWVudUNvbnRhaW5lclNjcm9sbEV2ZW50KVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICB1bmJpbmQobWVudSkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UuZ2V0RG9jdW1lbnQoKS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLFxuICAgICAgICAgICAgdGhpcy5tZW51Q2xpY2tFdmVudCwgZmFsc2UpXG4gICAgICAgIHRoaXMudHJpYnV0ZS5yYW5nZS5nZXREb2N1bWVudCgpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ01TUG9pbnRlckRvd24nLFxuICAgICAgICAgICAgdGhpcy5tZW51Q2xpY2tFdmVudCwgZmFsc2UpXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLndpbmRvd1Jlc2l6ZUV2ZW50KVxuXG4gICAgICAgIGlmICh0aGlzLm1lbnVDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWVudUNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm1lbnVDb250YWluZXJTY3JvbGxFdmVudCwgZmFsc2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5tZW51Q29udGFpbmVyU2Nyb2xsRXZlbnQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWJvdW5jZShmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICAgICAgdmFyIHRpbWVvdXRcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcyxcbiAgICAgICAgICAgICAgICBhcmdzID0gYXJndW1lbnRzXG4gICAgICAgICAgICB2YXIgbGF0ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGxcbiAgICAgICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXRcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KVxuICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpXG4gICAgICAgICAgICBpZiAoY2FsbE5vdykgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGVNZW51RXZlbnRzO1xuIiwiLy8gVGhhbmtzIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9qZWZmLWNvbGxpbnMvbWVudC5pb1xuY2xhc3MgVHJpYnV0ZVJhbmdlIHtcbiAgICBjb25zdHJ1Y3Rvcih0cmlidXRlKSB7XG4gICAgICAgIHRoaXMudHJpYnV0ZSA9IHRyaWJ1dGVcbiAgICAgICAgdGhpcy50cmlidXRlLnJhbmdlID0gdGhpc1xuICAgIH1cblxuICAgIGdldERvY3VtZW50KCkge1xuICAgICAgICBsZXQgaWZyYW1lXG4gICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuY3VycmVudC5jb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICBpZnJhbWUgPSB0aGlzLnRyaWJ1dGUuY3VycmVudC5jb2xsZWN0aW9uLmlmcmFtZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpZnJhbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50XG4gICAgfVxuXG4gICAgcG9zaXRpb25NZW51QXRDYXJldChzY3JvbGxUbykge1xuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LFxuICAgICAgICAgICAgY29vcmRpbmF0ZXNcblxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0VHJpZ2dlckluZm8oZmFsc2UsIHRoaXMudHJpYnV0ZS5oYXNUcmFpbGluZ1NwYWNlLCB0cnVlLCB0aGlzLnRyaWJ1dGUuYWxsb3dTcGFjZXMsIHRoaXMudHJpYnV0ZS5hdXRvY29tcGxldGVNb2RlKVxuXG4gICAgICAgIGlmICh0eXBlb2YgaW5mbyAhPT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgaWYoIXRoaXMudHJpYnV0ZS5wb3NpdGlvbk1lbnUpe1xuICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnN0eWxlLmNzc1RleHQgPSBgZGlzcGxheTogYmxvY2s7YFxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNDb250ZW50RWRpdGFibGUoY29udGV4dC5lbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzID0gdGhpcy5nZXRUZXh0QXJlYU9ySW5wdXRVbmRlcmxpbmVQb3NpdGlvbih0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBpbmZvLm1lbnRpb25Qb3NpdGlvbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzID0gdGhpcy5nZXRDb250ZW50RWRpdGFibGVDYXJldFBvc2l0aW9uKGluZm8ubWVudGlvblBvc2l0aW9uKVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnN0eWxlLmNzc1RleHQgPSBgdG9wOiAke2Nvb3JkaW5hdGVzLnRvcH1weDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAke2Nvb3JkaW5hdGVzLmxlZnR9cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICR7Y29vcmRpbmF0ZXMucmlnaHR9cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAke2Nvb3JkaW5hdGVzLmJvdHRvbX1weDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei1pbmRleDogMTAwMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7YFxuXG4gICAgICAgICAgICBpZiAoY29vcmRpbmF0ZXMubGVmdCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUubGVmdCA9ICdhdXRvJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29vcmRpbmF0ZXMudG9wID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS50b3AgPSAnYXV0bydcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNjcm9sbFRvKSB0aGlzLnNjcm9sbEludG9WaWV3KClcblxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBtZW51RGltZW5zaW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy50cmlidXRlLm1lbnUub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnRyaWJ1dGUubWVudS5vZmZzZXRIZWlnaHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IG1lbnVJc09mZlNjcmVlbiA9IHRoaXMuaXNNZW51T2ZmU2NyZWVuKGNvb3JkaW5hdGVzLCBtZW51RGltZW5zaW9ucylcblxuICAgICAgICAgICAgICAgIGxldCBtZW51SXNPZmZTY3JlZW5Ib3Jpem9udGFsbHkgPSB3aW5kb3cuaW5uZXJXaWR0aCA+IG1lbnVEaW1lbnNpb25zLndpZHRoICYmIChtZW51SXNPZmZTY3JlZW4ubGVmdCB8fCBtZW51SXNPZmZTY3JlZW4ucmlnaHQpXG4gICAgICAgICAgICAgICAgbGV0IG1lbnVJc09mZlNjcmVlblZlcnRpY2FsbHkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPiBtZW51RGltZW5zaW9ucy5oZWlnaHQgJiYgKG1lbnVJc09mZlNjcmVlbi50b3AgfHwgbWVudUlzT2ZmU2NyZWVuLmJvdHRvbSlcbiAgICAgICAgICAgICAgICBpZiAobWVudUlzT2ZmU2NyZWVuSG9yaXpvbnRhbGx5IHx8IG1lbnVJc09mZlNjcmVlblZlcnRpY2FsbHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5OiBub25lJ1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uTWVudUF0Q2FyZXQoc2Nyb2xsVG8pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMClcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5OiBub25lJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0RWxlbWVudCh0YXJnZXRFbGVtZW50LCBwYXRoLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IHJhbmdlXG4gICAgICAgIGxldCBlbGVtID0gdGFyZ2V0RWxlbWVudFxuXG4gICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBlbGVtID0gZWxlbS5jaGlsZE5vZGVzW3BhdGhbaV1dXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVsZW0ubGVuZ3RoIDwgb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCAtPSBlbGVtLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICBlbGVtID0gZWxlbS5uZXh0U2libGluZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMCAmJiAhZWxlbS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbSA9IGVsZW0ucHJldmlvdXNTaWJsaW5nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBzZWwgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpXG5cbiAgICAgICAgcmFuZ2UgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlUmFuZ2UoKVxuICAgICAgICByYW5nZS5zZXRTdGFydChlbGVtLCBvZmZzZXQpXG4gICAgICAgIHJhbmdlLnNldEVuZChlbGVtLCBvZmZzZXQpXG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge31cblxuICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpXG4gICAgICAgIHRhcmdldEVsZW1lbnQuZm9jdXMoKVxuICAgIH1cblxuICAgIHJlcGxhY2VUcmlnZ2VyVGV4dCh0ZXh0LCByZXF1aXJlTGVhZGluZ1NwYWNlLCBoYXNUcmFpbGluZ1NwYWNlLCBvcmlnaW5hbEV2ZW50LCBpdGVtKSB7XG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5nZXRUcmlnZ2VySW5mbyh0cnVlLCBoYXNUcmFpbGluZ1NwYWNlLCByZXF1aXJlTGVhZGluZ1NwYWNlLCB0aGlzLnRyaWJ1dGUuYWxsb3dTcGFjZXMsIHRoaXMudHJpYnV0ZS5hdXRvY29tcGxldGVNb2RlKVxuXG4gICAgICAgIGlmIChpbmZvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy50cmlidXRlLmN1cnJlbnRcbiAgICAgICAgICAgIGxldCByZXBsYWNlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3RyaWJ1dGUtcmVwbGFjZWQnLCB7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlOiBjb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBpbmZvLFxuICAgICAgICAgICAgICAgICAgICBldmVudDogb3JpZ2luYWxFdmVudCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNDb250ZW50RWRpdGFibGUoY29udGV4dC5lbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIGxldCBteUZpZWxkID0gdGhpcy50cmlidXRlLmN1cnJlbnQuZWxlbWVudFxuICAgICAgICAgICAgICAgIGxldCB0ZXh0U3VmZml4ID0gdHlwZW9mIHRoaXMudHJpYnV0ZS5yZXBsYWNlVGV4dFN1ZmZpeCA9PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICA/IHRoaXMudHJpYnV0ZS5yZXBsYWNlVGV4dFN1ZmZpeFxuICAgICAgICAgICAgICAgICAgICA6ICcgJ1xuICAgICAgICAgICAgICAgIHRleHQgKz0gdGV4dFN1ZmZpeFxuICAgICAgICAgICAgICAgIGxldCBzdGFydFBvcyA9IGluZm8ubWVudGlvblBvc2l0aW9uXG4gICAgICAgICAgICAgICAgbGV0IGVuZFBvcyA9IGluZm8ubWVudGlvblBvc2l0aW9uICsgaW5mby5tZW50aW9uVGV4dC5sZW5ndGggKyB0ZXh0U3VmZml4Lmxlbmd0aFxuICAgICAgICAgICAgICAgIG15RmllbGQudmFsdWUgPSBteUZpZWxkLnZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcykgKyB0ZXh0ICtcbiAgICAgICAgICAgICAgICAgICAgbXlGaWVsZC52YWx1ZS5zdWJzdHJpbmcoZW5kUG9zLCBteUZpZWxkLnZhbHVlLmxlbmd0aClcbiAgICAgICAgICAgICAgICBteUZpZWxkLnNlbGVjdGlvblN0YXJ0ID0gc3RhcnRQb3MgKyB0ZXh0Lmxlbmd0aFxuICAgICAgICAgICAgICAgIG15RmllbGQuc2VsZWN0aW9uRW5kID0gc3RhcnRQb3MgKyB0ZXh0Lmxlbmd0aFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgYSBzcGFjZSB0byB0aGUgZW5kIG9mIHRoZSBwYXN0ZWQgdGV4dFxuICAgICAgICAgICAgICAgIGxldCB0ZXh0U3VmZml4ID0gdHlwZW9mIHRoaXMudHJpYnV0ZS5yZXBsYWNlVGV4dFN1ZmZpeCA9PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICA/IHRoaXMudHJpYnV0ZS5yZXBsYWNlVGV4dFN1ZmZpeFxuICAgICAgICAgICAgICAgICAgICA6ICdcXHhBMCdcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxFdmVudC5rZXlDb2RlID09PSAxODgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dFN1ZmZpeCA9IFwiLFwiICsgdGV4dFN1ZmZpeFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0ZXh0ICs9IHRleHRTdWZmaXhcbiAgICAgICAgICAgICAgICB0aGlzLnBhc3RlSHRtbCh0ZXh0LCBpbmZvLm1lbnRpb25Qb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgaW5mby5tZW50aW9uUG9zaXRpb24gKyBpbmZvLm1lbnRpb25UZXh0Lmxlbmd0aCArICF0aGlzLnRyaWJ1dGUuYXV0b2NvbXBsZXRlTW9kZSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udGV4dC5lbGVtZW50LmRpc3BhdGNoRXZlbnQocmVwbGFjZUV2ZW50KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGFzdGVIdG1sKGh0bWwsIHN0YXJ0UG9zLCBlbmRQb3MpIHtcbiAgICAgICAgbGV0IHJhbmdlLCBzZWwsIHNlbEVsXG4gICAgICAgIHNlbCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKClcbiAgICAgICAgY29uc3QgeyBhbmNob3JPZmZzZXQsIGFuY2hvck5vZGUgfSA9IHNlbDtcbiAgICAgICAgaWYgKGFuY2hvck5vZGUuY2hpbGROb2RlcyAmJiBhbmNob3JOb2RlLmNoaWxkTm9kZXNbYW5jaG9yT2Zmc2V0XSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBhbmNob3JOb2RlLmNoaWxkTm9kZXNbYW5jaG9yT2Zmc2V0XVxuICAgICAgICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgICAgICAgICAgIHNlbEVsID0gY2hpbGRcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5jaG9yT2Zmc2V0ID4gMCAmJiBjaGlsZC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICBzZWxFbCA9IGFuY2hvck5vZGUuY2hpbGROb2Rlc1thbmNob3JPZmZzZXQgLSAxXVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsRWwgPSBzZWwuYW5jaG9yTm9kZVxuICAgICAgICB9XG4gICAgICAgIHJhbmdlID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZVJhbmdlKClcbiAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoc2VsRWwsIHN0YXJ0UG9zKVxuICAgICAgICByYW5nZS5zZXRFbmQoc2VsRWwsIGVuZFBvcylcbiAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKVxuXG4gICAgICAgIGxldCBlbCA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBlbC5pbm5lckhUTUwgPSBodG1sXG4gICAgICAgIGxldCBmcmFnID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcbiAgICAgICAgICAgIG5vZGUsIGxhc3ROb2RlXG4gICAgICAgIHdoaWxlICgobm9kZSA9IGVsLmZpcnN0Q2hpbGQpKSB7XG4gICAgICAgICAgICBsYXN0Tm9kZSA9IGZyYWcuYXBwZW5kQ2hpbGQobm9kZSlcbiAgICAgICAgfVxuICAgICAgICByYW5nZS5pbnNlcnROb2RlKGZyYWcpXG5cbiAgICAgICAgLy8gUHJlc2VydmUgdGhlIHNlbGVjdGlvblxuICAgICAgICBpZiAobGFzdE5vZGUpIHtcbiAgICAgICAgICAgIHJhbmdlID0gcmFuZ2UuY2xvbmVSYW5nZSgpXG4gICAgICAgICAgICByYW5nZS5zZXRTdGFydEFmdGVyKGxhc3ROb2RlKVxuICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSlcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0V2luZG93U2VsZWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy50cmlidXRlLmNvbGxlY3Rpb24uaWZyYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmlidXRlLmNvbGxlY3Rpb24uaWZyYW1lLmNvbnRlbnRXaW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB3aW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICB9XG5cbiAgICBnZXROb2RlUG9zaXRpb25JblBhcmVudChlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAwXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZE5vZGVzW2ldXG5cbiAgICAgICAgICAgIGlmIChub2RlID09PSBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENvbnRlbnRFZGl0YWJsZVNlbGVjdGVkUGF0aChjdHgpIHtcbiAgICAgICAgbGV0IHNlbCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKClcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gc2VsLmFuY2hvck5vZGVcbiAgICAgICAgbGV0IHBhdGggPSBbXVxuICAgICAgICBsZXQgb2Zmc2V0XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBpXG4gICAgICAgICAgICBsZXQgY2UgPSBzZWxlY3RlZC5jb250ZW50RWRpdGFibGVcbiAgICAgICAgICAgIHdoaWxlIChzZWxlY3RlZCAhPT0gbnVsbCAmJiBjZSAhPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgaSA9IHRoaXMuZ2V0Tm9kZVBvc2l0aW9uSW5QYXJlbnQoc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgcGF0aC5wdXNoKGkpXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3RlZC5wYXJlbnROb2RlXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlID0gc2VsZWN0ZWQuY29udGVudEVkaXRhYmxlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF0aC5yZXZlcnNlKClcblxuICAgICAgICAgICAgLy8gZ2V0UmFuZ2VBdCBtYXkgbm90IGV4aXN0LCBuZWVkIGFsdGVybmF0aXZlXG4gICAgICAgICAgICBvZmZzZXQgPSBzZWwuZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldFxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZCxcbiAgICAgICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUZXh0UHJlY2VkaW5nQ3VycmVudFNlbGVjdGlvbigpIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudCxcbiAgICAgICAgICAgIHRleHQgPSAnJ1xuXG4gICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZShjb250ZXh0LmVsZW1lbnQpKSB7XG4gICAgICAgICAgICBsZXQgdGV4dENvbXBvbmVudCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAodGV4dENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGxldCBzdGFydFBvcyA9IHRleHRDb21wb25lbnQuc2VsZWN0aW9uU3RhcnRcbiAgICAgICAgICAgICAgICBpZiAodGV4dENvbXBvbmVudC52YWx1ZSAmJiBzdGFydFBvcyA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0Q29tcG9uZW50LnZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEVsZW0gPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpLmFuY2hvck5vZGVcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkRWxlbSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYW5jaG9yT2Zmc2V0ID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKS5hbmNob3JPZmZzZXQ7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkRWxlbS5jaGlsZE5vZGVzICYmIHNlbGVjdGVkRWxlbS5jaGlsZE5vZGVzW2FuY2hvck9mZnNldF0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBzZWxlY3RlZEVsZW0uY2hpbGROb2Rlc1thbmNob3JPZmZzZXRdXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZC5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBjaGlsZC50ZXh0Q29udGVudFxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFuY2hvck9mZnNldCA+IDAgJiYgY2hpbGQubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IHNlbGVjdGVkRWxlbS5jaGlsZE5vZGVzW2FuY2hvck9mZnNldCAtIDFdLnRleHRDb250ZW50XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgd29ya2luZ05vZGVDb250ZW50ID0gc2VsZWN0ZWRFbGVtLnRleHRDb250ZW50XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RTdGFydE9mZnNldCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldFxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh3b3JraW5nTm9kZUNvbnRlbnQgJiYgc2VsZWN0U3RhcnRPZmZzZXQgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHdvcmtpbmdOb2RlQ29udGVudC5zdWJzdHJpbmcoMCwgc2VsZWN0U3RhcnRPZmZzZXQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRleHRcbiAgICB9XG5cbiAgICBnZXRMYXN0V29yZEluVGV4dCh0ZXh0KSB7XG4gICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcdTAwQTAvZywgJyAnKTsgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjk4NTA0MDcvaG93LWRvLWktcmVwbGFjZS11bmljb2RlLWNoYXJhY3Rlci11MDBhMC13aXRoLWEtc3BhY2UtaW4tamF2YXNjcmlwdFxuICAgICAgICBsZXQgd29yZHNBcnJheSA9IHRleHQuc3BsaXQoJyAnKVxuICAgICAgICBsZXQgd29ybGRzQ291bnQgPSB3b3Jkc0FycmF5Lmxlbmd0aCAtIDFcbiAgICAgICAgcmV0dXJuIHdvcmRzQXJyYXlbd29ybGRzQ291bnRdLnRyaW0oKVxuICAgIH1cblxuICAgIGdldFRyaWdnZXJJbmZvKG1lbnVBbHJlYWR5QWN0aXZlLCBoYXNUcmFpbGluZ1NwYWNlLCByZXF1aXJlTGVhZGluZ1NwYWNlLCBhbGxvd1NwYWNlcywgaXNBdXRvY29tcGxldGUpIHtcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50XG4gICAgICAgIGxldCBzZWxlY3RlZCwgcGF0aCwgb2Zmc2V0XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVkaXRhYmxlKGN0eC5lbGVtZW50KSkge1xuICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uSW5mbyA9IHRoaXMuZ2V0Q29udGVudEVkaXRhYmxlU2VsZWN0ZWRQYXRoKGN0eClcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbkluZm8pIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHNlbGVjdGlvbkluZm8uc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICBwYXRoID0gc2VsZWN0aW9uSW5mby5wYXRoXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gc2VsZWN0aW9uSW5mby5vZmZzZXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlZmZlY3RpdmVSYW5nZSA9IHRoaXMuZ2V0VGV4dFByZWNlZGluZ0N1cnJlbnRTZWxlY3Rpb24oKVxuICAgICAgICBsZXQgbGFzdFdvcmRPZkVmZmVjdGl2ZVJhbmdlID0gdGhpcy5nZXRMYXN0V29yZEluVGV4dChlZmZlY3RpdmVSYW5nZSlcblxuICAgICAgICBpZiAoaXNBdXRvY29tcGxldGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbWVudGlvblBvc2l0aW9uOiBlZmZlY3RpdmVSYW5nZS5sZW5ndGggLSBsYXN0V29yZE9mRWZmZWN0aXZlUmFuZ2UubGVuZ3RoLFxuICAgICAgICAgICAgICAgIG1lbnRpb25UZXh0OiBsYXN0V29yZE9mRWZmZWN0aXZlUmFuZ2UsXG4gICAgICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkRWxlbWVudDogc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkUGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgICBtZW50aW9uU2VsZWN0ZWRPZmZzZXQ6IG9mZnNldFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVmZmVjdGl2ZVJhbmdlICE9PSB1bmRlZmluZWQgJiYgZWZmZWN0aXZlUmFuZ2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgPSAtMVxuICAgICAgICAgICAgbGV0IHRyaWdnZXJDaGFyXG5cbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5jb2xsZWN0aW9uLmZvckVhY2goY29uZmlnID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYyA9IGNvbmZpZy50cmlnZ2VyXG4gICAgICAgICAgICAgICAgbGV0IGlkeCA9IGNvbmZpZy5yZXF1aXJlTGVhZGluZ1NwYWNlID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0SW5kZXhXaXRoTGVhZGluZ1NwYWNlKGVmZmVjdGl2ZVJhbmdlLCBjKSA6XG4gICAgICAgICAgICAgICAgICAgIGVmZmVjdGl2ZVJhbmdlLmxhc3RJbmRleE9mKGMpXG5cbiAgICAgICAgICAgICAgICBpZiAoaWR4ID4gbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyA9IGlkeFxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyQ2hhciA9IGNcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZUxlYWRpbmdTcGFjZSA9IGNvbmZpZy5yZXF1aXJlTGVhZGluZ1NwYWNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyA+PSAwICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgPT09IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgIXJlcXVpcmVMZWFkaW5nU3BhY2UgfHxcbiAgICAgICAgICAgICAgICAgICAgL1tcXHhBMFxcc10vZy50ZXN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgZWZmZWN0aXZlUmFuZ2Uuc3Vic3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRUcmlnZ2VyU25pcHBldCA9IGVmZmVjdGl2ZVJhbmdlLnN1YnN0cmluZyhtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgKyAxLFxuICAgICAgICAgICAgICAgICAgICBlZmZlY3RpdmVSYW5nZS5sZW5ndGgpXG5cbiAgICAgICAgICAgICAgICB0cmlnZ2VyQ2hhciA9IGVmZmVjdGl2ZVJhbmdlLnN1YnN0cmluZyhtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MsIG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyArIDEpXG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0U25pcHBldENoYXIgPSBjdXJyZW50VHJpZ2dlclNuaXBwZXQuc3Vic3RyaW5nKDAsIDEpXG4gICAgICAgICAgICAgICAgbGV0IGxlYWRpbmdTcGFjZSA9IGN1cnJlbnRUcmlnZ2VyU25pcHBldC5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0U25pcHBldENoYXIgPT09ICcgJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RTbmlwcGV0Q2hhciA9PT0gJ1xceEEwJ1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgaWYgKGhhc1RyYWlsaW5nU3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRyaWdnZXJTbmlwcGV0ID0gY3VycmVudFRyaWdnZXJTbmlwcGV0LnRyaW0oKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCByZWdleCA9IGFsbG93U3BhY2VzID8gL1teXFxTIF0vZyA6IC9bXFx4QTBcXHNdL2c7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaGFzVHJhaWxpbmdTcGFjZSA9IHJlZ2V4LnRlc3QoY3VycmVudFRyaWdnZXJTbmlwcGV0KTtcblxuICAgICAgICAgICAgICAgIGlmICghbGVhZGluZ1NwYWNlICYmIChtZW51QWxyZWFkeUFjdGl2ZSB8fCAhKHJlZ2V4LnRlc3QoY3VycmVudFRyaWdnZXJTbmlwcGV0KSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uUG9zaXRpb246IG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25UZXh0OiBjdXJyZW50VHJpZ2dlclNuaXBwZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uU2VsZWN0ZWRFbGVtZW50OiBzZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25TZWxlY3RlZFBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uU2VsZWN0ZWRPZmZzZXQ6IG9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25UcmlnZ2VyQ2hhcjogdHJpZ2dlckNoYXJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJbmRleFdpdGhMZWFkaW5nU3BhY2UgKHN0ciwgY2hhcikge1xuICAgICAgICBsZXQgcmV2ZXJzZWRTdHIgPSBzdHIuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKVxuICAgICAgICBsZXQgaW5kZXggPSAtMVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY2lkeCA9IDAsIGxlbiA9IHN0ci5sZW5ndGg7IGNpZHggPCBsZW47IGNpZHgrKykge1xuICAgICAgICAgICAgbGV0IGZpcnN0Q2hhciA9IGNpZHggPT09IHN0ci5sZW5ndGggLSAxXG4gICAgICAgICAgICBsZXQgbGVhZGluZ1NwYWNlID0gL1xccy8udGVzdChyZXZlcnNlZFN0cltjaWR4ICsgMV0pXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBjaGFyID09PSByZXZlcnNlZFN0cltjaWR4XVxuXG4gICAgICAgICAgICBpZiAobWF0Y2ggJiYgKGZpcnN0Q2hhciB8fCBsZWFkaW5nU3BhY2UpKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBzdHIubGVuZ3RoIC0gMSAtIGNpZHhcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuXG4gICAgaXNDb250ZW50RWRpdGFibGUoZWxlbWVudCkge1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbGVtZW50Lm5vZGVOYW1lICE9PSAnSU5QVVQnICYmIGVsZW1lbnQubm9kZU5hbWUgIT09ICdURVhUQVJFQSdcbiAgICB9XG5cbiAgICBpc01lbnVPZmZTY3JlZW4oY29vcmRpbmF0ZXMsIG1lbnVEaW1lbnNpb25zKSB7XG4gICAgICAgIGxldCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgIGxldCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgbGV0IGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICAgICAgICBsZXQgd2luZG93TGVmdCA9ICh3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jLnNjcm9sbExlZnQpIC0gKGRvYy5jbGllbnRMZWZ0IHx8IDApXG4gICAgICAgIGxldCB3aW5kb3dUb3AgPSAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3ApIC0gKGRvYy5jbGllbnRUb3AgfHwgMClcblxuICAgICAgICBsZXQgbWVudVRvcCA9IHR5cGVvZiBjb29yZGluYXRlcy50b3AgPT09ICdudW1iZXInID8gY29vcmRpbmF0ZXMudG9wIDogd2luZG93VG9wICsgd2luZG93SGVpZ2h0IC0gY29vcmRpbmF0ZXMuYm90dG9tIC0gbWVudURpbWVuc2lvbnMuaGVpZ2h0XG4gICAgICAgIGxldCBtZW51UmlnaHQgPSB0eXBlb2YgY29vcmRpbmF0ZXMucmlnaHQgPT09ICdudW1iZXInID8gY29vcmRpbmF0ZXMucmlnaHQgOiBjb29yZGluYXRlcy5sZWZ0ICsgbWVudURpbWVuc2lvbnMud2lkdGhcbiAgICAgICAgbGV0IG1lbnVCb3R0b20gPSB0eXBlb2YgY29vcmRpbmF0ZXMuYm90dG9tID09PSAnbnVtYmVyJyA/IGNvb3JkaW5hdGVzLmJvdHRvbSA6IGNvb3JkaW5hdGVzLnRvcCArIG1lbnVEaW1lbnNpb25zLmhlaWdodFxuICAgICAgICBsZXQgbWVudUxlZnQgPSB0eXBlb2YgY29vcmRpbmF0ZXMubGVmdCA9PT0gJ251bWJlcicgPyBjb29yZGluYXRlcy5sZWZ0IDogd2luZG93TGVmdCArIHdpbmRvd1dpZHRoIC0gY29vcmRpbmF0ZXMucmlnaHQgLSBtZW51RGltZW5zaW9ucy53aWR0aFxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3A6IG1lbnVUb3AgPCBNYXRoLmZsb29yKHdpbmRvd1RvcCksXG4gICAgICAgICAgICByaWdodDogbWVudVJpZ2h0ID4gTWF0aC5jZWlsKHdpbmRvd0xlZnQgKyB3aW5kb3dXaWR0aCksXG4gICAgICAgICAgICBib3R0b206IG1lbnVCb3R0b20gPiBNYXRoLmNlaWwod2luZG93VG9wICsgd2luZG93SGVpZ2h0KSxcbiAgICAgICAgICAgIGxlZnQ6IG1lbnVMZWZ0IDwgTWF0aC5mbG9vcih3aW5kb3dMZWZ0KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TWVudURpbWVuc2lvbnMoKSB7XG4gICAgICAgIC8vIFdpZHRoIG9mIHRoZSBtZW51IGRlcGVuZHMgb2YgaXRzIGNvbnRlbnRzIGFuZCBwb3NpdGlvblxuICAgICAgICAvLyBXZSBtdXN0IGNoZWNrIHdoYXQgaXRzIHdpZHRoIHdvdWxkIGJlIHdpdGhvdXQgYW55IG9ic3RydWN0aW9uXG4gICAgICAgIC8vIFRoaXMgd2F5LCB3ZSBjYW4gYWNoaWV2ZSBnb29kIHBvc2l0aW9uaW5nIGZvciBmbGlwcGluZyB0aGUgbWVudVxuICAgICAgICBsZXQgZGltZW5zaW9ucyA9IHtcbiAgICAgICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICAgICAgaGVpZ2h0OiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS5jc3NUZXh0ID0gYHRvcDogMHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAxMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTsgaGlkZGVuO2BcbiAgICAgICBkaW1lbnNpb25zLndpZHRoID0gdGhpcy50cmlidXRlLm1lbnUub2Zmc2V0V2lkdGhcbiAgICAgICBkaW1lbnNpb25zLmhlaWdodCA9IHRoaXMudHJpYnV0ZS5tZW51Lm9mZnNldEhlaWdodFxuXG4gICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9IGBkaXNwbGF5OiBub25lO2BcblxuICAgICAgIHJldHVybiBkaW1lbnNpb25zXG4gICAgfVxuXG4gICAgZ2V0VGV4dEFyZWFPcklucHV0VW5kZXJsaW5lUG9zaXRpb24oZWxlbWVudCwgcG9zaXRpb24sIGZsaXBwZWQpIHtcbiAgICAgICAgbGV0IHByb3BlcnRpZXMgPSBbJ2RpcmVjdGlvbicsICdib3hTaXppbmcnLCAnd2lkdGgnLCAnaGVpZ2h0JywgJ292ZXJmbG93WCcsXG4gICAgICAgICAgICAnb3ZlcmZsb3dZJywgJ2JvcmRlclRvcFdpZHRoJywgJ2JvcmRlclJpZ2h0V2lkdGgnLFxuICAgICAgICAgICAgJ2JvcmRlckJvdHRvbVdpZHRoJywgJ2JvcmRlckxlZnRXaWR0aCcsICdwYWRkaW5nVG9wJyxcbiAgICAgICAgICAgICdwYWRkaW5nUmlnaHQnLCAncGFkZGluZ0JvdHRvbScsICdwYWRkaW5nTGVmdCcsXG4gICAgICAgICAgICAnZm9udFN0eWxlJywgJ2ZvbnRWYXJpYW50JywgJ2ZvbnRXZWlnaHQnLCAnZm9udFN0cmV0Y2gnLFxuICAgICAgICAgICAgJ2ZvbnRTaXplJywgJ2ZvbnRTaXplQWRqdXN0JywgJ2xpbmVIZWlnaHQnLCAnZm9udEZhbWlseScsXG4gICAgICAgICAgICAndGV4dEFsaWduJywgJ3RleHRUcmFuc2Zvcm0nLCAndGV4dEluZGVudCcsXG4gICAgICAgICAgICAndGV4dERlY29yYXRpb24nLCAnbGV0dGVyU3BhY2luZycsICd3b3JkU3BhY2luZydcbiAgICAgICAgXVxuXG4gICAgICAgIGxldCBpc0ZpcmVmb3ggPSAod2luZG93Lm1veklubmVyU2NyZWVuWCAhPT0gbnVsbClcblxuICAgICAgICBsZXQgZGl2ID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGRpdi5pZCA9ICdpbnB1dC10ZXh0YXJlYS1jYXJldC1wb3NpdGlvbi1taXJyb3ItZGl2J1xuICAgICAgICB0aGlzLmdldERvY3VtZW50KCkuYm9keS5hcHBlbmRDaGlsZChkaXYpXG5cbiAgICAgICAgbGV0IHN0eWxlID0gZGl2LnN0eWxlXG4gICAgICAgIGxldCBjb21wdXRlZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlID8gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSA6IGVsZW1lbnQuY3VycmVudFN0eWxlXG5cbiAgICAgICAgc3R5bGUud2hpdGVTcGFjZSA9ICdwcmUtd3JhcCdcbiAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUgIT09ICdJTlBVVCcpIHtcbiAgICAgICAgICAgIHN0eWxlLndvcmRXcmFwID0gJ2JyZWFrLXdvcmQnXG4gICAgICAgIH1cblxuICAgICAgICAvLyBwb3NpdGlvbiBvZmYtc2NyZWVuXG4gICAgICAgIHN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgICBzdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbidcblxuICAgICAgICAvLyB0cmFuc2ZlciB0aGUgZWxlbWVudCdzIHByb3BlcnRpZXMgdG8gdGhlIGRpdlxuICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgICAgICBzdHlsZVtwcm9wXSA9IGNvbXB1dGVkW3Byb3BdXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKGlzRmlyZWZveCkge1xuICAgICAgICAgICAgc3R5bGUud2lkdGggPSBgJHsocGFyc2VJbnQoY29tcHV0ZWQud2lkdGgpIC0gMil9cHhgXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5zY3JvbGxIZWlnaHQgPiBwYXJzZUludChjb21wdXRlZC5oZWlnaHQpKVxuICAgICAgICAgICAgICAgIHN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXG4gICAgICAgIH1cblxuICAgICAgICBkaXYudGV4dENvbnRlbnQgPSBlbGVtZW50LnZhbHVlLnN1YnN0cmluZygwLCBwb3NpdGlvbilcblxuICAgICAgICBpZiAoZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0lOUFVUJykge1xuICAgICAgICAgICAgZGl2LnRleHRDb250ZW50ID0gZGl2LnRleHRDb250ZW50LnJlcGxhY2UoL1xccy9nLCAnwqAnKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSBlbGVtZW50LnZhbHVlLnN1YnN0cmluZyhwb3NpdGlvbikgfHwgJy4nXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChzcGFuKVxuXG4gICAgICAgIGxldCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBsZXQgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4gICAgICAgIGxldCB3aW5kb3dMZWZ0ID0gKHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2Muc2Nyb2xsTGVmdCkgLSAoZG9jLmNsaWVudExlZnQgfHwgMClcbiAgICAgICAgbGV0IHdpbmRvd1RvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgLSAoZG9jLmNsaWVudFRvcCB8fCAwKVxuXG4gICAgICAgIGxldCBjb29yZGluYXRlcyA9IHtcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyB3aW5kb3dUb3AgKyBzcGFuLm9mZnNldFRvcCArIHBhcnNlSW50KGNvbXB1dGVkLmJvcmRlclRvcFdpZHRoKSArIHBhcnNlSW50KGNvbXB1dGVkLmZvbnRTaXplKSAtIGVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luZG93TGVmdCArIHNwYW4ub2Zmc2V0TGVmdCArIHBhcnNlSW50KGNvbXB1dGVkLmJvcmRlckxlZnRXaWR0aClcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgIGxldCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcblxuICAgICAgICBsZXQgbWVudURpbWVuc2lvbnMgPSB0aGlzLmdldE1lbnVEaW1lbnNpb25zKClcbiAgICAgICAgbGV0IG1lbnVJc09mZlNjcmVlbiA9IHRoaXMuaXNNZW51T2ZmU2NyZWVuKGNvb3JkaW5hdGVzLCBtZW51RGltZW5zaW9ucylcblxuICAgICAgICBpZiAobWVudUlzT2ZmU2NyZWVuLnJpZ2h0KSB7XG4gICAgICAgICAgICBjb29yZGluYXRlcy5yaWdodCA9IHdpbmRvd1dpZHRoIC0gY29vcmRpbmF0ZXMubGVmdFxuICAgICAgICAgICAgY29vcmRpbmF0ZXMubGVmdCA9ICdhdXRvJ1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhcmVudEhlaWdodCA9IHRoaXMudHJpYnV0ZS5tZW51Q29udGFpbmVyXG4gICAgICAgICAgICA/IHRoaXMudHJpYnV0ZS5tZW51Q29udGFpbmVyLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgOiB0aGlzLmdldERvY3VtZW50KCkuYm9keS5vZmZzZXRIZWlnaHRcblxuICAgICAgICBpZiAobWVudUlzT2ZmU2NyZWVuLmJvdHRvbSkge1xuICAgICAgICAgICAgbGV0IHBhcmVudFJlY3QgPSB0aGlzLnRyaWJ1dGUubWVudUNvbnRhaW5lclxuICAgICAgICAgICAgICAgID8gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICA6IHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICBsZXQgc2Nyb2xsU3RpbGxBdmFpbGFibGUgPSBwYXJlbnRIZWlnaHQgLSAod2luZG93SGVpZ2h0IC0gcGFyZW50UmVjdC50b3ApXG5cbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLmJvdHRvbSA9IHNjcm9sbFN0aWxsQXZhaWxhYmxlICsgKHdpbmRvd0hlaWdodCAtIHJlY3QudG9wIC0gc3Bhbi5vZmZzZXRUb3ApXG4gICAgICAgICAgICBjb29yZGluYXRlcy50b3AgPSAnYXV0bydcbiAgICAgICAgfVxuXG4gICAgICAgIG1lbnVJc09mZlNjcmVlbiA9IHRoaXMuaXNNZW51T2ZmU2NyZWVuKGNvb3JkaW5hdGVzLCBtZW51RGltZW5zaW9ucylcbiAgICAgICAgaWYgKG1lbnVJc09mZlNjcmVlbi5sZWZ0KSB7XG4gICAgICAgICAgICBjb29yZGluYXRlcy5sZWZ0ID0gd2luZG93V2lkdGggPiBtZW51RGltZW5zaW9ucy53aWR0aFxuICAgICAgICAgICAgICAgID8gd2luZG93TGVmdCArIHdpbmRvd1dpZHRoIC0gbWVudURpbWVuc2lvbnMud2lkdGhcbiAgICAgICAgICAgICAgICA6IHdpbmRvd0xlZnRcbiAgICAgICAgICAgIGRlbGV0ZSBjb29yZGluYXRlcy5yaWdodFxuICAgICAgICB9XG4gICAgICAgIGlmIChtZW51SXNPZmZTY3JlZW4udG9wKSB7XG4gICAgICAgICAgICBjb29yZGluYXRlcy50b3AgPSB3aW5kb3dIZWlnaHQgPiBtZW51RGltZW5zaW9ucy5oZWlnaHRcbiAgICAgICAgICAgICAgICA/IHdpbmRvd1RvcCArIHdpbmRvd0hlaWdodCAtIG1lbnVEaW1lbnNpb25zLmhlaWdodFxuICAgICAgICAgICAgICAgIDogd2luZG93VG9wXG4gICAgICAgICAgICBkZWxldGUgY29vcmRpbmF0ZXMuYm90dG9tXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldERvY3VtZW50KCkuYm9keS5yZW1vdmVDaGlsZChkaXYpXG4gICAgICAgIHJldHVybiBjb29yZGluYXRlc1xuICAgIH1cblxuICAgIGdldENvbnRlbnRFZGl0YWJsZUNhcmV0UG9zaXRpb24oc2VsZWN0ZWROb2RlUG9zaXRpb24pIHtcbiAgICAgICAgbGV0IG1hcmtlclRleHRDaGFyID0gJ++7vydcbiAgICAgICAgbGV0IG1hcmtlckVsLCBtYXJrZXJJZCA9IGBzZWxfJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX1fJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc3Vic3RyKDIpfWBcbiAgICAgICAgbGV0IHJhbmdlXG4gICAgICAgIGxldCBzZWwgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpXG4gICAgICAgIGxldCBwcmV2UmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKVxuXG4gICAgICAgIHJhbmdlID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZVJhbmdlKClcbiAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoc2VsLmFuY2hvck5vZGUsIHNlbGVjdGVkTm9kZVBvc2l0aW9uKVxuICAgICAgICByYW5nZS5zZXRFbmQoc2VsLmFuY2hvck5vZGUsIHNlbGVjdGVkTm9kZVBvc2l0aW9uKVxuXG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgbWFya2VyIGVsZW1lbnQgY29udGFpbmluZyBhIHNpbmdsZSBpbnZpc2libGUgY2hhcmFjdGVyIHVzaW5nIERPTSBtZXRob2RzIGFuZCBpbnNlcnQgaXRcbiAgICAgICAgbWFya2VyRWwgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIG1hcmtlckVsLmlkID0gbWFya2VySWRcblxuICAgICAgICBtYXJrZXJFbC5hcHBlbmRDaGlsZCh0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlVGV4dE5vZGUobWFya2VyVGV4dENoYXIpKVxuICAgICAgICByYW5nZS5pbnNlcnROb2RlKG1hcmtlckVsKVxuICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICAgICAgc2VsLmFkZFJhbmdlKHByZXZSYW5nZSlcblxuICAgICAgICBsZXQgcmVjdCA9IG1hcmtlckVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGxldCBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcbiAgICAgICAgbGV0IHdpbmRvd0xlZnQgPSAod2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvYy5zY3JvbGxMZWZ0KSAtIChkb2MuY2xpZW50TGVmdCB8fCAwKVxuICAgICAgICBsZXQgd2luZG93VG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2Muc2Nyb2xsVG9wKSAtIChkb2MuY2xpZW50VG9wIHx8IDApXG4gICAgICAgIGxldCBjb29yZGluYXRlcyA9IHtcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbmRvd0xlZnQsXG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgbWFya2VyRWwub2Zmc2V0SGVpZ2h0ICsgd2luZG93VG9wXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgbGV0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuXG4gICAgICAgIGxldCBtZW51RGltZW5zaW9ucyA9IHRoaXMuZ2V0TWVudURpbWVuc2lvbnMoKVxuICAgICAgICBsZXQgbWVudUlzT2ZmU2NyZWVuID0gdGhpcy5pc01lbnVPZmZTY3JlZW4oY29vcmRpbmF0ZXMsIG1lbnVEaW1lbnNpb25zKVxuXG4gICAgICAgIGlmIChtZW51SXNPZmZTY3JlZW4ucmlnaHQpIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLmxlZnQgPSAnYXV0bydcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnJpZ2h0ID0gd2luZG93V2lkdGggLSByZWN0LmxlZnQgLSB3aW5kb3dMZWZ0XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFyZW50SGVpZ2h0ID0gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXJcbiAgICAgICAgICAgID8gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXIub2Zmc2V0SGVpZ2h0XG4gICAgICAgICAgICA6IHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5Lm9mZnNldEhlaWdodFxuXG4gICAgICAgIGlmIChtZW51SXNPZmZTY3JlZW4uYm90dG9tKSB7XG4gICAgICAgICAgICBsZXQgcGFyZW50UmVjdCA9IHRoaXMudHJpYnV0ZS5tZW51Q29udGFpbmVyXG4gICAgICAgICAgICAgICAgPyB0aGlzLnRyaWJ1dGUubWVudUNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgICAgIDogdGhpcy5nZXREb2N1bWVudCgpLmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgIGxldCBzY3JvbGxTdGlsbEF2YWlsYWJsZSA9IHBhcmVudEhlaWdodCAtICh3aW5kb3dIZWlnaHQgLSBwYXJlbnRSZWN0LnRvcClcblxuICAgICAgICAgICAgY29vcmRpbmF0ZXMudG9wID0gJ2F1dG8nXG4gICAgICAgICAgICBjb29yZGluYXRlcy5ib3R0b20gPSBzY3JvbGxTdGlsbEF2YWlsYWJsZSArICh3aW5kb3dIZWlnaHQgLSByZWN0LnRvcClcbiAgICAgICAgfVxuXG4gICAgICAgIG1lbnVJc09mZlNjcmVlbiA9IHRoaXMuaXNNZW51T2ZmU2NyZWVuKGNvb3JkaW5hdGVzLCBtZW51RGltZW5zaW9ucylcbiAgICAgICAgaWYgKG1lbnVJc09mZlNjcmVlbi5sZWZ0KSB7XG4gICAgICAgICAgICBjb29yZGluYXRlcy5sZWZ0ID0gd2luZG93V2lkdGggPiBtZW51RGltZW5zaW9ucy53aWR0aFxuICAgICAgICAgICAgICAgID8gd2luZG93TGVmdCArIHdpbmRvd1dpZHRoIC0gbWVudURpbWVuc2lvbnMud2lkdGhcbiAgICAgICAgICAgICAgICA6IHdpbmRvd0xlZnRcbiAgICAgICAgICAgIGRlbGV0ZSBjb29yZGluYXRlcy5yaWdodFxuICAgICAgICB9XG4gICAgICAgIGlmIChtZW51SXNPZmZTY3JlZW4udG9wKSB7XG4gICAgICAgICAgICBjb29yZGluYXRlcy50b3AgPSB3aW5kb3dIZWlnaHQgPiBtZW51RGltZW5zaW9ucy5oZWlnaHRcbiAgICAgICAgICAgICAgICA/IHdpbmRvd1RvcCArIHdpbmRvd0hlaWdodCAtIG1lbnVEaW1lbnNpb25zLmhlaWdodFxuICAgICAgICAgICAgICAgIDogd2luZG93VG9wXG4gICAgICAgICAgICBkZWxldGUgY29vcmRpbmF0ZXMuYm90dG9tXG4gICAgICAgIH1cblxuICAgICAgICBtYXJrZXJFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG1hcmtlckVsKVxuICAgICAgICByZXR1cm4gY29vcmRpbmF0ZXNcbiAgICB9XG5cbiAgICBzY3JvbGxJbnRvVmlldyhlbGVtKSB7XG4gICAgICAgIGxldCByZWFzb25hYmxlQnVmZmVyID0gMjAsXG4gICAgICAgICAgICBjbGllbnRSZWN0XG4gICAgICAgIGxldCBtYXhTY3JvbGxEaXNwbGFjZW1lbnQgPSAxMDBcbiAgICAgICAgbGV0IGUgPSB0aGlzLm1lbnVcblxuICAgICAgICBpZiAodHlwZW9mIGUgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cbiAgICAgICAgd2hpbGUgKGNsaWVudFJlY3QgPT09IHVuZGVmaW5lZCB8fCBjbGllbnRSZWN0LmhlaWdodCA9PT0gMCkge1xuICAgICAgICAgICAgY2xpZW50UmVjdCA9IGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgICAgICAgICAgaWYgKGNsaWVudFJlY3QuaGVpZ2h0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZSA9IGUuY2hpbGROb2Rlc1swXVxuICAgICAgICAgICAgICAgIGlmIChlID09PSB1bmRlZmluZWQgfHwgIWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlbGVtVG9wID0gY2xpZW50UmVjdC50b3BcbiAgICAgICAgbGV0IGVsZW1Cb3R0b20gPSBlbGVtVG9wICsgY2xpZW50UmVjdC5oZWlnaHRcblxuICAgICAgICBpZiAoZWxlbVRvcCA8IDApIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCB3aW5kb3cucGFnZVlPZmZzZXQgKyBjbGllbnRSZWN0LnRvcCAtIHJlYXNvbmFibGVCdWZmZXIpXG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbUJvdHRvbSA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAgICAgbGV0IG1heFkgPSB3aW5kb3cucGFnZVlPZmZzZXQgKyBjbGllbnRSZWN0LnRvcCAtIHJlYXNvbmFibGVCdWZmZXJcblxuICAgICAgICAgICAgaWYgKG1heFkgLSB3aW5kb3cucGFnZVlPZmZzZXQgPiBtYXhTY3JvbGxEaXNwbGFjZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBtYXhZID0gd2luZG93LnBhZ2VZT2Zmc2V0ICsgbWF4U2Nyb2xsRGlzcGxhY2VtZW50XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB0YXJnZXRZID0gd2luZG93LnBhZ2VZT2Zmc2V0IC0gKHdpbmRvdy5pbm5lckhlaWdodCAtIGVsZW1Cb3R0b20pXG5cbiAgICAgICAgICAgIGlmICh0YXJnZXRZID4gbWF4WSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFkgPSBtYXhZXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCB0YXJnZXRZKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGVSYW5nZTtcbiIsIi8vIFRoYW5rcyB0byBodHRwczovL2dpdGh1Yi5jb20vbWF0dHlvcmsvZnV6enlcbmNsYXNzIFRyaWJ1dGVTZWFyY2gge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUuc2VhcmNoID0gdGhpc1xuICAgIH1cblxuICAgIHNpbXBsZUZpbHRlcihwYXR0ZXJuLCBhcnJheSkge1xuICAgICAgICByZXR1cm4gYXJyYXkuZmlsdGVyKHN0cmluZyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50ZXN0KHBhdHRlcm4sIHN0cmluZylcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0ZXN0KHBhdHRlcm4sIHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaChwYXR0ZXJuLCBzdHJpbmcpICE9PSBudWxsXG4gICAgfVxuXG4gICAgbWF0Y2gocGF0dGVybiwgc3RyaW5nLCBvcHRzKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9XG4gICAgICAgIGxldCBwYXR0ZXJuSWR4ID0gMCxcbiAgICAgICAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgICAgICAgbGVuID0gc3RyaW5nLmxlbmd0aCxcbiAgICAgICAgICAgIHRvdGFsU2NvcmUgPSAwLFxuICAgICAgICAgICAgY3VyclNjb3JlID0gMCxcbiAgICAgICAgICAgIHByZSA9IG9wdHMucHJlIHx8ICcnLFxuICAgICAgICAgICAgcG9zdCA9IG9wdHMucG9zdCB8fCAnJyxcbiAgICAgICAgICAgIGNvbXBhcmVTdHJpbmcgPSBvcHRzLmNhc2VTZW5zaXRpdmUgJiYgc3RyaW5nIHx8IHN0cmluZy50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgY2gsIGNvbXBhcmVDaGFyXG5cbiAgICAgICAgcGF0dGVybiA9IG9wdHMuY2FzZVNlbnNpdGl2ZSAmJiBwYXR0ZXJuIHx8IHBhdHRlcm4udG9Mb3dlckNhc2UoKVxuXG4gICAgICAgIGxldCBwYXR0ZXJuQ2FjaGUgPSB0aGlzLnRyYXZlcnNlKGNvbXBhcmVTdHJpbmcsIHBhdHRlcm4sIDAsIDAsIFtdKVxuICAgICAgICBpZiAoIXBhdHRlcm5DYWNoZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZW5kZXJlZDogdGhpcy5yZW5kZXIoc3RyaW5nLCBwYXR0ZXJuQ2FjaGUuY2FjaGUsIHByZSwgcG9zdCksXG4gICAgICAgICAgICBzY29yZTogcGF0dGVybkNhY2hlLnNjb3JlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmF2ZXJzZShzdHJpbmcsIHBhdHRlcm4sIHN0cmluZ0luZGV4LCBwYXR0ZXJuSW5kZXgsIHBhdHRlcm5DYWNoZSkge1xuICAgICAgICAvLyBpZiB0aGUgcGF0dGVybiBzZWFyY2ggYXQgZW5kXG4gICAgICAgIGlmIChwYXR0ZXJuLmxlbmd0aCA9PT0gcGF0dGVybkluZGV4KSB7XG5cbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBzY29yZSBhbmQgY29weSB0aGUgY2FjaGUgY29udGFpbmluZyB0aGUgaW5kaWNlcyB3aGVyZSBpdCdzIGZvdW5kXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNjb3JlOiB0aGlzLmNhbGN1bGF0ZVNjb3JlKHBhdHRlcm5DYWNoZSksXG4gICAgICAgICAgICAgICAgY2FjaGU6IHBhdHRlcm5DYWNoZS5zbGljZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBzdHJpbmcgYXQgZW5kIG9yIHJlbWFpbmluZyBwYXR0ZXJuID4gcmVtYWluaW5nIHN0cmluZ1xuICAgICAgICBpZiAoc3RyaW5nLmxlbmd0aCA9PT0gc3RyaW5nSW5kZXggfHwgcGF0dGVybi5sZW5ndGggLSBwYXR0ZXJuSW5kZXggPiBzdHJpbmcubGVuZ3RoIC0gc3RyaW5nSW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjID0gcGF0dGVybltwYXR0ZXJuSW5kZXhdXG4gICAgICAgIGxldCBpbmRleCA9IHN0cmluZy5pbmRleE9mKGMsIHN0cmluZ0luZGV4KVxuICAgICAgICBsZXQgYmVzdCwgdGVtcFxuXG4gICAgICAgIHdoaWxlIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICBwYXR0ZXJuQ2FjaGUucHVzaChpbmRleClcbiAgICAgICAgICAgIHRlbXAgPSB0aGlzLnRyYXZlcnNlKHN0cmluZywgcGF0dGVybiwgaW5kZXggKyAxLCBwYXR0ZXJuSW5kZXggKyAxLCBwYXR0ZXJuQ2FjaGUpXG4gICAgICAgICAgICBwYXR0ZXJuQ2FjaGUucG9wKClcblxuICAgICAgICAgICAgLy8gaWYgZG93bnN0cmVhbSB0cmF2ZXJzYWwgZmFpbGVkLCByZXR1cm4gYmVzdCBhbnN3ZXIgc28gZmFyXG4gICAgICAgICAgICBpZiAoIXRlbXApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmVzdFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWJlc3QgfHwgYmVzdC5zY29yZSA8IHRlbXAuc2NvcmUpIHtcbiAgICAgICAgICAgICAgICBiZXN0ID0gdGVtcFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbmRleCA9IHN0cmluZy5pbmRleE9mKGMsIGluZGV4ICsgMSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBiZXN0XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlU2NvcmUocGF0dGVybkNhY2hlKSB7XG4gICAgICAgIGxldCBzY29yZSA9IDBcbiAgICAgICAgbGV0IHRlbXAgPSAxXG5cbiAgICAgICAgcGF0dGVybkNhY2hlLmZvckVhY2goKGluZGV4LCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAocGF0dGVybkNhY2hlW2kgLSAxXSArIDEgPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXAgKz0gdGVtcCArIDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXAgPSAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzY29yZSArPSB0ZW1wXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHNjb3JlXG4gICAgfVxuXG4gICAgcmVuZGVyKHN0cmluZywgaW5kaWNlcywgcHJlLCBwb3N0KSB7XG4gICAgICAgIHZhciByZW5kZXJlZCA9IHN0cmluZy5zdWJzdHJpbmcoMCwgaW5kaWNlc1swXSlcblxuICAgICAgICBpbmRpY2VzLmZvckVhY2goKGluZGV4LCBpKSA9PiB7XG4gICAgICAgICAgICByZW5kZXJlZCArPSBwcmUgKyBzdHJpbmdbaW5kZXhdICsgcG9zdCArXG4gICAgICAgICAgICAgICAgc3RyaW5nLnN1YnN0cmluZyhpbmRleCArIDEsIChpbmRpY2VzW2kgKyAxXSkgPyBpbmRpY2VzW2kgKyAxXSA6IHN0cmluZy5sZW5ndGgpXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHJlbmRlcmVkXG4gICAgfVxuXG4gICAgZmlsdGVyKHBhdHRlcm4sIGFyciwgb3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuICAgICAgICByZXR1cm4gYXJyXG4gICAgICAgICAgICAucmVkdWNlKChwcmV2LCBlbGVtZW50LCBpZHgsIGFycikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzdHIgPSBlbGVtZW50XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0cy5leHRyYWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciA9IG9wdHMuZXh0cmFjdChlbGVtZW50KVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghc3RyKSB7IC8vIHRha2UgY2FyZSBvZiB1bmRlZmluZWRzIC8gbnVsbHMgLyBldGMuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSAnJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHJlbmRlcmVkID0gdGhpcy5tYXRjaChwYXR0ZXJuLCBzdHIsIG9wdHMpXG5cbiAgICAgICAgICAgICAgICBpZiAocmVuZGVyZWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2W3ByZXYubGVuZ3RoXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZzogcmVuZGVyZWQucmVuZGVyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogcmVuZGVyZWQuc2NvcmUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaWR4LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWw6IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2XG4gICAgICAgICAgICB9LCBbXSlcblxuICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbXBhcmUgPSBiLnNjb3JlIC0gYS5zY29yZVxuICAgICAgICAgICAgaWYgKGNvbXBhcmUpIHJldHVybiBjb21wYXJlXG4gICAgICAgICAgICByZXR1cm4gYS5pbmRleCAtIGIuaW5kZXhcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGVTZWFyY2g7XG4iLCIvKipcbiogVHJpYnV0ZS5qc1xuKiBOYXRpdmUgRVM2IEphdmFTY3JpcHQgQG1lbnRpb24gUGx1Z2luXG4qKi9cblxuaW1wb3J0IFRyaWJ1dGUgZnJvbSBcIi4vVHJpYnV0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlO1xuIiwiaWYgKCFBcnJheS5wcm90b3R5cGUuZmluZCkge1xuICAgIEFycmF5LnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XG4gICAgICAgIGlmICh0aGlzID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5wcm90b3R5cGUuZmluZCBjYWxsZWQgb24gbnVsbCBvciB1bmRlZmluZWQnKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdCA9IE9iamVjdCh0aGlzKVxuICAgICAgICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGggPj4+IDBcbiAgICAgICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV1cbiAgICAgICAgdmFyIHZhbHVlXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFsdWUgPSBsaXN0W2ldXG4gICAgICAgICAgICBpZiAocHJlZGljYXRlLmNhbGwodGhpc0FyZywgdmFsdWUsIGksIGxpc3QpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbn1cblxuaWYgKHdpbmRvdyAmJiB0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgZnVuY3Rpb24gQ3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcykge1xuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7XG4gICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgZGV0YWlsOiB1bmRlZmluZWRcbiAgICB9XG4gICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKVxuICAgIHJldHVybiBldnRcbiAgfVxuXG4gaWYgKHR5cGVvZiB3aW5kb3cuRXZlbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSB3aW5kb3cuRXZlbnQucHJvdG90eXBlXG4gfVxuXG4gIHdpbmRvdy5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50XG59Il19
