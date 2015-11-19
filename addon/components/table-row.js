import Ember from 'ember';
import RegisterTableComponentMixin from 'ember-table/mixins/register-table-component';
import LazyItem from 'ember-table/components/lazy-item';

export default LazyItem.extend(RegisterTableComponentMixin, {
  classNames: 'et-table-row',
  classNameBindings: ['row.isHovered:et-hover',
    'row.isSelected:et-is-selected',
    'row.rowStyle',
    'isLastRow:et-last-row'
  ],
  styleBindings: ['width', 'height'],
  row: Ember.computed.alias('content'),
  columns: Ember.computed.alias('parentView.columns'),
  width: Ember.computed.alias('tableComponent._rowWidth'),
  height: Ember.computed.alias('tableComponent.rowHeight'),

  // TODO(ppong): Why doesn't this apply to the table footer?
  isLastRow: Ember.computed(function() {
    return this.get('row') ===
      this.get('tableComponent.bodyContent.lastObject');
  }).property('tableComponent.bodyContent.lastObject', 'row'),

  // TODO(azirbel): Could simplify slightly via
  // this.set('row.isHovered', true) and remove the temp variable.
  // Also applies below/elsewhere.
  mouseEnter: function() {
    var row = this.get('row');
    if (row) {
      row.set('isHovered', true);
    }
  },

  mouseLeave: function() {
    var row = this.get('row');
    if (row) {
      row.set('isHovered', false);
    }
  },

  teardownContent: function() {
    var row = this.get('row');
    if (row) {
      row.set('isHovered', false);
    }
  }
});
