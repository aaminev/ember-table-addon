import Ember from 'ember';
import RegisterTableComponentMixin from 'ember-table/mixins/register-table-component';
import LazyContainerComponent from 'ember-table/components/lazy-container';

export default LazyContainerComponent.extend(
RegisterTableComponentMixin, {
  classNames: ['et-table-block'],
  styleBindings: ['width'],
  itemViewClass: Ember.computed.alias('tableComponent.tableRowViewClass'),
  rowHeight: Ember.computed.alias('tableComponent.rowHeight'),
  columns: null,
  content: null,
  scrollLeft: null,
  scrollTop: null,

  onScrollLeftDidChange: Ember.observer(function() {
    return this.$().scrollLeft(this.get('scrollLeft'));
  }).observes('scrollLeft'),

  didInsertElement() {
    this._super();
    console.log('1111 lazy-table-block', this.get('itemViewClass'), this.get('content.content'));
  }
});
