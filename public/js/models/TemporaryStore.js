/**
 * Created with IntelliJ IDEA.
 * User: mkp
 * Date: 03.07.13
 * Time: 12:21
 * To change this template use File | Settings | File Templates.
 */

App.TemporaryStore = Ember.Object.extend({});
App.TemporaryStore.reopenClass({
    details: {},
    summaries: {},

    store: function(where, hashedFingerprint, obj){
        hashedFingerprint = hashedFingerprint.toUpperCase();

        switch(where){
            case 'details':
                this.details[hashedFingerprint] = obj;
                break;
            case 'bridges':
                this.bridges[hashedFingerprint] = obj;
                break;
        }
    },
    find: function(where, hashedFingerprint){
        var obj = undefined;
        hashedFingerprint = hashedFingerprint.toUpperCase();

        switch(where){
            case 'details':
                obj = this.details[hashedFingerprint];
                break;
            case 'bridges':
                obj = this.bridges[hashedFingerprint];
                break;
        }

        return obj;
    }
});