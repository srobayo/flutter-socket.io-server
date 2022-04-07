const Band = require("./band");

class Bands {
  constructor() {
    this.bands = [];
  }

  addBand(band = new Band()) {
    this.bands.push(band);
  }

  getBands() {
    return this.bands;
  }

  deleteBand(id = "") {
    this.bands = this.bands.filter((band) => band.id !== id);
    return this.bands;
  }

  voteBand(id = "") {
    console.log(this.bands);
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.votes++;
        return band;
      } else {
        return band;
      }
    });
  }
} //end_class

module.exports = Bands;
