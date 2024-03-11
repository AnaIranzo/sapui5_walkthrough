sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
 ], (Controller, MessageToast, Fragment) => {
    "use strict";
 
    return Controller.extend("ui5.walkthrough.controller.HelloPanel", {
       onShowHello() {
          // read msg from i18n model
          const oBundle = this.getView().getModel("i18n").getResourceBundle();
          const sRecipient = this.getView().getModel().getProperty("/recipient/name");
          const sMsg = oBundle.getText("helloMsg", [sRecipient]);
 
          // show message
          MessageToast.show(sMsg);
       },
       onOpenDialog(){
        var oView = this.getView();
        // create dialog lazily

        if (!this.byId("helloDialog")) {
            //load asynchronous XML fragment
            Fragment.load({
                id: oView.getId(),
                name: "ui5.walkthrough.view.HelloDialog",
                controller: this
            }).then(function(oDialog){
                //connect dialog to the root view of thid component (models, lifecicle)
                oView.addDependent(oDialog);
                oDialog.open();
            })
        }else{
            this.byId("helloDialog").open();
        }
    /*     this.pDialog ??= this.loadFragment({
            name: "ui5.walkthrough.view.HelloDialog"
        }); 
    
        this.pDialog.then((oDialog) => oDialog.open());*/
       },
       onCloseDialog: function () {
        this.byId("helloDialog").close();
       }
    });
 });