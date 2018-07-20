/* **********************
    Define Constants
********************** */

const constant = {

    imagesFilePath: 'images/characters/',

    imagePositionSuperClass: 'card-image-container',

    transparentImage: 'transparent.png',

    emptyFocusedCard: {
        index: null,
        id: null,
        card: null,
    },

    musicOptions: [
        new Option(null, 'no music'),
        new Option('home_intro_music_placeholder', 'home_intro_music_placeholder'),
        new Option('home_good_ending_example', 'home_good_ending_example'),
    ],

    imageOptions: [
        new Option(null, 'no change'),
        new Option('test_chibi^normal', 'Test Chibi - Normal'),
        new Option('test_chibi^happy', 'Test Chibi - Happy'),
        new Option('test_chibi^smiling', 'Test Chibi - Smiling'),
        new Option('test_chibi^talking', 'Test Chibi - Talking'),
        new Option('test_chibi^lecturing', 'Test Chibi - Happy'),
        new Option('test_chibi^sad', 'Test Chibi - Sad'),
        new Option('test_chibi^scared', 'Test Chibi - Scared'),
        new Option('test_chibi^upset', 'Test Chibi - Upset'),
        new Option('test_chibi^dazed', 'Test Chibi - Dazed'),
        new Option('test_chibi^whatever', 'Test Chibi - Whatever'),
        new Option('test_chibi^tired', 'Test Chibi - Tired'),

        new Option('test2_chibi^normal', '2 Test Chibi - Normal'),
        new Option('test2_chibi^happy', '2 Test Chibi - Happy'),
        new Option('test2_chibi^smiling', '2 Test Chibi - Smiling'),
        new Option('test2_chibi^talking', '2 Test Chibi - Talking'),
        new Option('test2_chibi^lecturing', '2 Test Chibi - Happy'),
        new Option('test2_chibi^sad', '2 Test Chibi - Sad'),
        new Option('test2_chibi^scared', '2 Test Chibi - Scared'),
        new Option('test2_chibi^upset', '2 Test Chibi - Upset'),
        new Option('test2_chibi^dazed', '2 Test Chibi - Dazed'),
        new Option('test2_chibi^whatever', '2 Test Chibi - Whatever'),
        new Option('test2_chibi^tired', '2 Test Chibi - Tired'),

        new Option('testChar3', '3 Another Test Char'),

        new Option('test_data_example', 'Data Example Image'),
    ],

    animationOptions: [
        new Option(null, 'none'),
        new Option('shake', 'shake'),
        new Option('tiltLeft', 'tilt left'),
        new Option('tiltRight', 'tilt right'),
        new Option('jiggle', 'jiggle'),
        new Option('flip', 'flip'),
    ],

    leftPositionOptions: [
        new Option(null, 'no change'),
        new Option('left hidden', 'hidden'),
        new Option('left near', 'near'),
        new Option('left mid', 'mid'),
        new Option('left far', 'far'),
    ],

    rightPositionOptions: [
        new Option(null, 'no change'),
        new Option('right hidden', 'hidden'),
        new Option('right near', 'near'),
        new Option('right mid', 'mid'),
        new Option('right far', 'far'),
    ],

    leftInputs: {
        txt: '#option-left-text',
        img: '#option-left-image-select',
        pos: '#option-left-position-select',
        ani: '#option-left-animation-select'
    },

    rightInputs: {
        txt: '#option-right-text',
        img: '#option-right-image-select',
        pos: '#option-right-position-select',
        ani: '#option-right-animation-select'
    },

    scenarioNames: [
        new Option(5, 'Home'),
        new Option(1, 'School'),
        new Option(7, 'Library'),
        new Option(6, 'Hospital'),
    ],

    scenarioTypes: [
        new Option(1, 'Intro'),
        new Option(-1, 'Outro'),
    ],

}

/* **********************
    Define Global Variables
********************** */

let self = {
    history: new History(),
    focusedCard: constant.emptyFocusedCard,
    editWarningVisible: false,
    scenario: {
        name: constant.scenarioNames[0],
        type: constant.scenarioTypes[0],
        music: constant.musicOptions[0],
    },
}

/* **********************
    Define App
********************** */

const app = {

    /**
     * Vue Components
     */
    components: {
        /**
         * Card container
         * - manages adding and deleting cards
         * - owns collection of cards
         * - methods here should be considered private
         * - see app.do for public methods
         */
        cardContainer: (
            new Vue({
                el: '#card-container-inner',
                data: {
                    cards: []
                },
                methods: {

                    /* Format and add a new card to the container */
                    addCard: function () {

                        /* Copy data for reference and create a new instance of Card */
                        const cards = this.cards.slice()
                        const prevCard = cards[cards.length - 1]
                        const newCard = new Card(app.do.get.uniqueID())

                        /* Copy previous card image and position */
                        newCard.left.image = prevCard.left.image
                        newCard.left.position = prevCard.left.position
                        newCard.right.image = prevCard.right.image
                        newCard.right.position = prevCard.right.position

                        /* Add new card to collection and update thumbnails */
                        this.cards.push(newCard)
                        app.do.thumbnail.updateTrack()
                    },

                    /* Delete a card by card.id or short version */
                    deleteCard: function (id) {
                        /* Allow either the card id or the dom element id to be passed */
                        const t = id.split('+')
                        const elementId = t.length > 1 ? t[1] : t

                        const cards = this.cards

                        cards.length <= 1 ?
                            app.do.show.notification('error', 'Unable to delete the last card.') :
                            Object.values(cards).map(card => {
                                /* Find the correct card and remove it from the array */
                                const cardId = card.id.split('+')[1]
                                const del = _ => {
                                    cards.splice(cards.indexOf(card), 1)
                                    app.do.thumbnail.updateTrack()
                                    print('Delete: ' + cardId)
                                }
                                cardId == elementId && del()
                            })

                    }

                }
            })
        ),

        /**
         * Thumbnail container - owns collection of thumbnails
         */
        thumbnailContainer: (
            new Vue({
                el: '#thumbnail-container-inner',
                data: {
                    thumbnails: []
                },
            })
        ),

        popupContentState: (
            new Vue({
                el: '#popup-content-states',
                data: {
                    savedStates: {
                        left: [
                            new SavedStateItem(1, 'saved-state+1', new SavedState()),
                            new SavedStateItem(2, 'saved-state+2', new SavedState()),
                            new SavedStateItem(3, 'saved-state+3', new SavedState()),
                            new SavedStateItem(4, 'saved-state+4', new SavedState()),
                            new SavedStateItem(5, 'saved-state+5', new SavedState()),
                            new SavedStateItem(6, 'saved-state+6', new SavedState()),
                            new SavedStateItem(7, 'saved-state+7', new SavedState()),
                            new SavedStateItem(8, 'saved-state+8', new SavedState()),
                            new SavedStateItem(9, 'saved-state+9', new SavedState()),
                            new SavedStateItem(10, 'saved-state+10', new SavedState()),
                            new SavedStateItem(11, 'saved-state+11', new SavedState()),
                            new SavedStateItem(12, 'saved-state+12', new SavedState()),
                        ],
                        right: [
                            new SavedStateItem(13, 'saved-state+13', new SavedState()),
                            new SavedStateItem(14, 'saved-state+14', new SavedState()),
                            new SavedStateItem(15, 'saved-state+15', new SavedState()),
                            new SavedStateItem(16, 'saved-state+16', new SavedState()),
                            new SavedStateItem(17, 'saved-state+17', new SavedState()),
                            new SavedStateItem(18, 'saved-state+18', new SavedState()),
                            new SavedStateItem(19, 'saved-state+19', new SavedState()),
                            new SavedStateItem(20, 'saved-state+20', new SavedState()),
                            new SavedStateItem(21, 'saved-state+21', new SavedState()),
                            new SavedStateItem(22, 'saved-state+22', new SavedState()),
                            new SavedStateItem(23, 'saved-state+23', new SavedState()),
                            new SavedStateItem(24, 'saved-state+24', new SavedState()),
                        ],
                    },
                    focused: null,
                    lastSaved: null,
                },
                methods: {
                    updateArrayOfExportOptions: function () {
                        const arr = [new Option('none', 'none')]
                        Object.values(this.savedStates).map(side => {
                            side.map(item => {
                                item.state.name && arr.push(new Option(item.index, item.index + ' - ' + item.state.name))
                            })
                        })
                        app.components.popupContentExport.options = arr
                    },

                    setInputValues: function () {
                        Object.values(this.savedStates).map(side => {
                            side.map(item => {
                                $('input[name="' + item.id + '"]').val(item.state.name)
                            })
                        })
                    },

                    getSideCount: function () {
                        return this.savedStates.left.length
                    },

                    getStateIndex: function () {
                        const target = this.focused.target.id
                        const index = target.split('+')[1] - 1

                        return index
                    },

                    leftOrRight: function () {
                        const states = this.savedStates
                        const index = this.getStateIndex()

                        const left = states.left[index]
                        const right = states.right[index - this.getSideCount()]

                        return {
                            index: index,
                            left: left,
                            right: right
                        }
                    },

                    getStateName: function () {
                        const sides = this.leftOrRight()
                        const state = sides.index < this.getSideCount() ? sides.left : sides.right

                        return state.state.name
                    },

                    focus: function (e) {
                        const isItem = e.target.className == 'saved-state-slot-item'

                        const checkForButton = _ => {
                            const isRenameButton = e.target.id == 'rename-state-button'
                            const isSaveButton = e.target.id == 'save-state-button'
                            const isDeleteButton = e.target.id == 'delete-state-button'
                            const isLoadButton = e.target.id == 'load-state-button'

                            return isRenameButton || isSaveButton || isLoadButton || isDeleteButton
                        }

                        checkForButton() || this.removeFocus()

                        const focus = e => {
                            this.focused = e
                            $(e.target).parent().addClass('saved-state-slot-focus')

                            const setButtons = _ => {
                                $('#rename-state-button').removeClass('popup-content-button-faded')
                                $('#delete-state-button').removeClass('popup-content-button-faded')
                                $('#load-state-button').removeClass('popup-content-button-faded')
                            }

                            this.getStateName() && setButtons()
                            $('#save-state-button').removeClass('popup-content-button-faded')
                        }

                        isItem && focus(e)
                    },

                    removeFocus: function () {
                        this.focused = null
                        $('.saved-state-slot').removeClass('saved-state-slot-focus')

                        $('#rename-state-button').addClass('popup-content-button-faded')
                        $('#delete-state-button').addClass('popup-content-button-faded')
                        $('#load-state-button').addClass('popup-content-button-faded')
                        $('#save-state-button').addClass('popup-content-button-faded')
                    },

                    handleSave: function (e) {
                        const doSave = e => {
                            $(e.target).animateCss('pulse')
                            this.focused && this.save()
                        }

                        const showError = e => {
                            $(e.target).animateCss('shake')
                            app.do.show.notification('error', 'Please select an existing save.')
                        }

                        this.focused ? doSave(e) : showError(e)
                    },

                    handleLoad: function (e) {
                        const handleLoad = e => {
                            $(e.target).animateCss('pulse')
                            this.focused && this.load()
                        }

                        const showError = e => {
                            $(e.target).animateCss('shake')
                            app.do.show.notification('error', 'Please select an existing save.')
                        }

                        this.focused && this.getStateName() ? handleLoad(e) : showError(e)
                    },

                    checkRename: function (e) {
                        $(e.target).animateCss('pulse')

                        const showError = e => {
                            $(e.target).animateCss('shake')
                            app.do.show.notification('error', 'Please select an existing save.')
                        }

                        this.focused && this.getStateName() ? this.handleRename(e) : showError(e)
                    },

                    handleRename: function (e) {
                        print('rename')
                        const doRename = e => {
                            $('input[name="' + this.focused.target.id + '"]').focus().addClass('saved-state-slot-rename')

                            $('#delete-state-button').addClass('popup-content-button-faded')
                            $('#load-state-button').addClass('popup-content-button-faded')
                            $('#save-state-button').addClass('popup-content-button-faded')
                            $('#rename-state-button').removeClass('popup-content-button-faded')
                        }

                        this.focused && doRename(e)
                    },

                    changeName: function (input) {
                        print('change')

                        const setName = _ => {
                            const set = side => {
                                side.state.name = $(input).val()
                            }

                            const sides = this.leftOrRight()
                            sides.index < this.getSideCount() ? set(sides.left) : set(sides.right)

                            $(input).attr("placeholder", $(input).val());

                            this.updateArrayOfExportOptions()
                        }

                        const setUntitled = _ => {
                            $(input).val('untitled')
                            setName()
                        }

                        /* Check for null or empty string - set state.name */
                        const val = $(input).val()
                        val && val.trim().length ? setName() : setUntitled()
                    },

                    handleDelete: function (e) {

                        const doDelete = e => {
                            $(e.target).animateCss('pulse')

                            const check = confirm('Are you sure you want to delete?')

                            check && this.focused && this.delete()
                        }

                        const showError = e => {
                            $(e.target).animateCss('shake')
                            app.do.show.notification('error', 'Please select an existing save.')
                        }

                        this.focused && this.getStateName() ? doDelete(e) : showError(e)
                    },

                    animateComplete: function (target) {
                        $(target).addClass('saved-state-slot-rename')
                        setTimeout(() => {
                            $(target).removeClass('saved-state-slot-rename')
                            this.removeFocus()
                        }, 200);
                    },

                    delete: function () {

                        const sides = this.leftOrRight()
                        const side = this.getStateIndex() < this.getSideCount() ? sides.left : sides.right
                        side.state = new SavedState()

                        const input = 'input[name="' + this.focused.target.id + '"]'
                        $(input).val('')
                        $(input).attr("placeholder", 'empty');

                        this.animateComplete(this.focused.target)

                        this.updateArrayOfExportOptions()
                    },

                    save: function () {

                        const sides = this.leftOrRight()
                        const state = sides.index < this.getSideCount() ? sides.left.state : sides.right.state
                        const isEmpty = typeof state.name == 'undefined' || !state.name.length ? true : false

                        const save = _ => {
                            state.cards = copy(app.do.get.cards())
                            state.history = copy(self.history)
                            state.scenario = copy(self.scenario)

                            this.lastSaved = state
                            this.updateArrayOfExportOptions()
                        }

                        const saveAndComplete = _ => {
                            setTimeout(_ => {
                                const val = $(this.focused.target).children(':first').val()
                                print(val)
                                //print(this.focused.target)
                                print(this.lastSaved.name)

                                const conf = val == this.lastSaved.name ? true : confirm('Are you sure you want to save over this file?')

                                const finishSave = _ => {
                                    save()
                                    this.animateComplete(this.focused.target)
                                }

                                conf ? finishSave() : this.removeFocus()
                            }, 200)
                        }

                        const saveToEmpty = _ => {
                            save()

                            const doRename = _ => {
                                $('input[name="' + this.focused.target.id + '"]').focus().addClass('saved-state-slot-rename')
                            }

                            this.focused && doRename()
                        }

                        isEmpty ? saveToEmpty() : saveAndComplete()
                    },

                    saveLast: function () {

                        const save = _ => {
                            this.lastSaved.cards = copy(app.do.get.cards())
                            this.lastSaved.history = copy(self.history)
                            this.lastSaved.scenario = copy(self.scenario)

                            $('#menu-states').animateCss('rubberBand')
                        }

                        const showError = _ => {
                            app.do.show.notification('error', 'Please save a state first.')
                        }

                        this.lastSaved ? save() : showError()
                    },

                    load: function () {

                        const sides = this.leftOrRight()
                        const side = this.getStateIndex() < this.getSideCount() ? sides.left : sides.right
                        const state = side.state

                        print(side)

                        app.components.cardContainer.cards = copy(state.cards)
                        self.history = copy(state.history)
                        self.scenario = copy(state.scenario)

                        app.do.inputs.updateScenario()
                        app.do.thumbnail.updateTrack()

                        this.removeFocus()
                        app.do.popup.savedStates.hide()

                        print('loaded')

                    },

                }
            })
        ),

        popupContentExport: (
            new Vue({
                el: '#import-export-popup',
                data: {
                    options: [new Option('none', 'none')],
                    exportSelects: {},
                },
                methods: {
                    handleDownload: function (e) {
                        $(e.target).animateCss('pulse')

                        app.do.persistence.promptDownload()
                    },

                    handleUpload: function (e) {
                        $(e.target).animateCss('pulse')

                        app.do.persistence.promptUpload()
                    },

                    handleExport: function (e) {
                        $(e.target).animateCss('pulse')

                        const savedStates = app.do.get.savedStates()
                        const exportItems = []

                        Object.values(this.exportSelects).map(scenario => {
                            Object.values(scenario).map(type => {
                                const handleInputType = _ => {
                                    let index = parseInt(type.val())
                                    index = index ? index : null

                                    const getState = _ => {
                                        const count = app.components.popupContentState.getSideCount()
                                        const side = index < count ? savedStates.left : savedStates.right
                                        const i = index < count ? index - 1 : index - count - 1

                                        const state = side[i].state
                                        print(state)
                                        const exportItem = new ExportItem(
                                            state.scenario,
                                            state.cards,
                                        )

                                        exportItems.push(exportItem)
                                    }

                                    index && getState()
                                }

                                typeof type != 'string' && handleInputType()

                            })
                        })

                        const showError = _ => {
                            app.do.show.notification('error', 'Select appropriate saved states in the drop down options. ')
                        }

                        print(exportItems)
                        exportItems.length ? this.parseExportItems(exportItems) : showError()
                    },

                    parseExportItems: function (items) {
                        print('do parse')

                        const intros = {}
                        const outros = {}

                        const handleNullEvent = event => {
                            return !event.txt && !event.img && !event.pos && !event.ani ? null : event
                        }

                        const handlePositionString = string => {
                            return string ? string.split(' ')[1] : null
                        }

                        items.map(item => {

                            const sequence = new StorySequence(item.scenario.music.value, {})

                            item.cards.map((card, index) => {
                                const left = new StorySequenceEvent(
                                    card.left.value.text,
                                    card.left.value.image,
                                    handlePositionString(card.left.value.position),
                                    card.left.value.animation,
                                )

                                const right = new StorySequenceEvent(
                                    card.right.value.text,
                                    card.right.value.image,
                                    handlePositionString(card.right.value.position),
                                    card.right.value.animation,
                                )

                                const step = new StorySequenceStep(
                                    handleNullEvent(left),
                                    handleNullEvent(right),
                                )

                                sequence.steps[index] = step
                            })

                            const setIntro = yes => {
                                const type = yes ? intros : outros
                                type[item.scenario.name.value] = sequence
                            }

                            item.scenario.type.value > 0 ? setIntro(true) : setIntro(false)
                        })

                        const json = new StorySequenceJSON(intros, outros)

                        print(json)
                        this.downloadStorySequenceJSON(json)

                    },

                    downloadStorySequenceJSON: json => {
                        const data = JSON.stringify(json)

                        const a = document.createElement("a")
                        const file = new Blob([data])
                        a.href = URL.createObjectURL(file)
                        a.download = 'StorySequences.json'
                        a.click()

                        //app.do.persistence.hideExportPopup()
                    },

                    referenceExportInputs: function (e) {
                        const containers = [
                            '#home-scenario-group',
                            '#school-scenario-group',
                            '#library-scenario-group',
                            '#hospital-scenario-group',
                        ]

                        containers.map((container, index) => {
                            const t = $(container).children().eq(1).children()
                            const intro = t.eq(0).children().eq(1).children().eq(0)
                            const outro = t.eq(1).children().eq(1).children().eq(0)

                            const scenario = container.split('#')[1].split('-')[0]

                            const define = _ => {
                                Object.defineProperty(this.exportSelects, scenario, {
                                    value: {
                                        name: scenario,
                                        intro: intro,
                                        outro: outro,
                                    },
                                    enumerable: true,
                                })
                            }

                            const set = _ => {
                                this.exportSelects[scenario].intro = intro
                                this.exportSelects[scenario].outro = outro
                            }

                            typeof this.exportSelects[scenario] == 'undefined' ? define() : set()
                        })

                    },
                },
            })
        ),

        menuSelects: (
            new Vue({
                el: '#menu-selects',
                data: {
                    options: {
                        scenarios: constant.scenarioNames,
                        types: constant.scenarioTypes,
                        music: constant.musicOptions,
                    }
                }
            })
        ),

        /* Load options into select fields */
        leftImageSelect: (
            new Vue({
                el: '#option-left-image-select',
                data: {
                    options: constant.imageOptions
                }
            })
        ),

        leftPosSelect: (
            new Vue({
                el: '#option-left-position-select',
                data: {
                    options: constant.leftPositionOptions
                }
            })
        ),

        leftAnimationSelect: (
            new Vue({
                el: '#option-left-animation-select',
                data: {
                    options: constant.animationOptions
                }
            })
        ),

        rightImageSelect: (
            new Vue({
                el: '#option-right-image-select',
                data: {
                    options: constant.imageOptions
                }
            })
        ),

        rightPosSelect: (
            new Vue({
                el: '#option-right-position-select',
                data: {
                    options: constant.rightPositionOptions
                }
            })
        ),

        rightAnimationSelect: (
            new Vue({
                el: '#option-right-animation-select',
                data: {
                    options: constant.animationOptions
                }
            })
        ),

    },

    /**
     * Startup Sequence
     */
    start: _ => {
        /* Add first empty card */
        const firstCard = new Card(
            app.do.get.uniqueID(),
            new CardSide(null, null, 'left near', null),
            new CardSide(null, null, 'right near', null)
        )
        app.do.get.cards().push(firstCard)

        app.do.thumbnail.updateTrack()
        app.do.history.append()

        app.do.inputs.clear()
        app.listeners.start()

        app.components.popupContentExport.referenceExportInputs()

        $('.popup-container').hide();

        // setTimeout(() => {
        //     app.components.popupContentState.fillDefault()
        //     print(app.do.get.savedStates())
        // }, 1000);



        $(window).on("load", _ => {
            $('.app').show()

            /* For development only */
            $('.preloader-container').fadeOut(100)

            /* Handle preloader */
            // setTimeout(_ => {
            //     $('.preloader-container').animateCss('fadeOutDownBig', _ => {
            //         $('.preloader-container').hide()
            //     })
            // }, 1500)
        })

        /*
           Handle adding cross-browser custom scrollbar to necessary eleemnts.

           Be aware there did seem to be an issue with simple bar and safari,
           but it seems to be resolved now.

           Keep an eye out for more problems.
        */
        const scrollbarTargets = [
            '.options-container',
            '.card-container',
            '.thumbnail-section-inner'
        ]
        scrollbarTargets.map(element => new SimpleBar($(element)[0]))

        /* Freeze const constant and nested levels */
        Object.values(constant).map(val => {
            val instanceof Array && val.map(x => Object.freeze(x))
            Object.freeze(val)
        })
        Object.freeze(constant)

    },

    /**
     * Public Methods
     */
    do: {

        /**
         * DOM interactions
         */
        window: {

            scrollTo: (id, wait) => {
                setTimeout(() => {
                    document.getElementById(id).scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'center',
                    });
                }, wait)
            },

        },

        /**
         * Manage cards
         */
        card: {

            /* Add an empty card to the collection */
            add: _ => {
                app.components.cardContainer.addCard()
                app.do.history.append()

                const cards = app.do.get.cards()
                const card = cards[cards.length - 1]
                app.do.window.scrollTo(card.id, 50)

                /* Probably don't need to scroll thumbnails when a card is added.
                   Thumbnails do scroll when a card is focused. */
                // const thumbnail = app.do.thumbnail.prepareForCard(card)
                // app.do.window.scrollTo(thumbnail.id, 50)
            },

            /* Delete the focused card from the collection */
            delete: id => {
                app.components.cardContainer.deleteCard(id)
                app.do.history.append()
            },

            /* Focus a card and store for reference */
            focus: id => {
                const cards = app.do.get.cards()
                const sentId = id.split('+')[1]

                cards.map(card => {
                    const cardId = card.id.split('+')[1]
                    cardId != sentId ? null : self.focusedCard = {
                        index: cards.indexOf(card),
                        id: card.id,
                        card: card,
                    }
                })
            },

            /**
             * When changing an image or position, any following cards with
             * the value for 'no change' should update along with the target card
             */
            updateRemaining: _ => {

                const cards = app.do.get.cards()
                const handleCards = _ => {

                    const updateCards = i => {
                        const card = cards[i]
                        const prevCard = cards[i - 1]

                        card.left.value.image ? null : card.left.image = prevCard.left.image
                        card.right.value.image ? null : card.right.image = prevCard.right.image
                        card.left.value.position ? null : card.left.position = prevCard.left.position
                        card.right.value.position ? null : card.right.position = prevCard.right.position
                    }

                    cards.map(card => {
                        const index = cards.indexOf(card)
                        index > 0 && updateCards(index)
                    })

                }

                cards.length > parseInt(self.focusedCard.index) + 1 && handleCards()

            },

        },

        /**
         * Manage history / time travel
         */
        history: {

            /* Add state to history stack */
            append: _ => {
                /* Overwrite left over elements if updating after undoing */
                const overwriteHistory = _ => self.history.states.length = self.history.index + 1
                self.history.index < self.history.states.length - 1 && overwriteHistory()

                /* Create a new state with new copies */
                const cards = copy(app.do.get.cards())
                const state = new State(cards)

                /* Store the independent state */
                self.history.states.push(state)
                self.history.index += 1
            },

            /* Recall a state in the history stack */
            recall: index => {
                const state = copy(self.history.states[index])
                app.components.cardContainer.cards = state.cards
                app.do.thumbnail.updateTrack()
                self.history.index = index
            },

            /* Recall the next state in the history stack */
            redo: _ => {
                const next = self.history.index + 1
                next < self.history.states.length ?
                    app.do.history.recall(next) :
                    app.do.show.notification('error', 'Nothing left to redo.')
            },

            /* Recall the previous state in the history stack */
            undo: _ => {
                const previous = self.history.index - 1
                previous >= 0 ?
                    app.do.history.recall(previous) :
                    app.do.show.notification('error', 'Nothing left to undo.')
            },

        },

        /**
         * Get component data, collections, and complex values
         */
        get: {
            cards: _ => {
                return app.components.cardContainer.cards
            },
            thumbnails: _ => {
                return app.components.thumbnailContainer.thumbnails
            },
            savedStates: _ => {
                return app.components.popupContentState.savedStates
            },
            savedStateTarget: _ => {
                return app.components.popupContentState.focused.target.id
            },
            savedStateTargetIndex: _ => {
                return app.do.get.savedStateTarget().split('+')[1] - 1
            },
            uniqueID: _ => {
                return '_' + Math.random().toString(36).substr(2, 9)
            },
        },

        /**
         * Manage notifications
         */
        show: {
            /* Show and manage a warning if the user tried to edit fields with no focus */
            editWarning: _ => {
                const showEditWarning = _ => {
                    self.editWarningVisible = true;
                    app.do.show.notification('error',
                        'Select a card to enable editing.',
                        _ => self.editWarningVisible = false)
                }
                self.editWarningVisible || showEditWarning()
            },

            /* Build and show a notification */
            notification: (type, message, onCloseCallback, position) => {

                position = position ? position : 'topRight'

                /*
                    types:
                    alert, success, warning, error, info/information
                */
                new Noty({
                    theme: 'nest',
                    type: type,
                    layout: position,
                    timeout: 2000,
                    progressBar: true,
                    text: message,
                    killer: true,
                    animation: {
                        open: 'animated bounceInRight',
                        close: 'animated bounceOutRight'
                    }
                }).on('afterClose', _ =>
                    onCloseCallback()
                ).show();
            }

        },

        /**
         * Manage thumbnails
         */
        thumbnail: {

            /* Create a separate DOM identifier for thumbnails, 
               while still using the same unique card id. */
            prepareForCard: card => {
                const thumbnail = assign(card)
                const id = 'thumbnail-id+' + thumbnail.id.split('+')[1]
                thumbnail.id = id
                return thumbnail
            },

            /* Update thumbnails to match cards */
            updateTrack: _ => {
                const thumbnails = []
                const cards = app.do.get.cards()
                cards.map(card => {
                    const thumbnail = app.do.thumbnail.prepareForCard(card)
                    thumbnails.push(thumbnail)
                })
                app.components.thumbnailContainer.thumbnails = thumbnails
            },

        },

        /**
         * Manage input fields
         */
        inputs: {

            clear: _ => {
                const clearInputs = side => Object.values(side).map(input => $(input).val(' '))

                clearInputs(constant.leftInputs)
                clearInputs(constant.rightInputs)
            },

            /* Update inputs with values for the focused card */
            update: _ => {
                const cards = app.do.get.cards()
                const thisCard = cards[self.focusedCard.index]

                const updateInputs = (input, side) => {
                    $(input.txt).val(side.value.text)
                    $(input.img).val(side.value.image)
                    $(input.pos).val(side.value.position)
                    $(input.ani).val(side.value.animation)
                }
                updateInputs(constant.leftInputs, thisCard.left)
                updateInputs(constant.rightInputs, thisCard.right)
            },

            updateScenario: _ => {
                $('#scenario-name-select').val(self.scenario.name.value)
                $('#scenario-type-select').val(self.scenario.type.value)
                $('#scenario-music-select').val(self.scenario.music.value)
            },

            updateArrayOfExportOptions: _ => {
                app.components.popupContentState.updateArrayOfExportOptions()
            },

        },

        popup: {
            savedStates: {
                show: _ => {
                    $('#saved-state-popup').show()
                    $('#saved-state-popup').animateCss('fadeIn')
                    $('#saved-state-popup-inner').animateCss('bounceInUp')
                },

                hide: _ => {
                    $('#saved-state-popup-inner').animateCss('bounceOutDown')
                    setTimeout(_ => {
                        $('#saved-state-popup').animateCss('fadeOut', _ => {
                            $('#saved-state-popup').hide()
                        })
                    }, 150)
                },

                setInputValues: _ => {
                    app.components.popupContentState.setInputValues()
                },
            },

            export: {
                show: _ => {
                    $('#import-export-popup').show()
                    $('#import-export-popup').animateCss('fadeIn')
                    $('#import-export-popup-inner').animateCss('bounceInUp')
                    $('#popup-content-export-options').animateCss('bounceInUp')
                },

                hide: _ => {
                    $('#import-export-popup-inner').animateCss('bounceOutDown')
                    $('#popup-content-export-options').animateCss('bounceOutDown')
                    setTimeout(_ => {
                        $('#import-export-popup').animateCss('fadeOut', _ => {
                            $('#import-export-popup').hide()
                        })
                    }, 150)
                },
            },

            help: {
                show: _ => {
                    $('#help-popup').show()
                    $('#help-popup').animateCss('fadeIn')
                    $('#help-popup-inner').animateCss('bounceInUp')
                },

                hide: _ => {
                    $('#help-popup-inner').animateCss('bounceOutDown')
                    setTimeout(_ => {
                        $('#help-popup').animateCss('fadeOut', _ => {
                            $('#help-popup').hide()
                        })
                    }, 150)
                },
            },
        },

        /**
         * Manage download/upload save files
         */
        persistence: {

            hideExportPopup: _ => {
                const exportPopupHidden = _ => {
                    return $('#import-export-popup').is(":hidden")
                }

                exportPopupHidden() ? null : app.do.popup.export.hide()
            },

            /* Prompt the user for download */
            promptDownload: _ => {
                app.do.show.notification('info', 'Save to your browser downloads folder.', null, 'topLeft')

                setTimeout(_ => {
                    const fileName = prompt('File name?')
                    fileName && app.do.persistence.download(fileName + '.json')
                    Noty.closeAll()
                }, 10);
            },

            /* Prompt the user for upload */
            promptUpload: _ => {
                app.do.show.notification('info', 'Choose a file to load.', null, 'topLeft')

                setTimeout(_ => app.do.persistence.upload(), 10)
            },
            /* Formate json for download */
            formatFile: _ => {
                return JSON.stringify(new SavedFile(
                    copy(app.do.get.cards()),
                    copy(app.do.get.savedStates()),
                    copy(self),
                ))
            },

            /* Handle the download */
            download: fileName => {
                const data = app.do.persistence.formatFile()

                const a = document.createElement("a")
                const file = new Blob([data])
                a.href = URL.createObjectURL(file)
                a.download = fileName
                a.click()

                app.do.persistence.hideExportPopup()

                print('Saved')
            },

            /* Handle uploading a file and restoring the state */
            upload: _ => {
                const input = document.createElement("input")

                const open = _ => {

                    const read = _ => {
                        const file = input.files[0]
                        const reader = new FileReader()
                        reader.onload = getFile
                        reader.readAsText(file)
                    }

                    const handleInput = input =>
                        !input ? alert("Couldn't find the file input element.") :
                        !input.files ? alert("This browser doesn't support uploading a file.") :
                        !input.files[0] ? alert("There was a problem finding your file. Please select a file to load.'") :
                        read()
                    handleInput(input)

                }

                const getFile = e => {
                    parseAndLoad(JSON.parse(e.target.result))
                }

                const parseAndLoad = data => {
                    self = data.self
                    app.components.cardContainer.cards = data.cards
                    app.components.popupContentState.savedStates = data.states

                    app.do.popup.savedStates.setInputValues()
                    app.do.inputs.updateScenario()
                    app.do.inputs.updateArrayOfExportOptions()
                    app.do.thumbnail.updateTrack()

                    Noty.closeAll()
                    app.do.persistence.hideExportPopup()

                    print('Loaded')
                }

                input.type = 'file'
                input.onchange = open
                input.click()

            },

        },

    },

    /**
     * DOM listeners
     */
    listeners: {

        /**
         * Start listeners
         */
        start: _ => {
            /**
             * Warn before accidentally leaving page
             */
            $(window).bind('beforeunload', _ => 'leave?')

            app.listeners.cards()
            app.listeners.menu()
            app.listeners.hotkeys()
            app.listeners.inputs()

        },

        /**
         * Input field listeners
         */
        inputs: _ => {

            /* Text area inputs update cards and thumbnails in real time,
               but show a warning if there is no focused card */
            const noFocus = input => {
                $(input).val(' ')
                app.do.show.editWarning()
            }
            const setText = (left, input) => {
                const side = left ? self.focusedCard.card.left : self.focusedCard.card.right
                side.text = $(input).val()
                side.value.text = $(input).val()
            }
            $(constant.leftInputs.txt).on('keyup paste change', function (e) {
                self.focusedCard.card ? setText(true, this) : noFocus(this)
            })
            $(constant.rightInputs.txt).on('keyup paste change', function (e) {
                self.focusedCard.card ? setText(false, this) : noFocus(this)
            })

            /* Text area inputs update the history stack when editing is finished */
            const addHistory = _ => self.focusedCard.card && app.do.history.append()
            $(constant.leftInputs.txt).on('change', function (e) {
                addHistory()
            })
            $(constant.rightInputs.txt).on('change', function (e) {
                addHistory()
            })

            /* Image inputs */
            const handleImageInput = (left, input) => {

                const handleChange = _ => {
                    const cards = app.do.get.cards()

                    const side = left ? self.focusedCard.card.left : self.focusedCard.card.right

                    /* If the value isn't null, change both the displayed image and value image */
                    const changeBoth = _ => {
                        side.image = constant.imagesFilePath + $(input).val() + '.png'
                        side.value.image = $(input).val()
                    }

                    /* Set the displayed image to the same as the previous cards image
                            and set the value to null for 'no change' */
                    const setNoChange = _ => {
                        const card = cards[self.focusedCard.index - 1]
                        const image = left ? card.left.image : card.right.image
                        const lastImage = image.split('/')[2]
                        side.image = constant.imagesFilePath + lastImage + '.png'
                        side.value.image = null
                    }

                    $(input).val() ? changeBoth() : setNoChange()

                    app.do.card.updateRemaining()
                    app.do.history.append()
                }

                const showWarning = _ => {
                    $(input).val(' ')
                    app.do.show.editWarning()
                }

                self.focusedCard.card ? handleChange() : showWarning()
            }

            $(constant.leftInputs.img).on('change', function (e) {
                handleImageInput(true, this)
            })

            $(constant.rightInputs.img).on('change', function (e) {
                handleImageInput(false, this)
            })

            /* Position Inputs */
            const handlePositionInput = (left, input) => {

                const handleChange = _ => {
                    const side = left ? self.focusedCard.card.left : self.focusedCard.card.right

                    side.position = constant.imagePositionSuperClass + ' ' + $(input).val()
                    side.value.position = $(input).val()

                    app.do.card.updateRemaining()
                    app.do.history.append()
                }

                const showWarning = _ => {
                    $(input).val(' ')
                    app.do.show.editWarning()
                }

                self.focusedCard.card ? handleChange() : showWarning()
            }

            $(constant.leftInputs.pos).on('change', function (e) {
                handlePositionInput(true, this)
            })

            $(constant.rightInputs.pos).on('change', function (e) {
                handlePositionInput(false, this)
            })

            /* Animation Inputs */
            const handleAnimationInput = (left, input) => {

                const handleChange = _ => {
                    const side = left ? self.focusedCard.card.left : self.focusedCard.card.right

                    side.animation = $(input).val()
                    side.value.animation = $(input).val()

                    app.do.card.updateRemaining()
                    app.do.history.append()
                }

                const showWarning = _ => {
                    $(input).val(' ')
                    app.do.show.editWarning()
                }

                self.focusedCard.card ? handleChange() : showWarning()
            }

            $(constant.leftInputs.ani).on('change', function (e) {
                handleAnimationInput(true, this)
            })

            $(constant.rightInputs.ani).on('change', function (e) {
                handleAnimationInput(false, this)
            })


            $('#scenario-name-select').on('change', function (e) {
                const index = $(this).prop('selectedIndex')
                self.scenario.name = constant.scenarioNames[index]
            })

            $('#scenario-type-select').on('change', function (e) {
                const index = $(this).prop('selectedIndex')
                self.scenario.type = constant.scenarioTypes[index]
            })

            $('#scenario-music-select').on('change', function (e) {
                const index = $(this).prop('selectedIndex')
                self.scenario.music = constant.musicOptions[index]
            })


            $('.saved-state-text-field').on('focusout', function (e) {
                const target = app.do.get.savedStateTarget()
                app.components.popupContentState.changeName(this)
                $('input[name="' + target + '"]').removeClass('saved-state-slot-rename')
                app.components.popupContentState.removeFocus()
            })

            $('.saved-state-text-field').on('keyup', function (e) {
                e.which == 13 && this.blur()
            })

            $('.saved-state-text-field').on('change', function (e) {
                //app.do.get.savedStateTarget() && app.components.popupContentState.changeName(this)
            })



            $('.popup-container-inner').on('click', function (e) {
                e.stopPropagation()
            })




            $('#help-close').on('click', function (e) {
                app.do.popup.help.hide()
                $(this).animateCss('rubberBand')
            })

            $('#saved-state-close').on('click', function (e) {
                app.do.popup.savedStates.hide()
                $(this).animateCss('rubberBand')
            })

            $('#import-export-close').on('click', function (e) {
                app.do.popup.export.hide()
                $(this).animateCss('rubberBand')
            })

            $('#help-popup').on('click', function (e) {
                app.do.popup.help.hide()
            })

            $('#saved-state-popup').on('click', function (e) {
                app.do.popup.savedStates.hide()
            })

            $('#import-export-popup').on('click', function (e) {
                app.do.popup.export.hide()
            })


        },

        /**
         * Card listeners
         */
        cards: _ => {
            /* De-focus when clicking on the card container but outside of a card */
            $('#card-container').on('click', function (e) {
                $('.card').removeClass('focus')
                self.focusedCard = constant.emptyFocusedCard
                app.do.inputs.clear()

                print('Focused: none')
            })

            /* Focus a card and store the index for global reference */
            $('#card-container').on('click', '.card', function (e) {
                e.stopPropagation();

                app.do.card.focus(this.id)

                const thumbnail = app.do.thumbnail.prepareForCard(self.focusedCard.card)
                app.do.window.scrollTo(this.id, 50)
                app.do.window.scrollTo(thumbnail.id, 250)

                $('.card').removeClass('focus')
                $(this).addClass('focus')

                app.do.inputs.update()
            })

            /* Focus a card when the thumbnail is clicked */
            $('.thumbnail-container').on('click', '.thumbnail', function (e) {
                e.stopPropagation();

                app.do.card.focus(this.id)

                app.do.window.scrollTo(this.id, 50)
                app.do.window.scrollTo(self.focusedCard.card.id, 250)

                $('.card').removeClass('focus')
                document.getElementById(self.focusedCard.card.id).classList.add('focus')

                app.do.inputs.update()
            })

            /* Click the add button to add a card */
            $('#thumbnail-add-button').on('click', function (e) {
                $(this).animateCss('rubberBand')
                app.do.card.add()
            })
        },

        menu: _ => {

            $('#menu-undo').on('click', function (e) {
                app.do.history.undo()
                $(this).animateCss('rubberBand')
            })

            $('#menu-redo').on('click', function (e) {
                app.do.history.redo()
                $(this).animateCss('rubberBand')
            })

            $('#menu-states').on('click', function (e) {
                app.do.popup.savedStates.show()
                $(this).animateCss('rubberBand')
            })

            $('#menu-export').on('click', function (e) {
                app.do.popup.export.show()
                $(this).animateCss('rubberBand')
            })

            $('#menu-help').on('click', function (e) {
                app.do.popup.help.show()
                $(this).animateCss('rubberBand')
            })

        },

        /**
         * Hotkey listeners
         */
        hotkeys: _ => {

            $(document).on('keydown', function (e) {

                //print(e.which)

                /* <DELETE> Delete the currently focused card */
                const cardFocused = _ => e.which == 8 && handleDelKey()
                const handleDelKey = _ => self.focusedCard.card && app.do.card.delete(self.focusedCard.id)
                e.target.className == 'card focus' && cardFocused()

                if (e.ctrlKey) {

                    /* <CTRL + N> Add a new card to the list */
                    e.which == 78 && app.do.card.add()

                    /* <CTRL + Z> Undo action */
                    e.which == 90 && app.do.history.undo()

                    /* <CTRL + Y> Redo action */
                    e.which == 89 && app.do.history.redo()

                    /* <CTRL + S> Save State action */
                    e.which == 83 && app.components.popupContentState.saveLast()

                    /* <CTRL + L> Load State action */
                    //e.which == 76 && app.do.state.load()

                    /* <CTRL + D> Prompt Download action */
                    e.which == 68 && app.do.persistence.promptDownload()

                    /* <CTRL + U> Prompt Upload action */
                    e.which == 85 && app.do.persistence.promptUpload()

                }

            })

        },

    },

}

/* **********************
    Run It
********************** */

app.start()