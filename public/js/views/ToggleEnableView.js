App.ToggleEnableView = Ember.View.extend({
    layoutName: 'toggleEnableViewLayout',
    enabled: false,
    disabled: function(){
        return !this.get('enabled');
    }.property('enabled'),

    classNameBindings: ['enabled:enable-view-enabled:enable-view-disabled'],

    click: function(e){
        if(e.target.className === 'enable-view-toggler'){
            console.log('toggling enabled', e)
            this.toggleProperty('enabled');
        }

    }
});
