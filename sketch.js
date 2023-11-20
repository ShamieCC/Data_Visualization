
// Global variable to store the gallery object. The gallery object is
// a container for all the visualisations.
var gallery;

function setup() {
// Create a canvas to fill the content div from index.html.
  canvasContainer = select('#app');
  var c = createCanvas(1024, 576);
  c.parent('app');

// Create a new gallery object.
  gallery = new Gallery();

// Add the visualisation objects here.
  gallery.addVisual(new TechDiversityRace());
  gallery.addVisual(new TechDiversityGender());
  gallery.addVisual(new MissingPersons());
  gallery.addVisual(new ClimateChange());

}

function draw() {
//sets the background colour to the core site background colour, inspired by the Financial Times
	background(255, 241, 229);
	if (gallery.selectedVisual != null) {
		gallery.selectedVisual.draw();
	} else {
		//note that the use of template strings for multiple lines requires the indentation
		let intro = `Introduction to Programming 2, Data Visualization Extensions`;
		let tWidth = textWidth(
			'This is my final project submission. I have extended four extensions.'
		);
		textFont('Montserrat');
		textSize(20);
		textLeading(35);
		text(intro, width / 2 - (2 * tWidth) / 3, height / 4);
		//no loop is called to ensure the menu transformation is smooth
		noLoop();
	}
}







