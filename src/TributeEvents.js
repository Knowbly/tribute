class TributeEvents {
    constructor(tribute) {
        this.tribute = tribute
        this.tribute.events = this
    }

    static keys() {
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
        }]
    }
    
    static remove(elem) {
        if (elem && elem.remove) {
            elem.remove()
            return
        }
        if (elem && !elem.remove) {
            elem.parentNode.removeChild(elem)
        }
    }

    static isInsideMention(anchor) {
        return anchor && anchor.parentNode && anchor.parentNode.classList.contains("fr-tribute")
    }

    static removeMention(editor, event) {
        const charCode = (typeof event.which === "undefined") ? event.keyCode : event.which;
        const anchor = editor.selection.get().anchorNode
        if (TributeEvents.isInsideMention(anchor)) {
            const parent = anchor.parentNode
            const docFrag = document.createDocumentFragment()
            const div = document.createElement('div')
            div.innerHTML = ''
            if (charCode !== 13) {
                div.innerHTML = '@'
            }
            div.firstChild && docFrag.appendChild(div.firstChild)
            editor.selection.save()
            if (charCode === 13) {
                // breaks word
                if (parent.previousSibling && parent.previousSibling.previousSibling) {
                    const parent2 = parent.previousSibling.previousSibling
                    if (parent2.classList.contains("fr-tribute")) {
                        while (parent2.firstChild) {
                            const child = parent2.removeChild(parent2.firstChild)
                            docFrag.appendChild(child)
                        }
                        docFrag.appendChild(document.createElement('br'))
                        TributeEvents.remove(parent.previousSibling.previousSibling)
                        TributeEvents.remove(parent.previousSibling)
                    }
                }
            }
            while (parent.firstChild) {
                const child = parent.removeChild(parent.firstChild)
                docFrag.appendChild(child)
            }
            parent.parentNode.replaceChild(docFrag, parent)
            editor.selection.restore()
        }
    }

    bind(element, editor) {
        element.boundKeydown = this.keydown.bind(element, this, editor);
        element.boundKeypress = this.keypress.bind(element, this, editor);
        element.boundKeyup = this.keyup.bind(element, this, editor);
        element.boundInput = this.input.bind(element, this, editor);

        element.addEventListener('keydown',
            element.boundKeydown, false)
        element.addEventListener('keyup',
            element.boundKeyup, false)
        element.addEventListener('keypress',
            element.boundKeypress, false)
        element.addEventListener('input',
            element.boundInput, false)
    }

    unbind(element) {
        element.removeEventListener('keydown',
            element.boundKeydown, false)
        element.removeEventListener('keyup',
            element.boundKeyup, false)
        element.removeEventListener('keypress',
            element.boundKeypress, false)
        element.removeEventListener('input',
            element.boundInput, false)

        delete element.boundKeydown
        delete element.boundKeypress
        delete element.boundKeyup
        delete element.boundInput
    }

    scroll(instance, e) {
        instance.isActive = false
        instance.hideMenu()
    }

    keydown(instance, editor, event) {
        if (instance.shouldDeactivate(event)) {
            instance.tribute.isActive = false
            instance.tribute.hideMenu()
        }

        let element = this
        instance.commandEvent = false

        TributeEvents.keys().forEach(o => {
            if (o.key === event.keyCode) {
                instance.commandEvent = true
                instance.callbacks()[o.value.toLowerCase()](event, element, editor)
            }
        })

        // check if key is a printable character
        const charCode = (typeof event.which === "undefined") ? event.keyCode : event.which
        const char = String.fromCharCode(charCode)
        const allowedKeys = [13, 8]

        if (!allowedKeys.includes(charCode) && !/\w/.test(char)) {
            return
        }

        if ((!instance.commandEvent || allowedKeys.includes(charCode)) && editor) {
            TributeEvents.removeMention(editor, event)
        }
    }

    keypress(instance, editor, event) {
        if (editor) {
            TributeEvents.removeMention(editor, event)
        }
    }

    input(instance, event, editor) {
        instance.inputEvent = true
        instance.keyup.call(this, instance, event, editor)
    }

    click(instance, event) {
        let tribute = instance.tribute
        if (tribute.menu && tribute.menu.contains(event.target)) {
            event.preventDefault()
            event.stopPropagation()
            if (event.target.getAttribute("class") === "header" || event.target.tagName === "UL") {
                return
            }
            let li = event.target
            while (li.nodeName.toLowerCase() !== 'li') {
                li = li.parentNode
                if (!li || li === tribute.menu) {
                    throw new Error('cannot find the <li> container for the click')
                }
            }
            tribute.selectItemAtIndex(li.getAttribute('data-index'), event)
            tribute.hideMenu()

        // TODO: should fire with externalTrigger and target is outside of menu
        } else if (tribute.current.element && !tribute.current.externalTrigger) {
            tribute.current.externalTrigger = false
            setTimeout(() => tribute.hideMenu())
        }
    }

    keyup(instance, editor, event) {
        if (instance.inputEvent) {
            instance.inputEvent = false
        }
        instance.updateSelection(this)
        if (event.keyCode === 27) return

        if (editor && editor.charCounter && editor.charCounter.count() === 0) {
            instance.tribute.isActive = false
            instance.tribute.hideMenu()
            return
        }

        if (!instance.tribute.allowSpaces && instance.tribute.hasTrailingSpace) {
            instance.tribute.hasTrailingSpace = false;
            instance.commandEvent = true;
            instance.callbacks()["space"](event, this);
            return
        }

        if (!instance.tribute.isActive) {
            if (instance.tribute.autocompleteMode) {
                instance.callbacks().triggerChar(event, this, '')
            } else {
                let keyCode = instance.getKeyCode(instance, this, event)
    
                if (isNaN(keyCode) || !keyCode) return
    
                let trigger = instance.tribute.triggers().find(trigger => {
                    return trigger.charCodeAt(0) === keyCode
                })
    
                if (typeof trigger !== 'undefined') {
                    instance.callbacks().triggerChar(event, this, trigger)
                }
            }
        }

        if ((instance.tribute.current.trigger || instance.tribute.autocompleteMode)
            && instance.commandEvent === false
            || instance.tribute.isActive && event.keyCode === 8) {
          instance.tribute.showMenuFor(this, true)
        }
    }

    shouldDeactivate(event) {
        if (!this.tribute.isActive) return false

        if (this.tribute.current.mentionText.length === 0) {
            let eventKeyPressed = false
            TributeEvents.keys().forEach(o => {
                if (event.keyCode === o.key) eventKeyPressed = true
            })

            return !eventKeyPressed
        }

        return false
    }

    getKeyCode(instance, el, event) {
        let char
        let tribute = instance.tribute
        let info = tribute.range.getTriggerInfo(false, tribute.hasTrailingSpace, true, tribute.allowSpaces, tribute.autocompleteMode)

        if (info) {
            return info.mentionTriggerChar.charCodeAt(0)
        } else {
            return false
        }
    }

    updateSelection(el) {
        this.tribute.current.element = el
        let info = this.tribute.range.getTriggerInfo(false, this.tribute.hasTrailingSpace, true, this.tribute.allowSpaces, this.tribute.autocompleteMode)

        if (info) {
            this.tribute.current.selectedPath = info.mentionSelectedPath
            this.tribute.current.mentionText = info.mentionText
            this.tribute.current.selectedOffset = info.mentionSelectedOffset
        }
    }

    callbacks() {
        return {
            triggerChar: (e, el, trigger) => {
                let tribute = this.tribute
                tribute.current.trigger = trigger

                let collectionItem = tribute.collection.find(item => {
                    return item.trigger === trigger
                })

                tribute.current.collection = collectionItem
                if (tribute.inputEvent) tribute.showMenuFor(el, true)
            },
            enter: (e, el) => {
                // choose selection
                if (this.tribute.isActive && this.tribute.current.filteredItems) {
                    e.preventDefault()
                    e.stopPropagation()
                    setTimeout(() => {
                        this.tribute.selectItemAtIndex(this.tribute.menuSelected, e)
                        this.tribute.hideMenu()
                    }, 0)
                }
            },
            escape: (e, el) => {
                if (this.tribute.isActive) {
                    e.preventDefault()
                    e.stopPropagation()
                    this.tribute.isActive = false
                    this.tribute.hideMenu()
                }
            },
            tab: (e, el) => {
                // choose first match
                this.callbacks().enter(e, el)
            },
            space: (e, el, editor) => {
                if (this.tribute.isActive) {
                    if (this.tribute.spaceSelectsMatch) {
                        this.callbacks().enter(e, el)
                    } else if (!this.tribute.allowSpaces) {
                        e.stopPropagation()
                        setTimeout(() => {
                            this.tribute.hideMenu()
                            this.tribute.isActive = false
                        }, 0);
                    }
                } else {
                    const anchor = editor.selection.get().anchorNode
                    if (TributeEvents.isInsideMention(anchor)) {
                        e.preventDefault()
                        e.stopPropagation()
                        return false
                    }
                }
            },
            up: (e, el) => {
                // navigate up ul
                if (this.tribute.isActive && this.tribute.current.filteredItems) {
                    e.preventDefault()
                    e.stopPropagation()
                    let count = this.tribute.current.filteredItems.length,
                        selected = this.tribute.menuSelected

                    if (count > selected && selected > 0) {
                        this.tribute.menuSelected--
                        this.setActiveLi()
                    } else if (selected === 0) {
                      this.tribute.menuSelected = count - 1
                      this.setActiveLi()
                      this.tribute.menu.querySelector("ul").scrollTop = this.tribute.menu.querySelector("ul").offsetHeight
                    }
                }
            },
            down: (e, el) => {
                // navigate down ul
                if (this.tribute.isActive && this.tribute.current.filteredItems) {
                    e.preventDefault()
                    e.stopPropagation()
                    let count = this.tribute.current.filteredItems.length - 1,
                        selected = this.tribute.menuSelected

                    if (count > selected) {
                        this.tribute.menuSelected++
                        this.setActiveLi()
                    } else if (count === selected) {
                        this.tribute.menuSelected = 0
                        this.setActiveLi()
                        this.tribute.menu.querySelector("ul").scrollTop = 0
                    }
                }
            },
            delete: (e, el) => {
                if (this.tribute.isActive && this.tribute.current.mentionText.length < 1) {
                    this.tribute.hideMenu()
                } else if (this.tribute.isActive) {
                    this.tribute.showMenuFor(el)
                }
            }
        }
    }

    setActiveLi(index) {
        let lis = this.tribute.menu.querySelectorAll('li'),
            length = lis.length >>> 0

        if (index) this.tribute.menuSelected = parseInt(index)

        for (let i = 0; i < length; i++) {
            let li = lis[i]
            if (i === this.tribute.menuSelected) {
                li.classList.add(this.tribute.current.collection.selectClass)

                let liClientRect = li.getBoundingClientRect()
                let menuClientRect = this.tribute.menu.querySelector("ul").getBoundingClientRect()

                if (liClientRect.bottom > menuClientRect.bottom) {
                    let scrollDistance = liClientRect.bottom - menuClientRect.bottom
                    this.tribute.menu.querySelector("ul").scrollTop += scrollDistance
                } else if (liClientRect.top < menuClientRect.top) {
                    let scrollDistance = menuClientRect.top - liClientRect.top
                    this.tribute.menu.querySelector("ul").scrollTop -= scrollDistance
                }

            } else {
                li.classList.remove(this.tribute.current.collection.selectClass)
            }
        }
    }

    getFullHeight(elem, includeMargin) {
      let height = elem.getBoundingClientRect().height

      if (includeMargin) {
        let style = elem.currentStyle || window.getComputedStyle(elem)
        return height + parseFloat(style.marginTop) + parseFloat(style.marginBottom)
      }

      return height
    }
}

export default TributeEvents;
