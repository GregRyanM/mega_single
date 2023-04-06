// Get the source file from the user
var sourceFile = File.openDialog("Select the source file.", "*.jpg");

// Check if a file was selected
if (sourceFile != null) {
  // Get the path to the output file
  var outputFilePath = "/Users/" + $.getenv("USER") + "/Documents/Elvis Checkouts/" + sourceFile.name;

  // Check if the output file exists
  var outputFile = new File(outputFilePath);
  if (outputFile.exists) {
    // Open the output file
    app.open(outputFile);

    // Open the source file
    var sourceDoc = app.open(sourceFile);

    // Switch to the source file tab
    app.activeDocument = sourceDoc;
  } else {
    alert("Output file does not exist.");
  }
} else {
  alert("No source file selected.");
}
var sourceDoc = app.documents[0];
var targetDoc = app.documents[1];

app.activeDocument = sourceDoc;

for (var i = 0; i < sourceDoc.pathItems.length; i++) {
  sourceDoc.pathItems[i].select();
  var idcopy = charIDToTypeID( "copy" );
  executeAction( idcopy, undefined, DialogModes.NO );
  
  app.activeDocument = targetDoc;
  app.doAction("Deselect current path", "for script"); // Run "Deselect current path" action
  var idpast = charIDToTypeID( "past" );
  executeAction( idpast, undefined, DialogModes.NO );
  
  app.activeDocument = sourceDoc;
}

// Switch to the target document to continue copying paths
app.activeDocument = targetDoc;

for (var i = 0; i < targetDoc.pathItems.length; i++) {
  targetDoc.pathItems[i].select();
  var idcopy = charIDToTypeID( "copy" );
  executeAction( idcopy, undefined, DialogModes.NO );
  
  app.activeDocument = sourceDoc;
  app.doAction("Deselect current path", "for script"); // Run "Deselect current path" action
  var idpast = charIDToTypeID( "past" );
  executeAction( idpast, undefined, DialogModes.NO );
  
  app.activeDocument = targetDoc;
}

// Close the active document
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

// Run "save n close" action
app.doAction("save n close", "for script")