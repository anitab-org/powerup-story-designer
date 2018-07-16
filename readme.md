https://rawgit.com/justKD/powerup-story-sequence-designer/master/index.html

# current state
***
- dependencies
    - [VueJS](https://vuejs.org/) - for data-reactive front-end
    - [less](http://lesscss.org/) - for cleaner css
    - [jQuery 3](https://api.jquery.com/) - for simplifying dom interactions during development - potentially unnecessary as more management is given to Vue

    - [Animate.css](https://daneden.github.io/animate.css/) - animations
    - [Noty](https://ned.im/noty/#/) - notifications
    - [SimpleBar](http://grsmto.github.io/simplebar/) - cross-browser customizable scroll bars
***
- best in chrome
- should work in firefox
- safari 
    - no smooth scroll
        - .scrollIntoView options are not implemented in the browser
    - simpleBar plugin was not working with one container in safari, but seems to be ok now
        - keep an eye out for issues
        - update: issue is not there when adding new cards, but the thumbnail container shifts up when a card is focused
            - does the issue occur anytime the update thumbnails function is called?
            - Simple bar is not rendering in the same place in that div as it does in firefox and chrome. The html/css may need to be re-worked, or simple bar may need to be left off of that section.
- the fading gradients in firefox and safari render differently compared to chrome
    - the gradient at the bottom of the card container is wrong in firefox and safari
    - it is correct in chrome
***
- hotkeys
    - `ctrl + n` - add a new card
    - `ctrl + z` - undo action
    - `ctrl + y` - redo action
    - `ctrl + s` - save over last saved state
    - `ctrl + d` - prompt download save file
    - `ctrl + u` - prompt upload saved file
    - `delete` - delete the currently focused card
***
- click a card or thumbnail to focus
    - editor will populate with that cards data
    - edit fields - card and thumbnail will update in real time
- click the add button to add new cards
- focus a card and hit your `<delete>` key to delete
    - you can't delete the last card (there must be one)
    - * (maybe need to add a clickable delete button)

- new cards default to the `'no change'` setting for image and position fields
    - this means a new card will visualize the image and position from the previous card, but its field value will be `null`
    - changing a prior card will auto-update any cards that would be affected due to a `no change` setting
***
- has undo/redo functionality
    - changes to text are committed to history only when the text field is de-focused even though the cards update in real-time as you type
- history functionality is currently unlimited
    - need to evaluate this but memory limitations are not expected due to general use expectations
    - maybe put a really high hard limit in any case
- overwrites any existing history if new actions are added after undoing
***
- has local save/load state functionality
    - click the save icon in the menu to open the ui
- * future plans: 
    - manage unlimited save state slots
    - cloud option
***
- has download/upload save file functionality in the `export` ui (select `export` in the menu)
    - click `download` to save a json to your browser download folder
    - click `upload` to upload a saved json to restore work session
        - restores entire state including
            - cards
            - history for undo/redo
            - saved states
***
- export ui
    - each scenario/type combo should already be created and saved as `saved states`
    - each sequeunce should already have the scenario, type, and music selected using the drop downs in the top right of each state
    - in the export ui, select an appropriate saved state for each drop down
    - click the `export` button to download StorySequences.json
        - this file can be dropped into the PowerUp project folder

- * export ui needs to remember options between sessions 
    - don't include in saved state (we want these options to be per work session, not per state)
    - should include in self and in the download/upload option?
***
- animation input field functionality is limited
    - it works as a normal field and the data is managed, but no visible change will be made on the cards
    - need a way to mark the animation information on the card for user feedback
    - it may not be reasonable to try and recreate the actual animations
    - maybe show animation name or index floating near the image?
***
***
bugs/issues
- saved state feedback for quick save 
    - no way of easily knowing what state you are saving too
- loading a saved state should set that as the target for quick save
- can't properly reset the first card in the stack to a blank default
- how to get `command` to work properly as a hotkey on mac
    - it doesn't work the same as using `control` or `alt`
    - clearly it can be done - see google docs etc.