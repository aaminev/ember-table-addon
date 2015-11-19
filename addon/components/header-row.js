import Ember from 'ember';
import StyleBindingsMixin from 'ember-table/mixins/style-bindings';
import RegisterTableComponentMixin from 'ember-table/mixins/register-table-component';
import ScrollHandlerMixin from 'ember-table/mixins/scroll-handler';

// We hacked this. There is an inconsistency at the level in which we are
// handling scroll event...
export default Ember.Component.extend(
StyleBindingsMixin, RegisterTableComponentMixin, ScrollHandlerMixin, {
  classNames: ['et-table-row', 'et-header-row'],
  styleBindings: ['width'],
  columns: Ember.computed.alias('content'),
  width: Ember.computed.alias('tableComponent._tableBlockWidth'),
  scrollLeft: Ember.computed.alias('tableComponent._tableScrollLeft'),

  // Options for jQuery UI sortable
  sortableOption: Ember.computed(function() {
    return {
      axis: 'x',
      cancel: '.js-et-headerCellPopoverLink-container',
      containment: 'parent',
      cursor: 'move',
      delay: 150,
      helper: 'clone',
      items: '.et-header-cell.sortable',
      opacity: 0.9,
      placeholder: 'ui-state-highlight',
      scroll: true,
      tolerance: 'pointer',
      update: Ember.$.proxy(this.onColumnSortDone, this),
      stop: Ember.$.proxy(this.onColumnSortStop, this),
      sort: Ember.$.proxy(this.onColumnSortChange, this)
    };
  }),

  onScrollLeftDidChange: Ember.observer(function() {
    this.$().scrollLeft(this.get('scrollLeft'));
  }, 'scrollLeft'),

  didInsertElement: function() {
    console.log('1111 header-row', this.get('content'));
    this._super();
    if (this.get('tableComponent.enableColumnReorder')) {
      this.$('> div').sortable(this.get('sortableOption'));
    }
  },

  willDestroyElement: function() {
    if (this.get('tableComponent.enableColumnReorder')) {
      // TODO(azirbel): Get rid of this check, as in onColumnSortDone?
      var $divs = this.$('> div');
      if ($divs) {
        $divs.sortable('destroy');
      }
    }
    this._super();
  },

  onScroll: function(event) {
    this.set('scrollLeft', event.target.scrollLeft);
    event.preventDefault();
  },

  onColumnSortStop: function() {
    this.set('tableComponent._isShowingSortableIndicator', false);
  },

  onColumnSortChange: function() {
    var left = this.$('.ui-state-highlight').offset().left -
        this.$().closest('.et-tables-container').offset().left;
    this.set('tableComponent._isShowingSortableIndicator', true);
    this.set('tableComponent._sortableIndicatorLeft', left);
  },

  onColumnSortDone: function(event, ui) {
    var newIndex = ui.item.index();
    this.$('> div').sortable('cancel');
    var view = this.container.lookup('-view-registry:main')[ui.item.attr('id')];
    var column = view.get('column');
    this.get('tableComponent').onColumnSort(column, newIndex);
    this.set('tableComponent._isShowingSortableIndicator', false);
  }
});
