/*global GLOBE, Em */
GLOBE.RelayDetailView = Em.View.extend({
    didInsertElement: function(){
        this.$('.has-tip').qtip(GLOBE.static.qtipConf.detail);
        this.get('controller').on('content-ready', Em.run.bind(this, this.bindQTip));
    },

    bindQTip: function(){
        Em.run.scheduleOnce('afterRender', this, function(){
            // remove old tips and init again
            this.$('.has-tip').qtip('destroy', true);
            this.$('.has-tip').qtip(GLOBE.static.qtipConf.detail);
        });
    },

    willDestroyElement: function(){
        this.$('.has-tip').qtip('destroy', true);
    }
});
// the bridge detail view has the same methods, behavior
GLOBE.BridgeDetailView = GLOBE.RelayDetailView.extend();