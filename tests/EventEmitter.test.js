import { eventEmitter } from '../src/scripts/core/EventEmitter.js';

/**
 * @desc unit tests for the EventEmitter class
 */
describe('EventEmitter', () => {
    let sampleListener1, sampleListener2;

    /** 
     * @desc resets the state before each test case
     */
    beforeEach(() => {
        // mock functions for listeners functions
        sampleListener1 = jest.fn();
        sampleListener2 = jest.fn();
        eventEmitter.events = {}; // reset events
    });

    /**
     * @test verifies that a listener can be subscribed to an event
     */
    test('subscribe a listener to an event', () => {
        // subscribes a mock listener to an event named 'testEvent'
        eventEmitter.on('testEvent', sampleListener1);
        expect(eventEmitter.events['testEvent']).toEqual([sampleListener1]);
    });

    /**
     * @test verifies that emitting an event calls the subscribed listener
     */
    test('emit an event and call the listener', () => {
        eventEmitter.on('testEvent', sampleListener1);
        const payload = { data: 'testData' };
        eventEmitter.emit('testEvent', payload);
        expect(sampleListener1).toHaveBeenCalledWith(payload);
    });

    /**
     * @test verifies that emitting an event with no listeners should not return an error
     */
    test('emit an event with no listeners should not throw', () => {
        expect(() => eventEmitter.emit('noListeners', 'payload')).not.toThrow();
    });

    /**
     * @test verifies that multiple listeners can be subscribed to the same event and receive the emitted payload
     */
    test('subscribe multiple listeners to an event and emit', () => {
        eventEmitter.on('testEvent', sampleListener1);
        eventEmitter.on('testEvent', sampleListener2);
        eventEmitter.emit('testEvent', 'payload');
        expect(sampleListener1).toHaveBeenCalledWith('payload');
        expect(sampleListener2).toHaveBeenCalledWith('payload');
    });

    /**
     * @test verifies that multiple events are working correctly
     */
    test('should handle multiple events correctly', () => {
        eventEmitter.on('testEvent1', sampleListener1);
        eventEmitter.on('testEvent2', sampleListener2);
        eventEmitter.emit('testEvent1', 'payload1');
        expect(sampleListener1).toHaveBeenCalledWith('payload1');
        expect(sampleListener2).not.toHaveBeenCalled();
    });

    /**
     * @test verifies that multiple emits to the same listener are working correctly
     */
    test('should handle multiple emits to the same listener', () => {
        eventEmitter.on('testEvent', sampleListener1);
        eventEmitter.emit('testEvent', 'payload1');
        eventEmitter.emit('testEvent', 'payload2');
        expect(sampleListener1).toHaveBeenCalledTimes(2);
        expect(sampleListener1).toHaveBeenNthCalledWith(1, 'payload1');
        expect(sampleListener1).toHaveBeenNthCalledWith(2, 'payload2');
    });

    /**
     * @test verifies that a listener can be unsubscribed from an event.
     */
    test('unsubscribe a listener from an event', () => {
        eventEmitter.on('testEvent', sampleListener1);
        eventEmitter.on('testEvent', sampleListener2);
        eventEmitter.off('testEvent', sampleListener1);
        eventEmitter.emit('testEvent', { data: 'testData' });

        // verifies that sampleListener1 is not called, but sampleListener2 is called
        expect(sampleListener1).not.toHaveBeenCalled();
        expect(sampleListener2).toHaveBeenCalled();
    });

});