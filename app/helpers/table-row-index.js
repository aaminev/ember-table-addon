import Ember from 'ember';

export default Ember.Helper.extend({
  compute: function(params, hash) {
    // console.log('1111 index helper', startIndex + componentIndex);
    return params[0] + params[1];
  }
});
