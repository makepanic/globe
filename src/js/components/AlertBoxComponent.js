/*global GLOBE, Em */
GLOBE.AlertBoxComponent = Em.Component.extend({
    tagName: 'div',
    baseClass: 'alert',

    classNameBindings: ['baseClass', 'type'],

    isVisible: function(){
        var type = this.get('type'),
            msg = this.get('msg');

        // check if something is in type and msg
        return !!(type && type.length && msg && msg.length);
    }.property('type', 'msg'),

    typeBinding: 'content.type',
    msgBinding: 'content.msg'
});