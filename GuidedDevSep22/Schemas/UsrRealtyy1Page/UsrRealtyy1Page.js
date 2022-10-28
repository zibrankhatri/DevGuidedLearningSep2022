define("UsrRealtyy1Page", ["RightUtilities","ServiceHelper"], function(RightUtilities, ServiceHelper) {
	return {
		entitySchemaName: "UsrRealtyy",
		attributes: {
			"UsrManager": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"lookupListConfig": {
				/* The array of filters to apply to the query that populates the lookup field with data. */
				"filters": [
					function() {
						var filterGroup = Ext.create("Terrasoft.FilterGroup");
						filterGroup.add("ConnectedUserIsPresentAndActive",
					    Terrasoft.createColumnFilterWithParameter(
						  Terrasoft.ComparisonType.EQUAL,
						  "[SysAdminUnit:Contact:].Active",
							true));
						return filterGroup;
					}
				]
				}
			},
			
			"CanChangePrice": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value        : false
			},
			"CommissionUSD": {
				"dataValueType": Terrasoft.DataValueType.FLOAT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": 0,
				dependencies:[
					{
						columns:["UsrPriceUSD","UsrOfferType"],
						methodName:"calculateCommission"
					}
				]
			},
			
			"UsrOfferType":{
			lookupListConfig:{
				columns:["UsrCommissionMultiplier"]
			}
				}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "UsrRealtyyFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "UsrRealtyy"
				}
			},
			"UsrSchema0bdd075fDetail6eca30a4": {
				"schemaName": "UsrRealtyVisitDetailGrid",
				"entitySchemaName": "UsrRealtyVisit",
				"filter": {
					"detailColumn": "UsrParentRealty",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"UsrComment": {
				"dfc0dc50-e260-495e-bb6a-4d1abae014a9": {
					"uId": "dfc0dc50-e260-495e-bb6a-4d1abae014a9",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 7,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrPriceUSD"
							},
							"rightExpression": {
								"type": 0,
								"value": 999.99,
								"dataValueType": 5
							}
						}
					]
				},
				"0ee2a0e4-d70e-4384-a72f-43843f194e49": {
					"uId": "0ee2a0e4-d70e-4384-a72f-43843f194e49",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 7,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrPriceUSD"
							},
							"rightExpression": {
								"type": 0,
								"value": 100000,
								"dataValueType": 5
							}
						}
					]
				}
			},
			"UsrManager": {
				"b042ab77-f37a-49a7-bb19-fad6f134d621": {
					"uId": "b042ab77-f37a-49a7-bb19-fad6f134d621",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"baseAttributePatch": "Type",
					"comparisonType": 3,
					"autoClean": false,
					"autocomplete": false,
					"type": 0,
					"value": "60733efc-f36b-1410-a883-16d83cab0980",
					"dataValueType": 10
				},
				"eecfe2ae-c899-49f0-a3dc-bc710599fc46": {
					"uId": "eecfe2ae-c899-49f0-a3dc-bc710599fc46",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"baseAttributePatch": "Age",
					"comparisonType": 8,
					"autoClean": false,
					"autocomplete": false,
					"type": 0,
					"value": 25,
					"dataValueType": 4
				}
			},
			"UsrPriceUSD": {
				"97a5da5b-4107-4f53-ad0c-5ddae78b0104": {
					"uId": "97a5da5b-4107-4f53-ad0c-5ddae78b0104",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "CanChangePrice"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			
			setValidationConfig: function() {
				/* Call the initialization of the parent view model's validators. */
				this.callParent(arguments);
				this.addColumnValidator("UsrPriceUSD", this.positiveValueValidator);
				this.addColumnValidator("UsrArea", this.positiveValueValidator);
			},
			
			positiveValueValidator: function(value, column) {
				var msg = "";
				if (value <= 0 || value == null || value == undefined) {
					msg = this.get("Resources.Strings.ValueMustBeGreaterThanZero");
				}
				return {invalidMessage: msg
					   };
			},
			
			calculateCommission: function(){	
				var price = this.get("UsrPriceUSD");
				if(!price){
					price = 0 ;
				}
				var offerTypeObject = this.get("UsrOfferType");
			    var coeff  = 0 ;
				if(offerTypeObject){
						coeff = offerTypeObject.UsrCommissionMultiplier;
				}
				var commission = price * coeff;
				this.set("CommissionUSD", commission);	
			},
			
			onEntityInitialized: function(){
				this.callParent(arguments);
				this.setSecurityAttribute();
				this.calculateCommission();
			},
			
			setSecurityAttribute: function(){
				RightUtilities.checkCanExecuteOperation({
					operation: "CanChangeRealtyPrice"
				},this.getPriceOperationResult, this);
			  },
			getPriceOperationResult: function(result){
				this.set("CanChangePrice", result);
			},
			 
			onMybuttonClick: function(){
			this.console.log("Button pressed");
		    this.showInformationDialog("Button pressed");
			var managerData = {
				value : "3d7eb9d7-4093-4c96-b8d5-6952bf840421",
				displayValue: "Rakesh"
			};
			this.set("UsrManager", managerData);
		},
			getMyButtonEnabled:function(){
				var result = true;
				var name = this.get("UsrName");
				if(!name){
				result = false;
				}
				this.console.log(" 'get button enabled property' method called");
				return result;
			},
			onRunWebServiceButtonClick: function() {
				var typeObject = this.get("UsrType");
				if (!typeObject) {
					return;
				}
				var typeId = typeObject.value;
				var offerTypeObject = this.get("UsrOfferType");
				if (!offerTypeObject) {
					return;
				}
				var offerTypeId = offerTypeObject.value;
				var serviceData = {
					realtyTypeId: typeId,
					realtyOfferTypeId: offerTypeId
				};				
				this.console.log("1");
				ServiceHelper.callService("RealtyService", "GetTotalAmountByTypeId", this.getWebServiceResult, serviceData, this);
				this.console.log("2");
			},
			getWebServiceResult: function(response, success) {
				this.console.log("3");
				this.Terrasoft.showInformation("Total amount by typeId: " + response.GetTotalAmountByTypeIdResult);
			},	
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "UsrName17030e13-10d9-4d7a-88de-0b3f15dfc9c8",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrName",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FLOAT949200a7-6787-40d8-888d-a38864a0cd48",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrPriceUSD",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FLOAT759c3acf-c46d-4b23-b341-aac0b8f89da7",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrArea",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "CommissionControl",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "CommissionUSD",
					"enabled": false,
					"caption": {
						"bindTo": "Resources.Strings.CommissionCaption"
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "MyButton",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.MyCaption"
					},
					"click": {
						"bindTo": "onMybuttonClick"
					},
					"enabled": {
						"bindTo": "getMyButtonEnabled"
					},
					"style": "red",
					"itemType": 5,
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "RunningWebServiceButton",
				"values": {
					"itemType": 5,
					"caption": {
						"bindTo": "Resources.Strings.RunningWebServiceButtonCaption"
					},
					"click": {
						"bindTo": "onRunWebServiceButtonClick"
					},
					"style": "green",
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "ProfileContainer"
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "LOOKUPc2133f05-0b11-4b4f-811a-ffe7bf22ebf0",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "UsrType",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "LOOKUP6d0a160a-0207-4464-9b71-10c178dbd7ee",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "UsrOfferType",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "STRING1e3a8119-5f06-44c1-ad49-62f1f00668b0",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "UsrComment",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "LOOKUP31a45e47-4d94-4e02-a0f2-77756544e3cb",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "UsrManager",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tabc38a63bdTabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tabc38a63bdTabLabelTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrSchema0bdd075fDetail6eca30a4",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tabc38a63bdTabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 1
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "UsrNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 2
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
