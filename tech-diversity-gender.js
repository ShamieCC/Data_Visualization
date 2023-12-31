function TechDiversityGender() {

    // Name for the visualisation to appear in the menu bar.
    this.name = 'Tech Diversity: Gender';

    // Each visualisation must have a unique ID with no special
    // characters.
    this.id = 'tech-diversity-gender';

    // Layout object to store all common plot layout parameters and
    // methods.
    this.layout = {
    // Locations of margin positions. Left and bottom have double margin
    // size due to axis and tick labels.
        leftMargin: 130,
        rightMargin: width,
        topMargin: 30,
        bottomMargin: height,
        pad: 5,

        plotWidth: function () {
            return this.rightMargin - this.leftMargin;
        },

    // Boolean to enable/disable background grid.
        grid: true,

    // Number of axis tick labels to draw so that they are not drawn on
    // top of one another.
        numXTickLabels: 10,
        numYTickLabels: 8,
    };

    // Default visualisation colours.
    this.femaleColour = color('#B8808D');
    this.maleColour = color('#009DC4');

    // Property to represent whether data has been loaded.
    this.loaded = false;

    // Preload the data. This function is called automatically by the
    // gallery when a visualisation is added.
    this.preload = function () {
        var self = this;
        this.data = loadTable(
            './data/tech-diversity/gender-2018.csv', 'csv', 'header',
    // Callback function to set the value
    // this.loaded to true.
        function (table) {
            self.loaded = true;
        });

    };

    this.setup = function () {
    // Font defaults.
        textSize(16);
    };

    this.destroy = function () {
    //to stop text of other tools being affected
        textStyle(NORMAL); 
    };

    this.draw = function () {
        if (!this.loaded) {
        console.log('Data not yet loaded');
        return;
        }

    // Draw Female/Male labels at the top of the plot.
    this.drawCategoryLabels();

    var lineHeight = (height - this.layout.topMargin) /
        this.data.getRowCount();

    if ((mouseX - this.layout.leftMargin) / this.layout.plotWidth() > 0.095 && (mouseX - this.layout.leftMargin) / this.layout.plotWidth() < 0.905) {
        var mousePercent = 100 * (mouseX - this.layout.leftMargin) / this.layout.plotWidth();
        } else {
        var mousePercent = 50;
        }

        for (var i = 0; i < this.data.getRowCount(); i++) {

    // Calculate the y position for each company.
    var lineY = (lineHeight * i) + this.layout.topMargin;

    // Create an object that stores data from the current row.
    var company = {
    // Convert strings to numbers.
        'name': this.data.getString(i, 'company'),
        'female': this.data.getNum(i, 'female'),
        'male': this.data.getNum(i, 'male'),
    };

    // Draw the company name in the left margin.
    textStyle(BOLD);
    fill(0);
    noStroke();
    textAlign('right', 'top');
    // Make company name bold if it % of female employees exceed mousePercent
    if (company.female > mousePercent) {
        fill(this.femaleColour);
    } 
    else {
        fill(this.maleColour);
    }
    text(company.name,
    this.layout.leftMargin - this.layout.pad,
    lineY);
    // Draw female employees rectangle.
    fill(this.femaleColour);
    rect(this.layout.leftMargin,
        lineY,
        this.mapPercentToWidth(company.female),
        lineHeight - this.layout.pad);

    // Draw male employees rectangle.
    fill(this.maleColour);
    rect(this.layout.leftMargin + this.mapPercentToWidth(company.female),
        lineY,
        this.mapPercentToWidth(company.male),
        lineHeight - this.layout.pad);
    }

    // Draw line at mouseX
    stroke(0);
    strokeWeight(1);
    line(this.mapPercentToWidth(mousePercent) + this.layout.leftMargin,
        this.layout.topMargin,
        this.mapPercentToWidth(mousePercent) + this.layout.leftMargin,
        this.layout.bottomMargin);

        textAlign('center', 'top');
        noStroke();
        fill(0);
        text(Math.round(mousePercent) + '%',
        this.mapPercentToWidth(mousePercent) + this.layout.leftMargin,
        this.layout.pad);
    };

    this.drawCategoryLabels = function () {
        fill(0);
        noStroke();
        textAlign('left', 'top');
        text('Female',
        this.layout.leftMargin,
        this.layout.pad);
        textAlign('right', 'top');
        text('Male',
        this.layout.rightMargin,
        this.layout.pad);
    };

    this.mapPercentToWidth = function (percent) {
        return map(percent,
        0,
        100,
        0,
        this.layout.plotWidth());
    };
}