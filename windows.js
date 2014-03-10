Ext.define('OCS.ComplainWindow', {
	extend: 'OCS.GridWithFormPanel',
	func : 'crm_complain_list', 
	title: 'Case Form',
	table: 'crm_complain',	
	values: 'crm_id',
//	groupField: 'groupId',
	buttons: true,
	modelName: 'CRM_COMPLAIN',
	primary: 'case_id',
	xlsName: 'case',
	windowed: true,
	
	filterData: function(views) {
		var me = this;		
		me.title = views;
		me.store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func, values: me.values, where: me.where, views: views};
		me.store.loadPage(1);
	},

	createActions: function() {
		var me = this;
		me.actions = [			
			Ext.create('Ext.Action', {
				iconCls : 'add',
				text: 'New ...',
				disabled: permit(me.xlsName+'_new'),
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
	buttons: true,
	sortField: 'closing_date',
	modelName: 'CRM_DEAL',
	primary: 'deal_id',
	xlsName: 'deal',
	windowed: true,

	createActions: function() {
		var me = this;
		me.actions = [
			Ext.create('Ext.Action', {
				iconCls   : 'add',
				text: 'New ...',
				disabled: permit(me.xlsName+'-new'),
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

Ext.define('OCS.CustomerCampaignWindow', {
	extend: 'OCS.ComplainWindow',
	func : 'crm_customer_campaign_list', 
	title: 'Campaign list',
	table: 'crm_customer_campaigns',
	groupField: '',
	values: 'crm_id',
	primary: 'id',
	modelName: 'CRM_CUSTOMER_CAMPAIGN',	

	initSource: function() {
		var me = this;
		me.defaultRec = {
			data: {
				id: '0',
				crm_id: me.selected.data['crm_id'],
				_date : Ext.Date.format(new Date(),'Y-m-d h:m:s'),
				userCode: logged
			}
		};

		me.where = me.selected.data['crm_id'];
	}
});

Ext.define('OCS.CampaignWindow', {
	extend: 'OCS.ComplainWindow',
	func : 'crm_campaign_list', 
	title: 'Campaigns',
	table: 'crm_campaign',
	groupField: '',
	values: 'userCode',
	modelName: 'CRM_CAMPAIGN',	

	initSource: function() {
		var me = this;
		me.defaultRec = {
			data: {
				id: '0',
				campaign_status: 'planning',
				campaign_live: 'dynamic',
				_date : Ext.Date.format(new Date(),'Y-m-d h:m:s'),
				start_date : Ext.Date.format(new Date(),'Y-m-d'),
				end_date : Ext.Date.format(new Date(),'Y-m-d'),
				personal: me.ids,
				owner: logged,
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
	primary: 'id',

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

Ext.define('OCS.ActivityWindow', {
	extend: 'OCS.ComplainWindow',
	func : 'crm_all_activity_list', 
	title: 'Activities',
	table: 'crm_calendar',
	groupField: '',
	buttons: false,
	modelName: 'CRM_CALENDAR',
	primary: 'id',
	values: '',
	
	createActions: function() {
		var me = this;
		me.actions = [	
			Ext.create('Ext.Action', {
				iconCls: 'list',
				text: 'Views',
				menu: {
					xtype: 'menu',
					items: [						
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Task List',
							handler: function(widget, event) {
								me.filterData('Task List');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Appointment List',
							handler: function(widget, event) {
								me.filterData('Appointment List');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Phone Call List',
							handler: function(widget, event) {
								me.filterData('Phone Call List');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Email List',
							handler: function(widget, event) {
								me.filterData('Email List');
							}
						}),
						'-',
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All Activity List (Case)',
							handler: function(widget, event) {
								me.filterData('All Activity List (Case)');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All Activity List',
							handler: function(widget, event) {
								me.filterData('All Activity List');
							}
						})
					]
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
				id: '0',
			}
		};
	},

	createWindow: function() {
		var me = this;
		me.initSource();
		me.panel = me.createGrid();
		me.form.updateSource(me.defaultRec);

		me.win = Ext.create('widget.window', {
			title: me.title,
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

Ext.define('OCS.NotesWindow', {
	extend: 'OCS.ComplainWindow',
	func : 'crm_note_list', 
	title: 'Note Form',
	table: 'crm_notes',
	groupField: '',
	modelName: 'CRM_NOTES',	
	primary: 'id',

	initSource: function() {
		var me = this;
		var deal_id = me.selected.get('deal_id');
		var case_id = me.selected.get('case_id');
		me.defaultRec = {
			data: {
				id: '0',
				crm_id: me.selected.get('crm_id'),
				owner: logged,
				userCode: logged,
				deal_id: deal_id?deal_id:'0',
				case_id: case_id?case_id:'0',		
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
	primary: 'id',

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
	primary: 'id',

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
	primary: 'id',

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
	primary: 'id',

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
	title: 'Sales-team',
	table: 'crm_deal_sales_team',
	groupField: '',
	values: 'deal_id',
	modelName: 'CRM_DEAL_SALES_TEAM',
	primary: 'id',

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

Ext.define('OCS.PayRollWindow', {
	extend: 'OCS.ComplainWindow',
	func : 'crm_deal_payroll_list', 
	title: 'Payments',
	table: 'crm_deal_payroll',
	groupField: '',
	values: 'deal_id',
	modelName: 'CRM_DEAL_PAYROLL',
	primary: 'id',

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
	openActivity: 0,

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
						var status = 'open';
						if (form.findField('case_stage').getValue() == 'resolve')
							status = 'solved';
						
						if (status == 'solved' && me.openActivity > 0) {
							Ext.MessageBox.alert('Error', 'This case cannot be closed because there are open activities associated with it !', function() {});
							return;
						}

						var values_deals = "case_stage='"+form.findField('case_stage').getValue()+"'"+
										   ",closing_date='"+Ext.Date.format(form.findField('closing_date').getValue(),'Y-m-d')+"'"+
										   ",complain_status='"+status+"'"+
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
		me.title = 'Assign to';
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

Ext.define('OCS.CustomerAssignWindow', {
	extend: 'OCS.Window',
	
	title: 'Assign to',
	maximizable: false,
	height: 350,
	width: 300,	

	initComponent: function() {
		var me = this;
		me.title = 'Assign to ('+(me.ids.split(':').length-1)+' record selected)';
		me.form = Ext.create('OCS.FormPanel', {
			id : 'customer_assign_to',				
			title: 'Assign to',	
			region: 'center',
			hidden: false,
			closable: false,
			title: '',
			items: [{
				xtype: 'textfield',
				fieldLabel: 'Selected '+me.direction,				
				name: 'selected',
				value: me.ids
			},{
				xtype: 'searchcombo',
				table: 'crm_users',
				fieldLabel: 'Owner',				
				name: 'owner',
				value: logged
			},
			{
				xtype: 'textarea',
				fieldLabel: 'Description',				
				name: 'descr',
				flex: 1,
				empty: 'Note...'
			},
			{
				xtype: 'textfield',
				fieldLabel: 'Created by',				
				name: 'userCode',
				value: logged,
				hidden: true,
				readOnly: true
			}],
			buttons: [{
				iconCls: 'commit',
				text: 'Commit',
				handler: function() {
					var form = this.up('form').getForm();
					if (form.isValid())	{
						var values = form.getValues(true);
						values = form.findField('owner').getValue()+","+form.findField('selected').getValue()+","+form.findField('descr').getValue();
												
						Ext.Ajax.request({
						   url: 'avia.php',
						   params: {handle: 'web', table: 'crm_customer', action: 'update_customer_owner', values: values},
						   success: function(response, opts) {
								if (me.direction == 'Contact')
									views['retail'].store.reload();
								if (me.direction == 'Account')
									views['corporate'].store.reload();
								me.close();
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

Ext.define('OCS.DealAssignWindow', {
	extend: 'OCS.Window',
	
	title: 'Assign to',
	maximizable: false,
	height: 250,
	width: 300,	

	initComponent: function() {
		var me = this;
		me.title = 'Assign to ('+(me.ids.split(':').length-1)+' record selected)';
		me.form = Ext.create('OCS.FormPanel', {
			id : 'deal_assign_to',				
			title: 'Assign to',	
			region: 'center',
			hidden: false,
			closable: false,
			title: '',
			items: [{
				xtype: 'textfield',
				fieldLabel: 'Selected '+me.direction,				
				name: 'selected',
				value: me.ids
			},{
				xtype: 'searchcombo',
				table: 'crm_users',
				fieldLabel: 'Owner',				
				name: 'owner',
				value: logged
			},		
			{
				xtype: 'textarea',
				fieldLabel: 'Description',				
				name: 'descr',
				flex: 1,
				empty: 'Note...'
			},		
			{
				xtype: 'textfield',
				fieldLabel: 'Created by',				
				name: 'userCode',
				value: logged,
				hidden: true,
				readOnly: true
			}],
			buttons: [{
				iconCls: 'commit',
				text: 'Commit',
				handler: function() {
					var form = this.up('form').getForm();
					if (form.isValid())	{
						var values = form.getValues(true);
						values = form.findField('owner').getValue()+","+form.findField('selected').getValue()+","+form.findField('descr').getValue();
								
						Ext.Ajax.request({
						   url: 'avia.php',
						   params: {handle: 'web', table: 'crm_deals', action: 'update_deals_owner', values: values},
						   success: function(response, opts) {
								views['deals'].reload();
								me.close();
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

Ext.define('OCS.CampaignActivityAssignWindow', {
	extend: 'OCS.Window',
	
	title: 'Assign to',
	maximizable: false,
	height: 450,
	width: 300,	

	initComponent: function() {
		var me = this;
		me.title = 'Assign to ('+(me.ids.split(':').length-1)+' record selected)';
		me.form = Ext.create('OCS.FormPanel', {
			id : 'campaign_assign_to',				
			title: 'Assign to',	
			region: 'center',
			hidden: false,
			closable: false,
			title: '',
			items: [{
				xtype: 'textfield',
				fieldLabel: 'Selected activities',			
				readOnly: true,
				name: 'selected',
				value: me.ids
			},{
				xtype: 'textfield',
				fieldLabel: 'Campaign',			
				readOnly: true,
				name: 'campaign',
				value: me.direction
			},{
				xtype: 'searchcombo',
				table: 'crm_users',
				fieldLabel: 'Owner',				
				name: 'owner',
				value: logged
			},
			{
				xtype: 'textarea',
				fieldLabel: 'Description',
				name: 'descr',
				emptyText: 'Тайлбар',
				style: 'margin:0', 
				flex: 1
			}],
			buttons: [{
				iconCls: 'commit',
				text: 'Commit',
				handler: function() {
					var form = this.up('form').getForm();
					if (form.isValid())	{
						var values = form.getValues(true);
						values = form.findField('owner').getValue()+","+form.findField('selected').getValue()+","+form.findField('descr').getValue();
								
						Ext.Ajax.request({
						   url: 'avia.php',
						   params: {handle: 'web', table: 'crm_campaign', action: 'update_campaign_activity_owner', values: values},
						   success: function(response, opts) {
								views['campaigns'].refresh();
								me.close();
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

Ext.define('OCS.DealUndoWindow', {
	extend: 'OCS.Window',
	
	title: 'Undo',
	maximizable: false,
	height: 150,
	width: 300,	

	initComponent: function() {
		var me = this;
		me.title = 'Undo ('+(me.ids.split(':').length-1)+' record selected)';
		me.form = Ext.create('OCS.FormPanel', {
			id : 'deal_undo_to',				
			title: 'Undo',	
			region: 'center',
			hidden: false,
			closable: false,
			title: '',
			items: [{
				xtype: 'textfield',
				fieldLabel: 'Selected '+me.direction,				
				name: 'selected',
				value: me.ids
			},{
				xtype: 'combo',
				fieldLabel: 'Stage',
				valueField: 'value',
				displayField: 'value',
				name: 'stage',
				value: 'lead',
				allowBlank: false,
				forceSelection: true,
				queryMode: 'local',
				store: Ext.create('Ext.data.Store', {
				  model: 'CRM_ITEM',
				  data: [{value: 'lead'},{value: 'opportunity'},{value: 'quote'},{value: 'close as won'},{value: 'close as lost'}]
				})
			}],
			buttons: [{
				iconCls: 'commit',
				text: 'Commit',
				handler: function() {
					var form = this.up('form').getForm();
					if (form.isValid())	{
						var values = form.getValues(true);
						values = form.findField('stage').getValue()+","+form.findField('selected').getValue();
								
						Ext.Ajax.request({
						   url: 'avia.php',
						   params: {handle: 'web', table: 'crm_deals', action: 'update_deals_undo', values: values},
						   success: function(response, opts) {
								views['deals'].reload();
								me.close();
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

Ext.define('OCS.DealMoveWindow', {
	extend: 'OCS.Window',
	
	title: 'Move to',
	maximizable: false,
	height: 150,
	width: 300,	
	count: 0,

	initComponent: function() {
		var me = this;
		me.title = 'Move to ('+(me.ids.split(':').length-1)+' record selected)';
		me.form = Ext.create('OCS.FormPanel', {
			id : 'deal_move_to',				
			title: 'Move to',	
			region: 'center',
			hidden: false,
			closable: false,
			title: '',
			items: [{
				xtype: 'textfield',
				fieldLabel: 'Selected '+me.direction,				
				name: 'selected',
				value: me.ids
			},{
				xtype: 'combo',
				fieldLabel: 'Set to',
				valueField: 'id',
				displayField: 'value',
				name: 'move_day',
				value: 15,
				allowBlank: false,
				forceSelection: true,
				queryMode: 'local',
				store: Ext.create('Ext.data.Store', {
				  model: 'CRM_OBJECT',
				  data: [{id: 5, value: '5 days ago'},{id: 10, value: '10 days ago'},{id: 15, value: '15 days ago'},{id: 20, value: '20 days ago'},{id:25, value: '25 days ago'},{id: -5, value: 'after 5 days'},{id: -10, value: 'after 10 days'},{id: -15, value: 'after 15 days'}, {id:-20, value: 'after 20 days'}, {id:-25, value: 'after 25 days'}]
				})
			}],
			buttons: [{
				iconCls: 'commit',
				text: 'Commit',
				handler: function() {
					var form = this.up('form').getForm();
					if (form.isValid())	{
						var values = form.getValues(true);
						values = form.findField('move_day').getValue()+","+form.findField('selected').getValue();
								
						Ext.Ajax.request({
						   url: 'avia.php',
						   params: {handle: 'web', table: 'crm_deals', action: 'update_deals_move', values: values},
						   success: function(response, opts) {
							   if (me.direction == 'Deal')
								views['deals'].reload();
							   else
								views['reseller'].reload();
								me.close();
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

Ext.define('OCS.ResellerUndoWindow', {
	extend: 'OCS.Window',
	
	title: 'Undo',
	maximizable: false,
	height: 150,
	width: 300,	

	initComponent: function() {
		var me = this;

		me.form = Ext.create('OCS.FormPanel', {
			id : 'deal_undo_to',				
			title: 'Undo',	
			region: 'center',
			hidden: false,
			closable: false,
			title: '',
			items: [{
				xtype: 'textfield',
				fieldLabel: 'Selected '+me.direction,				
				name: 'selected',
				value: me.ids
			},{
				xtype: 'combo',
				fieldLabel: 'Stage',
				valueField: 'value',
				displayField: 'value',
				name: 'stage',
				value: 'quote',
				allowBlank: false,
				forceSelection: true,
				queryMode: 'local',
				store: Ext.create('Ext.data.Store', {
				  model: 'CRM_ITEM',
				  data: [{value: 'quote'},{value: 'close as won'}]
				})
			}],
			buttons: [{
				iconCls: 'commit',
				text: 'Commit',
				handler: function() {
					var form = this.up('form').getForm();
					if (form.isValid())	{
						var values = form.getValues(true);
						values = form.findField('stage').getValue()+","+form.findField('selected').getValue();
								
						Ext.Ajax.request({
						   url: 'avia.php',
						   params: {handle: 'web', table: 'crm_deals', action: 'update_deals_undo', values: values},
						   success: function(response, opts) {
								views['reseller'].reload();
								me.close();
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


Ext.define('OCS.MarkCompleteWindow', {
	extend: 'OCS.Window',
	title: 'Mark complete',
	maximizable: true,
	height: 250,
	width: 300,	

	initComponent: function() {
		var me = this;		
		me.form = Ext.create('OCS.FormPanel', {
			region: 'center',
			hidden: false,
			closable: false,
			title: '',
			items: [
				{
					xtype: 'combo',
					store: Ext.create('Ext.data.Store', {
						  model: 'CRM_ITEM',
						  data: [{value: 'processing'},{value: 'completed'},{value: 'closed'}]
					}),
					fieldLabel: 'Status',
					name: 'workflow_status',
					queryMode: 'local',
					displayField: 'value',
					valueField: 'value',
					triggerAction: 'all',
					value: 'completed',
					editable: false
				},
				{
					xtype: 'numberfield',
					name: 'precent',
					fieldLabel: 'Precent',
					value: me.selected.get('precent')
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Owner',				
					name: 'owner',
					value: logged,
					hidden: true,
					readOnly: true
				},{
					xtype: 'textarea',
					fieldLabel: 'Тайлбар',
					hideLabel: true,
					name: 'descr',
					value: me.selected.get('descr'),
					emptyText: 'Note ...',
					style: 'margin:0', 
					flex: 1 
				}
			],
			buttons: [{
				text: 'Commit',
				iconCls: 'commit',
				handler: function() {
					var form = this.up('form').getForm();
					if (form.isValid())	{
						var values = form.getValues(true);
						var precent = form.findField('precent').getValue();
						if (form.findField('workflow_status').getValue() == 'completed')
							precent = 100;
						values = "workflow_status='"+form.findField('workflow_status').getValue()+"',precent="+precent+",owner='"+form.findField('owner').getValue()+"',descr='"+form.findField('descr').getValue()+"'";
						Ext.Ajax.request({
						   url: 'avia.php',
						   params: {handle: 'web', table: 'crm_workflow', action: 'update', values: values, where: "id="+me.selected.get('id')},
						   success: function(response, opts) {
							  me.close();
							  views['workflow'].reload();
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

Ext.define('OCS.MassMailWindow', {
	extend: 'OCS.Window',
	title: 'Auto mail',
	maximizable: true,
	height: 450,
	width: 650,	

	initComponent: function() {
		var me = this;		
		me.form = Ext.create('OCS.FormPanel', {
			region: 'center',
			hidden: false,
			closable: false,			
			title: '',
			items: [{
				xtype: 'textfield',
				fieldLabel: 'From',				
				name: 'from'
			},{
				xtype: 'textfield',
				fieldLabel: 'Subject',				
				name: 'subject'
			},{
				xtype: 'htmleditor',
				name: 'htmlContent', 
				flex: 1,
				anchor: '100%'
			}],
			buttons: [{
				text: 'Start',
				iconCls: 'commit',
				handler: function() {
					
				}
			}]
		});
		
		me.items = [me.form];		
		me.callParent(arguments);
	}
});

Ext.define('OCS.CustomerDetailWindow', {
	extend: 'OCS.Window',
	title: 'Detail',
	maximizable: true,
	height: 600,
	modal: true,
	width: 580,	

	initComponent: function() {
		var me = this;			
		
		if (!me.selected) {
			me.selected = views[pk].selectedRecord();
			me.title = me.getCustomerName(me.selected)
		}

		me.property = new OCS.DetailGrid();
		me.activity = new OCS.DetailActivityGrid();
		me.opportunity = new OCS.OpportunityGrid();
		me.customer_campaings = new OCS.CustomerCampaigns();
		me.customer_company = new OCS.CustomerCompany();
	    me.csales = new OCS.CustomerSalesPanel();
		me.ccase = new OCS.CaseGrid();

		me.items = [{
			xtype: 'tabpanel',
			region: 'center',
			border: false,
			activeTab: 0,
			cls: 'MainPanel',
			tabPosition: 'top',			
			items: [					
				me.property.createPanel(),
				me.activity.createPanel(),
				me.ccase.createPanel(),
				me.opportunity.createPanel(),
				me.csales.createPanel(),
				me.customer_company.createPanel(),
				me.customer_campaings.createPanel()
			]
		}];	
		
		me.updateSource(me.selected);
		me.callParent(arguments);
	},

	updateSource: function(rec) {
		var me = this;				

		me.property.updateSource(rec);
		me.activity.updateSource(rec);
		me.opportunity.updateSource(rec);
		me.customer_campaings.updateSource(rec);
		me.customer_company.updateSource(rec);
		me.ccase.updateSource(rec);
		me.csales.updateSource(rec);

		Ext.getBody().unmask();
	}
});


Ext.define('OCS.ActivityDetailWindow', {
	extend: 'OCS.Window',
	title: 'Activity Detail',
	maximizable: true,
	height: 500,
	modal: false,
	width: 400,	
	modal: true,

	listeners : {
		'close': function() {
			var me = this;
			if (me.backgrid)
				me.backgrid.getStore().reload();
		}
	},

	initComponent: function() {
		var me = this;				

		me.form = Ext.create('OCS.FormPanel', {
			region: 'center',
			hidden: false,
			closable: false,			
			title: '',
			items: [{
				xtype: 'displayfield',
				fieldLabel: 'Activity type',
				readOnly: true,
				name: 'work_type'
			},{
				xtype: 'displayfield',
				fieldLabel: 'Deal name',				
				readOnly: true,
				name: 'deal_name'			
			},{
				xtype: 'displayfield',
				fieldLabel: 'Due date',				
				readOnly: true,
				name: 'days' 
			},{
				xtype: 'displayfield',
				fieldLabel: 'Due time',				
				readOnly: true,
				name: 'times', 
			},{
				xtype: 'displayfield',
				fieldLabel: 'Priority',				
				readOnly: true,
				name: 'priority', 
			},{
				xtype: 'displayfield',
				fieldLabel: 'Status',				
				readOnly: true,
				name: 'status'
			},{
				xtype: 'displayfield',
				fieldLabel: 'Subject',				
				readOnly: true,
				name: 'subject'
			},{
				xtype: 'displayfield',
				fieldLabel: 'Owner',				
				readOnly: true,
				name: 'owner'
			},{
				xtype: 'displayfield',
				fieldLabel: 'Campaign',
				readOnly: true,
				name: 'campaign'
			},{
				xtype: 'displayfield',
				fieldLabel: 'Activity source',
				readOnly: true,
				name: 'source'
			},{
				xtype: 'textarea',
				fieldLabel: 'Descr',	
				readOnly: true,
				height: 140,
				name: 'descr'
			}],
			buttons: [{
				iconCls: 'close',
				text: 'Close',				
				handler: function() {
					me.close();
				}
			},{
				iconCls: 'calendar',
				text: 'Calendar',				
				handler: function() {
					googleEventDynamic(me.selected);
				}
			},{
				iconCls: 'save',
				text: 'Complete',				
				handler: function() {
					me.completeActivity();
				}
			}]
		});
		
		me.selected = me.record;
		me.form.getForm().loadRecord(me.record);

		me.items = [me.form];
		me.callParent(arguments);
	},

	completeActivity: function() {
		var me = this;
		if (me.selected.get('owner') != logged) {
			Ext.MessageBox.alert('Error', 'Not available !', function() {});
			return;
		}
		
		var id = me.selected.get('id');
		if (id.indexOf('_') != -1) {
			var sp = id.split('_');
			id = sp[0];
		}

		if (me.selected.get('work_type') == 'phone call') {
			if (me.selected.get('status') == 'success') {
				Ext.MessageBox.alert('Error', 'Already completed !', function() {});
				return;
			}
			
			if (me.selected.get('source') == 'campaign') {
				new OCS.NewDealWindow({
					selected: me.selected
				}).createWindow();
			}

			Ext.Ajax.request({
			   url: 'avia.php',
			   params: {handle: 'web', table: 'crm_calllog', action: 'update', values: "callresult='success'", where: "id="+id},
			   success: function(response, opts) {
				   if (me.backgrid)
					 me.backgrid.getStore().reload();
				   me.close();
			   },
			   failure: function(response, opts) {										   
				  Ext.MessageBox.alert('Status', 'Error !', function() {});
			   }
			});
		} else
		if (me.selected.get('work_type') == 'email') {
			if (me.selected.get('status') == 'sent') {
				Ext.MessageBox.alert('Error', 'Already completed !', function() {});
				return;
			}
			Ext.Ajax.request({
			   url: 'avia.php',
			   params: {handle: 'web', table: 'crm_emails', action: 'update', values: "email_status='sent'", where: "id="+id},
			   success: function(response, opts) {
				   if (me.backgrid)
					 me.backgrid.getStore().reload();
				   me.close();
			   },
			   failure: function(response, opts) {										   
				  Ext.MessageBox.alert('Status', 'Error !', function() {});
			   }
			});
		} else
		if (me.selected.get('work_type') == 'appointment') {
			if (me.selected.get('status') == 'completed') {
				Ext.MessageBox.alert('Error', 'Already completed !', function() {});
				return;
			}
			Ext.Ajax.request({
			   url: 'avia.php',
			   params: {handle: 'web', table: 'crm_events', action: 'update', values: "event_status='completed'", where: "id="+id},
			   success: function(response, opts) {
				   if (me.backgrid)
					 me.backgrid.getStore().reload();
				   me.close();
			   },
			   failure: function(response, opts) {										   
				  Ext.MessageBox.alert('Status', 'Error !', function() {});
			   }
			});
		}  else
		if (me.selected.get('work_type') == 'task') {
			if (me.selected.get('status') == 'completed') {
				Ext.MessageBox.alert('Error', 'Already completed !', function() {});
				return;
			}
			Ext.Ajax.request({
			   url: 'avia.php',
			   params: {handle: 'web', table: 'crm_tasks', action: 'update', values: "task_status='completed'", where: "id="+id},
			   success: function(response, opts) {
				   if (me.backgrid)
					 me.backgrid.getStore().reload();
				   me.close();
			   },
			   failure: function(response, opts) {										   
				  Ext.MessageBox.alert('Status', 'Error !', function() {});
			   }
			});
		}
	}
});


Ext.define('OCS.CommissionWindow', {
	extend: 'OCS.Window',
	title: 'Commission',
	maximizable: true,
	height: 520,
	modal: false,
	width: 500,	
	modal: true,

	initComponent: function() {
		var me = this;				
		
		me.dealContact = new OCS.DealContactGrid();
		me.form = Ext.create('OCS.FormPanel', {
			region: 'center',
			hidden: false,
			closable: false,			
			title: '',
			flex: 1,
			items: [{
				xtype: 'textfield',
				fieldLabel: 'CRM ID',
				readOnly: true,
				disabled: true,
				hidden: true,
				allowBlank: false,
				//value: me.selected.get('crm_id'),
				name: 'crm_id'
			},{
				xtype: 'textfield',
				fieldLabel: 'Customer',
				readOnly: true,
				name: 'crm_name'
			},{
				xtype: 'textfield',
				fieldLabel: 'Deal ID',
				readOnly: true,
				hidden: true,
				value: me.selected.get('deal_id'),
				disabled: true,
				name: 'deal_id'
			},{
				xtype: 'currencyfield',
				value: 0,
				fieldLabel: 'Amount',
				allowBlank: false,
				name: 'amount' 
			},{
				xtype: 'textfield',
				fieldLabel: 'Created by',				
				readOnly: true,
				hidden: true,
				value: logged,
				name: 'userCode'
			},{
				xtype: 'textfield',
				fieldLabel: 'Owner',				
				readOnly: true,
				value: logged,
				name: 'owner'
			},{
				xtype: 'textarea',
				fieldLabel: 'Description',	
				flex: 1,
				name: 'descr'
			}],
			buttons: [{
				iconCls: 'reset',
				text: 'Reset',				
				handler: function() {
					var form = this.up('form').getForm();
					form.reset();
				}
			},{
				iconCls: 'commit',
				text: 'Commit',				
				handler: function() {
					var form = this.up('form').getForm();
					var values = form.getValues(true);
					if (!form.findField('crm_id').getValue()) {
						Ext.MessageBox.alert('Status', 'Please select a contact !', function() {});
						return;
					}

					if (form.findField('amount').getValue() > 0) {					
						var descr = form.findField('descr').getValue();
						values = "deal_id="+me.selected.get('deal_id')+"&crm_id="+me.selected.get('crm_id')+"&amount="+form.findField('amount').getValue()+"&owner="+form.findField('owner').getValue()+"&descr="+descr+"&userCode="+logged;
						Ext.Ajax.request({
						   url: 'avia.php',
						   params: {handle: 'web', table: 'crm_comission', action: 'insert', values: values, where: ''},
						   success: function(response, opts) {							  
							  me.close();
						   },
						   failure: function(response, opts) {										   
							  Ext.MessageBox.alert('Status', 'Error !', function() {});
						   }
						});	
					} else
						 Ext.MessageBox.alert('Status', 'Amount is empty !', function() {});
				}
			}]
		});
	

		me.items = [{
			xtype: 'panel',
			layout: 'border',
			region: 'south',
			flex: 1,
			border: false,
			items: me.dealContact.createPanel()
		}, me.form];

		me.dealContact.updateSource(me.selected);
		me.dealContact.grid.on('itemclick', function(dv, record, item, index, e) {
				if (me.form) {
					me.form.getForm().findField('crm_id').setValue(record.get('crm_id'));
					me.form.getForm().findField('crm_name').setValue(record.get('crm_name'));				
				}				
			}
		);

		me.callParent(arguments);
	}
});


Ext.define('OCS.DealAddProductWindow', {
	extend: 'OCS.Window',
	title: 'Products',
	maximizable: true,
	height: 600,
	modal: false,
	width: 500,	
	modal: true,	

	initComponent: function() {
		var me = this;				
		
		me.productList = new Ext.create('OCS.GridWithFormPanel', {
			modelName:'CRM_PRODUCT',
			func:'crm_product_list',
			title: 'Products',
			table: 'crm_products',
			tab: 'deal_crm_product_list',
			buttons: true,
			feature: false,
			tbar: false,
			title: 'Available products',
			insert: (user_level==0),
			remove: (user_level==0),	
			defaultRec: {
				data: {
					product_id: '0',
					price: '0'
				}
			}
		});

		me.form = Ext.create('OCS.FormPanel', {
			region: 'center',
			hidden: false,
			closable: false,			
			title: '',
			flex: 1,
			items: [{
				xtype: 'textfield',
				fieldLabel: 'CRM ID',
				readOnly: true,
				disabled: true,
				hidden: true,
				allowBlank: false,
				//value: me.selected.get('crm_id'),
				name: 'crm_id'
			},{
				xtype: 'textfield',
				fieldLabel: 'Product',
				readOnly: true,
				name: 'product_name'
			},{
				xtype: 'textfield',
				fieldLabel: 'Deal ID',
				readOnly: true,
				hidden: true,
				value: me.selected.get('deal_id'),
				disabled: true,
				name: 'deal_id'
			},{
				xtype: 'numberfield',
				value: 0,
				fieldLabel: 'Precent',
				name: 'precent'				
			},{
				xtype: 'numberfield',
				value: 1,
				fieldLabel: 'Qty',
				name: 'qty',
				listeners: {
					'change': function(v) {
						var form = this.up('form').getForm();
						form.findField('amount').setValue(v.getValue()*form.findField('price').getValue());
					}
				}
			},{
				xtype: 'numericfield',
				value: 0,
				decimalPrecision: 2,
			    allowNegative: true,
				useThousandSeparator: true,
		        currencySymbol:'₮',
				fieldLabel: 'Price',
				name: 'price',
				listeners: {
					'change': function(v) {
						var form = this.up('form').getForm();
						form.findField('amount').setValue(v.getValue()*form.findField('qty').getValue());
					}
				} 
			},{
				xtype: 'numericfield',
				value: 0,
				decimalPrecision: 2,
			    allowNegative: true,
				useThousandSeparator: true,
		        currencySymbol:'₮',
//				readOnly: true,
				fieldLabel: 'Amount',
				name: 'amount' 
			},{
				xtype: 'textfield',
				fieldLabel: 'Created by',				
				readOnly: true,
				hidden: true,
				value: logged,
				name: 'userCode'
			},{
				xtype: 'textarea',
				fieldLabel: 'Description',	
				flex: 1,
				name: 'descr'
			}],
			buttons: [{
				iconCls: 'reset',
				text: 'Reset',				
				handler: function() {
					var form = this.up('form').getForm();
					form.reset();
				}
			},{
				iconCls: 'commit',
				text: 'Commit',				
				handler: function() {
					var form = this.up('form').getForm();
					var values = form.getValues(true);
					if (!form.findField('product_name').getValue()) {
						Ext.MessageBox.alert('Status', 'Please select a product !', function() {});
						return;
					}
					
					if (form.findField('precent').getValue() > 0 || form.findField('amount').getValue() > 0) {					
						if (me.record && me.record.get('id')) {
							var descr = form.findField('descr').getValue();
							values = "product_name='"+form.findField('product_name').getValue()+"'&precent="+form.findField('precent').getValue()+"&qty="+form.findField('qty').getValue()+"&price="+form.findField('price').getValue()+"&amount="+form.findField('amount').getValue();
							Ext.Ajax.request({
							   url: 'avia.php',
							   params: {handle: 'web', table: 'crm_deal_products', action: 'update', values: values, where: 'id='+me.record.get('id')},
							   success: function(response, opts) {							  
								  me.close();
							   },
							   failure: function(response, opts) {										   
								  Ext.MessageBox.alert('Status', 'Error !', function() {});
							   }
							});	
						} else {
							var descr = form.findField('descr').getValue();
							values = "deal_id="+me.selected.get('deal_id')+"&crm_id="+me.selected.get('crm_id')+"&product_name="+form.findField('product_name').getValue()+"&precent="+form.findField('precent').getValue()+"&qty="+form.findField('qty').getValue()+"&price="+form.findField('price').getValue()+"&amount="+form.findField('amount').getValue();
							Ext.Ajax.request({
							   url: 'avia.php',
							   params: {handle: 'web', table: 'crm_deal_products', action: 'insert', values: values, where: ''},
							   success: function(response, opts) {							  
								  me.close();
							   },
							   failure: function(response, opts) {										   
								  Ext.MessageBox.alert('Status', 'Error !', function() {});
							   }
							});	
						}
					} else
						 Ext.MessageBox.alert('Status', 'Amount is empty !', function() {});
				}
			}]
		});

		me.items = [{
			xtype: 'panel',
			layout: 'border',
			region: 'south',
			flex: 1,
			border: false,
			items: me.productList.createGrid()
		}, me.form];	

		if (me.record)
			me.form.getForm().loadRecord(me.record);
		
		me.productList.grid.on('itemclick', function(dv, record, item, index, e) {
				if (me.form) {
					me.form.getForm().findField('price').setValue(record.get('price'));
					me.form.getForm().findField('amount').setValue(record.get('price')*me.form.getForm().findField('qty').getValue());
					me.form.getForm().findField('product_name').setValue(record.get('product_name'));				
				}				
			}
		);

		me.callParent(arguments);
	}
});

Ext.define('OCS.DealAddCompetitorWindow', {
	extend: 'OCS.Window',
	title: 'Competitor',
	maximizable: true,
	height: 550,
	modal: false,
	width: 500,	
	modal: true,

	initComponent: function() {
		var me = this;				
		
		me.competitorList = new Ext.create('OCS.GridWithFormPanel', {
			modelName:'CRM_COMPETITOR',
			func:'crm_competitor_list',
			title: 'Competitor',
			table: 'crm_competitors',
			tab: 'deal_crm_competitors_list',
			buttons: true,
			feature: false,
			tbar: false,
			insert: (user_level==0),
			remove: (user_level==0),	
			defaultRec: {
				data: {
					product_id: '0',
					price: '0'
				}
			}
		});

		me.form = Ext.create('OCS.FormPanel', {
			region: 'center',
			hidden: false,
			closable: false,			
			title: '',
			flex: 0.75,
			items: [{
				xtype: 'textfield',
				fieldLabel: 'CRM ID',
				readOnly: true,
				disabled: true,
				hidden: true,
				allowBlank: false,
				//value: me.selected.get('crm_id'),
				name: 'crm_id'
			},{
				xtype: 'textfield',
				fieldLabel: 'Competitor',
				readOnly: true,
				name: 'competitor_name'
			},{
				xtype: 'textfield',
				fieldLabel: 'Deal ID',
				readOnly: true,
				hidden: true,
				value: me.selected.get('deal_id'),
				disabled: true,
				name: 'deal_id'
			},{
				xtype: 'textfield',
				fieldLabel: 'WWW',
				name: 'www'				
			},{
				xtype: 'currencyfield',
				value: 0,
				fieldLabel: 'Reported Revenue',
				allowBlank: false,
				name: 'reported_revenue' 
			},{
				xtype: 'textarea',
				fieldLabel: 'Strength',	
				flex: 1,
				name: 'strength'
			},{
				xtype: 'textarea',
				fieldLabel: 'Weakness',	
				flex: 1,
				name: 'weakness'
			}],
			buttons: [{
				iconCls: 'reset',
				text: 'Reset',				
				handler: function() {
					var form = this.up('form').getForm();
					form.reset();
				}
			},{
				iconCls: 'commit',
				text: 'Commit',				
				handler: function() {
					var form = this.up('form').getForm();
					var values = form.getValues(true);
					if (!form.findField('competitor_name').getValue()) {
						Ext.MessageBox.alert('Status', 'Please select a competitor !', function() {});
						return;
					}

					values = "deal_id="+me.selected.get('deal_id')+"&crm_id="+me.selected.get('crm_id')+"&competitor_name="+
						form.findField('competitor_name').getValue()+"&reported_revenue="+form.findField('reported_revenue').getValue()+"&strength="+form.findField('strength').getValue()
						+"&weakness="+form.findField('weakness').getValue()+"&www="+form.findField('www').getValue();
					Ext.Ajax.request({
					   url: 'avia.php',
					   params: {handle: 'web', table: 'crm_deal_competitors', action: 'insert', values: values, where: ''},
					   success: function(response, opts) {							  
						  me.close();
					   },
					   failure: function(response, opts) {										   
						  Ext.MessageBox.alert('Status', 'Error !', function() {});
					   }
					});	
				}
			}]
		});
	


		me.items = [{
			xtype: 'panel',
			layout: 'border',
			region: 'south',
			flex: 1,
			border: false,
			items: me.competitorList.createGrid()
		}, me.form];	
		
		me.competitorList.grid.on('itemclick', function(dv, record, item, index, e) {
				if (me.form) {
					me.form.getForm().findField('competitor_name').setValue(record.get('competitor_name'));				
					me.form.getForm().findField('www').setValue(record.get('www'));				
				}				
			}
		);

		me.callParent(arguments);
	}
});

Ext.define('OCS.ResellerCreateWindow', {
	extend: 'OCS.Window',
	title: 'Create connections',
	maximizable: true,
	height: 400,
	modal: false,
	width: 800,	
	modal: true,

	initComponent: function() {
		var me = this;
		
		me.views = Ext.create('OCS.ResellerContactView', {
			flex: 1,
			region: 'center'
		});
		
		me.form = Ext.create('OCS.FormPanel', {
			id: 'connection_form',
			region: 'east',
			hidden: true,
			closable: false,			
			title: '',
			flex: 0.75,
			items: [{
				xtype: 'textfield',
				fieldLabel: 'Selected',
				allowBlank: false,
				readOnly: true,
				name: 'selected'
			},{
				xtype: 'textfield',
				fieldLabel: 'Topic name',
				allowBlank: false,
				name: 'deal'
			},{
				xtype: 'numberfield',
				value: me.yearValue(),
				fieldLabel: 'Year',
				allowBlank: false,
				name: 'year'
			},{
				xtype: 'numberfield',
				value: me.monthValue(),
				fieldLabel: 'Month',
				allowBlank: false,
				name: 'month' 
			},{
				xtype: 'searchcombo',
				fieldLabel: 'Owner',
				value: logged,
				name: 'owner'
			},{
				xtype: 'textfield',
				fieldLabel: 'Created by',				
				readOnly: true,
				hidden: true,
				value: logged,
				name: 'userCode'
			},{
				xtype: 'textarea',
				fieldLabel: 'Description',	
				flex: 1,
				name: 'descr'
			}],
			buttons: [{
				iconCls: 'reset',
				text: 'Reset',				
				handler: function() {
					var form = this.up('form').getForm();
					form.reset();
				}
			},{
				iconCls: 'commit',
				text: 'Commit',				
				handler: function() {
					var form = this.up('form').getForm();
					if (form.isValid())	{
						var values = form.getValues(true);

						values = form.findField('deal').getValue()+"&"+form.findField('owner').getValue()+"&"+form.findField('descr').getValue()+"&"+form.findField('year').getValue()+"&"+form.findField('month').getValue();
						Ext.Ajax.request({
						   url: 'avia.php',
						   params: {handle: 'web', table: 'crm_deals', action: 'insert_reseller_deals', values: values, where: form.findField('selected').getValue()},
						   success: function(response, opts) {							  
							   Ext.MessageBox.alert('Status', response.responseText+' records', function() {});
							   views['reseller'].reload();
							   me.close();
						   },
						   failure: function(response, opts) {										   
							  Ext.MessageBox.alert('Status', 'Error !', function() {});
						   }
						});
					}
				}
			}]
		});
		
		me.views.form = me.form;
		me.items = [me.views.createView(), me.form];		

		me.callParent(arguments);
	},

	yearValue: function() {
		return new Date().getFullYear();
	},
	
	monthValue: function() {
		return new Date().getMonth()+1;
	}
});

Ext.define('OCS.AddToCampaignWindow', {
	extend: 'OCS.Window',
	title: 'Add to Campaign',
	maximizable: true,
	height: 500,
	modal: false,
	width: 650,	
	modal: true, 
	border: false,

	initComponent: function() {
		var me = this;				
		
		me.view = Ext.create('OCS.CampaignContactView', {
			flex: 1,
			title: 'Campaign members',
			region: 'center',
			border: true
		});

		me.form = Ext.create('OCS.FormPanel', {
			id: 'add_to_campaign_form',
			region: 'center',
			flex: 0.5,
			closable: false,
			border: true,
			hidden : false,
			title: '',
			items: [{
				xtype: 'textfield',
				fieldLabel: 'Selected',
				allowBlank: false,
				value: me.ids,
				readOnly: true,
				name: 'selected'
			},{
				xtype: 'searchcombo',
				fieldLabel: 'Campaign name',
				allowBlank: false,
				table: 'crm_campaign',
				name: 'campaign',
				listeners: {
					change: function(field, newValue, oldValue) {
						me.view.loadStore(newValue);
					}
				}
			}],
			buttons: [{
				iconCls: 'reset',
				text: 'Reset',				
				handler: function() {
					var form = this.up('form').getForm();
					form.reset();
				}
			},{
				iconCls: 'commit',
				text: 'Commit',				
				handler: function() {
					var form = this.up('form').getForm();
					if (form.isValid())	{
						var values = form.getValues(true);
						var ids = me.ids;
						me.campaign = form.findField('campaign').getValue();
						Ext.Ajax.request({
						   url: 'avia.php',
						   params: {handle: 'web', table: 'crm_campaign', action: 'add_to_campaign_customer', values: ids, where: form.findField('campaign').getValue()},
						   success: function(response, opts) {							  
							   Ext.MessageBox.alert('Status', response.responseText, function() {
								   me.view.loadStore(me.campaign);
							   });								
						   },
						   failure: function(response, opts) {										   
							  Ext.MessageBox.alert('Status', 'Error !', function() {});
						   }
						});
					}
				}
			}]
		});
		
		me.items = [{
			xtype: 'panel',
			layout: 'border',
			region: 'north',
			flex: 0.3,
			border: false,
			split: true,
			items: [me.form]				
		}, me.view.createView()];		

		me.callParent(arguments);
	}
});

Ext.define('OCS.PermissionWindow', {
	extend: 'OCS.Window',
	title: 'Permission table',
	maximizable: true,
	height: 520,
	modal: false,
	width: 700,	
	modal: true,

	initComponent: function() {
		var me = this;				

		me.perm = [
			['contact-new','Contact-New'],
			['contact-delete','Contact-Delete'],
			['contact-expand','Contact-Expand'],
			['contact-assign','Contact-Assign'],
			['account-new','Account-New'],
			['account-delete','Account-Delete'],
			['account-expand','Account-Expand'],
			['account-assign','Account-Assign'],
			['deal-create','Deal-New'],
			['deal-assign','Deal-Assign'],
			['deal-delete','Deal-Delete'],
			['case-create','Case-New'],
			['campaign-create','Campaign-New']
		];

		me.store = new Ext.data.ArrayStore({
			fields: [
			   {name: 'value'},
			   {name: 'text'}
			]
		});
		me.store.loadData(me.perm);
		me.values = [];
		if (me.selected.get('permission'))
			me.values = me.selected.get('permission').split(',');

		me.form = Ext.widget('form', {
			region: 'center',
			layout: 'border',
			bodyPadding: 10,
			border: false,
			items:[{
				xtype: 'itemselector',
				name: 'permission',
				id: 'itemselector-field',
				region: 'center',
				flex: 1,
				fieldLabel: 'Action list',
				imagePath: 'ux/css/images/',
				store: me.store,
				displayField: 'text',
				valueField: 'value',
				value: me.values,
				allowBlank: false,
				msgTarget: 'side',
				fromTitle: 'Accepted',
				toTitle: 'Denied'
			}],
			buttons: [{
				iconCls: 'reset',
				text: 'Reset',				
				handler: function() {
					var form = this.up('form').getForm();
					form.reset();
				}
			},{
				iconCls: 'commit',
				text: 'Commit',				
				handler: function() {
					var form = this.up('form').getForm();
                    if (form.isValid()){
                        var values = form.getValues(true);
						var v = form.findField('permission').getValue();
						values = "permission='"+v+"'";						
				
						Ext.Ajax.request({
						   url: 'avia.php',
						   params: {handle: 'web', table: 'crm_users', action: 'update', values: values, where: "owner='"+me.selected.get('owner')+"'"},
						   success: function(response, opts) {
							  me.close();
						   },
						   failure: function(response, opts) {										   
							  Ext.MessageBox.alert('Status', 'Error !', function() {});
						   }
						});
                    }
				}
			}]
		});


		me.items = [me.form];
		me.callParent(arguments);
	}
});


Ext.define('OCS.AddNoteWindow', {
	extend: 'OCS.Window',
	title: 'Add note',
	maximizable: true,
	height: 550,
	modal: false,
	width: 500,	
	modal: true,

	initComponent: function() {
		var me = this;								

		me.form = Ext.create('OCS.FormPanel', {
			region: 'center',
			hidden: false,
			closable: false,			
			title: '',
			flex: 0.75,
			items: [{
				xtype: 'textfield',
				fieldLabel: 'CRM ID',
				readOnly: true,
				disabled: true,
				hidden: true,
				allowBlank: false,
				//value: me.selected.get('crm_id'),
				name: 'crm_id'
			},{
				xtype: 'textfield',
				fieldLabel: 'Deal ID',
				readOnly: true,
				hidden: true,
				value: me.selected.get('deal_id'),
				disabled: true,
				name: 'deal_id'
			},{
				xtype: 'textarea',
				fieldLabel: 'Note',	
				flex: 1,
				name: 'descr'
			},{
				xtype: 'textfield',
				fieldLabel: 'Link',
				name: 'www'				
			},{
				id: 'upload-name',
				name: 'upload-name',
				xtype: 'textfield',
				fieldLabel: 'Name',
				value: this.name,
				width: 430
			},{
				xtype: 'filefield',
				id: 'form-file',
				emptyText: 'Select an file',
				fieldLabel: 'File',
				name: 'xls-path',
				width: 430,
				buttonText: '',
				buttonConfig: {
					iconCls: 'upload-icon'
				}
			}],
			buttons: [{
				iconCls: 'reset',
				text: 'Reset',				
				handler: function() {
					var form = this.up('form').getForm();
					form.reset();
				}
			},{
				iconCls: 'commit',
				text: 'Commit',				
				handler: function() {
					var form = this.up('form').getForm();
					
				}
			}]
		});
	


		me.items = [{
			xtype: 'panel',
			layout: 'border',
			region: 'center',
			flex: 1,
			border: false,
			items: []
		}, me.form];	
	
		me.callParent(arguments);
	}
});
