sap.ui.define([
	"sap/ui/core/mvc/Controller"
	], function(Controller) {
	"use strict";

	return Controller.extend("pinakiBasicApp.controller.Home", {

		delayedInputLiveChange : function(e){
			var type = ['Success','Warning','Error','None'];
			e.getSource().getParent().addContent(
					new sap.m.MessageStrip({
						type : type[Math.floor(Math.random() * type.length)],
						showCloseButton:true,
						text : new Date() + ': Triggered change event with value '+e.getParameter('value')
					}).addStyleClass('sapUiSmallMargin')
			)
			if(e.getParameter('newValue').indexOf(e.getParameter('oldValue'))>-1 && e.getParameter('oldValue').length>0){
				return
			}else{
				var oSource = e.getSource();
				var aFilters = [new sap.ui.model.Filter('ProductName','Contains',e.getParameter('value'))] 
				var oBinding = oSource.getBinding('suggestionItems');
				oBinding.filter(aFilters);
			}
		}

	});
});