
function Tokenizer(rules) {

	var skipWhiteSpace = true;

	this.rules = rules;
	var regex_parts = [];
	for (var i = 0; i < this.rules.length; ++i) {
		regex_parts.push('(' + rules[i] + ')');
	}
	// console.log(regex_parts.join("|"));
	this.regex = new RegExp(regex_parts.join('|'), 'g');
	this.skipWhiteSpace = skipWhiteSpace ? new RegExp('\\S', 'g') : null;
	this.buf = '';

	this.Input = function(buf) {
		this.buf = buf;
		this.regex.lastIndex = 0;
	}

	this.Next = function() {
		if (this.regex.lastIndex >= this.buf.length) {
			return null;
		}
		if (this.skipWhiteSpace) {
			this.skipWhiteSpace.lastIndex = this.regex.lastIndex;
			var match = this.skipWhiteSpace.exec(this.buf);
			if (match) {
		  		this.regex.lastIndex = match.index;
			} else {
			  	return null;
			}
		}
		var overflow = 0;
		do {
			var result = this.regex.exec(this.buf);
			if(result === null){
				return null;
			} else {
				if(result[0].length > 0) {
					return result[0];
				} else {
					++this.regex.lastIndex;
				}
			}
			++overflow;
		} while((this.regex.lastIndex < this.buf.length) && (overflow < 100));
	}

}