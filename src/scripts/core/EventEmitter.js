/**
 * EventEmitter class for simple publish/subscribe and Observer pattern.
 */

class EventEmitter {
    /**
     * @desc constructor that initialize an object to store events,
     * and the listeners of the event.
     */
    constructor() {
        this.events = {};
    }


    /**
     * @desc subscribe a listener to an event.
     * @param {string} event - the name of the event.
     * @param {Function} listener - the callback function to execute when the event is emitted.
     */
    on(event, listener) {
        // Initialize an empty array for the event if it doesn't exist
        if (!this.events[event]) {
            this.events[event] = [];
        }

        // Add the listener to the array of listeners for the event
        this.events[event].push(listener);
    }

    /**
     * @desc Emit an event by calling all the listeners subscribed to corresponding event.
     * @param {string} event - the name of the event to emit.
     * @param {*} payload - payload to pass to the listeners.
     */
    emit(event, payload) {
        // if there exists a listener for the following event
        if (this.events[event]) {
            // call each listener with the payload
            this.events[event].forEach(listener => listener(payload));
        }
    }

    /**
     * @desc unsubscribes a listener from an event
     * @param {string} event - name of the event 
     * @param {Function} listener - callback function to unsubscribe/delete.
     */
    off(event, listener) {
        // Check if the event exists
        if (this.events[event]) {
            // Filter out the listener that needs to be removed
            this.events[event] = this.events[event].filter(l => l !== listener);
        }
    }
}


export const eventEmitter = new EventEmitter();