import Ember from 'ember';
import TableContainer from 'ember-table/components/table-container';
import RegisterTableComponentMixin from 'ember-table/mixins/register-table-component';

export default TableContainer.extend(RegisterTableComponentMixin, {
  classNames: [
  	'et-table-container',
    'et-fixed-table-container',
    'et-header-container'
  ],
  height: Ember.computed.alias('tableComponent._headerHeight'),
  width: Ember.computed.alias('tableComponent._tableContainerWidth'),
  didInsertElement() {
  	this._super();
  	console.log('1111 header-table-container fixedColumns', this.get('fixedColumns'));
  }
});
