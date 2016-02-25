
var input, format, output, tokenizer;

function OnLoad() {
	input = document.getElementById("input");
	pattern = document.getElementById("pattern");
	format = document.getElementById("format");
	output = document.getElementById("output");}

function Apply() {

	var tokenizer = new Tokenizer([pattern.value]);
	tokenizer.Input(input.value);
	var o;

	if(format.value.localeCompare("json") == 0) {
		o = "[ ";
		var word;
		var first = true;
		while(word = tokenizer.Next()) {
			if(first == true) {
				o += "'" + word + "'";
				first = false;
			} else {
				o += ", '" + word + "'";
			}
		}
		o += " ]";
	} else if(format.value.localeCompare("c#") == 0) {
		o = "{ ";
		var word;
		var first = true;
		while(word = tokenizer.Next()) {
			if(first == true) {
				o += "\"" + word + "\"";
				first = false;
			} else {
				o += ", \"" + word + "\"";
			}
		}
		o += " }";
	} else if(format.value.localeCompare("csv") == 0) {
		o = "";
		var word;
		var first = true;
		while(word = tokenizer.Next()) {
			if(first == true) {
				o += word;
				first = false;
			} else {
				o += "," + word;
			}
		}
	}

	output.value = o;

}

