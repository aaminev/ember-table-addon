import Ember from 'ember';
import TableBlock from 'ember-table/components/table-block';

export default TableBlock.extend({
  classNames: ['et-header-block'],
  // TODO(new-api): Eliminate view alias
  itemView: 'header-row',
  itemViewClass: Ember.computed.alias('itemView'),

  content: Ember.computed(function() {
    return [this.get('columns')];
  }).property('columns'),

  didInsertElement() {
  	this._super();
  	console.log('1111 header-block', this.get('content'));
  }
});
