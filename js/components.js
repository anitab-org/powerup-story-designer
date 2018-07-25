/**
 * Templates for Vue
 */
const template = {
    cardItem: (
        Vue.component('card-item', {
            props: ['card'],
            template: (
                '<div tabindex="0" class="card" :id="card.id">' +
                    '<div class="card-inner">' +
                        '<div class="card-text-container">' +
                            '<div class="card-text-line">' +
                                '<div class="card-text">' +
                                    '{{ card.left.text }}' +
                                '</div>' +
                            '</div>' +
                            '<div class="card-text-line">' +
                                '<div class="card-text right">' +
                                    '{{ card.right.text }}' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="card-inner">' +
                        '<div :class="card.left.position">' +
                            '<img :src="card.left.image" class="card-image">' +
                        '</div>' +
                        '<div :class="card.right.position">' +
                            '<img :src="card.right.image" class="card-image">' +
                        '</div>' +
                    '</div>' +
                '</div>'
            ),
        })
    ),

    thumbnailItem: (
        Vue.component('thumbnail-item', {
            props: ['thumbnail'],
            template: (
                '<div tabindex="0" class="thumbnail" :id="thumbnail.id">' +
                    '<div class="card-inner">' +
                        '<div class="card-text-container thumbnail-text-container">' +
                            '<div class="card-text-line thumbnail-text-line">' +
                                '<div class="card-text thumbnail-text">' +
                                    '{{ thumbnail.left.text }}' +
                                 '</div>' +
                             '</div>' +
                            '<div class="card-text-line thumbnail-text-line">' +
                                '<div class="card-text thumbnail-text right">' +
                                    '{{ thumbnail.right.text }}' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="card-inner">' +
                        '<div :class="thumbnail.left.position">' +
                            '<img :src="thumbnail.left.image" class="card-image thumbnail-image">' +
                        '</div>' +
                        '<div :class="thumbnail.right.position">' +
                            '<img :src="thumbnail.right.image" class="card-image thumbnail-image">' +
                        '</div>' +
                    '</div>' +
                '</div>'
            ),
        })
    ),

    savedStateSlotItem: (
        Vue.component('saved-state-slot-item', {
            props: ['state'],
            template: (
                '<div class="saved-state-slot">' +
                    '<div class="saved-state-slot-number">' +
                        '{{ state.index }}' +
                    '</div>' +
                    '<div class="saved-state-slot-item" :id="state.id">' +
                        '<input type="text" class="saved-state-text-field" :name="state.id" placeholder="empty" data-name="" maxlength=""></input>' +
                    '</div>' +
                '</div>'
            ),
        })
    ),

    exportSelect: (
        Vue.component('export-select-container', {
            props: ['options'],
            template: (
                '<div class="export-select-group">' +

                    '<div class="export-select-container left">' +
                        '<div class="menu-select-image-container">' +
                            '<img class="menu-select-image" src="images/triangle-3px.png">' +
                        '</div>' +
                        '<div class="export-select-wrapper">' +
                            '<select class="export-select" id="scenario-intro-select" name="scenario-type-select" data-name="scenario-type-select">' +
                                '<option v-for="option in options" :value="option.value">' +
                                    '{{ option.text }}' +
                                '</option>' +
                            '</select>' +
                        '</div>' +
                    '</div>' +

                    '<div class="export-select-container">' +
                        '<div class="menu-select-image-container">' +
                            '<img class="menu-select-image" src="images/triangle-3px.png">' +
                        '</div>' +
                        '<div class="export-select-wrapper">' +
                            '<select class="export-select" id="scenario-outro-select" name="" data-name="">' +
                                '<option v-for="option in options" :value="option.value">' +
                                    '{{ option.text }}' +
                                '</option>' +
                            '</select>' +
                        '</div>' +
                    '</div>' +

                '</div>'
            ),
        })
    ),

    menuSelects: (
        Vue.component('menu-select-container', {
            props: ['options'],
            template: (
                '<div class="menu-container-inner-inner">' +

                    '<div class="menu-item group-left">' +
                        '<div class="menu-select-container">' +
                            '<div class="menu-select-image-container">' +
                                '<img class="menu-select-image" src="images/triangle-3px.png">' +
                            '</div>' +
                            '<select class="menu-select" id="scenario-name-select" name="" data-name="">' +
                                '<option v-for="option in options.scenarios" v-bind:value="option.value">' +
                                    '{{ option.text }}' +
                                '</option>' +
                            '</select>' +
                        '</div>' +
                    '</div>' +
  
                    '<div class="menu-item group-left middle">' +
                        '<div class="menu-select-container">' +
                            '<div class="menu-select-image-container">' +
                                '<img class="menu-select-image" src="images/triangle-3px.png">' +
                            '</div>' +
                            '<select class="menu-select" id="scenario-type-select" name="" data-name="">' +
                                '<option v-for="option in options.types" v-bind:value="option.value">' +
                                    '{{ option.text }}' +
                                '</option>' +
                            '</select>' +
                        '</div>' +
                    '</div>' +
  
                    '<div class="menu-item">' +
                        '<div class="menu-select-container">' +
                            '<div class="menu-select-image-container">' +
                                '<img class="menu-select-image" src="images/triangle-3px.png">' +
                            '</div>' +
                            '<select class="menu-select" id="scenario-music-select" name="" data-name="">' +
                                '<option v-for="option in options.music" v-bind:value="option.value">' +
                                    '{{ option.text }}' +
                                '</option>' +
                            '</select>' +
                        '</div>' +
                    '</div>' +
  
              '</div>'
            ),
        })
    ),

}