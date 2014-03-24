/*global GLOBE, Em */
GLOBE.RelayDetailView = Em.View.extend({
    didInsertElement: function(){
        this.get('controller').on('content-ready', Ember.run.bind(this, this.bindQTip));
    },

    bindQTip: function(){
        this.$('.has-tip').qtip({
            style: {
                classes: 'qtip-dark'
            },
            content: {
                attr: 'data-description',
                title: function() {
                    // Retrieve content from ALT attribute of the $('.selector') element
                    return this.attr('title');
                }
            },
            position: {
                my: 'top left',
                at: 'bottom left'
            }
        });
    }
});