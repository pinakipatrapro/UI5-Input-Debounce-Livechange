sap.ui.define([
	"sap/m/Input",
	"sap/m/InputBase",
	"sap/m/InputRenderer"
	], function (Input,InputBase,InputRenderer) {
	"use strict";
	
	var SuggestedInput = Input.extend("pinakiBasicApp.extensions.SuggestedInput", {
		metadata: {
			properties : {
				liveChangeDelay: { type: "int", defaultValue: 3 },
				validationRegex: { type: "string" }
			},
			events: {
				bufferedLiveChange: {}
			}
		},
		init : function(e){
			Input.prototype.init.call(this);
		},
		renderer: InputRenderer
	});
	
	this.oldValue='';
	SuggestedInput.prototype.fireChange=function(oEvent){
		Input.prototype.fireChange.call(this);
		//Handle validation
		if(oEvent.newValue.length<1){
			this.setValueState('None');
		}
		else if(!eval(this.getValidationRegex()).test(oEvent.newValue)){
			this.setValueState('Error');
		}
		else{
			this.setValueState('Success');
		}
	}
	SuggestedInput.prototype.fireLiveChange = function(oEvent){
		
		//Handle D-bounce
		clearTimeout(this.bufferTimeout);
		
		this.bufferTimeout = setTimeout(function(){
			oEvent.oldValue=this.oldValue;
			this.fireBufferedLiveChange(oEvent);
			this.oldValue=oEvent.newValue;
		}.bind(this),this.getLiveChangeDelay()*1000);
	};
	return SuggestedInput;
});
