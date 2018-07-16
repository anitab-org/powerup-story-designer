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

class Card {
    constructor(id, left, right) {
        this.left = (left instanceof CardSide) ? left : new CardSide()
        this.right = (right instanceof CardSide) ? right : new CardSide()
        this.id = (id) ? 'card-id+' + id : null
    }
}

class Option {
    constructor(value, text) {
        this.value = value
        this.text = text
    }
}

class State {
    constructor(cards, thumbnails) {
        this.cards = cards ? cards : []
        this.thumbnails = thumbnails ? thumbnails : []
    }
}

class History {
    constructor(states, index) {
        this.states = states ? states : []
        this.index = index ? index : -1
    }
}

class SavedState {
    constructor(cards, history, scenario, name) {
        this.cards = cards
        this.history = history
        this.scenario = scenario
        this.name = name
    }
}

class SavedStateItem {
    constructor(index, id, state) {
        this.index = index
        this.id = id
        this.state = state
    }
}

class SavedFile {
    constructor(cards, states, self) {
        this.cards = cards
        this.states = states
        this.self = self
    }
}

class ExportItem {
    constructor(scenario, cards) {
        this.scenario = scenario
        this.cards = cards
    }
}

class StorySequenceJSON {
    constructor(intros, outros) {
        this.intros = intros
        this.outros = outros
    }
}

class StorySequence {
    constructor(music, steps) {
        this.music = music
        this.steps = steps
    }
}

class StorySequenceStep {
    constructor(left, right) {
        this.left = left
        this.right = right
    }
}

class StorySequenceEvent {
    constructor(txt, img, pos, ani) {
        this.txt = txt
        this.img = img
        this.pos = pos
        this.ani = ani
    }
}