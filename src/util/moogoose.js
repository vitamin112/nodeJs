module.exports = {
  listMoongooseObject: function (object) {
    return object.map((item) => item.toObject());
  },
  MoongooseObject: function (object) {
    return object ? object.toObject() : object;
  },
};
