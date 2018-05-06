sap.ui.define([
	"sap/m/Input",
	"sap/m/InputBase",
	"sap/m/InputRenderer"
	], function (Input,InputBase,InputRenderer) {
	"use strict";
	
	var SuggestedInput = Input.extend("pinakiBasicApp.extensions.SuggestedInput", {
		metadata: {
			properties : {
				liveChangeDelay: { type: "int", defaultValue: 3 }
			},
			events: {
				bufferedLiveChange: {}
			}
		},
		renderer: InputRenderer
	});
	
	this.oldValue='';
	
	SuggestedInput.prototype.fireLiveChange = function(oEvent){
		clearTimeout(this.bufferTimeout);
		
		this.bufferTimeout = setTimeout(function(){
			oEvent.oldValue=this.oldValue;
			this.fireBufferedLiveChange(oEvent);
			this.oldValue=oEvent.newValue;
		}.bind(this),this.getLiveChangeDelay()*1000);
	};
	return SuggestedInput;
});
