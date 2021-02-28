$(document).on('keydown', '.editor', function(e){
	//detect 'tab' key
	if(e.keyCode == 9){
		//add tab
		document.execCommand('insertHTML', false, '&#009');
		//prevent focusing on next element
		e.preventDefault()
	}

	document.getElementById("numbering").innerHTML = countNumLines(tmp);
});

$(document).on('keyup', '.editor', function(e){
	var text = $("#editor").html();

	console.log("MYLITERAL:" + text);
	// parse the string :)
	// for the div tags, replacing them with \n
	var tmp = text.replace(/<div>/g, "");
	tmp = tmp.replace(/<\/div>/g, "\n");
	tmp = tmp.replace(/<br>/g, "");
	//console.log(tmp);
	document.getElementById("demo").innerHTML = getSelectionHtml();
	document.getElementById("numbering").innerHTML = countNumLines(tmp);
});

function getSelectionHtml() {
	var selection = window.document.selection,
	range, oldBrowser = true;

	if (!selection) {
		selection = window.getSelection();
		range = selection.getRangeAt(0);
		oldBrowser = false;
	}
	else
    	range = document.selection.createRange();

	selection.modify("move", "backward", "lineboundary");
	selection.modify("extend", "forward", "lineboundary");

	if (oldBrowser) {
		var html = document.selection.createRange().htmlText;
		range.select();
		return html;
	}

	var html = document.createElement("div");
	for (var i = 0, len = selection.rangeCount; i < len; ++i) {
		html.appendChild(selection.getRangeAt(i).cloneContents());
	}

	selection.removeAllRanges();
	selection.addRange(range);
	return html.innerHTML;
}

function countNumLines(s) {
	var num = 0;
	var list = [];
	var str = "";
	for (var i = 0; i < s.length; i++) {
		if (s.charAt(i) == '\n') {
			num++;
			list.push(num);
			str += num;
			str += "\n";
		}
	}
	return str;
}

