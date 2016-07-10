(function() {
	var app = angular.module('materialApp', []);

	app.service("colors_service", function() {
		var colors = {
			"accent": "FF9800",
			"primary": "9C27B0",
			"lightPrimary": "9C27B0",
			"dark": "7B1FA2",
			"txt": "FFFFFF",
			"primaryText": "212121",
			"secondaryText": "727272",
			"divider": "B6B6B6",
			"primaryTextWithAccent": "212121",
			"secondaryTextWithAccent": "727272"
		};
		console.log(colors);
		return colors;
	});

	app.controller('SelectorController', ['$scope', 'colors_service', function($scope, colors_service) {
		var selector = this;

		selector.hex = ["F44336", "E91E63", "9C27B0", "673AB7", "3F51B5", "2196F3", "03A9F4", "00BCD4", "009688",
			"4CAF50", "8BC34A", "CDDC39", "FFEB3B", "FFC107", "FF9800", "FF5722", "795548", "9E9E9E", "607D8B"
		];

		selector.names = ["Red", "Pink", "Purple", "Deep Purple", "Indigo", "Blue", "Light Blue", "Cyan", "Teal",
			"Green", "Light Green", "Lime", "Yellow", "Amber", "Orange", "Deep Orange", "Brown", "Grey", "Blue Grey"
		];

		selector.darkColors = ["D32F2F", "C2185B", "7B1FA2", "512DA8", "303F9F", "1976D2", "0288D1", "0097A7", "00796B", "388E3C", "689F38", "AFB42B", "FBC02D",
			"FFA000", "F57C00", "E64A19", "5D4037", "616161", "455A64"
		];

		selector.lightPrimaryColors = ["FFCDD2", "F8BBD0", "E1BEE7", "D1C4E9", "C5CAE9", "BBDEFB", "B3E5FC", "B2EBF2", "B2DFDB", "C8E6C9", "DCEDC8", "F0F4C3", "FFF9C4",
			"FFECB3", "FFE0B2", "FFCCBC", "D7CCC8", "F5F5F5", "CFD8DC"
		];

		selector.color = colors_service;

		selector.randomTheme = function() {
			selector.changeColors(selector.hex[Math.floor(Math.random() * selector.hex.length)]);
		}

		var isPrimary = true;
		selector.changeColors = function(hex) {
			if (isPrimary) {
				colors_service.primary = hex;
			} else {
				colors_service.accent = hex;
			}

			/** Setting txt and icons colors **/
			if (colors_service.primary === "8BC34A" || colors_service.primary === "CDDC39" || colors_service.primary === "FFEB3B" || colors_service.primary === "FFC107" ||
				colors_service.primary === "FF9800" || colors_service.primary === "9E9E9E") {
				colors_service.txt = "212121";
			} else {
				colors_service.txt = "FFFFFF";
			}

			/** Setting PrimaryText and secondaryText colors **/
			if (colors_service.accent === "8BC34A" || colors_service.accent === "CDDC39" || colors_service.accent === "FFEB3B" || colors_service.accent === "FFC107" ||
				colors_service.accent === "FF9800" || colors_service.accent === "9E9E9E") {
				colors_service.primaryTextWithAccent = "212121";
				colors_service.secondaryTextWithAccent = "727272";
			} else {
				colors_service.primaryTextWithAccent = "FFFFFF";
				colors_service.secondaryTextWithAccent = "FFFFFF";
			}

			/** Setting Primary Dark and Primary Light colors **/
			colors_service.dark = selector.darkColors[selector.hex.indexOf(colors_service.primary)];
			colors_service.lightPrimary = selector.lightPrimaryColors[selector.hex.indexOf(colors_service.primary)];

			isPrimary = !isPrimary;
		};

	}]);

	app.controller('PanelController', ['$scope', 'colors_service', function($scope, colors_service) {
		var panel = this;
		panel.color = colors_service;

		panel.tooltip = function() {
			// $('#tt').on({
			// 	"click": function() {
			// 		$(this).children("p").text("Copied !!!");
			// 	},
			// 	"mouseover": function() {
			// 		$(this).children("p").text("Click to copy");
			// 		$(this).children("p").removeClass("hidden");
			// 	},
			// 	"mouseout": function() {
			// 		$(this).children("p").addClass("hidden");
			// 	}
			// });
			console.log(this);
		}

	}]);

	/** Directive **/

	app.directive("valueDisplay", function() {
		return {
			restrict: "E",
			template: '<span>Iso Val: </span>{{ value }}<br/><span>Iso Change: </span><input data-ng-model="value" />',			
			scope: { value: '=valueDisplay' },
		}
	});


	app.directive("colorPanel", function() {
		return {
			scope: {
				colorName: "@",
				color: "@",
				fontColor: "@"

			},

			template: '<div ng-click= "click()" ng-mouseleave = "mouseOut()" class = "col-xs-3 box" data-clipboard-text="#{{color}}" style="height:50%;background: #{{color}};">' +
				'<span class="inner" style="color:{{fontColor}};font-weight: bolder;margin-left: 5px;">{{colorName}} (#{{color}})</span>' +
				'<p class="hidden" style="color:{{fontColor}};font-weight: bolder;margin-left: 5px">Copied !!!</p>'+
				'</div>',
			controller: function($scope, $element) {

				$scope.click = function() {
					console.log(angular.element(this));
					$element.find("p").removeClass("hidden");
				};

				$scope.mouseOver = function() {
					// angular.element(.currentTarget).find("p").text("Click to copy");
					// 

				};

				$scope.mouseOut = function() {
					$element.find("p").addClass("hidden");
				};

			}
		};
	});

})();