define("UsrRealtyVisitDetailGrid", [], function() {
	return {
		entitySchemaName: "UsrRealtyVisit",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		methods: {
			init: function() {
				this.callParent(arguments);
				this.subscribeForWebsocketEvents();
			},
			destroy: function() {
				this.callParent(arguments);
				this.unsubscribeForWebsocketEvents();
			},
			subscribeForWebsocketEvents: function(){
				this.Terrasoft.ServerChannel.on(this.Terrasoft.EventName.ON_MESSAGE,
						this.onWebsocketMessage, this);
			},
			unsubscribeForWebsocketEvents: function() {
				this.Terrasoft.ServerChannel.un(this.Terrasoft.EventName.ON_MESSAGE,
						this.onWebsocketMessage, this);
			},
			
			onWebsocketMessage: function(scope, message) {
				if (!message) {
					return;	
				}
				if (!message.Header) {
					return;
				}
				if (message.Header.Sender !== "AutoAddVisits") {
					return;
				}
				this.reloadGridData();
			}
		}
	};
});
