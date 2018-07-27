/*
    vkHTML5LocalStorage.js by Vincent Klijn LRPS
    <https://www.vincentklijnux.eu>
    created 2016-12-26

    Copyright (c) 2016 Vincent Klijn UX
    This file may be used for personal educational purposes as needed. 
    Use for other purposes is granted provided that this notice is
    retained and any changes made are clearly indicated as such.
	
	version 1.0.3 - vk 2018-07-23
*/

// useful for finding elements (a shortcut for getElementById)
var myElement = function(id) { 
	return document.getElementById(id); 
};
// global variables
var errorMessage = undefined;
var hasError = false;

// check for browser support on HTML5 Local Storage functionality
// if support is available, return the storage object, so it can be assigned to a variable
// if support is not available, return undefined to the variable
// try-catch checks for availability of the property without causing an error if not 

// check for localStorage
function getLocalStorage() {
    try {
        if( Boolean(window.localStorage) ) {
			return window.localStorage;
		} else {
			return undefined;
		}
    } 
	catch(e) {
        return undefined;
    }
}

// check for sessionStorage
function getSessionStorage() {
    try {
        if( Boolean(window.sessionStorage) ) {
			return window.sessionStorage;
		} else { 
			return undefined;
		}
    } 
	catch(e) {
        return undefined;
    }
}

// check for openDatabase
function getOpenDatabase() {
    try {
        if( Boolean(window.openDatabase) ) {
			return window.openDatabase;
		} else {
			return undefined;
		}
    } 
	catch(e) {
        return undefined;
    }
}

// check for eventListeners
function getAddEventListener() {
    try {
        if( Boolean(window.addEventListener) ) {
			return window.addEventListener;
		}
    } 
	catch(e) {
        return undefined;
    }
}

// display Errors
function dispError( message ) {
    errorMessage = '<p class="error">' + message + '</p>';
    hasError = true;
}

// create the myTable class for displaying tabular information
function myTable( wrap ) {
    // class attributes
	this.wrap = ( wrap == undefined ) ? true : wrap;    // default to true
    this.rows = new Array();
    this.header = [];

	// class methods
    this.setHeader = function( row ) {
        this.header = row;
    };

    this.addRow = function( row ) {
        this.rows.push(row);
    };

    this.getRow = function ( index ) {
        return this.rows[index];
    };

    this.countRows = function () {
        return this.rows.length;
    };

    this.getTableHTML = function () {
        var addHtml = '';
        if(this.wrap) {
			addHtml += '<table class="myTable">\n';
		}
        addHtml += this.getHeaderHTML();
        for(var row in this.rows) {
            addHtml += this.getRowHTML(this.rows[row]);
        }
        if(this.wrap) {
			addHtml += '</table>\n';
		}
        return addHtml;
    };

    this.getHeaderHTML = function () {
        if( this.header.length == 0 ) {
			return '';
		}
        var addHtml = '<tr>';
        for( var cell in this.header ) {
            addHtml += '<th>' + this.header[cell] + '</th>';
        }
        addHtml += '</tr>\n';
        return addHtml;
    };

    this.getRowHTML = function ( row ) {
        var addHtml = '<tr>';
        for( var cell in row ) {
            var rowNum = row[cell];
            if( rowNum == null) {
				rowNum = '<span class="red">NULL</span>';
			}
            addHtml += '<td>' + rowNum + '</td>';
        }
        addHtml += '</tr>\n';
        return addHtml;
    };

    this.writeTable = function () {
        document.write(this.getTableHTML());
    };

}
