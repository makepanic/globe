App.ToggleEnableView = Ember.View.extend({
    layoutName: 'toggleEnableViewLayout',
    enabled: false,
    classNameBindings: ['enabled:enable-view-enabled:enable-view-disabled'],
    value: null,

    valueChanged: function(){

        var value = this.get('value');
        if(value.length || value === true){
            this.set('enabled', true);
        }

    }.observes('value'),

    disabled: function(){
        return !this.get('enabled');
    }.property('enabled')

});
