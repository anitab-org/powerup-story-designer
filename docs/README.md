
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

***

<!-- **************************** -->
<!-- **************************** -->
<!-- **************************** -->

## Getting Started

![](https://github.com/justKD/Powerup-Story-Designer/blob/master/docs/images/1-just-opened.png?raw=true)

### The Card Track

The large, bottom-left container is the `Card Track`.

Each `Card` represents a single automated `Step`, which is broken down into a `Left Event` and `Right Event`.

- ##### Basic Functions
    - Add a card by clicking the `+` icon in the top left.
    - Click on a card to focus it and enable the editor on the right.
    - While focused, press your `delete` key to delete a card.

<!-- **************************** -->
<!-- **************************** -->
<!-- **************************** -->


<!-- **************************** -->
<!-- **************************** -->
<!-- **************************** -->

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