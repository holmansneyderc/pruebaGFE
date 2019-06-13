class ngram {
    constructor(Pij, words) {
      this.Pij = Pij;
      this.words = words;
    }
    get word() {
      return this.randomword();
    }
    randomword() {
      var posdata = Math.floor((Math.random() * this.words.length) + 1)
      return this.words[posdata - 1];
    }
  }
  
  var arraysentences = [];
  function train(listworks) {
    var res = 0;
    arraysentences = [new ngram(listworks[0] + " " + listworks[1], [listworks[2]])];
    for (step = 1; step < listworks.length - 2; step++) {
      res = arraysentences.findIndex(ngram => ngram.Pij === listworks[step] + " " + listworks[step + 1]);
      if (res == -1) {
        arraysentences.push(new ngram(listworks[step] + " " + listworks[step + 1], [listworks[step + 2]]))
      } else {
        arraysentences[res].words.push(listworks[step + 2]);
      }
    };
    test()
  }
  
  function test() {
    var texto =  document.getElementById("works").value;
    var resp = " ";
    var arrayend = texto.split(' ');
    var final_text = texto;
    while(arraysentences.findIndex(ngram => ngram.Pij === texto) >= 0){
      resp = arraysentences.find(ngram => ngram.Pij === texto).word;
      arrayend.push(resp);
      texto = arrayend[arrayend.length - 2] + " " + arrayend[arrayend.length - 1];
      final_text += " " + resp + " ";
    }
    document.getElementById('final_text').innerHTML = final_text;
    print();
  }
  
  function print(){
    var output ="";
    for (var i in arraysentences) {
      output += "<h3>"+arraysentences[i].Pij+"</h3>"
      output+="<ul>";
      for (var j in arraysentences[i].words) {
        output += "<li>"+arraysentences[i].words[j]+"</li>"
      }
      output += "</ul>"
    }
    document.getElementById("arraysentences").innerHTML=output;
  
  }