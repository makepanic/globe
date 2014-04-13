/*global $, GLOBE, Em */
GLOBE.ContentReadyTriggerableMixin = Em.Mixin.create({
    /**
     * Function that is called if the controller content is changed.
     */
    contentChanged: function(){
        this.trigger('content-ready');
    }.observes('content')
});