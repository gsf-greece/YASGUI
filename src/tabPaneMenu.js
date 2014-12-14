'use strict';
var $ = require('jquery'),
	imgs = require('./imgs.js'),
	utils = require('yasgui-utils');
module.exports = function(yasgui, tab) {
	var $menu = null;
	var $tabPanel = null;
	var $tabsParent = null;
	var $tabPanesParent = null;
	var $paneReqConfig = null;
	
	
	var $btnPost;
	var $btnGet;
	var $acceptSelect; 
	var $acceptGraph;
	var $urlArgsDiv;
	var $defaultGraphsDiv;
	var $namedGraphsDiv;
	var initWrapper = function() {
		$menu = $('<nav>', {class: 'menu-slide', id: 'navmenu'});
		$menu.append(
				$(utils.svg.getElement(imgs.yasgui, {width: '70px', height: '58px'})).addClass('yasguiLogo')
		);
		
		//tab panel contains tabs and panes
		$tabPanel = $('<div>', {role: 'tabpanel'}).appendTo($menu);
		
		//init tabs
		$tabsParent = $('<ul>', {class:'nav nav-pills tabPaneMenuTabs', role: 'tablist'})
			.appendTo($tabPanel);
		
		//init panes
		$tabPanesParent = $('<div>', {class: 'tab-content'}).appendTo($tabPanel);
		
		
		/**
		 * Init request tab
		 */
		var li = $("<li>", {role: "presentation"}).appendTo($tabsParent);
		var reqPaneId = 'yasgui_reqConfig_' +tab.id;
		li.append(
			$('<a>', {href: '#' + reqPaneId, 'aria-controls': reqPaneId,  role: 'tab', 'data-toggle': 'tab'})
			.text("Configure Request")
			.click(function(e) {
				e.preventDefault()
				$(this).tab('show')
			})
		);
		var $reqPanel = $('<div>', {id: reqPaneId, role: 'tabpanel',class: 'tab-pane requestConfig container-fluid'}).appendTo($tabPanesParent);
		
		//request method
		var $reqRow = $('<div>', {class: 'row'}).appendTo($reqPanel);
		$('<div>', {class:'col-md-4 rowLabel'}).appendTo($reqRow).append($('<span>').text('Request Method'));
		$btnPost = $('<button>', {class:'btn btn-default ','data-toggle':"button"}).text('POST').click(function(){
			$btnPost.addClass('active');
			$btnGet.removeClass('active');
		});
		$btnGet = $('<button>', {class:'btn btn-default', 'data-toggle':"button"}).text('GET').click(function(){
			$btnGet.addClass('active');
			$btnPost.removeClass('active');
		});
		$('<div>', {class:'btn-group col-md-8', role: 'group'}).append($btnGet).append($btnPost).appendTo($reqRow);
		
		//Accept headers
		var $acceptRow = $('<div>', {class: 'row'}).appendTo($reqPanel);
		$('<div>', {class:'col-md-4 rowLabel'}).appendTo($acceptRow).text('Accept Headers');
		$acceptSelect = $('<select>', {class: 'form-control'})
			.append($("<option>", {value: 'application/sparql-results+json'}).text('JSON'))
			.append($("<option>", {value: 'application/sparql-results+xml'}).text('XML'))
			.append($("<option>", {value: 'text/csv'}).text('CSV'))
			.append($("<option>", {value: 'text/tab-separated-values'}).text('TSV'));
		$acceptGraph = $('<select>', {class: 'form-control'})
			.append($("<option>", {value: 'text/turtle'}).text('Turtle'))
			.append($("<option>", {value: 'application/rdf+xml'}).text('RDF-XML'))
			.append($("<option>", {value: 'text/csv'}).text('CSV'))
			.append($("<option>", {value: 'text/tab-separated-values'}).text('TSV'));
		$('<div>', {class:'col-md-4', role: 'group'}).append($('<label>').text('SELECT').append($acceptSelect)).appendTo($acceptRow);
		$('<div>', {class:'col-md-4', role: 'group'}).append($('<label>').text('Graph').append($acceptGraph)).appendTo($acceptRow);
		
		
		//URL args headers
		var $urlArgsRow = $('<div>', {class: 'row'}).appendTo($reqPanel);
		$('<div>', {class:'col-md-4 rowLabel'}).appendTo($urlArgsRow).text('URL Arguments');
		$urlArgsDiv = $('<div>', {class:'col-md-8', role: 'group'}).appendTo($urlArgsRow);
		
		
		//Default graphs
		var $defaultGraphsRow = $('<div>', {class: 'row'}).appendTo($reqPanel);
		$('<div>', {class:'col-md-4 rowLabel'}).appendTo($defaultGraphsRow).text('Default graphs');
		$defaultGraphsDiv = $('<div>', {class:'col-md-8', role: 'group'}).appendTo($defaultGraphsRow);
		
		
		//Named graphs
		var $namedGraphsRow = $('<div>', {class: 'row'}).appendTo($reqPanel);
		$('<div>', {class:'col-md-4 rowLabel'}).appendTo($namedGraphsRow).text('Named graphs');
		$namedGraphsDiv = $('<div>', {class:'col-md-8', role: 'group'}).appendTo($namedGraphsRow);

		
		
		/**
		 * Init history tab
		 */
		var li = $("<li>", {role: "presentation"}).appendTo($tabsParent);
		var historyPaneId = 'yasgui_history_' +tab.id;
		li.append(
			$('<a>', {href: '#' + historyPaneId, 'aria-controls': historyPaneId,  role: 'tab', 'data-toggle': 'tab'})
			.text("History")
			.click(function(e) {
				e.preventDefault();
				$(this).tab('show')
			})
		);
		var $reqPanel = $('<div>', {id: historyPaneId, role: 'tabpanel',class: 'tab-pane history container-fluid'}).appendTo($tabPanesParent);
		
		
		
		/**
		 * Init collections tab
		 */
		var li = $("<li>", {role: "presentation"}).appendTo($tabsParent);
		var collectionsPaneId = 'yasgui_collections_' +tab.id;
		li.append(
			$('<a>', {href: '#' + collectionsPaneId, 'aria-controls': collectionsPaneId,  role: 'tab', 'data-toggle': 'tab'})
			.text("Collections")
			.click(function(e) {
				e.preventDefault()
				$(this).tab('show')
			})
		);
		var $reqPanel = $('<div>', {id: collectionsPaneId, role: 'tabpanel',class: 'tab-pane collections container-fluid'}).appendTo($tabPanesParent);
		
		
		return $menu;
	};
	
	var addTextInputsTo = function($el, num, animate, vals) {
		var $inputsAndTogglesContainer = $('<div>', {class:'textInputsRow'});
//		var $inputsContainer = $('<div>', {class:'textInputs'}).appendTo($inputsAndTogglesContainer);
		for (var i = 0; i < num; i++) {
			var val = (vals && vals[i]? vals[i]: "");
			$('<input>', {type: 'text'})
				.val(val)
				.keyup(function() {
					var lastHasContent = false;
					$el.find('.textInputsRow:last input').each(function(i, input) {
						if ($(input).val().trim().length > 0) lastHasContent = true;
					});
					if (lastHasContent) addTextInputsTo($el, num, true);
				})
				.css('width', (90/num) + '%')
				.appendTo($inputsAndTogglesContainer);
		}
		$inputsAndTogglesContainer.append(
				$(utils.svg.getElement(imgs.cross, {width: '14px', height: '14px'}))
				.addClass('closeBtn')
				.css('display', '')//let our style sheets do the work here
				.click(function(){
					$(this).closest('.textInputsRow').remove();
				})
		);
		if (animate) {
			$inputsAndTogglesContainer.hide().appendTo($el).show('fast');
		} else {
			$inputsAndTogglesContainer.appendTo($el);
		}
	};

	
	var updateWrapper = function() {
		//if no tab is active, select first one
		if ($menu.find('.tabPaneMenuTabs li.active').length == 0) $menu.find('.tabPaneMenuTabs a:first').tab('show');
		
		//we got most of the html. Now set the values in the html
		var options = tab.yasqe.options.sparql;
		
		
		//Request method
		if (options.requestMethod.toUpperCase() == "POST") {
			$btnPost.addClass('active');
		} else {
			$btnGet.addClass('active');
		}
		//Request method
		$acceptGraph.val(options.acceptHeaderGraph);
		$acceptSelect.val(options.acceptHeaderSelect);
		
		//url args
		$urlArgsDiv.empty();
		if (options.args && options.args.length > 0) {
			options.args.forEach(function(el) {
				var vals = [el.name, el.value];
				addTextInputsTo($urlArgsDiv, 2, false, vals)
			});
		}
		addTextInputsTo($urlArgsDiv, 2, false);//and, always add one item
		
		
		//default graphs
		$defaultGraphsDiv.empty();
		if (options.defaultGraphs && options.defaultGraphs.length > 0) {
			addTextInputsTo($defaultGraphsDiv, 1, false, options.defaultGraphs)
		}
		addTextInputsTo($defaultGraphsDiv, 1, false);//and, always add one item
		
		//default graphs
		$namedGraphsDiv.empty();
		if (options.namedGraphs && options.namedGraphs.length > 0) {
			addTextInputsTo($namedGraphsDiv, 1, false, options.namedGraphs)
		}
		addTextInputsTo($namedGraphsDiv, 1, false);//and, always add one item
		
	};
	
	var store = function() {
		var options = tab.yasqe.options.sparql;
		if ($btnPost.hasClass('active')) {
			options.requestMethod = "POST"; 
		} else if ($btnGet.hasClass('active')) {
			options.requestMethod = "GET"; 
		}
		
		//Request method
		options.acceptHeaderGraph = $acceptGraph.val();
		options.acceptHeaderSelect = $acceptSelect.val();
		
		//url args
		var args = [];
		$urlArgsDiv.find('div').each(function(i, el) {
			var inputVals = [];
			$(el).find('input').each(function(i, input) {
				inputVals.push($(input).val());
			});
			if (inputVals[0] && inputVals[0].trim().length > 0) {
				args.push({name: inputVals[0], value: (inputVals[1]? inputVals[1]: "")});
			}
		});
		options.args = args;
		
		
		//default graphs
		var defaultGraphs = [];
		$defaultGraphsDiv.find('div').each(function(i, el) {
			var inputVals = [];
			$(el).find('input').each(function(i, input) {
				inputVals.push($(input).val());
			});
			if (inputVals[0] && inputVals[0].trim().length > 0) defaultGraphs.push(inputVals[0]);
		});
		options.defaultGraphs = defaultGraphs;
		
		//named graphs
		var namedGraphs = [];
		$namedGraphsDiv.find('div').each(function(i, el) {
			var inputVals = [];
			$(el).find('input').each(function(i, input) {
				inputVals.push($(input).val());
			});
			if (inputVals[0] && inputVals[0].trim().length > 0) namedGraphs.push(inputVals[0]);
		});
		options.namedGraphs = namedGraphs;
	};
	
	
	
	return {
		initWrapper: initWrapper,
		updateWrapper: updateWrapper,
		store: store
	};
};
