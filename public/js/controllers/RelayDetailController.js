
App.RelayDetailController = Ember.ObjectController.extend({
    bandwidthData: {},
    weightData: {},

    contentChanged: function(){

        var nickname = this.get('content.nickname');

        App.set('title', 'Details for ' + nickname);
        App.set('message', '<span class="subtle">details for</span> <strong>' + nickname +'</strong>');

    }.observes('content')

});