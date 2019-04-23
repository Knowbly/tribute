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
            _ref$searchOpts = _ref.searchOpts,
            searchOpts = _ref$searchOpts === undefined ? {} : _ref$searchOpts;

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

                searchOpts: searchOpts
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
                    searchOpts: item.searchOpts || searchOpts
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

                if (_this2.current.collection.headerTemplate) {
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

                ul.innerHTML = '';

                items.forEach(function (item, index) {
                    var li = _this2.range.getDocument().createElement('li');
                    li.setAttribute('data-index', index);
                    li.addEventListener('mousemove', function (e) {
                        var li = e.target;
                        var index = li.getAttribute('data-index');
                        if (e.movementY !== 0) {
                            _this2.events.setActiveLi(index);
                        }
                    });
                    if (_this2.menuSelected === index) {
                        li.className = _this2.current.collection.selectClass;
                    }
                    li.innerHTML = _this2.current.collection.menuItemTemplate(item);
                    ul.appendChild(li);
                });
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
            element.boundKeyup = this.keyup.bind(element, this);
            element.boundInput = this.input.bind(element, this);

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
            if (instance.shouldDeactivate(event)) {
                instance.tribute.isActive = false;
                instance.tribute.hideMenu();
            }

            var element = this;
            instance.commandEvent = false;

            TributeEvents.keys().forEach(function (o) {
                if (o.key === event.keyCode) {
                    instance.commandEvent = true;
                    instance.callbacks()[o.value.toLowerCase()](event, element);
                }
            });

            // check if key is a printable character
            var charCode = typeof event.which === "undefined" ? event.keyCode : event.which;
            var char = String.fromCharCode(charCode);
            var allowedKeys = [13, 8];

            if (!allowedKeys.includes(charCode) && !/\w/.test(char)) {
                return;
            }

            if ((!instance.commandEvent || allowedKeys.includes(charCode)) && editor) {
                var anchor = editor.selection.get().anchorNode;
                if (anchor && anchor.parentNode && anchor.parentNode.classList.contains("fr-tribute")) {
                    var parent = anchor.parentNode;
                    var docFrag = document.createDocumentFragment();
                    var div = document.createElement('div');
                    div.innerHTML = '';
                    if (charCode !== 13) {
                        div.innerHTML = '@';
                    }
                    div.firstChild && docFrag.appendChild(div.firstChild);
                    editor.selection.save();
                    if (charCode === 13) {
                        // breaks word
                        if (parent.previousSibling && parent.previousSibling.previousSibling) {
                            var parent2 = parent.previousSibling.previousSibling;
                            if (parent2.classList.contains("fr-tribute")) {
                                while (parent2.firstChild) {
                                    var child = parent2.removeChild(parent2.firstChild);
                                    docFrag.appendChild(child);
                                }
                                docFrag.appendChild(document.createElement('br'));
                                TributeEvents.remove(parent.previousSibling.previousSibling);
                                TributeEvents.remove(parent.previousSibling);
                            }
                        }
                    }
                    while (parent.firstChild) {
                        var _child = parent.removeChild(parent.firstChild);
                        docFrag.appendChild(_child);
                    }
                    parent.parentNode.replaceChild(docFrag, parent);
                    editor.selection.restore();
                }
            }
        }
    }, {
        key: 'input',
        value: function input(instance, event) {
            instance.inputEvent = true;
            instance.keyup.call(this, instance, event);
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
        value: function keyup(instance, event) {
            if (instance.inputEvent) {
                instance.inputEvent = false;
            }
            instance.updateSelection(this);

            if (event.keyCode === 27) return;

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
                        instance.callbacks().triggerChar(event, this, trigger);
                    }
                }
            }

            if ((instance.tribute.current.trigger || instance.tribute.autocompleteMode) && instance.commandEvent === false || instance.tribute.isActive && event.keyCode === 8) {
                instance.tribute.showMenuFor(this, true);
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
                    var tribute = _this.tribute;
                    tribute.current.trigger = trigger;

                    var collectionItem = tribute.collection.find(function (item) {
                        return item.trigger === trigger;
                    });

                    tribute.current.collection = collectionItem;
                    if (tribute.inputEvent) tribute.showMenuFor(el, true);
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
                space: function space(e, el) {
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

                this.tribute.menu.style.cssText = 'top: ' + coordinates.top + 'px;\n                                     left: ' + coordinates.left + 'px;\n                                     right: ' + coordinates.right + 'px;\n                                     bottom: ' + coordinates.bottom + 'px;\n                                     position: absolute;\n                                     zIndex: 10000;\n                                     display: block;';

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
            var context = this.tribute.current;
            var info = this.getTriggerInfo(true, hasTrailingSpace, requireLeadingSpace, this.tribute.allowSpaces, this.tribute.autocompleteMode);

            // Create the event
            var replaceEvent = new CustomEvent('tribute-replaced', {
                detail: {
                    item: item,
                    event: originalEvent
                }
            });

            if (info !== undefined) {
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
                sel = void 0;
            sel = this.getWindowSelection();
            range = this.getDocument().createRange();
            range.setStart(sel.anchorNode, startPos);
            range.setEnd(sel.anchorNode, endPos);
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
                    var workingNodeContent = selectedElem.textContent;
                    var selectStartOffset = this.getWindowSelection().getRangeAt(0).startOffset;

                    if (workingNodeContent && selectStartOffset >= 0) {
                        text = workingNodeContent.substring(0, selectStartOffset);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvVHJpYnV0ZS5qcyIsInNyYy9UcmlidXRlRXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVNZW51RXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVSYW5nZS5qcyIsInNyYy9UcmlidXRlU2VhcmNoLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVNLE87QUFDRiwyQkFxQkc7QUFBQTs7QUFBQSwrQkFwQkMsTUFvQkQ7QUFBQSxZQXBCQyxNQW9CRCwrQkFwQlUsSUFvQlY7QUFBQSwrQkFuQkMsTUFtQkQ7QUFBQSxZQW5CQyxNQW1CRCwrQkFuQlUsSUFtQlY7QUFBQSxvQ0FsQkMsV0FrQkQ7QUFBQSxZQWxCQyxXQWtCRCxvQ0FsQmUsV0FrQmY7QUFBQSxnQ0FqQkMsT0FpQkQ7QUFBQSxZQWpCQyxPQWlCRCxnQ0FqQlcsR0FpQlg7QUFBQSx5Q0FoQkMsZ0JBZ0JEO0FBQUEsWUFoQkMsZ0JBZ0JELHlDQWhCb0IsS0FnQnBCO0FBQUEsdUNBZkMsY0FlRDtBQUFBLFlBZkMsY0FlRCx1Q0Fma0IsSUFlbEI7QUFBQSx5Q0FkQyxnQkFjRDtBQUFBLFlBZEMsZ0JBY0QseUNBZG9CLElBY3BCO0FBQUEsK0JBYkMsTUFhRDtBQUFBLFlBYkMsTUFhRCwrQkFiVSxLQWFWO0FBQUEsaUNBWkMsUUFZRDtBQUFBLFlBWkMsUUFZRCxpQ0FaWSxPQVlaO0FBQUEsbUNBWEMsVUFXRDtBQUFBLFlBWEMsVUFXRCxtQ0FYYyxJQVdkO0FBQUEsc0NBVkMsYUFVRDtBQUFBLFlBVkMsYUFVRCxzQ0FWaUIsSUFVakI7QUFBQSx3Q0FUQyxlQVNEO0FBQUEsWUFUQyxlQVNELHdDQVRtQixJQVNuQjtBQUFBLHdDQVJDLGVBUUQ7QUFBQSxZQVJDLGVBUUQsd0NBUm1CLElB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TyxPQUFPLEtBQWQsS0FBd0IsV0FBNUIsRUFBeUM7QUFDdkMsb0JBQVksU0FBWixHQUF3QixPQUFPLEtBQVAsQ0FBYSxTQUFyQztBQUNEOztBQUVBLFdBQU8sV0FBUCxHQUFxQixXQUFyQjtBQUNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IFRyaWJ1dGVVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IFRyaWJ1dGVFdmVudHMgZnJvbSBcIi4vVHJpYnV0ZUV2ZW50c1wiO1xuaW1wb3J0IFRyaWJ1dGVNZW51RXZlbnRzIGZyb20gXCIuL1RyaWJ1dGVNZW51RXZlbnRzXCI7XG5pbXBvcnQgVHJpYnV0ZVJhbmdlIGZyb20gXCIuL1RyaWJ1dGVSYW5nZVwiO1xuaW1wb3J0IFRyaWJ1dGVTZWFyY2ggZnJvbSBcIi4vVHJpYnV0ZVNlYXJjaFwiO1xuXG5jbGFzcyBUcmlidXRlIHtcbiAgICBjb25zdHJ1Y3Rvcih7XG4gICAgICAgIHZhbHVlcyA9IG51bGwsXG4gICAgICAgIGlmcmFtZSA9IG51bGwsXG4gICAgICAgIHNlbGVjdENsYXNzID0gJ2hpZ2hsaWdodCcsXG4gICAgICAgIHRyaWdnZXIgPSAnQCcsXG4gICAgICAgIGF1dG9jb21wbGV0ZU1vZGUgPSBmYWxzZSxcbiAgICAgICAgc2VsZWN0VGVtcGxhdGUgPSBudWxsLFxuICAgICAgICBtZW51SXRlbVRlbXBsYXRlID0gbnVsbCxcbiAgICAgICAgbG9va3VwID0gJ2tleScsXG4gICAgICAgIGZpbGxBdHRyID0gJ3ZhbHVlJyxcbiAgICAgICAgY29sbGVjdGlvbiA9IG51bGwsXG4gICAgICAgIG1lbnVDb250YWluZXIgPSBudWxsLFxuICAgICAgICBzY3JvbGxDb250YWluZXIgPSBudWxsLFxuICAgICAgICBub01hdGNoVGVtcGxhdGUgPSBudWxsLFxuICAgICAgICBoZWFkZXJUZW1wbGF0ZSA9IG51bGwsXG4gICAgICAgIHJlcXVpcmVMZWFkaW5nU3BhY2UgPSB0cnVlLFxuICAgICAgICBhbGxvd1NwYWNlcyA9IGZhbHNlLFxuICAgICAgICByZXBsYWNlVGV4dFN1ZmZpeCA9IG51bGwsXG4gICAgICAgIHBvc2l0aW9uTWVudSA9IHRydWUsXG4gICAgICAgIHNwYWNlU2VsZWN0c01hdGNoID0gZmFsc2UsXG4gICAgICAgIHNlYXJjaE9wdHMgPSB7fSxcbiAgICB9KSB7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlTW9kZSA9IGF1dG9jb21wbGV0ZU1vZGVcbiAgICAgICAgdGhpcy5tZW51U2VsZWN0ZWQgPSAwXG4gICAgICAgIHRoaXMuY3VycmVudCA9IHt9XG4gICAgICAgIHRoaXMuaW5wdXRFdmVudCA9IGZhbHNlXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICB0aGlzLm1lbnVDb250YWluZXIgPSBtZW51Q29udGFpbmVyXG4gICAgICAgIHRoaXMuc2Nyb2xsQ29udGFpbmVyID0gc2Nyb2xsQ29udGFpbmVyXG4gICAgICAgIHRoaXMuYWxsb3dTcGFjZXMgPSBhbGxvd1NwYWNlc1xuICAgICAgICB0aGlzLnJlcGxhY2VUZXh0U3VmZml4ID0gcmVwbGFjZVRleHRTdWZmaXhcbiAgICAgICAgdGhpcy5wb3NpdGlvbk1lbnUgPSBwb3NpdGlvbk1lbnVcbiAgICAgICAgdGhpcy5oYXNUcmFpbGluZ1NwYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3BhY2VTZWxlY3RzTWF0Y2ggPSBzcGFjZVNlbGVjdHNNYXRjaDtcblxuICAgICAgICBpZiAodGhpcy5hdXRvY29tcGxldGVNb2RlKSB7XG4gICAgICAgICAgICB0cmlnZ2VyID0gJydcbiAgICAgICAgICAgIGFsbG93U3BhY2VzID0gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IFt7XG4gICAgICAgICAgICAgICAgLy8gc3ltYm9sIHRoYXQgc3RhcnRzIHRoZSBsb29rdXBcbiAgICAgICAgICAgICAgICB0cmlnZ2VyOiB0cmlnZ2VyLFxuXG4gICAgICAgICAgICAgICAgLy8gaXMgaXQgd3JhcHBlZCBpbiBhbiBpZnJhbWVcbiAgICAgICAgICAgICAgICBpZnJhbWU6IGlmcmFtZSxcblxuICAgICAgICAgICAgICAgIC8vIGNsYXNzIGFwcGxpZWQgdG8gc2VsZWN0ZWQgaXRlbVxuICAgICAgICAgICAgICAgIHNlbGVjdENsYXNzOiBzZWxlY3RDbGFzcyxcblxuICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGNhbGxlZCBvbiBzZWxlY3QgdGhhdCByZXR1bnMgdGhlIGNvbnRlbnQgdG8gaW5zZXJ0XG4gICAgICAgICAgICAgICAgc2VsZWN0VGVtcGxhdGU6IChzZWxlY3RUZW1wbGF0ZSB8fCBUcmlidXRlLmRlZmF1bHRTZWxlY3RUZW1wbGF0ZSkuYmluZCh0aGlzKSxcblxuICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGNhbGxlZCB0aGF0IHJldHVybnMgY29udGVudCBmb3IgYW4gaXRlbVxuICAgICAgICAgICAgICAgIG1lbnVJdGVtVGVtcGxhdGU6IChtZW51SXRlbVRlbXBsYXRlIHx8IFRyaWJ1dGUuZGVmYXVsdE1lbnVJdGVtVGVtcGxhdGUpLmJpbmQodGhpcyksXG5cbiAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBjYWxsZWQgd2hlbiBtZW51IGlzIGVtcHR5LCBkaXNhYmxlcyBoaWRpbmcgb2YgbWVudS5cbiAgICAgICAgICAgICAgICBub01hdGNoVGVtcGxhdGU6ICh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9NYXRjaFRlbXBsYXRlIHx8IGZ1bmN0aW9uICgpIHtyZXR1cm4gJyd9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9KShub01hdGNoVGVtcGxhdGUpLFxuXG4gICAgICAgICAgICAgICAgaGVhZGVyVGVtcGxhdGU6ICh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGVhZGVyVGVtcGxhdGUgfHwgZnVuY3Rpb24gKCkge3JldHVybiAnJ30uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgIH0pKGhlYWRlclRlbXBsYXRlKSxcblxuICAgICAgICAgICAgICAgIC8vIGNvbHVtbiB0byBzZWFyY2ggYWdhaW5zdCBpbiB0aGUgb2JqZWN0XG4gICAgICAgICAgICAgICAgbG9va3VwOiBsb29rdXAsXG5cbiAgICAgICAgICAgICAgICAvLyBjb2x1bW4gdGhhdCBjb250YWlucyB0aGUgY29udGVudCB0byBpbnNlcnQgYnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgIGZpbGxBdHRyOiBmaWxsQXR0cixcblxuICAgICAgICAgICAgICAgIC8vIGFycmF5IG9mIG9iamVjdHMgb3IgYSBmdW5jdGlvbiByZXR1cm5pbmcgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgICAgICAgICAgIHZhbHVlczogdmFsdWVzLFxuXG4gICAgICAgICAgICAgICAgcmVxdWlyZUxlYWRpbmdTcGFjZTogcmVxdWlyZUxlYWRpbmdTcGFjZSxcblxuICAgICAgICAgICAgICAgIHNlYXJjaE9wdHM6IHNlYXJjaE9wdHNcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29sbGVjdGlvbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b2NvbXBsZXRlTW9kZSlcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1RyaWJ1dGUgaW4gYXV0b2NvbXBsZXRlIG1vZGUgZG9lcyBub3Qgd29yayBmb3IgY29sbGVjdGlvbnMnKVxuICAgICAgICAgICAgdGhpcy5jb2xsZWN0aW9uID0gY29sbGVjdGlvbi5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcjogaXRlbS50cmlnZ2VyIHx8IHRyaWdnZXIsXG4gICAgICAgICAgICAgICAgICAgIGlmcmFtZTogaXRlbS5pZnJhbWUgfHwgaWZyYW1lLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDbGFzczogaXRlbS5zZWxlY3RDbGFzcyB8fCBzZWxlY3RDbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0VGVtcGxhdGU6IChpdGVtLnNlbGVjdFRlbXBsYXRlIHx8IFRyaWJ1dGUuZGVmYXVsdFNlbGVjdFRlbXBsYXRlKS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICBtZW51SXRlbVRlbXBsYXRlOiAoaXRlbS5tZW51SXRlbVRlbXBsYXRlIHx8IFRyaWJ1dGUuZGVmYXVsdE1lbnVJdGVtVGVtcGxhdGUpLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIG1lbnUgaXMgZW1wdHksIGRpc2FibGVzIGhpZGluZyBvZiBtZW51LlxuICAgICAgICAgICAgICAgICAgICBub01hdGNoVGVtcGxhdGU6ICh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgICAgfSkobm9NYXRjaFRlbXBsYXRlKSxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyVGVtcGxhdGU6ICh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgICAgfSkoaGVhZGVyVGVtcGxhdGUpLFxuICAgICAgICAgICAgICAgICAgICBsb29rdXA6IGl0ZW0ubG9va3VwIHx8IGxvb2t1cCxcbiAgICAgICAgICAgICAgICAgICAgZmlsbEF0dHI6IGl0ZW0uZmlsbEF0dHIgfHwgZmlsbEF0dHIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogaXRlbS52YWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVMZWFkaW5nU3BhY2U6IGl0ZW0ucmVxdWlyZUxlYWRpbmdTcGFjZSxcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoT3B0czogaXRlbS5zZWFyY2hPcHRzIHx8IHNlYXJjaE9wdHNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVHJpYnV0ZV0gTm8gY29sbGVjdGlvbiBzcGVjaWZpZWQuJylcbiAgICAgICAgfVxuXG4gICAgICAgIG5ldyBUcmlidXRlUmFuZ2UodGhpcylcbiAgICAgICAgbmV3IFRyaWJ1dGVFdmVudHModGhpcylcbiAgICAgICAgbmV3IFRyaWJ1dGVNZW51RXZlbnRzKHRoaXMpXG4gICAgICAgIG5ldyBUcmlidXRlU2VhcmNoKHRoaXMpXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRTZWxlY3RUZW1wbGF0ZShpdGVtKSB7XG4gICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmICh0aGlzLnJhbmdlLmlzQ29udGVudEVkaXRhYmxlKHRoaXMuY3VycmVudC5lbGVtZW50KSkge1xuICAgICAgICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCJ0cmlidXRlLW1lbnRpb25cIj4nICsgKHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnRyaWdnZXIgKyBpdGVtLm9yaWdpbmFsW3RoaXMuY3VycmVudC5jb2xsZWN0aW9uLmZpbGxBdHRyXSkgKyAnPC9zcGFuPic7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi50cmlnZ2VyICsgaXRlbS5vcmlnaW5hbFt0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5maWxsQXR0cl07XG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRNZW51SXRlbVRlbXBsYXRlKG1hdGNoSXRlbSkge1xuICAgICAgICByZXR1cm4gbWF0Y2hJdGVtLnN0cmluZ1xuICAgIH1cblxuICAgIHN0YXRpYyBpbnB1dFR5cGVzKCkge1xuICAgICAgICByZXR1cm4gWydURVhUQVJFQScsICdJTlBVVCddXG4gICAgfVxuXG4gICAgdHJpZ2dlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24ubWFwKGNvbmZpZyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29uZmlnLnRyaWdnZXJcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhdHRhY2goZWwsIGVkaXRvcikge1xuICAgICAgICBpZiAoIWVsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tUcmlidXRlXSBNdXN0IHBhc3MgaW4gYSBET00gbm9kZSBvciBOb2RlTGlzdC4nKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgaXQgaXMgYSBqUXVlcnkgY29sbGVjdGlvblxuICAgICAgICBpZiAodHlwZW9mIGpRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiYgZWwgaW5zdGFuY2VvZiBqUXVlcnkpIHtcbiAgICAgICAgICAgIGVsID0gZWwuZ2V0KClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElzIGVsIGFuIEFycmF5L0FycmF5LWxpa2Ugb2JqZWN0P1xuICAgICAgICBpZiAoZWwuY29uc3RydWN0b3IgPT09IE5vZGVMaXN0IHx8IGVsLmNvbnN0cnVjdG9yID09PSBIVE1MQ29sbGVjdGlvbiB8fCBlbC5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSBlbC5sZW5ndGhcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hdHRhY2goZWxbaV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hdHRhY2goZWwsIGVkaXRvcilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9hdHRhY2goZWwsIGVkaXRvcikge1xuICAgICAgICBpZiAoZWwuaGFzQXR0cmlidXRlKCdkYXRhLXRyaWJ1dGUnKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdUcmlidXRlIHdhcyBhbHJlYWR5IGJvdW5kIHRvICcgKyBlbC5ub2RlTmFtZSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW5zdXJlRWRpdGFibGUoZWwpXG4gICAgICAgIHRoaXMuZXZlbnRzLmJpbmQoZWwsIGVkaXRvcilcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnNjcm9sbENvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5zY3JvbGxFdmVudC5iaW5kKHRoaXMpIClcbiAgICAgICAgfVxuXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS10cmlidXRlJywgdHJ1ZSlcbiAgICB9XG5cbiAgICBzY3JvbGxFdmVudChlKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnNjcm9sbCh0aGlzLCBlKVxuICAgIH1cblxuICAgIGVuc3VyZUVkaXRhYmxlKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKFRyaWJ1dGUuaW5wdXRUeXBlcygpLmluZGV4T2YoZWxlbWVudC5ub2RlTmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5jb250ZW50RWRpdGFibGUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNvbnRlbnRFZGl0YWJsZSA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVHJpYnV0ZV0gQ2Fubm90IGJpbmQgdG8gJyArIGVsZW1lbnQubm9kZU5hbWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVNZW51KCkge1xuICAgICAgICBsZXQgd3JhcHBlciA9IHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgICAgIHVsID0gdGhpcy5yYW5nZS5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ3VsJylcblxuICAgICAgICB3cmFwcGVyLmNsYXNzTmFtZSA9ICd0cmlidXRlLWNvbnRhaW5lcidcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZCh1bClcblxuICAgICAgICBpZiAodGhpcy5tZW51Q29udGFpbmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZW51Q29udGFpbmVyLmFwcGVuZENoaWxkKHdyYXBwZXIpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5yYW5nZS5nZXREb2N1bWVudCgpLmJvZHkuYXBwZW5kQ2hpbGQod3JhcHBlcilcbiAgICB9XG5cbiAgICBzaG93TWVudUZvcihlbGVtZW50LCBzY3JvbGxUbykge1xuICAgICAgICAvLyBPbmx5IHByb2NlZWQgaWYgbWVudSBpc24ndCBhbHJlYWR5IHNob3duIGZvciB0aGUgY3VycmVudCBlbGVtZW50ICYgbWVudGlvblRleHRcbiAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUgJiYgdGhpcy5jdXJyZW50LmVsZW1lbnQgPT09IGVsZW1lbnQgJiYgdGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0ID09PSB0aGlzLmN1cnJlbnRNZW50aW9uVGV4dFNuYXBzaG90KSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50TWVudGlvblRleHRTbmFwc2hvdCA9IHRoaXMuY3VycmVudC5tZW50aW9uVGV4dFxuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgbWVudSBpZiBpdCBkb2Vzbid0IGV4aXN0LlxuICAgICAgICBpZiAoIXRoaXMubWVudSkge1xuICAgICAgICAgICAgdGhpcy5tZW51ID0gdGhpcy5jcmVhdGVNZW51KClcbiAgICAgICAgICAgIGVsZW1lbnQudHJpYnV0ZU1lbnUgPSB0aGlzLm1lbnVcbiAgICAgICAgICAgIHRoaXMubWVudUV2ZW50cy5iaW5kKHRoaXMubWVudSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlXG4gICAgICAgIHRoaXMubWVudVNlbGVjdGVkID0gMFxuXG4gICAgICAgIGlmICghdGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQubWVudGlvblRleHQgPSAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvY2Vzc1ZhbHVlcyA9ICh2YWx1ZXMsIHRleHQpID0+IHtcbiAgICAgICAgICAgIC8vIFRyaWJ1dGUgbWF5IG5vdCBiZSBhY3RpdmUgYW55IG1vcmUgYnkgdGhlIHRpbWUgdGhlIHZhbHVlIGNhbGxiYWNrIHJldHVybnNcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLnNlYXJjaC5maWx0ZXIodGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0LCB2YWx1ZXMsIHtcbiAgICAgICAgICAgICAgICBwcmU6IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnNlYXJjaE9wdHMucHJlIHx8ICc8c3Bhbj4nLFxuICAgICAgICAgICAgICAgIHBvc3Q6IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnNlYXJjaE9wdHMucG9zdCB8fCAnPC9zcGFuPicsXG4gICAgICAgICAgICAgICAgZXh0cmFjdDogKGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsW3RoaXMuY3VycmVudC5jb2xsZWN0aW9uLmxvb2t1cF1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwKGVsLCB0aGlzLmN1cnJlbnQubWVudGlvblRleHQpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbG9va3VwIGF0dHJpYnV0ZSwgbG9va3VwIG11c3QgYmUgc3RyaW5nIG9yIGZ1bmN0aW9uLicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQuZmlsdGVyZWRJdGVtcyA9IGl0ZW1zXG5cbiAgICAgICAgICAgIGxldCB1bCA9IHRoaXMubWVudS5xdWVyeVNlbGVjdG9yKCd1bCcpXG5cbiAgICAgICAgICAgIHRoaXMucmFuZ2UucG9zaXRpb25NZW51QXRDYXJldChzY3JvbGxUbylcblxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLmhlYWRlclRlbXBsYXRlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgICAgICBoZWFkZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoZWFkZXJcIilcbiAgICAgICAgICAgICAgICBoZWFkZXIuaW5uZXJIVE1MID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uaGVhZGVyVGVtcGxhdGUodGV4dClcbiAgICAgICAgICAgICAgICBjb25zdCBvbGRIZWFkZXIgPSB0aGlzLm1lbnUucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJcIilcbiAgICAgICAgICAgICAgICBpZiAob2xkSGVhZGVyICYmIG9sZEhlYWRlci5yZW1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkSGVhZGVyLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvbGRIZWFkZXIgJiYgIW9sZEhlYWRlci5yZW1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkSGVhZGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob2xkSGVhZGVyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm1lbnUuaW5zZXJ0QmVmb3JlKGhlYWRlciwgdGhpcy5tZW51LmNoaWxkTm9kZXNbMF0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5vTWF0Y2hFdmVudCA9IG5ldyBDdXN0b21FdmVudCgndHJpYnV0ZS1uby1tYXRjaCcsIHsgZGV0YWlsOiB0aGlzLm1lbnUgfSlcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQuZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5vTWF0Y2hFdmVudClcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY3VycmVudC5jb2xsZWN0aW9uLm5vTWF0Y2hUZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVNZW51KClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1bC5pbm5lckhUTUwgPSB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5ub01hdGNoVGVtcGxhdGUoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1bC5pbm5lckhUTUwgPSAnJ1xuXG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBsaSA9IHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpXG4gICAgICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxldCBsaSA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gbGkuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JylcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUubW92ZW1lbnRZICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXRBY3RpdmVMaShpbmRleClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWVudVNlbGVjdGVkID09PSBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgbGkuY2xhc3NOYW1lID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uc2VsZWN0Q2xhc3NcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGkuaW5uZXJIVE1MID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubWVudUl0ZW1UZW1wbGF0ZShpdGVtKVxuICAgICAgICAgICAgICAgIHVsLmFwcGVuZENoaWxkKGxpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24udmFsdWVzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi52YWx1ZXModGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0LCBwcm9jZXNzVmFsdWVzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvY2Vzc1ZhbHVlcyh0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi52YWx1ZXMsIHRoaXMuY3VycmVudC5tZW50aW9uVGV4dClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1lbnUucXVlcnlTZWxlY3RvcihcInVsXCIpLnNjcm9sbFRvcCA9IDBcbiAgICB9XG5cbiAgICBzaG93TWVudUZvckNvbGxlY3Rpb24oZWxlbWVudCwgY29sbGVjdGlvbkluZGV4KSB7XG4gICAgICAgIGlmIChlbGVtZW50ICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnBsYWNlQ2FyZXRBdEVuZChlbGVtZW50KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24gPSB0aGlzLmNvbGxlY3Rpb25bY29sbGVjdGlvbkluZGV4IHx8IDBdXG4gICAgICAgIHRoaXMuY3VycmVudC5leHRlcm5hbFRyaWdnZXIgPSB0cnVlXG4gICAgICAgIHRoaXMuY3VycmVudC5lbGVtZW50ID0gZWxlbWVudFxuXG4gICAgICAgIGlmIChlbGVtZW50LmlzQ29udGVudEVkaXRhYmxlKVxuICAgICAgICAgICAgdGhpcy5pbnNlcnRUZXh0QXRDdXJzb3IodGhpcy5jdXJyZW50LmNvbGxlY3Rpb24udHJpZ2dlcilcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5pbnNlcnRBdENhcmV0KGVsZW1lbnQsIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnRyaWdnZXIpXG5cbiAgICAgICAgdGhpcy5zaG93TWVudUZvcihlbGVtZW50KVxuICAgIH1cblxuICAgIC8vIFRPRE86IG1ha2Ugc3VyZSB0aGlzIHdvcmtzIGZvciBpbnB1dHMvdGV4dGFyZWFzXG4gICAgcGxhY2VDYXJldEF0RW5kKGVsKSB7XG4gICAgICAgIGVsLmZvY3VzKCk7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93LmdldFNlbGVjdGlvbiAhPSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgJiYgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZVJhbmdlICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHZhciByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMoZWwpO1xuICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xuICAgICAgICAgICAgdmFyIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LmJvZHkuY3JlYXRlVGV4dFJhbmdlICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHZhciB0ZXh0UmFuZ2UgPSBkb2N1bWVudC5ib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xuICAgICAgICAgICAgdGV4dFJhbmdlLm1vdmVUb0VsZW1lbnRUZXh0KGVsKTtcbiAgICAgICAgICAgIHRleHRSYW5nZS5jb2xsYXBzZShmYWxzZSk7XG4gICAgICAgICAgICB0ZXh0UmFuZ2Uuc2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmb3IgY29udGVudGVkaXRhYmxlXG4gICAgaW5zZXJ0VGV4dEF0Q3Vyc29yKHRleHQpIHtcbiAgICAgICAgdmFyIHNlbCwgcmFuZ2UsIGh0bWw7XG4gICAgICAgIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcbiAgICAgICAgdmFyIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gICAgICAgIHJhbmdlLmluc2VydE5vZGUodGV4dE5vZGUpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHModGV4dE5vZGUpXG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKVxuICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxuICAgIH1cblxuICAgIC8vIGZvciByZWd1bGFyIGlucHV0c1xuICAgIGluc2VydEF0Q2FyZXQodGV4dGFyZWEsIHRleHQpIHtcbiAgICAgICAgdmFyIHNjcm9sbFBvcyA9IHRleHRhcmVhLnNjcm9sbFRvcDtcbiAgICAgICAgdmFyIGNhcmV0UG9zID0gdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQ7XG5cbiAgICAgICAgdmFyIGZyb250ID0gKHRleHRhcmVhLnZhbHVlKS5zdWJzdHJpbmcoMCwgY2FyZXRQb3MpO1xuICAgICAgICB2YXIgYmFjayA9ICh0ZXh0YXJlYS52YWx1ZSkuc3Vic3RyaW5nKHRleHRhcmVhLnNlbGVjdGlvbkVuZCwgdGV4dGFyZWEudmFsdWUubGVuZ3RoKTtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBmcm9udCArIHRleHQgKyBiYWNrO1xuICAgICAgICBjYXJldFBvcyA9IGNhcmV0UG9zICsgdGV4dC5sZW5ndGg7XG4gICAgICAgIHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0ID0gY2FyZXRQb3M7XG4gICAgICAgIHRleHRhcmVhLnNlbGVjdGlvbkVuZCA9IGNhcmV0UG9zO1xuICAgICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgICB0ZXh0YXJlYS5zY3JvbGxUb3AgPSBzY3JvbGxQb3M7XG4gICAgfVxuXG4gICAgaGlkZU1lbnUoKSB7XG4gICAgICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMubWVudS5zdHlsZS5jc3NUZXh0ID0gJ2Rpc3BsYXk6IG5vbmU7J1xuICAgICAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IDBcbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IHt9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RJdGVtQXRJbmRleChpbmRleCwgb3JpZ2luYWxFdmVudCkge1xuICAgICAgICBpbmRleCA9IHBhcnNlSW50KGluZGV4KVxuICAgICAgICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJyB8fCBpc05hTihpbmRleCkpIHJldHVyblxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuY3VycmVudC5maWx0ZXJlZEl0ZW1zW2luZGV4XVxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnNlbGVjdFRlbXBsYXRlKGl0ZW0pXG4gICAgICAgIGlmIChjb250ZW50ICE9PSBudWxsKSB0aGlzLnJlcGxhY2VUZXh0KGNvbnRlbnQsIG9yaWdpbmFsRXZlbnQsIGl0ZW0pXG4gICAgfVxuXG4gICAgcmVwbGFjZVRleHQoY29udGVudCwgb3JpZ2luYWxFdmVudCwgaXRlbSkge1xuICAgICAgICB0aGlzLnJhbmdlLnJlcGxhY2VUcmlnZ2VyVGV4dChjb250ZW50LCB0cnVlLCB0cnVlLCBvcmlnaW5hbEV2ZW50LCBpdGVtKVxuICAgIH1cblxuICAgIF9hcHBlbmQoY29sbGVjdGlvbiwgbmV3VmFsdWVzLCByZXBsYWNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29sbGVjdGlvbi52YWx1ZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGFwcGVuZCB0byB2YWx1ZXMsIGFzIGl0IGlzIGEgZnVuY3Rpb24uJylcbiAgICAgICAgfSBlbHNlIGlmICghcmVwbGFjZSkge1xuICAgICAgICAgICAgY29sbGVjdGlvbi52YWx1ZXMgPSBjb2xsZWN0aW9uLnZhbHVlcy5jb25jYXQobmV3VmFsdWVzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sbGVjdGlvbi52YWx1ZXMgPSBuZXdWYWx1ZXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGVuZChjb2xsZWN0aW9uSW5kZXgsIG5ld1ZhbHVlcywgcmVwbGFjZSkge1xuICAgICAgICBsZXQgaW5kZXggPSBwYXJzZUludChjb2xsZWN0aW9uSW5kZXgpXG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSB0aHJvdyBuZXcgRXJyb3IoJ3BsZWFzZSBwcm92aWRlIGFuIGluZGV4IGZvciB0aGUgY29sbGVjdGlvbiB0byB1cGRhdGUuJylcblxuICAgICAgICBsZXQgY29sbGVjdGlvbiA9IHRoaXMuY29sbGVjdGlvbltpbmRleF1cblxuICAgICAgICB0aGlzLl9hcHBlbmQoY29sbGVjdGlvbiwgbmV3VmFsdWVzLCByZXBsYWNlKVxuICAgIH1cblxuICAgIGFwcGVuZEN1cnJlbnQobmV3VmFsdWVzLCByZXBsYWNlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLl9hcHBlbmQodGhpcy5jdXJyZW50LmNvbGxlY3Rpb24sIG5ld1ZhbHVlcywgcmVwbGFjZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gYWN0aXZlIHN0YXRlLiBQbGVhc2UgdXNlIGFwcGVuZCBpbnN0ZWFkIGFuZCBwYXNzIGFuIGluZGV4LicpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXRhY2goZWwpIHtcbiAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVHJpYnV0ZV0gTXVzdCBwYXNzIGluIGEgRE9NIG5vZGUgb3IgTm9kZUxpc3QuJylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIGl0IGlzIGEgalF1ZXJ5IGNvbGxlY3Rpb25cbiAgICAgICAgaWYgKHR5cGVvZiBqUXVlcnkgIT09ICd1bmRlZmluZWQnICYmIGVsIGluc3RhbmNlb2YgalF1ZXJ5KSB7XG4gICAgICAgICAgICBlbCA9IGVsLmdldCgpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBJcyBlbCBhbiBBcnJheS9BcnJheS1saWtlIG9iamVjdD9cbiAgICAgICAgaWYgKGVsLmNvbnN0cnVjdG9yID09PSBOb2RlTGlzdCB8fCBlbC5jb25zdHJ1Y3RvciA9PT0gSFRNTENvbGxlY3Rpb24gfHwgZWwuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gZWwubGVuZ3RoXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGV0YWNoKGVsW2ldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZGV0YWNoKGVsKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2RldGFjaChlbCkge1xuICAgICAgICB0aGlzLmV2ZW50cy51bmJpbmQoZWwpXG4gICAgICAgIGlmIChlbC50cmlidXRlTWVudSkge1xuICAgICAgICAgICAgdGhpcy5tZW51RXZlbnRzLnVuYmluZChlbC50cmlidXRlTWVudSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zY3JvbGxDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsRXZlbnQpXG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10cmlidXRlJylcbiAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKGVsLnRyaWJ1dGVNZW51KSB7XG4gICAgICAgICAgICAgICAgZWwudHJpYnV0ZU1lbnUucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGU7XG4iLCJjbGFzcyBUcmlidXRlRXZlbnRzIHtcbiAgICBjb25zdHJ1Y3Rvcih0cmlidXRlKSB7XG4gICAgICAgIHRoaXMudHJpYnV0ZSA9IHRyaWJ1dGVcbiAgICAgICAgdGhpcy50cmlidXRlLmV2ZW50cyA9IHRoaXNcbiAgICB9XG5cbiAgICBzdGF0aWMga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICBrZXk6IDksXG4gICAgICAgICAgICB2YWx1ZTogJ1RBQidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiA4LFxuICAgICAgICAgICAgdmFsdWU6ICdERUxFVEUnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogMTMsXG4gICAgICAgICAgICB2YWx1ZTogJ0VOVEVSJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDI3LFxuICAgICAgICAgICAgdmFsdWU6ICdFU0NBUEUnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogMzIsXG4gICAgICAgICAgICB2YWx1ZTogJ1NQQUNFJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDM4LFxuICAgICAgICAgICAgdmFsdWU6ICdVUCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiA0MCxcbiAgICAgICAgICAgIHZhbHVlOiAnRE9XTidcbiAgICAgICAgfV1cbiAgICB9XG4gICAgXG4gICAgc3RhdGljIHJlbW92ZShlbGVtKSB7XG4gICAgICAgIGlmIChlbGVtICYmIGVsZW0ucmVtb3ZlKSB7XG4gICAgICAgICAgICBlbGVtLnJlbW92ZSgpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlbSAmJiAhZWxlbS5yZW1vdmUpIHtcbiAgICAgICAgICAgIGVsZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZChlbGVtZW50LCBlZGl0b3IpIHtcbiAgICAgICAgZWxlbWVudC5ib3VuZEtleWRvd24gPSB0aGlzLmtleWRvd24uYmluZChlbGVtZW50LCB0aGlzLCBlZGl0b3IpO1xuICAgICAgICBlbGVtZW50LmJvdW5kS2V5dXAgPSB0aGlzLmtleXVwLmJpbmQoZWxlbWVudCwgdGhpcyk7XG4gICAgICAgIGVsZW1lbnQuYm91bmRJbnB1dCA9IHRoaXMuaW5wdXQuYmluZChlbGVtZW50LCB0aGlzKTtcblxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZEtleWRvd24sIGZhbHNlKVxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJyxcbiAgICAgICAgICAgIGVsZW1lbnQuYm91bmRLZXl1cCwgZmFsc2UpXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZElucHV0LCBmYWxzZSlcbiAgICB9XG5cbiAgICB1bmJpbmQoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZEtleWRvd24sIGZhbHNlKVxuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJyxcbiAgICAgICAgICAgIGVsZW1lbnQuYm91bmRLZXl1cCwgZmFsc2UpXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZElucHV0LCBmYWxzZSlcblxuICAgICAgICBkZWxldGUgZWxlbWVudC5ib3VuZEtleWRvd25cbiAgICAgICAgZGVsZXRlIGVsZW1lbnQuYm91bmRLZXl1cFxuICAgICAgICBkZWxldGUgZWxlbWVudC5ib3VuZElucHV0XG4gICAgfVxuXG4gICAgc2Nyb2xsKGluc3RhbmNlLCBlKSB7XG4gICAgICAgIGluc3RhbmNlLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgaW5zdGFuY2UuaGlkZU1lbnUoKVxuICAgIH1cblxuICAgIGtleWRvd24oaW5zdGFuY2UsIGVkaXRvciwgZXZlbnQpIHtcbiAgICAgICAgaWYgKGluc3RhbmNlLnNob3VsZERlYWN0aXZhdGUoZXZlbnQpKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS50cmlidXRlLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgIGluc3RhbmNlLnRyaWJ1dGUuaGlkZU1lbnUoKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzXG4gICAgICAgIGluc3RhbmNlLmNvbW1hbmRFdmVudCA9IGZhbHNlXG5cbiAgICAgICAgVHJpYnV0ZUV2ZW50cy5rZXlzKCkuZm9yRWFjaChvID0+IHtcbiAgICAgICAgICAgIGlmIChvLmtleSA9PT0gZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNvbW1hbmRFdmVudCA9IHRydWVcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5jYWxsYmFja3MoKVtvLnZhbHVlLnRvTG93ZXJDYXNlKCldKGV2ZW50LCBlbGVtZW50KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIGNoZWNrIGlmIGtleSBpcyBhIHByaW50YWJsZSBjaGFyYWN0ZXJcbiAgICAgICAgY29uc3QgY2hhckNvZGUgPSAodHlwZW9mIGV2ZW50LndoaWNoID09PSBcInVuZGVmaW5lZFwiKSA/IGV2ZW50LmtleUNvZGUgOiBldmVudC53aGljaDtcbiAgICAgICAgY29uc3QgY2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hhckNvZGUpO1xuICAgICAgICBjb25zdCBhbGxvd2VkS2V5cyA9IFsxMywgOF1cblxuICAgICAgICBpZiAoIWFsbG93ZWRLZXlzLmluY2x1ZGVzKGNoYXJDb2RlKSAmJiAhL1xcdy8udGVzdChjaGFyKSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKCFpbnN0YW5jZS5jb21tYW5kRXZlbnQgfHwgYWxsb3dlZEtleXMuaW5jbHVkZXMoY2hhckNvZGUpKSAmJiBlZGl0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0KCkuYW5jaG9yTm9kZVxuICAgICAgICAgICAgaWYgKGFuY2hvciAmJiBhbmNob3IucGFyZW50Tm9kZSAmJiBhbmNob3IucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoXCJmci10cmlidXRlXCIpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gYW5jaG9yLnBhcmVudE5vZGVcbiAgICAgICAgICAgICAgICBjb25zdCBkb2NGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gJydcbiAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgIT09IDEzKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSAnQCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGl2LmZpcnN0Q2hpbGQgJiYgZG9jRnJhZy5hcHBlbmRDaGlsZChkaXYuZmlyc3RDaGlsZClcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNhdmUoKVxuICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYnJlYWtzIHdvcmRcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudC5wcmV2aW91c1NpYmxpbmcgJiYgcGFyZW50LnByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudDIgPSBwYXJlbnQucHJldmlvdXNTaWJsaW5nLnByZXZpb3VzU2libGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudDIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZnItdHJpYnV0ZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChwYXJlbnQyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBwYXJlbnQyLnJlbW92ZUNoaWxkKHBhcmVudDIuZmlyc3RDaGlsZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jRnJhZy5hcHBlbmRDaGlsZChjaGlsZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jRnJhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyaWJ1dGVFdmVudHMucmVtb3ZlKHBhcmVudC5wcmV2aW91c1NpYmxpbmcucHJldmlvdXNTaWJsaW5nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyaWJ1dGVFdmVudHMucmVtb3ZlKHBhcmVudC5wcmV2aW91c1NpYmxpbmcpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2hpbGUgKHBhcmVudC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5maXJzdENoaWxkKVxuICAgICAgICAgICAgICAgICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKGNoaWxkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJlbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoZG9jRnJhZywgcGFyZW50KVxuICAgICAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24ucmVzdG9yZSgpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dChpbnN0YW5jZSwgZXZlbnQpIHtcbiAgICAgICAgaW5zdGFuY2UuaW5wdXRFdmVudCA9IHRydWVcbiAgICAgICAgaW5zdGFuY2Uua2V5dXAuY2FsbCh0aGlzLCBpbnN0YW5jZSwgZXZlbnQpXG4gICAgfVxuXG4gICAgY2xpY2soaW5zdGFuY2UsIGV2ZW50KSB7XG4gICAgICAgIGxldCB0cmlidXRlID0gaW5zdGFuY2UudHJpYnV0ZVxuICAgICAgICBpZiAodHJpYnV0ZS5tZW51ICYmIHRyaWJ1dGUubWVudS5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSA9PT0gXCJoZWFkZXJcIiB8fCBldmVudC50YXJnZXQudGFnTmFtZSA9PT0gXCJVTFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbGkgPSBldmVudC50YXJnZXRcbiAgICAgICAgICAgIHdoaWxlIChsaS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnbGknKSB7XG4gICAgICAgICAgICAgICAgbGkgPSBsaS5wYXJlbnROb2RlXG4gICAgICAgICAgICAgICAgaWYgKCFsaSB8fCBsaSA9PT0gdHJpYnV0ZS5tZW51KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2Fubm90IGZpbmQgdGhlIDxsaT4gY29udGFpbmVyIGZvciB0aGUgY2xpY2snKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyaWJ1dGUuc2VsZWN0SXRlbUF0SW5kZXgobGkuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIGV2ZW50KVxuICAgICAgICAgICAgdHJpYnV0ZS5oaWRlTWVudSgpXG5cbiAgICAgICAgLy8gVE9ETzogc2hvdWxkIGZpcmUgd2l0aCBleHRlcm5hbFRyaWdnZXIgYW5kIHRhcmdldCBpcyBvdXRzaWRlIG9mIG1lbnVcbiAgICAgICAgfSBlbHNlIGlmICh0cmlidXRlLmN1cnJlbnQuZWxlbWVudCAmJiAhdHJpYnV0ZS5jdXJyZW50LmV4dGVybmFsVHJpZ2dlcikge1xuICAgICAgICAgICAgdHJpYnV0ZS5jdXJyZW50LmV4dGVybmFsVHJpZ2dlciA9IGZhbHNlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRyaWJ1dGUuaGlkZU1lbnUoKSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGtleXVwKGluc3RhbmNlLCBldmVudCkge1xuICAgICAgICBpZiAoaW5zdGFuY2UuaW5wdXRFdmVudCkge1xuICAgICAgICAgICAgaW5zdGFuY2UuaW5wdXRFdmVudCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFuY2UudXBkYXRlU2VsZWN0aW9uKHRoaXMpXG5cbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSByZXR1cm5cblxuICAgICAgICBpZiAoIWluc3RhbmNlLnRyaWJ1dGUuYWxsb3dTcGFjZXMgJiYgaW5zdGFuY2UudHJpYnV0ZS5oYXNUcmFpbGluZ1NwYWNlKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS50cmlidXRlLmhhc1RyYWlsaW5nU3BhY2UgPSBmYWxzZTtcbiAgICAgICAgICAgIGluc3RhbmNlLmNvbW1hbmRFdmVudCA9IHRydWU7XG4gICAgICAgICAgICBpbnN0YW5jZS5jYWxsYmFja3MoKVtcInNwYWNlXCJdKGV2ZW50LCB0aGlzKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpbnN0YW5jZS50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UudHJpYnV0ZS5hdXRvY29tcGxldGVNb2RlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY2FsbGJhY2tzKCkudHJpZ2dlckNoYXIoZXZlbnQsIHRoaXMsICcnKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5Q29kZSA9IGluc3RhbmNlLmdldEtleUNvZGUoaW5zdGFuY2UsIHRoaXMsIGV2ZW50KVxuICAgIFxuICAgICAgICAgICAgICAgIGlmIChpc05hTihrZXlDb2RlKSB8fCAha2V5Q29kZSkgcmV0dXJuXG4gICAgXG4gICAgICAgICAgICAgICAgbGV0IHRyaWdnZXIgPSBpbnN0YW5jZS50cmlidXRlLnRyaWdnZXJzKCkuZmluZCh0cmlnZ2VyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyaWdnZXIuY2hhckNvZGVBdCgwKSA9PT0ga2V5Q29kZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0cmlnZ2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5jYWxsYmFja3MoKS50cmlnZ2VyQ2hhcihldmVudCwgdGhpcywgdHJpZ2dlcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKGluc3RhbmNlLnRyaWJ1dGUuY3VycmVudC50cmlnZ2VyIHx8IGluc3RhbmNlLnRyaWJ1dGUuYXV0b2NvbXBsZXRlTW9kZSlcbiAgICAgICAgICAgICYmIGluc3RhbmNlLmNvbW1hbmRFdmVudCA9PT0gZmFsc2VcbiAgICAgICAgICAgIHx8IGluc3RhbmNlLnRyaWJ1dGUuaXNBY3RpdmUgJiYgZXZlbnQua2V5Q29kZSA9PT0gOCkge1xuICAgICAgICAgIGluc3RhbmNlLnRyaWJ1dGUuc2hvd01lbnVGb3IodGhpcywgdHJ1ZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZERlYWN0aXZhdGUoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHJldHVybiBmYWxzZVxuXG4gICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuY3VycmVudC5tZW50aW9uVGV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGxldCBldmVudEtleVByZXNzZWQgPSBmYWxzZVxuICAgICAgICAgICAgVHJpYnV0ZUV2ZW50cy5rZXlzKCkuZm9yRWFjaChvID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gby5rZXkpIGV2ZW50S2V5UHJlc3NlZCA9IHRydWVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHJldHVybiAhZXZlbnRLZXlQcmVzc2VkXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBnZXRLZXlDb2RlKGluc3RhbmNlLCBlbCwgZXZlbnQpIHtcbiAgICAgICAgbGV0IGNoYXJcbiAgICAgICAgbGV0IHRyaWJ1dGUgPSBpbnN0YW5jZS50cmlidXRlXG4gICAgICAgIGxldCBpbmZvID0gdHJpYnV0ZS5yYW5nZS5nZXRUcmlnZ2VySW5mbyhmYWxzZSwgdHJpYnV0ZS5oYXNUcmFpbGluZ1NwYWNlLCB0cnVlLCB0cmlidXRlLmFsbG93U3BhY2VzLCB0cmlidXRlLmF1dG9jb21wbGV0ZU1vZGUpXG5cbiAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiBpbmZvLm1lbnRpb25UcmlnZ2VyQ2hhci5jaGFyQ29kZUF0KDApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVNlbGVjdGlvbihlbCkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50ID0gZWxcbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLnRyaWJ1dGUucmFuZ2UuZ2V0VHJpZ2dlckluZm8oZmFsc2UsIHRoaXMudHJpYnV0ZS5oYXNUcmFpbGluZ1NwYWNlLCB0cnVlLCB0aGlzLnRyaWJ1dGUuYWxsb3dTcGFjZXMsIHRoaXMudHJpYnV0ZS5hdXRvY29tcGxldGVNb2RlKVxuXG4gICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUuY3VycmVudC5zZWxlY3RlZFBhdGggPSBpbmZvLm1lbnRpb25TZWxlY3RlZFBhdGhcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5jdXJyZW50Lm1lbnRpb25UZXh0ID0gaW5mby5tZW50aW9uVGV4dFxuICAgICAgICAgICAgdGhpcy50cmlidXRlLmN1cnJlbnQuc2VsZWN0ZWRPZmZzZXQgPSBpbmZvLm1lbnRpb25TZWxlY3RlZE9mZnNldFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsbGJhY2tzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHJpZ2dlckNoYXI6IChlLCBlbCwgdHJpZ2dlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB0cmlidXRlID0gdGhpcy50cmlidXRlXG4gICAgICAgICAgICAgICAgdHJpYnV0ZS5jdXJyZW50LnRyaWdnZXIgPSB0cmlnZ2VyXG5cbiAgICAgICAgICAgICAgICBsZXQgY29sbGVjdGlvbkl0ZW0gPSB0cmlidXRlLmNvbGxlY3Rpb24uZmluZChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udHJpZ2dlciA9PT0gdHJpZ2dlclxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICB0cmlidXRlLmN1cnJlbnQuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb25JdGVtXG4gICAgICAgICAgICAgICAgaWYgKHRyaWJ1dGUuaW5wdXRFdmVudCkgdHJpYnV0ZS5zaG93TWVudUZvcihlbCwgdHJ1ZSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnRlcjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY2hvb3NlIHNlbGVjdGlvblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUgJiYgdGhpcy50cmlidXRlLmN1cnJlbnQuZmlsdGVyZWRJdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5zZWxlY3RJdGVtQXRJbmRleCh0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkLCBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmhpZGVNZW51KClcbiAgICAgICAgICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXNjYXBlOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhYjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY2hvb3NlIGZpcnN0IG1hdGNoXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3MoKS5lbnRlcihlLCBlbClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGFjZTogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLnNwYWNlU2VsZWN0c01hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrcygpLmVudGVyKGUsIGVsKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnRyaWJ1dGUuYWxsb3dTcGFjZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaGlkZU1lbnUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBuYXZpZ2F0ZSB1cCB1bFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUgJiYgdGhpcy50cmlidXRlLmN1cnJlbnQuZmlsdGVyZWRJdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICBsZXQgY291bnQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudC5maWx0ZXJlZEl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZFxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IHNlbGVjdGVkICYmIHNlbGVjdGVkID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZC0tXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZUxpKClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQgPSBjb3VudCAtIDFcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZUxpKClcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5xdWVyeVNlbGVjdG9yKFwidWxcIikuc2Nyb2xsVG9wID0gdGhpcy50cmlidXRlLm1lbnUucXVlcnlTZWxlY3RvcihcInVsXCIpLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRvd246IChlLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIG5hdmlnYXRlIGRvd24gdWxcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlICYmIHRoaXMudHJpYnV0ZS5jdXJyZW50LmZpbHRlcmVkSXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ID0gdGhpcy50cmlidXRlLmN1cnJlbnQuZmlsdGVyZWRJdGVtcy5sZW5ndGggLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID4gc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQrK1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVMaSgpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgPT09IHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVMaSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5xdWVyeVNlbGVjdG9yKFwidWxcIikuc2Nyb2xsVG9wID0gMFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlbGV0ZTogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSAmJiB0aGlzLnRyaWJ1dGUuY3VycmVudC5tZW50aW9uVGV4dC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnNob3dNZW51Rm9yKGVsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEFjdGl2ZUxpKGluZGV4KSB7XG4gICAgICAgIGxldCBsaXMgPSB0aGlzLnRyaWJ1dGUubWVudS5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLFxuICAgICAgICAgICAgbGVuZ3RoID0gbGlzLmxlbmd0aCA+Pj4gMFxuXG4gICAgICAgIGlmIChpbmRleCkgdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZCA9IHBhcnNlSW50KGluZGV4KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbGkgPSBsaXNbaV1cbiAgICAgICAgICAgIGlmIChpID09PSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCh0aGlzLnRyaWJ1dGUuY3VycmVudC5jb2xsZWN0aW9uLnNlbGVjdENsYXNzKTtcblxuICAgICAgICAgICAgICAgIGxldCBsaUNsaWVudFJlY3QgPSBsaS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICBsZXQgbWVudUNsaWVudFJlY3QgPSB0aGlzLnRyaWJ1dGUubWVudS5xdWVyeVNlbGVjdG9yKFwidWxcIikuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAobGlDbGllbnRSZWN0LmJvdHRvbSA+IG1lbnVDbGllbnRSZWN0LmJvdHRvbSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsRGlzdGFuY2UgPSBsaUNsaWVudFJlY3QuYm90dG9tIC0gbWVudUNsaWVudFJlY3QuYm90dG9tO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5xdWVyeVNlbGVjdG9yKFwidWxcIikuc2Nyb2xsVG9wICs9IHNjcm9sbERpc3RhbmNlXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsaUNsaWVudFJlY3QudG9wIDwgbWVudUNsaWVudFJlY3QudG9wKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGxEaXN0YW5jZSA9IG1lbnVDbGllbnRSZWN0LnRvcCAtIGxpQ2xpZW50UmVjdC50b3A7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKS5zY3JvbGxUb3AgLT0gc2Nyb2xsRGlzdGFuY2VcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnRyaWJ1dGUuY3VycmVudC5jb2xsZWN0aW9uLnNlbGVjdENsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEZ1bGxIZWlnaHQoZWxlbSwgaW5jbHVkZU1hcmdpbikge1xuICAgICAgbGV0IGhlaWdodCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG5cbiAgICAgIGlmIChpbmNsdWRlTWFyZ2luKSB7XG4gICAgICAgIGxldCBzdHlsZSA9IGVsZW0uY3VycmVudFN0eWxlIHx8IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW0pXG4gICAgICAgIHJldHVybiBoZWlnaHQgKyBwYXJzZUZsb2F0KHN0eWxlLm1hcmdpblRvcCkgKyBwYXJzZUZsb2F0KHN0eWxlLm1hcmdpbkJvdHRvbSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlaWdodFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZUV2ZW50cztcbiIsImNsYXNzIFRyaWJ1dGVNZW51RXZlbnRzIHtcbiAgICBjb25zdHJ1Y3Rvcih0cmlidXRlKSB7XG4gICAgICAgIHRoaXMudHJpYnV0ZSA9IHRyaWJ1dGVcbiAgICAgICAgdGhpcy50cmlidXRlLm1lbnVFdmVudHMgPSB0aGlzXG4gICAgICAgIHRoaXMubWVudSA9IHRoaXMudHJpYnV0ZS5tZW51XG4gICAgfVxuXG4gICAgYmluZChtZW51KSB7XG4gICAgICAgIHRoaXMubWVudUNsaWNrRXZlbnQgPSB0aGlzLnRyaWJ1dGUuZXZlbnRzLmNsaWNrLmJpbmQobnVsbCwgdGhpcylcbiAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyU2Nyb2xsRXZlbnQgPSB0aGlzLmRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuc2hvd01lbnVGb3IodGhpcy50cmlidXRlLmN1cnJlbnQuZWxlbWVudCwgZmFsc2UpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDMwMCwgZmFsc2UpXG4gICAgICAgIHRoaXMud2luZG93UmVzaXplRXZlbnQgPSB0aGlzLmRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UucG9zaXRpb25NZW51QXRDYXJldCh0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAzMDAsIGZhbHNlKVxuXG4gICAgICAgIC8vIGZpeGVzIElFMTEgaXNzdWVzIHdpdGggbW91c2Vkb3duXG4gICAgICAgIHRoaXMudHJpYnV0ZS5yYW5nZS5nZXREb2N1bWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoJ01TUG9pbnRlckRvd24nLFxuICAgICAgICAgICAgdGhpcy5tZW51Q2xpY2tFdmVudCwgZmFsc2UpXG4gICAgICAgIHRoaXMudHJpYnV0ZS5yYW5nZS5nZXREb2N1bWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsXG4gICAgICAgICAgICB0aGlzLm1lbnVDbGlja0V2ZW50LCBmYWxzZSlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMud2luZG93UmVzaXplRXZlbnQpXG5cbiAgICAgICAgaWYgKHRoaXMubWVudUNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMubWVudUNvbnRhaW5lclNjcm9sbEV2ZW50LCBmYWxzZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm1lbnVDb250YWluZXJTY3JvbGxFdmVudClcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgdW5iaW5kKG1lbnUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlLnJhbmdlLmdldERvY3VtZW50KCkucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJyxcbiAgICAgICAgICAgIHRoaXMubWVudUNsaWNrRXZlbnQsIGZhbHNlKVxuICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UuZ2V0RG9jdW1lbnQoKS5yZW1vdmVFdmVudExpc3RlbmVyKCdNU1BvaW50ZXJEb3duJyxcbiAgICAgICAgICAgIHRoaXMubWVudUNsaWNrRXZlbnQsIGZhbHNlKVxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy53aW5kb3dSZXNpemVFdmVudClcblxuICAgICAgICBpZiAodGhpcy5tZW51Q29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnVDb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5tZW51Q29udGFpbmVyU2Nyb2xsRXZlbnQsIGZhbHNlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMubWVudUNvbnRhaW5lclNjcm9sbEV2ZW50KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgICAgIHZhciB0aW1lb3V0XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgYXJncyA9IGFyZ3VtZW50c1xuICAgICAgICAgICAgdmFyIGxhdGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsXG4gICAgICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dClcbiAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KVxuICAgICAgICAgICAgaWYgKGNhbGxOb3cpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncylcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlTWVudUV2ZW50cztcbiIsIi8vIFRoYW5rcyB0byBodHRwczovL2dpdGh1Yi5jb20vamVmZi1jb2xsaW5zL21lbnQuaW9cbmNsYXNzIFRyaWJ1dGVSYW5nZSB7XG4gICAgY29uc3RydWN0b3IodHJpYnV0ZSkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUgPSB0cmlidXRlXG4gICAgICAgIHRoaXMudHJpYnV0ZS5yYW5nZSA9IHRoaXNcbiAgICB9XG5cbiAgICBnZXREb2N1bWVudCgpIHtcbiAgICAgICAgbGV0IGlmcmFtZVxuICAgICAgICBpZiAodGhpcy50cmlidXRlLmN1cnJlbnQuY29sbGVjdGlvbikge1xuICAgICAgICAgICAgaWZyYW1lID0gdGhpcy50cmlidXRlLmN1cnJlbnQuY29sbGVjdGlvbi5pZnJhbWVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaWZyYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudFxuICAgIH1cblxuICAgIHBvc2l0aW9uTWVudUF0Q2FyZXQoc2Nyb2xsVG8pIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudCxcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzXG5cbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLmdldFRyaWdnZXJJbmZvKGZhbHNlLCB0aGlzLnRyaWJ1dGUuaGFzVHJhaWxpbmdTcGFjZSwgdHJ1ZSwgdGhpcy50cmlidXRlLmFsbG93U3BhY2VzLCB0aGlzLnRyaWJ1dGUuYXV0b2NvbXBsZXRlTW9kZSlcblxuICAgICAgICBpZiAodHlwZW9mIGluZm8gIT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIGlmKCF0aGlzLnRyaWJ1dGUucG9zaXRpb25NZW51KXtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS5jc3NUZXh0ID0gYGRpc3BsYXk6IGJsb2NrO2BcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVkaXRhYmxlKGNvbnRleHQuZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlcyA9IHRoaXMuZ2V0VGV4dEFyZWFPcklucHV0VW5kZXJsaW5lUG9zaXRpb24odGhpcy50cmlidXRlLmN1cnJlbnQuZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgaW5mby5tZW50aW9uUG9zaXRpb24pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlcyA9IHRoaXMuZ2V0Q29udGVudEVkaXRhYmxlQ2FyZXRQb3NpdGlvbihpbmZvLm1lbnRpb25Qb3NpdGlvbilcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS5jc3NUZXh0ID0gYHRvcDogJHtjb29yZGluYXRlcy50b3B9cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJHtjb29yZGluYXRlcy5sZWZ0fXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAke2Nvb3JkaW5hdGVzLnJpZ2h0fXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJHtjb29yZGluYXRlcy5ib3R0b219cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogMTAwMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7YFxuXG4gICAgICAgICAgICBpZiAoY29vcmRpbmF0ZXMubGVmdCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUubGVmdCA9ICdhdXRvJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29vcmRpbmF0ZXMudG9wID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS50b3AgPSAnYXV0bydcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNjcm9sbFRvKSB0aGlzLnNjcm9sbEludG9WaWV3KClcblxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBtZW51RGltZW5zaW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy50cmlidXRlLm1lbnUub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnRyaWJ1dGUubWVudS5vZmZzZXRIZWlnaHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IG1lbnVJc09mZlNjcmVlbiA9IHRoaXMuaXNNZW51T2ZmU2NyZWVuKGNvb3JkaW5hdGVzLCBtZW51RGltZW5zaW9ucylcblxuICAgICAgICAgICAgICAgIGxldCBtZW51SXNPZmZTY3JlZW5Ib3Jpem9udGFsbHkgPSB3aW5kb3cuaW5uZXJXaWR0aCA+IG1lbnVEaW1lbnNpb25zLndpZHRoICYmIChtZW51SXNPZmZTY3JlZW4ubGVmdCB8fCBtZW51SXNPZmZTY3JlZW4ucmlnaHQpXG4gICAgICAgICAgICAgICAgbGV0IG1lbnVJc09mZlNjcmVlblZlcnRpY2FsbHkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPiBtZW51RGltZW5zaW9ucy5oZWlnaHQgJiYgKG1lbnVJc09mZlNjcmVlbi50b3AgfHwgbWVudUlzT2ZmU2NyZWVuLmJvdHRvbSlcbiAgICAgICAgICAgICAgICBpZiAobWVudUlzT2ZmU2NyZWVuSG9yaXpvbnRhbGx5IHx8IG1lbnVJc09mZlNjcmVlblZlcnRpY2FsbHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5OiBub25lJ1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uTWVudUF0Q2FyZXQoc2Nyb2xsVG8pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMClcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5OiBub25lJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0RWxlbWVudCh0YXJnZXRFbGVtZW50LCBwYXRoLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IHJhbmdlXG4gICAgICAgIGxldCBlbGVtID0gdGFyZ2V0RWxlbWVudFxuXG4gICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBlbGVtID0gZWxlbS5jaGlsZE5vZGVzW3BhdGhbaV1dXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVsZW0ubGVuZ3RoIDwgb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCAtPSBlbGVtLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICBlbGVtID0gZWxlbS5uZXh0U2libGluZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMCAmJiAhZWxlbS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbSA9IGVsZW0ucHJldmlvdXNTaWJsaW5nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBzZWwgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpXG5cbiAgICAgICAgcmFuZ2UgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlUmFuZ2UoKVxuICAgICAgICByYW5nZS5zZXRTdGFydChlbGVtLCBvZmZzZXQpXG4gICAgICAgIHJhbmdlLnNldEVuZChlbGVtLCBvZmZzZXQpXG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge31cblxuICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpXG4gICAgICAgIHRhcmdldEVsZW1lbnQuZm9jdXMoKVxuICAgIH1cblxuICAgIHJlcGxhY2VUcmlnZ2VyVGV4dCh0ZXh0LCByZXF1aXJlTGVhZGluZ1NwYWNlLCBoYXNUcmFpbGluZ1NwYWNlLCBvcmlnaW5hbEV2ZW50LCBpdGVtKSB7XG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy50cmlidXRlLmN1cnJlbnRcbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLmdldFRyaWdnZXJJbmZvKHRydWUsIGhhc1RyYWlsaW5nU3BhY2UsIHJlcXVpcmVMZWFkaW5nU3BhY2UsIHRoaXMudHJpYnV0ZS5hbGxvd1NwYWNlcywgdGhpcy50cmlidXRlLmF1dG9jb21wbGV0ZU1vZGUpXG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBldmVudFxuICAgICAgICBsZXQgcmVwbGFjZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCd0cmlidXRlLXJlcGxhY2VkJywge1xuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgaXRlbTogaXRlbSxcbiAgICAgICAgICAgICAgICBldmVudDogb3JpZ2luYWxFdmVudFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChpbmZvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZShjb250ZXh0LmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgbGV0IG15RmllbGQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50XG4gICAgICAgICAgICAgICAgbGV0IHRleHRTdWZmaXggPSB0eXBlb2YgdGhpcy50cmlidXRlLnJlcGxhY2VUZXh0U3VmZml4ID09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy50cmlidXRlLnJlcGxhY2VUZXh0U3VmZml4XG4gICAgICAgICAgICAgICAgICAgIDogJyAnXG4gICAgICAgICAgICAgICAgdGV4dCArPSB0ZXh0U3VmZml4XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0UG9zID0gaW5mby5tZW50aW9uUG9zaXRpb25cbiAgICAgICAgICAgICAgICBsZXQgZW5kUG9zID0gaW5mby5tZW50aW9uUG9zaXRpb24gKyBpbmZvLm1lbnRpb25UZXh0Lmxlbmd0aCArIHRleHRTdWZmaXgubGVuZ3RoXG4gICAgICAgICAgICAgICAgbXlGaWVsZC52YWx1ZSA9IG15RmllbGQudmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0UG9zKSArIHRleHQgK1xuICAgICAgICAgICAgICAgICAgICBteUZpZWxkLnZhbHVlLnN1YnN0cmluZyhlbmRQb3MsIG15RmllbGQudmFsdWUubGVuZ3RoKVxuICAgICAgICAgICAgICAgIG15RmllbGQuc2VsZWN0aW9uU3RhcnQgPSBzdGFydFBvcyArIHRleHQubGVuZ3RoXG4gICAgICAgICAgICAgICAgbXlGaWVsZC5zZWxlY3Rpb25FbmQgPSBzdGFydFBvcyArIHRleHQubGVuZ3RoXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGFkZCBhIHNwYWNlIHRvIHRoZSBlbmQgb2YgdGhlIHBhc3RlZCB0ZXh0XG4gICAgICAgICAgICAgICAgbGV0IHRleHRTdWZmaXggPSB0eXBlb2YgdGhpcy50cmlidXRlLnJlcGxhY2VUZXh0U3VmZml4ID09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy50cmlidXRlLnJlcGxhY2VUZXh0U3VmZml4XG4gICAgICAgICAgICAgICAgICAgIDogJ1xceEEwJ1xuICAgICAgICAgICAgICAgIHRleHQgKz0gdGV4dFN1ZmZpeFxuICAgICAgICAgICAgICAgIHRoaXMucGFzdGVIdG1sKHRleHQsIGluZm8ubWVudGlvblBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICBpbmZvLm1lbnRpb25Qb3NpdGlvbiArIGluZm8ubWVudGlvblRleHQubGVuZ3RoICsgIXRoaXMudHJpYnV0ZS5hdXRvY29tcGxldGVNb2RlKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250ZXh0LmVsZW1lbnQuZGlzcGF0Y2hFdmVudChyZXBsYWNlRXZlbnQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXN0ZUh0bWwoaHRtbCwgc3RhcnRQb3MsIGVuZFBvcykge1xuICAgICAgICBsZXQgcmFuZ2UsIHNlbFxuICAgICAgICBzZWwgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpXG4gICAgICAgIHJhbmdlID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZVJhbmdlKClcbiAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoc2VsLmFuY2hvck5vZGUsIHN0YXJ0UG9zKVxuICAgICAgICByYW5nZS5zZXRFbmQoc2VsLmFuY2hvck5vZGUsIGVuZFBvcylcbiAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKVxuXG4gICAgICAgIGxldCBlbCA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBlbC5pbm5lckhUTUwgPSBodG1sXG4gICAgICAgIGxldCBmcmFnID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcbiAgICAgICAgICAgIG5vZGUsIGxhc3ROb2RlXG4gICAgICAgIHdoaWxlICgobm9kZSA9IGVsLmZpcnN0Q2hpbGQpKSB7XG4gICAgICAgICAgICBsYXN0Tm9kZSA9IGZyYWcuYXBwZW5kQ2hpbGQobm9kZSlcbiAgICAgICAgfVxuICAgICAgICByYW5nZS5pbnNlcnROb2RlKGZyYWcpXG5cbiAgICAgICAgLy8gUHJlc2VydmUgdGhlIHNlbGVjdGlvblxuICAgICAgICBpZiAobGFzdE5vZGUpIHtcbiAgICAgICAgICAgIHJhbmdlID0gcmFuZ2UuY2xvbmVSYW5nZSgpXG4gICAgICAgICAgICByYW5nZS5zZXRTdGFydEFmdGVyKGxhc3ROb2RlKVxuICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSlcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0V2luZG93U2VsZWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy50cmlidXRlLmNvbGxlY3Rpb24uaWZyYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmlidXRlLmNvbGxlY3Rpb24uaWZyYW1lLmNvbnRlbnRXaW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB3aW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICB9XG5cbiAgICBnZXROb2RlUG9zaXRpb25JblBhcmVudChlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAwXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZE5vZGVzW2ldXG5cbiAgICAgICAgICAgIGlmIChub2RlID09PSBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENvbnRlbnRFZGl0YWJsZVNlbGVjdGVkUGF0aChjdHgpIHtcbiAgICAgICAgbGV0IHNlbCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKClcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gc2VsLmFuY2hvck5vZGVcbiAgICAgICAgbGV0IHBhdGggPSBbXVxuICAgICAgICBsZXQgb2Zmc2V0XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBpXG4gICAgICAgICAgICBsZXQgY2UgPSBzZWxlY3RlZC5jb250ZW50RWRpdGFibGVcbiAgICAgICAgICAgIHdoaWxlIChzZWxlY3RlZCAhPT0gbnVsbCAmJiBjZSAhPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgaSA9IHRoaXMuZ2V0Tm9kZVBvc2l0aW9uSW5QYXJlbnQoc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgcGF0aC5wdXNoKGkpXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3RlZC5wYXJlbnROb2RlXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlID0gc2VsZWN0ZWQuY29udGVudEVkaXRhYmxlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF0aC5yZXZlcnNlKClcblxuICAgICAgICAgICAgLy8gZ2V0UmFuZ2VBdCBtYXkgbm90IGV4aXN0LCBuZWVkIGFsdGVybmF0aXZlXG4gICAgICAgICAgICBvZmZzZXQgPSBzZWwuZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldFxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZCxcbiAgICAgICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUZXh0UHJlY2VkaW5nQ3VycmVudFNlbGVjdGlvbigpIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudCxcbiAgICAgICAgICAgIHRleHQgPSAnJ1xuXG4gICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZShjb250ZXh0LmVsZW1lbnQpKSB7XG4gICAgICAgICAgICBsZXQgdGV4dENvbXBvbmVudCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAodGV4dENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGxldCBzdGFydFBvcyA9IHRleHRDb21wb25lbnQuc2VsZWN0aW9uU3RhcnRcbiAgICAgICAgICAgICAgICBpZiAodGV4dENvbXBvbmVudC52YWx1ZSAmJiBzdGFydFBvcyA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0Q29tcG9uZW50LnZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEVsZW0gPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpLmFuY2hvck5vZGVcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkRWxlbSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHdvcmtpbmdOb2RlQ29udGVudCA9IHNlbGVjdGVkRWxlbS50ZXh0Q29udGVudFxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RTdGFydE9mZnNldCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldFxuXG4gICAgICAgICAgICAgICAgaWYgKHdvcmtpbmdOb2RlQ29udGVudCAmJiBzZWxlY3RTdGFydE9mZnNldCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSB3b3JraW5nTm9kZUNvbnRlbnQuc3Vic3RyaW5nKDAsIHNlbGVjdFN0YXJ0T2Zmc2V0KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0ZXh0XG4gICAgfVxuXG4gICAgZ2V0TGFzdFdvcmRJblRleHQodGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHUwMEEwL2csICcgJyk7IC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI5ODUwNDA3L2hvdy1kby1pLXJlcGxhY2UtdW5pY29kZS1jaGFyYWN0ZXItdTAwYTAtd2l0aC1hLXNwYWNlLWluLWphdmFzY3JpcHRcbiAgICAgICAgbGV0IHdvcmRzQXJyYXkgPSB0ZXh0LnNwbGl0KCcgJylcbiAgICAgICAgbGV0IHdvcmxkc0NvdW50ID0gd29yZHNBcnJheS5sZW5ndGggLSAxXG4gICAgICAgIHJldHVybiB3b3Jkc0FycmF5W3dvcmxkc0NvdW50XS50cmltKClcbiAgICB9XG5cbiAgICBnZXRUcmlnZ2VySW5mbyhtZW51QWxyZWFkeUFjdGl2ZSwgaGFzVHJhaWxpbmdTcGFjZSwgcmVxdWlyZUxlYWRpbmdTcGFjZSwgYWxsb3dTcGFjZXMsIGlzQXV0b2NvbXBsZXRlKSB7XG4gICAgICAgIGxldCBjdHggPSB0aGlzLnRyaWJ1dGUuY3VycmVudFxuICAgICAgICBsZXQgc2VsZWN0ZWQsIHBhdGgsIG9mZnNldFxuXG4gICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZShjdHguZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy50cmlidXRlLmN1cnJlbnQuZWxlbWVudFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbkluZm8gPSB0aGlzLmdldENvbnRlbnRFZGl0YWJsZVNlbGVjdGVkUGF0aChjdHgpXG5cbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb25JbmZvKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3Rpb25JbmZvLnNlbGVjdGVkXG4gICAgICAgICAgICAgICAgcGF0aCA9IHNlbGVjdGlvbkluZm8ucGF0aFxuICAgICAgICAgICAgICAgIG9mZnNldCA9IHNlbGVjdGlvbkluZm8ub2Zmc2V0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWZmZWN0aXZlUmFuZ2UgPSB0aGlzLmdldFRleHRQcmVjZWRpbmdDdXJyZW50U2VsZWN0aW9uKClcbiAgICAgICAgbGV0IGxhc3RXb3JkT2ZFZmZlY3RpdmVSYW5nZSA9IHRoaXMuZ2V0TGFzdFdvcmRJblRleHQoZWZmZWN0aXZlUmFuZ2UpXG5cbiAgICAgICAgaWYgKGlzQXV0b2NvbXBsZXRlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG1lbnRpb25Qb3NpdGlvbjogZWZmZWN0aXZlUmFuZ2UubGVuZ3RoIC0gbGFzdFdvcmRPZkVmZmVjdGl2ZVJhbmdlLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBtZW50aW9uVGV4dDogbGFzdFdvcmRPZkVmZmVjdGl2ZVJhbmdlLFxuICAgICAgICAgICAgICAgIG1lbnRpb25TZWxlY3RlZEVsZW1lbnQ6IHNlbGVjdGVkLFxuICAgICAgICAgICAgICAgIG1lbnRpb25TZWxlY3RlZFBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkT2Zmc2V0OiBvZmZzZXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlZmZlY3RpdmVSYW5nZSAhPT0gdW5kZWZpbmVkICYmIGVmZmVjdGl2ZVJhbmdlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zID0gLTFcbiAgICAgICAgICAgIGxldCB0cmlnZ2VyQ2hhclxuXG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUuY29sbGVjdGlvbi5mb3JFYWNoKGNvbmZpZyA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGMgPSBjb25maWcudHJpZ2dlclxuICAgICAgICAgICAgICAgIGxldCBpZHggPSBjb25maWcucmVxdWlyZUxlYWRpbmdTcGFjZSA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEluZGV4V2l0aExlYWRpbmdTcGFjZShlZmZlY3RpdmVSYW5nZSwgYykgOlxuICAgICAgICAgICAgICAgICAgICBlZmZlY3RpdmVSYW5nZS5sYXN0SW5kZXhPZihjKVxuXG4gICAgICAgICAgICAgICAgaWYgKGlkeCA+IG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcykge1xuICAgICAgICAgICAgICAgICAgICBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgPSBpZHhcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckNoYXIgPSBjXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVMZWFkaW5nU3BhY2UgPSBjb25maWcucmVxdWlyZUxlYWRpbmdTcGFjZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmIChtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgPj0gMCAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zID09PSAwIHx8XG4gICAgICAgICAgICAgICAgICAgICFyZXF1aXJlTGVhZGluZ1NwYWNlIHx8XG4gICAgICAgICAgICAgICAgICAgIC9bXFx4QTBcXHNdL2cudGVzdChcbiAgICAgICAgICAgICAgICAgICAgICAgIGVmZmVjdGl2ZVJhbmdlLnN1YnN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcylcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50VHJpZ2dlclNuaXBwZXQgPSBlZmZlY3RpdmVSYW5nZS5zdWJzdHJpbmcobW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zICsgMSxcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0aXZlUmFuZ2UubGVuZ3RoKVxuXG4gICAgICAgICAgICAgICAgdHJpZ2dlckNoYXIgPSBlZmZlY3RpdmVSYW5nZS5zdWJzdHJpbmcobW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zLCBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgKyAxKVxuICAgICAgICAgICAgICAgIGxldCBmaXJzdFNuaXBwZXRDaGFyID0gY3VycmVudFRyaWdnZXJTbmlwcGV0LnN1YnN0cmluZygwLCAxKVxuICAgICAgICAgICAgICAgIGxldCBsZWFkaW5nU3BhY2UgPSBjdXJyZW50VHJpZ2dlclNuaXBwZXQubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFNuaXBwZXRDaGFyID09PSAnICcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0U25pcHBldENoYXIgPT09ICdcXHhBMCdcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIGlmIChoYXNUcmFpbGluZ1NwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUcmlnZ2VyU25pcHBldCA9IGN1cnJlbnRUcmlnZ2VyU25pcHBldC50cmltKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVnZXggPSBhbGxvd1NwYWNlcyA/IC9bXlxcUyBdL2cgOiAvW1xceEEwXFxzXS9nO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmhhc1RyYWlsaW5nU3BhY2UgPSByZWdleC50ZXN0KGN1cnJlbnRUcmlnZ2VyU25pcHBldCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWxlYWRpbmdTcGFjZSAmJiAobWVudUFscmVhZHlBY3RpdmUgfHwgIShyZWdleC50ZXN0KGN1cnJlbnRUcmlnZ2VyU25pcHBldCkpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblBvc2l0aW9uOiBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uVGV4dDogY3VycmVudFRyaWdnZXJTbmlwcGV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkRWxlbWVudDogc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uU2VsZWN0ZWRQYXRoOiBwYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkT2Zmc2V0OiBvZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uVHJpZ2dlckNoYXI6IHRyaWdnZXJDaGFyXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SW5kZXhXaXRoTGVhZGluZ1NwYWNlIChzdHIsIGNoYXIpIHtcbiAgICAgICAgbGV0IHJldmVyc2VkU3RyID0gc3RyLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJylcbiAgICAgICAgbGV0IGluZGV4ID0gLTFcblxuICAgICAgICBmb3IgKGxldCBjaWR4ID0gMCwgbGVuID0gc3RyLmxlbmd0aDsgY2lkeCA8IGxlbjsgY2lkeCsrKSB7XG4gICAgICAgICAgICBsZXQgZmlyc3RDaGFyID0gY2lkeCA9PT0gc3RyLmxlbmd0aCAtIDFcbiAgICAgICAgICAgIGxldCBsZWFkaW5nU3BhY2UgPSAvXFxzLy50ZXN0KHJldmVyc2VkU3RyW2NpZHggKyAxXSlcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IGNoYXIgPT09IHJldmVyc2VkU3RyW2NpZHhdXG5cbiAgICAgICAgICAgIGlmIChtYXRjaCAmJiAoZmlyc3RDaGFyIHx8IGxlYWRpbmdTcGFjZSkpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IHN0ci5sZW5ndGggLSAxIC0gY2lkeFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXhcbiAgICB9XG5cbiAgICBpc0NvbnRlbnRFZGl0YWJsZShlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50Lm5vZGVOYW1lICE9PSAnSU5QVVQnICYmIGVsZW1lbnQubm9kZU5hbWUgIT09ICdURVhUQVJFQSdcbiAgICB9XG5cbiAgICBpc01lbnVPZmZTY3JlZW4oY29vcmRpbmF0ZXMsIG1lbnVEaW1lbnNpb25zKSB7XG4gICAgICAgIGxldCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgIGxldCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgbGV0IGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICAgICAgICBsZXQgd2luZG93TGVmdCA9ICh3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jLnNjcm9sbExlZnQpIC0gKGRvYy5jbGllbnRMZWZ0IHx8IDApXG4gICAgICAgIGxldCB3aW5kb3dUb3AgPSAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3ApIC0gKGRvYy5jbGllbnRUb3AgfHwgMClcblxuICAgICAgICBsZXQgbWVudVRvcCA9IHR5cGVvZiBjb29yZGluYXRlcy50b3AgPT09ICdudW1iZXInID8gY29vcmRpbmF0ZXMudG9wIDogd2luZG93VG9wICsgd2luZG93SGVpZ2h0IC0gY29vcmRpbmF0ZXMuYm90dG9tIC0gbWVudURpbWVuc2lvbnMuaGVpZ2h0XG4gICAgICAgIGxldCBtZW51UmlnaHQgPSB0eXBlb2YgY29vcmRpbmF0ZXMucmlnaHQgPT09ICdudW1iZXInID8gY29vcmRpbmF0ZXMucmlnaHQgOiBjb29yZGluYXRlcy5sZWZ0ICsgbWVudURpbWVuc2lvbnMud2lkdGhcbiAgICAgICAgbGV0IG1lbnVCb3R0b20gPSB0eXBlb2YgY29vcmRpbmF0ZXMuYm90dG9tID09PSAnbnVtYmVyJyA/IGNvb3JkaW5hdGVzLmJvdHRvbSA6IGNvb3JkaW5hdGVzLnRvcCArIG1lbnVEaW1lbnNpb25zLmhlaWdodFxuICAgICAgICBsZXQgbWVudUxlZnQgPSB0eXBlb2YgY29vcmRpbmF0ZXMubGVmdCA9PT0gJ251bWJlcicgPyBjb29yZGluYXRlcy5sZWZ0IDogd2luZG93TGVmdCArIHdpbmRvd1dpZHRoIC0gY29vcmRpbmF0ZXMucmlnaHQgLSBtZW51RGltZW5zaW9ucy53aWR0aFxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3A6IG1lbnVUb3AgPCBNYXRoLmZsb29yKHdpbmRvd1RvcCksXG4gICAgICAgICAgICByaWdodDogbWVudVJpZ2h0ID4gTWF0aC5jZWlsKHdpbmRvd0xlZnQgKyB3aW5kb3dXaWR0aCksXG4gICAgICAgICAgICBib3R0b206IG1lbnVCb3R0b20gPiBNYXRoLmNlaWwod2luZG93VG9wICsgd2luZG93SGVpZ2h0KSxcbiAgICAgICAgICAgIGxlZnQ6IG1lbnVMZWZ0IDwgTWF0aC5mbG9vcih3aW5kb3dMZWZ0KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TWVudURpbWVuc2lvbnMoKSB7XG4gICAgICAgIC8vIFdpZHRoIG9mIHRoZSBtZW51IGRlcGVuZHMgb2YgaXRzIGNvbnRlbnRzIGFuZCBwb3NpdGlvblxuICAgICAgICAvLyBXZSBtdXN0IGNoZWNrIHdoYXQgaXRzIHdpZHRoIHdvdWxkIGJlIHdpdGhvdXQgYW55IG9ic3RydWN0aW9uXG4gICAgICAgIC8vIFRoaXMgd2F5LCB3ZSBjYW4gYWNoaWV2ZSBnb29kIHBvc2l0aW9uaW5nIGZvciBmbGlwcGluZyB0aGUgbWVudVxuICAgICAgICBsZXQgZGltZW5zaW9ucyA9IHtcbiAgICAgICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICAgICAgaGVpZ2h0OiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS5jc3NUZXh0ID0gYHRvcDogMHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAxMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTsgaGlkZGVuO2BcbiAgICAgICBkaW1lbnNpb25zLndpZHRoID0gdGhpcy50cmlidXRlLm1lbnUub2Zmc2V0V2lkdGhcbiAgICAgICBkaW1lbnNpb25zLmhlaWdodCA9IHRoaXMudHJpYnV0ZS5tZW51Lm9mZnNldEhlaWdodFxuXG4gICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9IGBkaXNwbGF5OiBub25lO2BcblxuICAgICAgIHJldHVybiBkaW1lbnNpb25zXG4gICAgfVxuXG4gICAgZ2V0VGV4dEFyZWFPcklucHV0VW5kZXJsaW5lUG9zaXRpb24oZWxlbWVudCwgcG9zaXRpb24sIGZsaXBwZWQpIHtcbiAgICAgICAgbGV0IHByb3BlcnRpZXMgPSBbJ2RpcmVjdGlvbicsICdib3hTaXppbmcnLCAnd2lkdGgnLCAnaGVpZ2h0JywgJ292ZXJmbG93WCcsXG4gICAgICAgICAgICAnb3ZlcmZsb3dZJywgJ2JvcmRlclRvcFdpZHRoJywgJ2JvcmRlclJpZ2h0V2lkdGgnLFxuICAgICAgICAgICAgJ2JvcmRlckJvdHRvbVdpZHRoJywgJ2JvcmRlckxlZnRXaWR0aCcsICdwYWRkaW5nVG9wJyxcbiAgICAgICAgICAgICdwYWRkaW5nUmlnaHQnLCAncGFkZGluZ0JvdHRvbScsICdwYWRkaW5nTGVmdCcsXG4gICAgICAgICAgICAnZm9udFN0eWxlJywgJ2ZvbnRWYXJpYW50JywgJ2ZvbnRXZWlnaHQnLCAnZm9udFN0cmV0Y2gnLFxuICAgICAgICAgICAgJ2ZvbnRTaXplJywgJ2ZvbnRTaXplQWRqdXN0JywgJ2xpbmVIZWlnaHQnLCAnZm9udEZhbWlseScsXG4gICAgICAgICAgICAndGV4dEFsaWduJywgJ3RleHRUcmFuc2Zvcm0nLCAndGV4dEluZGVudCcsXG4gICAgICAgICAgICAndGV4dERlY29yYXRpb24nLCAnbGV0dGVyU3BhY2luZycsICd3b3JkU3BhY2luZydcbiAgICAgICAgXVxuXG4gICAgICAgIGxldCBpc0ZpcmVmb3ggPSAod2luZG93Lm1veklubmVyU2NyZWVuWCAhPT0gbnVsbClcblxuICAgICAgICBsZXQgZGl2ID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGRpdi5pZCA9ICdpbnB1dC10ZXh0YXJlYS1jYXJldC1wb3NpdGlvbi1taXJyb3ItZGl2J1xuICAgICAgICB0aGlzLmdldERvY3VtZW50KCkuYm9keS5hcHBlbmRDaGlsZChkaXYpXG5cbiAgICAgICAgbGV0IHN0eWxlID0gZGl2LnN0eWxlXG4gICAgICAgIGxldCBjb21wdXRlZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlID8gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSA6IGVsZW1lbnQuY3VycmVudFN0eWxlXG5cbiAgICAgICAgc3R5bGUud2hpdGVTcGFjZSA9ICdwcmUtd3JhcCdcbiAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUgIT09ICdJTlBVVCcpIHtcbiAgICAgICAgICAgIHN0eWxlLndvcmRXcmFwID0gJ2JyZWFrLXdvcmQnXG4gICAgICAgIH1cblxuICAgICAgICAvLyBwb3NpdGlvbiBvZmYtc2NyZWVuXG4gICAgICAgIHN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgICBzdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbidcblxuICAgICAgICAvLyB0cmFuc2ZlciB0aGUgZWxlbWVudCdzIHByb3BlcnRpZXMgdG8gdGhlIGRpdlxuICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgICAgICBzdHlsZVtwcm9wXSA9IGNvbXB1dGVkW3Byb3BdXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKGlzRmlyZWZveCkge1xuICAgICAgICAgICAgc3R5bGUud2lkdGggPSBgJHsocGFyc2VJbnQoY29tcHV0ZWQud2lkdGgpIC0gMil9cHhgXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5zY3JvbGxIZWlnaHQgPiBwYXJzZUludChjb21wdXRlZC5oZWlnaHQpKVxuICAgICAgICAgICAgICAgIHN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXG4gICAgICAgIH1cblxuICAgICAgICBkaXYudGV4dENvbnRlbnQgPSBlbGVtZW50LnZhbHVlLnN1YnN0cmluZygwLCBwb3NpdGlvbilcblxuICAgICAgICBpZiAoZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0lOUFVUJykge1xuICAgICAgICAgICAgZGl2LnRleHRDb250ZW50ID0gZGl2LnRleHRDb250ZW50LnJlcGxhY2UoL1xccy9nLCAnwqAnKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSBlbGVtZW50LnZhbHVlLnN1YnN0cmluZyhwb3NpdGlvbikgfHwgJy4nXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChzcGFuKVxuXG4gICAgICAgIGxldCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBsZXQgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4gICAgICAgIGxldCB3aW5kb3dMZWZ0ID0gKHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2Muc2Nyb2xsTGVmdCkgLSAoZG9jLmNsaWVudExlZnQgfHwgMClcbiAgICAgICAgbGV0IHdpbmRvd1RvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgLSAoZG9jLmNsaWVudFRvcCB8fCAwKVxuXG4gICAgICAgIGxldCBjb29yZGluYXRlcyA9IHtcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyB3aW5kb3dUb3AgKyBzcGFuLm9mZnNldFRvcCArIHBhcnNlSW50KGNvbXB1dGVkLmJvcmRlclRvcFdpZHRoKSArIHBhcnNlSW50KGNvbXB1dGVkLmZvbnRTaXplKSAtIGVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luZG93TGVmdCArIHNwYW4ub2Zmc2V0TGVmdCArIHBhcnNlSW50KGNvbXB1dGVkLmJvcmRlckxlZnRXaWR0aClcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgIGxldCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcblxuICAgICAgICBsZXQgbWVudURpbWVuc2lvbnMgPSB0aGlzLmdldE1lbnVEaW1lbnNpb25zKClcbiAgICAgICAgbGV0IG1lbnVJc09mZlNjcmVlbiA9IHRoaXMuaXNNZW51T2ZmU2NyZWVuKGNvb3JkaW5hdGVzLCBtZW51RGltZW5zaW9ucylcblxuICAgICAgICBpZiAobWVudUlzT2ZmU2NyZWVuLnJpZ2h0KSB7XG4gICAgICAgICAgICBjb29yZGluYXRlcy5yaWdodCA9IHdpbmRvd1dpZHRoIC0gY29vcmRpbmF0ZXMubGVmdFxuICAgICAgICAgICAgY29vcmRpbmF0ZXMubGVmdCA9ICdhdXRvJ1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhcmVudEhlaWdodCA9IHRoaXMudHJpYnV0ZS5tZW51Q29udGFpbmVyXG4gICAgICAgICAgICA/IHRoaXMudHJpYnV0ZS5tZW51Q29udGFpbmVyLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgOiB0aGlzLmdldERvY3VtZW50KCkuYm9keS5vZmZzZXRIZWlnaHRcblxuICAgICAgICBpZiAobWVudUlzT2ZmU2NyZWVuLmJvdHRvbSkge1xuICAgICAgICAgICAgbGV0IHBhcmVudFJlY3QgPSB0aGlzLnRyaWJ1dGUubWVudUNvbnRhaW5lclxuICAgICAgICAgICAgICAgID8gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICA6IHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICBsZXQgc2Nyb2xsU3RpbGxBdmFpbGFibGUgPSBwYXJlbnRIZWlnaHQgLSAod2luZG93SGVpZ2h0IC0gcGFyZW50UmVjdC50b3ApXG5cbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLmJvdHRvbSA9IHNjcm9sbFN0aWxsQXZhaWxhYmxlICsgKHdpbmRvd0hlaWdodCAtIHJlY3QudG9wIC0gc3Bhbi5vZmZzZXRUb3ApXG4gICAgICAgICAgICBjb29yZGluYXRlcy50b3AgPSAnYXV0bydcbiAgICAgICAgfVxuXG4gICAgICAgIG1lbnVJc09mZlNjcmVlbiA9IHRoaXMuaXNNZW51T2ZmU2NyZWVuKGNvb3JkaW5hdGVzLCBtZW51RGltZW5zaW9ucylcbiAgICAgICAgaWYgKG1lbnVJc09mZlNjcmVlbi5sZWZ0KSB7XG4gICAgICAgICAgICBjb29yZGluYXRlcy5sZWZ0ID0gd2luZG93V2lkdGggPiBtZW51RGltZW5zaW9ucy53aWR0aFxuICAgICAgICAgICAgICAgID8gd2luZG93TGVmdCArIHdpbmRvd1dpZHRoIC0gbWVudURpbWVuc2lvbnMud2lkdGhcbiAgICAgICAgICAgICAgICA6IHdpbmRvd0xlZnRcbiAgICAgICAgICAgIGRlbGV0ZSBjb29yZGluYXRlcy5yaWdodFxuICAgICAgICB9XG4gICAgICAgIGlmIChtZW51SXNPZmZTY3JlZW4udG9wKSB7XG4gICAgICAgICAgICBjb29yZGluYXRlcy50b3AgPSB3aW5kb3dIZWlnaHQgPiBtZW51RGltZW5zaW9ucy5oZWlnaHRcbiAgICAgICAgICAgICAgICA/IHdpbmRvd1RvcCArIHdpbmRvd0hlaWdodCAtIG1lbnVEaW1lbnNpb25zLmhlaWdodFxuICAgICAgICAgICAgICAgIDogd2luZG93VG9wXG4gICAgICAgICAgICBkZWxldGUgY29vcmRpbmF0ZXMuYm90dG9tXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldERvY3VtZW50KCkuYm9keS5yZW1vdmVDaGlsZChkaXYpXG4gICAgICAgIHJldHVybiBjb29yZGluYXRlc1xuICAgIH1cblxuICAgIGdldENvbnRlbnRFZGl0YWJsZUNhcmV0UG9zaXRpb24oc2VsZWN0ZWROb2RlUG9zaXRpb24pIHtcbiAgICAgICAgbGV0IG1hcmtlclRleHRDaGFyID0gJ++7vydcbiAgICAgICAgbGV0IG1hcmtlckVsLCBtYXJrZXJJZCA9IGBzZWxfJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX1fJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc3Vic3RyKDIpfWBcbiAgICAgICAgbGV0IHJhbmdlXG4gICAgICAgIGxldCBzZWwgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpXG4gICAgICAgIGxldCBwcmV2UmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKVxuXG4gICAgICAgIHJhbmdlID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZVJhbmdlKClcbiAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoc2VsLmFuY2hvck5vZGUsIHNlbGVjdGVkTm9kZVBvc2l0aW9uKVxuICAgICAgICByYW5nZS5zZXRFbmQoc2VsLmFuY2hvck5vZGUsIHNlbGVjdGVkTm9kZVBvc2l0aW9uKVxuXG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgbWFya2VyIGVsZW1lbnQgY29udGFpbmluZyBhIHNpbmdsZSBpbnZpc2libGUgY2hhcmFjdGVyIHVzaW5nIERPTSBtZXRob2RzIGFuZCBpbnNlcnQgaXRcbiAgICAgICAgbWFya2VyRWwgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIG1hcmtlckVsLmlkID0gbWFya2VySWRcblxuICAgICAgICBtYXJrZXJFbC5hcHBlbmRDaGlsZCh0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlVGV4dE5vZGUobWFya2VyVGV4dENoYXIpKVxuICAgICAgICByYW5nZS5pbnNlcnROb2RlKG1hcmtlckVsKVxuICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICAgICAgc2VsLmFkZFJhbmdlKHByZXZSYW5nZSlcblxuICAgICAgICBsZXQgcmVjdCA9IG1hcmtlckVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGxldCBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcbiAgICAgICAgbGV0IHdpbmRvd0xlZnQgPSAod2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvYy5zY3JvbGxMZWZ0KSAtIChkb2MuY2xpZW50TGVmdCB8fCAwKVxuICAgICAgICBsZXQgd2luZG93VG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2Muc2Nyb2xsVG9wKSAtIChkb2MuY2xpZW50VG9wIHx8IDApXG4gICAgICAgIGxldCBjb29yZGluYXRlcyA9IHtcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbmRvd0xlZnQsXG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgbWFya2VyRWwub2Zmc2V0SGVpZ2h0ICsgd2luZG93VG9wXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgbGV0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuXG4gICAgICAgIGxldCBtZW51RGltZW5zaW9ucyA9IHRoaXMuZ2V0TWVudURpbWVuc2lvbnMoKVxuICAgICAgICBsZXQgbWVudUlzT2ZmU2NyZWVuID0gdGhpcy5pc01lbnVPZmZTY3JlZW4oY29vcmRpbmF0ZXMsIG1lbnVEaW1lbnNpb25zKVxuXG4gICAgICAgIGlmIChtZW51SXNPZmZTY3JlZW4ucmlnaHQpIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLmxlZnQgPSAnYXV0bydcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnJpZ2h0ID0gd2luZG93V2lkdGggLSByZWN0LmxlZnQgLSB3aW5kb3dMZWZ0XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFyZW50SGVpZ2h0ID0gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXJcbiAgICAgICAgICAgID8gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXIub2Zmc2V0SGVpZ2h0XG4gICAgICAgICAgICA6IHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5Lm9mZnNldEhlaWdodFxuXG4gICAgICAgIGlmIChtZW51SXNPZmZTY3JlZW4uYm90dG9tKSB7XG4gICAgICAgICAgICBsZXQgcGFyZW50UmVjdCA9IHRoaXMudHJpYnV0ZS5tZW51Q29udGFpbmVyXG4gICAgICAgICAgICAgICAgPyB0aGlzLnRyaWJ1dGUubWVudUNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgICAgIDogdGhpcy5nZXREb2N1bWVudCgpLmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgIGxldCBzY3JvbGxTdGlsbEF2YWlsYWJsZSA9IHBhcmVudEhlaWdodCAtICh3aW5kb3dIZWlnaHQgLSBwYXJlbnRSZWN0LnRvcClcblxuICAgICAgICAgICAgY29vcmRpbmF0ZXMudG9wID0gJ2F1dG8nXG4gICAgICAgICAgICBjb29yZGluYXRlcy5ib3R0b20gPSBzY3JvbGxTdGlsbEF2YWlsYWJsZSArICh3aW5kb3dIZWlnaHQgLSByZWN0LnRvcClcbiAgICAgICAgfVxuXG4gICAgICAgIG1lbnVJc09mZlNjcmVlbiA9IHRoaXMuaXNNZW51T2ZmU2NyZWVuKGNvb3JkaW5hdGVzLCBtZW51RGltZW5zaW9ucylcbiAgICAgICAgaWYgKG1lbnVJc09mZlNjcmVlbi5sZWZ0KSB7XG4gICAgICAgICAgICBjb29yZGluYXRlcy5sZWZ0ID0gd2luZG93V2lkdGggPiBtZW51RGltZW5zaW9ucy53aWR0aFxuICAgICAgICAgICAgICAgID8gd2luZG93TGVmdCArIHdpbmRvd1dpZHRoIC0gbWVudURpbWVuc2lvbnMud2lkdGhcbiAgICAgICAgICAgICAgICA6IHdpbmRvd0xlZnRcbiAgICAgICAgICAgIGRlbGV0ZSBjb29yZGluYXRlcy5yaWdodFxuICAgICAgICB9XG4gICAgICAgIGlmIChtZW51SXNPZmZTY3JlZW4udG9wKSB7XG4gICAgICAgICAgICBjb29yZGluYXRlcy50b3AgPSB3aW5kb3dIZWlnaHQgPiBtZW51RGltZW5zaW9ucy5oZWlnaHRcbiAgICAgICAgICAgICAgICA/IHdpbmRvd1RvcCArIHdpbmRvd0hlaWdodCAtIG1lbnVEaW1lbnNpb25zLmhlaWdodFxuICAgICAgICAgICAgICAgIDogd2luZG93VG9wXG4gICAgICAgICAgICBkZWxldGUgY29vcmRpbmF0ZXMuYm90dG9tXG4gICAgICAgIH1cblxuICAgICAgICBtYXJrZXJFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG1hcmtlckVsKVxuICAgICAgICByZXR1cm4gY29vcmRpbmF0ZXNcbiAgICB9XG5cbiAgICBzY3JvbGxJbnRvVmlldyhlbGVtKSB7XG4gICAgICAgIGxldCByZWFzb25hYmxlQnVmZmVyID0gMjAsXG4gICAgICAgICAgICBjbGllbnRSZWN0XG4gICAgICAgIGxldCBtYXhTY3JvbGxEaXNwbGFjZW1lbnQgPSAxMDBcbiAgICAgICAgbGV0IGUgPSB0aGlzLm1lbnVcblxuICAgICAgICBpZiAodHlwZW9mIGUgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cbiAgICAgICAgd2hpbGUgKGNsaWVudFJlY3QgPT09IHVuZGVmaW5lZCB8fCBjbGllbnRSZWN0LmhlaWdodCA9PT0gMCkge1xuICAgICAgICAgICAgY2xpZW50UmVjdCA9IGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgICAgICAgICAgaWYgKGNsaWVudFJlY3QuaGVpZ2h0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZSA9IGUuY2hpbGROb2Rlc1swXVxuICAgICAgICAgICAgICAgIGlmIChlID09PSB1bmRlZmluZWQgfHwgIWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlbGVtVG9wID0gY2xpZW50UmVjdC50b3BcbiAgICAgICAgbGV0IGVsZW1Cb3R0b20gPSBlbGVtVG9wICsgY2xpZW50UmVjdC5oZWlnaHRcblxuICAgICAgICBpZiAoZWxlbVRvcCA8IDApIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCB3aW5kb3cucGFnZVlPZmZzZXQgKyBjbGllbnRSZWN0LnRvcCAtIHJlYXNvbmFibGVCdWZmZXIpXG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbUJvdHRvbSA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAgICAgbGV0IG1heFkgPSB3aW5kb3cucGFnZVlPZmZzZXQgKyBjbGllbnRSZWN0LnRvcCAtIHJlYXNvbmFibGVCdWZmZXJcblxuICAgICAgICAgICAgaWYgKG1heFkgLSB3aW5kb3cucGFnZVlPZmZzZXQgPiBtYXhTY3JvbGxEaXNwbGFjZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBtYXhZID0gd2luZG93LnBhZ2VZT2Zmc2V0ICsgbWF4U2Nyb2xsRGlzcGxhY2VtZW50XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB0YXJnZXRZID0gd2luZG93LnBhZ2VZT2Zmc2V0IC0gKHdpbmRvdy5pbm5lckhlaWdodCAtIGVsZW1Cb3R0b20pXG5cbiAgICAgICAgICAgIGlmICh0YXJnZXRZID4gbWF4WSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFkgPSBtYXhZXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCB0YXJnZXRZKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGVSYW5nZTtcbiIsIi8vIFRoYW5rcyB0byBodHRwczovL2dpdGh1Yi5jb20vbWF0dHlvcmsvZnV6enlcbmNsYXNzIFRyaWJ1dGVTZWFyY2gge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUuc2VhcmNoID0gdGhpc1xuICAgIH1cblxuICAgIHNpbXBsZUZpbHRlcihwYXR0ZXJuLCBhcnJheSkge1xuICAgICAgICByZXR1cm4gYXJyYXkuZmlsdGVyKHN0cmluZyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50ZXN0KHBhdHRlcm4sIHN0cmluZylcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0ZXN0KHBhdHRlcm4sIHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaChwYXR0ZXJuLCBzdHJpbmcpICE9PSBudWxsXG4gICAgfVxuXG4gICAgbWF0Y2gocGF0dGVybiwgc3RyaW5nLCBvcHRzKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9XG4gICAgICAgIGxldCBwYXR0ZXJuSWR4ID0gMCxcbiAgICAgICAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgICAgICAgbGVuID0gc3RyaW5nLmxlbmd0aCxcbiAgICAgICAgICAgIHRvdGFsU2NvcmUgPSAwLFxuICAgICAgICAgICAgY3VyclNjb3JlID0gMCxcbiAgICAgICAgICAgIHByZSA9IG9wdHMucHJlIHx8ICcnLFxuICAgICAgICAgICAgcG9zdCA9IG9wdHMucG9zdCB8fCAnJyxcbiAgICAgICAgICAgIGNvbXBhcmVTdHJpbmcgPSBvcHRzLmNhc2VTZW5zaXRpdmUgJiYgc3RyaW5nIHx8IHN0cmluZy50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgY2gsIGNvbXBhcmVDaGFyXG5cbiAgICAgICAgcGF0dGVybiA9IG9wdHMuY2FzZVNlbnNpdGl2ZSAmJiBwYXR0ZXJuIHx8IHBhdHRlcm4udG9Mb3dlckNhc2UoKVxuXG4gICAgICAgIGxldCBwYXR0ZXJuQ2FjaGUgPSB0aGlzLnRyYXZlcnNlKGNvbXBhcmVTdHJpbmcsIHBhdHRlcm4sIDAsIDAsIFtdKVxuICAgICAgICBpZiAoIXBhdHRlcm5DYWNoZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZW5kZXJlZDogdGhpcy5yZW5kZXIoc3RyaW5nLCBwYXR0ZXJuQ2FjaGUuY2FjaGUsIHByZSwgcG9zdCksXG4gICAgICAgICAgICBzY29yZTogcGF0dGVybkNhY2hlLnNjb3JlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmF2ZXJzZShzdHJpbmcsIHBhdHRlcm4sIHN0cmluZ0luZGV4LCBwYXR0ZXJuSW5kZXgsIHBhdHRlcm5DYWNoZSkge1xuICAgICAgICAvLyBpZiB0aGUgcGF0dGVybiBzZWFyY2ggYXQgZW5kXG4gICAgICAgIGlmIChwYXR0ZXJuLmxlbmd0aCA9PT0gcGF0dGVybkluZGV4KSB7XG5cbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBzY29yZSBhbmQgY29weSB0aGUgY2FjaGUgY29udGFpbmluZyB0aGUgaW5kaWNlcyB3aGVyZSBpdCdzIGZvdW5kXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNjb3JlOiB0aGlzLmNhbGN1bGF0ZVNjb3JlKHBhdHRlcm5DYWNoZSksXG4gICAgICAgICAgICAgICAgY2FjaGU6IHBhdHRlcm5DYWNoZS5zbGljZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBzdHJpbmcgYXQgZW5kIG9yIHJlbWFpbmluZyBwYXR0ZXJuID4gcmVtYWluaW5nIHN0cmluZ1xuICAgICAgICBpZiAoc3RyaW5nLmxlbmd0aCA9PT0gc3RyaW5nSW5kZXggfHwgcGF0dGVybi5sZW5ndGggLSBwYXR0ZXJuSW5kZXggPiBzdHJpbmcubGVuZ3RoIC0gc3RyaW5nSW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjID0gcGF0dGVybltwYXR0ZXJuSW5kZXhdXG4gICAgICAgIGxldCBpbmRleCA9IHN0cmluZy5pbmRleE9mKGMsIHN0cmluZ0luZGV4KVxuICAgICAgICBsZXQgYmVzdCwgdGVtcFxuXG4gICAgICAgIHdoaWxlIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICBwYXR0ZXJuQ2FjaGUucHVzaChpbmRleClcbiAgICAgICAgICAgIHRlbXAgPSB0aGlzLnRyYXZlcnNlKHN0cmluZywgcGF0dGVybiwgaW5kZXggKyAxLCBwYXR0ZXJuSW5kZXggKyAxLCBwYXR0ZXJuQ2FjaGUpXG4gICAgICAgICAgICBwYXR0ZXJuQ2FjaGUucG9wKClcblxuICAgICAgICAgICAgLy8gaWYgZG93bnN0cmVhbSB0cmF2ZXJzYWwgZmFpbGVkLCByZXR1cm4gYmVzdCBhbnN3ZXIgc28gZmFyXG4gICAgICAgICAgICBpZiAoIXRlbXApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmVzdFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWJlc3QgfHwgYmVzdC5zY29yZSA8IHRlbXAuc2NvcmUpIHtcbiAgICAgICAgICAgICAgICBiZXN0ID0gdGVtcFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbmRleCA9IHN0cmluZy5pbmRleE9mKGMsIGluZGV4ICsgMSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBiZXN0XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlU2NvcmUocGF0dGVybkNhY2hlKSB7XG4gICAgICAgIGxldCBzY29yZSA9IDBcbiAgICAgICAgbGV0IHRlbXAgPSAxXG5cbiAgICAgICAgcGF0dGVybkNhY2hlLmZvckVhY2goKGluZGV4LCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAocGF0dGVybkNhY2hlW2kgLSAxXSArIDEgPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXAgKz0gdGVtcCArIDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXAgPSAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzY29yZSArPSB0ZW1wXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHNjb3JlXG4gICAgfVxuXG4gICAgcmVuZGVyKHN0cmluZywgaW5kaWNlcywgcHJlLCBwb3N0KSB7XG4gICAgICAgIHZhciByZW5kZXJlZCA9IHN0cmluZy5zdWJzdHJpbmcoMCwgaW5kaWNlc1swXSlcblxuICAgICAgICBpbmRpY2VzLmZvckVhY2goKGluZGV4LCBpKSA9PiB7XG4gICAgICAgICAgICByZW5kZXJlZCArPSBwcmUgKyBzdHJpbmdbaW5kZXhdICsgcG9zdCArXG4gICAgICAgICAgICAgICAgc3RyaW5nLnN1YnN0cmluZyhpbmRleCArIDEsIChpbmRpY2VzW2kgKyAxXSkgPyBpbmRpY2VzW2kgKyAxXSA6IHN0cmluZy5sZW5ndGgpXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHJlbmRlcmVkXG4gICAgfVxuXG4gICAgZmlsdGVyKHBhdHRlcm4sIGFyciwgb3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuICAgICAgICByZXR1cm4gYXJyXG4gICAgICAgICAgICAucmVkdWNlKChwcmV2LCBlbGVtZW50LCBpZHgsIGFycikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzdHIgPSBlbGVtZW50XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0cy5leHRyYWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciA9IG9wdHMuZXh0cmFjdChlbGVtZW50KVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghc3RyKSB7IC8vIHRha2UgY2FyZSBvZiB1bmRlZmluZWRzIC8gbnVsbHMgLyBldGMuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSAnJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHJlbmRlcmVkID0gdGhpcy5tYXRjaChwYXR0ZXJuLCBzdHIsIG9wdHMpXG5cbiAgICAgICAgICAgICAgICBpZiAocmVuZGVyZWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2W3ByZXYubGVuZ3RoXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZzogcmVuZGVyZWQucmVuZGVyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogcmVuZGVyZWQuc2NvcmUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaWR4LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWw6IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2XG4gICAgICAgICAgICB9LCBbXSlcblxuICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbXBhcmUgPSBiLnNjb3JlIC0gYS5zY29yZVxuICAgICAgICAgICAgaWYgKGNvbXBhcmUpIHJldHVybiBjb21wYXJlXG4gICAgICAgICAgICByZXR1cm4gYS5pbmRleCAtIGIuaW5kZXhcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGVTZWFyY2g7XG4iLCIvKipcbiogVHJpYnV0ZS5qc1xuKiBOYXRpdmUgRVM2IEphdmFTY3JpcHQgQG1lbnRpb24gUGx1Z2luXG4qKi9cblxuaW1wb3J0IFRyaWJ1dGUgZnJvbSBcIi4vVHJpYnV0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlO1xuIiwiaWYgKCFBcnJheS5wcm90b3R5cGUuZmluZCkge1xuICAgIEFycmF5LnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XG4gICAgICAgIGlmICh0aGlzID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5wcm90b3R5cGUuZmluZCBjYWxsZWQgb24gbnVsbCBvciB1bmRlZmluZWQnKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdCA9IE9iamVjdCh0aGlzKVxuICAgICAgICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGggPj4+IDBcbiAgICAgICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV1cbiAgICAgICAgdmFyIHZhbHVlXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFsdWUgPSBsaXN0W2ldXG4gICAgICAgICAgICBpZiAocHJlZGljYXRlLmNhbGwodGhpc0FyZywgdmFsdWUsIGksIGxpc3QpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbn1cblxuaWYgKHdpbmRvdyAmJiB0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgZnVuY3Rpb24gQ3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcykge1xuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7XG4gICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgZGV0YWlsOiB1bmRlZmluZWRcbiAgICB9XG4gICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKVxuICAgIHJldHVybiBldnRcbiAgfVxuXG4gaWYgKHR5cGVvZiB3aW5kb3cuRXZlbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSB3aW5kb3cuRXZlbnQucHJvdG90eXBlXG4gfVxuXG4gIHdpbmRvdy5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50XG59Il19
