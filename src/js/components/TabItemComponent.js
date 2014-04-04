/*global GLOBE, Em */
GLOBE.TabItemComponent = Em.Component.extend({
    active: false,
    tagName: 'div',
    classNames: ['tab'],
    classNameBindings: ['active'],

    click: function() {
        // only trigger if not already active
        if (!this.get('active')) {
            this.toggleProperty('active');
            this.sendAction('tabActivated', this.get('key'));
        }
    }
});