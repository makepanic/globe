/*global GLOBE, Ember */
/**
 * Storage to temporary hold anything
 */
GLOBE.TemporaryStore = Ember.Object.extend({});
GLOBE.TemporaryStore.reopenClass({

    // variable that holds everything
    storage: {
        _details: {}
    },

    /**
     * Store an object in the temporary storage
     * @param where {String} storage variable
     * @param hashedFingerprint {String} unique identifier to access stored item
     * @param obj {Object|String|Number|Boolean} to store
     * @example
     * GLOBE.TemporaryStore.store('details', 'uid123465' , {foo: 'bar'});
     */
    store: function(where, hashedFingerprint, obj){
        // use only uppercase fingerprints
        hashedFingerprint = hashedFingerprint.toUpperCase();

        // check if store has property in _where
        if(this.storage.hasOwnProperty('_' + where)){
            this.storage['_' + where][hashedFingerprint] = obj;
        }

    },

    /**
     * Restore object from temporary storage
     * @param where {String} storage variable
     * @param hashedFingerprint {String} unique identifier to access stored item
     * @returns {undefined|Object} {Object} that was stored or {undefined} if there isn't anything stored
     * @example
     * var storedItem = NAMESPACE.TemporaryStore.find('details', 'uid123465');
     */
    find: function(where, hashedFingerprint){
        // use only uppercase fingerprints
        hashedFingerprint = hashedFingerprint.toUpperCase();

        var obj;

        // check if store has property in _where
        if(this.storage.hasOwnProperty('_' + where)){
            obj = this.storage['_' + where][hashedFingerprint];
        }

        return obj;
    }
});