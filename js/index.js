function hasClass(e, t) {
	return !!e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)"))
}

function addClass(e, t) {
	hasClass(e, t) || (e.className += " " + t)
}

function removeClass(e, t) {
	hasClass(e, t) && (e.className = e.className.replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " "))
}

function toggleClass(e, t) {
	hasClass(e, t) ? removeClass(e, t) : addClass(e, t)
}
function vcard() {
	var e = document.querySelector(".mobile_nav_li1"),
		t = document.querySelector(".mobile_nav_li2"),
		l = document.querySelector(".mobile_nav_li3");
	mode = "vcard", document.getElementById("vcard").style.display = "block", removeClass(e, "li_on"), removeClass(t, "li_on"), addClass(l, "li_on"), document.getElementById("text").style.display = "none", document.getElementById("url").style.display = "none", document.querySelector("#url textarea").removeAttribute("id"), document.querySelector("#text textarea").removeAttribute("id"), document.querySelector(".foot").style.display = "block", document.getElementById("tips_overflow").style.display = "none", document.querySelector(".foot").style.marginTop = "50px"
}

function checkLen(e) {
	var t = 150,
		l = document.getElementById("tips_overflow");
	e.value.length > t ? (l.innerHTML = "鎮ㄨ緭鍏ヤ簡杩囧鍐呭锛屽鑷寸敓鎴愮殑浜岀淮鐮佷笉鏄撹鎵弿锛屽缓璁湪鐢佃剳绔櫥褰曡崏鏂欏畼缃戯紝浣跨敤娲荤爜鏉ョ敓鎴愪簩缁寸爜銆�", l.style.display = "block") : l.style.display = "none"
}

function OnInput() {
	var e = document.querySelector(".text_textarea");
	checkLen(e)
}
window.onload = function() {
	function e(e, t) {
		return e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)"))
	}

	function t(t, l) {
		if(e(t, l)) {
			var o = new RegExp("(\\s|^)" + l + "(\\s|$)");
			t.className = t.className.replace(o, "")
		}
	}

	function l(t, l) {
		e(t, l) || (t.className += " " + l)
	}

	function o(t, l) {
		for(var o = [], n = document.getElementsByTagName(l || "*"), r = 0; r < n.length; r++) e(n[r], t) && (o[o.length] = n[r]);
		return o
	}
	var n = document.body.clientHeight - 355 - 80;
	document.querySelector(".foot").style.marginTop = n + "px";
	for(var r = o("menu_list", "li"), a = o("menu_list_link", "a"), c = 0, s = a.length; s > c; c++) a[c].onclick = function() {
		for(var e = 0, o = r.length; o > e; e++) t(r[e], "current");
		var n = this.parentNode;
		l(n, "current")
	}
};
var menu_btn_new = document.getElementById("menu_btn_new");