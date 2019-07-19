dotcmsFields.loadBundle("q8bf3akl",["exports","./chunk-35cb6fec.js","./chunk-ce967dd2.js"],function(t,e,a){var i=window.dotcmsFields.h,s=function(){function t(){this.value="",this.name="",this.label="",this.hint="",this.required=!1,this.requiredMessage="This field is required",this.validationMessage="The field doesn't comply with the specified format",this.disabled=!1,this.min="",this.max="",this.step="1,1",this.dateLabel="Date",this.timeLabel="Time",this._step={date:null,time:null},this._status={date:null,time:null}}return t.prototype.reset=function(){this._status.date=null,this._status.time=null,this.el.querySelectorAll("dot-input-calendar").forEach(function(t){t.reset()}),this.valueChange.emit({name:this.name,value:""})},t.prototype.componentWillLoad=function(){this.validateProps()},t.prototype.valueWatch=function(){this.value=a.checkProp(this,"value","dateTime"),this._value=a.dotParseDate(this.value)},t.prototype.minWatch=function(){this.min=a.checkProp(this,"min","dateTime"),this._minDateTime=a.dotParseDate(this.min)},t.prototype.maxWatch=function(){this.max=a.checkProp(this,"max","dateTime"),this._maxDateTime=a.dotParseDate(this.max)},t.prototype.stepWatch=function(){var t;this.step=a.checkProp(this,"step")||"1,1",t=this.step.split(","),this._step.date=t[0],this._step.time=t[1]},t.prototype.emitValueChange=function(t){var e=t.detail;t.stopImmediatePropagation(),this.formatValue(e),this.isValueComplete()&&(this.value=this.getValue(),this.valueChange.emit({name:this.name,value:this.value}))},t.prototype.emitStatusChange=function(t){var e,i=t.detail;t.stopImmediatePropagation(),this.setStatus(i),this.setErrorMessageElement(i),this.isStatusComplete()&&(e=this.statusHandler(),this.classNames=a.getClassNames(e,e.dotValid,this.required),this.statusChange.emit({name:this.name,status:e}))},t.prototype.hostData=function(){return{class:this.classNames}},t.prototype.render=function(){return i(e.Fragment,null,i("dot-label",{label:this.label,required:this.required,name:this.name},i("div",{class:"dot-date-time__body","aria-describedby":a.getHintId(this.hint),tabIndex:this.hint?0:null},i("label",null,this.dateLabel,i("dot-input-calendar",{disabled:this.disabled,type:"date",name:this.name+"-date",value:this._value.date,required:this.required,min:this._minDateTime.date,max:this._maxDateTime.date,step:this._step.date})),i("label",null,this.timeLabel,i("dot-input-calendar",{disabled:this.disabled,type:"time",name:this.name+"-time",value:this._value.time,required:this.required,min:this._minDateTime.time,max:this._maxDateTime.time,step:this._step.time})))),a.getTagHint(this.hint),this.errorMessageElement)},t.prototype.validateProps=function(){this.minWatch(),this.maxWatch(),this.stepWatch(),this.valueWatch()},t.prototype.statusHandler=function(){return{dotTouched:this._status.date.dotTouched||this._status.time.dotTouched,dotValid:this._status.date.dotValid&&this._status.time.dotValid,dotPristine:this._status.date.dotPristine&&this._status.time.dotPristine}},t.prototype.formatValue=function(t){t.name.indexOf("-date")>=0?this._value.date=t.value:this._value.time=t.value},t.prototype.getValue=function(){return this._value.date&&this._value.time?this._value.date+" "+this._value.time:""},t.prototype.setStatus=function(t){t.name.indexOf("-date")>=0?this._status.date=t.status:this._status.time=t.status},t.prototype.isValueComplete=function(){return!!this._value.time&&!!this._value.date},t.prototype.isStatusComplete=function(){return this._status.date&&this._status.time},t.prototype.isValid=function(){return!this.isStatusComplete()||!!this.isStatusInRange()},t.prototype.isStatusInRange=function(){return this._status.time.isValidRange&&this._status.date.isValidRange},t.prototype.setErrorMessageElement=function(t){this.errorMessageElement=this.isStatusComplete()?a.getTagError(!this.statusHandler().dotValid&&!this.statusHandler().dotPristine,this.getErrorMessage()):a.getTagError(!t.status.dotPristine,this.getErrorMessage())},t.prototype.getErrorMessage=function(){return this.getValue()?this.isValid()?"":this.validationMessage:this.requiredMessage},Object.defineProperty(t,"is",{get:function(){return"dot-date-time"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{classNames:{state:!0},dateLabel:{type:String,attr:"date-label",reflectToAttr:!0},disabled:{type:Boolean,attr:"disabled",reflectToAttr:!0},el:{elementRef:!0},errorMessageElement:{state:!0},hint:{type:String,attr:"hint",reflectToAttr:!0},label:{type:String,attr:"label",reflectToAttr:!0},max:{type:String,attr:"max",reflectToAttr:!0,mutable:!0,watchCallbacks:["maxWatch"]},min:{type:String,attr:"min",reflectToAttr:!0,mutable:!0,watchCallbacks:["minWatch"]},name:{type:String,attr:"name",reflectToAttr:!0},required:{type:Boolean,attr:"required",reflectToAttr:!0},requiredMessage:{type:String,attr:"required-message",reflectToAttr:!0},reset:{method:!0},step:{type:String,attr:"step",reflectToAttr:!0,mutable:!0,watchCallbacks:["stepWatch"]},timeLabel:{type:String,attr:"time-label",reflectToAttr:!0},validationMessage:{type:String,attr:"validation-message",reflectToAttr:!0},value:{type:String,attr:"value",reflectToAttr:!0,mutable:!0,watchCallbacks:["valueWatch"]}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"valueChange",method:"valueChange",bubbles:!0,cancelable:!0,composed:!0},{name:"statusChange",method:"statusChange",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"_valueChange",method:"emitValueChange"},{name:"_statusChange",method:"emitStatusChange"}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".dot-date-time__body,.dot-date-time__body label{display:-ms-flexbox;display:flex}.dot-date-time__body label{-ms-flex-align:center;align-items:center;-ms-flex-positive:1;flex-grow:1;margin-right:1rem}.dot-date-time__body label:last-child{margin-right:0}.dot-date-time__body label dot-input-calendar{-ms-flex-positive:1;flex-grow:1;margin-left:.5rem}"},enumerable:!0,configurable:!0}),t}();t.DotDateTime=s,Object.defineProperty(t,"__esModule",{value:!0})});