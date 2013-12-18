Ext.namespace('OSS');
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', 'ux/');
Ext.Loader.setPath('Ext.ux.DataView', 'ux/DataView/');

Ext.require([
	'Ext.data.*',
    'Ext.grid.*',
    'Ext.util.*',
    'Ext.toolbar.*',
	'Ext.form.*',
	'Ext.state.*',
	'Ext.ux.PreviewPlugin',
	'Ext.ProgressBar',
    'Ext.ux.ToolbarDroppable',
    'Ext.ux.BoxReorderer',
	'Ext.toolbar.TextItem',
	'Ext.view.View',
    'Ext.ux.DataView.Animated',
	'Ext.ux.grid.FiltersFeature',
	'Ext.grid.feature.Grouping',
    'Ext.XTemplate',
	'Ext.ux.data.PagingMemoryProxy',
	'Ext.slider.Multi',
	'Ext.ux.CellDragDrop',
	'Ext.ux.form.SearchField'
]);

Ext.onReady(function() {

	Ext.QuickTips.init();

	Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

	function login_request(username,password) {
		Ext.Ajax.request({
		   url: 'avia.php',
		   params: {handle: 'web', action: 'login', where: username+','+password},
		   success: function(response, opts) {
			   if (response.responseText == 'logged')			   
				   location.reload();
			   else
				  Ext.MessageBox.alert('Status', 'Error !', function() {});
		   },
		   failure: function(response, opts) {
				alert('error');
		   }
		});		
	}

	Ext.Ajax.request({
	   url: 'avia.php',
	   params: {handle: 'web', action: 'login'},
	   success: function(response, opts) {
		   Ext.get('loading').remove();
		   if (response.responseText == 'logged')
		   {			  
				new Ext.create('OCS.Viewport', {
					id: 'ocr-viewport',
					layout: 'border',
					margins: '0'
				});	
				//win.show();
		   } else {
				 var win = Ext.create('Ext.panel.Panel', {
				    renderTo: 'way',
					closable: false,
					width: 400,
					cls: 'white',
					height: 350,
					border: false,
					frame: false,
					minWidth: 320,
					minHeight: 350,
					layout: 'fit',
					items: [
						{
							bodyPadding: 100,
							xtype: 'panel',
							frame: false,
							border: false,
							layout: {
								xtype: 'vbox',
								align: 'stretch'
							},
							items: [Ext.create('Ext.Component', {
								height: 50, 
								width: 250,
								autoEl: {
									tag: 'div',
									html:'<span style="font-size: 14px; align:center">Welcome !, Sign with your account</span>'
								}
							}),{
								id: 'username',
								xtype: 'textfield',
								cls: 'login',
								width: 210,
								emptyText: 'user name'
							},
						    {
								id : 'password',
								xtype: 'textfield',
								inputType: 'password',
								emptyText: 'password',
								width: 210,
								cls: 'login',
								enableKeyEvents: true,
								listeners: {
									keyup : function(textfield,eventObject){
										if (eventObject.getCharCode() == Ext.EventObject.ENTER) {
											var user = Ext.getCmp('username').getValue();
											var password = Ext.getCmp('password').getValue();
											login_request(user,password);
										}
									}
								}
						    }]
					   }
					],
					dockedItems: [{
						xtype: 'toolbar',
						dock: 'bottom',
						height: 40,
						cls: 'login-button',
						layout: {
							pack: 'center'
						},
						items: [{
							minWidth: 80,
							text: 'Sign up',
							hidden: true
						},{
							minWidth: 100,
							cls: 'login-button',
							text: 'Sign in',
							handler: function() {
								var user = Ext.getCmp('username').getValue();
								var password = Ext.getCmp('password').getValue();
								login_request(user,password);
							}
						}]
					}]
				});		
		   }
	   },
	   failure: function(response, opts) {
			alert('error');
	   }
	});
});
