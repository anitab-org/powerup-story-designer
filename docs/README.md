
PowerUp Story Designer is a web app for creating automated story sequences for PowerUp ([iOS](https://github.com/systers/powerup-iOS), [Android](https://github.com/systers/powerup-android)), a text-adventure style mobile game by [Systers Open Source](https://github.com/systers).

**Best experienced in Chrome.**
_Also works in Safari and Firefox. Possibly with quirks._

***

<a class="button" href="https://rawgit.com/systers/powerup-story-designer/master/index.html">
  <span class="away">Powerup Story Designer</span>
  <span class="over">Live App</span>
</a>

<!-- **************************** -->
<!-- **************************** -->
<!-- **************************** -->

***

#### Contents
- [Getting Started](#getting-started)
    - [The Card Track](#the-card-track)
        - [Basic Functions](#basic-functions)
            - Add
            - Focus
            - Delete
            - Scroll
    - [The Editor](#the-editor)
        - Text
        - Image
        - Position
        - Animation 
    - [The Thumbnail Track](#the-thumbnail-track)
    - [The Menu](#the-menu)
        - [Drop Downs](#drop-downs)
            - Scenario Selection
            - Type Selection
            - Music Selection
        - [Icons](#icons)
            - Undo
            - Redo
            - Open Saved States
            - Open Import/Export
            - Open Help
    - [Saved States](#saved-states)
    - [Import/Export](#importexport)


***

<!-- **************************** -->
<!-- **************************** -->
<!-- **************************** -->

## Getting Started

![](https://github.com/systers/powerup-story-designer/blob/master/docs/images/1-just-opened.png?raw=true)

PowerUp Story Designer represents frames in a sequence as `Cards`.

Each `Card` represents a single automated `Step`, which is broken down into a `Left Event` and `Right Event`.

An `Event` describes:
  - The text on that side.
  - The image on that side.
  - The image position relative to the side.
  - An animation to be applied to the image.

A new `Step (Card)` is presented every time a user taps to advance the story, but not every `Step` has to have both a `Left Event` and `Right Event`. It's ok to leave one empty, meaning that particular `Step` will only change one side.

> If a `Step` does have both a `Left Event` and `Right Event`, it will play both events at the same time, but technically the `StorySequencePlayer` reads the `Left Event` first. _This means the `Left Text` will always be on top when both `Events` are in a single `Step`._

<!-- ![](https://github.com/justKD/Powerup-Story-Designer/blob/master/docs/images/2-ingame-example.gif?raw=true) -->

<p align="center">
  <img src="https://github.com/systers/powerup-story-designer/blob/master/docs/images/2-ingame-example.gif?raw=true"/>
</p>

***

<!-- **************************** -->
<!-- **************************** -->
<!-- **************************** -->

### The Card Track

The large, bottom-left container is the `Card Track`. It can hold any number of cards, and represents sequence frames in order.

![](https://github.com/systers/powerup-story-designer/blob/master/docs/images/3-card-track.png?raw=true)

- ##### Basic Functions
    - Add a card by clicking the `+` icon in the top left.
    >
    - Click on a card to focus it and enable the editor on the right.
    >
    - While focused, press your `delete` key to delete a card.
    >
    - Click in the empty area to unfocus.
    >
    - While hovering over the `Card Track`, use your touchpad or mousewheel to scroll (if there are multiple cards) or ...
    >
    - ... hover over the right side of the `Card Track` to reveal a draggable scroll bar.

***

<!-- **************************** -->
<!-- **************************** -->
<!-- **************************** -->

### The Editor

The editor is found in the bottom-right corner. 

![](https://github.com/systers/powerup-story-designer/blob/master/docs/images/4-card-editor.png?raw=true)

Changes to the `Editor Fields` will be realized in the `Card Track` in real time.

- `Text` - The text fields contain the text to be displayed on that side. In PowerUp, the text is animated onto the screen as an unbound text bubble. 
>
- `Image` - Selecting `no change` will use the same image as the preceding card. 
  - All new cards default to `no change`, so adding a new card will show the images from the preceding card, but the value for this field will still be `no change`.
  - Images for PowerUp Story Sequences are cataloged as a `Character` with multiple `Moods/Types`. File names for images follow the convention `"CharacterName^Type"`. The carat `^` is an expected separater for both `StorySequencePlayer` and `PowerUp Story Designer`.
    - Selecting a different `Mood/Type` for the same character will simply change the image to the selection.
    - Selecting a `Character` different from the preceding `Card` will result in the image being animated off screen, changing to the selected image, and then animating to the assigned position.
    - This is handled automatically by `StorySequencePlayer`.
>
- `Position` - The position options are relative to the side. `Near` is closer to the edge of the `Card`, and `Far` is closer to the middle. `Mid` is the middle of thos two options.
  - Choose `Hidden` to remove an image from a `Card`. There is no option in the `Image` selector to remove an image. This is to ensure that an image is animated off screen rather than `blinking out of existence`.
  - Note: we could add an animation option for `blinking out of existence` if there is ever a need.
>
- `Animation` - This field selects an animation that will be applied to the image after any animatable position changes.

> Changes to the `Animation` field currently do not give any visual feedback on the focused `Card`, but will be included and rendered when exported to and viewed in PowerUp.

***

<!-- **************************** -->
<!-- **************************** -->
<!-- **************************** -->

### The Thumbnail Track

![](https://github.com/systers/powerup-story-designer/blob/master/docs/images/5-thumbnail-track.png?raw=true)

The `Thumbnail Track` copies the contents of the `Card Track`. It also updates in real time, and serves as a convenience feature for navigating/finding `Cards`.

Clicking on a `Thumbnail` will scroll to and focus that `Card` in the `Card Track`.

Similar to the `Card Track`, if there are enough `Thumbnails` to overflow the container, you can use your touch pad to scroll the view horizontally, or hover over the bottom of the `Thumbnail Track` to reveal a draggable scroll bar.

***

<!-- **************************** -->
<!-- **************************** -->
<!-- **************************** -->

### The Menu

<p align="center">
  <img src="https://github.com/systers/powerup-story-designer/blob/master/docs/images/6-the-menu.png?raw=true" width=500/>
</p>

#### Drop Downs
- Scenario Selection
  - This drop down lists available scenarios. 
    - _When adding scenarios to PowerUp, this web app will need to be updated to include matching options with the correct `ScenarioID`._
  - This selection is _mandatory_ and will be used to identify where this `Story Sequence` appears in PowerUp.
>
- Type Selection
  - This drop down lists available type options per scenario.
  - Currently, `Intro` and `Outro` are the only two options, and determine if the current `Story Sequence` appears before the first question, or after the scenario is completed (but before any mini-games).
  - This selection is _mandatory_ and will be used to identify where this `Story Sequence` appears in a scenario.
>
- Music Selection
  - This drop down lists all available music options. 
    - _When adding `StorySequencePlayer` music resources to PowerUp, this web app will need to be updated to include matching options with exact file names._
  - This selection is _optional_. Leave it on `no music` if desired.
>
> When exporting, make sure each option is selected correctly. There should be only one of each Scenario/Type combination.
>
#### Icons
- Undo
  - Undo the last stored change.
- Redo
  - Redo the last undone action.
- Open Saved States
  - Opens the [Saved States](#saved-states) GUI.
- Open Import/Export
  - Opens the [Import/Export](#importexport) GUI for downloading/restoring work sessions and exporting a collection of `Sequences` as a dataset usable in PowerUp.
- Open Help
  - Opens the help pop up.

***

<!-- **************************** -->
<!-- **************************** -->
<!-- **************************** -->

## Saved States

![](https://github.com/systers/powerup-story-designer/blob/master/docs/images/7-saved-states-gui.png?raw=true)

***

<!-- **************************** -->
<!-- **************************** -->
<!-- **************************** -->

## Import/Export

![](https://github.com/systers/powerup-story-designer/blob/master/docs/images/8-import-export-gui.png?raw=true)









>
>
>
<style>
.button {
  box-sizing: border-box;
  height: 50px;
  width: 400px;
  display: table;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.55);
  transition: background .5s;
  cursor: pointer;
}

.button a {
    text-decoration: none;
}

.button span {
  width: 100%;
  height: 100%;
  padding: 20px;
  color: #2D3142;
  box-shadow: 0 0 0 3px #2D3142 inset;
  background: transparent;
}

.button .away {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.button .over {
  display: none;
}

.button:hover span.away {
  display: none;
}

.button:hover span.over {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: white;
  box-shadow: none;
}

.button:hover {
  background: #2D3142;
}
</style>