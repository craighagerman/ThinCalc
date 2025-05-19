// Initialize the thincalc component
document.addEventListener('alpine:init', () => {
  Alpine.data('thincalc', () => ({
    // State
    selected: {
      mortar: null,
      trowel: null,
      substrate: null
    },
    
    values: {
      area: null,
      powder: null,
      water: null
    },
    
    units: {
      area: 'ft2',
      powder: 'lbs',
      water: 'qts'
    },
    
    // Available options
    mortarOptions: ['All-Set', 'Fast-Set'],
    trowelOptions: ['½"', 'Ditra'],
    substrateOptions: ['Kerdi', 'Ditra'],
    
    // Initialize component
    init() {
      // Set up watchers for the input values
      this.$watch('values.area', value => this.computeFrom('area'));
      this.$watch('values.powder', value => this.computeFrom('powder'));
      this.$watch('values.water', value => this.computeFrom('water'));
    },
    
    // Computation logic
    computeFrom(changed) {
      // Only compute if all required selections are made
      if (!this.selected.mortar || !this.selected.trowel || !this.selected.substrate) {
        return;
      }
      
      // Parse input values
      const area = parseFloat(this.values.area) || 0;
      const powder = parseFloat(this.values.powder) || 0;
      const water = parseFloat(this.values.water) || 0;
      
      // Prevent unnecessary computations
      if (Number.isNaN(area + powder + water)) {
        return;
      }
      
      // Calculate based on which value changed
      if (changed === 'area' && area > 0) {
        this.values.powder = (area / 0.72).toFixed(2);
        this.values.water = (this.values.powder * 0.26).toFixed(2);
      } else if (changed === 'powder' && powder > 0) {
        this.values.area = (powder * 0.72).toFixed(2);
        this.values.water = (powder * 0.26).toFixed(2);
      } else if (changed === 'water' && water > 0) {
        this.values.powder = (water / 0.26).toFixed(2);
        this.values.area = (this.values.powder * 0.72).toFixed(2);
      }
    },
    
    // Reset form
    resetForm() {
      this.values.area = null;
      this.values.powder = null;
      this.values.water = null;
    }
  }));
});
