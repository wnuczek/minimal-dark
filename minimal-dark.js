top.document.title = "(" + location.hostname + ") Alt-F " + document.title

$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
}); 

$(window).on("load", function() {
	$('img[alt="help"]').each(function () {
	    $(this).replaceWith('<i class="icon-help"></i>');
	});
	$('.icon-help').fadeIn('slow');
});

/* menus */

function top_shortcuts(obj) {
	var sc = '<li class="nav-item dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">' + obj.label + '<b class="caret"></b></a><ul class="dropdown-menu">'

	while (sm = obj.smenu.shift()) {

		switch (sm.item) {
			case "<hr>":
				sc += '</ul></li>';
				break;
			case "Add":
				sc += '<li class="nav-item"><a class="nav-link" href="' + sm.url + '" target="content" title="add"><i class="icon-plus"></i></a></li>'
				break;
			case "Remove":
				sc += '<li class="nav-item"><a class="nav-link" href="' + sm.url + '" target="content" title="remove"><i class="icon-minus"></i></a></li>'
				break;
			case "Remove All":
				sc += '<li class="nav-item"><a class="nav-link" href="' + sm.url + '" target="content" title="remove all"><i class="icon-trash"></i></a></li>'
				break;
			case "Alt-F 1.0 Status Page":
				sc += '<li class="nav-item"><a class="nav-link" href="' + sm.url + '" target="content">Status</a></li>'
				break;			
			case "Folders Browse":
				sc += '<li class="nav-item"><a class="nav-link" href="' + sm.url + '" target="content">Folders</a></li>'
				break;	
			default:
				sc += '<li class="nav-item"><a class="nav-link" href="' + sm.url + '" target="content">' + sm.item + '</a></li>'
		}
	}
	
	return sc += '</ul></div></li></ul></li>'
}

function menuSetup(where, display) {
	
	$("body").addClass("container-fluid");

	var cl, frm, sc
	if (where == "side") {
		if (display == "no") {
			top.altf.cols="0,*" // hide nav frame
			return
		} else
			top.altf.cols="15%,*"
		frm = parent.nav.document
		cl = "vmenu"
	} else {
		if (display == "no")
			return
		frm = document
		cl = "hmenu"
	}

	//if ($(window).width() < 768) {
	   //alert('Less than 768');
	//}
		//<!--Navbar-->
		frm.writeln('<nav class="navbar navbar-light navbar-expand-md">')

		  //<!-- Navbar brand -->
		  //frm.writeln('<a class="navbar-brand" href="#">Navbar</a>')

		  //<!-- Collapse button -->
		  frm.writeln('<button class="navbar-toggler toggler-example" type="button" data-toggle="collapse" data-target="#navbarSupportedContent1" aria-controls="navbarSupportedContent1" aria-expanded="True" aria-label="Toggle navigation"><span>MENU<i class="icon-menu"></i></span></button>')

		  //<!-- Collapsible content -->
		  frm.writeln('<div class="collapse navbar-collapse" id="navbarSupportedContent1">')

		    //<!-- Links -->
		    frm.writeln('<ul id="menu" class="navbar-nav mr-auto">')
		    	while (obj = menu.shift()) {
					if (typeof(obj.url) != "undefined") { // no submenu, i.e., Logout, Status
						frm.writeln('<li class="nav-item"><a class="nav-link" href="', obj.url, '" target="content">', obj.label, '</a></li>')
					} else {
						if (obj.label == "Shortcuts") {
							if (where == "side"){
								sc = side_shortcuts(obj)
							}
							else{
								sc = top_shortcuts(obj)
								document.getElementById("menu").innerHTML = sc
							}
						} else {
							/* use 'radio' instead of 'checkbox' bellow to auto-close menus */
							frm.writeln('<li class="nav-item dropdown"><label for="vmenu_', obj.label, '"<a class="dropdown-toggle" data-toggle="dropdown" href="#">', obj.label,
								'<b class="caret"></b></a></label><input type="checkbox" name="vmenu_radio" id="vmenu_',
								obj.label, '"><ul class="dropdown-menu">')

							while (sm = obj.smenu.shift())
								frm.writeln('<li class="nav-item"><a class="nav-link" href="', sm.url, '" target="content">', sm.item, '</a></li>')
							frm.writeln('</ul></li>')
						}
					}
				}

		    frm.writeln('</ul>')
		    //<!-- Links -->

		  frm.writeln('</div>')
		  //<!-- Collapsible content -->

		frm.writeln('</nav>')
		//<!--/.Navbar-->
	
	//if ($(window).width() >= 768) {
	   //alert('More than 768');
	

}
//}

/* tooltips */

var stat_id, stat_ev

function popDown(id) {
	if (stat_id)
		clearTimeout(stat_id)
	stat_id = null
	document.getElementById(id).style.visibility = "hidden"
}

function popUp(ev, id) {
	if (stat_id)
		clearTimeout(stat_id)
	stat_ev = ev
	stat_id = id
	setTimeout("iPopUp()", 1000)
}

function iPopUp() {
	if (! stat_id)
		return

	obj = document.getElementById(stat_id)
	stat_id = null

	objWidth = obj.offsetWidth
	objHeight = obj.offsetHeight

	y = stat_ev.pageY + 20
	x = stat_ev.pageX - objWidth/4

	if (x + objWidth > window.innerWidth)
		x -= objWidth/2
	else if (x < 2)
		x = 2

	if (y + objHeight > window.innerHeight)
		y -= 2*objHeight

	obj.style.left = x + 'px'
	obj.style.top = y + 'px'
	obj.style.visibility = "visible"
}

/* bookmarks */

function commonbookmark() {
	try {
		x = parent.content.document.embedf
		title = x.ifname.value
		url = x.ifsrc.value
	} catch(err) {
		title = parent.content.document.title
		url = parent.content.document.location.pathname
	}
	return title + "&url=" + encodeURIComponent(url)
}

function addbookmark() {
	parent.content.document.location.assign("/cgi-bin/bookmark.cgi?add=" + commonbookmark())
	return false
}

function rmbookmark() {
	parent.content.document.location.assign("/cgi-bin/bookmark.cgi?rm=" + commonbookmark())
	return false
}

function rmall() {
	try {
		url = parent.content.document.embedf.ifsrc.value
	} catch(err) {
		url = parent.content.document.location.pathname
	}
	parent.content.document.location.assign("/cgi-bin/bookmark.cgi?rm=all&url=" + url)
	return false
}
