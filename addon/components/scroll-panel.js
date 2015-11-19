import Ember from 'ember';
import StyleBindingsMixin from 'ember-table/mixins/style-bindings';
import RegisterTableComponentMixin from 'ember-table/mixins/register-table-component';

export default Ember.Component.extend(StyleBindingsMixin, RegisterTableComponentMixin, {
  classNames: ['et-scroll-panel'],
  styleBindings: ['width', 'height'],
  width: Ember.computed.alias('tableComponent._tableColumnsWidth'),
  height: Ember.computed.alias('tableComponent._tableContentHeight')
});
