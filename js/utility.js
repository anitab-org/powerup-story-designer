/* **********************
    Utility and development helper functions
********************** */
/**
 * Shortcut for console.log()
 */
const print = e => console.log(e)

/**
 * Copy an object without a reference to original object
 */
const copy = obj => JSON.parse(JSON.stringify(obj))

/**
 * Create a duplicate of an object with identical but new references
 */
const assign = obj => obj instanceof Array ? obj.slice() : Object.assign({}, obj)

/* **********************
    Animate.css jQuery extension - automatically remove 
    animation class and add callback for animation end
********************** */
$.fn.extend({
    animateCss: function (animationName, callback) {
        const animationEnd = (el => {
            const animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            }

            for (let t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }

        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
            if (typeof callback === 'function') callback();
        });

        return this;
    },
})