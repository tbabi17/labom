Ext.define('OCS.SalesFunnel', {
	extend: 'Ext.chart.Chart',
	animate: true,
	shadow: false,
	legend: {
		position: 'right'
	},
	insetPadding: 50,
	theme: 'Base:gradients',

	initComponent: function() {
		var me = this;
		
		me.store = Ext.create('Ext.data.Store', {
			fields: ['name', 'value'],
			proxy: {				
				type: 'ajax',
    			url: 'avia.php',
				actionMethods: {
					create : 'POST',
					read   : 'POST',
					update : 'POST',
					destroy: 'POST'
				},
    	        reader: {
    	            root:'items',
    	            totalProperty: 'results'
    	        },				
				simpleSortMode: true,
				extraParams: {handle: 'web', action: 'select', func: 'crm_deal_funnel_list'}
			}
		});
		
		me.reloadData();

		me.series = [{
			type: 'pie',
			field: 'value',
			showInLegend: true,
			donut: false,
			tips: {
			  trackMouse: true,
			  width: 140,
			  height: 28,
			  renderer: function(storeItem, item) {				
				this.setTitle(storeItem.get('name') + ': ' + storeItem.get('value'));
			  }
			},
			highlight: {
			  segment: {
				margin: 5
			  }
			},
			label: {
				field: 'name',
				display: 'rotate',
				contrast: true,
				font: '11px Segoe UI'		
			}
		}];

		me.callParent(arguments);
	},

	reloadData: function() {
		var me = this;
		me.store.load();
	}
});

Ext.define('OCS.CampaignChartRevenue', {
	extend: 'Ext.chart.Chart',
	animate: true,
	shadow: false,
	insetPadding: 50,
	legend: {
		position: 'bottom'
	},

	initComponent: function() {
		var me = this;

		me.store = Ext.create('Ext.data.Store', {
			fields: ['campaign_type', 'campaign_target', 'campaign_cost', 'actual_revenue', 'in_progress'],
			proxy: {				
				type: 'ajax',
    			url: 'avia.php',
				actionMethods: {
					create : 'POST',
					read   : 'POST',
					update : 'POST',
					destroy: 'POST'
				},
    	        reader: {
    	            root:'items',
    	            totalProperty: 'results'
    	        },				
				simpleSortMode: true,
				extraParams: {handle: 'web', action: 'select', func: 'crm_campaign_by_revenue_list', start_date: new Date(new Date().getFullYear(), 0, 1), end_date: new Date(new Date().getFullYear(), 11, 31)}
			}
		});	

		me.reloadData();

		me.axes = [{
			type: 'Numeric',
			position: 'left',
			fields: ['campaign_target', 'campaign_cost', 'actual_revenue', 'in_progress'],
			title: false,
			grid: false,
			majorTickSteps: 1,
			minimum: 0,
			label: {
				renderer: function(v) {
					return String(v).replace(/(.)00000$/, '.$1M');
				}
			}
		}, {
			type: 'Category',
			position: 'bottom',
			fields: ['campaign_type'],
			title: true
		}];

		me.series = [{
			type: 'column',
			axis: 'bottom',
			gutter: 80,
			xField: 'campaign_type',
			yField: ['campaign_cost', 'in_progress', 'actual_revenue', 'campaign_target'],
			tips: {
				trackMouse: true,
				width: 65,
				height: 28,
				renderer: function(storeItem, item) {
					this.setTitle(String(item.value[1] / 1000000) + 'M');
				}
			}
		}];
		
		me.callParent(arguments);
	},

	reloadData: function() {
		var me = this;
		me.store.load();
	},

	rangeData: function(e1, e2) {
		var me = this;
		me.store.getProxy().extraParams = {handle: 'web', action: 'select', func: 'crm_campaign_by_revenue_list', start_date: e1, end_date: e2};
		me.store.load();
	}
});


Ext.define('OCS.OpportunityRevenueChart', {
	extend: 'Ext.chart.Chart',
	animate: true,
	shadow: false,
	insetPadding: 50,
	legend: {
		position: 'bottom'
	},

	initComponent: function() {
		var me = this;
		me.start = me.month();
		me.end = me.nextmonth();
		me.store = Ext.create('Ext.data.Store', {
			fields: ['owner', 'team', 'actual_revenue', 'expected_revenue', 'target_revenue'],
			groupField: 'team',
			proxy: {				
				type: 'ajax',
    			url: 'avia.php',
				actionMethods: {
					create : 'POST',
					read   : 'POST',
					update : 'POST',
					destroy: 'POST'
				},
    	        reader: {
    	            root:'items',
    	            totalProperty: 'results'
    	        },				
				simpleSortMode: true,
				extraParams: {handle: 'web', action: 'select', func: 'crm_opportunity_by_revenue_list', start_date: new Date(new Date().getFullYear(), 0, 1), end_date: new Date(new Date().getFullYear(), 11, 31), values: 'user_level', where: 0}
			}
		});

		me.rangeData(me.month(), me.nextmonth());

		me.axes = [{
			type: 'Numeric',
			position: 'left',
			fields: ['actual_revenue', 'expected_revenue', 'target_revenue'],
			title: false,
			grid: false,
			majorTickSteps: 0,
			minimum: 0,
			label: {
				renderer: function(v) {
					return String(v).replace(/(.)00000$/, '.$1M');
				}
			}
		}, {
			type: 'Category',
			position: 'bottom',
			fields: ['owner', 'team'],
			label   : {
	             rotation:{
					 degrees:345
				 }
	        },
			title: true
		}];

		me.series = [{
			type: 'column',
			axis: 'bottom',
			gutter: 80,
			xField: 'owner',
			yField: ['actual_revenue', 'expected_revenue', 'target_revenue'],
//			stacked: true,
			tips: {
				trackMouse: true,
				width: 150,
				height: 28,
				renderer: function(storeItem, item) {
					this.setTitle(item.value[0]+' '+String(item.value[1] / 1000000) + 'M');
				}
			}
		}];

		me.callParent(arguments);
	},

	reloadData: function() {
		var me = this;
		me.store.load();
	},

	rangeData: function(e1, e2) {
		var me = this;
		me.store.getProxy().extraParams = {handle: 'web', action: 'select', func: 'crm_opportunity_by_revenue_list', start_date: e1, end_date: e2, values: 'user_level', where: 0};
		me.store.load();
	},

	createWindow: function() {
		var me = this;

		me.grid = new Ext.create('Ext.grid.Panel', {
			selType: 'checkboxmodel',
			store: me.store,
			region: 'center',
			border: false,
			features : [{
				ftype: 'grouping',
				groupHeaderTpl: '{columnName}: {name} ({rows.length} бичлэг)',
				hideGroupedHeader: true,
				startCollapsed: false,
				id: 'grouping_opportunity_chart'
			}],
			flex: 1,
			columns : [
                {text: "owner", flex: 1, dataIndex: 'owner', renderer: renderOwner, sortable: true},
                {text: "team", width: 120, dataIndex: 'team'},
                {text: "actual_revenue", width: 115, dataIndex: 'actual_revenue', align: 'right', renderer: renderMoney, sortable: true},
                {text: "expected_revenue", width: 115, dataIndex: 'expected_revenue', align: 'right', renderer: renderMoney, sortable: true},
                {text: "target_revenue", width: 115, dataIndex: 'target_revenue', renderer: renderMoney, align: 'right', sortable: true}
            ],
			buttons: [{
				text: 'Reset',
				iconCls: 'reset',
				handler: function() {
					me.store.clearFilter();
				}
			},{
				text: 'View',
				iconCls: 'commit',
				handler: function() {
					var records = me.grid.getView().getSelectionModel().getSelection();
					var owners = '';
					for (i = 0;  i < records.length; i++) {
						var rec = records[i];
						owners += rec.get('owner')+',';
					}

					me.store.filter(function(r) {
						var value = r.get('owner');
						return (owners.indexOf(value+',') != -1);
					});
				}
			}]
		});

		me.win = new Ext.create('Ext.Window', {
			title: 'Filter',
			width: 600,
			height: 350,
			layout: 'border',
			items: me.grid
		});
		
		me.win.show();
	},

	yearValue: function() {
		return new Date().getFullYear();
	},

	monthValue: function() {
		return new Date().getMonth()+1;
	},

	today: function() {
		var now = new Date();
		return Ext.Date.format(now, 'Y-m-d');
	},

	tommorow: function() {
		 var today = new Date();
		 var d = today.getDate();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y, m, d+1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	},

	month: function() {
		 var today = new Date();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y, m, 1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	},
	
	prevmonth: function() {
		 var today = new Date();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y, m-1, 1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	},

	nextmonth: function() {
		 var today = new Date();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y, m+1, 1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	},

	monday: function() {
		var today = new Date();
		var day = today.getDay() || 7;
		if( day !== 1 )
		    today.setHours(-24 * (day - 1)); 
		var ndate=Ext.Date.format(today, 'Y-m-d');
		return ndate;
	},

	year: function() {
		 var today = new Date();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y, 0, 1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	},

	nextyear: function() {
		 var today = new Date();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y+1, 0, 1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	}
});

Ext.define('OCS.StatUserChart', {
	extend: 'Ext.chart.Chart',
	animate: true,
	shadow: false,
	insetPadding: 50,
	legend: {
		position: 'bottom'
	},

	initComponent: function() {
		var me = this;

		me.store = Ext.create('Ext.data.Store', {
			fields: ['stat_type', 'actual', 'planning'],
			proxy: {				
				type: 'ajax',
    			url: 'avia.php',
				actionMethods: {
					create : 'POST',
					read   : 'POST',
					update : 'POST',
					destroy: 'POST'
				},
    	        reader: {
    	            root:'items',
    	            totalProperty: 'results'
    	        },				
				simpleSortMode: true,
				extraParams: {handle: 'web', action: 'select', func: 'crm_user_stat_by_summary_list', values: '', where: 0, start_date: new Date().getFullYear(), end_date: new Date().getMonth()+1}
			}
		});

		me.reloadData();

		me.axes = [{
			type: 'Numeric',
			position: 'left',
			fields: ['actual', 'planning'],
			title: false,
			grid: false,
			majorTickSteps: 0,
			minimum: 0			
		}, {
			type: 'Category',
			position: 'bottom',
			fields: ['stat_type'],
			label   : {
	             rotation:{
					 degrees:345
				 }
	        },
			title: true
		}];

		me.series = [{
			type: 'column',
			axis: 'bottom',
			gutter: 80,
			xField: 'stat_type',
			yField: ['actual', 'planning'],
//			stacked: true,
			tips: {
				trackMouse: true,
				width: 150,
				height: 28,
				renderer: function(storeItem, item) {
					this.setTitle(item.value[0]+' '+String(item.value[1]));
				}
			}
		}];

		me.callParent(arguments);
	},

	reloadData: function() {
		var me = this;
		me.store.load();
	},

	rangeData: function(e1, e2) {
		var me = this;
		me.store.getProxy().extraParams = {handle: 'web', action: 'select', func: 'crm_user_stat_by_summary_list', start_date: e1, end_date: e2, values: '', where: 0};
		me.store.load();
	},

	createWindow: function() {
		var me = this;

		me.grid = new Ext.create('Ext.grid.Panel', {
			selType: 'checkboxmodel',
			store: me.store,
			region: 'center',
			border: false,
			flex: 1,
			columns : [
                {text: "owner", width: 120, dataIndex: 'owner', renderer: renderOwner, sortable: true},
                {text: "actual_revenue", flex: 1, dataIndex: 'actual_revenue', align: 'right', renderer: renderMoney, sortable: true},
                {text: "expected_revenue", width: 125, dataIndex: 'expected_revenue', align: 'right', renderer: renderMoney, sortable: true},
                {text: "target_revenue", width: 125, dataIndex: 'target_revenue', renderer: renderMoney, align: 'right', sortable: true}
            ],
			buttons: [{
				text: 'Reset',
				iconCls: 'reset',
				handler: function() {
					me.store.clearFilter();
				}
			},{
				text: 'View',
				iconCls: 'commit',
				handler: function() {
					var records = me.grid.getView().getSelectionModel().getSelection();
					var owners = '';
					for (i = 0;  i < records.length; i++) {
						var rec = records[i];
						owners += rec.get('owner')+',';
					}

					me.store.filter(function(r) {
						var value = r.get('owner');
						return (owners.indexOf(value+',') != -1);
					});
				}
			}]
		});

		me.win = new Ext.create('Ext.Window', {
			title: 'Filter',
			width: 500,
			height: 350,
			layout: 'border',
			items: me.grid
		});
		
		me.win.show();
	},
	
	yearValue: function() {
		return new Date().getFullYear();
	},

	monthValue: function() {
		return new Date().getMonth()+1;
	},

	today: function() {
		var now = new Date();
		return Ext.Date.format(now, 'Y-m-d');
	},

	tommorow: function() {
		 var today = new Date();
		 var d = today.getDate();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y, m, d+1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	},

	month: function() {
		 var today = new Date();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y, m, 1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	},
	
	prevmonth: function() {
		 var today = new Date();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y, m-1, 1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	},

	nextmonth: function() {
		 var today = new Date();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y, m+1, 1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	},

	monday: function() {
		var today = new Date();
		var day = today.getDay() || 7;
		if( day !== 1 )
		    today.setHours(-24 * (day - 1)); 
		var ndate=Ext.Date.format(today, 'Y-m-d');
		return ndate;
	},

	year: function() {
		 var today = new Date();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y, 0, 1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	},

	nextyear: function() {
		 var today = new Date();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y+1, 0, 1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	}
});

Ext.define('OCS.CampaignChartSuccess', {
	extend: 'Ext.chart.Chart',
	animate: true,
	shadow: true,
	insetPadding: 50,
	legend: {
		position: 'bottom'
	},

	initComponent: function() {
		var me = this;

		me.store = Ext.create('Ext.data.Store', {
			fields: ['campaign_type', 'target', 'success', 'unsuccess', 'pending'],
			proxy: {				
				type: 'ajax',
    			url: 'avia.php',
				actionMethods: {
					create : 'POST',
					read   : 'POST',
					update : 'POST',
					destroy: 'POST'
				},
    	        reader: {
    	            root:'items',
    	            totalProperty: 'results'
    	        },				
				simpleSortMode: true,
				extraParams: {handle: 'web', action: 'select', func: 'crm_campaign_by_status_list'}
			}
		});
		
		me.reloadData();

		me.axes = [{
			type: 'Numeric',
			position: 'left',
			fields: ['target', 'success', 'unsuccess', 'pending'],
			title: false,
			grid: false,
			majorTickSteps: 1,
			minimum: 0
		}, {
			type: 'Category',
			position: 'bottom',
			fields: ['campaign_type'],
			title: true
		}];

		me.series = [{
			type: 'column',
			axis: 'bottom',
			gutter: 80,
			xField: 'campaign_type',
			yField: ['target', 'success', 'unsuccess', 'pending'],
			stacked: true,
			tips: {
				trackMouse: true,
				width: 65,
				height: 28,
				renderer: function(storeItem, item) {
					this.setTitle(String(item.value[1]));
				}
			}
		}];

		me.callParent(arguments);
	},

	reloadData: function() {
		var me = this;
		me.store.load();
	}
});


Ext.define('OCS.CasesByStatus', {
	extend: 'Ext.chart.Chart',
	animate: true,
	shadow: false,
	insetPadding: 30,
	legend: {
		position: 'bottom'
	},

	initComponent: function() {
		var me = this;
		
		me.store = Ext.create('Ext.data.JsonStore', {
			fields: ['name', 'value'],
			proxy: {				
				type: 'ajax',
    			url: 'avia.php',
				actionMethods: {
					create : 'POST',
					read   : 'POST',
					update : 'POST',
					destroy: 'POST'
				},
    	        reader: {
    	            root:'items',
    	            totalProperty: 'results'
    	        },				
				simpleSortMode: true,
				extraParams: {handle: 'web', action: 'select', func: 'crm_complain_by_status_list'}
			}
		});
		
		me.reloadData();
		
		me.series = [{
			type: 'pie',
			field: 'value',
			showInLegend: true,
			donut: false,
			tips: {
			  trackMouse: true,
			  width: 140,
			  height: 28,
			  renderer: function(storeItem, item) {				
				this.setTitle(storeItem.get('name') + ': ' + storeItem.get('value'));
			  }
			},
			highlight: {
			  segment: {
				margin: 5
			  }
			},
			label: {
				field: 'name',
				display: 'rotate',
				contrast: true,
				font: '11px Segoe UI',
				renderer: function(v) {
					return v;
				}
			}
		}];

		me.callParent(arguments);
	},

	reloadData: function() {
		var me = this;
		me.store.load();
	},

	rangeData: function(e1, e2) {
		var me = this;
		me.store.getProxy().extraParams = {handle: 'web', action: 'select', func: 'crm_complain_by_status_list', start_date: e1, end_date: e2};
		me.store.load();
	}
});

Ext.define('OCS.SalesStagePipeLine', {
	extend: 'Ext.chart.Chart',
	animate: true,
	shadow: false,
	legend: {
		position: 'right'
	},
	insetPadding: 50,
	theme: 'Base:gradients',

	initComponent: function() {
		var me = this;
		
		me.store = Ext.create('Ext.data.Store', {
			fields: ['name', 'value'],
			proxy: {				
				type: 'ajax',
    			url: 'avia.php',
				actionMethods: {
					create : 'POST',
					read   : 'POST',
					update : 'POST',
					destroy: 'POST'
				},
    	        reader: {
    	            root:'items',
    	            totalProperty: 'results'
    	        },				
				simpleSortMode: true,
				extraParams: {handle: 'web', action: 'select', func: 'crm_stage_of_sales_pipeline_list'}
			}
		});
		
		me.reloadData();

		me.series = [{
			type: 'pie',
			field: 'value',
			showInLegend: true,
			donut: false,
			tips: {
			  trackMouse: true,
			  width: 140,
			  height: 28,
			  renderer: function(storeItem, item) {				
				this.setTitle(storeItem.get('name') + ': ' + storeItem.get('value'));
			  }
			},
			highlight: {
			  segment: {
				margin: 5
			  }
			},
			label: {
				field: 'name',
				display: 'rotate',
				contrast: true,
				font: '11px Segoe UI'		
			}
		}];

		me.callParent(arguments);
	},

	reloadData: function() {
		var me = this;
		me.store.load();
	}
});


Ext.define('OCS.AccountByIndustry', {
	extend: 'Ext.chart.Chart',
	animate: true,
	shadow: false,
	legend: {
		position: 'right'
	},
	insetPadding: 50,
	theme: 'Base:gradients',

	initComponent: function() {
		var me = this;
		
		me.store = Ext.create('Ext.data.Store', {
			fields: ['name', 'value'],
			proxy: {				
				type: 'ajax',
    			url: 'avia.php',
				actionMethods: {
					create : 'POST',
					read   : 'POST',
					update : 'POST',
					destroy: 'POST'
				},
    	        reader: {
    	            root:'items',
    	            totalProperty: 'results'
    	        },				
				simpleSortMode: true,
				extraParams: {handle: 'web', action: 'select', func: 'crm_account_by_industry_list'}
			}
		});
		
		me.reloadData();

		me.series = [{
			type: 'pie',
			field: 'value',
			showInLegend: true,
			donut: false,
			tips: {
			  trackMouse: true,
			  width: 140,
			  height: 28,
			  renderer: function(storeItem, item) {				
				this.setTitle(storeItem.get('name') + ': ' + storeItem.get('value'));
			  }
			},
			highlight: {
			  segment: {
				margin: 5
			  }
			},
			label: {
				field: 'name',
				display: 'rotate',
				contrast: true,
				font: '11px Segoe UI'		
			}
		}];

		me.callParent(arguments);
	},

	reloadData: function() {
		var me = this;
		me.store.load();
	}
});

Ext.define('OCS.OpportunityByProbability', {
	extend: 'Ext.chart.Chart',
	animate: true,
	shadow: false,
	legend: {
		position: 'right'
	},
	insetPadding: 50,
	theme: 'Base:gradients',

	initComponent: function() {
		var me = this;
		
		me.store = Ext.create('Ext.data.Store', {
			fields: ['name', 'value'],
			proxy: {				
				type: 'ajax',
    			url: 'avia.php',
				actionMethods: {
					create : 'POST',
					read   : 'POST',
					update : 'POST',
					destroy: 'POST'
				},
    	        reader: {
    	            root:'items',
    	            totalProperty: 'results'
    	        },				
				simpleSortMode: true,
				extraParams: {handle: 'web', action: 'select', func: 'crm_potential_by_probablity_list'}
			}
		});
		
		me.reloadData();

		me.series = [{
			type: 'pie',
			field: 'value',
			showInLegend: true,
			donut: false,
			tips: {
			  trackMouse: true,
			  width: 140,
			  height: 28,
			  renderer: function(storeItem, item) {				
				this.setTitle(storeItem.get('name') + ' %: ' + storeItem.get('value'));
			  }
			},
			highlight: {
			  segment: {
				margin: 5
			  }
			},
			label: {
				field: 'name',
				display: 'rotate',
				contrast: true,
				font: '11px Segoe UI'		
			}
		}];

		me.callParent(arguments);
	},

	reloadData: function() {
		var me = this;
		me.store.load();
	}
});

Ext.define('OCS.LeadBySource', {
	extend: 'Ext.chart.Chart',
	animate: true,
	shadow: false,
	legend: {
		position: 'right'
	},
	insetPadding: 50,
	theme: 'Base:gradients',

	initComponent: function() {
		var me = this;
		
		me.store = Ext.create('Ext.data.Store', {
			fields: ['name', 'value'],
			proxy: {				
				type: 'ajax',
    			url: 'avia.php',
				actionMethods: {
					create : 'POST',
					read   : 'POST',
					update : 'POST',
					destroy: 'POST'
				},
    	        reader: {
    	            root:'items',
    	            totalProperty: 'results'
    	        },				
				simpleSortMode: true,
				extraParams: {handle: 'web', action: 'select', func: 'crm_lead_by_source_list'}
			}
		});
		
		me.reloadData();

		me.series = [{
			type: 'pie',
			field: 'value',
			showInLegend: true,
			donut: false,
			tips: {
			  trackMouse: true,
			  width: 140,
			  height: 28,
			  renderer: function(storeItem, item) {				
				this.setTitle(storeItem.get('name') + ': ' + storeItem.get('value'));
			  }
			},
			highlight: {
			  segment: {
				margin: 5
			  }
			},
			label: {
				field: 'name',
				display: 'rotate',
				contrast: true,
				font: '11px Segoe UI'				
			}
		}];

		me.callParent(arguments);
	},

	reloadData: function() {
		var me = this;
		me.store.load();
	}
});

