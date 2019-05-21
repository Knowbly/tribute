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
            isValidSelection = _ref$isValidSelection === undefined ? null : _ref$isValidSelection;

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
                }(isValidSelection)
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
                    }(isValidSelection)
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

                ul.innerHTML = '';

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

            if (!editor || ![8, 46].includes(event.keyCode)) {
                return;
            }

            /*
            const anchor = editor.selection.get().anchorNode
            if (TributeEvents.isInsideMention(anchor)) {
                TributeEvents.removeCurrentMention(editor, event)
                return
            }*/

            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                event.stopPropagation();
                editor.cursor[event.keyCode === 8 ? 'backspace' : 'del']();
                instance.callbacks().delete(event, element, editor);
                return false;
            }
            /*
            // TODO handle ctrl supr / del
            const precText = instance.tribute.range.getTextPrecedingCurrentSelection();
             const startsWithTrigger = /(?:^|\s)(@[a-z0-9]\w*)/gi
            console.log(precText)
            debugger
            if (precText.trim() !== "" && !startsWithTrigger.test(precText)) {
                return;
            }
            if ((event.ctrlKey || event.metaKey) && event.keyCode === 8) {
                TributeEvents.removePreviousMention(editor, event)
            } else if ((event.ctrlKey || event.metaKey) && event.keyCode === 46) {
                TributeEvents.removeNextMention(editor, event)
            }*/
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
                        instance.callbacks().triggerChar(event, this, trigger);
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
                    var words = text.split(" ");
                    if (words[words.length - 1].split('@').length - 1 > 1) {
                        return;
                    }
                    if (words[words.length - 1].trim()[0] !== '@') {
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
    }, {
        key: 'isInsideMention',
        value: function isInsideMention(anchor) {
            if (anchor && anchor.classList && anchor.classList.contains("fr-tribute")) {
                return true;
            }
            return anchor && anchor.parentNode && anchor.parentNode.classList.contains("fr-tribute");
        }
    }, {
        key: 'removeCurrentMention',
        value: function removeCurrentMention(editor, event) {
            var charCode = typeof event.which === "undefined" ? event.keyCode : event.which;
            var anchor = editor.selection.get().anchorNode;
            TributeEvents.removeMention(anchor, editor, charCode);
        }
    }, {
        key: 'removeMention',
        value: function removeMention(anchor, editor, charCode) {
            if (!editor) {
                return;
            }
            if (TributeEvents.isInsideMention(anchor)) {
                var treatAnchorAsParent = anchor && anchor.classList && anchor.classList.contains("fr-tribute");
                var parent = treatAnchorAsParent ? anchor : anchor.parentNode;
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
    }, {
        key: 'removeRangeMention',
        value: function removeRangeMention(editor, event) {
            if (editor) {
                if (!editor.selection.isCollapsed()) {
                    var _editor$selection$ran = editor.selection.ranges()[0],
                        startContainer = _editor$selection$ran.startContainer,
                        endContainer = _editor$selection$ran.endContainer;

                    var charCode = typeof event.which === "undefined" ? event.keyCode : event.which;
                    TributeEvents.removeMention(startContainer.parentNode, editor, charCode);
                    TributeEvents.removeMention(endContainer.parentNode, editor, charCode);
                } else {
                    return false;
                }
            }
        }
    }, {
        key: 'removePreviousMention',
        value: function removePreviousMention(editor, event) {
            var charCode = typeof event.which === "undefined" ? event.keyCode : event.which;
            var anchor = editor.selection.get().anchorNode;
            var elem = anchor.previousSibling || anchor.parentNode.previousSibling;
            TributeEvents.removeMention(elem, editor, charCode);
        }
    }, {
        key: 'removeNextMention',
        value: function removeNextMention(editor, event) {
            var charCode = typeof event.which === "undefined" ? event.keyCode : event.which;
            var anchor = editor.selection.get().anchorNode;
            var elem = anchor.nextSibling || anchor.parentNode.nextSibling;
            TributeEvents.removeMention(elem, editor, charCode);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvVHJpYnV0ZS5qcyIsInNyYy9UcmlidXRlRXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVNZW51RXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVSYW5nZS5qcyIsInNyYy9UcmlidXRlU2VhcmNoLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVNLE87QUFDRiwyQkF3Qkc7QUFBQTs7QUFBQSwrQkF2QkMsTUF1QkQ7QUFBQSxZQXZCQyxNQXVCRCwrQkF2QlUsSUF1QlY7QUFBQSwrQkF0QkMsTUFzQkQ7QUFBQSxZQXRCQyxNQXNCRCwrQkF0QlUsSUFzQlY7QUFBQSxvQ0FyQkMsV0FxQkQ7QUFBQSxZQXJCQyxXQXFCRCxvQ0FyQmUsV0FxQmY7QUFBQSxnQ0FwQkMsT0FvQkQ7QUFBQSxZQXBCQyxPQW9CRCxnQ0FwQlcsR0FvQlg7QUFBQSx5Q0FuQkMsZ0JBbUJEO0FBQUEsWUFuQkMsZ0JBbUJELHlDQW5Cb0IsS0FtQnBCO0FBQUEsdUNBbEJDLGNBa0JEO0FBQUEsWUFsQkMsY0FrQkQsdUNBbEJrQixJQWtCbEI7QUFBQSx5Q0FqQkMsZ0JBaUJEO0FBQUEsWUFqQkMsZ0JBaUJELHlDQWpCb0IsSUFpQnBCO0FBQUEsK0JBaEJDLE1BZ0JEO0FBQUEsWUFoQkMsTUFnQkQsK0JBaEJVLEtBZ0JWO0FBQUEsaUNBZkMsUUFlRDtBQUFBLFlBZkMsUUFlRCxpQ0FmWSxPQWVaO0FBQUEsbUNBZEMsVUFjRDtBQUFBLFlBZEMsVUFjRCxtQ0FkYyxJQWNkO0FBQUEsc0NBYkMsYUFhRDtBQUFBLFlBYkMsYUFhRCxzQ0FiaUIsSUFhakI7QUFBQSx3Q0FaQyxlQVlEO0FBQUEsWUFaQyxlQVlELHdDQVptQixJQVluQjtBQUFBLHdDQVhDLGVBV0Q7QUFBQSxZ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NUMsRUFBd0Q7QUFBQSxRQUM3QyxXQUQ2QyxHQUN0RCxTQUFTLFdBQVQsQ0FBcUIsS0FBckIsRUFBNEIsTUFBNUIsRUFBb0M7QUFDbEMsaUJBQVMsVUFBVTtBQUNqQixxQkFBUyxLQURRO0FBRWpCLHdCQUFZLEtBRks7QUFHakIsb0JBQVE7QUFIUyxTQUFuQjtBQUtBLFlBQUksTUFBTSxTQUFTLFdBQVQsQ0FBcUIsYUFBckIsQ0FBVjtBQUNBLFlBQUksZUFBSixDQUFvQixLQUFwQixFQUEyQixPQUFPLE9BQWxDLEVBQTJDLE9BQU8sVUFBbEQsRUFBOEQsT0FBTyxNQUFyRTtBQUNBLGVBQU8sR0FBUDtBQUNELEtBVnFEOztBQVl2RCxRQUFJLE9BQU8sT0FBTyxLQUFkLEtBQXdCLFdBQTVCLEVBQXlDO0FBQ3ZDLG9CQUFZLFNBQVosR0FBd0IsT0FBTyxLQUFQLENBQWEsU0FBckM7QUFDRDs7QUFFQSxXQUFPLFdBQVAsR0FBcUIsV0FBckI7QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBUcmlidXRlVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCBUcmlidXRlRXZlbnRzIGZyb20gXCIuL1RyaWJ1dGVFdmVudHNcIjtcbmltcG9ydCBUcmlidXRlTWVudUV2ZW50cyBmcm9tIFwiLi9UcmlidXRlTWVudUV2ZW50c1wiO1xuaW1wb3J0IFRyaWJ1dGVSYW5nZSBmcm9tIFwiLi9UcmlidXRlUmFuZ2VcIjtcbmltcG9ydCBUcmlidXRlU2VhcmNoIGZyb20gXCIuL1RyaWJ1dGVTZWFyY2hcIjtcblxuY2xhc3MgVHJpYnV0ZSB7XG4gICAgY29uc3RydWN0b3Ioe1xuICAgICAgICB2YWx1ZXMgPSBudWxsLFxuICAgICAgICBpZnJhbWUgPSBudWxsLFxuICAgICAgICBzZWxlY3RDbGFzcyA9ICdoaWdobGlnaHQnLFxuICAgICAgICB0cmlnZ2VyID0gJ0AnLFxuICAgICAgICBhdXRvY29tcGxldGVNb2RlID0gZmFsc2UsXG4gICAgICAgIHNlbGVjdFRlbXBsYXRlID0gbnVsbCxcbiAgICAgICAgbWVudUl0ZW1UZW1wbGF0ZSA9IG51bGwsXG4gICAgICAgIGxvb2t1cCA9ICdrZXknLFxuICAgICAgICBmaWxsQXR0ciA9ICd2YWx1ZScsXG4gICAgICAgIGNvbGxlY3Rpb24gPSBudWxsLFxuICAgICAgICBtZW51Q29udGFpbmVyID0gbnVsbCxcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyID0gbnVsbCxcbiAgICAgICAgbm9NYXRjaFRlbXBsYXRlID0gbnVsbCxcbiAgICAgICAgaGVhZGVyVGVtcGxhdGUgPSBudWxsLFxuICAgICAgICByZXF1aXJlTGVhZGluZ1NwYWNlID0gdHJ1ZSxcbiAgICAgICAgYWxsb3dTcGFjZXMgPSBmYWxzZSxcbiAgICAgICAgcmVwbGFjZVRleHRTdWZmaXggPSBudWxsLFxuICAgICAgICBwb3NpdGlvbk1lbnUgPSB0cnVlLFxuICAgICAgICBzcGFjZVNlbGVjdHNNYXRjaCA9IGZhbHNlLFxuICAgICAgICBzZWxlY3RXaXRoQ29tbWEgPSBmYWxzZSxcbiAgICAgICAgc2VhcmNoT3B0cyA9IHt9LFxuICAgICAgICBlZGl0b3IgPSB7fSxcbiAgICAgICAgaXNWYWxpZFNlbGVjdGlvbiA9IG51bGwsXG4gICAgfSkge1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZU1vZGUgPSBhdXRvY29tcGxldGVNb2RlXG4gICAgICAgIHRoaXMubWVudVNlbGVjdGVkID0gMFxuICAgICAgICB0aGlzLmN1cnJlbnQgPSB7fVxuICAgICAgICB0aGlzLmlucHV0RXZlbnQgPSBmYWxzZVxuICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyID0gbWVudUNvbnRhaW5lclxuICAgICAgICB0aGlzLnNjcm9sbENvbnRhaW5lciA9IHNjcm9sbENvbnRhaW5lclxuICAgICAgICB0aGlzLmFsbG93U3BhY2VzID0gYWxsb3dTcGFjZXNcbiAgICAgICAgdGhpcy5yZXBsYWNlVGV4dFN1ZmZpeCA9IHJlcGxhY2VUZXh0U3VmZml4XG4gICAgICAgIHRoaXMucG9zaXRpb25NZW51ID0gcG9zaXRpb25NZW51XG4gICAgICAgIHRoaXMuaGFzVHJhaWxpbmdTcGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNwYWNlU2VsZWN0c01hdGNoID0gc3BhY2VTZWxlY3RzTWF0Y2g7XG4gICAgICAgIHRoaXMuc2VsZWN0V2l0aENvbW1hID0gc2VsZWN0V2l0aENvbW1hO1xuICAgICAgICB0aGlzLmludmFsaWRFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgICB0aGlzLmludmFsaWRFdmVudC5pbml0RXZlbnQoJ2ludmFsaWQnLCB0cnVlLCB0cnVlKTtcblxuICAgICAgICBpZiAodGhpcy5hdXRvY29tcGxldGVNb2RlKSB7XG4gICAgICAgICAgICB0cmlnZ2VyID0gJydcbiAgICAgICAgICAgIGFsbG93U3BhY2VzID0gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IFt7XG4gICAgICAgICAgICAgICAgLy8gc3ltYm9sIHRoYXQgc3RhcnRzIHRoZSBsb29rdXBcbiAgICAgICAgICAgICAgICB0cmlnZ2VyOiB0cmlnZ2VyLFxuXG4gICAgICAgICAgICAgICAgLy8gaXMgaXQgd3JhcHBlZCBpbiBhbiBpZnJhbWVcbiAgICAgICAgICAgICAgICBpZnJhbWU6IGlmcmFtZSxcblxuICAgICAgICAgICAgICAgIC8vIGNsYXNzIGFwcGxpZWQgdG8gc2VsZWN0ZWQgaXRlbVxuICAgICAgICAgICAgICAgIHNlbGVjdENsYXNzOiBzZWxlY3RDbGFzcyxcblxuICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGNhbGxlZCBvbiBzZWxlY3QgdGhhdCByZXR1bnMgdGhlIGNvbnRlbnQgdG8gaW5zZXJ0XG4gICAgICAgICAgICAgICAgc2VsZWN0VGVtcGxhdGU6IChzZWxlY3RUZW1wbGF0ZSB8fCBUcmlidXRlLmRlZmF1bHRTZWxlY3RUZW1wbGF0ZSkuYmluZCh0aGlzKSxcblxuICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGNhbGxlZCB0aGF0IHJldHVybnMgY29udGVudCBmb3IgYW4gaXRlbVxuICAgICAgICAgICAgICAgIG1lbnVJdGVtVGVtcGxhdGU6IChtZW51SXRlbVRlbXBsYXRlIHx8IFRyaWJ1dGUuZGVmYXVsdE1lbnVJdGVtVGVtcGxhdGUpLmJpbmQodGhpcyksXG5cbiAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBjYWxsZWQgd2hlbiBtZW51IGlzIGVtcHR5LCBkaXNhYmxlcyBoaWRpbmcgb2YgbWVudS5cbiAgICAgICAgICAgICAgICBub01hdGNoVGVtcGxhdGU6ICh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9NYXRjaFRlbXBsYXRlIHx8IGZ1bmN0aW9uICgpIHtyZXR1cm4gJyd9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9KShub01hdGNoVGVtcGxhdGUpLFxuXG4gICAgICAgICAgICAgICAgaGVhZGVyVGVtcGxhdGU6ICh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGVhZGVyVGVtcGxhdGUgfHwgZnVuY3Rpb24gKCkge3JldHVybiAnJ30uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgIH0pKGhlYWRlclRlbXBsYXRlKSxcblxuICAgICAgICAgICAgICAgIC8vIGNvbHVtbiB0byBzZWFyY2ggYWdhaW5zdCBpbiB0aGUgb2JqZWN0XG4gICAgICAgICAgICAgICAgbG9va3VwOiBsb29rdXAsXG5cbiAgICAgICAgICAgICAgICAvLyBjb2x1bW4gdGhhdCBjb250YWlucyB0aGUgY29udGVudCB0byBpbnNlcnQgYnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgIGZpbGxBdHRyOiBmaWxsQXR0cixcblxuICAgICAgICAgICAgICAgIC8vIGFycmF5IG9mIG9iamVjdHMgb3IgYSBmdW5jdGlvbiByZXR1cm5pbmcgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgICAgICAgICAgIHZhbHVlczogdmFsdWVzLFxuXG4gICAgICAgICAgICAgICAgcmVxdWlyZUxlYWRpbmdTcGFjZTogcmVxdWlyZUxlYWRpbmdTcGFjZSxcblxuICAgICAgICAgICAgICAgIHNlYXJjaE9wdHM6IHNlYXJjaE9wdHMsXG5cbiAgICAgICAgICAgICAgICBlZGl0b3I6IGVkaXRvcixcblxuICAgICAgICAgICAgICAgIHNlbGVjdFdpdGhDb21tYTogc2VsZWN0V2l0aENvbW1hLFxuXG4gICAgICAgICAgICAgICAgaXNWYWxpZFNlbGVjdGlvbjogKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpc1ZhbGlkU2VsZWN0aW9uIHx8IGZ1bmN0aW9uICgpIHtyZXR1cm4gJyd9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9KShpc1ZhbGlkU2VsZWN0aW9uKVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvY29tcGxldGVNb2RlKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignVHJpYnV0ZSBpbiBhdXRvY29tcGxldGUgbW9kZSBkb2VzIG5vdCB3b3JrIGZvciBjb2xsZWN0aW9ucycpXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBpdGVtLnRyaWdnZXIgfHwgdHJpZ2dlcixcbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lOiBpdGVtLmlmcmFtZSB8fCBpZnJhbWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENsYXNzOiBpdGVtLnNlbGVjdENsYXNzIHx8IHNlbGVjdENsYXNzLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RUZW1wbGF0ZTogKGl0ZW0uc2VsZWN0VGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0U2VsZWN0VGVtcGxhdGUpLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtVGVtcGxhdGU6IChpdGVtLm1lbnVJdGVtVGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0TWVudUl0ZW1UZW1wbGF0ZSkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIHdoZW4gbWVudSBpcyBlbXB0eSwgZGlzYWJsZXMgaGlkaW5nIG9mIG1lbnUuXG4gICAgICAgICAgICAgICAgICAgIG5vTWF0Y2hUZW1wbGF0ZTogKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICB9KShub01hdGNoVGVtcGxhdGUpLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJUZW1wbGF0ZTogKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICB9KShoZWFkZXJUZW1wbGF0ZSksXG4gICAgICAgICAgICAgICAgICAgIGxvb2t1cDogaXRlbS5sb29rdXAgfHwgbG9va3VwLFxuICAgICAgICAgICAgICAgICAgICBmaWxsQXR0cjogaXRlbS5maWxsQXR0ciB8fCBmaWxsQXR0cixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBpdGVtLnZhbHVlcyxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZUxlYWRpbmdTcGFjZTogaXRlbS5yZXF1aXJlTGVhZGluZ1NwYWNlLFxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hPcHRzOiBpdGVtLnNlYXJjaE9wdHMgfHwgc2VhcmNoT3B0cyxcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBpdGVtLmVkaXRvciB8fCBlZGl0b3IsXG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWRTZWxlY3Rpb246ICh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgICAgfSkoaXNWYWxpZFNlbGVjdGlvbilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVHJpYnV0ZV0gTm8gY29sbGVjdGlvbiBzcGVjaWZpZWQuJylcbiAgICAgICAgfVxuXG4gICAgICAgIG5ldyBUcmlidXRlUmFuZ2UodGhpcylcbiAgICAgICAgbmV3IFRyaWJ1dGVFdmVudHModGhpcylcbiAgICAgICAgbmV3IFRyaWJ1dGVNZW51RXZlbnRzKHRoaXMpXG4gICAgICAgIG5ldyBUcmlidXRlU2VhcmNoKHRoaXMpXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRTZWxlY3RUZW1wbGF0ZShpdGVtKSB7XG4gICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmICh0aGlzLnJhbmdlLmlzQ29udGVudEVkaXRhYmxlKHRoaXMuY3VycmVudC5lbGVtZW50KSkge1xuICAgICAgICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCJ0cmlidXRlLW1lbnRpb25cIj4nICsgKHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnRyaWdnZXIgKyBpdGVtLm9yaWdpbmFsW3RoaXMuY3VycmVudC5jb2xsZWN0aW9uLmZpbGxBdHRyXSkgKyAnPC9zcGFuPic7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi50cmlnZ2VyICsgaXRlbS5vcmlnaW5hbFt0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5maWxsQXR0cl07XG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRNZW51SXRlbVRlbXBsYXRlKG1hdGNoSXRlbSkge1xuICAgICAgICByZXR1cm4gbWF0Y2hJdGVtLnN0cmluZ1xuICAgIH1cblxuICAgIHN0YXRpYyBpbnB1dFR5cGVzKCkge1xuICAgICAgICByZXR1cm4gWydURVhUQVJFQScsICdJTlBVVCddXG4gICAgfVxuXG4gICAgdHJpZ2dlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24ubWFwKGNvbmZpZyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29uZmlnLnRyaWdnZXJcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhdHRhY2goZWwsIGVkaXRvcikge1xuICAgICAgICBpZiAoIWVsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tUcmlidXRlXSBNdXN0IHBhc3MgaW4gYSBET00gbm9kZSBvciBOb2RlTGlzdC4nKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgaXQgaXMgYSBqUXVlcnkgY29sbGVjdGlvblxuICAgICAgICBpZiAodHlwZW9mIGpRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiYgZWwgaW5zdGFuY2VvZiBqUXVlcnkpIHtcbiAgICAgICAgICAgIGVsID0gZWwuZ2V0KClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElzIGVsIGFuIEFycmF5L0FycmF5LWxpa2Ugb2JqZWN0P1xuICAgICAgICBpZiAoZWwuY29uc3RydWN0b3IgPT09IE5vZGVMaXN0IHx8IGVsLmNvbnN0cnVjdG9yID09PSBIVE1MQ29sbGVjdGlvbiB8fCBlbC5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSBlbC5sZW5ndGhcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hdHRhY2goZWxbaV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hdHRhY2goZWwsIGVkaXRvcilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9hdHRhY2goZWwsIGVkaXRvcikge1xuICAgICAgICBpZiAoZWwuaGFzQXR0cmlidXRlKCdkYXRhLXRyaWJ1dGUnKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdUcmlidXRlIHdhcyBhbHJlYWR5IGJvdW5kIHRvICcgKyBlbC5ub2RlTmFtZSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW5zdXJlRWRpdGFibGUoZWwpXG4gICAgICAgIHRoaXMuZXZlbnRzLmJpbmQoZWwsIGVkaXRvcilcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnNjcm9sbENvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5zY3JvbGxFdmVudC5iaW5kKHRoaXMpIClcbiAgICAgICAgfVxuXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS10cmlidXRlJywgdHJ1ZSlcbiAgICB9XG5cbiAgICBzY3JvbGxFdmVudChlKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnNjcm9sbCh0aGlzLCBlKVxuICAgIH1cblxuICAgIGVuc3VyZUVkaXRhYmxlKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKFRyaWJ1dGUuaW5wdXRUeXBlcygpLmluZGV4T2YoZWxlbWVudC5ub2RlTmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5jb250ZW50RWRpdGFibGUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNvbnRlbnRFZGl0YWJsZSA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVHJpYnV0ZV0gQ2Fubm90IGJpbmQgdG8gJyArIGVsZW1lbnQubm9kZU5hbWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVNZW51KCkge1xuICAgICAgICBsZXQgd3JhcHBlciA9IHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgICAgIHVsID0gdGhpcy5yYW5nZS5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ3VsJylcblxuICAgICAgICB3cmFwcGVyLmNsYXNzTmFtZSA9ICd0cmlidXRlLWNvbnRhaW5lcidcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZCh1bClcblxuICAgICAgICBpZiAodGhpcy5tZW51Q29udGFpbmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZW51Q29udGFpbmVyLmFwcGVuZENoaWxkKHdyYXBwZXIpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5yYW5nZS5nZXREb2N1bWVudCgpLmJvZHkuYXBwZW5kQ2hpbGQod3JhcHBlcilcbiAgICB9XG5cbiAgICBzaG93TWVudUZvcihlbGVtZW50LCBzY3JvbGxUbykge1xuICAgICAgICAvLyBPbmx5IHByb2NlZWQgaWYgbWVudSBpc24ndCBhbHJlYWR5IHNob3duIGZvciB0aGUgY3VycmVudCBlbGVtZW50ICYgbWVudGlvblRleHRcbiAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUgJiYgdGhpcy5jdXJyZW50LmVsZW1lbnQgPT09IGVsZW1lbnQgJiYgdGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0ID09PSB0aGlzLmN1cnJlbnRNZW50aW9uVGV4dFNuYXBzaG90KSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50TWVudGlvblRleHRTbmFwc2hvdCA9IHRoaXMuY3VycmVudC5tZW50aW9uVGV4dFxuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgbWVudSBpZiBpdCBkb2Vzbid0IGV4aXN0LlxuICAgICAgICBpZiAoIXRoaXMubWVudSkge1xuICAgICAgICAgICAgdGhpcy5tZW51ID0gdGhpcy5jcmVhdGVNZW51KClcbiAgICAgICAgICAgIGVsZW1lbnQudHJpYnV0ZU1lbnUgPSB0aGlzLm1lbnVcbiAgICAgICAgICAgIHRoaXMubWVudUV2ZW50cy5iaW5kKHRoaXMubWVudSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlXG4gICAgICAgIHRoaXMubWVudVNlbGVjdGVkID0gMFxuXG4gICAgICAgIGlmICghdGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQubWVudGlvblRleHQgPSAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvY2Vzc1ZhbHVlcyA9ICh2YWx1ZXMsIHRleHQpID0+IHtcbiAgICAgICAgICAgIC8vIFRyaWJ1dGUgbWF5IG5vdCBiZSBhY3RpdmUgYW55IG1vcmUgYnkgdGhlIHRpbWUgdGhlIHZhbHVlIGNhbGxiYWNrIHJldHVybnNcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLnNlYXJjaC5maWx0ZXIodGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0LCB2YWx1ZXMsIHtcbiAgICAgICAgICAgICAgICBwcmU6IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnNlYXJjaE9wdHMucHJlIHx8ICc8c3Bhbj4nLFxuICAgICAgICAgICAgICAgIHBvc3Q6IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnNlYXJjaE9wdHMucG9zdCB8fCAnPC9zcGFuPicsXG4gICAgICAgICAgICAgICAgZXh0cmFjdDogKGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsW3RoaXMuY3VycmVudC5jb2xsZWN0aW9uLmxvb2t1cF1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwKGVsLCB0aGlzLmN1cnJlbnQubWVudGlvblRleHQpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbG9va3VwIGF0dHJpYnV0ZSwgbG9va3VwIG11c3QgYmUgc3RyaW5nIG9yIGZ1bmN0aW9uLicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQuZmlsdGVyZWRJdGVtcyA9IGl0ZW1zXG5cbiAgICAgICAgICAgIGxldCB1bCA9IHRoaXMubWVudS5xdWVyeVNlbGVjdG9yKCd1bCcpXG5cbiAgICAgICAgICAgIHRoaXMucmFuZ2UucG9zaXRpb25NZW51QXRDYXJldChzY3JvbGxUbylcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLmhlYWRlclRlbXBsYXRlICYmIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLmhlYWRlclRlbXBsYXRlKHRleHQpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgICAgICBoZWFkZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoZWFkZXJcIilcbiAgICAgICAgICAgICAgICBoZWFkZXIuaW5uZXJIVE1MID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uaGVhZGVyVGVtcGxhdGUodGV4dClcbiAgICAgICAgICAgICAgICBjb25zdCBvbGRIZWFkZXIgPSB0aGlzLm1lbnUucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJcIilcbiAgICAgICAgICAgICAgICBpZiAob2xkSGVhZGVyICYmIG9sZEhlYWRlci5yZW1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkSGVhZGVyLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvbGRIZWFkZXIgJiYgIW9sZEhlYWRlci5yZW1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkSGVhZGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob2xkSGVhZGVyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm1lbnUuaW5zZXJ0QmVmb3JlKGhlYWRlciwgdGhpcy5tZW51LmNoaWxkTm9kZXNbMF0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5vTWF0Y2hFdmVudCA9IG5ldyBDdXN0b21FdmVudCgndHJpYnV0ZS1uby1tYXRjaCcsIHsgZGV0YWlsOiB0aGlzLm1lbnUgfSlcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQuZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5vTWF0Y2hFdmVudClcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY3VycmVudC5jb2xsZWN0aW9uLm5vTWF0Y2hUZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVNZW51KClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1bC5pbm5lckhUTUwgPSB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5ub01hdGNoVGVtcGxhdGUoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1bC5pbm5lckhUTUwgPSAnJ1xuXG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBsaSA9IHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpXG4gICAgICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxldCBsaSA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gbGkuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykgfHwgKGxpLnBhcmVudE5vZGUgJiYgbGkucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUubW92ZW1lbnRZICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXRBY3RpdmVMaShpbmRleClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWVudVNlbGVjdGVkID09PSBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgbGkuY2xhc3NOYW1lID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uc2VsZWN0Q2xhc3NcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGkuaW5uZXJIVE1MID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubWVudUl0ZW1UZW1wbGF0ZShpdGVtKVxuICAgICAgICAgICAgICAgIHVsLmFwcGVuZENoaWxkKGxpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24udmFsdWVzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi52YWx1ZXModGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0LCBwcm9jZXNzVmFsdWVzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvY2Vzc1ZhbHVlcyh0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi52YWx1ZXMsIHRoaXMuY3VycmVudC5tZW50aW9uVGV4dClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1lbnUucXVlcnlTZWxlY3RvcihcInVsXCIpLnNjcm9sbFRvcCA9IDBcbiAgICB9XG5cbiAgICBzaG93TWVudUZvckNvbGxlY3Rpb24oZWxlbWVudCwgY29sbGVjdGlvbkluZGV4KSB7XG4gICAgICAgIGlmIChlbGVtZW50ICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnBsYWNlQ2FyZXRBdEVuZChlbGVtZW50KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24gPSB0aGlzLmNvbGxlY3Rpb25bY29sbGVjdGlvbkluZGV4IHx8IDBdXG4gICAgICAgIHRoaXMuY3VycmVudC5leHRlcm5hbFRyaWdnZXIgPSB0cnVlXG4gICAgICAgIHRoaXMuY3VycmVudC5lbGVtZW50ID0gZWxlbWVudFxuXG4gICAgICAgIGlmIChlbGVtZW50LmlzQ29udGVudEVkaXRhYmxlKVxuICAgICAgICAgICAgdGhpcy5pbnNlcnRUZXh0QXRDdXJzb3IodGhpcy5jdXJyZW50LmNvbGxlY3Rpb24udHJpZ2dlcilcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5pbnNlcnRBdENhcmV0KGVsZW1lbnQsIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnRyaWdnZXIpXG5cbiAgICAgICAgdGhpcy5zaG93TWVudUZvcihlbGVtZW50KVxuICAgIH1cblxuICAgIC8vIFRPRE86IG1ha2Ugc3VyZSB0aGlzIHdvcmtzIGZvciBpbnB1dHMvdGV4dGFyZWFzXG4gICAgcGxhY2VDYXJldEF0RW5kKGVsKSB7XG4gICAgICAgIGVsLmZvY3VzKCk7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93LmdldFNlbGVjdGlvbiAhPSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgJiYgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZVJhbmdlICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHZhciByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMoZWwpO1xuICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xuICAgICAgICAgICAgdmFyIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LmJvZHkuY3JlYXRlVGV4dFJhbmdlICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHZhciB0ZXh0UmFuZ2UgPSBkb2N1bWVudC5ib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xuICAgICAgICAgICAgdGV4dFJhbmdlLm1vdmVUb0VsZW1lbnRUZXh0KGVsKTtcbiAgICAgICAgICAgIHRleHRSYW5nZS5jb2xsYXBzZShmYWxzZSk7XG4gICAgICAgICAgICB0ZXh0UmFuZ2Uuc2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmb3IgY29udGVudGVkaXRhYmxlXG4gICAgaW5zZXJ0VGV4dEF0Q3Vyc29yKHRleHQpIHtcbiAgICAgICAgdmFyIHNlbCwgcmFuZ2UsIGh0bWw7XG4gICAgICAgIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcbiAgICAgICAgdmFyIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gICAgICAgIHJhbmdlLmluc2VydE5vZGUodGV4dE5vZGUpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHModGV4dE5vZGUpXG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKVxuICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxuICAgIH1cblxuICAgIC8vIGZvciByZWd1bGFyIGlucHV0c1xuICAgIGluc2VydEF0Q2FyZXQodGV4dGFyZWEsIHRleHQpIHtcbiAgICAgICAgdmFyIHNjcm9sbFBvcyA9IHRleHRhcmVhLnNjcm9sbFRvcDtcbiAgICAgICAgdmFyIGNhcmV0UG9zID0gdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQ7XG5cbiAgICAgICAgdmFyIGZyb250ID0gKHRleHRhcmVhLnZhbHVlKS5zdWJzdHJpbmcoMCwgY2FyZXRQb3MpO1xuICAgICAgICB2YXIgYmFjayA9ICh0ZXh0YXJlYS52YWx1ZSkuc3Vic3RyaW5nKHRleHRhcmVhLnNlbGVjdGlvbkVuZCwgdGV4dGFyZWEudmFsdWUubGVuZ3RoKTtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBmcm9udCArIHRleHQgKyBiYWNrO1xuICAgICAgICBjYXJldFBvcyA9IGNhcmV0UG9zICsgdGV4dC5sZW5ndGg7XG4gICAgICAgIHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0ID0gY2FyZXRQb3M7XG4gICAgICAgIHRleHRhcmVhLnNlbGVjdGlvbkVuZCA9IGNhcmV0UG9zO1xuICAgICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgICB0ZXh0YXJlYS5zY3JvbGxUb3AgPSBzY3JvbGxQb3M7XG4gICAgfVxuXG4gICAgaGlkZU1lbnUoKSB7XG4gICAgICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMubWVudS5zdHlsZS5jc3NUZXh0ID0gJ2Rpc3BsYXk6IG5vbmU7J1xuICAgICAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IDBcbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IHt9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RJdGVtQXRJbmRleChpbmRleCwgb3JpZ2luYWxFdmVudCkge1xuICAgICAgICBpbmRleCA9IHBhcnNlSW50KGluZGV4KVxuICAgICAgICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJyB8fCBpc05hTihpbmRleCkpIHJldHVyblxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuY3VycmVudC5maWx0ZXJlZEl0ZW1zW2luZGV4XVxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLmlzVmFsaWRTZWxlY3Rpb24gPT09ICdmdW5jdGlvbicgJiYgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uaXNWYWxpZFNlbGVjdGlvbihpdGVtLCB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5lZGl0b3IpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uZWRpdG9yLmVsLmRpc3BhdGNoRXZlbnQodGhpcy5pbnZhbGlkRXZlbnQpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnNlbGVjdFRlbXBsYXRlKGl0ZW0pXG4gICAgICAgIGlmIChjb250ZW50ICE9PSBudWxsKSB0aGlzLnJlcGxhY2VUZXh0KGNvbnRlbnQsIG9yaWdpbmFsRXZlbnQsIGl0ZW0pXG4gICAgfVxuXG4gICAgcmVwbGFjZVRleHQoY29udGVudCwgb3JpZ2luYWxFdmVudCwgaXRlbSkge1xuICAgICAgICB0aGlzLnJhbmdlLnJlcGxhY2VUcmlnZ2VyVGV4dChjb250ZW50LCB0cnVlLCB0cnVlLCBvcmlnaW5hbEV2ZW50LCBpdGVtKVxuICAgIH1cblxuICAgIF9hcHBlbmQoY29sbGVjdGlvbiwgbmV3VmFsdWVzLCByZXBsYWNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29sbGVjdGlvbi52YWx1ZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGFwcGVuZCB0byB2YWx1ZXMsIGFzIGl0IGlzIGEgZnVuY3Rpb24uJylcbiAgICAgICAgfSBlbHNlIGlmICghcmVwbGFjZSkge1xuICAgICAgICAgICAgY29sbGVjdGlvbi52YWx1ZXMgPSBjb2xsZWN0aW9uLnZhbHVlcy5jb25jYXQobmV3VmFsdWVzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sbGVjdGlvbi52YWx1ZXMgPSBuZXdWYWx1ZXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGVuZChjb2xsZWN0aW9uSW5kZXgsIG5ld1ZhbHVlcywgcmVwbGFjZSkge1xuICAgICAgICBsZXQgaW5kZXggPSBwYXJzZUludChjb2xsZWN0aW9uSW5kZXgpXG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSB0aHJvdyBuZXcgRXJyb3IoJ3BsZWFzZSBwcm92aWRlIGFuIGluZGV4IGZvciB0aGUgY29sbGVjdGlvbiB0byB1cGRhdGUuJylcblxuICAgICAgICBsZXQgY29sbGVjdGlvbiA9IHRoaXMuY29sbGVjdGlvbltpbmRleF1cblxuICAgICAgICB0aGlzLl9hcHBlbmQoY29sbGVjdGlvbiwgbmV3VmFsdWVzLCByZXBsYWNlKVxuICAgIH1cblxuICAgIGFwcGVuZEN1cnJlbnQobmV3VmFsdWVzLCByZXBsYWNlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLl9hcHBlbmQodGhpcy5jdXJyZW50LmNvbGxlY3Rpb24sIG5ld1ZhbHVlcywgcmVwbGFjZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gYWN0aXZlIHN0YXRlLiBQbGVhc2UgdXNlIGFwcGVuZCBpbnN0ZWFkIGFuZCBwYXNzIGFuIGluZGV4LicpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXRhY2goZWwpIHtcbiAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVHJpYnV0ZV0gTXVzdCBwYXNzIGluIGEgRE9NIG5vZGUgb3IgTm9kZUxpc3QuJylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIGl0IGlzIGEgalF1ZXJ5IGNvbGxlY3Rpb25cbiAgICAgICAgaWYgKHR5cGVvZiBqUXVlcnkgIT09ICd1bmRlZmluZWQnICYmIGVsIGluc3RhbmNlb2YgalF1ZXJ5KSB7XG4gICAgICAgICAgICBlbCA9IGVsLmdldCgpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBJcyBlbCBhbiBBcnJheS9BcnJheS1saWtlIG9iamVjdD9cbiAgICAgICAgaWYgKGVsLmNvbnN0cnVjdG9yID09PSBOb2RlTGlzdCB8fCBlbC5jb25zdHJ1Y3RvciA9PT0gSFRNTENvbGxlY3Rpb24gfHwgZWwuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gZWwubGVuZ3RoXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGV0YWNoKGVsW2ldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZGV0YWNoKGVsKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2RldGFjaChlbCkge1xuICAgICAgICB0aGlzLmV2ZW50cy51bmJpbmQoZWwpXG4gICAgICAgIGlmIChlbC50cmlidXRlTWVudSkge1xuICAgICAgICAgICAgdGhpcy5tZW51RXZlbnRzLnVuYmluZChlbC50cmlidXRlTWVudSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zY3JvbGxDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsRXZlbnQpXG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10cmlidXRlJylcbiAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKGVsLnRyaWJ1dGVNZW51KSB7XG4gICAgICAgICAgICAgICAgZWwudHJpYnV0ZU1lbnUucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGU7XG4iLCJjbGFzcyBUcmlidXRlRXZlbnRzIHtcbiAgICBjb25zdHJ1Y3Rvcih0cmlidXRlKSB7XG4gICAgICAgIHRoaXMudHJpYnV0ZSA9IHRyaWJ1dGVcbiAgICAgICAgdGhpcy50cmlidXRlLmV2ZW50cyA9IHRoaXNcbiAgICB9XG5cbiAgICBzdGF0aWMga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICBrZXk6IDksXG4gICAgICAgICAgICB2YWx1ZTogJ1RBQidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiA4LFxuICAgICAgICAgICAgdmFsdWU6ICdERUxFVEUnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogMTMsXG4gICAgICAgICAgICB2YWx1ZTogJ0VOVEVSJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDI3LFxuICAgICAgICAgICAgdmFsdWU6ICdFU0NBUEUnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogMzIsXG4gICAgICAgICAgICB2YWx1ZTogJ1NQQUNFJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDM4LFxuICAgICAgICAgICAgdmFsdWU6ICdVUCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiA0MCxcbiAgICAgICAgICAgIHZhbHVlOiAnRE9XTidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAxODgsXG4gICAgICAgICAgICB2YWx1ZTogJ0NPTU1BJ1xuICAgICAgICB9XVxuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgcmVtb3ZlKGVsZW0pIHtcbiAgICAgICAgaWYgKGVsZW0gJiYgZWxlbS5yZW1vdmUpIHtcbiAgICAgICAgICAgIGVsZW0ucmVtb3ZlKClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChlbGVtICYmICFlbGVtLnJlbW92ZSkge1xuICAgICAgICAgICAgZWxlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgaXNJbnNpZGVNZW50aW9uKGFuY2hvcikge1xuICAgICAgICBpZiAoYW5jaG9yICYmIGFuY2hvci5jbGFzc0xpc3QgJiYgYW5jaG9yLmNsYXNzTGlzdC5jb250YWlucyhcImZyLXRyaWJ1dGVcIikpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFuY2hvciAmJiBhbmNob3IucGFyZW50Tm9kZSAmJiBhbmNob3IucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoXCJmci10cmlidXRlXCIpXG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZUN1cnJlbnRNZW50aW9uKGVkaXRvciwgZXZlbnQpIHtcbiAgICAgICAgY29uc3QgY2hhckNvZGUgPSAodHlwZW9mIGV2ZW50LndoaWNoID09PSBcInVuZGVmaW5lZFwiKSA/IGV2ZW50LmtleUNvZGUgOiBldmVudC53aGljaDtcbiAgICAgICAgY29uc3QgYW5jaG9yID0gZWRpdG9yLnNlbGVjdGlvbi5nZXQoKS5hbmNob3JOb2RlXG4gICAgICAgIFRyaWJ1dGVFdmVudHMucmVtb3ZlTWVudGlvbihhbmNob3IsIGVkaXRvciwgY2hhckNvZGUpXG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZU1lbnRpb24oYW5jaG9yLCBlZGl0b3IsIGNoYXJDb2RlKSB7XG4gICAgICAgIGlmICghZWRpdG9yKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAoVHJpYnV0ZUV2ZW50cy5pc0luc2lkZU1lbnRpb24oYW5jaG9yKSkge1xuICAgICAgICAgICAgY29uc3QgdHJlYXRBbmNob3JBc1BhcmVudCA9IGFuY2hvciAmJiBhbmNob3IuY2xhc3NMaXN0ICYmIGFuY2hvci5jbGFzc0xpc3QuY29udGFpbnMoXCJmci10cmlidXRlXCIpXG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgPSB0cmVhdEFuY2hvckFzUGFyZW50ID8gYW5jaG9yIDogYW5jaG9yLnBhcmVudE5vZGVcbiAgICAgICAgICAgIGNvbnN0IGRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gJydcbiAgICAgICAgICAgIGlmIChjaGFyQ29kZSAhPT0gMTMpIHtcbiAgICAgICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gJ0AnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXYuZmlyc3RDaGlsZCAmJiBkb2NGcmFnLmFwcGVuZENoaWxkKGRpdi5maXJzdENoaWxkKVxuICAgICAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zYXZlKClcbiAgICAgICAgICAgIGlmIChjaGFyQ29kZSA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICAvLyBicmVha3Mgd29yZFxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQucHJldmlvdXNTaWJsaW5nICYmIHBhcmVudC5wcmV2aW91c1NpYmxpbmcucHJldmlvdXNTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudDIgPSBwYXJlbnQucHJldmlvdXNTaWJsaW5nLnByZXZpb3VzU2libGluZ1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50Mi5jbGFzc0xpc3QuY29udGFpbnMoXCJmci10cmlidXRlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAocGFyZW50Mi5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBwYXJlbnQyLnJlbW92ZUNoaWxkKHBhcmVudDIuZmlyc3RDaGlsZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKGNoaWxkKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jRnJhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKVxuICAgICAgICAgICAgICAgICAgICAgICAgVHJpYnV0ZUV2ZW50cy5yZW1vdmUocGFyZW50LnByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmcpXG4gICAgICAgICAgICAgICAgICAgICAgICBUcmlidXRlRXZlbnRzLnJlbW92ZShwYXJlbnQucHJldmlvdXNTaWJsaW5nKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKHBhcmVudC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBwYXJlbnQucmVtb3ZlQ2hpbGQocGFyZW50LmZpcnN0Q2hpbGQpXG4gICAgICAgICAgICAgICAgZG9jRnJhZy5hcHBlbmRDaGlsZChjaGlsZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChkb2NGcmFnLCBwYXJlbnQpXG4gICAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLnJlc3RvcmUoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZVJhbmdlTWVudGlvbihlZGl0b3IsIGV2ZW50KSB7XG4gICAgICAgIGlmIChlZGl0b3IpIHtcbiAgICAgICAgICAgIGlmICghZWRpdG9yLnNlbGVjdGlvbi5pc0NvbGxhcHNlZCgpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBzdGFydENvbnRhaW5lciwgZW5kQ29udGFpbmVyIH0gPSBlZGl0b3Iuc2VsZWN0aW9uLnJhbmdlcygpWzBdXG4gICAgICAgICAgICAgICAgY29uc3QgY2hhckNvZGUgPSAodHlwZW9mIGV2ZW50LndoaWNoID09PSBcInVuZGVmaW5lZFwiKSA/IGV2ZW50LmtleUNvZGUgOiBldmVudC53aGljaFxuICAgICAgICAgICAgICAgIFRyaWJ1dGVFdmVudHMucmVtb3ZlTWVudGlvbihzdGFydENvbnRhaW5lci5wYXJlbnROb2RlLCBlZGl0b3IsIGNoYXJDb2RlKVxuICAgICAgICAgICAgICAgIFRyaWJ1dGVFdmVudHMucmVtb3ZlTWVudGlvbihlbmRDb250YWluZXIucGFyZW50Tm9kZSwgZWRpdG9yLCBjaGFyQ29kZSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlUHJldmlvdXNNZW50aW9uKGVkaXRvciwgZXZlbnQpIHtcbiAgICAgICAgY29uc3QgY2hhckNvZGUgPSAodHlwZW9mIGV2ZW50LndoaWNoID09PSBcInVuZGVmaW5lZFwiKSA/IGV2ZW50LmtleUNvZGUgOiBldmVudC53aGljaDtcbiAgICAgICAgY29uc3QgYW5jaG9yID0gZWRpdG9yLnNlbGVjdGlvbi5nZXQoKS5hbmNob3JOb2RlXG4gICAgICAgIGNvbnN0IGVsZW0gPSBhbmNob3IucHJldmlvdXNTaWJsaW5nIHx8IGFuY2hvci5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZ1xuICAgICAgICBUcmlidXRlRXZlbnRzLnJlbW92ZU1lbnRpb24oZWxlbSwgZWRpdG9yLCBjaGFyQ29kZSlcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlTmV4dE1lbnRpb24oZWRpdG9yLCBldmVudCkge1xuICAgICAgICBjb25zdCBjaGFyQ29kZSA9ICh0eXBlb2YgZXZlbnQud2hpY2ggPT09IFwidW5kZWZpbmVkXCIpID8gZXZlbnQua2V5Q29kZSA6IGV2ZW50LndoaWNoO1xuICAgICAgICBjb25zdCBhbmNob3IgPSBlZGl0b3Iuc2VsZWN0aW9uLmdldCgpLmFuY2hvck5vZGVcbiAgICAgICAgY29uc3QgZWxlbSA9IGFuY2hvci5uZXh0U2libGluZyB8fCBhbmNob3IucGFyZW50Tm9kZS5uZXh0U2libGluZ1xuICAgICAgICBUcmlidXRlRXZlbnRzLnJlbW92ZU1lbnRpb24oZWxlbSwgZWRpdG9yLCBjaGFyQ29kZSlcbiAgICB9XG5cbiAgICBiaW5kKGVsZW1lbnQsIGVkaXRvcikge1xuICAgICAgICBlbGVtZW50LmJvdW5kS2V5ZG93biA9IHRoaXMua2V5ZG93bi5iaW5kKGVsZW1lbnQsIHRoaXMsIGVkaXRvcik7XG4gICAgICAgIGVsZW1lbnQuYm91bmRLZXl1cCA9IHRoaXMua2V5dXAuYmluZChlbGVtZW50LCB0aGlzLCBlZGl0b3IpO1xuICAgICAgICBlbGVtZW50LmJvdW5kSW5wdXQgPSB0aGlzLmlucHV0LmJpbmQoZWxlbWVudCwgdGhpcywgZWRpdG9yKTtcblxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZEtleWRvd24sIGZhbHNlKVxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJyxcbiAgICAgICAgICAgIGVsZW1lbnQuYm91bmRLZXl1cCwgZmFsc2UpXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZElucHV0LCBmYWxzZSlcbiAgICB9XG5cbiAgICB1bmJpbmQoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZEtleWRvd24sIGZhbHNlKVxuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJyxcbiAgICAgICAgICAgIGVsZW1lbnQuYm91bmRLZXl1cCwgZmFsc2UpXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZElucHV0LCBmYWxzZSlcblxuICAgICAgICBkZWxldGUgZWxlbWVudC5ib3VuZEtleWRvd25cbiAgICAgICAgZGVsZXRlIGVsZW1lbnQuYm91bmRLZXl1cFxuICAgICAgICBkZWxldGUgZWxlbWVudC5ib3VuZElucHV0XG4gICAgfVxuXG4gICAgc2Nyb2xsKGluc3RhbmNlLCBlKSB7XG4gICAgICAgIGluc3RhbmNlLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgaW5zdGFuY2UuaGlkZU1lbnUoKVxuICAgIH1cblxuICAgIGtleWRvd24oaW5zdGFuY2UsIGVkaXRvciwgZXZlbnQpIHtcbiAgICAgICAgaWYgKGluc3RhbmNlLnRyaWJ1dGUuaXNBY3RpdmUgJiYgWzE2LCAxNywgMTgsIDIwXS5pbmNsdWRlcyhldmVudC5rZXlDb2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluc3RhbmNlLnNob3VsZERlYWN0aXZhdGUoZXZlbnQpKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS50cmlidXRlLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgIGluc3RhbmNlLnRyaWJ1dGUuaGlkZU1lbnUoKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzXG4gICAgICAgIGluc3RhbmNlLmNvbW1hbmRFdmVudCA9IGZhbHNlXG5cbiAgICAgICAgVHJpYnV0ZUV2ZW50cy5rZXlzKCkuZm9yRWFjaChvID0+IHtcbiAgICAgICAgICAgIGlmIChvLmtleSA9PT0gZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNvbW1hbmRFdmVudCA9IHRydWVcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5jYWxsYmFja3MoKVtvLnZhbHVlLnRvTG93ZXJDYXNlKCldKGV2ZW50LCBlbGVtZW50LCBlZGl0b3IpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCFlZGl0b3IgfHwgIVs4LCA0Nl0uaW5jbHVkZXMoZXZlbnQua2V5Q29kZSkpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgLypcbiAgICAgICAgY29uc3QgYW5jaG9yID0gZWRpdG9yLnNlbGVjdGlvbi5nZXQoKS5hbmNob3JOb2RlXG4gICAgICAgIGlmIChUcmlidXRlRXZlbnRzLmlzSW5zaWRlTWVudGlvbihhbmNob3IpKSB7XG4gICAgICAgICAgICBUcmlidXRlRXZlbnRzLnJlbW92ZUN1cnJlbnRNZW50aW9uKGVkaXRvciwgZXZlbnQpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfSovXG5cbiAgICAgICAgaWYgKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgIGVkaXRvci5jdXJzb3JbZXZlbnQua2V5Q29kZSA9PT0gOCA/ICdiYWNrc3BhY2UnIDogJ2RlbCddKClcbiAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrcygpLmRlbGV0ZShldmVudCwgZWxlbWVudCwgZWRpdG9yKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgLypcbiAgICAgICAgLy8gVE9ETyBoYW5kbGUgY3RybCBzdXByIC8gZGVsXG4gICAgICAgIGNvbnN0IHByZWNUZXh0ID0gaW5zdGFuY2UudHJpYnV0ZS5yYW5nZS5nZXRUZXh0UHJlY2VkaW5nQ3VycmVudFNlbGVjdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0c1dpdGhUcmlnZ2VyID0gLyg/Ol58XFxzKShAW2EtejAtOV1cXHcqKS9naVxuICAgICAgICBjb25zb2xlLmxvZyhwcmVjVGV4dClcbiAgICAgICAgZGVidWdnZXJcbiAgICAgICAgaWYgKHByZWNUZXh0LnRyaW0oKSAhPT0gXCJcIiAmJiAhc3RhcnRzV2l0aFRyaWdnZXIudGVzdChwcmVjVGV4dCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSkgJiYgZXZlbnQua2V5Q29kZSA9PT0gOCkge1xuICAgICAgICAgICAgVHJpYnV0ZUV2ZW50cy5yZW1vdmVQcmV2aW91c01lbnRpb24oZWRpdG9yLCBldmVudClcbiAgICAgICAgfSBlbHNlIGlmICgoZXZlbnQuY3RybEtleSB8fCBldmVudC5tZXRhS2V5KSAmJiBldmVudC5rZXlDb2RlID09PSA0Nikge1xuICAgICAgICAgICAgVHJpYnV0ZUV2ZW50cy5yZW1vdmVOZXh0TWVudGlvbihlZGl0b3IsIGV2ZW50KVxuICAgICAgICB9Ki9cbiAgICB9XG5cbiAgICBpbnB1dChpbnN0YW5jZSwgZXZlbnQsIGVkaXRvcikge1xuICAgICAgICBpbnN0YW5jZS5pbnB1dEV2ZW50ID0gdHJ1ZVxuICAgICAgICBpbnN0YW5jZS5rZXl1cC5jYWxsKHRoaXMsIGluc3RhbmNlLCBldmVudCwgZWRpdG9yKVxuICAgIH1cblxuICAgIGNsaWNrKGluc3RhbmNlLCBldmVudCkge1xuICAgICAgICBsZXQgdHJpYnV0ZSA9IGluc3RhbmNlLnRyaWJ1dGVcbiAgICAgICAgaWYgKHRyaWJ1dGUubWVudSAmJiB0cmlidXRlLm1lbnUuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgPT09IFwiaGVhZGVyXCIgfHwgZXZlbnQudGFyZ2V0LnRhZ05hbWUgPT09IFwiVUxcIikge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGxpID0gZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICB3aGlsZSAobGkubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2xpJykge1xuICAgICAgICAgICAgICAgIGxpID0gbGkucGFyZW50Tm9kZVxuICAgICAgICAgICAgICAgIGlmICghbGkgfHwgbGkgPT09IHRyaWJ1dGUubWVudSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBmaW5kIHRoZSA8bGk+IGNvbnRhaW5lciBmb3IgdGhlIGNsaWNrJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cmlidXRlLnNlbGVjdEl0ZW1BdEluZGV4KGxpLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCBldmVudClcbiAgICAgICAgICAgIHRyaWJ1dGUuaGlkZU1lbnUoKVxuXG4gICAgICAgIC8vIFRPRE86IHNob3VsZCBmaXJlIHdpdGggZXh0ZXJuYWxUcmlnZ2VyIGFuZCB0YXJnZXQgaXMgb3V0c2lkZSBvZiBtZW51XG4gICAgICAgIH0gZWxzZSBpZiAodHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQgJiYgIXRyaWJ1dGUuY3VycmVudC5leHRlcm5hbFRyaWdnZXIpIHtcbiAgICAgICAgICAgIHRyaWJ1dGUuY3VycmVudC5leHRlcm5hbFRyaWdnZXIgPSBmYWxzZVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0cmlidXRlLmhpZGVNZW51KCkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBrZXl1cChpbnN0YW5jZSwgZWRpdG9yLCBldmVudCkge1xuICAgICAgICBpZiAoaW5zdGFuY2UudHJpYnV0ZS5pc0FjdGl2ZSAmJiBbMTYsIDE3LCAxOCwgMjBdLmluY2x1ZGVzKGV2ZW50LmtleUNvZGUpKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnN0YW5jZS5pbnB1dEV2ZW50KSB7XG4gICAgICAgICAgICBpbnN0YW5jZS5pbnB1dEV2ZW50ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZS51cGRhdGVTZWxlY3Rpb24odGhpcylcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSByZXR1cm5cblxuICAgICAgICBpZiAoZWRpdG9yICYmIGVkaXRvci5jaGFyQ291bnRlciAmJiBlZGl0b3IuY2hhckNvdW50ZXIuY291bnQoKSA9PT0gMCkge1xuICAgICAgICAgICAgaW5zdGFuY2UudHJpYnV0ZS5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICBpbnN0YW5jZS50cmlidXRlLmhpZGVNZW51KClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpbnN0YW5jZS50cmlidXRlLmFsbG93U3BhY2VzICYmIGluc3RhbmNlLnRyaWJ1dGUuaGFzVHJhaWxpbmdTcGFjZSkge1xuICAgICAgICAgICAgaW5zdGFuY2UudHJpYnV0ZS5oYXNUcmFpbGluZ1NwYWNlID0gZmFsc2U7XG4gICAgICAgICAgICBpbnN0YW5jZS5jb21tYW5kRXZlbnQgPSB0cnVlO1xuICAgICAgICAgICAgaW5zdGFuY2UuY2FsbGJhY2tzKClbXCJzcGFjZVwiXShldmVudCwgdGhpcyk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaW5zdGFuY2UudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgaWYgKGluc3RhbmNlLnRyaWJ1dGUuYXV0b2NvbXBsZXRlTW9kZSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrcygpLnRyaWdnZXJDaGFyKGV2ZW50LCB0aGlzLCAnJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleUNvZGUgPSBpbnN0YW5jZS5nZXRLZXlDb2RlKGluc3RhbmNlLCB0aGlzLCBldmVudClcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4oa2V5Q29kZSkgfHwgIWtleUNvZGUpIHJldHVyblxuICAgIFxuICAgICAgICAgICAgICAgIGxldCB0cmlnZ2VyID0gaW5zdGFuY2UudHJpYnV0ZS50cmlnZ2VycygpLmZpbmQodHJpZ2dlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cmlnZ2VyLmNoYXJDb2RlQXQoMCkgPT09IGtleUNvZGVcbiAgICAgICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuY2FsbGJhY2tzKCkudHJpZ2dlckNoYXIoZXZlbnQsIHRoaXMsIHRyaWdnZXIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoKGluc3RhbmNlLnRyaWJ1dGUuY3VycmVudC50cmlnZ2VyIHx8IGluc3RhbmNlLnRyaWJ1dGUuYXV0b2NvbXBsZXRlTW9kZSlcbiAgICAgICAgICAgICYmIGluc3RhbmNlLmNvbW1hbmRFdmVudCA9PT0gZmFsc2VcbiAgICAgICAgICAgIHx8IGluc3RhbmNlLnRyaWJ1dGUuaXNBY3RpdmUgJiYgWzgsIDQ2XS5pbmNsdWRlcyhldmVudC5rZXlDb2RlKSkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDgxKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IGluc3RhbmNlLnRyaWJ1dGUucmFuZ2UuZ2V0VGV4dFByZWNlZGluZ0N1cnJlbnRTZWxlY3Rpb24oKVxuICAgICAgICAgICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UudHJpYnV0ZS5oaWRlTWVudSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS50cmlidXRlLnNob3dNZW51Rm9yKHRoaXMsIHRydWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS50cmlidXRlLnNob3dNZW51Rm9yKHRoaXMsIHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGREZWFjdGl2YXRlKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy50cmlidXRlLmlzQWN0aXZlKSByZXR1cm4gZmFsc2VcblxuICAgICAgICBpZiAodGhpcy50cmlidXRlLmN1cnJlbnQubWVudGlvblRleHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsZXQgZXZlbnRLZXlQcmVzc2VkID0gZmFsc2VcbiAgICAgICAgICAgIFRyaWJ1dGVFdmVudHMua2V5cygpLmZvckVhY2gobyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IG8ua2V5KSBldmVudEtleVByZXNzZWQgPSB0cnVlXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gIWV2ZW50S2V5UHJlc3NlZFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgZ2V0S2V5Q29kZShpbnN0YW5jZSwgZWwsIGV2ZW50KSB7XG4gICAgICAgIGxldCBjaGFyXG4gICAgICAgIGxldCB0cmlidXRlID0gaW5zdGFuY2UudHJpYnV0ZVxuICAgICAgICBsZXQgaW5mbyA9IHRyaWJ1dGUucmFuZ2UuZ2V0VHJpZ2dlckluZm8oZmFsc2UsIHRyaWJ1dGUuaGFzVHJhaWxpbmdTcGFjZSwgdHJ1ZSwgdHJpYnV0ZS5hbGxvd1NwYWNlcywgdHJpYnV0ZS5hdXRvY29tcGxldGVNb2RlKVxuXG4gICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5mby5tZW50aW9uVHJpZ2dlckNoYXIuY2hhckNvZGVBdCgwKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVTZWxlY3Rpb24oZWwpIHtcbiAgICAgICAgdGhpcy50cmlidXRlLmN1cnJlbnQuZWxlbWVudCA9IGVsXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy50cmlidXRlLnJhbmdlLmdldFRyaWdnZXJJbmZvKGZhbHNlLCB0aGlzLnRyaWJ1dGUuaGFzVHJhaWxpbmdTcGFjZSwgdHJ1ZSwgdGhpcy50cmlidXRlLmFsbG93U3BhY2VzLCB0aGlzLnRyaWJ1dGUuYXV0b2NvbXBsZXRlTW9kZSlcblxuICAgICAgICBpZiAoaW5mbykge1xuICAgICAgICAgICAgdGhpcy50cmlidXRlLmN1cnJlbnQuc2VsZWN0ZWRQYXRoID0gaW5mby5tZW50aW9uU2VsZWN0ZWRQYXRoXG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUuY3VycmVudC5tZW50aW9uVGV4dCA9IGluZm8ubWVudGlvblRleHRcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5jdXJyZW50LnNlbGVjdGVkT2Zmc2V0ID0gaW5mby5tZW50aW9uU2VsZWN0ZWRPZmZzZXRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbGxiYWNrcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRyaWdnZXJDaGFyOiAoZSwgZWwsIHRyaWdnZXIsIHNob3dNZW51ID0gZmFsc2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy50cmlidXRlLnJhbmdlLmdldFRleHRQcmVjZWRpbmdDdXJyZW50U2VsZWN0aW9uKClcbiAgICAgICAgICAgICAgICBjb25zdCB3b3JkcyA9IHRleHQuc3BsaXQoXCIgXCIpXG4gICAgICAgICAgICAgICAgaWYgKHdvcmRzW3dvcmRzLmxlbmd0aCAtIDFdLnNwbGl0KCdAJykubGVuZ3RoIC0gMSA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAod29yZHNbd29yZHMubGVuZ3RoIC0gMV0udHJpbSgpWzBdICE9PSAnQCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCB0cmlidXRlID0gdGhpcy50cmlidXRlXG4gICAgICAgICAgICAgICAgdHJpYnV0ZS5jdXJyZW50LnRyaWdnZXIgPSB0cmlnZ2VyXG5cbiAgICAgICAgICAgICAgICBsZXQgY29sbGVjdGlvbkl0ZW0gPSB0cmlidXRlLmNvbGxlY3Rpb24uZmluZChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udHJpZ2dlciA9PT0gdHJpZ2dlclxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICB0cmlidXRlLmN1cnJlbnQuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb25JdGVtXG4gICAgICAgICAgICAgICAgaWYgKHRyaWJ1dGUuaW5wdXRFdmVudCB8fCBzaG93TWVudSkgdHJpYnV0ZS5zaG93TWVudUZvcihlbCwgdHJ1ZSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnRlcjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY2hvb3NlIHNlbGVjdGlvblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUgJiYgdGhpcy50cmlidXRlLmN1cnJlbnQuZmlsdGVyZWRJdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5zZWxlY3RJdGVtQXRJbmRleCh0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkLCBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmhpZGVNZW51KClcbiAgICAgICAgICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tbWE6IChlLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5zZWxlY3RXaXRoQ29tbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzKCkuZW50ZXIoZSwgZWwpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXNjYXBlOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhYjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY2hvb3NlIGZpcnN0IG1hdGNoXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3MoKS5lbnRlcihlLCBlbClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGFjZTogKGUsIGVsLCBlZGl0b3IpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuc3BhY2VTZWxlY3RzTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzKCkuZW50ZXIoZSwgZWwpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMudHJpYnV0ZS5hbGxvd1NwYWNlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmhpZGVNZW51KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IHRoaXMudHJpYnV0ZS5yYW5nZS5nZXRUZXh0UHJlY2VkaW5nQ3VycmVudFNlbGVjdGlvbigpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICBpZiAodGV4dC5sYXN0SW5kZXhPZih0aGlzLnRyaWJ1dGUuY3VycmVudC50cmlnZ2VyKSA9PT0gdGV4dC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaGlkZU1lbnUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBuYXZpZ2F0ZSB1cCB1bFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUgJiYgdGhpcy50cmlidXRlLmN1cnJlbnQuZmlsdGVyZWRJdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICBsZXQgY291bnQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudC5maWx0ZXJlZEl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZFxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IHNlbGVjdGVkICYmIHNlbGVjdGVkID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZC0tXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZUxpKClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQgPSBjb3VudCAtIDFcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZUxpKClcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5xdWVyeVNlbGVjdG9yKFwidWxcIikuc2Nyb2xsVG9wID0gdGhpcy50cmlidXRlLm1lbnUucXVlcnlTZWxlY3RvcihcInVsXCIpLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRvd246IChlLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIG5hdmlnYXRlIGRvd24gdWxcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlICYmIHRoaXMudHJpYnV0ZS5jdXJyZW50LmZpbHRlcmVkSXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ID0gdGhpcy50cmlidXRlLmN1cnJlbnQuZmlsdGVyZWRJdGVtcy5sZW5ndGggLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID4gc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQrK1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVMaSgpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgPT09IHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVMaSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5xdWVyeVNlbGVjdG9yKFwidWxcIikuc2Nyb2xsVG9wID0gMFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlbGV0ZTogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSAmJiB0aGlzLnRyaWJ1dGUuY3VycmVudC5tZW50aW9uVGV4dC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnNob3dNZW51Rm9yKGVsKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy50cmlidXRlLnJhbmdlLmdldFRleHRQcmVjZWRpbmdDdXJyZW50U2VsZWN0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd29yZHMgPSB0ZXh0LnNwbGl0KFwiIFwiKVxuICAgICAgICAgICAgICAgICAgICBpZiAod29yZHNbd29yZHMubGVuZ3RoIC0gMV0uc3BsaXQoJ0AnKS5sZW5ndGggLSAxID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh3b3Jkc1t3b3Jkcy5sZW5ndGggLSAxXS50cmltKClbMF0gIT09ICdAJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmlucHV0RXZlbnQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzKCkudHJpZ2dlckNoYXIoZSwgZWwsICh0aGlzLnRyaWJ1dGUuY3VycmVudC50cmlnZ2VyIHx8IFwiQFwiKSwgdHJ1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRBY3RpdmVMaShpbmRleCkge1xuICAgICAgICBsZXQgbGlzID0gdGhpcy50cmlidXRlLm1lbnUucXVlcnlTZWxlY3RvckFsbCgnbGknKSxcbiAgICAgICAgICAgIGxlbmd0aCA9IGxpcy5sZW5ndGggPj4+IDBcblxuICAgICAgICBpZiAoaW5kZXgpIHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQgPSBwYXJzZUludChpbmRleClcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbGkgPSBsaXNbaV1cbiAgICAgICAgICAgIGlmIChpID09PSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCh0aGlzLnRyaWJ1dGUuY3VycmVudC5jb2xsZWN0aW9uLnNlbGVjdENsYXNzKVxuXG4gICAgICAgICAgICAgICAgbGV0IGxpQ2xpZW50UmVjdCA9IGxpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgbGV0IG1lbnVDbGllbnRSZWN0ID0gdGhpcy50cmlidXRlLm1lbnUucXVlcnlTZWxlY3RvcihcInVsXCIpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICAgICAgICAgICAgICBpZiAobGlDbGllbnRSZWN0LmJvdHRvbSA+IG1lbnVDbGllbnRSZWN0LmJvdHRvbSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsRGlzdGFuY2UgPSBsaUNsaWVudFJlY3QuYm90dG9tIC0gbWVudUNsaWVudFJlY3QuYm90dG9tXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKS5zY3JvbGxUb3AgKz0gc2Nyb2xsRGlzdGFuY2VcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxpQ2xpZW50UmVjdC50b3AgPCBtZW51Q2xpZW50UmVjdC50b3ApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjcm9sbERpc3RhbmNlID0gbWVudUNsaWVudFJlY3QudG9wIC0gbGlDbGllbnRSZWN0LnRvcFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5xdWVyeVNlbGVjdG9yKFwidWxcIikuc2Nyb2xsVG9wIC09IHNjcm9sbERpc3RhbmNlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5yZW1vdmUodGhpcy50cmlidXRlLmN1cnJlbnQuY29sbGVjdGlvbi5zZWxlY3RDbGFzcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEZ1bGxIZWlnaHQoZWxlbSwgaW5jbHVkZU1hcmdpbikge1xuICAgICAgbGV0IGhlaWdodCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG5cbiAgICAgIGlmIChpbmNsdWRlTWFyZ2luKSB7XG4gICAgICAgIGxldCBzdHlsZSA9IGVsZW0uY3VycmVudFN0eWxlIHx8IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW0pXG4gICAgICAgIHJldHVybiBoZWlnaHQgKyBwYXJzZUZsb2F0KHN0eWxlLm1hcmdpblRvcCkgKyBwYXJzZUZsb2F0KHN0eWxlLm1hcmdpbkJvdHRvbSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlaWdodFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZUV2ZW50cztcbiIsImNsYXNzIFRyaWJ1dGVNZW51RXZlbnRzIHtcbiAgICBjb25zdHJ1Y3Rvcih0cmlidXRlKSB7XG4gICAgICAgIHRoaXMudHJpYnV0ZSA9IHRyaWJ1dGVcbiAgICAgICAgdGhpcy50cmlidXRlLm1lbnVFdmVudHMgPSB0aGlzXG4gICAgICAgIHRoaXMubWVudSA9IHRoaXMudHJpYnV0ZS5tZW51XG4gICAgfVxuXG4gICAgYmluZChtZW51KSB7XG4gICAgICAgIHRoaXMubWVudUNsaWNrRXZlbnQgPSB0aGlzLnRyaWJ1dGUuZXZlbnRzLmNsaWNrLmJpbmQobnVsbCwgdGhpcylcbiAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyU2Nyb2xsRXZlbnQgPSB0aGlzLmRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuc2hvd01lbnVGb3IodGhpcy50cmlidXRlLmN1cnJlbnQuZWxlbWVudCwgZmFsc2UpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDMwMCwgZmFsc2UpXG4gICAgICAgIHRoaXMud2luZG93UmVzaXplRXZlbnQgPSB0aGlzLmRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UucG9zaXRpb25NZW51QXRDYXJldCh0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAzMDAsIGZhbHNlKVxuXG4gICAgICAgIC8vIGZpeGVzIElFMTEgaXNzdWVzIHdpdGggbW91c2Vkb3duXG4gICAgICAgIHRoaXMudHJpYnV0ZS5yYW5nZS5nZXREb2N1bWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoJ01TUG9pbnRlckRvd24nLFxuICAgICAgICAgICAgdGhpcy5tZW51Q2xpY2tFdmVudCwgZmFsc2UpXG4gICAgICAgIHRoaXMudHJpYnV0ZS5yYW5nZS5nZXREb2N1bWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsXG4gICAgICAgICAgICB0aGlzLm1lbnVDbGlja0V2ZW50LCBmYWxzZSlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMud2luZG93UmVzaXplRXZlbnQpXG5cbiAgICAgICAgaWYgKHRoaXMubWVudUNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMubWVudUNvbnRhaW5lclNjcm9sbEV2ZW50LCBmYWxzZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm1lbnVDb250YWluZXJTY3JvbGxFdmVudClcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgdW5iaW5kKG1lbnUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlLnJhbmdlLmdldERvY3VtZW50KCkucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJyxcbiAgICAgICAgICAgIHRoaXMubWVudUNsaWNrRXZlbnQsIGZhbHNlKVxuICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UuZ2V0RG9jdW1lbnQoKS5yZW1vdmVFdmVudExpc3RlbmVyKCdNU1BvaW50ZXJEb3duJyxcbiAgICAgICAgICAgIHRoaXMubWVudUNsaWNrRXZlbnQsIGZhbHNlKVxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy53aW5kb3dSZXNpemVFdmVudClcblxuICAgICAgICBpZiAodGhpcy5tZW51Q29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnVDb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5tZW51Q29udGFpbmVyU2Nyb2xsRXZlbnQsIGZhbHNlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMubWVudUNvbnRhaW5lclNjcm9sbEV2ZW50KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgICAgIHZhciB0aW1lb3V0XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgYXJncyA9IGFyZ3VtZW50c1xuICAgICAgICAgICAgdmFyIGxhdGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsXG4gICAgICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dClcbiAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KVxuICAgICAgICAgICAgaWYgKGNhbGxOb3cpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncylcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlTWVudUV2ZW50cztcbiIsIi8vIFRoYW5rcyB0byBodHRwczovL2dpdGh1Yi5jb20vamVmZi1jb2xsaW5zL21lbnQuaW9cbmNsYXNzIFRyaWJ1dGVSYW5nZSB7XG4gICAgY29uc3RydWN0b3IodHJpYnV0ZSkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUgPSB0cmlidXRlXG4gICAgICAgIHRoaXMudHJpYnV0ZS5yYW5nZSA9IHRoaXNcbiAgICB9XG5cbiAgICBnZXREb2N1bWVudCgpIHtcbiAgICAgICAgbGV0IGlmcmFtZVxuICAgICAgICBpZiAodGhpcy50cmlidXRlLmN1cnJlbnQuY29sbGVjdGlvbikge1xuICAgICAgICAgICAgaWZyYW1lID0gdGhpcy50cmlidXRlLmN1cnJlbnQuY29sbGVjdGlvbi5pZnJhbWVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaWZyYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudFxuICAgIH1cblxuICAgIHBvc2l0aW9uTWVudUF0Q2FyZXQoc2Nyb2xsVG8pIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudCxcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzXG5cbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLmdldFRyaWdnZXJJbmZvKGZhbHNlLCB0aGlzLnRyaWJ1dGUuaGFzVHJhaWxpbmdTcGFjZSwgdHJ1ZSwgdGhpcy50cmlidXRlLmFsbG93U3BhY2VzLCB0aGlzLnRyaWJ1dGUuYXV0b2NvbXBsZXRlTW9kZSlcblxuICAgICAgICBpZiAodHlwZW9mIGluZm8gIT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIGlmKCF0aGlzLnRyaWJ1dGUucG9zaXRpb25NZW51KXtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS5jc3NUZXh0ID0gYGRpc3BsYXk6IGJsb2NrO2BcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVkaXRhYmxlKGNvbnRleHQuZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlcyA9IHRoaXMuZ2V0VGV4dEFyZWFPcklucHV0VW5kZXJsaW5lUG9zaXRpb24odGhpcy50cmlidXRlLmN1cnJlbnQuZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgaW5mby5tZW50aW9uUG9zaXRpb24pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlcyA9IHRoaXMuZ2V0Q29udGVudEVkaXRhYmxlQ2FyZXRQb3NpdGlvbihpbmZvLm1lbnRpb25Qb3NpdGlvbilcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS5jc3NUZXh0ID0gYHRvcDogJHtjb29yZGluYXRlcy50b3B9cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJHtjb29yZGluYXRlcy5sZWZ0fXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAke2Nvb3JkaW5hdGVzLnJpZ2h0fXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJHtjb29yZGluYXRlcy5ib3R0b219cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogMTAwMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7YFxuXG4gICAgICAgICAgICBpZiAoY29vcmRpbmF0ZXMubGVmdCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUubGVmdCA9ICdhdXRvJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29vcmRpbmF0ZXMudG9wID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS50b3AgPSAnYXV0bydcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNjcm9sbFRvKSB0aGlzLnNjcm9sbEludG9WaWV3KClcblxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBtZW51RGltZW5zaW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy50cmlidXRlLm1lbnUub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnRyaWJ1dGUubWVudS5vZmZzZXRIZWlnaHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IG1lbnVJc09mZlNjcmVlbiA9IHRoaXMuaXNNZW51T2ZmU2NyZWVuKGNvb3JkaW5hdGVzLCBtZW51RGltZW5zaW9ucylcblxuICAgICAgICAgICAgICAgIGxldCBtZW51SXNPZmZTY3JlZW5Ib3Jpem9udGFsbHkgPSB3aW5kb3cuaW5uZXJXaWR0aCA+IG1lbnVEaW1lbnNpb25zLndpZHRoICYmIChtZW51SXNPZmZTY3JlZW4ubGVmdCB8fCBtZW51SXNPZmZTY3JlZW4ucmlnaHQpXG4gICAgICAgICAgICAgICAgbGV0IG1lbnVJc09mZlNjcmVlblZlcnRpY2FsbHkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPiBtZW51RGltZW5zaW9ucy5oZWlnaHQgJiYgKG1lbnVJc09mZlNjcmVlbi50b3AgfHwgbWVudUlzT2ZmU2NyZWVuLmJvdHRvbSlcbiAgICAgICAgICAgICAgICBpZiAobWVudUlzT2ZmU2NyZWVuSG9yaXpvbnRhbGx5IHx8IG1lbnVJc09mZlNjcmVlblZlcnRpY2FsbHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5OiBub25lJ1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uTWVudUF0Q2FyZXQoc2Nyb2xsVG8pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMClcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5OiBub25lJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0RWxlbWVudCh0YXJnZXRFbGVtZW50LCBwYXRoLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IHJhbmdlXG4gICAgICAgIGxldCBlbGVtID0gdGFyZ2V0RWxlbWVudFxuXG4gICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBlbGVtID0gZWxlbS5jaGlsZE5vZGVzW3BhdGhbaV1dXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVsZW0ubGVuZ3RoIDwgb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCAtPSBlbGVtLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICBlbGVtID0gZWxlbS5uZXh0U2libGluZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMCAmJiAhZWxlbS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbSA9IGVsZW0ucHJldmlvdXNTaWJsaW5nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBzZWwgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpXG5cbiAgICAgICAgcmFuZ2UgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlUmFuZ2UoKVxuICAgICAgICByYW5nZS5zZXRTdGFydChlbGVtLCBvZmZzZXQpXG4gICAgICAgIHJhbmdlLnNldEVuZChlbGVtLCBvZmZzZXQpXG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge31cblxuICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpXG4gICAgICAgIHRhcmdldEVsZW1lbnQuZm9jdXMoKVxuICAgIH1cblxuICAgIHJlcGxhY2VUcmlnZ2VyVGV4dCh0ZXh0LCByZXF1aXJlTGVhZGluZ1NwYWNlLCBoYXNUcmFpbGluZ1NwYWNlLCBvcmlnaW5hbEV2ZW50LCBpdGVtKSB7XG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy50cmlidXRlLmN1cnJlbnRcbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLmdldFRyaWdnZXJJbmZvKHRydWUsIGhhc1RyYWlsaW5nU3BhY2UsIHJlcXVpcmVMZWFkaW5nU3BhY2UsIHRoaXMudHJpYnV0ZS5hbGxvd1NwYWNlcywgdGhpcy50cmlidXRlLmF1dG9jb21wbGV0ZU1vZGUpXG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBldmVudFxuICAgICAgICBsZXQgcmVwbGFjZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCd0cmlidXRlLXJlcGxhY2VkJywge1xuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgaXRlbTogaXRlbSxcbiAgICAgICAgICAgICAgICBldmVudDogb3JpZ2luYWxFdmVudFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChpbmZvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZShjb250ZXh0LmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgbGV0IG15RmllbGQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50XG4gICAgICAgICAgICAgICAgbGV0IHRleHRTdWZmaXggPSB0eXBlb2YgdGhpcy50cmlidXRlLnJlcGxhY2VUZXh0U3VmZml4ID09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy50cmlidXRlLnJlcGxhY2VUZXh0U3VmZml4XG4gICAgICAgICAgICAgICAgICAgIDogJyAnXG4gICAgICAgICAgICAgICAgdGV4dCArPSB0ZXh0U3VmZml4XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0UG9zID0gaW5mby5tZW50aW9uUG9zaXRpb25cbiAgICAgICAgICAgICAgICBsZXQgZW5kUG9zID0gaW5mby5tZW50aW9uUG9zaXRpb24gKyBpbmZvLm1lbnRpb25UZXh0Lmxlbmd0aCArIHRleHRTdWZmaXgubGVuZ3RoXG4gICAgICAgICAgICAgICAgbXlGaWVsZC52YWx1ZSA9IG15RmllbGQudmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0UG9zKSArIHRleHQgK1xuICAgICAgICAgICAgICAgICAgICBteUZpZWxkLnZhbHVlLnN1YnN0cmluZyhlbmRQb3MsIG15RmllbGQudmFsdWUubGVuZ3RoKVxuICAgICAgICAgICAgICAgIG15RmllbGQuc2VsZWN0aW9uU3RhcnQgPSBzdGFydFBvcyArIHRleHQubGVuZ3RoXG4gICAgICAgICAgICAgICAgbXlGaWVsZC5zZWxlY3Rpb25FbmQgPSBzdGFydFBvcyArIHRleHQubGVuZ3RoXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGFkZCBhIHNwYWNlIHRvIHRoZSBlbmQgb2YgdGhlIHBhc3RlZCB0ZXh0XG4gICAgICAgICAgICAgICAgbGV0IHRleHRTdWZmaXggPSB0eXBlb2YgdGhpcy50cmlidXRlLnJlcGxhY2VUZXh0U3VmZml4ID09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy50cmlidXRlLnJlcGxhY2VUZXh0U3VmZml4XG4gICAgICAgICAgICAgICAgICAgIDogJ1xceEEwJ1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbEV2ZW50LmtleUNvZGUgPT09IDE4OCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0U3VmZml4ID0gXCIsXCIgKyB0ZXh0U3VmZml4XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRleHQgKz0gdGV4dFN1ZmZpeFxuICAgICAgICAgICAgICAgIHRoaXMucGFzdGVIdG1sKHRleHQsIGluZm8ubWVudGlvblBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICBpbmZvLm1lbnRpb25Qb3NpdGlvbiArIGluZm8ubWVudGlvblRleHQubGVuZ3RoICsgIXRoaXMudHJpYnV0ZS5hdXRvY29tcGxldGVNb2RlKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250ZXh0LmVsZW1lbnQuZGlzcGF0Y2hFdmVudChyZXBsYWNlRXZlbnQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXN0ZUh0bWwoaHRtbCwgc3RhcnRQb3MsIGVuZFBvcykge1xuICAgICAgICBsZXQgcmFuZ2UsIHNlbFxuICAgICAgICBzZWwgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpXG4gICAgICAgIHJhbmdlID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZVJhbmdlKClcbiAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoc2VsLmFuY2hvck5vZGUsIHN0YXJ0UG9zKVxuICAgICAgICByYW5nZS5zZXRFbmQoc2VsLmFuY2hvck5vZGUsIGVuZFBvcylcbiAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKVxuXG4gICAgICAgIGxldCBlbCA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBlbC5pbm5lckhUTUwgPSBodG1sXG4gICAgICAgIGxldCBmcmFnID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcbiAgICAgICAgICAgIG5vZGUsIGxhc3ROb2RlXG4gICAgICAgIHdoaWxlICgobm9kZSA9IGVsLmZpcnN0Q2hpbGQpKSB7XG4gICAgICAgICAgICBsYXN0Tm9kZSA9IGZyYWcuYXBwZW5kQ2hpbGQobm9kZSlcbiAgICAgICAgfVxuICAgICAgICByYW5nZS5pbnNlcnROb2RlKGZyYWcpXG5cbiAgICAgICAgLy8gUHJlc2VydmUgdGhlIHNlbGVjdGlvblxuICAgICAgICBpZiAobGFzdE5vZGUpIHtcbiAgICAgICAgICAgIHJhbmdlID0gcmFuZ2UuY2xvbmVSYW5nZSgpXG4gICAgICAgICAgICByYW5nZS5zZXRTdGFydEFmdGVyKGxhc3ROb2RlKVxuICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSlcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0V2luZG93U2VsZWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy50cmlidXRlLmNvbGxlY3Rpb24uaWZyYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmlidXRlLmNvbGxlY3Rpb24uaWZyYW1lLmNvbnRlbnRXaW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB3aW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICB9XG5cbiAgICBnZXROb2RlUG9zaXRpb25JblBhcmVudChlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAwXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZE5vZGVzW2ldXG5cbiAgICAgICAgICAgIGlmIChub2RlID09PSBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENvbnRlbnRFZGl0YWJsZVNlbGVjdGVkUGF0aChjdHgpIHtcbiAgICAgICAgbGV0IHNlbCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKClcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gc2VsLmFuY2hvck5vZGVcbiAgICAgICAgbGV0IHBhdGggPSBbXVxuICAgICAgICBsZXQgb2Zmc2V0XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBpXG4gICAgICAgICAgICBsZXQgY2UgPSBzZWxlY3RlZC5jb250ZW50RWRpdGFibGVcbiAgICAgICAgICAgIHdoaWxlIChzZWxlY3RlZCAhPT0gbnVsbCAmJiBjZSAhPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgaSA9IHRoaXMuZ2V0Tm9kZVBvc2l0aW9uSW5QYXJlbnQoc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgcGF0aC5wdXNoKGkpXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3RlZC5wYXJlbnROb2RlXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlID0gc2VsZWN0ZWQuY29udGVudEVkaXRhYmxlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF0aC5yZXZlcnNlKClcblxuICAgICAgICAgICAgLy8gZ2V0UmFuZ2VBdCBtYXkgbm90IGV4aXN0LCBuZWVkIGFsdGVybmF0aXZlXG4gICAgICAgICAgICBvZmZzZXQgPSBzZWwuZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldFxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZCxcbiAgICAgICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUZXh0UHJlY2VkaW5nQ3VycmVudFNlbGVjdGlvbigpIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudCxcbiAgICAgICAgICAgIHRleHQgPSAnJ1xuXG4gICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZShjb250ZXh0LmVsZW1lbnQpKSB7XG4gICAgICAgICAgICBsZXQgdGV4dENvbXBvbmVudCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAodGV4dENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGxldCBzdGFydFBvcyA9IHRleHRDb21wb25lbnQuc2VsZWN0aW9uU3RhcnRcbiAgICAgICAgICAgICAgICBpZiAodGV4dENvbXBvbmVudC52YWx1ZSAmJiBzdGFydFBvcyA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0Q29tcG9uZW50LnZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEVsZW0gPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpLmFuY2hvck5vZGVcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkRWxlbSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHdvcmtpbmdOb2RlQ29udGVudCA9IHNlbGVjdGVkRWxlbS50ZXh0Q29udGVudFxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RTdGFydE9mZnNldCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldFxuXG4gICAgICAgICAgICAgICAgaWYgKHdvcmtpbmdOb2RlQ29udGVudCAmJiBzZWxlY3RTdGFydE9mZnNldCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSB3b3JraW5nTm9kZUNvbnRlbnQuc3Vic3RyaW5nKDAsIHNlbGVjdFN0YXJ0T2Zmc2V0KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0ZXh0XG4gICAgfVxuXG4gICAgZ2V0TGFzdFdvcmRJblRleHQodGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHUwMEEwL2csICcgJyk7IC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI5ODUwNDA3L2hvdy1kby1pLXJlcGxhY2UtdW5pY29kZS1jaGFyYWN0ZXItdTAwYTAtd2l0aC1hLXNwYWNlLWluLWphdmFzY3JpcHRcbiAgICAgICAgbGV0IHdvcmRzQXJyYXkgPSB0ZXh0LnNwbGl0KCcgJylcbiAgICAgICAgbGV0IHdvcmxkc0NvdW50ID0gd29yZHNBcnJheS5sZW5ndGggLSAxXG4gICAgICAgIHJldHVybiB3b3Jkc0FycmF5W3dvcmxkc0NvdW50XS50cmltKClcbiAgICB9XG5cbiAgICBnZXRUcmlnZ2VySW5mbyhtZW51QWxyZWFkeUFjdGl2ZSwgaGFzVHJhaWxpbmdTcGFjZSwgcmVxdWlyZUxlYWRpbmdTcGFjZSwgYWxsb3dTcGFjZXMsIGlzQXV0b2NvbXBsZXRlKSB7XG4gICAgICAgIGxldCBjdHggPSB0aGlzLnRyaWJ1dGUuY3VycmVudFxuICAgICAgICBsZXQgc2VsZWN0ZWQsIHBhdGgsIG9mZnNldFxuXG4gICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZShjdHguZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy50cmlidXRlLmN1cnJlbnQuZWxlbWVudFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbkluZm8gPSB0aGlzLmdldENvbnRlbnRFZGl0YWJsZVNlbGVjdGVkUGF0aChjdHgpXG5cbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb25JbmZvKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3Rpb25JbmZvLnNlbGVjdGVkXG4gICAgICAgICAgICAgICAgcGF0aCA9IHNlbGVjdGlvbkluZm8ucGF0aFxuICAgICAgICAgICAgICAgIG9mZnNldCA9IHNlbGVjdGlvbkluZm8ub2Zmc2V0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWZmZWN0aXZlUmFuZ2UgPSB0aGlzLmdldFRleHRQcmVjZWRpbmdDdXJyZW50U2VsZWN0aW9uKClcbiAgICAgICAgbGV0IGxhc3RXb3JkT2ZFZmZlY3RpdmVSYW5nZSA9IHRoaXMuZ2V0TGFzdFdvcmRJblRleHQoZWZmZWN0aXZlUmFuZ2UpXG5cbiAgICAgICAgaWYgKGlzQXV0b2NvbXBsZXRlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG1lbnRpb25Qb3NpdGlvbjogZWZmZWN0aXZlUmFuZ2UubGVuZ3RoIC0gbGFzdFdvcmRPZkVmZmVjdGl2ZVJhbmdlLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBtZW50aW9uVGV4dDogbGFzdFdvcmRPZkVmZmVjdGl2ZVJhbmdlLFxuICAgICAgICAgICAgICAgIG1lbnRpb25TZWxlY3RlZEVsZW1lbnQ6IHNlbGVjdGVkLFxuICAgICAgICAgICAgICAgIG1lbnRpb25TZWxlY3RlZFBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkT2Zmc2V0OiBvZmZzZXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlZmZlY3RpdmVSYW5nZSAhPT0gdW5kZWZpbmVkICYmIGVmZmVjdGl2ZVJhbmdlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zID0gLTFcbiAgICAgICAgICAgIGxldCB0cmlnZ2VyQ2hhclxuXG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUuY29sbGVjdGlvbi5mb3JFYWNoKGNvbmZpZyA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGMgPSBjb25maWcudHJpZ2dlclxuICAgICAgICAgICAgICAgIGxldCBpZHggPSBjb25maWcucmVxdWlyZUxlYWRpbmdTcGFjZSA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEluZGV4V2l0aExlYWRpbmdTcGFjZShlZmZlY3RpdmVSYW5nZSwgYykgOlxuICAgICAgICAgICAgICAgICAgICBlZmZlY3RpdmVSYW5nZS5sYXN0SW5kZXhPZihjKVxuXG4gICAgICAgICAgICAgICAgaWYgKGlkeCA+IG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcykge1xuICAgICAgICAgICAgICAgICAgICBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgPSBpZHhcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckNoYXIgPSBjXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVMZWFkaW5nU3BhY2UgPSBjb25maWcucmVxdWlyZUxlYWRpbmdTcGFjZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmIChtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgPj0gMCAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zID09PSAwIHx8XG4gICAgICAgICAgICAgICAgICAgICFyZXF1aXJlTGVhZGluZ1NwYWNlIHx8XG4gICAgICAgICAgICAgICAgICAgIC9bXFx4QTBcXHNdL2cudGVzdChcbiAgICAgICAgICAgICAgICAgICAgICAgIGVmZmVjdGl2ZVJhbmdlLnN1YnN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcylcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50VHJpZ2dlclNuaXBwZXQgPSBlZmZlY3RpdmVSYW5nZS5zdWJzdHJpbmcobW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zICsgMSxcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0aXZlUmFuZ2UubGVuZ3RoKVxuXG4gICAgICAgICAgICAgICAgdHJpZ2dlckNoYXIgPSBlZmZlY3RpdmVSYW5nZS5zdWJzdHJpbmcobW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zLCBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgKyAxKVxuICAgICAgICAgICAgICAgIGxldCBmaXJzdFNuaXBwZXRDaGFyID0gY3VycmVudFRyaWdnZXJTbmlwcGV0LnN1YnN0cmluZygwLCAxKVxuICAgICAgICAgICAgICAgIGxldCBsZWFkaW5nU3BhY2UgPSBjdXJyZW50VHJpZ2dlclNuaXBwZXQubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFNuaXBwZXRDaGFyID09PSAnICcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0U25pcHBldENoYXIgPT09ICdcXHhBMCdcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIGlmIChoYXNUcmFpbGluZ1NwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUcmlnZ2VyU25pcHBldCA9IGN1cnJlbnRUcmlnZ2VyU25pcHBldC50cmltKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVnZXggPSBhbGxvd1NwYWNlcyA/IC9bXlxcUyBdL2cgOiAvW1xceEEwXFxzXS9nO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmhhc1RyYWlsaW5nU3BhY2UgPSByZWdleC50ZXN0KGN1cnJlbnRUcmlnZ2VyU25pcHBldCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWxlYWRpbmdTcGFjZSAmJiAobWVudUFscmVhZHlBY3RpdmUgfHwgIShyZWdleC50ZXN0KGN1cnJlbnRUcmlnZ2VyU25pcHBldCkpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblBvc2l0aW9uOiBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uVGV4dDogY3VycmVudFRyaWdnZXJTbmlwcGV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkRWxlbWVudDogc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uU2VsZWN0ZWRQYXRoOiBwYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkT2Zmc2V0OiBvZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uVHJpZ2dlckNoYXI6IHRyaWdnZXJDaGFyXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SW5kZXhXaXRoTGVhZGluZ1NwYWNlIChzdHIsIGNoYXIpIHtcbiAgICAgICAgbGV0IHJldmVyc2VkU3RyID0gc3RyLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJylcbiAgICAgICAgbGV0IGluZGV4ID0gLTFcblxuICAgICAgICBmb3IgKGxldCBjaWR4ID0gMCwgbGVuID0gc3RyLmxlbmd0aDsgY2lkeCA8IGxlbjsgY2lkeCsrKSB7XG4gICAgICAgICAgICBsZXQgZmlyc3RDaGFyID0gY2lkeCA9PT0gc3RyLmxlbmd0aCAtIDFcbiAgICAgICAgICAgIGxldCBsZWFkaW5nU3BhY2UgPSAvXFxzLy50ZXN0KHJldmVyc2VkU3RyW2NpZHggKyAxXSlcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IGNoYXIgPT09IHJldmVyc2VkU3RyW2NpZHhdXG5cbiAgICAgICAgICAgIGlmIChtYXRjaCAmJiAoZmlyc3RDaGFyIHx8IGxlYWRpbmdTcGFjZSkpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IHN0ci5sZW5ndGggLSAxIC0gY2lkeFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXhcbiAgICB9XG5cbiAgICBpc0NvbnRlbnRFZGl0YWJsZShlbGVtZW50KSB7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQubm9kZU5hbWUgIT09ICdJTlBVVCcgJiYgZWxlbWVudC5ub2RlTmFtZSAhPT0gJ1RFWFRBUkVBJ1xuICAgIH1cblxuICAgIGlzTWVudU9mZlNjcmVlbihjb29yZGluYXRlcywgbWVudURpbWVuc2lvbnMpIHtcbiAgICAgICAgbGV0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgbGV0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICBsZXQgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4gICAgICAgIGxldCB3aW5kb3dMZWZ0ID0gKHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2Muc2Nyb2xsTGVmdCkgLSAoZG9jLmNsaWVudExlZnQgfHwgMClcbiAgICAgICAgbGV0IHdpbmRvd1RvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgLSAoZG9jLmNsaWVudFRvcCB8fCAwKVxuXG4gICAgICAgIGxldCBtZW51VG9wID0gdHlwZW9mIGNvb3JkaW5hdGVzLnRvcCA9PT0gJ251bWJlcicgPyBjb29yZGluYXRlcy50b3AgOiB3aW5kb3dUb3AgKyB3aW5kb3dIZWlnaHQgLSBjb29yZGluYXRlcy5ib3R0b20gLSBtZW51RGltZW5zaW9ucy5oZWlnaHRcbiAgICAgICAgbGV0IG1lbnVSaWdodCA9IHR5cGVvZiBjb29yZGluYXRlcy5yaWdodCA9PT0gJ251bWJlcicgPyBjb29yZGluYXRlcy5yaWdodCA6IGNvb3JkaW5hdGVzLmxlZnQgKyBtZW51RGltZW5zaW9ucy53aWR0aFxuICAgICAgICBsZXQgbWVudUJvdHRvbSA9IHR5cGVvZiBjb29yZGluYXRlcy5ib3R0b20gPT09ICdudW1iZXInID8gY29vcmRpbmF0ZXMuYm90dG9tIDogY29vcmRpbmF0ZXMudG9wICsgbWVudURpbWVuc2lvbnMuaGVpZ2h0XG4gICAgICAgIGxldCBtZW51TGVmdCA9IHR5cGVvZiBjb29yZGluYXRlcy5sZWZ0ID09PSAnbnVtYmVyJyA/IGNvb3JkaW5hdGVzLmxlZnQgOiB3aW5kb3dMZWZ0ICsgd2luZG93V2lkdGggLSBjb29yZGluYXRlcy5yaWdodCAtIG1lbnVEaW1lbnNpb25zLndpZHRoXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogbWVudVRvcCA8IE1hdGguZmxvb3Iod2luZG93VG9wKSxcbiAgICAgICAgICAgIHJpZ2h0OiBtZW51UmlnaHQgPiBNYXRoLmNlaWwod2luZG93TGVmdCArIHdpbmRvd1dpZHRoKSxcbiAgICAgICAgICAgIGJvdHRvbTogbWVudUJvdHRvbSA+IE1hdGguY2VpbCh3aW5kb3dUb3AgKyB3aW5kb3dIZWlnaHQpLFxuICAgICAgICAgICAgbGVmdDogbWVudUxlZnQgPCBNYXRoLmZsb29yKHdpbmRvd0xlZnQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRNZW51RGltZW5zaW9ucygpIHtcbiAgICAgICAgLy8gV2lkdGggb2YgdGhlIG1lbnUgZGVwZW5kcyBvZiBpdHMgY29udGVudHMgYW5kIHBvc2l0aW9uXG4gICAgICAgIC8vIFdlIG11c3QgY2hlY2sgd2hhdCBpdHMgd2lkdGggd291bGQgYmUgd2l0aG91dCBhbnkgb2JzdHJ1Y3Rpb25cbiAgICAgICAgLy8gVGhpcyB3YXksIHdlIGNhbiBhY2hpZXZlIGdvb2QgcG9zaXRpb25pbmcgZm9yIGZsaXBwaW5nIHRoZSBtZW51XG4gICAgICAgIGxldCBkaW1lbnNpb25zID0ge1xuICAgICAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgICAgICBoZWlnaHQ6IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnN0eWxlLmNzc1RleHQgPSBgdG9wOiAwcHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwcHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDEwMDAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OyBoaWRkZW47YFxuICAgICAgIGRpbWVuc2lvbnMud2lkdGggPSB0aGlzLnRyaWJ1dGUubWVudS5vZmZzZXRXaWR0aFxuICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0ID0gdGhpcy50cmlidXRlLm1lbnUub2Zmc2V0SGVpZ2h0XG5cbiAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS5jc3NUZXh0ID0gYGRpc3BsYXk6IG5vbmU7YFxuXG4gICAgICAgcmV0dXJuIGRpbWVuc2lvbnNcbiAgICB9XG5cbiAgICBnZXRUZXh0QXJlYU9ySW5wdXRVbmRlcmxpbmVQb3NpdGlvbihlbGVtZW50LCBwb3NpdGlvbiwgZmxpcHBlZCkge1xuICAgICAgICBsZXQgcHJvcGVydGllcyA9IFsnZGlyZWN0aW9uJywgJ2JveFNpemluZycsICd3aWR0aCcsICdoZWlnaHQnLCAnb3ZlcmZsb3dYJyxcbiAgICAgICAgICAgICdvdmVyZmxvd1knLCAnYm9yZGVyVG9wV2lkdGgnLCAnYm9yZGVyUmlnaHRXaWR0aCcsXG4gICAgICAgICAgICAnYm9yZGVyQm90dG9tV2lkdGgnLCAnYm9yZGVyTGVmdFdpZHRoJywgJ3BhZGRpbmdUb3AnLFxuICAgICAgICAgICAgJ3BhZGRpbmdSaWdodCcsICdwYWRkaW5nQm90dG9tJywgJ3BhZGRpbmdMZWZ0JyxcbiAgICAgICAgICAgICdmb250U3R5bGUnLCAnZm9udFZhcmlhbnQnLCAnZm9udFdlaWdodCcsICdmb250U3RyZXRjaCcsXG4gICAgICAgICAgICAnZm9udFNpemUnLCAnZm9udFNpemVBZGp1c3QnLCAnbGluZUhlaWdodCcsICdmb250RmFtaWx5JyxcbiAgICAgICAgICAgICd0ZXh0QWxpZ24nLCAndGV4dFRyYW5zZm9ybScsICd0ZXh0SW5kZW50JyxcbiAgICAgICAgICAgICd0ZXh0RGVjb3JhdGlvbicsICdsZXR0ZXJTcGFjaW5nJywgJ3dvcmRTcGFjaW5nJ1xuICAgICAgICBdXG5cbiAgICAgICAgbGV0IGlzRmlyZWZveCA9ICh3aW5kb3cubW96SW5uZXJTY3JlZW5YICE9PSBudWxsKVxuXG4gICAgICAgIGxldCBkaXYgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgZGl2LmlkID0gJ2lucHV0LXRleHRhcmVhLWNhcmV0LXBvc2l0aW9uLW1pcnJvci1kaXYnXG4gICAgICAgIHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5LmFwcGVuZENoaWxkKGRpdilcblxuICAgICAgICBsZXQgc3R5bGUgPSBkaXYuc3R5bGVcbiAgICAgICAgbGV0IGNvbXB1dGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUgPyBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIDogZWxlbWVudC5jdXJyZW50U3R5bGVcblxuICAgICAgICBzdHlsZS53aGl0ZVNwYWNlID0gJ3ByZS13cmFwJ1xuICAgICAgICBpZiAoZWxlbWVudC5ub2RlTmFtZSAhPT0gJ0lOUFVUJykge1xuICAgICAgICAgICAgc3R5bGUud29yZFdyYXAgPSAnYnJlYWstd29yZCdcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBvc2l0aW9uIG9mZi1zY3JlZW5cbiAgICAgICAgc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgICAgIHN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xuXG4gICAgICAgIC8vIHRyYW5zZmVyIHRoZSBlbGVtZW50J3MgcHJvcGVydGllcyB0byB0aGUgZGl2XG4gICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgICAgIHN0eWxlW3Byb3BdID0gY29tcHV0ZWRbcHJvcF1cbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoaXNGaXJlZm94KSB7XG4gICAgICAgICAgICBzdHlsZS53aWR0aCA9IGAkeyhwYXJzZUludChjb21wdXRlZC53aWR0aCkgLSAyKX1weGBcbiAgICAgICAgICAgIGlmIChlbGVtZW50LnNjcm9sbEhlaWdodCA+IHBhcnNlSW50KGNvbXB1dGVkLmhlaWdodCkpXG4gICAgICAgICAgICAgICAgc3R5bGUub3ZlcmZsb3dZID0gJ3Njcm9sbCdcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcbiAgICAgICAgfVxuXG4gICAgICAgIGRpdi50ZXh0Q29udGVudCA9IGVsZW1lbnQudmFsdWUuc3Vic3RyaW5nKDAsIHBvc2l0aW9uKVxuXG4gICAgICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICAgICAgICBkaXYudGV4dENvbnRlbnQgPSBkaXYudGV4dENvbnRlbnQucmVwbGFjZSgvXFxzL2csICfCoCcpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3BhbiA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgc3Bhbi50ZXh0Q29udGVudCA9IGVsZW1lbnQudmFsdWUuc3Vic3RyaW5nKHBvc2l0aW9uKSB8fCAnLidcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHNwYW4pXG5cbiAgICAgICAgbGV0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGxldCBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcbiAgICAgICAgbGV0IHdpbmRvd0xlZnQgPSAod2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvYy5zY3JvbGxMZWZ0KSAtIChkb2MuY2xpZW50TGVmdCB8fCAwKVxuICAgICAgICBsZXQgd2luZG93VG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2Muc2Nyb2xsVG9wKSAtIChkb2MuY2xpZW50VG9wIHx8IDApXG5cbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzID0ge1xuICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArIHdpbmRvd1RvcCArIHNwYW4ub2Zmc2V0VG9wICsgcGFyc2VJbnQoY29tcHV0ZWQuYm9yZGVyVG9wV2lkdGgpICsgcGFyc2VJbnQoY29tcHV0ZWQuZm9udFNpemUpIC0gZWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyB3aW5kb3dMZWZ0ICsgc3Bhbi5vZmZzZXRMZWZ0ICsgcGFyc2VJbnQoY29tcHV0ZWQuYm9yZGVyTGVmdFdpZHRoKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgbGV0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuXG4gICAgICAgIGxldCBtZW51RGltZW5zaW9ucyA9IHRoaXMuZ2V0TWVudURpbWVuc2lvbnMoKVxuICAgICAgICBsZXQgbWVudUlzT2ZmU2NyZWVuID0gdGhpcy5pc01lbnVPZmZTY3JlZW4oY29vcmRpbmF0ZXMsIG1lbnVEaW1lbnNpb25zKVxuXG4gICAgICAgIGlmIChtZW51SXNPZmZTY3JlZW4ucmlnaHQpIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnJpZ2h0ID0gd2luZG93V2lkdGggLSBjb29yZGluYXRlcy5sZWZ0XG4gICAgICAgICAgICBjb29yZGluYXRlcy5sZWZ0ID0gJ2F1dG8nXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFyZW50SGVpZ2h0ID0gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXJcbiAgICAgICAgICAgID8gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXIub2Zmc2V0SGVpZ2h0XG4gICAgICAgICAgICA6IHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5Lm9mZnNldEhlaWdodFxuXG4gICAgICAgIGlmIChtZW51SXNPZmZTY3JlZW4uYm90dG9tKSB7XG4gICAgICAgICAgICBsZXQgcGFyZW50UmVjdCA9IHRoaXMudHJpYnV0ZS5tZW51Q29udGFpbmVyXG4gICAgICAgICAgICAgICAgPyB0aGlzLnRyaWJ1dGUubWVudUNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgICAgIDogdGhpcy5nZXREb2N1bWVudCgpLmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgIGxldCBzY3JvbGxTdGlsbEF2YWlsYWJsZSA9IHBhcmVudEhlaWdodCAtICh3aW5kb3dIZWlnaHQgLSBwYXJlbnRSZWN0LnRvcClcblxuICAgICAgICAgICAgY29vcmRpbmF0ZXMuYm90dG9tID0gc2Nyb2xsU3RpbGxBdmFpbGFibGUgKyAod2luZG93SGVpZ2h0IC0gcmVjdC50b3AgLSBzcGFuLm9mZnNldFRvcClcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnRvcCA9ICdhdXRvJ1xuICAgICAgICB9XG5cbiAgICAgICAgbWVudUlzT2ZmU2NyZWVuID0gdGhpcy5pc01lbnVPZmZTY3JlZW4oY29vcmRpbmF0ZXMsIG1lbnVEaW1lbnNpb25zKVxuICAgICAgICBpZiAobWVudUlzT2ZmU2NyZWVuLmxlZnQpIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLmxlZnQgPSB3aW5kb3dXaWR0aCA+IG1lbnVEaW1lbnNpb25zLndpZHRoXG4gICAgICAgICAgICAgICAgPyB3aW5kb3dMZWZ0ICsgd2luZG93V2lkdGggLSBtZW51RGltZW5zaW9ucy53aWR0aFxuICAgICAgICAgICAgICAgIDogd2luZG93TGVmdFxuICAgICAgICAgICAgZGVsZXRlIGNvb3JkaW5hdGVzLnJpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lbnVJc09mZlNjcmVlbi50b3ApIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnRvcCA9IHdpbmRvd0hlaWdodCA+IG1lbnVEaW1lbnNpb25zLmhlaWdodFxuICAgICAgICAgICAgICAgID8gd2luZG93VG9wICsgd2luZG93SGVpZ2h0IC0gbWVudURpbWVuc2lvbnMuaGVpZ2h0XG4gICAgICAgICAgICAgICAgOiB3aW5kb3dUb3BcbiAgICAgICAgICAgIGRlbGV0ZSBjb29yZGluYXRlcy5ib3R0b21cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5LnJlbW92ZUNoaWxkKGRpdilcbiAgICAgICAgcmV0dXJuIGNvb3JkaW5hdGVzXG4gICAgfVxuXG4gICAgZ2V0Q29udGVudEVkaXRhYmxlQ2FyZXRQb3NpdGlvbihzZWxlY3RlZE5vZGVQb3NpdGlvbikge1xuICAgICAgICBsZXQgbWFya2VyVGV4dENoYXIgPSAn77u/J1xuICAgICAgICBsZXQgbWFya2VyRWwsIG1hcmtlcklkID0gYHNlbF8ke25ldyBEYXRlKCkuZ2V0VGltZSgpfV8ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zdWJzdHIoMil9YFxuICAgICAgICBsZXQgcmFuZ2VcbiAgICAgICAgbGV0IHNlbCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKClcbiAgICAgICAgbGV0IHByZXZSYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApXG5cbiAgICAgICAgcmFuZ2UgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlUmFuZ2UoKVxuICAgICAgICByYW5nZS5zZXRTdGFydChzZWwuYW5jaG9yTm9kZSwgc2VsZWN0ZWROb2RlUG9zaXRpb24pXG4gICAgICAgIHJhbmdlLnNldEVuZChzZWwuYW5jaG9yTm9kZSwgc2VsZWN0ZWROb2RlUG9zaXRpb24pXG5cbiAgICAgICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpXG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBtYXJrZXIgZWxlbWVudCBjb250YWluaW5nIGEgc2luZ2xlIGludmlzaWJsZSBjaGFyYWN0ZXIgdXNpbmcgRE9NIG1ldGhvZHMgYW5kIGluc2VydCBpdFxuICAgICAgICBtYXJrZXJFbCA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgbWFya2VyRWwuaWQgPSBtYXJrZXJJZFxuXG4gICAgICAgIG1hcmtlckVsLmFwcGVuZENoaWxkKHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVUZXh0Tm9kZShtYXJrZXJUZXh0Q2hhcikpXG4gICAgICAgIHJhbmdlLmluc2VydE5vZGUobWFya2VyRWwpXG4gICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICBzZWwuYWRkUmFuZ2UocHJldlJhbmdlKVxuXG4gICAgICAgIGxldCByZWN0ID0gbWFya2VyRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgbGV0IGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICAgICAgICBsZXQgd2luZG93TGVmdCA9ICh3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jLnNjcm9sbExlZnQpIC0gKGRvYy5jbGllbnRMZWZ0IHx8IDApXG4gICAgICAgIGxldCB3aW5kb3dUb3AgPSAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3ApIC0gKGRvYy5jbGllbnRUb3AgfHwgMClcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzID0ge1xuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luZG93TGVmdCxcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyBtYXJrZXJFbC5vZmZzZXRIZWlnaHQgKyB3aW5kb3dUb3BcbiAgICAgICAgfVxuICAgICAgICBsZXQgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICBsZXQgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG5cbiAgICAgICAgbGV0IG1lbnVEaW1lbnNpb25zID0gdGhpcy5nZXRNZW51RGltZW5zaW9ucygpXG4gICAgICAgIGxldCBtZW51SXNPZmZTY3JlZW4gPSB0aGlzLmlzTWVudU9mZlNjcmVlbihjb29yZGluYXRlcywgbWVudURpbWVuc2lvbnMpXG5cbiAgICAgICAgaWYgKG1lbnVJc09mZlNjcmVlbi5yaWdodCkge1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMubGVmdCA9ICdhdXRvJ1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMucmlnaHQgPSB3aW5kb3dXaWR0aCAtIHJlY3QubGVmdCAtIHdpbmRvd0xlZnRcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJlbnRIZWlnaHQgPSB0aGlzLnRyaWJ1dGUubWVudUNvbnRhaW5lclxuICAgICAgICAgICAgPyB0aGlzLnRyaWJ1dGUubWVudUNvbnRhaW5lci5vZmZzZXRIZWlnaHRcbiAgICAgICAgICAgIDogdGhpcy5nZXREb2N1bWVudCgpLmJvZHkub2Zmc2V0SGVpZ2h0XG5cbiAgICAgICAgaWYgKG1lbnVJc09mZlNjcmVlbi5ib3R0b20pIHtcbiAgICAgICAgICAgIGxldCBwYXJlbnRSZWN0ID0gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXJcbiAgICAgICAgICAgICAgICA/IHRoaXMudHJpYnV0ZS5tZW51Q29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgOiB0aGlzLmdldERvY3VtZW50KCkuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgbGV0IHNjcm9sbFN0aWxsQXZhaWxhYmxlID0gcGFyZW50SGVpZ2h0IC0gKHdpbmRvd0hlaWdodCAtIHBhcmVudFJlY3QudG9wKVxuXG4gICAgICAgICAgICBjb29yZGluYXRlcy50b3AgPSAnYXV0bydcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLmJvdHRvbSA9IHNjcm9sbFN0aWxsQXZhaWxhYmxlICsgKHdpbmRvd0hlaWdodCAtIHJlY3QudG9wKVxuICAgICAgICB9XG5cbiAgICAgICAgbWVudUlzT2ZmU2NyZWVuID0gdGhpcy5pc01lbnVPZmZTY3JlZW4oY29vcmRpbmF0ZXMsIG1lbnVEaW1lbnNpb25zKVxuICAgICAgICBpZiAobWVudUlzT2ZmU2NyZWVuLmxlZnQpIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLmxlZnQgPSB3aW5kb3dXaWR0aCA+IG1lbnVEaW1lbnNpb25zLndpZHRoXG4gICAgICAgICAgICAgICAgPyB3aW5kb3dMZWZ0ICsgd2luZG93V2lkdGggLSBtZW51RGltZW5zaW9ucy53aWR0aFxuICAgICAgICAgICAgICAgIDogd2luZG93TGVmdFxuICAgICAgICAgICAgZGVsZXRlIGNvb3JkaW5hdGVzLnJpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lbnVJc09mZlNjcmVlbi50b3ApIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnRvcCA9IHdpbmRvd0hlaWdodCA+IG1lbnVEaW1lbnNpb25zLmhlaWdodFxuICAgICAgICAgICAgICAgID8gd2luZG93VG9wICsgd2luZG93SGVpZ2h0IC0gbWVudURpbWVuc2lvbnMuaGVpZ2h0XG4gICAgICAgICAgICAgICAgOiB3aW5kb3dUb3BcbiAgICAgICAgICAgIGRlbGV0ZSBjb29yZGluYXRlcy5ib3R0b21cbiAgICAgICAgfVxuXG4gICAgICAgIG1hcmtlckVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobWFya2VyRWwpXG4gICAgICAgIHJldHVybiBjb29yZGluYXRlc1xuICAgIH1cblxuICAgIHNjcm9sbEludG9WaWV3KGVsZW0pIHtcbiAgICAgICAgbGV0IHJlYXNvbmFibGVCdWZmZXIgPSAyMCxcbiAgICAgICAgICAgIGNsaWVudFJlY3RcbiAgICAgICAgbGV0IG1heFNjcm9sbERpc3BsYWNlbWVudCA9IDEwMFxuICAgICAgICBsZXQgZSA9IHRoaXMubWVudVxuXG4gICAgICAgIGlmICh0eXBlb2YgZSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuICAgICAgICB3aGlsZSAoY2xpZW50UmVjdCA9PT0gdW5kZWZpbmVkIHx8IGNsaWVudFJlY3QuaGVpZ2h0ID09PSAwKSB7XG4gICAgICAgICAgICBjbGllbnRSZWN0ID0gZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gICAgICAgICAgICBpZiAoY2xpZW50UmVjdC5oZWlnaHQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBlID0gZS5jaGlsZE5vZGVzWzBdXG4gICAgICAgICAgICAgICAgaWYgKGUgPT09IHVuZGVmaW5lZCB8fCAhZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVsZW1Ub3AgPSBjbGllbnRSZWN0LnRvcFxuICAgICAgICBsZXQgZWxlbUJvdHRvbSA9IGVsZW1Ub3AgKyBjbGllbnRSZWN0LmhlaWdodFxuXG4gICAgICAgIGlmIChlbGVtVG9wIDwgMCkge1xuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHdpbmRvdy5wYWdlWU9mZnNldCArIGNsaWVudFJlY3QudG9wIC0gcmVhc29uYWJsZUJ1ZmZlcilcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtQm90dG9tID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgICAgICBsZXQgbWF4WSA9IHdpbmRvdy5wYWdlWU9mZnNldCArIGNsaWVudFJlY3QudG9wIC0gcmVhc29uYWJsZUJ1ZmZlclxuXG4gICAgICAgICAgICBpZiAobWF4WSAtIHdpbmRvdy5wYWdlWU9mZnNldCA+IG1heFNjcm9sbERpc3BsYWNlbWVudCkge1xuICAgICAgICAgICAgICAgIG1heFkgPSB3aW5kb3cucGFnZVlPZmZzZXQgKyBtYXhTY3JvbGxEaXNwbGFjZW1lbnRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHRhcmdldFkgPSB3aW5kb3cucGFnZVlPZmZzZXQgLSAod2luZG93LmlubmVySGVpZ2h0IC0gZWxlbUJvdHRvbSlcblxuICAgICAgICAgICAgaWYgKHRhcmdldFkgPiBtYXhZKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0WSA9IG1heFlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHRhcmdldFkpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZVJhbmdlO1xuIiwiLy8gVGhhbmtzIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXR0eW9yay9mdXp6eVxuY2xhc3MgVHJpYnV0ZVNlYXJjaCB7XG4gICAgY29uc3RydWN0b3IodHJpYnV0ZSkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUgPSB0cmlidXRlXG4gICAgICAgIHRoaXMudHJpYnV0ZS5zZWFyY2ggPSB0aGlzXG4gICAgfVxuXG4gICAgc2ltcGxlRmlsdGVyKHBhdHRlcm4sIGFycmF5KSB7XG4gICAgICAgIHJldHVybiBhcnJheS5maWx0ZXIoc3RyaW5nID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRlc3QocGF0dGVybiwgc3RyaW5nKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRlc3QocGF0dGVybiwgc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoKHBhdHRlcm4sIHN0cmluZykgIT09IG51bGxcbiAgICB9XG5cbiAgICBtYXRjaChwYXR0ZXJuLCBzdHJpbmcsIG9wdHMpIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge31cbiAgICAgICAgbGV0IHBhdHRlcm5JZHggPSAwLFxuICAgICAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgICAgICBsZW4gPSBzdHJpbmcubGVuZ3RoLFxuICAgICAgICAgICAgdG90YWxTY29yZSA9IDAsXG4gICAgICAgICAgICBjdXJyU2NvcmUgPSAwLFxuICAgICAgICAgICAgcHJlID0gb3B0cy5wcmUgfHwgJycsXG4gICAgICAgICAgICBwb3N0ID0gb3B0cy5wb3N0IHx8ICcnLFxuICAgICAgICAgICAgY29tcGFyZVN0cmluZyA9IG9wdHMuY2FzZVNlbnNpdGl2ZSAmJiBzdHJpbmcgfHwgc3RyaW5nLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICBjaCwgY29tcGFyZUNoYXJcblxuICAgICAgICBwYXR0ZXJuID0gb3B0cy5jYXNlU2Vuc2l0aXZlICYmIHBhdHRlcm4gfHwgcGF0dGVybi50b0xvd2VyQ2FzZSgpXG5cbiAgICAgICAgbGV0IHBhdHRlcm5DYWNoZSA9IHRoaXMudHJhdmVyc2UoY29tcGFyZVN0cmluZywgcGF0dGVybiwgMCwgMCwgW10pXG4gICAgICAgIGlmICghcGF0dGVybkNhY2hlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlbmRlcmVkOiB0aGlzLnJlbmRlcihzdHJpbmcsIHBhdHRlcm5DYWNoZS5jYWNoZSwgcHJlLCBwb3N0KSxcbiAgICAgICAgICAgIHNjb3JlOiBwYXR0ZXJuQ2FjaGUuc2NvcmVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYXZlcnNlKHN0cmluZywgcGF0dGVybiwgc3RyaW5nSW5kZXgsIHBhdHRlcm5JbmRleCwgcGF0dGVybkNhY2hlKSB7XG4gICAgICAgIC8vIGlmIHRoZSBwYXR0ZXJuIHNlYXJjaCBhdCBlbmRcbiAgICAgICAgaWYgKHBhdHRlcm4ubGVuZ3RoID09PSBwYXR0ZXJuSW5kZXgpIHtcblxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHNjb3JlIGFuZCBjb3B5IHRoZSBjYWNoZSBjb250YWluaW5nIHRoZSBpbmRpY2VzIHdoZXJlIGl0J3MgZm91bmRcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc2NvcmU6IHRoaXMuY2FsY3VsYXRlU2NvcmUocGF0dGVybkNhY2hlKSxcbiAgICAgICAgICAgICAgICBjYWNoZTogcGF0dGVybkNhY2hlLnNsaWNlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHN0cmluZyBhdCBlbmQgb3IgcmVtYWluaW5nIHBhdHRlcm4gPiByZW1haW5pbmcgc3RyaW5nXG4gICAgICAgIGlmIChzdHJpbmcubGVuZ3RoID09PSBzdHJpbmdJbmRleCB8fCBwYXR0ZXJuLmxlbmd0aCAtIHBhdHRlcm5JbmRleCA+IHN0cmluZy5sZW5ndGggLSBzdHJpbmdJbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGMgPSBwYXR0ZXJuW3BhdHRlcm5JbmRleF1cbiAgICAgICAgbGV0IGluZGV4ID0gc3RyaW5nLmluZGV4T2YoYywgc3RyaW5nSW5kZXgpXG4gICAgICAgIGxldCBiZXN0LCB0ZW1wXG5cbiAgICAgICAgd2hpbGUgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHBhdHRlcm5DYWNoZS5wdXNoKGluZGV4KVxuICAgICAgICAgICAgdGVtcCA9IHRoaXMudHJhdmVyc2Uoc3RyaW5nLCBwYXR0ZXJuLCBpbmRleCArIDEsIHBhdHRlcm5JbmRleCArIDEsIHBhdHRlcm5DYWNoZSlcbiAgICAgICAgICAgIHBhdHRlcm5DYWNoZS5wb3AoKVxuXG4gICAgICAgICAgICAvLyBpZiBkb3duc3RyZWFtIHRyYXZlcnNhbCBmYWlsZWQsIHJldHVybiBiZXN0IGFuc3dlciBzbyBmYXJcbiAgICAgICAgICAgIGlmICghdGVtcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiZXN0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghYmVzdCB8fCBiZXN0LnNjb3JlIDwgdGVtcC5zY29yZSkge1xuICAgICAgICAgICAgICAgIGJlc3QgPSB0ZW1wXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGluZGV4ID0gc3RyaW5nLmluZGV4T2YoYywgaW5kZXggKyAxKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJlc3RcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVTY29yZShwYXR0ZXJuQ2FjaGUpIHtcbiAgICAgICAgbGV0IHNjb3JlID0gMFxuICAgICAgICBsZXQgdGVtcCA9IDFcblxuICAgICAgICBwYXR0ZXJuQ2FjaGUuZm9yRWFjaCgoaW5kZXgsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuQ2FjaGVbaSAtIDFdICsgMSA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcCArPSB0ZW1wICsgMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcCA9IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjb3JlICs9IHRlbXBcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gc2NvcmVcbiAgICB9XG5cbiAgICByZW5kZXIoc3RyaW5nLCBpbmRpY2VzLCBwcmUsIHBvc3QpIHtcbiAgICAgICAgdmFyIHJlbmRlcmVkID0gc3RyaW5nLnN1YnN0cmluZygwLCBpbmRpY2VzWzBdKVxuXG4gICAgICAgIGluZGljZXMuZm9yRWFjaCgoaW5kZXgsIGkpID0+IHtcbiAgICAgICAgICAgIHJlbmRlcmVkICs9IHByZSArIHN0cmluZ1tpbmRleF0gKyBwb3N0ICtcbiAgICAgICAgICAgICAgICBzdHJpbmcuc3Vic3RyaW5nKGluZGV4ICsgMSwgKGluZGljZXNbaSArIDFdKSA/IGluZGljZXNbaSArIDFdIDogc3RyaW5nLmxlbmd0aClcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gcmVuZGVyZWRcbiAgICB9XG5cbiAgICBmaWx0ZXIocGF0dGVybiwgYXJyLCBvcHRzKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9XG4gICAgICAgIHJldHVybiBhcnJcbiAgICAgICAgICAgIC5yZWR1Y2UoKHByZXYsIGVsZW1lbnQsIGlkeCwgYXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHN0ciA9IGVsZW1lbnRcblxuICAgICAgICAgICAgICAgIGlmIChvcHRzLmV4dHJhY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyID0gb3B0cy5leHRyYWN0KGVsZW1lbnQpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdHIpIHsgLy8gdGFrZSBjYXJlIG9mIHVuZGVmaW5lZHMgLyBudWxscyAvIGV0Yy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9ICcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVuZGVyZWQgPSB0aGlzLm1hdGNoKHBhdHRlcm4sIHN0ciwgb3B0cylcblxuICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZbcHJldi5sZW5ndGhdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nOiByZW5kZXJlZC5yZW5kZXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiByZW5kZXJlZC5zY29yZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpZHgsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbDogZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXZcbiAgICAgICAgICAgIH0sIFtdKVxuXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29tcGFyZSA9IGIuc2NvcmUgLSBhLnNjb3JlXG4gICAgICAgICAgICBpZiAoY29tcGFyZSkgcmV0dXJuIGNvbXBhcmVcbiAgICAgICAgICAgIHJldHVybiBhLmluZGV4IC0gYi5pbmRleFxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZVNlYXJjaDtcbiIsIi8qKlxuKiBUcmlidXRlLmpzXG4qIE5hdGl2ZSBFUzYgSmF2YVNjcmlwdCBAbWVudGlvbiBQbHVnaW5cbioqL1xuXG5pbXBvcnQgVHJpYnV0ZSBmcm9tIFwiLi9UcmlidXRlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGU7XG4iLCJpZiAoIUFycmF5LnByb3RvdHlwZS5maW5kKSB7XG4gICAgQXJyYXkucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbihwcmVkaWNhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FycmF5LnByb3RvdHlwZS5maW5kIGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZCcpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ByZWRpY2F0ZSBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICAgICAgICB9XG4gICAgICAgIHZhciBsaXN0ID0gT2JqZWN0KHRoaXMpXG4gICAgICAgIHZhciBsZW5ndGggPSBsaXN0Lmxlbmd0aCA+Pj4gMFxuICAgICAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXVxuICAgICAgICB2YXIgdmFsdWVcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGxpc3RbaV1cbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaSwgbGlzdCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxufVxuXG5pZiAod2luZG93ICYmIHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgIT09IFwiZnVuY3Rpb25cIikge1xuICBmdW5jdGlvbiBDdXN0b21FdmVudChldmVudCwgcGFyYW1zKSB7XG4gICAgcGFyYW1zID0gcGFyYW1zIHx8IHtcbiAgICAgIGJ1YmJsZXM6IGZhbHNlLFxuICAgICAgY2FuY2VsYWJsZTogZmFsc2UsXG4gICAgICBkZXRhaWw6IHVuZGVmaW5lZFxuICAgIH1cbiAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpXG4gICAgcmV0dXJuIGV2dFxuICB9XG5cbiBpZiAodHlwZW9mIHdpbmRvdy5FdmVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGVcbiB9XG5cbiAgd2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnRcbn0iXX0=
