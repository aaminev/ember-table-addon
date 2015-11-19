import Ember from 'ember';
import StyleBindingsMixin from 'ember-table/mixins/style-bindings';
import RegisterTableComponentMixin from 'ember-table/mixins/register-table-component';
import ScrollHandlerMixin from 'ember-table/mixins/scroll-handler';

export default Ember.Component.extend(StyleBindingsMixin, ScrollHandlerMixin,
    RegisterTableComponentMixin, {

  classNames: ['et-scroll-container'],
  classNameBindings: ['tableComponent._scrollContainerHeight'],
  styleBindings: ['left', 'width', 'height', 'top'],
  height: Ember.computed.alias('tableComponent._scrollContainerHeight'),
  width: Ember.computed.alias('tableComponent._scrollContainerWidth'),
  left: Ember.computed.alias('tableComponent._fixedColumnsWidth'),
  top: Ember.computed.alias('tableComponent._scrollContainerTop'),
  scrollTop: Ember.computed.alias('tableComponent._tableScrollTop'),
  scrollLeft: Ember.computed.alias('tableComponent._tableScrollLeft'),

  // HACK: onScrollLeftDidChange will not fire unless scrollLeft has been get
  // at least once. Therefore, we want to call onScrollLeftDidChange in
  // didInsertElement
  didInsertElement: function() {
    this._super();
    this.onScrollLeftDidChange();
  },

  // `event` here is a jQuery event
  onScroll: function(event) {
    this.set('scrollLeft', event.target.scrollLeft);
    event.preventDefault();
  },

  onScrollLeftDidChange: Ember.observer(function() {
    var selector = this.get('scrollElementSelector');
    this.$(selector).scrollLeft(this.get('scrollLeft'));
  }, 'scrollLeft', 'scrollElementSelector')
});
