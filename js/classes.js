/**
 * Left or right side of a card has independent data
 */
class CardSide {
    constructor(text, image, position, animation) {
        this.text = text ? text : null
        this.image = image ? 'images/' + image : 'images/transparent.png'
        this.position = position ? 'card-image-container ' + position : 'card-image-container'
        this.animation = animation ? animation : null

        this.value = {
            text: text ? text : null,
            image: image ? image : null,
            position: position ? position : null,
            animation: animation ? animation : null,
        }
    }
}

/**
 * Data for each scene in the sequence, represented as a card in this app
 */
class Card {
    constructor(id, left, right) {
        this.left = (left instanceof CardSide) ? left : new CardSide()
        this.right = (right instanceof CardSide) ? right : new CardSide()
        this.id = (id) ? 'card-id+' + id : null
    }
}

/**
 * Data for export and for inputs - value vs human-readable text
 */
class Option {
    constructor(value, text) {
        this.value = value
        this.text = text
    }
}

/**
 * An app state bundled for travel
 */
class State {
    constructor(cards, thumbnails) {
        this.cards = cards ? cards : []
        this.thumbnails = thumbnails ? thumbnails : []
    }
}

/**
 * App history consisting of work session states and th current index
 */
class History {
    constructor(states, index) {
        this.states = states ? states : []
        this.index = index ? index : -1
    }
}

/**
 * All aspects of the current app state necessary for export/import/travel
 */
class SavedState {
    constructor(cards, history, scenario, name) {
        this.cards = cards
        this.history = history
        this.scenario = scenario
        this.name = name
    }
}

/**
 * A SavedState bundled with a unique id and index for use with the saved state slots and exporting
 */
class SavedStateItem {
    constructor(index, id, state) {
        this.index = index
        this.id = id
        this.state = state
    }
}

/**
 * All aspects of the current work session (state, history, saved states, etc.) bundled for travel
 */
class SavedFile {
    constructor(cards, states, self) {
        this.cards = cards
        this.states = states
        this.self = self
    }
}

/**
 * Cards and appropriate scenario information for export to StorySequences.json
 */
class ExportItem {
    constructor(scenario, cards) {
        this.scenario = scenario
        this.cards = cards
    }
}

/**
 * StorySequences.json contains two objects, intros and outros
 */
class StorySequenceJSON {
    constructor(intros, outros) {
        this.intros = intros
        this.outros = outros
    }
}

/**
 * An intro/outro is a sequence of steps (cards) and music
 */
class StorySequence {
    constructor(music, steps) {
        this.music = music
        this.steps = steps
    }
}

/**
 * Each sequence contains steps, each with a left and right event
 */
class StorySequenceStep {
    constructor(lftEvent, rgtEvent) {
        this.lftEvent = lftEvent
        this.rgtEvent = rgtEvent
    }
}

/**
 * A left/right event defines the text, image, image position, and image animation to be used
 */
class StorySequenceEvent {
    constructor(txt, img, pos, ani) {
        this.txt = txt
        this.img = img
        this.pos = pos
        this.ani = ani
    }
}