import Ember from 'ember';

export default Ember.Helper.extend({
  compute: function(params, hash) {
    // var content = ;
    // console.log('1111 content helper', index + componentIndex);
    // index + componentIndex
    return params[0].objectAt(params[1] + params[2]);
  }
});
