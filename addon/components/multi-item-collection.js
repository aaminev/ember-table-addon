import Ember from 'ember';
import StyleBindingsMixin from 'ember-table/mixins/style-bindings';

// export default Ember.CollectionView.extend(
export default Ember.Component.extend(StyleBindingsMixin, {
  styleBindings: 'width',
  itemViewClassField: null,
  // templateName: Ember.computed(function() {
  //   if ( this.get('contentItems.length') <= 1 ) {
  //       return 'multi-item-collection-single';
  //   } else {
  //       return 'multi-item-collection';
  //   }
  // }).property('contentItems'),
  // firstItem: Ember.computed(function() {
  //   return this.get('contentItems[0]');
  // }).property('contentItems'),
  createChildView: function(view, attrs) {
    var itemViewClassField = this.get('itemViewClassField');
    var itemViewClass = attrs.content.get(itemViewClassField);
    if (typeof itemViewClass === 'string') {
      if (/[A-Z]+/.exec(itemViewClass)) {
        // Global var lookup - 'App.MessagePreviewView'
        itemViewClass = Ember.get(Ember.lookup, itemViewClass);
      } else {
        // Ember CLI Style lookup - 'message/preview'
        itemViewClass = this.container.lookupFactory("component:" + itemViewClass) || this.container.lookupFactory("view:" + itemViewClass);;
      }
    }
    return this._super(itemViewClass, attrs);
  },

  didInsertElement() {
    this._super();
    console.log('1111 multi-item-collection didInsertElement', this.get('content'))
  },

  contentItems: Ember.computed('itemViewClassField', 'content', function() {
    var itemViewClassField = this.get('itemViewClassField');
    var items = this.get('content');
    if ( !items ) {
        return [];
    }
    var result = items.map(item=> {
        var itemViewClass = item.get(itemViewClassField);
        var id;
        if (typeof itemViewClass === 'string') {
            id = '' + itemViewClass;
          // if (/[A-Z]+/.exec(itemViewClass)) {
          //   // Global var lookup - 'App.MessagePreviewView'
          //   itemViewClass = Ember.get(Ember.lookup, itemViewClass);
          // } else {
          //   // Ember CLI Style lookup - 'message/preview'
          //   itemViewClass = this.container.lookupFactory("component:" + itemViewClass) || this.container.lookupFactory("view:" + itemViewClass);;
          // }
        } else {
            id = 'comp-' + Math.random().toString().slice(2);
            window.App.container.register('component:' + id, itemViewClass)
        }
        return {
            item,
            itemViewClass: id
        };
    });
    console.log('1111 multi-item-collection contentItems', itemViewClassField, items, result);
    return result;
  })


});
