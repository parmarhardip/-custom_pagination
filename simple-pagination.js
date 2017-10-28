/* * * * * * * * * * * * * * * * *
 * Pagination
 * javascript Custom page navigation
 * * * * * * * * * * * * * * * * */

var Pagination = {

	code: '',

	// converting initialize data
	Extend: function ( data ) {
		data = data || {};
		Pagination.size = data.size || 300;
		Pagination.page = data.page || 1;
		Pagination.step = data.step || 1;
		Pagination.nextbtn = data.nextbtntxt || 'Next';
		Pagination.prevbtn = data.prevbtntxt || 'Previous';
		Pagination.tags = data.tags || 'li';
		Pagination.tagsClass = data.tagsClass || 'pages';
	},

	// add pages by number (from [s] to [f])
	Add: function ( s, f ) {
		for ( var i = s; i < f; i++ ) {
			Pagination.code += '<' + Pagination.tags + ' class="' + Pagination.tagsClass + '"><a data-class="' + i + '" class="' + i + '">' + i + '</a></' + Pagination.tags + '>';
		}
	},

	// add last page with separator
	Last: function () {
		Pagination.code += '<i>...</i><' + Pagination.tags + ' class="' + Pagination.tagsClass + '"><a data-class="' + Pagination.size + '" class="' + Pagination.size + '">' + Pagination.size + '</a></' + Pagination.tags + '>';
	},

	// add first page with separator
	First: function () {
		Pagination.code += '<' + Pagination.tags + ' class="' + Pagination.tagsClass + '"><a data-class="1" class="1">1</a></' + Pagination.tags + '><i>...</i>';
	},

	// change page
	Click: function () {
		Pagination.page = +this.innerHTML;
		if ( Pagination.page == 1 ) {
			document.getElementsByClassName( 'prev' )[ 0 ].style.display = 'none';
		} else {
			document.getElementsByClassName( 'prev' )[ 0 ].style.display = 'inline-block';
		}
		if ( Pagination.page == Pagination.size ) {
			document.getElementsByClassName( 'next' )[ 0 ].style.display = 'none';
		} else {
			document.getElementsByClassName( 'next' )[ 0 ].style.display = 'inline-block';
		}

		Pagination.Start();
	},

	// previous page
	Prev: function () {
		Pagination.page--;
		if ( Pagination.page < 1 ) {
			Pagination.page = 1;
		}
		if ( Pagination.page == 1 ) {
			document.getElementsByClassName( 'prev' )[ 0 ].style.display = 'none';
		} else {
			document.getElementsByClassName( 'prev' )[ 0 ].style.display = 'inline-block';
		}

		Pagination.Start();
	},

	// next page
	Next: function () {
		Pagination.page++;
		if ( Pagination.page > Pagination.size ) {
			Pagination.page = Pagination.size;
		}
		if ( Pagination.page == Pagination.size ) {
			document.getElementsByClassName( 'next' )[ 0 ].style.display = 'none';
		} else {
			document.getElementsByClassName( 'next' )[ 0 ].style.display = 'inline-block';
		}
		Pagination.Start();
	},

	// --------------------
	// Script
	// --------------------

	// binding pages
	Bind: function () {
		var a = Pagination.e.getElementsByTagName( 'a' );
		for ( var i = 0; i < a.length; i++ ) {
			if ( +a[ i ].innerHTML === Pagination.page ) a[ i ].className = 'active';
			a[ i ].addEventListener( 'click', Pagination.Click, false );
		}
	},

	// write pagination
	Finish: function () {
		Pagination.e.innerHTML = Pagination.code;
		Pagination.code = '';
		Pagination.Bind();
	},

	// find pagination type
	Start: function () {
		if ( Pagination.size < Pagination.step * 2 + 6 ) {
			Pagination.Add( 1, Pagination.size + 1 );
		}
		else if ( Pagination.page < Pagination.step * 2 + 1 ) {
			Pagination.Add( 1, Pagination.step * 2 + 4 );
			Pagination.Last();
		}
		else if ( Pagination.page > Pagination.size - Pagination.step * 2 ) {
			Pagination.First();
			Pagination.Add( Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1 );
		}
		else {
			Pagination.First();
			Pagination.Add( Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1 );
			Pagination.Last();
		}
		if ( Pagination.page == 1 ) {
			document.getElementsByClassName( 'prev' )[ 0 ].style.display = 'none';
		} else {
			document.getElementsByClassName( 'prev' )[ 0 ].style.display = 'inline-block';
		}
		if ( Pagination.page == Pagination.size ) {
			document.getElementsByClassName( 'next' )[ 0 ].style.display = 'none';
		} else {
			document.getElementsByClassName( 'next' )[ 0 ].style.display = 'inline-block';
		}
		Pagination.Finish();
	},

	// --------------------
	// Initialization
	// --------------------

	// binding buttons
	Buttons: function ( e ) {
		var nav = e.getElementsByTagName( 'a' );

		nav[ 0 ].addEventListener( 'click', Pagination.Prev, false );
		nav[ 1 ].addEventListener( 'click', Pagination.Next, false );
	},

	// create skeleton
	Create: function ( e ) {

		var html = [
			'<' + Pagination.tags + ' class="' + Pagination.tagsClass + '"><a class="prev">' + Pagination.prevbtn + '</a></' + Pagination.tags + '>', // previous button
			'<span></span>',  // pagination container
			'<' + Pagination.tags + ' class="' + Pagination.tagsClass + '"><a class="next">' + Pagination.nextbtn + '</a></' + Pagination.tags + '>'  // next button
		];
		console.log( Pagination.nextbtn );
		e.innerHTML = html.join( '' );
		Pagination.e = e.getElementsByTagName( 'span' )[ 0 ];
		Pagination.Buttons( e );
	},

	// init
	Init: function ( e, data ) {
		Pagination.Extend( data );
		Pagination.Create( e );
		Pagination.Start();
	}
};

/* * * * * * * * * * * * * * * * *
 * Initialization
 * * * * * * * * * * * * * * * * */

var init = function () {
	var main_id = document.getElementById( 'hr-pagination' );
	Pagination.Init( main_id, {
		size: parseInt( main_id.getAttribute( 'data-size' ) ) || 30, // pages size
		page: 1,  // selected page
		step: parseInt( main_id.getAttribute( 'data-step' ) ) || 1, // pages before and after current
		nextbtntxt: main_id.getAttribute( 'data-nexttxt' ) || 'Next',
		prevbtntxt: 'Previous',
		tags: main_id.getAttribute( 'data-tag' ) || 'li',
		tagsClass: main_id.getAttribute( 'data-tagClass' ) || 'pages'

	} );
};

document.addEventListener( 'DOMContentLoaded', init, false );
