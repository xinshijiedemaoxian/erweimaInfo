function ajax(e) {
	var o = null;
	e.method = e.method || "get", e.url = e.url || "", e.data = e.data || "", e.dataType = e.dataType || "text", e.fnSuc = e.fnSuc || function() {}, o = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"), "get" == e.method && e.data && (e.url += "?" + e.data), o.open(e.method, e.url, !0), "get" == e.method ? o.send() : (o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), o.send(e.data)), o.onreadystatechange = function() {
		if(4 == o.readyState && 200 == o.status) {
			var a = "";
			switch(e.dataType) {
				case "text":
					a = o.responseText;
					break;
				case "json":
					a = JSON.parse(o.responseText)
			}
			e.fnSuc(a)
		}
	}
}
function error(e) {
	var o = bobojs.$("errmsg");
	bobojs.setStyleByid(o, {
		display: ""
	}), o.innerHTML = e, setTimeout(function() {
		bobojs.setStyleByid(o, {
			display: "none"
		})
	}, 1e3)
}

function send() {
	var e = "email=" + bobojs.$("emailinput").value.trim() + "&img=" + bobojs.$("qrcodeimg").src;
	ajax({
		url: "/file/mobilesend",
		data: e,
		method: "post",
		dataType: "json",
		fnSuc: function(e) {
			console.log(e)
		}
	})
}

function is_desk() {
	cookie("is_desk", 1)
}
bobojs.addEvent(window, "load", function() {
	function emptyFn() {}

	function checkMode(e, o) {
		o = o || emptyFn, canvasObj.changeText(e, o);
		var a = bobojs.$("qrcode").toDataURL(),
			t = bobojs.$("qrcodeimg"),
			l = bobojs.getWindowSize().height,
			s = bobojs.getWindowSize().width;
		t.src = a, l - 35 > s ? (bobojs.setStyleByid(t, {
			display: "",
			width: "100%"
		}), bobojs.setStyleByid(resultdiv, {
			width: .7 * s + "px",
			"margin-left": -(.7 * s) / 2 + "px",
			height: .7 * s + 35 + "px",
			"margin-top": -(.7 * s) / 2 - 30 + "px"
		})) : (bobojs.setStyleByid(t, {
			display: "",
			width: "100%"
		}), bobojs.setStyleByid(resultdiv, {
			width: .6 * l + "px",
			"margin-left": -(.6 * l) / 2 + "px",
			height: .6 * l / 2 + 35 + "px",
			"margin-top": -(.6 * l) / 2 - 30 + "px"
		}))
	}
	var canvasObj = null;
	canvasObj = new createQRImage("qrcode"), bobojs.addEvent("type-more", "click", function(e) {
		var o = bobojs.$("type-more");
		return bobojs.hasClassName(o, "moreon") ? void bobojs.removeClassName(o, "moreon") : (bobojs.addClassName(o, "moreon"), void bobojs.stopPropagation(e))
	}), bobojs.addEvent(document, "click", function() {
		bobojs.removeClassName("type-more", "moreon")
	});
	var file = {
		edit: !0,
		type: "upload",
		name: "",
		upload: {
			state: "",
			id: 0,
			safecode: "",
			errmsg: ["请选择电脑上的文件!", "正在上传文件,请稍候!"]
		}
	};
	bobojs.addEvent("uploadresult", "load", function() {
		try {
			var ret = eval("(" + (this.contentDocument || this.contentWindow.document).body.innerHTML + ")");
			ret.iceb ? (bobojs.$("filename").value = file.name, file.upload.id = ret.data.id, file.upload.safecode = ret.data.safecode, file.upload.state = !0) : (file.upload.state = !1, alert(ret.msg))
		} catch(e) {
			alert("上传文件失败\n" + e.message)
		}
		file.edit = !0, bobojs.setStyleByid("uploading", {
			display: "none"
		})
	});
	var upload = function() {
		if(file.edit) {
			if("img" == mode) {
				var e = /\jpg|\jpeg|\png/i,
					o = bobojs.$("uploadinpt").value.split(".");
				if(-1 == o[o.length - 1].search(e)) return error("LOGO仅支持jpg、jpeg、png格式文件，请重新选择！"), !1
			}
			file.name = bobojs.$("uploadinpt").value, bobojs.setStyleByid("uploading", {
				display: "block"
			}), bobojs.$("upload").submit(), file.edit = !1
		} else {
			var a = file.upload.errmsg[1];
			error(a)
		}
	};
	bobojs.addEvent("uploadinpt", "change", upload), bobojs.addEvent("showqrcode", "click", function() {
		bobojs.setStyleByid("result", {
			display: "block"
		})
	}), bobojs.addEvent("click-create", "click", function() {
		if("vcard" == mode) {
			if(0 == bobojs.$("name").value.replace(/\ +/g, "").length) {
				var e = document.getElementById("tips_overflow");
				return e.innerHTML = "姓名不能为空！", e.style.display = "block", !1
			}
			bobojs.$("value").value = bobojs.$("name").value && (bobojs.$("value").value += "名称：" + bobojs.$("name").value), bobojs.$("identify").value && (bobojs.$("value").value +=";\r\n纳税人识别号：" + bobojs.$("identify").value), bobojs.$("address").value && (bobojs.$("value").value += "；\r\n地址、电话：" + bobojs.$("address").value),bobojs.$("bank").value && (bobojs.$("value").value += "；\r\n开户行及账号：" + bobojs.$("bank").value)+";";
		} else if("file" == mode || "img" == mode) {
			var o = "type=file&data[file][id]=" + file.upload.id + "&data[file][safecode]=" + file.upload.safecode + "&data[file][descr]=" + bobojs.$("note").value + "&config[level]=H&config[size]=280&config[bgcolor]=FFFFFF&config[forecolor]=000000&config[dotcolor_o]=000000&config[dotcolor_n]=000000&config[icon][path]=&config[icon][pos]=0&config[icon][zoom]=0";
			if(!file.upload.state) return error("请上传文件"), !1;
			bobojs.setStyleByid("result", {
				display: "block"
			}), bobojs.setStyleByid("resultdiv", {
				display: "none"
			}), bobojs.setStyleByid("close", {
				display: "none"
			}), bobojs.setStyleByid("loading", {
				display: "block"
			}), ajax({
				url: "/qr/generate",
				data: o,
				method: "post",
				dataType: "json",
				fnSuc: function(e) {
					if(e.iceb) {
						file.upload.state = "", file.upload.id = 0, file.upload.safecode = "", bobojs.$("filename").value = "", bobojs.$("note").value = "";
						var o = bobojs.$("uploadinpt"),
							a = o.cloneNode(!1);
						o.parentNode.replaceChild(a, o), bobojs.addEvent(a, "change", upload);
						var t = "//cli.im/" + e.data.coding;
						checkMode(t), bobojs.setStyleByid("loading", {
							display: "none"
						}), bobojs.setStyleByid("resultdiv", {
							display: "block"
						}), bobojs.setStyleByid("close", {
							display: "block"
						}), bobojs.$("click-create").innerHTML = "生成二维码", bobojs.setStyleByid("showqrcode", {
							display: ""
						})
					} else bobojs.setStyleByid("result", {
						display: "none"
					}), bobojs.setStyleByid("resultdiv", {
						display: "block"
					}), bobojs.setStyleByid("close", {
						display: "block"
					}), bobojs.setStyleByid("loading", {
						display: "none"
					}), alert(e.msg)
				}
			})
		}
		if("file" != mode && "img" != mode) {
			if(0 == bobojs.$("value").value.replace(/[\r\n]/g, "").length) {
				var e = document.getElementById("tips_overflow");
				return e.innerHTML = "内容不能为空！", e.style.display = "block", !1
			}
			if("url" == mode) {
				var a = document.querySelector(".url_textarea").value;
				a.indexOf("http://") < 0 && a.indexOf("https://") < 0 && (a = "http://" + a, bobojs.$("value").value = a)
			}
			checkMode(bobojs.$("value").value), bobojs.setStyleByid("result", {
				display: "block"
			}), bobojs.$("click-create").innerHTML = "生成二维码", bobojs.setStyleByid("showqrcode", {
				display: ""
			});
			var o = "type=" + mode + "&content=" + bobojs.$("value").value + "&info=" + bobojs.$("value").value;
			ajax({
				url: "/Apis/QrCode/moblog",
				data: o,
				method: "post",
				dataType: "json",
				fnSuc: function() {}
			})
		}
	}), bobojs.addEvent("close", "click", function() {
		bobojs.setStyleByid("result", {
			display: "none"
		})
	}), bobojs.addEvent("email", "click", function() {
		bobojs.setStyleByid("send_box", {
			display: "block"
		})
	}), bobojs.addEvent("send_close", "click", function() {
		bobojs.setStyleByid("send_box", {
			display: "none"
		})
	})
});