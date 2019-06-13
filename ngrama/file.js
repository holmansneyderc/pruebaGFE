if (window.FileReader) {
    document.getElementById('fileDropBox').addEventListener('dragover', handleDragOver, false);
    document.getElementById('fileDropBox').addEventListener('drop', handleFileSelection, false);
  }
  
  document.getElementById("btn").addEventListener("click", test);
  
  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  } 
  
  function startFileRead(fileObject) {
    var reader = new FileReader();
    if (fileObject) {
          reader.readAsText(fileObject);
    }
    reader.onload = function(e) {
      const text = reader.result;
      var textreplace = text.replace(/(\r\n|\n|\r)/gm,' ');
      textreplace = textreplace.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '');
      textreplace = textreplace.toLowerCase();
      const listworks = textreplace.split(' ');
      train(listworks);
      document.getElementById('resultado').innerHTML = text;
    }
  }
  
  function handleFileSelection(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    const files = evt.dataTransfer.files;
  
    for (var i = 0, file; file = files[i]; i++) {
      if (!file) {
        alert("No se puede acceder a " + file.name);
        continue;
      }
      if (file.size == 0) {
        alert("El archivo " + file.name.toUpperCase() + "esta vacio.");
        continue;
      }
      if (!file.type.match('text/.*')) {
        alert("El archivo " + file.name.toUpperCase() + " no es valido.");
        continue;
      }
      startFileRead(file);
    }
  }