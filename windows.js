Ext.define('OCS.ComplainWindow', {
	extend: 'OCS.GridWithFormPanel',
	func : 'crm_complain_list', 
	title: 'Case Form',
	table: 'crm_complain',	
	values: 'crm_id',
//	groupField: 'groupId',
	modelName: 'CRM_COMPLAIN',
	primary: 'case_id',

	createActions: function() {
		var me = this;
		me.actions = [			
			Ext.create('Ext.Action', {
				iconCls : 'add',
				text: 'New ...',
				handler: function(widget, event) {
					me.updateSource(me.defaultRec);
					me.initSource();
				}
			}),
			Ext.create('Ext.Action', {
				iconCls : 'edit',
				text: 'Expand...',
				handler: function(widget, event) {
					me.showForm();
				}
			}),
			Ext.create('Ext.Action', {
				iconCls : 'delete',
				text: 'Delete',
				handler: function(widget, event) {
					me.deleteRecord();
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'calendar',
				text: 'Calendar',
				handler: function(widget, event) {
					var rec = me.grid.getView().getSelectionModel().getSelection()[0];
					googleEvent(rec, me.func);
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'help',
				text: 'Help',
				handler: function(widget, event) {
					new OCS.HelpWindow({
						id: me.func
					}).show();
				}
			})
		];

		return me.actions;
	},

	initSource: function() {
		var me = this;
		me.defaultRec = {
			data: {
				case_id: '0',
				crm_id : me.selected.get('crm_id'),
				_date : Ext.Date.format(new Date(),'Y-m-d H:m:s'),
				closing_date : Ext.Date.format(new Date(),'Y-m-d'),
				userCode : logged,
				priority: 'medium',
				complain_status: 'open',
				complain_origin: 'phone',
				complain_type: 'question',
				phone: me.selected.get('phone'),
				owner: logged,
				case_stage : 'identify',
				groupId: new Date().getTime()
			}			
		}

		me.where = me.selected.get('crm_id');
	},

	createWindow: function() {
		var me = this;
		me.initSource();
		me.panel = me.createGrid();
		me.form.updateSource(me.defaultRec);
		//me.showForm();

		me.win = Ext.create('widget.window', {
			title: me.getCustomerName(me.selected)+' - '+me.title.split(' ')[0],
			closable: true,
			maximizable: true,
			minimizable: true,
			width: 950,
			modal: true,
			minWidth: 650,
			height: 500,
			layout: 'border',
			items: [me.panel],
			listeners: {
				'close': function() {
					if (me.backgrid)
						me.backgrid.getStore().reload();
				}
			}
		});

		me.win.show();
	}
});

Ext.define('OCS.NewDealWindow', {
	extend: 'OCS.GridWithFormPanel',
	func : 'crm_deal_list', 
	title: 'New deal',
	table: 'crm_deals',
	values: 'crm_id',
	groupField: '',
	sortField: 'closing_date',
	modelName: 'CRM_DEAL',
	primary: 'deal_id',

	createActions: function() {
		var me = this;
		me.actions = [
			Ext.create('Ext.Action', {
				iconCls   : 'add',
				text: 'New ...',
				handler: function(widget, event) {
					me.updateSource(me.defaultRec);
					me.initSource();
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'edit',
				text: 'Expand...',
				handler: function(widget, event) {
					me.showForm();
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'delete',
				text: 'Delete',
				handler: function(widget, event) {
					me.deleteRecord();
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'calendar',
				text: 'Calendar',
				handler: function(widget, event) {
					var rec = me.grid.getView().getSelectionModel().getSelection()[0];
					googleEvent(rec, me.func);
				}
			})
		];

		return me.actions;
	},

	initSource: function() {
		var me = this;
		me.defaultRec = {
			data: {
				deal_id: '0',
				status: 'open',
				crm_id : me.selected.get('crm_id'),
				_date : Ext.Date.format(new Date(),'Y-m-d h:m:s'),
				closing_date : Ext.Date.format(new Date(),'Y-m-d'),
				userCode : logged,				
				owner: logged,
				stage: 'lead',
				expected_revenue: '0',
				probablity: '0',
				campaign: me.selected.get('campaign')
			}			
		}

		me.where = me.selected.get('crm_id');
	},

	createWindow: function() {
		var me = this;
		me.initSource();
		me.panel = me.createGrid();
		me.form.updateSource(me.defaultRec);

		me.win = Ext.create('widget.window', {
			title: me.getCustomerName(me.selected)+' - '+me.title,
			closable: true,
			maximizable: true,
			width: 950,
			modal: true,
			minWidth: 650,
			height: 500,
			layout: 'border',		
			items: [me.panel]		
		});

		me.win.show();
	}
});

Ext.define('OCS.PersonalViewWindow', {
	extend: 'OCS.ComplainWindow',
	func : 'crm_personal_view_list', 
	title: 'Personal View Form',
	table: 'crm_personal_view',
	groupField: '',
	values: 'userCode',
	modelName: 'CRM_PERSONAL_VIEW',	

	initSource: function() {
		var me = this;
		me.defaultRec = {
			data: {
				id: '0',
				equals: 'equal',
				_date : Ext.Date.format(new Date(),'Y-m-d h:m:s'),
				userCode: logged
			}
		};

		me.where = logged;
	},

	createWindow: function() {
		var me = this;
		me.initSource();
		me.panel = me.createGrid();
		me.form.updateSource(me.defaultRec);
		me.showForm();

		me.win = Ext.create('widget.window', {
			title:me.title,
			closable: true,
			maximizable: true,
			width: 950,
			modal: true,
			minWidth: 650,
			height: 500,
			layout: 'border',		
			items: [me.panel]		
		});

		me.win.show();
	}
});

Ext.define('OCS.TaskWindow', {
	extend: 'OCS.ComplainWindow',
	func : 'crm_task_list', 
	title: 'Task Form',
	table: 'crm_tasks',
	groupField: '',
	modelName: 'CRM_TASK',	

	initSource: function() {
		var me = this;
		me.defaultRec = {
			data: {
				id: '0',
				deal_id: '0',
				crm_id: me.selected.get('crm_id'),
				userCode: logged,
				owner: logged,
				deal_id: me.selected.get('deal_id'),		
				case_id: me.selected.get('case_id'),		
				priority: 'medium',
				remind_type: 'popup',
				task_status: 'pending',
				duedate : Ext.Date.format(new Date(),'Y-m-d'),
				duetime : '9:00',
				remind_at : Ext.Date.format(new Date(),'Y-m-d'),
				_date: Ext.Date.format(new Date(),'Y-m-d H:m:s')
			}
		};

		me.where = me.selected.get('crm_id');
	}
});

Ext.define('OCS.NotesWindow', {
	extend: 'OCS.ComplainWindow',
	func : 'crm_note_list', 
	title: 'Note Form',
	table: 'crm_notes',
	groupField: '',
	modelName: 'CRM_NOTES',	

	initSource: function() {
		var me = this;
		me.defaultRec = {
			data: {
				id: '0',
				crm_id: me.selected.get('crm_id'),
				owner: logged,
				userCode: logged,
				deal_id:me.selected.get('deal_id'),		
				case_id: me.selected.get('case_id'),		
				_date: Ext.Date.format(new Date(),'Y-m-d H:m:s')
			}
		};

		me.where = me.selected.get('crm_id');
	}
});

Ext.define('OCS.EmailWindow', {
	extend: 'OCS.ComplainWindow',
	func : 'crm_email_list', 
	title: 'Email Form',
	table: 'crm_emails',
	groupField: '',
	modelName: 'CRM_EMAIL',	

	initSource: function() {
		var me = this;
		me.defaultRec = {
			data: {
				id: '0',
				crm_id: me.selected.get('crm_id'),
				email_status: 'draft',
				priority: 'medium',
				owner: logged,
				userCode: logged,
				deal_id:me.selected.get('deal_id'),		
				case_id: me.selected.get('case_id'),		
				_date: Ext.Date.format(new Date(),'Y-m-d H:m:s')
			}
		};

		me.where = me.selected.get('crm_id');
	}
});

Ext.define('OCS.CallLogWindow', {
	extend: 'OCS.ComplainWindow',
	func : 'crm_calllog_list', 
	title: 'Call Form',
	table: 'crm_calllog',
	groupField: '',
	modelName: 'CRM_CALLLOG',

	initSource: function() {
		var me = this;
		me.purpose = 'sales';
		if (me.selected.get('deal_id') > 0)
			me.purpose = 'sales';
		if (me.selected.get('case_id') > 0)
			me.purpose = 'care';

		me.defaultRec = {
			data: {
				id: '0',
				crm_id: me.selected.get('crm_id'),
				deal_id: me.selected.get('deal_id'),		
				case_id: me.selected.get('case_id'),		
				_to: me.selected['phone'],
				userCode: logged,
				owner: logged,
				callresult: 'pending',
				purpose: me.purpose,				
				duration: '0',
				priority: 'medium',				
				_from: 'office',
				calltype: 'outbound',
				_date: Ext.Date.format(new Date(),'Y-m-d H:m:s')
			}			
		}

		me.where = me.selected.get('crm_id');
	}
});

Ext.define('OCS.QuickCallLogWindow', {
	extend: 'OCS.CallLogWindow',

	initSource: function() {
		var me = this;

		me.defaultRec = {
			data: {
				id: '0',
				userCode: logged,
				owner: logged,
				callresult: 'pending',
				duration: '0',
				priority: 'medium',				
				_from: 'office',
				calltype: 'outbound',
				_date: Ext.Date.format(new Date(),'Y-m-d H:m:s')
			}			
		}
	}
});


Ext.define('OCS.EventWindow', {
	extend: 'OCS.ComplainWindow',
	func : 'crm_event_list', 
	title: 'Appointment Form',
	table: 'crm_events',
	groupField: '',
	modelName: 'CRM_EVENT',

	initSource: function() {
		var me = this;
		me.defaultRec = {
			data: {
				id: '0',
				crm_id: me.selected.get('crm_id'),
				deal_id: me.selected.get('deal_id'),		
				case_id: me.selected.get('case_id'),		
				userCode: logged,
				owner: logged,
				remind_type: 'popup',
				event_status: 'pending',
				remind_at: Ext.Date.format(new Date(),'Y-m-d'),
				start_date: Ext.Date.format(new Date(),'Y-m-d'),
				start_time: '9:00',
				priority: 'medium',
				event_type: 'meeting',
				_date: Ext.Date.format(new Date(),'Y-m-d H:m:s')
			}			
		}

		me.where = me.selected.get('crm_id');
	}
});


Ext.define('OCS.ProductWindow', {
	extend: 'OCS.ComplainWindow',
	func : 'crm_deal_product_list', 
	title: 'Product Form',
	table: 'crm_deal_products',
	groupField: '',
	modelName: 'CRM_DEAL_PRODUCTS',

	initSource: function() {
		var me = this;
		me.defaultRec = {
			data: {
				id: '0',
				crm_id:  me.selected.get('crm_id'),
				deal_id: me.selected.get('deal_id'),
				qty: 1,
				_date: Ext.Date.format(new Date(),'Y-m-d H:m:s')
			}
		}
		
		me.values = 'deal_id';
		me.where = me.selected.get('deal_id');
	}
});

Ext.define('OCS.CaseProductWindow', {
	extend: 'OCS.ComplainWindow',
	func : 'crm_case_product_list', 
	title: 'Product Form',
	table: 'crm_case_products',
	groupField: '',
	modelName: 'CRM_CASE_PRODUCTS',

	initSource: function() {
		var me = this;
		me.defaultRec = {
			data: {
				id: '0',
				crm_id:  me.selected.get('crm_id'),
				case_id: me.selected.get('case_id'),						
				_date: Ext.Date.format(new Date(),'Y-m-d H:m:s')
			}
		}

		me.where = me.selected.get('deal_id');
	}
});


Ext.define('OCS.CompetitorWindow', {
	extend: 'OCS.ComplainWindow',
	func : 'crm_deal_competitor_list', 
	title: 'Competitor Form',
	table: 'crm_deal_competitors',
	groupField: '',
	values: 'deal_id',
	modelName: 'CRM_DEAL_COMPETITORS',

	initSource: function() {
		var me = this;
		me.defaultRec = {
			data: {
				id: '0',
				crm_id:  me.selected.get('crm_id'),
				deal_id: me.selected.get('deal_id'),		
				reported_revenue: '0',
				_date: Ext.Date.format(new Date(),'Y-m-d H:m:s')
			}			
		}

		me.where = me.selected.get('deal_id');
	}
});

Ext.define('OCS.SalesTeamWindow', {
	extend: 'OCS.ComplainWindow',
	func : 'crm_deal_sales_team_list', 
	title: 'Sales team',
	table: 'crm_deal_sales_team',
	groupField: '',
	values: 'deal_id',
	modelName: 'CRM_DEAL_SALES_TEAM',

	initSource: function() {
		var me = this;
		me.defaultRec = {
			data: {
				id: '0',
				crm_id:  me.selected.get('crm_id'),
				deal_id: me.selected.get('deal_id'),
				userCode: logged,
				_date: Ext.Date.format(new Date(),'Y-m-d H:m:s')
			}			
		}

		me.where = me.selected.get('deal_id');
	}
});


Ext.define('OCS.CaseStageWindow', {
	extend: 'OCS.Window',
	
	title: 'Case Stage detail',
	maximizable: true,
	height: 360,
	width: 540,	

	nextStage: function(stage) {
		if (stage == 'identify')
			return 'research';
		if (stage == 'research')
			return 'resolve';
		if (stage == 'resolve')
			return 'resolve';
	},

	initComponent: function() {
		var me = this;		

		me.form = Ext.create('OCS.FormPanel', {
			id : 'case_stage_form',				
			title: 'Case detail',	
			region: 'center',
			hidden: false,
			closable: false,
			title: '',
			layout: 'anchor',
			defaults: {
				anchor: '100%',
				labelAlign: 'right',
				labelWidth: 80,
				margin: '15 15 15 15'
			},
			items: [
				{
					xtype: 'container',
					layout: 'hbox',
					defaults: {
						anchor: '100%',
						labelWidth: 80,
						labelAlign: 'right'
					},
					defaultType: 'textfield',
					items: [{
							xtype: 'textfield',
							fieldLabel: 'CRM ID',
							name: 'crm_id',
							hidden: true,
							value: me.selected.get('crm_id'),
							readOnly: true
						},						
						{
							xtype: 'combo',
							fieldLabel: 'Next stage',
							valueField: 'value',
							displayField: 'value',
							name: 'case_stage',
							flex: 1,
							value: me.nextStage(me.selected.get('case_stage')),
							allowBlank: false,
							forceSelection: true,
							queryMode: 'local',
							store: Ext.create('Ext.data.Store', {
							  model: 'CRM_ITEM',
							  data: [{value: 'identify'},{value: 'research'},{value: 'resolve'}]
							})
						},
						{
							xtype: 'datefield',
							fieldLabel: 'Close date',				
							name: 'closing_date',
							value: me.selected.get('closing_date'),
							format: 'Y-m-d'
						}
					]
				},								
				{
					xtype: 'container',
					layout: 'hbox',
					defaultType: 'textfield',
					defaults: {
						anchor: '100%',
						labelAlign: 'right',
						labelWidth: 80
					},
					items: [{
							xtype: 'combo',
							fieldLabel: 'Resolution type',
							valueField: 'value',
							displayField: 'value',
							name: 'resolution_type',
							allowBlank: false,
							forceSelection: true,
							queryMode: 'local',
							store: Ext.create('Ext.data.Store', {
							  model: 'CRM_ITEM',
							  data: [{value: 'problem solved'},{value: 'information provided'}]
							})
						},							
						{
							xtype: 'searchcombo',
							table: 'crm_users',
							fieldLabel: 'Owner',
							name: 'owner',
							margins: '0 0 0 6',
							flex: 1,				
							value: me.selected.get('owner')
						}
					]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					defaultType: 'textfield',
					defaults: {
						anchor: '100%',
						labelAlign: 'right',
						labelWidth: 80
					},
					items: [{
							xtype: 'textfield',
							fieldLabel: 'Бүртгэсэн',				
							name: 'userCode',
							value: logged,
							hidden: true,
							readOnly: true
						}
					]
				},{
					xtype: 'textarea',
					fieldLabel: 'Resolution',
					name: 'resolution',
					emptyText: 'Resolution !',
					style: 'margin:0', 
					flex: 1 
				},
				{
					xtype: 'textarea',
					fieldLabel: 'Description',
					name: 'descr',
					emptyText: 'Тайлбар',
					style: 'margin:0', 
					flex: 1 
				}
			],
			buttons: [{
				text: 'Commit',
				handler: function() {
					var form = this.up('form').getForm();
					if (form.isValid())	{
						var values = form.getValues(true);
						var values_deals = "case_stage='"+form.findField('case_stage').getValue()+"'"+
										   ",closing_date='"+Ext.Date.format(form.findField('closing_date').getValue(),'Y-m-d')+"'"+
										   ",complain_status='open'"+
										   ",owner='"+form.findField('owner').getValue()+"'"+
										   ",resolution='"+form.findField('resolution').getValue()+"'"+
										   ",descr='"+form.findField('descr').getValue()+"'";

						me.selected.data['case_stage'] = form.findField('case_stage').getValue();
						me.selected.data['descr'] = form.findField('descr').getValue();

						Ext.Ajax.request({
						   url: 'avia.php',
						   params: {handle: 'web', table: 'crm_complain', action: 'update', values: values_deals, where: "case_id="+me.selected.get('case_id')},
						   success: function(response, opts) {
							  me.close();
							  views['cases'].reload(me.selected);
						   },
						   failure: function(response, opts) {										   
							  Ext.MessageBox.alert('Status', 'Error !', function() {});
						   }
						});	
					}
					else
					  Ext.MessageBox.alert('Status', 'Invalid data !', function() {});
				}
			}]
		});
		
		me.items = [me.form];
		me.callParent(arguments);
	}
});

Ext.define('OCS.CaseAssignWindow', {
	extend: 'OCS.Window',
	
	title: 'Assign to',
	maximizable: true,
	height: 250,
	width: 300,	

	initComponent: function() {
		var me = this;

		me.form = Ext.create('OCS.FormPanel', {
			id : 'case_assign_to',				
			title: 'Assign to',	
			region: 'center',
			hidden: false,
			closable: false,
			title: '',
			items: [{
				xtype: 'textfield',
				fieldLabel: 'CRM ID',
				name: 'crm_id',
				hidden: true,
				value: me.selected.get('crm_id'),
				readOnly: true
			},{
				xtype: 'searchcombo',
				table: 'crm_users',
				fieldLabel: 'Owner',				
				name: 'owner',
				value: logged
			},				
			{
				xtype: 'textfield',
				fieldLabel: 'Бүртгэсэн',				
				name: 'userCode',
				value: logged,
				hidden: true,
				readOnly: true
			},{
				xtype: 'textarea',
				fieldLabel: 'Тайлбар',
				hideLabel: true,
				name: 'descr',
				value: me.selected.get('descr'),
				emptyText: 'Тайлбар бичнэ үү !',
				style: 'margin:0', 
				flex: 1 
			}],
			buttons: [{
				text: 'Commit',
				handler: function() {
					var form = this.up('form').getForm();
					if (form.isValid())	{
						var values = form.getValues(true);
						var values_deals = "owner='"+form.findField('owner').getValue()+"'"+
										   ",descr='"+form.findField('descr').getValue()+"'";
						if (form.findField('owner').getValue() != logged)
						{						
							Ext.Ajax.request({
							   url: 'avia.php',
							   params: {handle: 'web', table: 'crm_complain', action: 'update', values: values_deals, where: "case_id="+me.selected.get('case_id')},
							   success: function(response, opts) {
									me.writeLog(form.findField('owner').getValue(), form.findField('descr').getValue());							  
							   },
							   failure: function(response, opts) {										   
								  Ext.MessageBox.alert('Status', 'Error !', function() {});
							   }
							});											
						} else
						  Ext.MessageBox.alert('Status', 'Not available !', function() {});
					}
					else
					  Ext.MessageBox.alert('Status', 'Invalid data !', function() {});
				}
			}]
		});
		
		me.items = [me.form];		
		me.callParent(arguments);
	},
	
	writeLog: function(owner,descr) {
		var me = this;
		values = "case_id="+me.selected.get('case_id')+"&owner="+owner+"&descr="+descr+"&_from="+logged;
		Ext.Ajax.request({
		   url: 'avia.php',
		   params: {handle: 'web', table: 'crm_complain_transfer', action: 'insert', values: values},
		   success: function(response, opts) {	
			    Ext.MessageBox.alert('Status', 'Success', function() {});
				me.close();
			    views['cases'].reload(me.selected);
		   },
		   failure: function(response, opts) {										   
				Ext.MessageBox.alert('Status', 'Error !', function() {});
		   }
		});	
	}
});


Ext.define('OCS.CaseResolveWindow', {
	extend: 'OCS.Window',	
	title: 'Case resolve',
	maximizable: true,
	height: 280,
	width: 300,	

	initComponent: function() {
		var me = this;

		me.form = Ext.create('OCS.FormPanel', {
			id : 'case_assign_to',				
			title: 'Case resolve',	
			region: 'center',
			hidden: false,
			closable: false,
			title: '',
			items: [{
				xtype: 'textfield',
				fieldLabel: 'CRM ID',
				name: 'crm_id',
				hidden: true,
				value: me.selected.get('crm_id'),
				readOnly: true
			},{
				xtype: 'textfield',
				fieldLabel: 'Owner',				
				name: 'owner',
				value: logged
			},				
			{
				xtype: 'textfield',
				fieldLabel: 'Бүртгэсэн',				
				name: 'userCode',
				value: logged,
				hidden: true,
				readOnly: true
			},
			{
				xtype: 'combo',
				fieldLabel: 'Resolution type',
				valueField: 'value',
				displayField: 'value',
				name: 'resolution_type',
				allowBlank: false,
				forceSelection: true,
				queryMode: 'local',
				store: Ext.create('Ext.data.Store', {
				  model: 'CRM_ITEM',
				  data: [{value: 'problem solved'},{value: 'information provided'}]
				})
			},{
				xtype: 'textarea',
				fieldLabel: 'Resolution',
				hideLabel: true,
				name: 'resolution',
				emptyText: 'Resolution !',
				style: 'margin:0', 
				flex: 1 
			}],
			buttons: [{
				text: 'Commit',
				handler: function() {
					var form = this.up('form').getForm();
					if (form.isValid())	{
						var values = form.getValues(true);
						var values_deals = "complain_status='solved',case_stage='resolve',closing_date=CURRENT_TIMESTAMP,resolution_type='"+form.findField('resolution_type').getValue()+"'"+
										   ",resolution='"+form.findField('resolution').getValue()+"'";

						Ext.Ajax.request({
						   url: 'avia.php',
						   params: {handle: 'web', table: 'crm_complain', action: 'update', values: values_deals, where: "case_id="+me.selected.get('case_id')},
						   success: function(response, opts) {
							  me.close();
							  views['cases'].reload(me.selected);
						   },
						   failure: function(response, opts) {										   
							  Ext.MessageBox.alert('Status', 'Error !', function() {});
						   }
						});											
					}
					else
					  Ext.MessageBox.alert('Status', 'Invalid data !', function() {});
				}
			}]
		});
		
		me.items = [me.form];		
		me.callParent(arguments);
	}
});