import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  description: DS.attr(),
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  category: DS.attr(),
  website: DS.attr(),
  streetview: DS.attr()
});
