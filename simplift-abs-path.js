// Simplify absolute path
var a = "/a/b/c/../../../../f/./d";
function dealAdd (a) {
	var myAdd = a.split("/");
	myAdd.pop();
	for (var i = 0; i < myAdd.length; i++) {
		if (myAdd[i] == "") {
			myAdd.splice(i, 1);
			i--;
		}
		else if (myAdd[i] == "..") {
			if (i > 0) {
				myAdd.splice(i-1, 2);
				i -= 2;
			}
			else {
				myAdd.splice(i , 1)
				i--;
			}						
		}
		else if (myAdd[i] == ".") {
			myAdd.splice(i, 1);
			i--;
		}
		
	}
	return "/" + myAdd.join("/");
}